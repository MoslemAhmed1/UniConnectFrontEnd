import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import type { Course } from "@/types/student/course";

type AvailableCoursesSheetProps = {
  availableCourses: Course[];
}

export default function AvailableCoursesSheet({availableCourses}: AvailableCoursesSheetProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-foreground">My Courses</h1>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Assign Self To Course
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px] gap-0">
          <SheetHeader className="p-6">
            <SheetTitle className="text-gray-800 text-xl">Available Courses</SheetTitle>
            <SheetDescription>
              Select a course to assign yourself as an instructor
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-180px)] p-6">
            <div className="space-y-4">
              {availableCourses.map((course) => (
                <Card key={course.code} className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={course.image_url}
                      alt={course.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{course.name}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline">{course.code}</Badge>
                        <Badge variant="secondary">{course.class}</Badge>
                      </div>
                      <Badge className="bg-muted text-muted-foreground">Not assigned</Badge>
                    </div>
                  </div>
                  {/* TODO: Implement Assign Self To Course */}
                  <Button
                    className="w-full"
                    // onClick={}
                  >
                    Assign to me
                  </Button>
                </Card>
              ))}
            </div>
          </ScrollArea>
          <div className="p-6">
            {/* TODO: Implement Create New Course */}
            <Link to="">
              <Button variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Create New Course
              </Button>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}