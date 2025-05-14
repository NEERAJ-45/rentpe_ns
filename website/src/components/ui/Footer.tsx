import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">
            rent<span className="text-blue-400">pe</span>
          </h3>
          <p className="text-gray-400 mb-4">
            India's premier rental marketplace connecting vendors with customers nationwide.
          </p>
          <div className="flex space-x-4">
            {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((social, index) => (
              <Link key={index} to={"/"} className="text-gray-400 hover:text-white">
                {social.charAt(0)}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-4">For Vendors</h4>
          <ul className="space-y-2">
            {["How It Works", "Pricing", "Testimonials", "FAQ", "Vendor Login"].map((item, index) => (
              <li key={index}>
                <Link to={"/"} className="text-gray-400 hover:text-white">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">For Customers</h4>
          <ul className="space-y-2">
            {["Browse Products", "How to Rent", "Customer Support", "Download App", "Customer Login"].map(
              (item, index) => (
                <li key={index}>
                  <Link to={"/"} className="text-gray-400 hover:text-white">
                    {item}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Contact Us</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Email: vendors@rentpe.in</li>
            <li>Phone: +91 1234567890</li>
            <li>Address: 123 Business Park, Mumbai, India</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-gray-400 text-sm">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 Tiyara Innovations. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to={"/"} className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to={"/"} className="hover:text-white">
              Terms of Service
            </Link>
            <Link to={"/"} className="hover:text-white">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer