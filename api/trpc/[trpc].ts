import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter } from '../../index';

export default createNextApiHandler({
    router: appRouter,
    createContext: () => ({}),
});
