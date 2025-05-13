import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ChevronDown, ChevronRight, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Form schemas
const displayInfoSchema = z.object({
  displayName: z.string().min(2, {
    message: "Display name must be at least 2 characters.",
  }),
});

const contactDetailsSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  surname: z.string().min(2, {
    message: "Surname must be at least 2 characters.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  preferredTime: z.string(),
});

const addressSchema = z.object({
  addressLine1: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  addressLine2: z.string().optional(),
  pinCode: z.string().min(6, {
    message: "Pin code must be at least 6 digits.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
});

const loginDetailsSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  newPassword: z.string().min(8, {
    message: "New password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Confirm password must be at least 8 characters.",
  }),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export function ProfileManagement() {
  // State for storing form data
  const [displayInfo, setDisplayInfo] = useState({
    displayName: "imSpderman",
  });

  const [contactDetails, setContactDetails] = useState({
    name: "Neeraj ",
    surname: "Surnis",
    phone: "+91857869114",
    email: "neerajsurnis@gmail.com",
    preferredTime: "09:00 to 18:00",
  });

  const [address, setAddress] = useState({
    addressLine1: "123 Main Street, Apt 4B",
    addressLine2: "",
    pinCode: "10001",
    city: "New York",
  });

  const [loginDetails, setLoginDetails] = useState({
    password: "1234",
    newPassword: "",
    confirmPassword: "",
  });

  // State for controlling dialog open states
  const [displayInfoOpen, setDisplayInfoOpen] = useState(false);
  const [contactDetailsOpen, setContactDetailsOpen] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);
  const [loginDetailsOpen, setLoginDetailsOpen] = useState(false);

  // Initialize forms with state values
  const displayInfoForm = useForm<z.infer<typeof displayInfoSchema>>({
    resolver: zodResolver(displayInfoSchema),
    defaultValues: displayInfo,
  });

  const contactDetailsForm = useForm<z.infer<typeof contactDetailsSchema>>({
    resolver: zodResolver(contactDetailsSchema),
    defaultValues: contactDetails,
  });

  const addressForm = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: address,
  });

  const loginDetailsForm = useForm<z.infer<typeof loginDetailsSchema>>({
    resolver: zodResolver(loginDetailsSchema),
    defaultValues: loginDetails,
  });

  // Form submission handlers
  const onDisplayInfoSubmit = (values: z.infer<typeof displayInfoSchema>) => {
    setDisplayInfo(values);
    setDisplayInfoOpen(false);
    toast.success("Display information updated successfully");
    // Here you would typically also make an API call to save the data
    // await api.updateDisplayInfo(values);
  };

  const onContactDetailsSubmit = (values: z.infer<typeof contactDetailsSchema>) => {
    setContactDetails(values);
    setContactDetailsOpen(false);
    toast.success("Contact details updated successfully");
    // await api.updateContactDetails(values);
  };

  const onAddressSubmit = (values: z.infer<typeof addressSchema>) => {
    setAddress(values);
    setAddressOpen(false);
    toast.success("Address updated successfully");
    // await api.updateAddress(values);
  };

  const onLoginDetailsSubmit = (values: z.infer<typeof loginDetailsSchema>) => {
    setLoginDetails(values);
    setLoginDetailsOpen(false);
    toast.success("Password changed successfully");
    // await api.updatePassword(values);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center text-sm mb-4">
        <a href="#" className="text-primary hover:underline">Home</a>
        <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />
        <a href="#" className="text-primary hover:underline">Manage Profile</a>
      </div>

      <h1 className="text-2xl font-semibold mb-6">Account</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Display Information Card */}
        <div className="bg-white rounded-lg shadow p-4 h-full">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-medium">Display Information</h2>
            <Dialog open={displayInfoOpen} onOpenChange={setDisplayInfoOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  EDIT
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-lg">Edit Display Information</DialogTitle>
                </DialogHeader>
                <Form {...displayInfoForm}>
                  <form onSubmit={displayInfoForm.handleSubmit(onDisplayInfoSubmit)} className="space-y-4">
                    <FormField
                      control={displayInfoForm.control}
                      name="displayName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Display Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your display name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="sm">Save Changes</Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-muted-foreground">Display Name</p>
              <div className="flex items-center gap-1">
                <p className="text-sm">{displayInfo.displayName}</p>
                <Check className="h-3 w-3 text-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Details Card */}
        <div className="bg-white rounded-lg shadow p-4 h-full">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-medium">Contact Details</h2>
            <Dialog open={contactDetailsOpen} onOpenChange={setContactDetailsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  EDIT
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-lg">Edit Contact Details</DialogTitle>
                </DialogHeader>
                <Form {...contactDetailsForm}>
                  <form onSubmit={contactDetailsForm.handleSubmit(onContactDetailsSubmit)} className="space-y-3">
                    <FormField
                      control={contactDetailsForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Your Name</FormLabel>
                          <FormControl>
                            <Input size={20} placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={contactDetailsForm.control}
                      name="surname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Your Surname</FormLabel>
                          <FormControl>
                            <Input size={20} placeholder="Your surname" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={contactDetailsForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Phone Number</FormLabel>
                          <FormControl>
                            <Input size={20} placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={contactDetailsForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Email Address</FormLabel>
                          <FormControl>
                            <Input size={20} placeholder="Your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={contactDetailsForm.control}
                      name="preferredTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Preferred Time Slot</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <select
                                {...field}
                                className="block w-full rounded-md border border-gray-300 py-1.5 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                              >
                                <option value="09:00 to 18:00">09:00 to 18:00</option>
                                <option value="10:00 to 19:00">10:00 to 19:00</option>
                                <option value="08:00 to 17:00">08:00 to 17:00</option>
                              </select>
                              <ChevronDown className="absolute right-3 top-2 h-4 w-4 text-gray-400" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="sm">Save Changes</Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-muted-foreground">Name</p>
              <p className="text-sm">{contactDetails.name} {contactDetails.surname}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="text-sm">{contactDetails.phone}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <div className="flex items-center gap-1">
                <p className="text-sm">{contactDetails.email}</p>
                <Button variant="link" size="sm" className="h-4 p-0 text-xs">Verify</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Address Card */}
        <div className="bg-white rounded-lg shadow p-4 h-full">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-medium">Pickup Address</h2>
            <Dialog open={addressOpen} onOpenChange={setAddressOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  EDIT
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-lg">Edit Address</DialogTitle>
                </DialogHeader>
                <Form {...addressForm}>
                  <form onSubmit={addressForm.handleSubmit(onAddressSubmit)} className="space-y-3">
                    <FormField
                      control={addressForm.control}
                      name="addressLine1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Address Line 1</FormLabel>
                          <FormControl>
                            <Input size={20} placeholder="Address line 1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addressForm.control}
                      name="addressLine2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Address Line 2</FormLabel>
                          <FormControl>
                            <Input size={20} placeholder="Address line 2" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <FormField
                        control={addressForm.control}
                        name="pinCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm">Pin code</FormLabel>
                            <FormControl>
                              <Input size={20} placeholder="Pin code" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addressForm.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm">City</FormLabel>
                            <FormControl>
                              <Input size={20} placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button type="submit" size="sm">Save Address</Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-muted-foreground">Address</p>
              <p className="text-sm">
                {address.addressLine1}
                {address.addressLine2 && `, ${address.addressLine2}`}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">City</p>
              <p className="text-sm">{address.city}, {address.pinCode}</p>
            </div>
          </div>
        </div>

        {/* Login Details Card */}
        <div className="bg-white rounded-lg shadow p-4 h-full">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-medium">Login Details</h2>
            <Dialog open={loginDetailsOpen} onOpenChange={setLoginDetailsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  CHANGE
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-lg">Change Password</DialogTitle>
                </DialogHeader>
                <Form {...loginDetailsForm}>
                  <form onSubmit={loginDetailsForm.handleSubmit(onLoginDetailsSubmit)} className="space-y-3">
                    <FormField
                      control={loginDetailsForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Current Password</FormLabel>
                          <FormControl>
                            <Input size={20} type="password" placeholder="Current password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginDetailsForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">New Password</FormLabel>
                          <FormControl>
                            <Input size={20} type="password" placeholder="New password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginDetailsForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Confirm Password</FormLabel>
                          <FormControl>
                            <Input size={20} type="password" placeholder="Confirm password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="sm">Change Password</Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-muted-foreground">Display Name</p>
              <p className="text-sm">{displayInfo.displayName}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Mobile</p>
              <div className="flex items-center gap-1">
                <p className="text-sm">{contactDetails.phone}</p>
                <Button variant="link" size="sm" className="h-4 p-0 text-xs">EDIT</Button>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <div className="flex items-center gap-1">
                <p className="text-sm">{contactDetails.email}</p>
                <Button variant="link" size="sm" className="h-4 p-0 text-xs">EDIT</Button>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Password</p>
              <p className="text-sm">••••••••</p>
            </div>
          </div>
        </div>

        {/* Delete Account Card */}
        <div className="bg-white rounded-lg shadow p-4 h-full">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-medium">Delete Account</h2>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className="h-7 text-xs">
                  DELETE
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="text-xs text-muted-foreground">
            <p className="mb-1">Account can be deleted only when:</p>
            <ul className="list-disc pl-4 space-y-0.5">
              <li>No pending orders</li>
              <li>No pending settlements</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}