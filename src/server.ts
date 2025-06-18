import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from 'cors';
import { appRouter } from './index';

// create server
createHTTPServer({
    middleware: cors(),
    router: appRouter,
}).listen(2022);
