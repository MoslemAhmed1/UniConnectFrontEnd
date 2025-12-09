// Hooks
import { useProfileData } from "@/hooks/use-profile-data";
import { useStudentCalendar } from "@/hooks/student/use-student-calendar";
import { useStudentCourses } from "@/hooks/student/use-student-courses";
import { useStudentAnnouncements } from "@/hooks/student/use-student-announcements";
import deadlineUtils from "@/utils/time/deadline-utils";

// Components
import DashboardStats from "@/components/student/dashboard/DashboardStats";
import DashboardCourses from "@/components/student/dashboard/DashboardCourses";
import DashboardAnnouncements from "@/components/student/dashboard/DashboardAnnouncements";
import DashboardDeadlines from "@/components/student/dashboard/DashboardDeadlines";

export default function Dashboard() {
  const { profileData, isLoading: isLoadingProfile } = useProfileData();
  const { calendarEvents, isLoading: isLoadingCalendar } = useStudentCalendar();
  const { courses, isLoading: isLoadingCourses } = useStudentCourses();
  const { announcements, isLoading: isLoadingAnnouncements } = useStudentAnnouncements();
  const { getUpcomingDeadlines, formatDeadlineDate } = deadlineUtils();

  const studentName = profileData
    ? profileData.first_name
      ? profileData.first_name
      : "Student"
    : "Student";
  const upcomingDeadlines = getUpcomingDeadlines(calendarEvents);
  const upcomingEventsCount = calendarEvents.filter((event) => event.deadline_at >= Date.now()).length;

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
          />
        </div>
      </div>
    </div>
  );
}
