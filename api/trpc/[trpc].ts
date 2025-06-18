import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter } from '../../src/index';

export default createNextApiHandler({
    router: appRouter,
    createContext: () => ({}),
});
