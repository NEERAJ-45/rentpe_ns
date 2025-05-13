"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useDragControls, PanInfo } from "framer-motion";
import { Users } from "lucide-react";
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

export default function PartnersPage() {
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

  // Partners data
  const partners = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      role: "Operations Manager",
      permissions: ["orders", "inventory"],
      lastActive: "2 hours ago",
      status: "active",
    },
    {
      id: 2,
      name: "Emily Johnson",
      email: "emily.j@example.com",
      role: "Customer Support",
      permissions: ["orders", "customers"],
      lastActive: "1 day ago",
      status: "active",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.b@example.com",
      role: "Developer",
      permissions: ["api", "settings"],
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
                <Users className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Partners Management</CardTitle>
              </div>
              <Badge variant="outline" className="text-xs">
                Drag to move • Resize from corner
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-auto p-6 space-y-8">
            {/* Partners Table */}
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Partner Accounts</h3>
                <Button size="sm">Invite Partner</Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {partners.map((partner) => (
                      <TableRow key={partner.id}>
                        <TableCell className="font-medium">{partner.name}</TableCell>
                        <TableCell>{partner.email}</TableCell>
                        <TableCell>{partner.role}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {partner.permissions.map((perm) => (
                              <Badge key={perm} variant="secondary" className="text-xs">
                                {perm}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{partner.lastActive}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={partner.status === "active" ? "default" : "destructive"}
                            className="capitalize"
                          >
                            {partner.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="h-8">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </section>

            {/* Roles & Permissions */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold">Roles & Permissions</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="border rounded-lg p-4 space-y-3">
                  <h4 className="font-medium">Operations Manager</h4>
                  <div className="space-y-2">
                    {["orders", "inventory", "shipments"].map((perm) => (
                      <div key={perm} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-sm capitalize">{perm}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 space-y-3">
                  <h4 className="font-medium">Customer Support</h4>
                  <div className="space-y-2">
                    {["orders", "customers", "returns"].map((perm) => (
                      <div key={perm} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-sm capitalize">{perm}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 space-y-3">
                  <h4 className="font-medium">Developer</h4>
                  <div className="space-y-2">
                    {["api", "settings", "logs"].map((perm) => (
                      <div key={perm} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-sm capitalize">{perm}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button variant="outline" size="sm">
                  Manage Roles
                </Button>
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