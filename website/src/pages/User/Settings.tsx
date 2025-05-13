// pages/settings.tsx
import { useState, useRef, useEffect } from "react";
import { Settings as SettingsIcon } from "lucide-react";
import { motion, PanInfo, useDragControls } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const MIN_WIDTH = 600;
const MAX_WIDTH = 1200;
const MIN_HEIGHT = 500;
const MAX_HEIGHT = 1000;

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    logistics: {
      autoConfirmOrders: true,
      defaultShippingMethod: "express",
      warehouseLocation: "NYC-1",
    },
    fbf: {
      enableAutomation: true,
      lowStockThreshold: 10,
      restockAlert: true,
    },
  });

  const [dimensions, setDimensions] = useState({
    width: 800,
    height: 700,
    x: 0,
    y: 0
  });

  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [originalSettings] = useState(JSON.parse(JSON.stringify(settings)));
  const constraintsRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  // Center panel on first render
  useEffect(() => {
    if (constraintsRef.current) {
      const container = constraintsRef.current.getBoundingClientRect();
      setDimensions(prev => ({
        ...prev,
        x: (container.width - prev.width) / 2,
        y: (container.height - prev.height) / 2
      }));
    }
  }, []);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setDimensions(prev => ({
      ...prev,
      x: info.point.x,
      y: info.point.y
    }));
  };

  const handleResize = (direction: 'left' | 'right' | 'top' | 'bottom', delta: number) => {
    setIsResizing(true);
    setDimensions(prev => {
      const newDimensions = {...prev};
      
      if (direction === 'right') {
        newDimensions.width = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, prev.width + delta));
      } else if (direction === 'left') {
        const newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, prev.width - delta));
        newDimensions.width = newWidth;
        newDimensions.x += prev.width - newWidth;
      } else if (direction === 'bottom') {
        newDimensions.height = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, prev.height + delta));
      } else if (direction === 'top') {
        const newHeight = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, prev.height - delta));
        newDimensions.height = newHeight;
        newDimensions.y += prev.height - newHeight;
      }
      
      return newDimensions;
    });
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
  };

  const handleSettingChange = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    setShowSaveModal(false);
    toast.success("Settings saved successfully", {
      description: "Your preferences have been updated",
      duration: 3000,
    });
  };

  const handleDiscardChanges = () => {
    setSettings(JSON.parse(JSON.stringify(originalSettings)));
    setShowDiscardModal(false);
    toast.info("Changes discarded", {
      description: "Your settings have been reverted",
      duration: 2000,
    });
  };

  const hasChanges = JSON.stringify(settings) !== JSON.stringify(originalSettings);

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
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{
          width: dimensions.width,
          height: dimensions.height,
          x: dimensions.x,
          y: dimensions.y,
          cursor: isDragging ? 'grabbing' : 'default'
        }}
        className={`absolute bg-white rounded-lg shadow-xl overflow-hidden border-2 ${
          isDragging ? 'border-blue-300' : 'border-transparent'
        } ${isResizing ? 'pointer-events-none' : ''}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="h-full w-full">
          <CardHeader 
            className={`cursor-move border-b transition-colors ${
              isDragging ? 'bg-gray-50' : 'bg-white'
            }`}
            onPointerDown={(e) => {
              e.preventDefault();
              dragControls.start(e);
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <SettingsIcon className="h-6 w-6 text-blue-600" />
                <CardTitle>Settings</CardTitle>
              </div>
              <div className="text-sm text-muted-foreground">
                {hasChanges ? "You have unsaved changes" : "Drag from header or resize from edges"}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="h-[calc(100%-60px)] overflow-auto">
            <div className="space-y-8 p-4">
              {/* Notification Settings */}
              <div>
                <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive important updates via email
                      </p>
                    </div>
                    <Switch 
                      id="email-notifications" 
                      checked={settings.notifications.email} 
                      onCheckedChange={(val) => handleSettingChange('notifications', 'email', val)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive urgent alerts via SMS
                      </p>
                    </div>
                    <Switch 
                      id="sms-notifications" 
                      checked={settings.notifications.sms} 
                      onCheckedChange={(val) => handleSettingChange('notifications', 'sms', val)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Get real-time updates on your mobile device
                      </p>
                    </div>
                    <Switch 
                      id="push-notifications" 
                      checked={settings.notifications.push} 
                      onCheckedChange={(val) => handleSettingChange('notifications', 'push', val)}
                    />
                  </div>
                </div>
              </div>
              
              {/* Logistics Settings */}
              <div>
                <h3 className="text-lg font-medium mb-4">Logistics Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-confirm">Auto-confirm Orders</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically confirm incoming orders
                      </p>
                    </div>
                    <Switch 
                      id="auto-confirm" 
                      checked={settings.logistics.autoConfirmOrders} 
                      onCheckedChange={(val) => handleSettingChange('logistics', 'autoConfirmOrders', val)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shipping-method">Default Shipping Method</Label>
                    <select
                      id="shipping-method"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={settings.logistics.defaultShippingMethod}
                      onChange={(e) => handleSettingChange('logistics', 'defaultShippingMethod', e.target.value)}
                    >
                      <option value="standard">Standard (3-5 days)</option>
                      <option value="express">Express (1-2 days)</option>
                      <option value="overnight">Overnight</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="warehouse">Primary Warehouse Location</Label>
                    <select
                      id="warehouse"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={settings.logistics.warehouseLocation}
                      onChange={(e) => handleSettingChange('logistics', 'warehouseLocation', e.target.value)}
                    >
                      <option value="NYC-1">New York City - Facility 1</option>
                      <option value="LA-2">Los Angeles - Facility 2</option>
                      <option value="CHI-3">Chicago - Facility 3</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* FBF Settings */}
              <div>
                <h3 className="text-lg font-medium mb-4">Fulfillment by Business (FBF) Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="fbf-automation">Enable Automation</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically process fulfillment requests
                      </p>
                    </div>
                    <Switch 
                      id="fbf-automation" 
                      checked={settings.fbf.enableAutomation} 
                      onCheckedChange={(val) => handleSettingChange('fbf', 'enableAutomation', val)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="low-stock">Low Stock Threshold</Label>
                    <input
                      id="low-stock"
                      type="number"
                      min="1"
                      max="100"
                      value={settings.fbf.lowStockThreshold}
                      onChange={(e) => handleSettingChange('fbf', 'lowStockThreshold', parseInt(e.target.value) || 0)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="restock-alerts">Restock Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when inventory is low
                      </p>
                    </div>
                    <Switch 
                      id="restock-alerts" 
                      checked={settings.fbf.restockAlert} 
                      onCheckedChange={(val) => handleSettingChange('fbf', 'restockAlert', val)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-4 pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    if (hasChanges) {
                      setShowDiscardModal(true);
                    } else {
                      toast.message("No changes to discard");
                    }
                  }}
                  disabled={isDragging || isResizing}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => hasChanges ? setShowSaveModal(true) : handleSave()}
                  disabled={!hasChanges || isDragging || isResizing}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </CardContent>
          
          {/* Resize handles */}
          <motion.div
            className="absolute right-0 bottom-0 w-4 h-4 cursor-se-resize bg-blue-500 rounded-tl-full z-10"
            drag
            dragConstraints={constraintsRef}
            onDrag={(e, info) => {
              handleResize("right", info.offset.x);
              handleResize("bottom", info.offset.y);
            }}
            onDragEnd={handleResizeEnd}
            dragElastic={0}
          />
          <motion.div
            className="absolute right-0 top-0 w-full h-2 cursor-ns-resize hover:bg-gray-200/50 z-10"
            drag="y"
            dragConstraints={constraintsRef}
            onDrag={(e, info) => handleResize("top", info.offset.y)}
            onDragEnd={handleResizeEnd}
            dragElastic={0}
          />
          <motion.div
            className="absolute left-0 bottom-0 w-2 h-full cursor-ew-resize hover:bg-gray-200/50 z-10"
            drag="x"
            dragConstraints={constraintsRef}
            onDrag={(e, info) => handleResize("left", info.offset.x)}
            onDragEnd={handleResizeEnd}
            dragElastic={0}
          />
        </Card>
      </motion.div>

      {/* Discard Changes Modal */}
      <Dialog open={showDiscardModal} onOpenChange={setShowDiscardModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Discard changes?</DialogTitle>
            <DialogDescription>
              You have unsaved changes. Are you sure you want to discard them? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDiscardModal(false)}>
              Continue Editing
            </Button>
            <Button variant="destructive" onClick={handleDiscardChanges}>
              Discard Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Save Changes Modal */}
      <Dialog open={showSaveModal} onOpenChange={setShowSaveModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save changes?</DialogTitle>
            <DialogDescription>
              Are you sure you want to save these settings? This will update your preferences across all devices.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveModal(false)}>
              Review Changes
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}