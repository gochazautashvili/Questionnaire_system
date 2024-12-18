import { UTApi } from "uploadthing/server";

export const utapi = new UTApi({
  apiKey: process.env.UPLOADTHING_SECRET,
});

export const delete_file = (url: string) => {
  const key = url.split(`/a/${process.env.UPLOADTHING_APP_ID}/`)[1];

  return utapi.deleteFiles(key);
};
