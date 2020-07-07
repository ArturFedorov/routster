import { Application } from "https://deno.land/x/oak/mod.ts";
import {AppConfiguration} from './configs/AppConfiguration.ts';
import {Logger} from './server-configs/Logger.ts';
import {Routes} from './server-configs/Routes.ts';

const app = new Application();
Logger.initLogger();

for(const router of await Routes.getConfiguredRoutes()) {
  app.use(router.routes());
  app.use(router.allowedMethods());
}

await app.listen({port: AppConfiguration.server.port});
