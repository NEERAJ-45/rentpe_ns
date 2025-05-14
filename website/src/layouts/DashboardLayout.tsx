import { Plus, HelpCircle, Search as SearchIcon } from "lucide-react";
import { useLocation } from "react-router-dom";
import { TabHeader } from "@/components/TabHeader";
import DashboardNavbar from "@/components/DashboardNavbar";
import Sidebar from "@/components/DashboardSidebar";
import { useState, useEffect } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPath?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, currentPath = "/" }) => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();


  // Helper function to derive tab name from path
  function getDefaultTabName(path: string): string {
    const segments = path.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1];

    if (!lastSegment) return "Dashboard";

    // Convert kebab-case to Title Case
    return lastSegment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  // Get tab header configuration based on current route
  const getTabHeaderConfig = () => {
    const path = location.pathname;
    const baseConfig = {
      tabName: getDefaultTabName(path),
      showLearn: true,
      className: "mb-4",
    };

    // Vendor Dashboard Routes
    if (path.includes("/dashboard/vendor")) {
      if (path.includes("/products")) {
        return {
          ...baseConfig,
          // tabName: "Products Management",
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
          // tabName: "Orders Management",
          showAddButton: false,
          addButtonIcon: <Plus className="h-4 w-4" />,
          showSearch: true,
          searchPlaceholder: "Search order by ID, customer...",
          onAddClick: () => console.log("Add product clicked"),
        };
      }

      if (path.includes("/customers")) {
        return {
          ...baseConfig,
          // tabName: "Customers",
          showAddButton: false,
          showSearch: true,
          searchPlaceholder: "Search customers by name, email...",
        };
      }

      if (path.includes("/payments")) {
        return {
          ...baseConfig,
          // tabName: "Payments",
          showAddButton: false,
        };
      }

      if (path.includes("/marketing")) {
        return {
          ...baseConfig,
          // tabName: "Marketing",
          showAddButton: false,
          showSearch: false,
        };
      }

      if (path.includes("/settings")) {
        return {
          ...baseConfig,
          // tabName: "Profile Settings",
          showLearn: false,
          showAddButton: false,
          showSearch: false,
        };
      }

      // Vendor dashboard home
      if (path.endsWith("/dashboard/vendor") || path.endsWith("/dashboard/vendor/")) {
        return {
          ...baseConfig,
          // tabName: "Dashboard",
          showAddButton: false,
          showSearch: false,
          showLearn: false,
        };
      }
    }

    // Admin Dashboard Routes
    if (path.includes("/dashboard/admin")) {
      return {
        ...baseConfig,
        // tabName: "Admin Dashboard",
        showAddButton: false,
        showSearch: true,
        searchPlaceholder: "Search...",
      };
    }

    // Default configuration
    return {
      ...baseConfig,
      // tabName: "Dashboard",
      showAddButton: false,
      showSearch: false,
      showLearn: false,
    };
  };

  const tabHeaderConfig = getTabHeaderConfig();

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      <DashboardNavbar onMenuClick={toggleMobileMenu} isMobileView={isMobileView} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          currentPath={currentPath}
          isMobileView={isMobileView}
          mobileMenuOpen={mobileMenuOpen}
          onCloseMobileMenu={() => setMobileMenuOpen(false)}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <TabHeader {...tabHeaderConfig} />
          <div className="mx-auto max-w-full">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;