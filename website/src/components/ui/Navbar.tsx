import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { FiSearch, FiShoppingCart, FiUser, FiMapPin, FiChevronDown } from "react-icons/fi";
import { HiOutlineMenu } from "react-icons/hi";
import { motion } from "framer-motion";
import { ChevronDown, MapPinHouse, ShoppingCart } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCategory } from "@/context/useCategoryContext";

const Navbar: React.FC = () => {

  // const { category, setCategory } = useCategory();

  const { category, setCategory } = useCategory();



  const navigate = useNavigate();
  const location = useLocation();

  const handleAuthClick = () => {
    navigate('/auth')
  }

  const handleHomeClick = () => {
    navigate('/')
  }

  const handleBecomeVendorClick = () => {
    navigate('/vendor')
  }

  return (
    <div className="bg-white text-zinc-700 text-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between px-10 py-4 gap-2">
        {/* Left section */}
        <div className="flex items-center space-x-2 md:space-x-6 flex-shrink-0">
          {/* Mobile menu button */}
          {/* <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-[#232F3E]"
                aria-label="Open menu"
              >
                <HiOutlineMenu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-[#131921] text-white w-64">
              <div className="mt-8 space-y-2">
                <Button variant="ghost" className="w-full justify-start hover:bg-[#232F3E] py-3">All Categories</Button>
                <Button variant="ghost" className="w-full justify-start hover:bg-[#232F3E] py-3">Today's Deals</Button>
                <Button variant="ghost" className="w-full justify-start hover:bg-[#232F3E] py-3">Customer Service</Button>
              </div>
            </SheetContent>
          </Sheet> */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-black"
            aria-label="Open menu"
          >
            <HiOutlineMenu size={20} />
          </Button>

          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer flex items-center">
            <h1 onClick={handleHomeClick} className="text-black text-3xl font-semibold">rent<span className="text-blue-700">pe</span></h1>
          </motion.div>

          {/* Location */}
          {location.pathname !== '/auth' && (
            <div className="hidden md:flex items-center text-xs hover:border hover:border-white p-1 rounded cursor-pointer">
              {/* <FiMapPin className="mr-2" size={16} /> */}
              <MapPinHouse className="mr-2" size={16} />
              <div>
                <p className="text-gray-700">Delivering to Pune 411001</p>
                <p className="font-bold">Update location</p>
              </div>
            </div>
          )}
        </div>

        {/* Search bar */}
        <div className="hidden md:flex flex-grow mx-2 max-w-2xl">
          <Select
            onValueChange={(value) => setCategory(value)}
          >
            <SelectTrigger className="w-fit text-sm text-black rounded-none border-r-1 focus:ring-0">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="electronics">electronics</SelectItem>
              <SelectItem value="fashion">fashion</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="text"
            className="rounded-none border-l-0 border-r-0 focus-visible:ring-0"
            placeholder="Search rentpe"
          />
          <Button
            variant={"var1"}
            className="rounded-none px-4"
            aria-label="Search"
          >
            <h2 className="font-normal text-sm">Search</h2>
            {/* <FiSearch className="text-white" size={10} /> */}
          </Button>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-1 md:space-x-8">
          {/* Mobile search icon */}
          {/* <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-[#232F3E]"
            aria-label="Search"
          >
            <FiSearch size={18} />
          </Button> */}

          {/* Language dropdown */}
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="hidden md:flex items-center p-1 hover:bg-gray-200"
                aria-label="Language selection"
              >
                <img src="https://flagcdn.com/in.svg" className="w-5 h-3 mr-1" alt="India flag" />
                <span className="font-bold">EN</span>
                <FiChevronDown size={14} className="ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white text-black w-40 shadow-lg">
              <DropdownMenuItem>English - EN</DropdownMenuItem>
              <DropdownMenuItem>हिन्दी - HI</DropdownMenuItem>
              <DropdownMenuItem>தமிழ் - TA</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}

          {/* Account dropdown */}
          {location.pathname !== '/auth' ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="hidden md:flex items-start p-1 hover:bg-white"
                  aria-label="Account options"
                >
                  <div className="flex items-center gap-2 hover:bg-transparent">
                    {/* <User size={20} /> */}
                    <div className="flex flex-col items-center -gap-2">
                      <p className="text-xs flex gap-2">Hello, Sign in</p>
                      <p className="font-bold text-sm flex items-center">
                        Your Account <ChevronDown size={14} className="ml-1" />
                      </p>
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white text-black w-64 p-4 shadow-xl">
                <div className="mb-4">
                  <Button
                    onClick={handleAuthClick}
                    variant={"var1"} className="w-full rounded-sm"
                  >
                    Sign in
                  </Button>
                  <p className="text-xs mt-2">
                    New customer? <span className="text-blue-600 hover:underline cursor-pointer">Start here.</span>
                  </p>
                </div>
                <div className="border-t pt-2">
                  <h4 className="font-bold text-sm mb-1">Your Lists</h4>
                  <ul className="text-sm space-y-1">
                    <li className="hover:text-blue-900 cursor-pointer">Create a Wish List</li>
                    <li className="hover:text-blue-900 cursor-pointer">Rent Anything</li>
                    <li className="hover:text-blue-900 cursor-pointer">Your</li>
                  </ul>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div>
              <Button
                onClick={handleBecomeVendorClick}
                variant={"var1"}
                className="px-7"
              >
                Become a Vendor
              </Button>
            </div>
          )}

          {/* Returns & Orders */}
          <Button
            variant="ghost"
            className="hidden md:flex flex-col items-start hover:bg-white leading-2"
          >
            <p className="text-xs">Orders</p>
            <p className="font-semibold">& Preebookings</p>
          </Button>

          {/* Cart */}
          <Button
            variant="ghost"
            className="flex items-center hover:bg-white"
            aria-label="Cart"
          >
            {/* <span className="absolute top-0 left-5 text-yellow-400 font-bold text-xs">0</span> */}
            {/* <FiShoppingCart size={20} /> */}
            <ShoppingCart size={20} />
            {/* <ShoppingBag size={20} /> */}
            <span className="hidden md:inline font-semibold">Cart</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;