// app/vendor/VendorDashboardLayout.tsx
import { Outlet, useLocation } from "react-router-dom";
import {
  PlusCircle,
  PackagePlus,
  UserPlus,
  Landmark,
  Megaphone,
  Settings,
  Plus,
} from "lucide-react";
import { TabHeader } from "@/components/TabHeader";

const VendorDashboardLayout: React.FC = () => {
  const location = useLocation();

  // Determine current tab based on route
  const getCurrentTabName = () => {
    const path = location.pathname;
    if (path.includes("orders")) return "Orders Management";
    if (path.includes("products")) return "Products Management";
    if (path.includes("customers")) return "Customers Management";
    if (path.includes("payments")) return "Payments Management";
    if (path.includes("marketing")) return "Marketing";
    if (path.includes("settings")) return "Settings";
    return "Dashboard";
  };

  // Get button configuration
  const getButtonConfig = () => {
    const tabName = getCurrentTabName();
    const configMap = {
      "Orders Management": {
        text: "Create Order",
        icon: <PlusCircle className="h-4 w-4" />,
      },
      "Products Management": {
        text: "Add Product",
        icon: <PackagePlus className="h-4 w-4" />,
      },
      "Customers Management": {
        text: "Add Customer",
        icon: <UserPlus className="h-4 w-4" />,
      },
      "Payments Management": {
        text: "Record Payment",
        icon: <Landmark className="h-4 w-4" />,
      },
      Marketing: {
        text: "Create Campaign",
        icon: <Megaphone className="h-4 w-4" />,
      },
      Settings: {
        text: "Add Setting",
        icon: <Settings className="h-4 w-4" />,
      },
    };

    return configMap[tabName as keyof typeof configMap] || {
      text: "Add New",
      icon: <Plus className="h-4 w-4" />,
    };
  };

  // Get search placeholder
  const getSearchPlaceholder = () => {
    const tabName = getCurrentTabName();
    const placeholderMap = {
      "Orders Management": "Search orders by ID, customer...",
      "Products Management": "Search products by SKU, name...",
      "Customers Management": "Search customers by name, email...",
      "Payments Management": "Search payments by transaction ID...",
      Marketing: "Search campaigns...",
      Settings: "Search settings...",
    };

    return placeholderMap[tabName as keyof typeof placeholderMap] || "Search...";
  };

  const currentTab = getCurrentTabName();
  const buttonConfig = getButtonConfig();
  const searchPlaceholder = getSearchPlaceholder();

  const handleAddClick = () => {
    console.log(`Add action for ${currentTab}`);
  };

  return (
    <div className="w-full mx-auto space-y-6">
      {/* <TabHeader
        tabName={currentTab}
        onAddClick={handleAddClick}
        addButtonText={buttonConfig.text}
        addButtonIcon={buttonConfig.icon}
        searchPlaceholder={searchPlaceholder}
      /> */}
      <Outlet />
    </div>
  );
};

export default VendorDashboardLayout;