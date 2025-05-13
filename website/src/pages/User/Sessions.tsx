// pages/sessions.tsx
import { History } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function Sessions() {
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
  ]

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <History className="h-6 w-6 text-blue-600" />
            <CardTitle>Manage Sessions</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Active Sessions (3)</h3>
              <Button variant="destructive">Log Out All Other Devices</Button>
            </div>
            
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
                  <TableRow key={session.id}>
                    <TableCell>{session.device}</TableCell>
                    <TableCell>{session.ip}</TableCell>
                    <TableCell>{session.location}</TableCell>
                    <TableCell>{session.lastActive}</TableCell>
                    <TableCell>
                      <Badge variant={session.status === "active" ? "default" : "secondary"}>
                        {session.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={session.status === "active"}
                      >
                        Revoke
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Security Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <History className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Regularly Review Active Sessions</h4>
                <p className="text-sm text-muted-foreground">
                  Check your active sessions periodically and log out any unrecognized devices.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <History className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Use Strong Passwords</h4>
                <p className="text-sm text-muted-foreground">
                  Ensure your account password is strong and unique to prevent unauthorized access.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-2 rounded-full">
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
        </CardContent>
      </Card>
    </div>
  )
}