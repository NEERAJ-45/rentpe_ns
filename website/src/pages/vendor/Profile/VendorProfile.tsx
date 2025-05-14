import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  Building,
  Calendar,
  Code,
  History,
  Settings,
  User,
  UserCog,
  Users
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

// Reusable ProfileCard component
interface ProfileCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  buttonText?: string;
  onClick?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  icon: Icon,
  title,
  description,
  buttonText = "View",
  onClick,
}) => {
  return (
    <Card className="border rounded-sm hover:shadow-md">
      <CardContent className="px-3 py-1">
        <div className="flex justify-between items-center">
          <div className="flex items-start gap-3">
            <Icon className="h-6 w-6 lg:h-8 lg:w-8 mt-0.5 text-blue-700" />
            <div>
              <h3 className="font-medium text-gray-900">{title}</h3>
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 rounded-xs p-4 hover:bg-blue-50 hover:text-blue-700"
            onClick={onClick}
          >
            {buttonText}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Main VendorProfile component
const VendorProfile: React.FC = () => {
  const navigate = useNavigate();

  // Card configuration data
  const profileCards = [
    {
      icon: User,
      title: "Account",
      description: "View your display information, pickup address, login detail and primary details",
      onClick: () => navigate("/dashboard/vendor-account")
    },
    {
      icon: UserCog,
      title: "Account Manager",
      description: "View your account manager details",
      onClick: () => navigate("/dashboard/vendor-account-manager")
    },
    {
      icon: Building,
      title: "Bank Details",
      description: "View your bank details",
      onClick: () => navigate("/dashboard/vendor-bank-details")
    },
    {
      icon: Briefcase,
      title: "Business Details",
      description: "View your business details and KYC documents",
      onClick: () => navigate("/dashboard/vendor-business-details")
    },
    {
      icon: Settings,
      title: "Settings",
      description: "Manage your logistics and FBF settings",
      onClick: () => navigate("/dashboard/vendor-settings")
    },
    {
      icon: Calendar,
      title: "Calendar",
      description: "View your working hours, Holiday list and vacation plans",
      onClick: () => navigate("/dashboard/vendor-calendar")
    },
    {
      icon: Users,
      title: "Manage Partners",
      description: "Manage your partners, add, edit, delete roles and permissions given to access dashboard",
      onClick: () => navigate("/dashboard/vendor-manage-partners")
    },
    {
      icon: History,
      title: "Manage Sessions",
      description: "Manage your sessions, View IP Address and delete sessions",
      onClick: () => navigate("/dashboard/vendor-manage-sessions")
    },
    {
      icon: Code,
      title: "Developer Access",
      description: "Manage the Developer access to your seller portal",
      onClick: () => navigate("/dashboard/vendor-developer-access")
    },
  ];

  return (
    <React.Fragment>
      <div className="max-w-8xl mx-auto p-1 space-y-4">
        {/* Account Status Banner */}
        <div className="bg-blue-50 px-4 py-3 rounded-sm border border-blue-100">
          <p className="text-sm font-medium text-blue-800">
            Your account is <span className="font-bold">ONBOARDING</span>
          </p>
        </div>

        {/* Render all profile cards */}
        {profileCards.map((card, index) => (
          <ProfileCard
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
            onClick={card.onClick}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default VendorProfile;