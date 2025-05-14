import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  Store,
  Upload,
  UserPlus,
  ArrowRight,
  ChevronRight,
} from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function VendorGuidePage() {

  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState("account")

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }


  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                  Vendor Registration Guide
                </h1>
                <p className="mx-auto max-w-[700px] text-slate-700 md:text-xl">
                  Follow these simple steps to become a vendor on RentMarket and start renting your products.
                </p>
              </div>
              <div className="space-x-4 mt-4">
                <Button className="rounded-md font-semibold text-md px-7 py-6 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all">
                  Register Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="rounded-md font-semibold text-md px-7 py-6 border-blue-300 text-blue-700 hover:bg-blue-50"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="container px-4 py-16 md:px-6 bg-white">
          <div className="mx-auto grid max-w-6xl items-center gap-8 py-8 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-6">
              <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700 font-medium">
                Why Become a Vendor?
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-blue-900">
                Join Our Growing Marketplace
              </h2>
              <p className="text-slate-600 md:text-lg">
                RentMarket connects you with thousands of potential customers looking to rent products just like yours.
                Our platform makes it easy to list, manage, and profit from your rental inventory.
              </p>
              <ul className="grid gap-3">
                <li className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg transition-transform hover:translate-x-1">
                  <div className="rounded-full bg-blue-100 p-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="font-medium">Access to a large customer base</span>
                </li>
                <li className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg transition-transform hover:translate-x-1">
                  <div className="rounded-full bg-blue-100 p-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="font-medium">Easy-to-use dashboard and inventory management</span>
                </li>
                <li className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg transition-transform hover:translate-x-1">
                  <div className="rounded-full bg-blue-100 p-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="font-medium">Secure payment processing</span>
                </li>
                <li className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg transition-transform hover:translate-x-1">
                  <div className="rounded-full bg-blue-100 p-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="font-medium">Marketing and promotional opportunities</span>
                </li>
              </ul>
            </div>
            <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last shadow-xl">
              <img
                className="w-full h-full object-center object-contain relative z-10 animate-float"
                src="https://m.media-amazon.com/images/G/01/sp-marketing-toolkit/guides/design/illustration/LoFi/CN2NA_lofi.webp"
                alt="Vendor managing rental products"
                style={{ animationDuration: '6s' }}
              />
            </div>
          </div>
        </section>

        <section className="container px-4 py-16 md:px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="mx-auto max-w-6xl space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl text-blue-900">
                Registration Process
              </h2>
              <p className="text-slate-600 md:text-xl max-w-3xl mx-auto">
                Complete these steps to start selling on our platform and begin your vendor journey
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-blue-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 rounded-sm">
                <CardHeader className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="rounded-full bg-blue-100 p-3">
                      <UserPlus className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="text-2xl font-bold text-blue-200">01</span>
                  </div>
                  <CardTitle className="pt-4 text-blue-900">Create an Account</CardTitle>
                  <CardDescription className="text-slate-600">
                    Sign up with your email address and create a secure password
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span>Fill out the registration form with your basic information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span>Verify your email address</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span>Set up two-factor authentication (recommended)</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    View Details <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-blue-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 rounded-sm">
                <CardHeader className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="rounded-full bg-blue-100 p-3">
                      <ClipboardCheck className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="text-2xl font-bold text-blue-200">02</span>
                  </div>
                  <CardTitle className="pt-4 text-blue-900">Complete Verification</CardTitle>
                  <CardDescription className="text-slate-600">
                    Provide business and identity verification documents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span>Submit business registration documents</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span>Provide government-issued ID for verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span>Complete tax information</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    View Details <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-blue-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 rounded-sm">
                <CardHeader className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="rounded-full bg-blue-100 p-3">
                      <CreditCard className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="text-2xl font-bold text-blue-200">03</span>
                  </div>
                  <CardTitle className="pt-4 text-blue-900">Set Up Payment</CardTitle>
                  <CardDescription className="text-slate-600">
                    Connect your bank account to receive payments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span>Add your bank account details</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span>Set up your payout preferences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span>Review and accept payment terms</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    View Details <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-blue-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 rounded-sm">
                <CardHeader className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="rounded-full bg-blue-100 p-3">
                      <Store className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="text-2xl font-bold text-blue-200">04</span>
                  </div>
                  <CardTitle className="pt-4 text-blue-900">Create Your Store</CardTitle>
                  <CardDescription className="text-slate-600">
                    Set up your vendor profile and store details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span>Add your store name and description</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span>Upload your store logo and banner</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span>Set your store policies and rental terms</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    View Details <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-blue-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 rounded-sm">
                <CardHeader className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="rounded-full bg-blue-100 p-3">
                      <Upload className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="text-2xl font-bold text-blue-200">05</span>
                  </div>
                  <CardTitle className="pt-4 text-blue-900">List Your Products</CardTitle>
                  <CardDescription className="text-slate-600">
                    Add your rental items to your store inventory
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span>Create detailed product listings with photos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span>Set rental prices and availability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span>Define rental periods and conditions</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    View Details <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-blue-600 text-white border-none shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 rounded-sm">
                <CardHeader className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="rounded-full bg-white/20 p-3">
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-white/50">06</span>
                  </div>
                  <CardTitle className="pt-4">Start Renting</CardTitle>
                  <CardDescription className="text-blue-100">
                    Your store is now live and ready to accept rentals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-100 mt-0.5" />
                      <span>Receive rental requests from customers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-100 mt-0.5" />
                      <span>Manage your inventory and availability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-100 mt-0.5" />
                      <span>Get paid for successful rentals</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-blue-50">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Detailed Registration Steps Section */}
        <section className="container px-4 py-16 md:px-6 bg-white">
          <div className="mx-auto max-w-6xl space-y-12">
            <motion.div
              className="text-center space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl text-blue-900">
                Detailed Registration Steps
              </h2>
              <p className="text-slate-600 md:text-xl max-w-3xl mx-auto">
                Expand each section to learn more about the registration process
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Tabs defaultValue="account" className="w-full" value={activeTab} onValueChange={handleTabChange}>
                <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 bg-blue-50 p-1 rounded-lg">
                  {[
                    { value: "account", label: "Step 1" },
                    { value: "verification", label: "Step 2" },
                    { value: "payment", label: "Step 3" },
                    { value: "store", label: "Step 4" },
                    { value: "products", label: "Step 5" },
                    { value: "launch", label: "Step 6" },
                  ].map((tab, index) => (
                    <TabsTrigger
                      key={index}
                      value={tab.value}
                      className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all"
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {[
                      {
                        value: "account",
                        title: "Create Your Account",
                        description:
                          "To begin your journey as a vendor on RentMarket, you'll need to create an account:",
                        steps: [
                          'Visit our website and click on the "Become a Vendor" button',
                          {
                            text: "Fill out the registration form with your:",
                            subItems: ["Full name", "Email address", "Phone number", "Strong password"],
                          },
                          "Check your email for a verification link",
                          "Click the link to verify your email address",
                          "Set up two-factor authentication for added security (recommended)",
                        ],
                        tips: [
                          "Use a business email address if possible",
                          "Create a strong, unique password",
                          "Keep your account information up to date",
                        ],
                        time: "5-10 minutes",
                      },
                      {
                        value: "verification",
                        title: "Complete Verification",
                        description:
                          "To ensure the security and integrity of our marketplace, we require verification of your identity and business:",
                        steps: [
                          {
                            text: "Submit business registration documents:",
                            subItems: [
                              "Business license or registration certificate",
                              "Tax identification number",
                              "Business address proof",
                            ],
                          },
                          {
                            text: "Provide identity verification:",
                            subItems: ["Government-issued photo ID", "Proof of address"],
                          },
                          "Complete tax information forms",
                        ],
                        tips: [
                          "All documents must be current and valid",
                          "Documents should be clearly scanned or photographed",
                          "File formats accepted: PDF, JPG, PNG",
                        ],
                        time: "1-3 business days",
                      },
                      {
                        value: "payment",
                        title: "Set Up Payment",
                        description:
                          "To receive payments for your rentals, you'll need to set up your payment information:",
                        steps: [
                          {
                            text: "Add your bank account details:",
                            subItems: ["Account holder name", "Bank name", "Account number", "Routing number"],
                          },
                          {
                            text: "Set up payout preferences:",
                            subItems: ["Payout frequency (weekly, bi-weekly, monthly)", "Minimum payout amount"],
                          },
                          "Review and accept payment terms and conditions",
                        ],
                        tips: [
                          "We charge a 10% commission on each successful rental",
                          "Payments are processed securely through our platform",
                          "Funds are typically available within 3-5 business days",
                        ],
                        time: "5-10 minutes",
                      },
                      {
                        value: "store",
                        title: "Create Your Store",
                        description: "Now it's time to set up your vendor profile and store details:",
                        steps: [
                          {
                            text: "Add your store information:",
                            subItems: ["Store name", "Store description", "Business hours", "Contact information"],
                          },
                          {
                            text: "Upload visual elements:",
                            subItems: [
                              "Store logo (recommended size: 500x500px)",
                              "Store banner (recommended size: 1200x300px)",
                              "Additional store photos",
                            ],
                          },
                          {
                            text: "Set your store policies:",
                            subItems: [
                              "Rental terms and conditions",
                              "Cancellation policy",
                              "Damage policy",
                              "Late return policy",
                            ],
                          },
                        ],
                        tips: [
                          "Choose a clear, memorable store name",
                          "Write a detailed store description highlighting your unique offerings",
                          "Use high-quality images for your logo and banner",
                          "Create clear, fair policies that protect both you and your customers",
                        ],
                        time: "15-30 minutes",
                      },
                      {
                        value: "products",
                        title: "List Your Products",
                        description: "Now it's time to add your rental items to your store inventory:",
                        steps: [
                          {
                            text: "Create product listings:",
                            subItems: [
                              "Product name",
                              "Detailed description",
                              "Category and subcategory",
                              "Specifications and features",
                              "Condition (new, like new, good, etc.)",
                            ],
                          },
                          {
                            text: "Add high-quality photos:",
                            subItems: [
                              "Multiple angles of each product",
                              "Close-ups of important features",
                              "Size reference photos if applicable",
                            ],
                          },
                          {
                            text: "Set rental details:",
                            subItems: [
                              "Daily, weekly, and monthly rental rates",
                              "Security deposit amount",
                              "Available quantity",
                              "Rental periods (minimum and maximum)",
                            ],
                          },
                        ],
                        tips: [
                          "Use descriptive, keyword-rich titles",
                          "Include detailed specifications and measurements",
                          "Take clear, well-lit photos from multiple angles",
                          "Set competitive pricing based on market research",
                        ],
                        time: "10-15 minutes per listing",
                      },
                      {
                        value: "launch",
                        title: "Start Renting",
                        description: "Congratulations! Your store is now live and ready to accept rentals:",
                        steps: [
                          {
                            text: "Manage rental requests:",
                            subItems: [
                              "Review and approve rental requests",
                              "Communicate with customers",
                              "Coordinate pickup or delivery",
                            ],
                          },
                          {
                            text: "Track your inventory:",
                            subItems: [
                              "Monitor item availability",
                              "Update product status (available, rented, maintenance)",
                              "Add new products as your inventory grows",
                            ],
                          },
                          {
                            text: "Receive payments:",
                            subItems: [
                              "Track earnings in your vendor dashboard",
                              "Receive automatic payouts based on your preferences",
                              "View detailed financial reports",
                            ],
                          },
                        ],
                        tips: [
                          "Respond to inquiries and requests promptly",
                          "Maintain your items in excellent condition",
                          "Ask satisfied customers for reviews",
                          "Regularly update your inventory and listings",
                        ],
                        time: "Our vendor support team is available 7 days a week to help you succeed!",
                      },
                    ].map((tab) => (
                      <TabsContent
                        key={tab.value}
                        value={tab.value}
                        className="p-6 border rounded-lg mt-6 border-blue-100"
                      >
                        <h3 className="text-xl font-bold mb-4 text-blue-900">{tab.title}</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <p className="mb-4 text-slate-600">{tab.description}</p>
                            <ol className="space-y-4 list-decimal list-inside text-slate-700">
                              {tab.steps.map((step, stepIndex) => (
                                <li key={stepIndex}>
                                  {typeof step === "string" ? (
                                    step
                                  ) : (
                                    <>
                                      {step.text}
                                      <ul className="pl-6 mt-2 space-y-1 list-disc list-inside">
                                        {step.subItems.map((subItem, subIndex) => (
                                          <li key={subIndex}>{subItem}</li>
                                        ))}
                                      </ul>
                                    </>
                                  )}
                                </li>
                              ))}
                            </ol>
                          </div>
                          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                            <h4 className="font-medium mb-2 text-blue-800">
                              {tab.value === "verification"
                                ? "Document Requirements"
                                : tab.value === "payment"
                                  ? "Payment Information"
                                  : tab.value === "store"
                                    ? "Store Setup Tips"
                                    : tab.value === "products"
                                      ? "Product Listing Tips"
                                      : tab.value === "launch"
                                        ? "Success Tips"
                                        : "Tips for Account Creation"}
                            </h4>
                            <ul className="space-y-2">
                              {tab.tips.map((tip, tipIndex) => (
                                <li key={tipIndex} className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-4 p-4 bg-blue-100 rounded-lg">
                              <p className="text-sm font-medium text-blue-800">
                                {tab.value === "verification"
                                  ? `Verification time: ${tab.time}`
                                  : tab.value === "products"
                                    ? `Time per listing: ${tab.time}`
                                    : tab.value === "launch"
                                      ? tab.time
                                      : `Setup time: ${tab.time}`}
                              </p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </Tabs>
            </motion.div>
          </div>
        </section>
        <section className="container px-4 py-16 md:px-6 bg-blue-600 text-white">
          <div className="mx-auto max-w-5xl text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
                Ready to Start Your Vendor Journey?
              </h2>
              <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl">
                Join thousands of successful vendors on RentMarket and start earning from your rental inventory today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all px-8 py-6 text-lg"
              >
                Register Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent text-white border-white/20 hover:bg-white/10 px-8 py-6 text-lg"
              >
                Contact Support
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
