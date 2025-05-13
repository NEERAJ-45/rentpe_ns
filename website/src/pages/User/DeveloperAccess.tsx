"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useDragControls, PanInfo } from "framer-motion";
import { Code, X, Plus, Download, FileText } from "lucide-react";
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
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ApiKey = {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  status: "active" | "inactive";
};

type Webhook = {
  id: string;
  url: string;
  events: string[];
  status: "active" | "inactive";
};

export default function DeveloperAccessPage() {
  // State for card dimensions and position
  const [dimensions, setDimensions] = useState({
    width: 1100,
    height: 900,
    x: 50,
    y: 50,
  });

  // Modal states
  const [apiKeyModal, setApiKeyModal] = useState<{
    open: boolean;
    mode: "create" | "edit";
    key?: ApiKey;
  }>({ open: false, mode: "create" });

  const [webhookModal, setWebhookModal] = useState<{
    open: boolean;
    mode: "create" | "edit";
    webhook?: Webhook;
  }>({ open: false, mode: "create" });

  const [newApiKey, setNewApiKey] = useState({
    name: "",
    permissions: [] as string[],
  });

  const [newWebhook, setNewWebhook] = useState({
    url: "",
    events: [] as string[],
    secret: "",
  });

  // Refs and controls
  const constraintsRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const resizeHandleRef = useRef<HTMLDivElement>(null);

  // API data
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
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
  ]);

  const [webhooks, setWebhooks] = useState<Webhook[]>([
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
  ]);

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
      const newWidth = Math.max(800, Math.min(prev.width + dx, 1400));
      const newHeight = Math.max(600, Math.min(prev.height + dy, 1200));
      
      return {
        ...prev,
        width: newWidth,
        height: newHeight,
      };
    });
  }, []);

  const toggleApiKeyStatus = (id: string) => {
    setApiKeys(keys =>
      keys.map(key =>
        key.id === id
          ? {
              ...key,
              status: key.status === "active" ? "inactive" : "active",
            }
          : key
      )
    );
  };

  const deleteApiKey = (id: string) => {
    setApiKeys(keys => keys.filter(key => key.id !== id));
  };

  const toggleWebhookStatus = (id: string) => {
    setWebhooks(hooks =>
      hooks.map(hook =>
        hook.id === id
          ? {
              ...hook,
              status: hook.status === "active" ? "inactive" : "active",
            }
          : hook
      )
    );
  };

  const deleteWebhook = (id: string) => {
    setWebhooks(hooks => hooks.filter(hook => hook.id !== id));
  };

  const handleCreateApiKey = () => {
    const newKey: ApiKey = {
      id: `key_${Math.random().toString(36).substring(2, 9)}`,
      name: newApiKey.name,
      key: `sk_${Math.random().toString(36).substring(2, 18)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: "Never",
      status: "active",
    };
    
    setApiKeys([...apiKeys, newKey]);
    setApiKeyModal({ open: false, mode: "create" });
    setNewApiKey({ name: "", permissions: [] });
  };

  const handleCreateWebhook = () => {
    const newHook: Webhook = {
      id: `wh_${Math.random().toString(36).substring(2, 9)}`,
      url: newWebhook.url,
      events: newWebhook.events,
      status: "active",
    };
    
    setWebhooks([...webhooks, newHook]);
    setWebhookModal({ open: false, mode: "create" });
    setNewWebhook({ url: "", events: [], secret: "" });
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
                <Code className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Developer Access</CardTitle>
              </div>
              <Badge variant="outline" className="text-xs">
                Drag to move • Resize from corner
              </Badge>
            </div>
          </CardHeader>

          <ScrollArea className="flex-1">
            <CardContent className="p-6 space-y-8">
              {/* API Keys Section */}
              <section className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">API Keys</h3>
                  <Button 
                    size="sm" 
                    onClick={() => setApiKeyModal({ open: true, mode: "create" })}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Generate New Key
                  </Button>
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
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {apiKeys.map((key) => (
                        <TableRow key={key.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{key.name}</TableCell>
                          <TableCell className="font-mono text-sm">{key.key}</TableCell>
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
                          <TableCell className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8"
                              onClick={() => toggleApiKeyStatus(key.id)}
                            >
                              {key.status === "active" ? "Revoke" : "Reactivate"}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 text-destructive hover:text-destructive"
                              onClick={() => deleteApiKey(key.id)}
                            >
                              Delete
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
                  <Button 
                    size="sm"
                    onClick={() => setWebhookModal({ open: true, mode: "create" })}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Webhook
                  </Button>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>URL</TableHead>
                        <TableHead>Events</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
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
                          <TableCell className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8"
                              onClick={() => toggleWebhookStatus(webhook.id)}
                            >
                              {webhook.status === "active" ? "Deactivate" : "Activate"}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 text-destructive hover:text-destructive"
                              onClick={() => deleteWebhook(webhook.id)}
                            >
                              Delete
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
                    All API requests must be authenticated with your API key.
                  </p>
                  <div className="flex gap-4">
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View Documentation
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download SDKs
                    </Button>
                  </div>
                </div>
              </section>
            </CardContent>
          </ScrollArea>

          {/* Resize handle */}
          <motion.div
            ref={resizeHandleRef}
            className="absolute bottom-0 right-0 w-5 h-5 bg-primary cursor-se-resize rounded-tl-md border-t border-l border-primary/50"
            drag
            dragConstraints={constraintsRef}
            onDrag={(e, info) => handleResize(info.offset.x, info.offset.y)}
            dragElastic={0}
            whileHover={{ backgroundColor: "hsl(var(--primary))", scale: 1.1 }}
            whileDrag={{ backgroundColor: "hsl(var(--primary))", scale: 1.1 }}
          />
        </Card>
      </motion.div>

      {/* API Key Modal */}
      <Dialog 
        open={apiKeyModal.open} 
        onOpenChange={(open) => setApiKeyModal({ ...apiKeyModal, open })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {apiKeyModal.mode === "create" ? "Create New API Key" : "Edit API Key"}
            </DialogTitle>
            <DialogDescription>
              {apiKeyModal.mode === "create" 
                ? "Generate a new API key for your application"
                : "Update the API key details"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newApiKey.name}
                onChange={(e) => setNewApiKey({...newApiKey, name: e.target.value})}
                placeholder="e.g. Production Server"
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Permissions
              </Label>
              <div className="col-span-3 space-y-2">
                {["read", "write", "delete", "admin"].map((permission) => (
                  <div key={permission} className="flex items-center space-x-2">
                    <Switch 
                      id={permission}
                      checked={newApiKey.permissions.includes(permission)}
                      onCheckedChange={(checked) => {
                        setNewApiKey({
                          ...newApiKey,
                          permissions: checked
                            ? [...newApiKey.permissions, permission]
                            : newApiKey.permissions.filter(p => p !== permission)
                        });
                      }}
                    />
                    <Label htmlFor={permission} className="capitalize">
                      {permission}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="submit"
              onClick={handleCreateApiKey}
              disabled={!newApiKey.name}
            >
              {apiKeyModal.mode === "create" ? "Generate Key" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Webhook Modal */}
      <Dialog 
        open={webhookModal.open} 
        onOpenChange={(open) => setWebhookModal({ ...webhookModal, open })}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {webhookModal.mode === "create" ? "Add New Webhook" : "Edit Webhook"}
            </DialogTitle>
            <DialogDescription>
              {webhookModal.mode === "create" 
                ? "Configure a new webhook endpoint"
                : "Update the webhook configuration"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                URL
              </Label>
              <Input
                id="url"
                value={newWebhook.url}
                onChange={(e) => setNewWebhook({...newWebhook, url: e.target.value})}
                placeholder="https://example.com/webhook"
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="events" className="text-right">
                Events
              </Label>
              <Select
                onValueChange={(value) => {
                  if (!newWebhook.events.includes(value)) {
                    setNewWebhook({
                      ...newWebhook,
                      events: [...newWebhook.events, value]
                    });
                  }
                }}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select an event to add" />
                </SelectTrigger>
                <SelectContent>
                  {["order.created", "order.updated", "order.deleted", "payment.processed"].map((event) => (
                    <SelectItem key={event} value={event}>
                      {event}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {newWebhook.events.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                <div className="col-start-2 col-span-3">
                  <div className="flex flex-wrap gap-2">
                    {newWebhook.events.map((event) => (
                      <Badge 
                        key={event} 
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        {event}
                        <button 
                          onClick={() => {
                            setNewWebhook({
                              ...newWebhook,
                              events: newWebhook.events.filter(e => e !== event)
                            });
                          }}
                          className="hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="secret" className="text-right">
                Secret
              </Label>
              <Input
                id="secret"
                type="password"
                value={newWebhook.secret}
                onChange={(e) => setNewWebhook({...newWebhook, secret: e.target.value})}
                placeholder="Optional webhook secret"
                className="col-span-3"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="submit"
              onClick={handleCreateWebhook}
              disabled={!newWebhook.url || newWebhook.events.length === 0}
            >
              {webhookModal.mode === "create" ? "Create Webhook" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}