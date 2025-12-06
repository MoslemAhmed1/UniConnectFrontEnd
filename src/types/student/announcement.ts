type Announcement = {
  id: number;
  title: string;
  content: string;
  courseCode: string;
  created_at: number;
  uploader: string;
  type: AnnouncementType; // types not yet determined
};

type AnnouncementType = "announcement" | "poll";

export { type Announcement, type AnnouncementType };

