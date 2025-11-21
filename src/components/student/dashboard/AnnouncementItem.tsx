import type { Announcement } from "@/types/student/announcement"
import { CardHeader , CardDescription , CardTitle } from "@/components/ui/card"

type AnnouncementItemProps = {
  announcement: Announcement
}

export default function AnnouncementItem({ announcement }: AnnouncementItemProps) {
  return (
    <CardHeader className="p-4 m-0 hover:bg-muted/50 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div>
          <CardDescription className="text-xs font-medium text-blue-600 mb-1">
            {announcement.courseCode}
          </CardDescription>

          <CardTitle className="text-sm font-medium text-slate-800">
            {announcement.title}
          </CardTitle>

          <CardDescription className="text-xs text-slate-500 mt-1">
            {announcement.created_at}
          </CardDescription>
        </div>
      </div>
    </CardHeader>
  )
}

/*
import { Item, ItemContent } from "@/components/ui/item"
import { Badge } from "@/components/ui/badge"
import type { Announcement } from "@/types/student/announcement"

type AnnouncementItemProps = {
  announcement: Announcement
  pinned?: boolean
}

export default function AnnouncementItem({
  announcement,
  pinned,
}: AnnouncementItemProps) {
  return (
    <Item className="hover:bg-muted/50 transition-colors cursor-pointer">
      <ItemContent className="flex flex-col gap-1 p-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-primary">
            {announcement.courseCode}
          </span>
          {pinned && (
            <Badge variant="secondary" className="text-xs">
              Pinned
            </Badge>
          )}
        </div>
        <p className="font-medium text-foreground">{announcement.title}</p>
        <p className="text-xs text-muted-foreground">{announcement.created_at}</p>
      </ItemContent>
    </Item>
  )
}
*/