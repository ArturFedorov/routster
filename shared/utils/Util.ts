export class Util {
  /**
   *
   * For dynamic import of all controllers system should firsltly read filesystem and get all
   * files with name template *.controllers.
   *
   **/
  public static findFilesInDirectory (dir:string, fileList: string[], nameMask = '.controller.'): string[] {

    let files = Deno.readDirSync(dir);
    fileList = fileList || [];

    for (const dirEntry of files) {
      if(dirEntry.isDirectory) {
        fileList = Util.findFilesInDirectory(`${dir}${dirEntry.name}`, fileList);
      } else {
        if(dirEntry.name.includes(nameMask)) {
          fileList.push(`../${dir}/${dirEntry.name}`);
        }
      }
    }

    return fileList;
  }
}
