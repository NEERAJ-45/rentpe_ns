import type React from "react";
import { useState, useEffect, useMemo } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart,
  Settings,
  Store,
  Tag,
  CreditCard,
  Truck,
  FileText,
  Bell,
  CircleDollarSign,
  User,
  LogOut,
  ChevronRight,
  Megaphone,
  Star,
  Percent,
  RefreshCw,
  HelpCircle,
  Home,
  SidebarCloseIcon,
} from "lucide-react";
import { useAuth } from "@/features/auth/useAuth";
import { Link } from "react-router-dom";

interface SidebarProps {
  currentPath?: string;
  isMobileView: boolean;
  mobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
}

interface NavItem {
  name: string;
  icon: React.ElementType;
  href: string;
}

interface NavSection {
  name: string;
  icon: React.ElementType;
  href: string;
  subItems: NavItem[];
}

const DashboardSidebar: React.FC<SidebarProps> = ({
  currentPath = "/",
  isMobileView,
  mobileMenuOpen,
  onCloseMobileMenu,
}) => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [touchedSection, setTouchedSection] = useState<string | null>(null);
  const [submenuTimeout, setSubmenuTimeout] = useState<NodeJS.Timeout | null>(null);

  // Define navigation sections based on user role
  const adminNavSections: NavSection[] = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
      subItems: [
        { name: "Overview", icon: Home, href: "/admin" },
        { name: "Analytics", icon: BarChart, href: "/admin/analytics" },
      ],
    },
    {
      name: "Catalog",
      icon: Package,
      href: "/admin/products",
      subItems: [
        { name: "All Products", icon: Package, href: "/admin/products" },
        { name: "Categories", icon: Tag, href: "/admin/categories" },
        { name: "Inventory", icon: RefreshCw, href: "/admin/inventory" },
      ],
    },
    {
      name: "Orders",
      icon: ShoppingCart,
      href: "/admin/orders",
      subItems: [
        { name: "All Orders", icon: ShoppingCart, href: "/admin/orders" },
        { name: "Returns", icon: RefreshCw, href: "/admin/returns" },
        { name: "Invoices", icon: FileText, href: "/admin/invoices" },
      ],
    },
    {
      name: "Users",
      icon: Users,
      href: "/admin/users",
      subItems: [
        { name: "Customers", icon: Users, href: "/admin/customers" },
        { name: "Vendors", icon: Store, href: "/admin/vendors" },
        { name: "Admins", icon: User, href: "/admin/admins" },
      ],
    },
    {
      name: "Payments",
      icon: CreditCard,
      href: "/admin/payments",
      subItems: [
        { name: "Transactions", icon: CreditCard, href: "/admin/payments" },
        { name: "Refunds", icon: RefreshCw, href: "/admin/refunds" },
        { name: "Payouts", icon: CircleDollarSign, href: "/admin/payouts" },
      ],
    },
    {
      name: "Marketing",
      icon: Megaphone,
      href: "/admin/marketing",
      subItems: [
        { name: "Promotions", icon: Percent, href: "/admin/promotions" },
        { name: "Featured", icon: Star, href: "/admin/featured" },
        { name: "Campaigns", icon: Megaphone, href: "/admin/campaigns" },
      ],
    },
    {
      name: "Settings",
      icon: Settings,
      href: "/admin/settings",
      subItems: [
        { name: "General", icon: Settings, href: "/admin/settings" },
        { name: "Notifications", icon: Bell, href: "/admin/notifications" },
        { name: "Help", icon: HelpCircle, href: "/admin/help" },
      ],
    },
  ];

  const vendorNavSections: NavSection[] = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard/vendor",
      subItems: [
        { name: "Overview", icon: Home, href: "/dashboard/vendor" },
        // { name: "Analytics", icon: BarChart, href: "/vendor/analytics" },
      ],
    },
    {
      name: "Products",
      icon: Package,
      href: "/dashboard/vendor/products",
      subItems: [
        { name: "All Products", icon: Package, href: "/dashboard/vendor/products" },
        { name: "Add Product", icon: Tag, href: "/dashboard/vendor/products" },
        // { name: "Categories", icon: Tag, href: "/vendor/categories" },
      ],
    },
    {
      name: "Orders",
      icon: ShoppingCart,
      href: "/dashboard/vendor/orders",
      subItems: [
        { name: "All Orders", icon: ShoppingCart, href: "/vendor/orders" },
        { name: "Shipping", icon: Truck, href: "/vendor/shipping" },
        { name: "Returns", icon: RefreshCw, href: "/vendor/returns" },
      ],
    },
    {
      name: "Customers",
      icon: Users,
      href: "/dashboard/vendor/customers",
      subItems: [
        { name: "All Customers", icon: Users, href: "/vendor/customers" },
        { name: "Reviews", icon: Star, href: "/vendor/reviews" },
      ],
    },
    {
      name: "Payments",
      icon: CreditCard,
      href: "/dashboard/vendor/payments",
      subItems: [
        { name: "Earnings", icon: CircleDollarSign, href: "/vendor/earnings" },
        { name: "Transactions", icon: CreditCard, href: "/vendor/transactions" },
        { name: "Invoices", icon: FileText, href: "/vendor/invoices" },
      ],
    },
    {
      name: "Marketing",
      icon: Megaphone,
      href: "/dashboard/vendor/marketing",
      subItems: [
        { name: "Promotions", icon: Percent, href: "/vendor/promotions" },
        { name: "Discounts", icon: Tag, href: "/vendor/discounts" },
      ],
    },
    {
      name: "Settings",
      icon: Settings,
      href: "/dashboard/vendor/settings",
      subItems: [
        { name: "Account", icon: User, href: "/vendor/settings" },
        { name: "Notifications", icon: Bell, href: "/vendor/notifications" },
        { name: "Help", icon: HelpCircle, href: "/vendor/help" },
      ],
    },
  ];

  const userRole = useAuth().user?.role;

  // Use memoized navigation sections based on user role
  const navSections = useMemo(() => {
    return userRole === "admin" ? adminNavSections : vendorNavSections;
  }, [userRole]);

  // Find the active section based on current path
  const activeSection = useMemo(() => {
    return (
      navSections.find(
        (section) =>
          currentPath === section.href ||
          section.subItems.some((item) => currentPath === item.href)
      )?.name || null
    );
  }, [navSections, currentPath]);

  // Handle mouse enter on section
  const handleMouseEnter = (sectionName: string) => {
    if (!isMobileView) {
      if (submenuTimeout) {
        clearTimeout(submenuTimeout);
        setSubmenuTimeout(null);
      }
      setHoveredSection(sectionName);
    }
  };

  // Handle mouse leave on section
  const handleMouseLeave = () => {
    if (!isMobileView) {
      // Add a small delay before closing to allow for movement to submenu
      const timeout = setTimeout(() => {
        setHoveredSection(null);
      }, 200); // 200ms delay
      setSubmenuTimeout(timeout);
    }
  };

  // Handle submenu mouse enter
  const handleSubmenuMouseEnter = (sectionName: string) => {
    if (!isMobileView) {
      if (submenuTimeout) {
        clearTimeout(submenuTimeout);
        setSubmenuTimeout(null);
      }
      setHoveredSection(sectionName);
    }
  };

  // Handle submenu mouse leave
  const handleSubmenuMouseLeave = () => {
    if (!isMobileView) {
      setHoveredSection(null);
    }
  };

  // Handle touch on section for mobile
  const handleTouchSection = (sectionName: string) => {
    if (isMobileView) {
      setTouchedSection(touchedSection === sectionName ? null : sectionName);
    }
  };

  // Reset touched section when mobile menu closes
  useEffect(() => {
    if (!mobileMenuOpen) {
      setTouchedSection(null);
    }
  }, [mobileMenuOpen]);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (submenuTimeout) {
        clearTimeout(submenuTimeout);
      }
    };
  }, [submenuTimeout]);

  // Determine if a section is active or expanded
  const isSectionActive = (sectionName: string) => {
    return activeSection === sectionName;
  };

  const isSectionExpanded = (sectionName: string) => {
    return hoveredSection === sectionName || touchedSection === sectionName;
  };

  // Mobile sidebar
  if (isMobileView) {
    return (
      <div
        className={`fixed inset-0 z-50 bg-opacity-50 transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={onCloseMobileMenu}
      >
        <div
          className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg transition-transform duration-300 transform ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <div className="flex items-center">
              <h1 className="ml-2 text-xl font-semibold">rent<span className="text-blue-600">pe</span></h1>
            </div>
            <button
              onClick={onCloseMobileMenu}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
            >
              {/* close icon */}
              <SidebarCloseIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="overflow-y-auto h-[calc(100%-8rem)]">
            <nav className="p-2">
              {navSections.map((section) => (
                <div key={section.name} className="mb-1">
                  <button
                    onClick={() => handleTouchSection(section.name)}
                    className={`flex items-center justify-between w-full px-4 py-3 text-left rounded-md ${isSectionActive(section.name)
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-800 hover:bg-gray-100"
                      }`}
                  >
                    <div className="flex items-center">
                      <section.icon className="h-4 w-4 mr-3" />
                      <span className="font-normal">{section.name}</span>
                    </div>
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${isSectionExpanded(section.name) ? "rotate-90" : ""
                        }`}
                    />
                  </button>

                  {/* Submenu */}
                  {isSectionExpanded(section.name) && (
                    <div className="ml-6 mt-1 space-y-1 border-l-2 border-gray-200 pl-4">
                      {section.subItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`flex items-center px-3 py-2 text-sm rounded-md ${currentPath === item.href
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                          <item.icon className="h-4 w-4 mr-2" />
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Mobile User Profile */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">
                  {userRole === "admin" ? "Admin Account" : "Vendor Account"}
                </p>
                <div className="flex items-center mt-1">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></div>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
              </div>
              <button className="ml-auto p-1.5 text-gray-500 hover:bg-gray-200 rounded-md">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop sidebar
  return (
    <div className="flex h-full">
      {/* Main Sidebar with Icons */}
      <div className="w-16  bg-white border-r border-gray-200 h-full flex flex-col items-center py-4 px-10">
        {/* Navigation Icons */}
        <nav className="flex-1 w-full">
          {navSections.map((section) => (
            <div
              key={section.name}
              className="relative"
              onMouseEnter={() => handleMouseEnter(section.name)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to={section.href}
                className={`flex flex-col items-center justify-center h-16 w-full relative ${isSectionActive(section.name)
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-gray-900"
                  }`}
              >
                {/* Active indicator */}
                {isSectionActive(section.name) && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-blue-600 rounded-r-md"></div>
                )}

                <section.icon className="h-6 w-5 hover:text-blue-400" />
                <span className="text-xs text-semibold mt-2">{section.name}</span>
              </Link>

              {/* Submenu on hover */}
              {isSectionExpanded(section.name) && (
                <div
                  className="absolute left-16 top-0 w-56 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50"
                  onMouseEnter={() => handleSubmenuMouseEnter(section.name)}
                  onMouseLeave={handleSubmenuMouseLeave}
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-medium text-gray-900">{section.name}</h3>
                  </div>
                  <div className="py-2">
                    {section.subItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center px-4 py-2 text-sm ${currentPath === item.href
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                          }`}
                      >
                        <item.icon className="h-4 w-4 mr-3" />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default DashboardSidebar;