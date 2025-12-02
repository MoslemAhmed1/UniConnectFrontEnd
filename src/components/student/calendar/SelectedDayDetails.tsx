import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
} from "@/components/ui/item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EVENT_TYPE_TO_STYLINGS } from "@/constants/student/calendar";
import DOMPurify from "dompurify";
import type { CalendarEvent } from "@/types/student/calendar-event";
import { Badge } from "@/components/ui/badge";

type SelectedDayDetailsProps = {
  selectedDate: Date;
  isLoading: boolean;
  calendarEvents: CalendarEvent[];
};

const SelectedDayDetails = ({
  selectedDate,
  isLoading,
  calendarEvents,
}: SelectedDayDetailsProps) => {
  const formatedDate = selectedDate?.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const selectedDayEvents = calendarEvents.filter(
    (event) => new Date(event.deadline_at).getDate() === selectedDate.getDate()
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <p>{formatedDate}</p>
        </CardTitle>
        <CardDescription>
          Select a day to view the details of its deadlines.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-72 h-72 rounded-md border">
          {selectedDayEvents.length === 0 && !isLoading && (
            <p className="ms-3 mt-3">No events at the selected day.</p>
          )}
          {selectedDayEvents?.map((event, index) => (
            <Item key={event.title + index}>
              <ItemMedia variant="icon">
                {EVENT_TYPE_TO_STYLINGS[event.type].icon}
              </ItemMedia>
              <ItemContent>
                <ItemTitle>
                  <Badge
                    className={`capitalize ${EVENT_TYPE_TO_STYLINGS[event.type].backgroundColorClassName}`}
                  >
                    {EVENT_TYPE_TO_STYLINGS[event.type].prettyName ||
                      event.type}
                  </Badge>
                  {event.title}
                </ItemTitle>
                <ItemDescription>
                  {/* Sanitize incoming HTML to prevent XSS */}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(event.notes),
                    }}
                  />
                </ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SelectedDayDetails;
