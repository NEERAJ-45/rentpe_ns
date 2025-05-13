import { Button } from "@/components/ui/button";
import {
  HiOutlineMenu,
  HiOutlineQuestionMarkCircle,
  HiOutlineChatAlt,
  HiOutlineUser,
  HiOutlineCog,
  HiOutlineCreditCard,
  HiOutlineCalendar,
  HiOutlineUsers,
  HiOutlineShieldCheck,
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

const UserNav: React.FC = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleHomeClick = () => {
    navigate("/user");
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
      title: "My Account",
      items: [
        {
          title: "Profile",
          href: "/user/profile",
          description: "View and edit your personal information",
          icon: <HiOutlineUser className="mr-2 h-4 w-4" />,
        },
        {
          title: "Settings",
          href: "/user/settings",
          description: "Manage your account preferences",
          icon: <HiOutlineCog className="mr-2 h-4 w-4" />,
        },
        {
          title: "Payment Methods",
          href: "/user/payments",
          description: "Manage your saved payment options",
          icon: <HiOutlineCreditCard className="mr-2 h-4 w-4" />,
        },
      ],
    },
    {
      title: "Activities",
      items: [
        {
          title: "My Rentals",
          href: "/user/rentals",
          description: "View your current and past rentals",
          icon: <HiOutlineCalendar className="mr-2 h-4 w-4" />,
        },
        {
          title: "Wishlist",
          href: "/user/wishlist",
          description: "Items you've saved for later",
          icon: <HiOutlineUsers className="mr-2 h-4 w-4" />,
        },
        {
          title: "Security",
          href: "/user/security",
          description: "Manage your account security",
          icon: <HiOutlineShieldCheck className="mr-2 h-4 w-4" />,
        },
      ],
    },
  ];

  return (
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
              <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full hidden sm:block">
                User
              </span>
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
                                className="flex items-start select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                {item.icon}
                                <div>
                                  <div className="text-sm font-medium leading-none">
                                    {item.title}
                                  </div>
                                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                    {item.description}
                                  </p>
                                </div>
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
            <Button
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
            </Button>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="default"
                className="px-4 md:px-6 py-5 md:py-6 rounded-md md:rounded-full text-[16px] md:text-md font-semibold bg-gradient-to-r from-blue-600 to-blue-500 shadow-sm hover:from-blue-700 hover:to-blue-600"
                onClick={() => navigate("/rentals")}
              >
                Browse Rentals
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
                    {item.icon}
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
  );
};

export default UserNav;