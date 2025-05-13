import { UserCog, Move, MessageSquare, Phone, Calendar, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, PanInfo } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState, useRef } from 'react';

type CardPosition = {
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number;
};

export function AccountManager() {
    // Minimum space between cards
    const CARD_BOUNDARY = 200;

    // Card positions and sizes with initial non-overlapping positions
    const [positions, setPositions] = useState<{
        manager: CardPosition;
        interactions: CardPosition;
    }>({
        manager: { x: 20, y: 20, width: 380, height: 520, zIndex: 20 },
        interactions: { 
            x: 20 + 380 + CARD_BOUNDARY, 
            y: 20, 
            width: 380, 
            height: 400, 
            zIndex: 10 
        },
    });

    const constraintsRef = useRef<HTMLDivElement>(null);
    const resizeData = useRef({
        isResizing: false,
        card: null as 'manager' | 'interactions' | null,
        startX: 0,
        startY: 0,
        startWidth: 0,
        startHeight: 0,
    });

    // Manager data
    const manager = {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        phone: '+1 (555) 123-4567',
        role: 'Senior Account Manager',
        since: 'January 2022',
        status: 'active',
        avatar: '/avatars/sarah-johnson.jpg',
    };

    const interactions = [
        {
            title: 'Account Review',
            date: '2 days ago',
            description: 'Quarterly account performance review completed',
            icon: '📊',
        },
        {
            title: 'Feature Update',
            date: '1 week ago',
            description: 'Discussed new platform features',
            icon: '✨',
        },
        {
            title: 'Onboarding Call',
            date: '3 weeks ago',
            description: 'New service integration walkthrough',
            icon: '🛠️',
        },
    ];

    // Minimum and maximum sizes for cards
    const MIN_CARD_SIZE = { width: 300, height: 300 };
    const MAX_CARD_SIZE = { width: 600, height: 800 };

    // Check if two rectangles overlap with boundary
    const checkCollision = (rect1: CardPosition, rect2: CardPosition) => {
        return (
            rect1.x - CARD_BOUNDARY < rect2.x + rect2.width + CARD_BOUNDARY &&
            rect1.x + rect1.width + CARD_BOUNDARY > rect2.x - CARD_BOUNDARY &&
            rect1.y - CARD_BOUNDARY < rect2.y + rect2.height + CARD_BOUNDARY &&
            rect1.y + rect1.height + CARD_BOUNDARY > rect2.y - CARD_BOUNDARY
        );
    };

    // Ensure position stays within container bounds
    const constrainPosition = (card: CardPosition, container: DOMRect): CardPosition => {
        let newX = card.x;
        let newY = card.y;

        // Constrain X position
        if (newX < 0) newX = 0;
        if (newX + card.width > container.width) newX = container.width - card.width;

        // Constrain Y position
        if (newY < 0) newY = 0;
        if (newY + card.height > container.height) newY = container.height - card.height;

        return { ...card, x: newX, y: newY };
    };

    // Handle card dragging with boundary
    const handleDragEnd = (card: 'manager' | 'interactions', info: PanInfo) => {
        if (resizeData.current.isResizing) return;

        const container = constraintsRef.current?.getBoundingClientRect();
        if (!container) return;

        const otherCard = card === 'manager' ? 'interactions' : 'manager';

        // Calculate new position
        let newX = positions[card].x + info.offset.x;
        let newY = positions[card].y + info.offset.y;

        // Create temporary position to check for collisions
        const tempPosition = {
            ...positions[card],
            x: newX,
            y: newY,
        };

        // Check for collision with other card (including boundary)
        if (checkCollision(tempPosition, positions[otherCard])) {
            // Calculate possible new positions that would avoid collision with boundary
            const positionsToTry = [
                // Push right
                { x: positions[otherCard].x + positions[otherCard].width + CARD_BOUNDARY, y: newY },
                // Push left
                { x: positions[otherCard].x - tempPosition.width - CARD_BOUNDARY, y: newY },
                // Push down
                { x: newX, y: positions[otherCard].y + positions[otherCard].height + CARD_BOUNDARY },
                // Push up
                { x: newX, y: positions[otherCard].y - tempPosition.height - CARD_BOUNDARY },
            ];

            // Find the first position that doesn't collide and is within container
            const validPosition = positionsToTry.find((pos) => {
                const testPos = {
                    ...tempPosition,
                    x: pos.x,
                    y: pos.y,
                };
                return (
                    !checkCollision(testPos, positions[otherCard]) &&
                    pos.x >= 0 &&
                    pos.y >= 0 &&
                    pos.x + tempPosition.width <= container.width &&
                    pos.y + tempPosition.height <= container.height
                );
            });

            // If found a valid position, use it
            if (validPosition) {
                newX = validPosition.x;
                newY = validPosition.y;
            } else {
                // If no valid position found (edge case), revert to original position
                newX = positions[card].x;
                newY = positions[card].y;
            }
        }

        // Constrain to container
        newX = Math.max(0, Math.min(container.width - tempPosition.width, newX));
        newY = Math.max(0, Math.min(container.height - tempPosition.height, newY));

        setPositions((prev) => ({
            ...prev,
            [card]: {
                ...prev[card],
                x: newX,
                y: newY,
                zIndex: 30, // Keep on top
            },
            [otherCard]: {
                ...prev[otherCard],
                zIndex: 10, // Other card goes below
            },
        }));
    };

    // Start resizing a card
    const startResize = (card: 'manager' | 'interactions', e: React.PointerEvent) => {
        e.stopPropagation();
        resizeData.current = {
            isResizing: true,
            card,
            startX: e.clientX,
            startY: e.clientY,
            startWidth: positions[card].width,
            startHeight: positions[card].height,
        };

        document.addEventListener('pointermove', handleResize);
        document.addEventListener('pointerup', stopResize, { once: true });
    };

    // Handle resizing
    const handleResize = (e: PointerEvent) => {
        if (!resizeData.current.isResizing || !resizeData.current.card) return;

        const { card, startX, startY, startWidth, startHeight } = resizeData.current;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        // Calculate new size with constraints
        const newWidth = Math.max(
            MIN_CARD_SIZE.width,
            Math.min(MAX_CARD_SIZE.width, startWidth + deltaX)
        );
        const newHeight = Math.max(
            MIN_CARD_SIZE.height,
            Math.min(MAX_CARD_SIZE.height, startHeight + deltaY)
        );

        setPositions((prev) => ({
            ...prev,
            [card]: {
                ...prev[card],
                width: newWidth,
                height: newHeight,
            },
        }));
    };

    // Stop resizing
    const stopResize = () => {
        resizeData.current.isResizing = false;
        document.removeEventListener('pointermove', handleResize);
    };

    return (
        <div
            ref={constraintsRef}
            className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-indigo-50/50 p-4"
        >
            {/* Account Manager Card */}
            <motion.div
                className="absolute cursor-grab active:cursor-grabbing bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
                style={{
                    x: positions.manager.x,
                    y: positions.manager.y,
                    width: positions.manager.width,
                    height: positions.manager.height,
                    zIndex: positions.manager.zIndex,
                }}
                drag
                dragConstraints={constraintsRef}
                dragElastic={0.1}
                dragMomentum={false}
                onDragEnd={(_, info) => handleDragEnd('manager', info)}
                whileDrag={{
                    scale: 1.02,
                    boxShadow: '0 25px 50px -12px rgba(79, 70, 229, 0.25)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                {/* Resize handle */}
                <div
                    className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize z-30"
                    onPointerDown={(e) => startResize('manager', e)}
                >
                    <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-indigo-400 rounded-br-lg"></div>
                </div>

                <Card className="h-full bg-transparent border-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-blue-50/50"></div>
                    <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

                    <CardHeader className="flex flex-row items-center justify-between pb-3 pt-4 px-5">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 shadow-inner">
                                <UserCog className="h-5 w-5 text-indigo-600" />
                            </div>
                            <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Your Manager
                            </CardTitle>
                        </div>
                        <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 shadow-sm">
                            <Sparkles className="h-3 w-3 mr-1" /> {manager.status}
                        </Badge>
                    </CardHeader>

                    <CardContent className="pt-2 pb-6 px-5">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Avatar className="h-16 w-16 border-2 border-white/50 shadow-lg">
                                        <AvatarImage src={manager.avatar} />
                                        <AvatarFallback className="bg-gradient-to-br from-blue-100 to-indigo-100 text-indigo-800 font-medium">
                                            {manager.name
                                                .split(' ')
                                                .map((n) => n[0])
                                                .join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">
                                        {manager.name}
                                    </h3>
                                    <p className="text-sm text-indigo-600/90">{manager.role}</p>
                                </div>
                            </div>

                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-3 p-2.5 bg-indigo-50/50 rounded-lg">
                                    <span className="font-medium w-24 text-indigo-800/80">
                                        Email:
                                    </span>
                                    <span className="text-gray-800 font-medium">
                                        {manager.email}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 p-2.5 bg-indigo-50/50 rounded-lg">
                                    <span className="font-medium w-24 text-indigo-800/80">
                                        Phone:
                                    </span>
                                    <span className="text-gray-800 font-medium">
                                        {manager.phone}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 p-2.5 bg-indigo-50/50 rounded-lg">
                                    <span className="font-medium w-24 text-indigo-800/80">
                                        Since:
                                    </span>
                                    <span className="text-gray-800 font-medium">
                                        {manager.since}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4 bg-gradient-to-r from-blue-50/70 to-indigo-50/70 rounded-xl border border-indigo-100/50 shadow-inner">
                                <h4 className="font-medium text-indigo-800 flex items-center gap-2">
                                    <span className="p-1 bg-indigo-100 rounded-lg">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-indigo-600"
                                        >
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <polyline points="12 6 12 12 16 14"></polyline>
                                        </svg>
                                    </span>
                                    Support Hours
                                </h4>
                                <p className="text-sm text-indigo-600/90 mt-2 pl-2">
                                    Mon – Fri: 9:00 AM – 6:00 PM (your local time)
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                                    <Button className="w-full gap-1.5 bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-100 shadow-sm hover:shadow-md transition-all">
                                        <Calendar className="h-4 w-4" />
                                        <span>Meet</span>
                                    </Button>
                                </motion.div>
                                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                                    <Button className="w-full gap-1.5 bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-100 shadow-sm hover:shadow-md transition-all">
                                        <MessageSquare className="h-4 w-4" />
                                        <span>Message</span>
                                    </Button>
                                </motion.div>
                                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                                    <Button className="w-full gap-1.5 bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-100 shadow-sm hover:shadow-md transition-all">
                                        <Phone className="h-4 w-4" />
                                        <span>Call</span>
                                    </Button>
                                </motion.div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Interactions Card */}
            <motion.div
                className="absolute cursor-grab active:cursor-grabbing bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
                style={{
                    x: positions.interactions.x,
                    y: positions.interactions.y,
                    width: positions.interactions.width,
                    height: positions.interactions.height,
                    zIndex: positions.interactions.zIndex,
                }}
                drag
                dragConstraints={constraintsRef}
                dragElastic={0.1}
                dragMomentum={false}
                onDragEnd={(_, info) => handleDragEnd('interactions', info)}
                whileDrag={{
                    scale: 1.02,
                    boxShadow: '0 25px 50px -12px rgba(168, 85, 247, 0.25)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                {/* Resize handle */}
                <div
                    className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize z-30"
                    onPointerDown={(e) => startResize('interactions', e)}
                >
                    <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-purple-400 rounded-br-lg"></div>
                </div>
                <Card className="h-full bg-transparent border-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/20 to-purple-50/50"></div>
                    <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-600"></div>

                    <CardHeader className="flex flex-row items-center justify-between pb-3 pt-4 px-5">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 shadow-inner">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-purple-600"
                                >
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                </svg>
                            </div>
                            <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Recent Activity
                            </CardTitle>
                        </div>
                    </CardHeader>

                    <CardContent className="pt-2 pb-6 px-5">
                        <div className="space-y-4">
                            {interactions.map((interaction, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{
                                        y: -2,
                                        backgroundColor: 'rgba(245, 243, 255, 0.6)',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                                    }}
                                    className="p-3 rounded-xl border border-white/20 bg-white/50 backdrop-blur-sm transition-all"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-purple-100/70 rounded-lg text-purple-800">
                                            {interaction.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-medium text-gray-900">
                                                    {interaction.title}
                                                </h4>
                                                <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                                                    {interaction.date}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1.5">
                                                {interaction.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Reset Position Button */}
            <motion.div
                className="fixed bottom-6 right-6 z-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Button
                    onClick={() =>
                        setPositions({
                            manager: { x: 20, y: 20, width: 380, height: 520, zIndex: 20 },
                            interactions: { 
                                x: 20 + 380 + CARD_BOUNDARY, 
                                y: 20, 
                                width: 380, 
                                height: 400, 
                                zIndex: 10 
                            },
                        })
                    }
                    className="gap-2 shadow-lg bg-indigo-600 hover:bg-indigo-700"
                >
                    <Move className="h-4 w-4" />
                    Reset Positions
                </Button>
            </motion.div>
        </div>
    );
}