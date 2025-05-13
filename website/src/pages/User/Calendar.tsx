'use client';

import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { motion, useDragControls, PanInfo } from 'framer-motion';
import { CalendarIcon } from 'lucide-react';
import { format, parseISO, isBefore, addDays } from 'date-fns';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

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

const MIN_WIDTH = 700;
const MAX_WIDTH = 1200;
const MIN_HEIGHT = 600;
const MAX_HEIGHT = 1000;

export default function CalendarPage() {
    const [dimensions, setDimensions] = useState({
        width: 900,
        height: 850,
        x: 0,
        y: 0,
    });

    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [showVacationModal, setShowVacationModal] = useState(false);
    const [showWorkingHoursModal, setShowWorkingHoursModal] = useState(false);

    const constraintsRef = useRef<HTMLDivElement>(null);
    const dragControls = useDragControls();

    const holidays: Holiday[] = useMemo(
        () => [
            { date: '2023-01-01', name: "New Year's Day" },
            { date: '2023-07-04', name: 'Independence Day' },
            { date: '2023-12-25', name: 'Christmas Day' },
        ],
        []
    );

    const [vacations, setVacations] = useState<Vacation[]>([
        { start: '2023-06-15', end: '2023-06-22', name: 'Summer Vacation' },
        { start: '2023-11-20', end: '2023-11-27', name: 'Thanksgiving Break' },
    ]);

    const [workingHours, setWorkingHours] = useState<WorkingHours>({
        monday: { start: '09:00', end: '17:00' },
        tuesday: { start: '09:00', end: '17:00' },
        wednesday: { start: '09:00', end: '17:00' },
        thursday: { start: '09:00', end: '17:00' },
        friday: { start: '09:00', end: '16:00' },
        saturday: { start: '', end: '' },
        sunday: { start: '', end: '' },
    });

    const [vacationStart, setVacationStart] = useState<Date>();
    const [vacationEnd, setVacationEnd] = useState<Date>();
    const [vacationName, setVacationName] = useState('');

    useEffect(() => {
        if (constraintsRef.current) {
            const container = constraintsRef.current.getBoundingClientRect();
            setDimensions((prev) => ({
                ...prev,
                x: (container.width - prev.width) / 2,
                y: (container.height - prev.height) / 2,
            }));
        }
    }, []);

    const handleDragStart = useCallback(() => {
        setIsDragging(true);
    }, []);

    const handleDragEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleDrag = useCallback((_: any, info: PanInfo) => {
        setDimensions((prev) => ({
            ...prev,
            x: info.point.x,
            y: info.point.y,
        }));
    }, []);

    const handleResize = useCallback((dx: number, dy: number) => {
        setIsResizing(true);
        setDimensions((prev) => ({
            ...prev,
            width: Math.min(Math.max(MIN_WIDTH, prev.width + dx), MAX_WIDTH),
            height: Math.min(Math.max(MIN_HEIGHT, prev.height + dy), MAX_HEIGHT),
        }));
    }, []);

    const handleResizeEnd = useCallback(() => {
        setIsResizing(false);
    }, []);

    const handleScheduleVacation = useCallback(() => {
        if (!vacationStart || !vacationEnd || !vacationName) {
            toast.error('Please fill all vacation details');
            return;
        }

        if (isBefore(vacationEnd, vacationStart)) {
            toast.error('End date must be after start date');
            return;
        }

        const newVacation = {
            start: vacationStart.toISOString().split('T')[0],
            end: vacationEnd.toISOString().split('T')[0],
            name: vacationName,
        };

        setVacations((prev) => [...prev, newVacation]);
        setVacationStart(undefined);
        setVacationEnd(undefined);
        setVacationName('');
        setShowVacationModal(false);

        toast.success('Vacation scheduled successfully', {
            description: `${newVacation.name} from ${formatDate(newVacation.start)} to ${formatDate(
                newVacation.end
            )}`,
            duration: 3000,
        });
    }, [vacationStart, vacationEnd, vacationName]);

    const formatDate = (dateString: string) => {
        try {
            return format(parseISO(dateString), 'MMM dd, yyyy');
        } catch (error) {
            console.error('Error formatting date:', error);
            return dateString;
        }
    };

    const handleStartDateSelect = (date: Date | undefined) => {
        setVacationStart(date);
        // If end date is before new start date, reset end date
        if (date && vacationEnd && isBefore(vacationEnd, date)) {
            setVacationEnd(undefined);
        }
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
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                style={{
                    width: dimensions.width,
                    height: dimensions.height,
                    x: dimensions.x,
                    y: dimensions.y,
                    cursor: isDragging ? 'grabbing' : 'default',
                }}
                className={`absolute bg-background rounded-2xl shadow-xl border overflow-hidden ${
                    isDragging ? 'border-primary/50' : 'border-transparent'
                } ${isResizing ? 'pointer-events-none' : ''}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
            >
                <Card className="h-full w-full flex flex-col">
                    <CardHeader
                        onPointerDown={(e) => {
                            e.preventDefault();
                            dragControls.start(e);
                        }}
                        className={`cursor-move border-b p-4 transition-colors ${
                            isDragging ? 'bg-muted/50' : 'bg-background'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <CalendarIcon className="h-5 w-5 text-primary" />
                                <CardTitle className="text-lg">Calendar Dashboard</CardTitle>
                            </div>
                            <Badge variant="outline" className="text-xs">
                                {isDragging ? 'Dragging...' : 'Drag to move • Resize from corner'}
                            </Badge>
                        </div>
                    </CardHeader>

                    <CardContent className="flex-1 overflow-auto p-6 space-y-8">
                        <section className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Working Hours</h3>
                                <div className="space-y-3">
                                    {Object.entries(workingHours).map(([day, hours]) => (
                                        <div
                                            key={day}
                                            className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50"
                                        >
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
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => setShowWorkingHoursModal(true)}
                                    disabled={isDragging || isResizing}
                                >
                                    Edit Working Hours
                                </Button>
                            </div>

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

                        <section className="grid md:grid-cols-2 gap-6">
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
                                                    disabled={isDragging || isResizing}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {vacationStart ? (
                                                        format(vacationStart, 'PPP')
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={vacationStart}
                                                    onSelect={handleStartDateSelect}
                                                    initialFocus
                                                    fromDate={new Date()}
                                                    className="rounded-md border"
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
                                                    disabled={
                                                        !vacationStart || isDragging || isResizing
                                                    }
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {vacationEnd ? (
                                                        format(vacationEnd, 'PPP')
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={vacationEnd}
                                                    onSelect={setVacationEnd}
                                                    initialFocus
                                                    fromDate={vacationStart ? addDays(vacationStart, 1) : new Date()}
                                                    className="rounded-md border"
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    <Button
                                        className="w-full"
                                        disabled={
                                            !vacationStart ||
                                            !vacationEnd ||
                                            isDragging ||
                                            isResizing
                                        }
                                        onClick={() => setShowVacationModal(true)}
                                    >
                                        Schedule Vacation
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-semibold">Upcoming Vacations</h4>
                                <div className="space-y-3">
                                    {vacations.map((vacation) => (
                                        <div
                                            key={`${vacation.name}-${vacation.start}`}
                                            className="border p-3 rounded-lg hover:bg-muted/30 transition-colors"
                                        >
                                            <div className="font-medium flex items-center justify-between">
                                                <span>{vacation.name}</span>
                                                <Badge variant="secondary" className="text-xs">
                                                    {formatDate(vacation.start)} -{' '}
                                                    {formatDate(vacation.end)}
                                                </Badge>
                                            </div>
                                            <div className="text-muted-foreground text-sm mt-1">
                                                {Math.ceil(
                                                    (new Date(vacation.end).getTime() -
                                                        new Date(vacation.start).getTime()) /
                                                        (1000 * 60 * 60 * 24)
                                                )}{' '}
                                                days
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </CardContent>

                    <motion.div
                        className="absolute bottom-0 right-0 w-5 h-5 bg-primary cursor-se-resize rounded-tl-md border-t border-l border-primary/50 z-10"
                        drag
                        dragConstraints={constraintsRef}
                        onDrag={(e, info) => handleResize(info.offset.x, info.offset.y)}
                        onDragEnd={handleResizeEnd}
                        dragElastic={0}
                        whileHover={{ scale: 1.1 }}
                        whileDrag={{ scale: 1.1 }}
                    />
                </Card>
            </motion.div>

            <Dialog open={showVacationModal} onOpenChange={setShowVacationModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Schedule Vacation</DialogTitle>
                        <DialogDescription>Confirm your vacation details below</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Vacation Name</label>
                            <Input
                                type="text"
                                value={vacationName}
                                onChange={(e) => setVacationName(e.target.value)}
                                placeholder="e.g., Summer Break"
                                className="mt-1"
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <label className="text-sm font-medium">Start Date</label>
                                <div className="mt-1 p-2 border rounded-md">
                                    {vacationStart ? format(vacationStart, 'PPP') : 'Not selected'}
                                </div>
                            </div>
                            <div className="flex-1">
                                <label className="text-sm font-medium">End Date</label>
                                <div className="mt-1 p-2 border rounded-md">
                                    {vacationEnd ? format(vacationEnd, 'PPP') : 'Not selected'}
                                </div>
                            </div>
                        </div>
                        <div className="text-center py-2 font-medium">
                            Total days:{' '}
                            {vacationStart && vacationEnd
                                ? Math.ceil(
                                      (vacationEnd.getTime() - vacationStart.getTime()) /
                                          (1000 * 60 * 60 * 24)
                                  ) + 1 // +1 to include both start and end dates
                                : 0}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowVacationModal(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleScheduleVacation} disabled={!vacationName}>
                            Confirm Vacation
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={showWorkingHoursModal} onOpenChange={setShowWorkingHoursModal}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit Working Hours</DialogTitle>
                        <DialogDescription>
                            Set your weekly working hours schedule
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        {Object.entries(workingHours).map(([day, hours]) => (
                            <div key={day} className="flex items-center justify-between">
                                <label className="capitalize font-medium w-24">{day}</label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="time"
                                        value={hours.start}
                                        onChange={(e) =>
                                            setWorkingHours((prev) => ({
                                                ...prev,
                                                [day]: { ...prev[day], start: e.target.value },
                                            }))
                                        }
                                        className="h-10"
                                    />
                                    <span>-</span>
                                    <Input
                                        type="time"
                                        value={hours.end}
                                        onChange={(e) =>
                                            setWorkingHours((prev) => ({
                                                ...prev,
                                                [day]: { ...prev[day], end: e.target.value },
                                            }))
                                        }
                                        className="h-10"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowWorkingHoursModal(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                setShowWorkingHoursModal(false);
                                toast.success('Working hours updated');
                            }}
                        >
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}