// pages/partners.tsx
import { Users } from "lucide-react"
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

export function Partners() {
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
  ]

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-600" />
            <CardTitle>Manage Partners</CardTitle>
          </div>
          <Button>Invite Partner</Button>
        </CardHeader>
        <CardContent>
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
                        <Badge key={perm} variant="secondary">
                          {perm}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{partner.lastActive}</TableCell>
                  <TableCell>
                    <Badge variant={partner.status === "active" ? "default" : "destructive"}>
                      {partner.status}
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
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Roles & Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Operations Manager</h4>
              <div className="space-y-2">
                {["orders", "inventory", "shipments"].map((perm) => (
                  <div key={perm} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-sm capitalize">{perm}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Customer Support</h4>
              <div className="space-y-2">
                {["orders", "customers", "returns"].map((perm) => (
                  <div key={perm} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-sm capitalize">{perm}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Developer</h4>
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
          
          <div className="mt-6 flex justify-end">
            <Button variant="outline">Manage Roles</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}