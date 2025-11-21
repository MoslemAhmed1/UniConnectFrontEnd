import { Card , CardTitle , CardDescription , CardContent , CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Announcement } from "@/types/student/announcement"

type AnnouncementCardProps = {
  announcement: Announcement
}

export default function AnnouncementCard({ announcement }: AnnouncementCardProps) {
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
                {announcement.uploader} • {announcement.created_at}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
          {announcement.content}
      </CardContent>
    </Card>
  )
}