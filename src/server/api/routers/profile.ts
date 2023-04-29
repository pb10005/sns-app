import { z } from "zod";

import { type UserProfile } from "@prisma/client";
import { type Following } from "@prisma/client";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
  // No. 12 プロフィール設定
  upsert: protectedProcedure
    .input(
      z.object({
        nickname: z.string().max(50),
        bio: z.string().max(1000).optional(),
        isPublic: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data: UserProfile = await ctx.prisma.userProfile.upsert({
        create: {
          userId: ctx.session.user.id,
          nickname: input.nickname,
          bio: input.bio,
          isPublic: input.isPublic,
        },
        update: {
          nickname: input.nickname,
          bio: input.bio,
          isPublic: input.isPublic,
        },
        where: {
          userId: ctx.session.user.id,
        },
      });
      return data;
    }),

  // No. 13 プロフィール表示
  show: publicProcedure
    .input(
      z.object({
        userId: z.string().cuid(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (ctx.session?.user?.id) {
        // ログイン済
        const followee: Following[] = await ctx.prisma.following.findMany({
          where: {
            followerId: ctx.session.user.id,
          },
        });
        return ctx.prisma.userProfile.findMany({
          where: {
            userId: input.userId,
            OR: [
              {
                // 公開ユーザー
                isPublic: true,
              },
              {
                // フォローしているユーザー
                userId: {
                  in: followee.map((f) => f.followeeId),
                },
              },
              {
                // 自分
                userId: ctx.session.user.id,
              },
            ],
          },
          include: {
            user: {
                select: {
                    followers: {
                        select: {
                            followerId: true
                        }
                    }
                }
            }
          }
        });
      } else {
        // 未ログインまたはアカウントなし
        return ctx.prisma.userProfile.findMany({
          where: {
            userId: input.userId,
            isPublic: true,
          },
          include: {
            user: {
                select: {
                    followers: {
                        select: {
                            followerId: true
                        }
                    }
                }
            }
          }
        });
      }
    }),
});
