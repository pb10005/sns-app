import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const followingRouter = createTRPCRouter({
  // No. 5 フォロー
  create: protectedProcedure
    .input(
      z.object({
        followeeId: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.prisma.following.create({
        data: {
            followerId: ctx.session.user.id,
            followeeId: input.followeeId,
        }
      });
      return data;
    }),

  // No. 6 フォロー外し
  delete: protectedProcedure
    .input(
      z.object({
        followeeId: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.prisma.following.deleteMany({
        where: {
          followerId: ctx.session.user.id,
          followeeId: input.followeeId,
        },
      });
      return data;
    }),
});