import ConfiguredCalendar from "@/components/student/calendar/ConfiguredCalendar";
import Legend from "@/components/student/calendar/Legend";
import SelectedDayDetails from "@/components/student/calendar/SelectedDayDetails";
import { useStudentCalendar } from "@/hooks/student/use-student-calendar";
// import AddEventModal from "@/components/common/course/AddEventModal";
// import CalendarSection from "@/components/common/course/CalendarSection";
// import type { CalendarEvent } from "@/types/student/calendar-event";

export default function StudentCalendar() {
  const { calendarEvents, date, isLoading, setDate } = useStudentCalendar();

  return (
    <div>
      <h1 className="text-4xl font-bold">Calendar</h1>
      <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-8 max-w-6xl mx-auto py-8 px-4">
        <div>
          <ConfiguredCalendar
            selectedDate={date}
            onSelectDate={setDate}
            calendarEvents={calendarEvents}
          />
        </div>

        <div className="space-y-6">
          <SelectedDayDetails
            selectedDate={date}
            isLoading={isLoading}
            calendarEvents={calendarEvents}
          />
          <Legend />
        </div>
      </div>
    </div>
  );
}

          {/* <TabsContent value="events">
            {featureFlags.showAddCalendarEventBtn && (
              <div className="flex justify-end mb-4">
                <AddEventModal open={openDialog === "event"} onOpenChange={(open) => setOpenDialog(open ? "event" : null)} />
              </div>
            )}
            <CalendarSection
              calendarEvents={calendarEvents}
              // allowModifyAnnouncements={featureFlags.showAddCalendarEventBtn}
            />
          </TabsContent> */}
