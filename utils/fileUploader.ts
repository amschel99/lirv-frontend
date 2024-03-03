import {
  FILES_BASE_URL as BASE_URL,
  FILES_API_KEY as apikey,
} from "../api/config";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { firebaseapp } from "../firebase/config";

function extractFileName(filePath: string): string | null {
  const pathParts = filePath.split("/");

  const fileName = pathParts[pathParts.length - 1];

  return fileName || null;
}

export const uploadFile = async (data: any) => {
  const image = {
    type: "image/jpeg",
    uri: data.uri,
    name: extractFileName(data.uri),
  };

  try {
    const formData = new FormData();
    formData.append("name", "profile");
    formData.append("file", image as unknown as Blob);

    const options = {
      method: "POST",
      headers: {
        apikey,
        "X-RapidAPI-Key": "e6cc4f4878msh5b91e3a0a0141a7p15c57cjsnc51beda6dc4e",
        "X-RapidAPI-Host": "veestream2.p.rapidapi.com",
      },
      body: formData,
    };

    const response = await fetch(`${BASE_URL}/file/upload`, options);
    const responseData = await response.json();

    return responseData;
  } catch (e) {
    return null;
  }
};

export const uploadToFirebase = async (
  uri: string,
  name: string,
  onProgress?: (progress: number) => void
): Promise<{ downloadUrl: string; metadata: any }> => {
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();

  const imageRef = ref(getStorage(firebaseapp), `images/${name}`);

  const uploadTask = uploadBytesResumable(imageRef, theBlob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress && onProgress(progress);
      },
      (error) => {
        console.log(error);
        reject(error);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          downloadUrl,
          metadata: uploadTask.snapshot.metadata,
        });
      }
    );
  });
};
