type Material = {
  // Main Attributes
  id: number | string;
  title: string;
  category: MaterialCategory;
  courseCode: string;
  uploader_id?: number | string;

  // Extra Attributes (for visualization)
  type: string;
  size: string;
  uploaded_at: string;
  uploader: string;
  
  // Additional attributes can be added here
};

type MaterialCategory = "lecture" | "sheet" | "quiz" | "assignment" | "tutorial" | "textbook";

export { type Material, type MaterialCategory };

