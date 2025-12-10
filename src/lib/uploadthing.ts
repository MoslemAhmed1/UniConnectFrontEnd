import { createUploadthing, type FileRouter } from "uploadthing/express";

const f = createUploadthing();

export const uploadRouter = {
  materialUploader: f({
    pdf: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
    video: {
      maxFileSize: "256MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async () => {
    try {
      return { success: true, file_id: "" };
    } catch {
      return { success: false };
    }
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
