// components/TabHeader.tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, HelpCircle, Search } from "lucide-react";
import React, { ReactNode, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  path?: string;
  id: string;
}

interface TabHeaderProps {
  tabName: string;
  onAddClick?: () => void;
  addButtonText?: string;
  addButtonIcon?: ReactNode;
  searchPlaceholder?: string;
  showAddButton?: boolean;
  showSearch?: boolean;
  showLearn?: boolean;
  showBreadcrumb?: boolean;
  customButtons?: ReactNode;
  onSearch?: (query: string) => void;
  className?: string;
  breadcrumbOverrides?: Record<string, string>;
}

export function TabHeader({
  tabName,
  onAddClick,
  addButtonText = "Add New",
  addButtonIcon,
  searchPlaceholder = "Search...",
  showAddButton = true,
  showSearch = true,
  showLearn = true,
  showBreadcrumb = true,
  customButtons,
  onSearch,
  className = "",
  breadcrumbOverrides = {},
}: Readonly<TabHeaderProps>) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    // Always start with Home
    breadcrumbs.push({
      label: "Home",
      path: "/dashboard/vendor",
      id: 'home' // Stable identifier
    });

    // Process remaining segments
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const currentPath = `/${segments.slice(0, i + 1).join('/')}`;

      // Skip dashboard segment and numeric IDs
      if (segment === "dashboard" || !isNaN(Number(segment))) continue;

      // Use override if available, otherwise format the segment
      const label = breadcrumbOverrides[segment] ||
        segment.split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

      breadcrumbs.push({
        label,
        path: i === segments.length - 1 ? undefined : currentPath,
        id: `${segment}-${i}` // Create a more stable key
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div className={`space-y-2 ${className}`}>
      {showBreadcrumb && (
        <Breadcrumb className="overflow-x-auto whitespace-nowrap">
          <BreadcrumbList>
            {breadcrumbs.map((crumb) => (
              <React.Fragment key={crumb.id}>
                <BreadcrumbItem>
                  {crumb.path ? (
                    <BreadcrumbLink
                      onClick={() => crumb.path && navigate(crumb.path)}
                      className="flex items-center text-xs font-normal text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {crumb.label}
                    </BreadcrumbLink>
                  ) : (
                    <span className="text-xs text-foreground">
                      {crumb.label}
                    </span>
                  )}
                </BreadcrumbItem>
                {crumb.path && (
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}

      {/* Rest of the component remains the same */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div className="min-w-0">
          <h1 className="text-2xl font-normal tracking-tight truncate">
            {tabName}
          </h1>
        </div>

        <div className="flex flex-col gap-3 w-full sm:w-auto sm:flex-row sm:items-center">
          {showLearn && (
            <Button
              variant="link"
              size="sm"
              className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 p-0 h-auto transition-colors w-full sm:w-auto justify-start sm:justify-center"
            >
              <HelpCircle className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm truncate">
                Learn about {tabName.toLowerCase()}
              </span>
            </Button>
          )}

          {showSearch && (
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                className="pl-9 w-full sm:w-64 focus-visible:ring-1 focus-visible:ring-blue-600 rounded-sm"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          )}

          {customButtons && (
            <div className="flex gap-2 w-full sm:w-auto">
              {customButtons}
            </div>
          )}

          {showAddButton && (
            <Button
              variant="var1"
              onClick={onAddClick}
              className="gap-1.5 w-full sm:w-auto rounded-sm"
              size="sm"
            >
              {addButtonIcon}
              <span className="truncate">{addButtonText}</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}