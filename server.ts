import { Application } from "https://deno.land/x/oak/mod.ts";
import AppConfiguration from './configs/AppConfiguration.ts';
import router from './src/features/items/items.controller.ts';
import {Util} from './shared/utils/Util.ts';

const app = new Application();
const allControllers = Util.findControllerFiles('src/features/');

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({port: AppConfiguration.server.port});
