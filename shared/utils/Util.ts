import AppConfiguration from '../../configs/AppConfiguration.ts';

export class Util {
  /**
   *
   * For dynamic import of all controllers system should firsltly read filesystem and get all
   * files with name template *.controllers.ts
   *
   **/
  public static findControllerFiles = (dir:string, filelist = []) => {
    const controllerMask = AppConfiguration.server.env === 'development' ? 'controller.ts' : 'controller.js';
    // const files = Deno.readDirSync(`${dir}`);
    const files = Deno.readDirSync(dir)
    for (const dirEntry of Deno.readDirSync(dir)) {
      // Deno
      console.log(dirEntry.isDirectory);
    }

    // files.forEach(file => {
    //   if (fs.statSync(dir + file).isDirectory()) {
    //     filelist = Util.findControllerFiles(`${dir}${file}/`, filelist);
    //   } else {
    //     if (file.indexOf(controllerMask) > 0) {
    //       filelist.push(`../${dir}${file}`);
    //     }
    //   }
    // });
    //
    // return filelist;
  }
}
