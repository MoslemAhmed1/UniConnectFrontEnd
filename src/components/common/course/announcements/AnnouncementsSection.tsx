import { Card } from "@/components/ui/card";
import type { Announcement } from "@/types/student/announcement";
import AnnouncementCard from "./AnnouncementCard";

import AddAnnouncementModal from "@/components/common/course/modals/AddAnnouncementModal";

type AnnouncementsSectionProps = {
  announcements: Announcement[];
  courseCode: string;
  courseStudentsCount: number;
  allowModifyAnnouncements: boolean;
};

export default function AnnouncementsSection({
  announcements,
  courseCode,
  allowModifyAnnouncements,
  courseStudentsCount,
}: AnnouncementsSectionProps) {
  return (
    <div>
      {allowModifyAnnouncements && (
        <div className="flex justify-start mb-4">
          <AddAnnouncementModal courseCode={courseCode} />
        </div>
      )}
      <div className="space-y-4">
        {announcements.length === 0 ? (
          <Card className="p-6">
            <p className="text-sm text-slate-500">No announcements found</p>
          </Card>
        ) : (
          announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              allowModifyAnnouncements={allowModifyAnnouncements}
              courseStudentsCount={courseStudentsCount}
            />
          ))
        )}
      </div>
    </div>
  );
}
