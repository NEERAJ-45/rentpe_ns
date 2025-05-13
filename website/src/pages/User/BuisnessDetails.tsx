"use client";

import { useState, useRef, useCallback } from 'react';
import { Building2, MapPin, Phone, Mail, Globe2, Clock, Users, X, Edit2 } from 'lucide-react';
import { motion, PanInfo, useDragControls } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function BusinessDetails() {
  // Business data state
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
    description: 'RentPe is an online marketplace for renting products, from home appliances to electronics, for short-term and long-term needs. We make renting easier and more affordable for everyone.',
  });

  // Edit modal state
  const [editField, setEditField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Card dimensions and position state
  const [dimensions, setDimensions] = useState({
    width: 700,
    height: 600,
    x: 0,
    y: 0,
  });

  // Refs and controls
  const constraintsRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const isResizing = useRef(false);
  const resizeStartDimensions = useRef({ width: 0, height: 0 });

  // Event handlers
  const handleDrag = useCallback((_: any, info: PanInfo) => {
    if (!isResizing.current) {
      setDimensions(prev => ({
        ...prev,
        x: info.point.x,
        y: info.point.y,
      }));
    }
  }, []);

  const startResize = useCallback(() => {
    isResizing.current = true;
    resizeStartDimensions.current = {
      width: dimensions.width,
      height: dimensions.height
    };
  }, [dimensions]);

  const handleResize = useCallback((dx: number, dy: number) => {
    if (isResizing.current) {
      setDimensions(prev => ({
        ...prev,
        width: Math.min(Math.max(500, resizeStartDimensions.current.width + dx), 2000), // You can set a max width here
        height: Math.min(Math.max(400, resizeStartDimensions.current.height + dy), 2000), // Likewise for height
      }));
    }
  }, []);
  
  const stopResize = useCallback(() => {
    isResizing.current = false;
  }, []);

  // Edit handlers
  const openEditModal = (field: string, value: string) => {
    setEditField(field);
    setEditValue(value);
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    if (editField) {
      setBusiness(prev => ({
        ...prev,
        [editField]: editValue,
      }));
    }
    setIsEditModalOpen(false);
  };

  const handleModalOpenChange = (open: boolean) => {
    if (!open) {
      // Reset edit state when modal closes
      setEditField(null);
      setEditValue('');
    }
    setIsEditModalOpen(open);
  };

  // Recent activity data
  const recentActivities = [
    {
      id: 1,
      title: "New rental agreement signed",
      date: "May 10, 2023",
      color: "border-blue-500"
    },
    {
      id: 2,
      title: "New product categories added",
      date: "April 5, 2023",
      color: "border-green-500"
    },
    {
      id: 3,
      title: "Seasonal discount campaign",
      date: "March 25, 2023",
      color: "border-yellow-500"
    }
  ];

  // Field display names
  const fieldDisplayNames: Record<string, string> = {
    name: 'Business Name',
    industry: 'Industry',
    founded: 'Founded Year',
    employees: 'Employees',
    address: 'Address',
    phone: 'Phone Number',
    email: 'Email Address',
    website: 'Website URL',
    hours: 'Business Hours',
    description: 'Description'
  };

  return (
    <div
      ref={constraintsRef}
      className="relative h-screen w-full p-4 bg-gray-50 overflow-hidden"
    >
      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={handleModalOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editField ? `Edit ${fieldDisplayNames[editField] || editField}` : 'Edit Field'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {editField === 'description' ? (
              <div className="space-y-2">
                <Label htmlFor="edit-value">Description</Label>
                <Textarea
                  id="edit-value"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  rows={5}
                  className="min-h-[120px]"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="edit-value">
                  {editField ? fieldDisplayNames[editField] : 'Field'}
                </Label>
                <Input
                  id="edit-value"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Draggable Card */}
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
        className="absolute bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 flex flex-col"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="h-full w-full flex flex-col">
          <CardHeader
            className="cursor-move border-b bg-gradient-to-r from-blue-50 to-gray-50 p-4"
            onPointerDown={(e) => dragControls.start(e)}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <Building2 className="h-6 w-6 text-blue-600" />
                <CardTitle className="text-xl font-semibold">
                  {business.name}
                </CardTitle>
                <Badge variant={business.status === 'Active' ? 'default' : 'destructive'}>
                  {business.status}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Drag header to move • Resize from corner
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-blue-500" />
                      Business Information
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditModal('basicInfo', JSON.stringify({
                        industry: business.industry,
                        founded: business.founded,
                        employees: business.employees
                      }))}
                    >
                      <Edit2 className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Industry</p>
                      <p className="font-medium">{business.industry}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Founded</p>
                      <p className="font-medium">{business.founded}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Employees</p>
                      <p className="font-medium flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {business.employees}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Phone className="h-5 w-5 text-blue-500" />
                      Contact Information
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditModal('contactInfo', JSON.stringify({
                        address: business.address,
                        phone: business.phone,
                        email: business.email,
                        website: business.website,
                        hours: business.hours
                      }))}
                    >
                      <Edit2 className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {[
                      { icon: MapPin, label: 'Address', value: business.address, field: 'address' },
                      { icon: Phone, label: 'Phone', value: business.phone, field: 'phone' },
                      { icon: Mail, label: 'Email', value: business.email, field: 'email' },
                      { icon: Globe2, label: 'Website', value: business.website, field: 'website' },
                      { icon: Clock, label: 'Business Hours', value: business.hours, field: 'hours' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3 group">
                        <item.icon className="h-5 w-5 mt-0.5 text-gray-500" />
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">{item.label}</p>
                          <div className="flex items-center justify-between">
                            {item.field === 'website' ? (
                              <a
                                href={item.value}
                                className="font-medium text-blue-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {item.value.replace(/^https?:\/\//, '')}
                              </a>
                            ) : (
                              <p className="font-medium">{item.value}</p>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => openEditModal(item.field, item.value)}
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Description */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">About the Business</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditModal('description', business.description)}
                    >
                      <Edit2 className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                  <p className="text-gray-700 whitespace-pre-line">{business.description}</p>
                </div>

                {/* Recent Activity */}
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivities.map(activity => (
                      <div key={activity.id} className={`border-l-2 ${activity.color} pl-4 py-1`}>
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                    ))}
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
        </Card>

        {/* Resize handle */}
        <motion.div
          className="absolute right-0 bottom-0 w-4 h-4 cursor-se-resize bg-blue-500 rounded-tl-full z-10"
          drag
          dragConstraints={constraintsRef}
          onDragStart={startResize}
          onDrag={(e, info) => {
            handleResize(info.offset.x, info.offset.y);
          }}
          onDragEnd={stopResize}
          dragElastic={0}
          whileHover={{ scale: 1.2 }}
        />
      </motion.div>
    </div>
  );
}