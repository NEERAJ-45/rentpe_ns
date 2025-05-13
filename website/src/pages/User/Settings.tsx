// pages/settings.tsx
import { Settings as SettingsIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export  default function Settings() {
  const settings = {
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
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <SettingsIcon className="h-6 w-6 text-blue-600" />
            <CardTitle>Settings</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
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
                  <Switch id="email-notifications" checked={settings.notifications.email} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive urgent alerts via SMS
                    </p>
                  </div>
                  <Switch id="sms-notifications" checked={settings.notifications.sms} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Get real-time updates on your mobile device
                    </p>
                  </div>
                  <Switch id="push-notifications" checked={settings.notifications.push} />
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
                  <Switch id="auto-confirm" checked={settings.logistics.autoConfirmOrders} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shipping-method">Default Shipping Method</Label>
                  <select
                    id="shipping-method"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue={settings.logistics.defaultShippingMethod}
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
                    defaultValue={settings.logistics.warehouseLocation}
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
                  <Switch id="fbf-automation" checked={settings.fbf.enableAutomation} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="low-stock">Low Stock Threshold</Label>
                  <input
                    id="low-stock"
                    type="number"
                    defaultValue={settings.fbf.lowStockThreshold}
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
                  <Switch id="restock-alerts" checked={settings.fbf.restockAlert} />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-4">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}