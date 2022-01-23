import { SetupServer } from './server';
import dontev from 'dotenv'

(async (): Promise<void> => {
    dontev.config();
    const port = process.env.APP_PORT ? process.env.APP_PORT : '8000';

    const server = new SetupServer(parseInt(port));
    await server.init();
    server.start();
})();