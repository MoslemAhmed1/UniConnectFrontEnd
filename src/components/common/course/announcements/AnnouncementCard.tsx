import { Card , CardTitle , CardDescription , CardContent , CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Announcement } from "@/types/student/announcement"
import { formatDistanceToNow, format } from "date-fns";

type AnnouncementCardProps = {
  announcement: Announcement
  allowModifyAnnouncements: boolean
}

export default function AnnouncementCard({ announcement, allowModifyAnnouncements }: AnnouncementCardProps) {
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
    <Card className="p-6">
      <CardHeader className="p-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Replace with uploader's profile photo */}
            <Avatar className="w-10 h-10 rounded-full">
              <AvatarImage src="https://tr.rbxcdn.com/180DAY-d4a6d1564bf7c0e65447501bdb3cc584/420/420/FaceAccessory/Webp/noFilter" />
              <AvatarFallback className="rounded-full">
                ST
              </AvatarFallback>
            </Avatar>

            <div>
              <CardTitle className="font-semibold text-slate-800">
                {announcement.title}
              </CardTitle>
              <CardDescription className="text-sm text-slate-500">
                {announcement.uploader} • {formattedDate}
              </CardDescription>
            </div>
          </div>
          {allowModifyAnnouncements && (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
          {announcement.content}
      </CardContent>
    </Card>
  )
}