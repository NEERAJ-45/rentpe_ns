// utils/routeConfig.ts
import { LucideIcon } from "lucide-react";
import {
  PlusCircle,
  PackagePlus,
  UserPlus,
  Landmark,
  Megaphone,
  Settings,
  Plus,
} from "lucide-react";

type RouteConfig = {
  path: string;
  tabName: string;
  showButton?: boolean;
  buttonText: string;  // Made required with default in implementation
  buttonIcon: LucideIcon;  // Made required with default in implementation
  searchPlaceholder: string;  // Made required
  showLearn?: boolean;
};

export const ROUTE_CONFIG: Record<string, RouteConfig> = {
  dashboard: {
    path: "/vendor/dashboard",
    tabName: "Dashboard",
    showButton: false,
    buttonText: "Add New",
    buttonIcon: Plus,
    searchPlaceholder: "Search dashboard...",
    showLearn: false,
  },
  orders: {
    path: "/vendor/orders",
    tabName: "Orders Management",
    buttonText: "Create Order",
    buttonIcon: PlusCircle,
    searchPlaceholder: "Search orders by ID, customer...",
  },
  products: {
    path: "/vendor/products",
    tabName: "Products Management",
    buttonText: "Add Product",
    buttonIcon: PackagePlus,
    searchPlaceholder: "Search products by SKU, name...",
  },
  customers: {
    path: "/vendor/customers",
    tabName: "Customers Management",
    buttonText: "Add Customer",
    buttonIcon: UserPlus,
    searchPlaceholder: "Search customers by name, email...",
  },
  payments: {
    path: "/vendor/payments",
    tabName: "Payments Management",
    buttonText: "Record Payment",
    buttonIcon: Landmark,
    searchPlaceholder: "Search payments by transaction ID...",
  },
  marketing: {
    path: "/vendor/marketing",
    tabName: "Marketing",
    buttonText: "Create Campaign",
    buttonIcon: Megaphone,
    searchPlaceholder: "Search campaigns...",
  }
  // ... other routes with all required properties
} as const;

export type RouteKey = keyof typeof ROUTE_CONFIG;