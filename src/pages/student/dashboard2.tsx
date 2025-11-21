import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// Hooks
import { useStudentProfileData } from "@/hooks/student/use-student-profile-data"
import { useStudentCalendar } from "@/hooks/student/use-student-calendar"
import { useStudentCourses } from "@/hooks/student/use-student-courses"
import { useStudentAnnouncements } from "@/hooks/student/use-student-announcements"
import useUpcomingEventsCount from "@/hooks/student/use-upcoming-events-count"
import useDeadlineUtils from "@/hooks/student/use-deadline-utils"

// Components
import DashboardStats from "@/components/student/dashboard/DashboardStats"
import DashboardCourses from "@/components/student/dashboard/DashboardCourses"
import DashboardAnnouncements from "@/components/student/dashboard/DashboardAnnouncements"
import DashboardDeadlines from "@/components/student/dashboard/DashboardDeadlines"

export default function Dashboard2() {
  const { profileData, isLoading: isLoadingProfile } = useStudentProfileData()
  const { calendarEvents, isLoading: isLoadingCalendar } = useStudentCalendar()
  const { courses, isLoading: isLoadingCourses } = useStudentCourses()
  const { announcements, isLoading: isLoadingAnnouncements } = useStudentAnnouncements()
  const { getUpcomingDeadlines, formatDeadlineDate, getDeadlineColor } = useDeadlineUtils()

  const studentName = profileData ? (profileData.firstName || "Student") : "Student"
  const upcomingDeadlines = getUpcomingDeadlines(calendarEvents)
  const upcomingEventsCount = useUpcomingEventsCount(calendarEvents)

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-slate-50 px-4">
          <SidebarTrigger />

          <Separator orientation="vertical" className="mx-2 h-4" />

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 flex-col gap-6 p-6 pt-4">
          {/* Welcome */}
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              {isLoadingProfile
                ? "Welcome back!"
                : `Welcome back, ${studentName}!`}
            </h1>
            <p className="text-slate-500">
              Here's what's happening with your courses today.
            </p>
          </div>

          {/* Stats */}
          <DashboardStats
            upcomingEventsCount={upcomingEventsCount}
            activeCoursesCount={courses.length}
            isLoadingCalendar={isLoadingCalendar}
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Courses Section */}
              <DashboardCourses courses={courses} isLoading={isLoadingCourses} />

              {/* Recent Announcements */}
              <DashboardAnnouncements announcements={announcements} isLoading={isLoadingAnnouncements} />
            </div>

            {/* Right Section */}
            <div className="space-y-6">
              {/* Deadlines Widget */}
              <DashboardDeadlines
                upcomingDeadlines={upcomingDeadlines}
                isLoadingCalendar={isLoadingCalendar}
                formatDeadlineDate={formatDeadlineDate}
                getDeadlineColor={getDeadlineColor}
              />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
