
// pages/developer-access.tsx
import { Code } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function DeveloperAccessPage() {
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
  ]

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
  ]

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Code className="h-6 w-6 text-blue-600" />
            <CardTitle>Developer Access</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* API Keys Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">API Keys</h3>
                <Button>Generate New Key</Button>
              </div>
              
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
                    <TableRow key={key.id}>
                      <TableCell className="font-medium">{key.name}</TableCell>
                      <TableCell>{key.key}</TableCell>
                      <TableCell>{key.created}</TableCell>
                      <TableCell>{key.lastUsed}</TableCell>
                      <TableCell>
                        <Badge variant={key.status === "active" ? "default" : "secondary"}>
                          {key.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          {key.status === "active" ? "Revoke" : "Reactivate"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Webhooks Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Webhooks</h3>
                <Button>Add Webhook</Button>
              </div>
              
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
                    <TableRow key={webhook.id}>
                      <TableCell className="font-medium">{webhook.url}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {webhook.events.map((event) => (
                            <Badge key={event} variant="secondary">
                              {event}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={webhook.status === "active" ? "default" : "secondary"}>
                          {webhook.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* API Documentation */}
            <div>
              <h3 className="font-medium mb-4">API Documentation</h3>
              <div className="border rounded-lg p-4 bg-muted/50">
                <p className="mb-4">
                  Our API follows RESTful conventions and uses JSON for requests and responses.
                </p>
                <div className="flex gap-4">
                  <Button variant="outline">View Documentation</Button>
                  <Button variant="outline">Download SDKs</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}