"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useDragControls, PanInfo } from "framer-motion";
import { Code } from "lucide-react";
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

export default function DeveloperAccessPage() {
  // State for card dimensions and position
  const [dimensions, setDimensions] = useState({
    width: 1100,
    height: 900,
    x: 50,
    y: 50,
  });

  // Refs and controls
  const constraintsRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  // API data
  const apiKeys = [
    {
      id: "key_123",
      name: "Production API",
      key: "sk_live_*******",
      created: "2023-01-15",
      lastUsed: "2023-05-20",
      status: "active",
    },
    {
      id: "key_456",
      name: "Development API",
      key: "sk_test_*******",
      created: "2023-03-10",
      lastUsed: "2023-04-15",
      status: "inactive",
    },
  ];

  const webhooks = [
    {
      id: "wh_123",
      url: "https://api.example.com/webhooks/orders",
      events: ["order.created", "order.updated"],
      status: "active",
    },
    {
      id: "wh_456",
      url: "https://dev.example.com/webhooks/orders",
      events: ["order.created"],
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
      width: Math.min(Math.max(900, prev.width + dx), 1500),
      height: Math.min(Math.max(700, prev.height + dy), 1300),
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
                <Code className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Developer Access</CardTitle>
              </div>
              <Badge variant="outline" className="text-xs">
                Drag to move • Resize from corner
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-auto p-6 space-y-8">
            {/* API Keys Section */}
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">API Keys</h3>
                <Button size="sm">Generate New Key</Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Key</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Last Used</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiKeys.map((key) => (
                      <TableRow key={key.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{key.name}</TableCell>
                        <TableCell>{key.key}</TableCell>
                        <TableCell>{key.created}</TableCell>
                        <TableCell>{key.lastUsed}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={key.status === "active" ? "default" : "secondary"}
                            className="capitalize"
                          >
                            {key.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="h-8">
                            {key.status === "active" ? "Revoke" : "Reactivate"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </section>

            {/* Webhooks Section */}
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Webhooks</h3>
                <Button size="sm">Add Webhook</Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>URL</TableHead>
                      <TableHead>Events</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {webhooks.map((webhook) => (
                      <TableRow key={webhook.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{webhook.url}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {webhook.events.map((event) => (
                              <Badge key={event} variant="secondary" className="text-xs">
                                {event}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={webhook.status === "active" ? "default" : "secondary"}
                            className="capitalize"
                          >
                            {webhook.status}
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

            {/* API Documentation */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold">API Documentation</h3>
              <div className="border rounded-lg p-4 bg-muted/50 hover:bg-muted/70 transition-colors">
                <p className="mb-4">
                  Our API follows RESTful conventions and uses JSON for requests and responses.
                </p>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm">
                    View Documentation
                  </Button>
                  <Button variant="outline" size="sm">
                    Download SDKs
                  </Button>
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