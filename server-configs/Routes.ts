import {Util} from '../shared/utils/Util.ts';
import {Logger} from './Logger.ts';
import { Router } from "https://deno.land/x/oak/mod.ts";

export class Routes {
  static async getConfiguredRoutes() {
    let routes:Router[] = [];

    const allControllers = Util.findFilesInDirectory('src/', []);
    if(!allControllers.length) {
      Logger.appLogger.info('No files of controller found.');
    }

    for (const controllerPath of allControllers) {
      Logger.appLogger.info(`Register controller ${controllerPath}`);
      const route: {default: Router} = await import(controllerPath);

      routes.push(route.default);
    }

    return routes;
  }
}
