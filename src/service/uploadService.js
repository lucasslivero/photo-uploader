import { v4 as uuidv4 } from "uuid";

export const getPresignedUrl = async (filename, contentType) => {
  const res = await fetch("/api/presigned-upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filename,
      contentType,
    }),
  });
  return res.json()
};

export const uploadToS3 = async (url, file) => {
  const uploadRes = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });
};

export const sendToBackend = async (key) => {
  const res = await fetch("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key }),
  });
};

export const uploadFile = async (file) => {
  const key = `${uuidv4()}-${file.name}`;
  const { url } = await getPresignedUrl(key, file.type);
  await uploadToS3(url, file);
  await sendToBackend(key);
  return { key };
};
