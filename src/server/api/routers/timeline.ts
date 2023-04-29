import { z } from "zod";

import { type Following } from "@prisma/client";
import { type Post } from "@prisma/client";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const timelineRouter = createTRPCRouter({
  // No. 7 タイムライン投稿
  create: protectedProcedure
    .input(
      z.object({
        content: z.string().max(200),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data: Post = await ctx.prisma.post.create({
        data: {
          authorId: ctx.session.user.id,
          content: input.content,
        },
      });
      return data;
    }),

  // No. 8 タイムライン表示
  showUserTimeline: protectedProcedure.query(async ({ ctx }) => {
    const followees: Following[] = await ctx.prisma.following.findMany({
      where: {
        followerId: ctx.session.user.id,
      },
    });
    const data = await ctx.prisma.post.findMany({
      where: {
        OR: [
          {
            // 投稿者が公開ユーザー
            author: {
              is: { userProfile: { is: { isPublic: true } } },
            },
          },
          {
            // 投稿者がフォロー中のアカウント
            author: {
              id: {
                in: followees.map((f) => f.followeeId),
              },
            },
          },
          {
            // 投稿者が自分
            author: { is: { id: ctx.session.user.id } },
          },
        ],
      },
      include: {
        author: {
          select: {
            id: true,
            userProfile: {
              select: {
                nickname: true,
                isPublic: true,
              },
            },
          },
        },
        likes: {
          select: {
            senderId: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return data;
  }),
  // No. 9 タイムライン検索
  searchTimeline: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      // ログイン済みの一般ユーザー
      if (ctx.session?.user?.id) {
        const followees: Following[] = await ctx.prisma.following.findMany({
          where: {
            followerId: ctx.session.user.id,
          },
        });
        return ctx.prisma.post.findMany({
          where: {
            OR: [
              {
                // 投稿者が公開ユーザー
                author: {
                  is: { userProfile: { is: { isPublic: true } } },
                },
              },
              {
                // 投稿者がフォロー中のアカウント
                author: {
                  id: {
                    in: followees.map((f) => f.followeeId),
                  },
                },
              },
              {
                // 投稿者が自分
                author: { is: { id: ctx.session.user.id } },
              },
            ],
            content: {
              contains: input.text,
            },
          },
          orderBy: { createdAt: "desc" },
          include: {
            author: {
              select: {
                id: true,
                userProfile: {
                  select: {
                    nickname: true,
                    isPublic: true,
                  },
                },
              },
            },
            likes: {
              select: {
                senderId: true,
              },
            },
          },
        });
      } else {
        // 未ログインまたはアカウントなし
        return ctx.prisma.post.findMany({
          where: {
            // 投稿者が公開ユーザー
            author: {
              is: { userProfile: { is: { isPublic: true } } },
            },
            content: {
              contains: input.text,
            },
          },
          orderBy: { createdAt: "desc" },
          include: {
            author: {
              select: {
                id: true,
                userProfile: {
                  select: {
                    nickname: true,
                    isPublic: true,
                  },
                },
              },
            },
            likes: {
              select: {
                senderId: true,
              },
            },
          },
        });
      }
    }),

  // No. 10 タイムライン編集
  getById: protectedProcedure
    .input(
      z.object({
        postId: z.string().cuid(),
      })
    )
    .query(({ ctx, input }) => {
      const data = ctx.prisma.post.findUnique({
        where: {
          id: input.postId,
        },
      });
      return data;
    }),
  edit: protectedProcedure
    .input(
      z.object({
        postId: z.string().cuid(),
        content: z.string().max(200),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.prisma.post.updateMany({
        data: {
          content: input.content,
        },
        where: {
          authorId: ctx.session.user.id,
          id: input.postId,
        },
      });
      return data;
    }),

  // No. 11 タイムライン削除
  delete: protectedProcedure
    .input(
      z.object({
        postId: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.prisma.post.deleteMany({
        where: {
          authorId: ctx.session.user.id,
          id: input.postId,
        },
      });
      return data;
    }),
});
