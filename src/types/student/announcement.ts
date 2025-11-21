type Announcement = {
  // Main Attributes
  id: number;
  title: string;
  content: string;
  courseCode: string;
  created_at: string;
  uploader_id?: number;
  type: AnnouncementType; // types not yet determined

  // Extra Attributes (for visualization)
  uploader: string;

  // Additional attributes can be added here
};

type AnnouncementType = "announcement" | "poll";

export { type Announcement, type AnnouncementType };

