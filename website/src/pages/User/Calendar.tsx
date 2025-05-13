"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import { motion, useDragControls, PanInfo } from "framer-motion";
import { CalendarIcon } from "lucide-react";
import { format, parseISO } from "date-fns";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";

// Types for our data
type Holiday = {
  date: string;
  name: string;
};

type Vacation = {
  start: string;
  end: string;
  name: string;
};

type WorkingHours = {
  [key: string]: {
    start: string;
    end: string;
  };
};

export default function CalendarPage() {
  // State for card dimensions and position
  const [dimensions, setDimensions] = useState({
    width: 900,
    height: 850,
    x: 0,
    y: 0,
  });

  // Refs and controls
  const constraintsRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  // Memoized data
  const holidays: Holiday[] = useMemo(() => [
    { date: "2023-01-01", name: "New Year's Day" },
    { date: "2023-07-04", name: "Independence Day" },
    { date: "2023-12-25", name: "Christmas Day" },
  ], []);

  const vacations: Vacation[] = useMemo(() => [
    { start: "2023-06-15", end: "2023-06-22", name: "Summer Vacation" },
    { start: "2023-11-20", end: "2023-11-27", name: "Thanksgiving Break" },
  ], []);

  const workingHours: WorkingHours = useMemo(() => ({
    monday: { start: "09:00", end: "17:00" },
    tuesday: { start: "09:00", end: "17:00" },
    wednesday: { start: "09:00", end: "17:00" },
    thursday: { start: "09:00", end: "17:00" },
    friday: { start: "09:00", end: "16:00" },
    saturday: { start: "", end: "" },
    sunday: { start: "", end: "" },
  }), []);

  // Vacation date state
  const [vacationStart, setVacationStart] = useState<Date | undefined>();
  const [vacationEnd, setVacationEnd] = useState<Date | undefined>();

  // Event handlers
  const handleDrag = useCallback((_: any, info: PanInfo) => {
    setDimensions(prev => ({
      ...prev,
      x: info.point.x,
      y: info.point.y,
    }));
  }, []);

  const handleResize = useCallback((dx: number, dy: number) => {
    setDimensions(prev => ({
      ...prev,
      width: Math.min(Math.max(700, prev.width + dx), 1200),
      height: Math.min(Math.max(700, prev.height + dy), 1200),
    }));
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), "MMM dd, yyyy");
  };

  return (
    <div
      ref={constraintsRef}
      className="relative h-screen w-full bg-muted/40 p-4 overflow-hidden"
    >
      <motion.div
        drag
        dragControls={dragControls}
        dragConstraints={constraintsRef}
        dragMomentum={false}
        onDrag={handleDrag}
        style={{
          width: dimensions.width,
          height: dimensions.height,
          x: dimensions.x,
          y: dimensions.y,
        }}
        className="absolute bg-background rounded-2xl shadow-xl border overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <Card className="h-full w-full flex flex-col">
          <CardHeader
            onPointerDown={(e) => dragControls.start(e)}
            className="cursor-move border-b p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Calendar Dashboard</CardTitle>
              </div>
              <Badge variant="outline" className="text-xs">
                Drag to move • Resize from corner
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-auto p-6 space-y-8">
            {/* Working Hours & Holidays Section */}
            <section className="grid md:grid-cols-2 gap-6">
              {/* Working Hours */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Working Hours</h3>
                <div className="space-y-3">
                  {Object.entries(workingHours).map(([day, hours]) => (
                    <div key={day} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                      <span className="capitalize font-medium">{day}</span>
                      <span className="text-muted-foreground">
                        {hours.start ? (
                          `${hours.start} - ${hours.end}`
                        ) : (
                          <span className="text-red-500">Closed</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Edit Working Hours
                </Button>
              </div>

              {/* Holidays */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Upcoming Holidays</h3>
                <div className="space-y-3">
                  {holidays.map((holiday) => (
                    <div
                      key={holiday.date}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-md"
                    >
                      <span className="font-medium">{holiday.name}</span>
                      <span className="text-muted-foreground text-sm">
                        {formatDate(holiday.date)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Vacation Section */}
            <section className="grid md:grid-cols-2 gap-6">
              {/* Schedule Vacation */}
              <div className="space-y-4">
                <h4 className="font-semibold">Schedule Vacation</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {vacationStart ? (
                            format(vacationStart, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={vacationStart}
                          onSelect={setVacationStart}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                          disabled={!vacationStart}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {vacationEnd ? (
                            format(vacationEnd, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={vacationEnd}
                          onSelect={setVacationEnd}
                          initialFocus
                          disabled={(date) => 
                            !vacationStart || date < vacationStart
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <Button 
                    className="w-full"
                    disabled={!vacationStart || !vacationEnd}
                  >
                    Schedule Vacation
                  </Button>
                </div>
              </div>

              {/* Upcoming Vacations */}
              <div className="space-y-4">
                <h4 className="font-semibold">Upcoming Vacations</h4>
                <div className="space-y-3">
                  {vacations.map((vacation) => (
                    <div
                      key={vacation.name}
                      className="border p-3 rounded-lg hover:bg-muted/30 transition-colors"
                    >
                      <div className="font-medium flex items-center justify-between">
                        <span>{vacation.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {formatDate(vacation.start)} - {formatDate(vacation.end)}
                        </Badge>
                      </div>
                      <div className="text-muted-foreground text-sm mt-1">
                        {Math.ceil(
                          (new Date(vacation.end).getTime() - 
                           new Date(vacation.start).getTime()) / 
                          (1000 * 60 * 60 * 24)
                        )} days
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </CardContent>

          {/* Resize handle */}
          <motion.div
            className="absolute bottom-0 right-0 w-5 h-5 bg-primary cursor-se-resize rounded-tl-md border-t border-l border-primary/50"
            drag
            dragConstraints={constraintsRef}
            onDrag={(e, info) => handleResize(info.offset.x, info.offset.y)}
            dragElastic={0}
            whileHover={{ scale: 1.1 }}
            whileDrag={{ scale: 1.1 }}
          />
        </Card>
      </motion.div>
    </div>
  );
}