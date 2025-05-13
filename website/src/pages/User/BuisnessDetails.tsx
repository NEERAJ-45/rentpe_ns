// pages/business-details.tsx
import { useState, useRef } from 'react';
import { Building2, MapPin, Phone, Mail, Globe2, Clock, Users } from 'lucide-react';
import { motion, PanInfo, useDragControls } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function BusinessDetails() {
    const [business, setBusiness] = useState({
        name: 'RentPe',
        industry: 'E-commerce - Rental',
        founded: '2018',
        employees: '50',
        status: 'Active',
        address: '456 Rent St, Los Angeles, CA 90001',
        phone: '+1 (555) 987-6543',
        email: 'support@rentify.com',
        website: 'https://rentify.com',
        hours: 'Mon-Sun: 8AM-8PM',
        description:
            'RentPe is an online marketplace for renting products, from home appliances to electronics, for short-term and long-term needs. We make renting easier and more affordable for everyone.',
    });
    const [dimensions, setDimensions] = useState({
        width: 700,
        height: 600,
        x: 0,
        y: 0,
    });

    const constraintsRef = useRef(null);
    const dragControls = useDragControls();

    const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        setDimensions((prev) => ({
            ...prev,
            x: info.point.x,
            y: info.point.y,
        }));
    };

    const handleResize = (direction: string, delta: number) => {
        setDimensions((prev) => {
            const newWidth = Math.max(
                500,
                Math.min(900, prev.width + (direction === 'right' ? delta : -delta))
            );
            const newHeight = Math.max(
                400,
                Math.min(800, prev.height + (direction === 'bottom' ? delta : -delta))
            );
            return { ...prev, width: newWidth, height: newHeight };
        });
    };

    return (
        <div
            ref={constraintsRef}
            className="relative h-screen w-full p-4 bg-gray-50 overflow-hidden"
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
                className="absolute bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
            >
                <Card className="h-full w-full">
                    <CardHeader
                        className="cursor-move border-b bg-gradient-to-r from-blue-50 to-gray-50"
                        onPointerDown={(e) => dragControls.start(e)}
                    >
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-3">
                                <Building2 className="h-6 w-6 text-blue-600" />
                                <CardTitle className="text-xl font-semibold">
                                    {business.name}
                                </CardTitle>
                                <Badge
                                    variant={
                                        business.status === 'Active' ? 'default' : 'destructive'
                                    }
                                >
                                    {business.status}
                                </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Drag header to move • Resize from edges
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="h-[calc(100%-65px)] overflow-auto p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-6">
                                {/* Basic Info */}
                                <div className="space-y-2">
                                    <h3 className="text-lg font-medium flex items-center gap-2">
                                        <Building2 className="h-5 w-5 text-blue-500" />
                                        Business Information
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Industry
                                            </p>
                                            <p className="font-medium">{business.industry}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Founded</p>
                                            <p className="font-medium">{business.founded}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Employees
                                            </p>
                                            <p className="font-medium flex items-center gap-1">
                                                <Users className="h-4 w-4" />
                                                {business.employees}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="space-y-3">
                                    <h3 className="text-lg font-medium flex items-center gap-2">
                                        <Phone className="h-5 w-5 text-blue-500" />
                                        Contact Information
                                    </h3>
                                    <div className="space-y-2">
                                        <div className="flex items-start gap-3">
                                            <MapPin className="h-5 w-5 mt-0.5 text-gray-500" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">
                                                    Address
                                                </p>
                                                <p className="font-medium">{business.address}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Phone className="h-5 w-5 mt-0.5 text-gray-500" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">
                                                    Phone
                                                </p>
                                                <p className="font-medium">{business.phone}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Mail className="h-5 w-5 mt-0.5 text-gray-500" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">
                                                    Email
                                                </p>
                                                <p className="font-medium">{business.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Globe2 className="h-5 w-5 mt-0.5 text-gray-500" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">
                                                    Website
                                                </p>
                                                <a
                                                    href={business.website}
                                                    className="font-medium text-blue-600 hover:underline"
                                                >
                                                    {business.website.replace(/^https?:\/\//, '')}
                                                </a>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Clock className="h-5 w-5 mt-0.5 text-gray-500" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">
                                                    Business Hours
                                                </p>
                                                <p className="font-medium">{business.hours}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                {/* Description */}
                                <div className="space-y-3">
                                    <h3 className="text-lg font-medium">About the Business</h3>
                                    <p className="text-gray-700">{business.description}</p>
                                </div>

                                {/* Recent Activity */}
                                <div className="space-y-3">
                                    <h3 className="text-lg font-medium">Recent Activity</h3>
                                    <div className="space-y-4">
                                        <div className="border-l-2 border-blue-500 pl-4">
                                            <p className="text-sm font-medium">
                                                New rental agreement signed
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                May 10, 2023
                                            </p>
                                        </div>
                                        <div className="border-l-2 border-green-500 pl-4">
                                            <p className="text-sm font-medium">
                                                New product categories added
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                April 5, 2023
                                            </p>
                                        </div>
                                        <div className="border-l-2 border-yellow-500 pl-4">
                                            <p className="text-sm font-medium">
                                                Seasonal discount campaign
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                March 25, 2023
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="space-y-3">
                                    <h3 className="text-lg font-medium">Quick Actions</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <Button variant="outline" size="sm">
                                            Send Message
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            Schedule Visit
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            View Products
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            Add Note
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>

                    {/* Resize handles */}
                    <motion.div
                        className="absolute right-0 bottom-0 w-4 h-4 cursor-se-resize bg-blue-500 rounded-tl-full z-10"
                        drag
                        dragConstraints={constraintsRef}
                        onDrag={(e, info) => {
                            handleResize('right', info.offset.x);
                            handleResize('bottom', info.offset.y);
                        }}
                        dragElastic={0}
                    />
                    <motion.div
                        className="absolute right-0 top-0 w-full h-2 cursor-ns-resize hover:bg-gray-200/50 z-10"
                        drag="y"
                        dragConstraints={constraintsRef}
                        onDrag={(e, info) => handleResize('top', info.offset.y)}
                        dragElastic={0}
                    />
                    <motion.div
                        className="absolute left-0 bottom-0 w-2 h-full cursor-ew-resize hover:bg-gray-200/50 z-10"
                        drag="x"
                        dragConstraints={constraintsRef}
                        onDrag={(e, info) => handleResize('left', info.offset.x)}
                        dragElastic={0}
                    />
                </Card>
            </motion.div>
        </div>
    );
}
