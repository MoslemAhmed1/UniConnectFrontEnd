// Hooks
import { useStudentProfileData } from "@/hooks/student/use-student-profile-data";
import { useStudentCalendar } from "@/hooks/student/use-student-calendar";
import { useStudentCourses } from "@/hooks/student/use-student-courses";
import { useStudentAnnouncements } from "@/hooks/student/use-student-announcements";
import useUpcomingEventsCount from "@/hooks/student/use-upcoming-events-count";
import useDeadlineUtils from "@/hooks/student/use-deadline-utils";

// Components
import DashboardStats from "@/components/student/dashboard/DashboardStats";
import DashboardCourses from "@/components/student/dashboard/DashboardCourses";
import DashboardAnnouncements from "@/components/student/dashboard/DashboardAnnouncements";
import DashboardDeadlines from "@/components/student/dashboard/DashboardDeadlines";

export default function Dashboard() {
  const { profileData, isLoading: isLoadingProfile } = useStudentProfileData();
  const { calendarEvents, isLoading: isLoadingCalendar } = useStudentCalendar();
  const { courses, isLoading: isLoadingCourses } = useStudentCourses();
  const { announcements, isLoading: isLoadingAnnouncements } =
    useStudentAnnouncements();
  const { getUpcomingDeadlines, formatDeadlineDate, getDeadlineColor } =
    useDeadlineUtils();

  const studentName = profileData
    ? profileData.firstName
      ? profileData.firstName
      : "Student"
    : "Student";
  const upcomingDeadlines = getUpcomingDeadlines(calendarEvents);
  const upcomingEventsCount = useUpcomingEventsCount(calendarEvents);

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          {isLoadingProfile ? "Welcome back!" : `Welcome back, ${studentName}!`}
        </h1>
        <p className="text-slate-500">
          Here's what's happening with your courses today.
        </p>
      </div>

      {/* Quick Stats */}
      <DashboardStats
        upcomingEventsCount={upcomingEventsCount}
        isLoadingCalendar={isLoadingCalendar}
        activeCoursesCount={courses.length}
      />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Courses Section */}
          <DashboardCourses courses={courses} isLoading={isLoadingCourses} />

          {/* Recent Announcements */}
          <DashboardAnnouncements
            announcements={announcements}
            isLoading={isLoadingAnnouncements}
          />
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
    </div>
  );
}
