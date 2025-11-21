import { Card } from "@/components/ui/card";
import type { Announcement } from "@/types/student/announcement";
import AnnouncementCard from "./AnnouncementCard";

type AnnouncementsSectionProps = {
  announcements: Announcement[];
  isLoading: boolean;
};

export default function AnnouncementsSection({ announcements, isLoading }: AnnouncementsSectionProps) {
  return (
    <div className="space-y-4">
      {isLoading ? (
        <Card className="p-6">
          <p className="text-sm text-slate-500">Loading announcements...</p>
        </Card>
      ) : announcements.length === 0 ? (
        <Card className="p-6">
          <p className="text-sm text-slate-500">No announcements found</p>
        </Card>
      ) : (
        announcements.map((announcement) => (
          <AnnouncementCard key={announcement.id} announcement={announcement}/>
        ))
      )}
    </div>
  );
}
