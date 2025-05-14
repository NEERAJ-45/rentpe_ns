import { Button } from "@/components/ui/button";
import {
  HiOutlineMenu,
  HiOutlineQuestionMarkCircle,
  HiOutlineChatAlt,
} from "react-icons/hi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const VendorNav: React.FC = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleHomeClick = () => {
    navigate("/vendor");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      title: "Rent Online",
      items: [
        {
          title: "All Categories",
          href: "/categories",
          description: "Browse all available rental categories",
        },
        {
          title: "Clothing",
          href: "/clothing",
          description: "Fashion items and apparel rentals",
        },
        {
          title: "Electronics",
          href: "/electronics",
          description: "Tech gadgets and devices for rent",
        },
        {
          title: "Home & Kitchen",
          href: "/home-kitchen",
          description: "Household items and kitchen equipment",
        },
      ],
    },
    {
      title: "Learn",
      items: [
        {
          title: "Getting Started",
          href: "/getting-started",
          description: "Begin your rental business journey",
        },
        {
          title: "Marketing Tips",
          href: "/marketing",
          description: "Promote your rentals effectively",
        },
        {
          title: "Pricing Guide",
          href: "/pricing",
          description: "Set competitive rental prices",
        },
      ],
    },
    {
      title: "Fees",
      items: [
        {
          title: "Commission Rates",
          href: "/commissions",
          description: "Understand our fee structure",
        },
        {
          title: "Payment Schedule",
          href: "/payments",
          description: "When and how you'll get paid",
        },
      ],
    },
  ];

  return (
    // <div className="px-4 md:px-10 py-4 md:py-5 sticky top-0 z-50 ">
    <div
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 border-b",
        scrolled ? "bg-white shadow-sm py-2" : "bg-white/95 backdrop-blur-sm py-2"
      )}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main navigation */}
        <div className="flex items-center justify-between h-16">
          {/* Left section - Logo and mobile menu */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-black mr-2"
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <HiOutlineMenu size={20} />
            </Button>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer flex items-center"
              onClick={handleHomeClick}
            >
              <h1 className="text-black text-2xl sm:text-3xl font-semibold">
                rent<span className="text-blue-600 font-xs">pe</span>
              </h1>
              {/* <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full hidden sm:block">
                  Vendor
                </span> */}
            </motion.div>

            {/* Desktop navigation with NavigationMenu */}
            <NavigationMenu className="hidden md:flex ml-8">
              <NavigationMenuList>
                {navItems.map((navItem) => (
                  <NavigationMenuItem key={navItem.title}>
                    <NavigationMenuTrigger className="text-sm font-medium hover:bg-gray-100 px-3 py-2">
                      {navItem.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {navItem.items.map((item) => (
                          <li key={item.title}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={item.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">
                                  {item.title}
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {item.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right section - Search and actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex items-center text-gray-600 hover:text-gray-900"
            >
              <HiOutlineQuestionMarkCircle className="h-5 w-5 mr-1" />
              <span>Help</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex items-center text-gray-600 hover:text-gray-900"
            >
              <HiOutlineChatAlt className="h-5 w-5 mr-1" />
              <span>Contact</span>
            </Button> */}

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="default"
                className="px-4 md:px-6 py-5 md:py-6 rounded-sm text-[16px] md:text-md font-semibold bg-gradient-to-r from-blue-600 to-blue-500 shadow-sm hover:from-blue-700 hover:to-blue-600"
              >
                Start Renting
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pt-2 pb-4 space-y-2"
          >

            {navItems.map((navItem) => (
              <div key={navItem.title} className="px-2 pt-2 pb-3 space-y-1">
                <h3 className="text-gray-800 font-medium px-3">{navItem.title}</h3>
                {navItem.items.map((item) => (
                  <Button
                    key={item.title}
                    variant="ghost"
                    className="w-full justify-start px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => navigate(item.href)}
                  >
                    {item.title}
                  </Button>
                ))}
              </div>
            ))}

            <div className="pt-2 border-t border-gray-200">
              <Button
                variant="ghost"
                className="w-full justify-start px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                <HiOutlineQuestionMarkCircle className="h-5 w-5 mr-2" />
                Help Center
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                <HiOutlineChatAlt className="h-5 w-5 mr-2" />
                Contact Support
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
    // </div>
  );
};

export default VendorNav;