import { getUser } from "@/lib/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  image: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const user = await getUser();

      if (!user) throw new UploadThingError("Unauthorized");

      return { user };
    })
    .onUploadComplete(async ({ file }) => {
      const url = file.url.replace(
        "/f/",
        `/a/${process.env.UPLOADTHING_APP_ID}/`,
      );

      return { url };
    }),
} satisfies FileRouter;

// type
export type OurFileRouter = typeof ourFileRouter;
