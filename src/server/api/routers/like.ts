import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const likeRouter = createTRPCRouter({
  // No. 14 いいね
  create: protectedProcedure
    .input(
      z.object({
        postId: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.prisma.like.create({
        data: {
          postId: input.postId,
          senderId: ctx.session.user.id,
        },
      });
      return data;
    }),

  // No. 15 いいね解除
  delete: protectedProcedure
    .input(
      z.object({
        postId: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.prisma.like.deleteMany({
        where: {
          postId: input.postId,
          senderId: ctx.session.user.id,
        },
      });
      return data;
    }),
});
