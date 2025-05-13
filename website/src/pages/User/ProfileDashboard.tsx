import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, UserCog, Building, Briefcase, Settings, Calendar, Users, History, Code } from "lucide-react"
import { Outlet, useNavigate } from "react-router-dom"

export default function AccountDashboard() {
const navigate = useNavigate()

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      <Card className="border shadow-none">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="text-blue-600">
              <User size={24} />
            </div>
            <div>
              <h2 className="font-medium text-gray-800">Account</h2>
              <p className="text-sm text-gray-600">
                View your display information, pickup address, login detail and primary details
              </p>
            </div>
          </div>
          <Button variant="outline" className="h-8 px-4 rounded-sm">
            View
          </Button>
        </CardContent>
      </Card>

      <Card className="border shadow-none">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="text-blue-600">
              <UserCog size={24} />
            </div>
            <div>
              <h2 className="font-medium text-gray-800">Account Manager</h2>
              <p className="text-sm text-gray-600">View your account manager details</p>
            </div>
          </div>
          <Button variant="outline" onClick={()=>{navigate('/user/profile/manage-profile')}} className="h-8 px-4 rounded-sm">
            View
          </Button>
        </CardContent>
      </Card>

      <Card className="border shadow-none">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="text-blue-600">
              <Building size={24} />
            </div>
            <div>
              <h2 className="font-medium text-gray-800">Bank Details</h2>
              <p className="text-sm text-gray-600">View your bank details</p>
            </div>
          </div>
          <Button variant="outline" className="h-8 px-4 rounded-sm">
            View
          </Button>
        </CardContent>
      </Card>

      <Card className="border shadow-none">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="text-blue-600">
              <Briefcase size={24} />
            </div>
            <div>
              <h2 className="font-medium text-gray-800">Business Details</h2>
              <p className="text-sm text-gray-600">View your business details and KYC documents</p>
            </div>
          </div>
          <Button variant="outline" className="h-8 px-4 rounded-sm">
            View
          </Button>
        </CardContent>
      </Card>

      <Card className="border shadow-none">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="text-blue-600">
              <Settings size={24} />
            </div>
            <div>
              <h2 className="font-medium text-gray-800">Settings</h2>
              <p className="text-sm text-gray-600">Manage your logistics and FBF settings</p>
            </div>
          </div>
          <Button variant="outline" className="h-8 px-4 rounded-sm">
            View
          </Button>
        </CardContent>
      </Card>

      <Card className="border shadow-none">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="text-blue-600">
              <Calendar size={24} />
            </div>
            <div>
              <h2 className="font-medium text-gray-800">Calendar</h2>
              <p className="text-sm text-gray-600">View your working hours, Holiday list and vacation plans</p>
            </div>
          </div>
          <Button variant="outline" className="h-8 px-4 rounded-sm">
            View
          </Button>
        </CardContent>
      </Card>

      <Card className="border shadow-none">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="text-blue-600">
              <Users size={24} />
            </div>
            <div>
              <h2 className="font-medium text-gray-800">Manage Partners</h2>
              <p className="text-sm text-gray-600">
                Manage your partners, add, edit, delete roles and permissions given to access dashboard
              </p>
            </div>
          </div>
          <Button variant="outline" className="h-8 px-4 rounded-sm">
            View
          </Button>
        </CardContent>
      </Card>

      <Card className="border shadow-none">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="text-blue-600">
              <History size={24} />
            </div>
            <div>
              <h2 className="font-medium text-gray-800">Manage Sessions</h2>
              <p className="text-sm text-gray-600">Manage your sessions, View IP Address and delete sessions</p>
            </div>
          </div>
          <Button variant="outline" className="h-8 px-4 rounded-sm">
            View
          </Button>
        </CardContent>
      </Card>

      <Card className="border shadow-none">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="text-blue-600">
              <Code size={24} />
            </div>
            <div>
              <h2 className="font-medium text-gray-800">Developer Access</h2>
              <p className="text-sm text-gray-600">Manage the Developer access to your seller portal</p>
            </div>
          </div>
          <Button variant="outline" className="h-8 px-4 rounded-sm">
            View
          </Button>
        </CardContent>
      </Card>

    </div>
  )
}
