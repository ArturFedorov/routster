import { Application } from "https://deno.land/x/oak/mod.ts";
import {AppConfiguration} from './configs/AppConfiguration.ts';
import router from './src/features/items/items.controller.ts';
import {Logger} from './server-configs/Logger.ts';
import {Routes} from './server-configs/Routes.ts';

const app = new Application();
Logger.initLogger();

for(const router of await Routes.getConfiguredRoutes()) {
  app.use(router.routes());
  app.use(router.allowedMethods());
}


app.use(router.routes());

await app.listen({port: AppConfiguration.server.port});
