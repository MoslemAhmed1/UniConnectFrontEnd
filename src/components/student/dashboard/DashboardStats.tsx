import { BookOpen, Calendar, Bell, Users } from "lucide-react"
import StatCard from "./StatCard"

type DashboardStatsProps = {
  upcomingEventsCount: number
  activeCoursesCount: number
  studyGroupsCount?: number
  unreadAnnouncementsCount?: number
  isLoadingCalendar: boolean
}

export default function DashboardStats({
  upcomingEventsCount,
  activeCoursesCount,
  isLoadingCalendar,
}: DashboardStatsProps) {
  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
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
        color="from-teal-600 to-blue-600"
        isLoading={isLoadingCalendar}
      />
      <StatCard
        icon={Bell}
        label="Unread Announcements"
        value="7"
        color="from-teal-600 to-teal-600"
        isLoading={false}
      />
      <StatCard
        icon={Users}
        label="Study Groups"
        value="2"
        color="from-blue-600 to-teal-600"
        isLoading={false}
      />
    </div>
  )
}
