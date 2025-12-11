import { BookOpen, Calendar, Clock } from "lucide-react";
import StatCard from "./StatCard";

type DashboardStatsProps = {
  activeCoursesCount: number;
  upcomingEventsCount: number;
  isLoadingUpcomingEvents: boolean;
};

export default function DashboardStats({
  activeCoursesCount,
  upcomingEventsCount,
  isLoadingUpcomingEvents,
}: DashboardStatsProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <StatCard
        icon={BookOpen}
        label="Active Courses"
        value={activeCoursesCount.toString()}
        color="from-blue-600 to-blue-600"
        isLoading={false}
      />
      <StatCard
        icon={Calendar}
        label="Upcoming Events"
        value={upcomingEventsCount.toString()}
        color="from-yellow-400 to-yellow-400"
        isLoading={isLoadingUpcomingEvents}
      />
      <StatCard
        icon={Clock}
        label="Due assignments"
        value="2"
        color="from-red-600 to-red-600"
        isLoading={false}
      />
    </div>
  );
}
