import { Plus } from "lucide-react";
import { ReactNode } from "react";

// Define the type for the icon component
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

// Define PlusIcon as a value with the correct type
const PlusIcon: IconComponent = Plus as IconComponent;

// Type for breadcrumb items
export interface BreadcrumbItem {
  label: string;
  path?: string;
}

// Type for tab header configuration
export interface TabHeaderConfig {
  tabName: string;
  breadcrumbItems: BreadcrumbItem[];
  showAddButton?: boolean;
  addButtonText?: string;
  addButtonIcon?: React.ReactNode; // Changed to ReactNode type
  showSearch?: boolean;
  searchPlaceholder?: string;
  onAddClick?: () => void;
  showLearn?: boolean;
  className?: string;
}

// Custom label mappings
const LABEL_MAP: Record<string, string> = {
  vendor: "Vendor",
  "vendor-profile": "Profile",
  "vendor-account": "Account",
  "vendor-account-manager": "Account Manager",
  "vendor-bank-details": "Bank Details",
  "vendor-business-details": "Business Details",
  "vendor-settings": "Settings",
  "vendor-calendar": "Calendar",
  "vendor-manage-partners": "Partners",
  "vendor-manage-sessions": "Sessions",
  "vendor-developer-access": "Developer Access",
  products: "Products",
  orders: "Orders",
  customers: "Customers",
  payments: "Payments",
  marketing: "Marketing",
  settings: "Settings",
  admin: "Admin",
};

// Generate breadcrumb items from path
export const generateBreadcrumbs = (path: string): BreadcrumbItem[] => {
  const segments = path.split("/").filter(Boolean);
  const items: BreadcrumbItem[] = [];
  let currentPath = "";

  // Always start with Home
  items.push({
    label: "Home",
    path: "/dashboard/vendor",
  });

  // Skip the 'dashboard' segment
  if (segments[0] === "dashboard") {
    segments.shift();
    currentPath = "/dashboard";
  }

  // Process remaining segments
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    currentPath += `/${segment}`;

    // Skip numeric IDs and empty segments
    if (!segment || !isNaN(Number(segment))) continue;

    // Get label from mapping or generate from segment
    const label =
      LABEL_MAP[segment] ||
      segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    items.push({
      label,
      path: i === segments.length - 1 ? undefined : currentPath,
    });
  }

  return items;
};

// Generate full tab header configuration
export const getTabHeaderConfig = (path: string): TabHeaderConfig => {
 const breadcrumbItems = generateBreadcrumbs(path);
  const currentTab = breadcrumbItems[breadcrumbItems.length - 1]?.label || "Dashboard";

  const baseConfig: TabHeaderConfig = {
    tabName: currentTab,
    breadcrumbItems,
    showLearn: true,
    className: "mb-4",
  };

  // Route-specific configurations
  if (path.includes("/products")) {
    return {
      ...baseConfig,
      showAddButton: true,
      addButtonText: "Add New Product",
      addButtonIcon: <Plus className="h-4 w-4" />, 
      showSearch: true,
      searchPlaceholder: "Search products by SKU, name...",
      onAddClick: () => console.log("Add product clicked"),
    };
  }

  if (path.includes("/orders")) {
    return {
      ...baseConfig,
      showSearch: true,
      searchPlaceholder: "Search order by ID, customer...",
    };
  }

  if (path.includes("/customers")) {
    return {
      ...baseConfig,
      showSearch: true,
      searchPlaceholder: "Search customers by name, email...",
    };
  }

  if (path.includes("/payments")) {
    return {
      ...baseConfig,
      showSearch: true,
      searchPlaceholder: "Search payments...",
    };
  }

  if (path.includes("/marketing")) {
    return {
      ...baseConfig,
      showAddButton: true,
      addButtonText: "New Campaign",
      addButtonIcon: "i",
    };
  }

  if (path.includes("/settings")) {
    return {
      ...baseConfig,
      showLearn: false,
    };
  }

  if (path.includes("/admin")) {
    return {
      ...baseConfig,
      showSearch: true,
      searchPlaceholder: "Search...",
    };
  }

  // Default configuration
  return {
    ...baseConfig,
    showAddButton: false,
    showSearch: false,
    showLearn: false,
  };
};