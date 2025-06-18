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

    reverse: publicProcedure.input(z.string()).query(({ input }) => {
        return {
            input,
            result: `${input.split('').reverse().join('')}`,
        };
    }),

    math: router({
        square: publicProcedure.input(z.number()).query(({ input }) => {
            return {
                result: `Square of ${input} is ${input * input}`,
            };
        }),

        sqrt: publicProcedure.input(z.number()).query(({ input }) => {
            return {
                result: `Square root of ${input} is ${Math.sqrt(input)}`,
            };
        }),

        add: publicProcedure
            .input(
                z.object({
                    a: z.number(),
                    b: z.number(),
                })
            )
            .query(({ input }) => {
                return {
                    result: `${input.a} + ${input.b} = ${input.a + input.b}`,
                };
            }),
    }),
});

export type AppRouter = typeof appRouter;
