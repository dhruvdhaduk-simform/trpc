import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();

const publicProcedure = t.procedure;
const router = t.router;

export const appRouter = router({
    greeting: publicProcedure.input(z.string().nullish()).query(({ input }) => {
        return {
            text: `hello ${input ?? 'world'}`,
        };
    }),
});

export type AppRouter = typeof appRouter;
