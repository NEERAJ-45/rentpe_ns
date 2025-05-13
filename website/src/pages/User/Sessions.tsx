"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useDragControls, PanInfo } from "framer-motion";
import { History } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Sessions() {
  // State for card dimensions and position
  const [dimensions, setDimensions] = useState({
    width: 1000,
    height: 800,
    x: 50,
    y: 50,
  });

  // Refs and controls
  const constraintsRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  // Sessions data
  const sessions = [
    {
      id: "session_123",
      device: "MacBook Pro (Chrome)",
      ip: "192.168.1.100",
      location: "New York, US",
      lastActive: "Currently active",
      status: "active",
    },
    {
      id: "session_456",
      device: "iPhone 13 (Safari)",
      ip: "203.0.113.42",
      location: "San Francisco, US",
      lastActive: "2 hours ago",
      status: "inactive",
    },
    {
      id: "session_789",
      device: "Windows PC (Firefox)",
      ip: "198.51.100.17",
      location: "London, UK",
      lastActive: "1 week ago",
      status: "inactive",
    },
  ];

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
      width: Math.min(Math.max(800, prev.width + dx), 1400),
      height: Math.min(Math.max(600, prev.height + dy), 1200),
    }));
  }, []);

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
                <History className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Session Management</CardTitle>
              </div>
              <Badge variant="outline" className="text-xs">
                Drag to move • Resize from corner
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-auto p-6 space-y-8">
            {/* Active Sessions */}
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Active Sessions ({sessions.length})</h3>
                <Button variant="destructive" size="sm">
                  Log Out All Other Devices
                </Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Device</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sessions.map((session) => (
                      <TableRow key={session.id} className="hover:bg-muted/50">
                        <TableCell>{session.device}</TableCell>
                        <TableCell>{session.ip}</TableCell>
                        <TableCell>{session.location}</TableCell>
                        <TableCell>{session.lastActive}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={session.status === "active" ? "default" : "secondary"}
                            className="capitalize"
                          >
                            {session.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={session.status === "active"}
                            className="h-8"
                          >
                            Revoke
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </section>

            {/* Security Recommendations */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold">Security Recommendations</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                    <History className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Regularly Review Active Sessions</h4>
                    <p className="text-sm text-muted-foreground">
                      Check your active sessions periodically and log out any unrecognized devices.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                    <History className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Use Strong Passwords</h4>
                    <p className="text-sm text-muted-foreground">
                      Ensure your account password is strong and unique to prevent unauthorized access.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                    <History className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Enable Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account with 2FA.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Set Up 2FA
                    </Button>
                  </div>
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