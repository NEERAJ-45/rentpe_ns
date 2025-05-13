// pages/calendar.tsx
import { Calendar as CalendarIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"

export function CalendarPage() {
  const holidays = [
    { date: "2023-01-01", name: "New Year's Day" },
    { date: "2023-07-04", name: "Independence Day" },
    { date: "2023-12-25", name: "Christmas Day" },
  ]

  const vacations = [
    { start: "2023-06-15", end: "2023-06-22", name: "Summer Vacation" },
    { start: "2023-11-20", end: "2023-11-27", name: "Thanksgiving Break" },
  ]

  const workingHours = {
    monday: { start: "09:00", end: "17:00" },
    tuesday: { start: "09:00", end: "17:00" },
    wednesday: { start: "09:00", end: "17:00" },
    thursday: { start: "09:00", end: "17:00" },
    friday: { start: "09:00", end: "16:00" },
    saturday: { start: "", end: "" },
    sunday: { start: "", end: "" },
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-6 w-6 text-blue-600" />
            <CardTitle>Calendar</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium mb-4">Working Hours</h3>
              <div className="space-y-2">
                {Object.entries(workingHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between">
                    <span className="capitalize">{day}</span>
                    <span>
                      {hours.start ? `${hours.start} - ${hours.end}` : "Closed"}
                    </span>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-4">
                Edit Working Hours
              </Button>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Upcoming Holidays</h3>
              <div className="space-y-2">
                {holidays.map((holiday) => (
                  <div key={holiday.date} className="flex justify-between">
                    <span>{holiday.name}</span>
                    <span>{holiday.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Vacation Planner</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-2">Schedule Vacation</h4>
                <div className="grid gap-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        Select Start Date
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" initialFocus />
                    </PopoverContent>
                  </Popover>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        Select End Date
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" initialFocus />
                    </PopoverContent>
                  </Popover>
                  
                  <Button>Schedule Vacation</Button>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Upcoming Vacations</h4>
                <div className="space-y-2">
                  {vacations.map((vacation) => (
                    <div key={vacation.name} className="border p-3 rounded-lg">
                      <div className="font-medium">{vacation.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {vacation.start} to {vacation.end}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}