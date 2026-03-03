import { getDownloadURL, getStorage, uploadBytes } from "firebase/storage";
import { app } from "./firebase";

const storage = getStorage(app);

export const uploadProductImage = async (file, productId) => {
  if (!file) throw new Error("No file provided");

  const imageRef = ref(
    storage,
    `products/${productId}/${Date.now()}-${file.name}`,
  );

  await uploadBytes(imageRef, file);
  return await getDownloadURL(imageRef);
};
