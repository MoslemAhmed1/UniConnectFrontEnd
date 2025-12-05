import type { Announcement } from "@/types/student/announcement";
import { CardHeader , CardDescription , CardTitle } from "@/components/ui/card";
import { formatDistanceToNow, format } from "date-fns";

type AnnouncementItemProps = {
  announcement: Announcement
}

export default function AnnouncementItem({ announcement }: AnnouncementItemProps) {
  
  const createdAt = new Date(announcement.created_at);
  const now = new Date();
  const diffInMs = now.getTime() - createdAt.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  let formattedDate: string;
  if (diffInDays < 7) {
    formattedDate = formatDistanceToNow(createdAt, { addSuffix: true });
  } else {
    formattedDate = format(createdAt, "MMM d, h:mma");
  }

  return (
    <CardHeader className="p-4 m-0 hover:bg-slate-100/70 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div>
          <CardDescription className="text-xs font-medium text-blue-600 mb-1">
            {announcement.courseCode}
          </CardDescription>

          <CardTitle className="text-sm font-medium text-slate-800">
            {announcement.title}
          </CardTitle>

          <CardDescription className="text-xs text-slate-500 mt-1">
            {formattedDate}
          </CardDescription>
        </div>
      </div>
    </CardHeader>
  )
}