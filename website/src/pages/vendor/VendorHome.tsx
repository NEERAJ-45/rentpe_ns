import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button"
import { Users, BarChart3, ShieldCheck, ArrowRight, BadgeCheck, Zap } from "lucide-react"
import { useNavigate } from "react-router-dom";

export default function VendorHome() {

    const navigate = useNavigate();

    const handleGuideClick = () => {
        navigate('/vendor/guide')
    }

    return (
        //this page is to show what rentpe provides it will be changed after dashboard is done
        <div className="w-full min-h-screen bg-[#f8fafc]">
            {/* Hero Section */}
            <section className="w-full relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 text-gray-900 relative z-10">
                        <div className="inline-flex items-center px-4 py-2 bg-blue-100/80 text-blue-600 rounded-full text-sm font-medium mb-4 border border-blue-200 backdrop-blur-sm">
                            <Zap className="h-4 w-4 mr-2" />
                            For Rental Business Owners
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                            Grow Your Rental Business with rent<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">pe</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-lg">
                            Join India's fastest-growing rental marketplace and reach thousands of customers looking for your products.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-6 px-8 transition-all rounded-lg text-base shadow-lg hover:shadow-xl">
                                Get Started - Free Registration
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                            <Button
                                onClick={handleGuideClick}
                                variant="outline"
                                className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium py-6 px-8 rounded-lg text-base shadow-sm"
                            >
                                See How It Works
                            </Button>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200 inline-flex items-center gap-3 shadow-sm">
                            <BadgeCheck className="h-5 w-5 text-blue-500" />
                            <p className="font-medium">
                                <span className="text-blue-600">Exclusive:</span> Earn 10% bonus on first ₹50,000
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="relative aspect-square w-full h-auto">
                            {/* dummy images */}
                            <img
                                className="w-full h-full object-center object-contain relative z-10 animate-float"
                                src="https://m.media-amazon.com/images/G/01/sp-marketing-toolkit/guides/design/illustration/LoFi/CN2NA_lofi.webp"
                                alt="Vendor managing rental products"
                                style={{ animationDuration: '6s' }}
                            />
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
            </section>

            {/* Trusted By Section */}
            {/* <section className="w-full bg-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-gray-500 mb-8 text-sm uppercase tracking-wider font-medium">Trusted by 500+ rental businesses across India</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-70">
                        {[
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png",
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/1200px-HP_logo_2012.svg.png",
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png"
                        ].map((logo, index) => (
                            <img
                                key={index}
                                src={logo}
                                alt="Trusted company"
                                className="h-8 object-contain grayscale hover:grayscale-0 transition-all"
                            />
                        ))}
                    </div>
                </div>
            </section> */}

            {/* Why Us Section */}
            <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Why create a Rent<span className="text-blue-500">pe</span> vendor account?
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Join thousands of vendors who have grown their rental business with our platform
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Expand Your Reach",
                                description:
                                    "Connect with thousands of potential customers actively looking for rental products like yours.",
                                icon: <Users className="h-8 w-8 text-blue-500" />,
                            },
                            {
                                title: "Increase Revenue",
                                description: "Our vendors report an average 40% increase in rental bookings within the first 3 months.",
                                icon: <BarChart3 className="h-8 w-8 text-blue-500" />,
                            },
                            {
                                title: "Secure Payments",
                                description:
                                    "Get paid on time, every time with our secure payment system and vendor protection policy.",
                                icon: <ShieldCheck className="h-8 w-8 text-blue-500" />,
                            },
                        ].map((card, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-sm shadow-sm hover:shadow-md transition-all border border-gray-100"
                            >
                                <div className="bg-blue-50 p-3 rounded-lg inline-block mb-4">{card.icon}</div>
                                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                                <p className="text-gray-600">{card.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works ? </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Get started in minutes and start receiving rental requests
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Sign Up",
                                description: "Create your free vendor account in less than 2 minutes",
                            },
                            {
                                step: "02",
                                title: "List Products",
                                description: "Add your rental products with photos, descriptions and pricing",
                            },
                            {
                                step: "03",
                                title: "Receive Bookings",
                                description: "Get notified instantly when customers book your products",
                            },
                            {
                                step: "04",
                                title: "Get Paid",
                                description: "Receive secure payments directly to your bank account",
                            },
                        ].map((step, index) => (
                            <div key={index} className="relative">
                                <div className="bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                                    <span className="text-blue-500 font-bold">{step.step}</span>
                                </div>
                                {index < 3 && (
                                    <div className="hidden md:block absolute top-6 left-12 w-[calc(100%-3rem)] h-[2px] bg-blue-100"></div>
                                )}
                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mt-14 justify-center">
                        <Button onClick={handleGuideClick} className="bg-blue-50 hover:bg-gray-100 text-blue-600 font-semibold py-6 px-8">
                            Get a full Guide
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            {/* <section className="w-full py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: "500+", label: "Vendors" },
                            { value: "40%", label: "Avg. Revenue Growth" },
                            { value: "98%", label: "Payment Reliability" },
                            { value: "24/7", label: "Support" },
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <p className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</p>
                                <p className="text-gray-600 uppercase text-sm tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* Testimonials Section */}
            {/* <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Vendors Say</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">Join thousands of satisfied vendors on our platform</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    name: "Rajesh Kumar",
                                    business: "Delhi Electronics Rental",
                                    quote: "Since joining Rentpe, my camera rental business has seen a 50% increase in bookings. The platform is easy to use and the support team is excellent.",
                                    rating: 5,
                                    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
                                },
                                {
                                    name: "Priya Sharma",
                                    business: "Bangalore Party Supplies",
                                    quote: "Rentpe has transformed how I manage my party supplies rental business. The automated booking system saves me hours every week.",
                                    rating: 5,
                                    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
                                },
                                {
                                    name: "Vikram Singh",
                                    business: "Mumbai Tool Rentals",
                                    quote: "I was skeptical at first, but Rentpe has proven to be a game-changer for my tool rental business. Highly recommended!",
                                    rating: 4,
                                    avatar: "https://randomuser.me/api/portraits/men/75.jpg"
                                },
                            ].map((testimonial, index) => (
                                <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                                    <div className="flex items-center mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                                    <div className="flex items-center">
                                        <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
                                        <div>
                                            <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                            <p className="text-gray-600 text-sm">{testimonial.business}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section> */}

            {/* FAQ Section */}
            {/* <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                        <p className="text-gray-600">Everything you need to know about becoming a vendor</p>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                question: "How do I sign up as a vendor?",
                                answer: "Signing up is easy! Click on the 'Get Started' button, fill out the registration form, verify your email, and you're ready to start listing your rental products."
                            },
                            {
                                question: "How much does it cost to join?",
                                answer: "Basic registration is completely free. We only charge a small commission on successful rentals. You can also choose from our premium plans for additional features and lower commission rates."
                            },
                            {
                                question: "How do I receive payments?",
                                answer: "Payments are processed securely through our platform. Once a rental is completed, the payment is transferred to your registered bank account within 2-3 business days."
                            },
                            {
                                question: "What happens if a customer damages my product?",
                                answer: "We have a comprehensive protection policy in place. Customers pay a security deposit, and in case of damage, we help facilitate the claim process to ensure you're compensated fairly."
                            },
                            {
                                question: "Can I list any type of rental product?",
                                answer: "We accept most legal rental products. However, certain categories may require additional verification. Please refer to our terms of service for a complete list of prohibited items."
                            },
                        ].map((faq, index) => (
                            <div key={index} className="group">
                                <div className="flex items-start gap-4 p-6 rounded-xl hover:bg-gray-50 transition-all cursor-pointer">
                                    <div className="bg-blue-50 p-2 rounded-lg mt-1">
                                        <HelpCircle className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold mb-2 text-gray-900">{faq.question}</h3>
                                        <p className="text-gray-600">{faq.answer}</p>
                                    </div>
                                </div>
                                {index < 4 && <div className="h-px bg-gray-100 mx-6"></div>}
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            <section className="container px-4 py-16 md:px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="mx-auto max-w-5xl space-y-8">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl text-blue-900">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-slate-600 md:text-xl max-w-3xl mx-auto">
                            Find answers to common questions about becoming a vendor
                        </p>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1" className="border border-blue-100 mb-4 rounded-lg overflow-hidden">
                            <AccordionTrigger className="px-6 py-4 hover:bg-blue-50 text-blue-900 font-medium">
                                How long does the verification process take?
                            </AccordionTrigger>
                            <AccordionContent className="px-6 py-4 text-slate-600 bg-white">
                                The verification process typically takes 1-3 business days once all required documents have been
                                submitted. Our team reviews each application thoroughly to ensure the security and integrity of our
                                marketplace. You'll receive email notifications about the status of your application.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="border border-blue-100 mb-4 rounded-lg overflow-hidden">
                            <AccordionTrigger className="px-6 py-4 hover:bg-blue-50 text-blue-900 font-medium">
                                What fees does RentMarket charge vendors?
                            </AccordionTrigger>
                            <AccordionContent className="px-6 py-4 text-slate-600 bg-white">
                                RentMarket charges a 10% commission on each successful rental transaction. There are no monthly fees
                                or listing fees. The commission is automatically deducted from the rental payment before it's
                                transferred to your account. This fee covers payment processing, platform maintenance, customer
                                service, and marketing efforts that bring renters to the platform.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" className="border border-blue-100 mb-4 rounded-lg overflow-hidden">
                            <AccordionTrigger className="px-6 py-4 hover:bg-blue-50 text-blue-900 font-medium">
                                How are payments processed?
                            </AccordionTrigger>
                            <AccordionContent className="px-6 py-4 text-slate-600 bg-white">
                                When a customer rents your item, the full payment (including security deposit) is collected upfront
                                and held securely. Once the rental period begins, the rental fee (minus our commission) is released to
                                your account. The security deposit is held until the item is returned in good condition, at which
                                point it's refunded to the customer. Payouts to vendors are processed according to your selected
                                payout frequency.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4" className="border border-blue-100 mb-4 rounded-lg overflow-hidden">
                            <AccordionTrigger className="px-6 py-4 hover:bg-blue-50 text-blue-900 font-medium">
                                What happens if an item is damaged or not returned?
                            </AccordionTrigger>
                            <AccordionContent className="px-6 py-4 text-slate-600 bg-white">
                                If an item is damaged or not returned, you can make a claim through our platform within 48 hours of
                                the scheduled return date. Our team will review the claim, including pre-rental and post-rental
                                photos, and may release part or all of the security deposit to you to cover repairs or replacement.
                                For serious cases, we also have additional protection policies in place to help recover losses beyond
                                the security deposit amount.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5" className="border border-blue-100 mb-4 rounded-lg overflow-hidden">
                            <AccordionTrigger className="px-6 py-4 hover:bg-blue-50 text-blue-900 font-medium">
                                Can I offer delivery services for my rental items?
                            </AccordionTrigger>
                            <AccordionContent className="px-6 py-4 text-slate-600 bg-white">
                                Yes, you can offer delivery services for your rental items. During the product listing process, you
                                can specify delivery options, including delivery radius and fees. You can also set up different
                                delivery fees based on distance or item size. Customers will see these options during the checkout
                                process and can select their preferred delivery method.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-6" className="border border-blue-100 mb-4 rounded-lg overflow-hidden">
                            <AccordionTrigger className="px-6 py-4 hover:bg-blue-50 text-blue-900 font-medium">
                                How do I handle customer inquiries and support?
                            </AccordionTrigger>
                            <AccordionContent className="px-6 py-4 text-slate-600 bg-white">
                                All customer inquiries come through our messaging system, which you can access via your vendor
                                dashboard or mobile app. We recommend responding to inquiries within 24 hours to maintain good
                                customer service. For common issues, our platform provides automated support, but you'll be the
                                primary contact for specific questions about your items. Our vendor support team is also available to
                                help with any complex issues or disputes.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>

            {/* CTA Section */}
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
        </div>
    )
}