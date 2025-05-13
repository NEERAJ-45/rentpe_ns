"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useDragControls, PanInfo } from "framer-motion";
import { Users, X, Plus } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function PartnersPage() {
  // State for card dimensions and position
  const [dimensions, setDimensions] = useState({
    width: 1000,
    height: 800,
    x: 50,
    y: 50,
  });

  // Modal states
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isManageRolesOpen, setIsManageRolesOpen] = useState(false);
  const [isEditPartnerOpen, setIsEditPartnerOpen] = useState(false);
  const [currentPartner, setCurrentPartner] = useState(null);

  // Refs and controls
  const constraintsRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const resizeHandleRef = useRef<HTMLDivElement>(null);

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

  // Roles data
  const roles = [
    {
      name: "Operations Manager",
      permissions: ["orders", "inventory", "shipments"],
    },
    {
      name: "Customer Support",
      permissions: ["orders", "customers", "returns"],
    },
    {
      name: "Developer",
      permissions: ["api", "settings", "logs"],
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
    setDimensions(prev => {
      const newWidth = Math.min(Math.max(800, prev.width + dx), window.innerWidth - 50);
      const newHeight = Math.min(Math.max(600, prev.height + dy), window.innerHeight - 50);
      
      return {
        ...prev,
        width: newWidth,
        height: newHeight,
      };
    });
  }, []);

  const handleEditPartner = (partner) => {
    setCurrentPartner(partner);
    setIsEditPartnerOpen(true);
  };

  return (
    <div
      ref={constraintsRef}
      className="relative h-screen w-full bg-muted/40 p-4 overflow-hidden"
    >
      {/* Draggable and resizable card */}
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
        className="absolute bg-background rounded-2xl shadow-xl border overflow-hidden flex flex-col"
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
                <Button size="sm" onClick={() => setIsInviteOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Invite Partner
                </Button>
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
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8"
                            onClick={() => handleEditPartner(partner)}
                          >
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
                {roles.map((role) => (
                  <div key={role.name} className="border rounded-lg p-4 space-y-3">
                    <h4 className="font-medium">{role.name}</h4>
                    <div className="space-y-2">
                      {role.permissions.map((perm) => (
                        <div key={perm} className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-green-500" />
                          <span className="text-sm capitalize">{perm}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsManageRolesOpen(true)}
                >
                  Manage Roles
                </Button>
              </div>
            </section>
          </CardContent>

          {/* Resize handle */}
          <motion.div
            ref={resizeHandleRef}
            className="absolute bottom-0 right-0 w-5 h-5 bg-primary cursor-se-resize rounded-tl-md border-t border-l border-primary/50"
            drag
            dragConstraints={constraintsRef}
            onDrag={(e, info) => handleResize(info.offset.x, info.offset.y)}
            dragElastic={0}
            whileHover={{ scale: 1.2 }}
            whileDrag={{ scale: 1.2 }}
          />
        </Card>
      </motion.div>

      {/* Invite Partner Modal */}
      <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Invite New Partner</DialogTitle>
            <DialogDescription>
              Send an invitation to a new partner to collaborate with your team.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" placeholder="Partner name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" type="email" placeholder="partner@example.com" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.name} value={role.name}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsInviteOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Send Invitation</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Manage Roles Modal */}
      <Dialog open={isManageRolesOpen} onOpenChange={setIsManageRolesOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Manage Roles & Permissions</DialogTitle>
            <DialogDescription>
              Configure access levels for different partner roles.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {roles.map((role) => (
              <div key={role.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{role.name}</h4>
                  <Button variant="ghost" size="sm">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {["orders", "inventory", "customers", "shipments", "api", "settings"].map((perm) => (
                    <div key={perm} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`${role.name}-${perm}`} 
                        checked={role.permissions.includes(perm)}
                      />
                      <label
                        htmlFor={`${role.name}-${perm}`}
                        className="text-sm font-medium leading-none capitalize"
                      >
                        {perm}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="pt-4">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add New Role
              </Button>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsManageRolesOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Partner Modal */}
      {currentPartner && (
        <Dialog open={isEditPartnerOpen} onOpenChange={setIsEditPartnerOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Partner</DialogTitle>
              <DialogDescription>
                Update partner details and permissions.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input 
                  id="edit-name" 
                  defaultValue={currentPartner.name} 
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input 
                  id="edit-email" 
                  type="email" 
                  defaultValue={currentPartner.email} 
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right">
                  Role
                </Label>
                <Select defaultValue={currentPartner.role}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.name} value={role.name}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">
                  Permissions
                </Label>
                <div className="col-span-3 grid grid-cols-2 gap-2">
                  {["orders", "inventory", "customers", "shipments", "api", "settings"].map((perm) => (
                    <div key={perm} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`edit-${perm}`} 
                        defaultChecked={currentPartner.permissions.includes(perm)}
                      />
                      <label
                        htmlFor={`edit-${perm}`}
                        className="text-sm font-medium leading-none capitalize"
                      >
                        {perm}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <Select defaultValue={currentPartner.status}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditPartnerOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}