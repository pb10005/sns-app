import { createTRPCRouter } from "./trpc";
import { followingRouter } from "./routers/following";
import { timelineRouter } from "./routers/timeline";
import { profileRouter } from "./routers/profile";
import { likeRouter } from "./routers/like";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  following: followingRouter,
  timeline: timelineRouter,
  profile: profileRouter,
  like: likeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
