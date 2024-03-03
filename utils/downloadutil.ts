import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

export async function downloadmedia({ URL }): Promise<{
  filesaved: boolean;
}> {
  let filesaved: boolean = false;

  const downloadresumable: FileSystem.DownloadResumable =
    FileSystem.createDownloadResumable(
      URL,
      FileSystem.documentDirectory + "nichlabs.png",
      {}
    );

  try {
    const { uri } = await downloadresumable.downloadAsync();
    await MediaLibrary.saveToLibraryAsync(uri);
    filesaved = true;

    return { filesaved };
  } catch (e) {}
}
