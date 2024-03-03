import * as FileSystem from "expo-file-system";

export interface storagetypes {
  firstTimeUse?: boolean;
  currAccessToken?: string;
  currRefreshToken?: string;
}

export const FILENAME: string = "localeauth.json";
const base_uri: string = FileSystem.documentDirectory + "data/";

export async function checkDirExists(dirUri = base_uri): Promise<void> {
  const dirInfo = await FileSystem.getInfoAsync(dirUri);

  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(dirUri, { intermediates: true });
  }
}

export async function getFileInfo(
  fileName: string
): Promise<FileSystem.FileInfo> {
  checkDirExists(base_uri);

  return FileSystem.getInfoAsync(base_uri + fileName);
}

export async function readFile(): Promise<unknown> {
  checkDirExists(base_uri);

  const uri = base_uri + FILENAME;
  const fileInfo = await FileSystem.getInfoAsync(uri);

  if (!fileInfo.exists) {
    return Promise.reject("File does not exist!");
  }

  if (fileInfo.isDirectory) {
    return Promise.reject("Should not be a directory! Only files allowed");
  }

  return new Promise((resolve, reject) => {
    FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.UTF8,
    })
      .then((data: string) => {
        resolve(JSON.parse(data));
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export async function writeFile(
  fileName: string,
  data: storagetypes
): Promise<void> {
  checkDirExists(base_uri);

  const uri = base_uri + fileName;

  return FileSystem.writeAsStringAsync(uri, JSON.stringify(data), {
    encoding: FileSystem.EncodingType.UTF8,
  });
}
