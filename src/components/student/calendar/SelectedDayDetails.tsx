import { useState } from "react";
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
import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditEventModal from "@/components/common/calendar/EditEventModal";
import { useDeleteEvent } from "@/hooks/student/use-delete-event";

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
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const { handleDeleteEvent, isDeleting } = useDeleteEvent();

  const formattedDate = selectedDate?.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const selectedDayEvents = calendarEvents.filter(
    (event) => new Date(event.deadline_at).getDate() === selectedDate.getDate()
  );

  const handleDelete = async (eventId: number) => {
    try {
      setPendingDeleteId(eventId);
      await handleDeleteEvent(eventId);
    } finally {
      setPendingDeleteId(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <p>{formattedDate}</p>
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
          {selectedDayEvents?.map((event) => (
            <Item key={event.id} className="flex items-start justify-between">
              <ItemMedia variant="icon">
                {EVENT_TYPE_TO_STYLINGS[event.type].icon}
              </ItemMedia>
              <ItemContent>
                {/* Title + Edit & Delete Buttons */}
                <div className="flex items-start justify-between gap-2">
                  <ItemTitle className="flex-1">
                    <Badge
                      className={`capitalize mr-2 ${EVENT_TYPE_TO_STYLINGS[event.type].backgroundColorClassName}`}
                    >
                      {EVENT_TYPE_TO_STYLINGS[event.type].prettyName || event.type}
                    </Badge>
                    {event.title}
                  </ItemTitle>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1 shrink-0">
                    <EditEventModal event={event} />

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(event.id)}
                      disabled={isDeleting && pendingDeleteId === event.id}
                    >
                      {isDeleting && pendingDeleteId === event.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <ItemDescription>
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
