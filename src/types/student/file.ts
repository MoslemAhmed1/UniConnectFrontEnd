type File = {
  id: number;
  name: string;
  type: FileType;
  size: string;
  url: string;
  uploaded_at: number;
};

type FileType = "application/pdf"; // more could be added later

export { type File };
