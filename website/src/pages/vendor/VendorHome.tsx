import { Button } from '@/components/ui/button';
import React from 'react';

const VendorHome: React.FC = () => {
    return (
        <div className='w-full h-screen pb-20'>
            <div className='bg-[#F5F3EF] w-full h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="left space-y-6 text-black">
                        <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight'>
                            Power Your Rental Business with Rent<span className='text-blue-500'>pe</span>
                        </h1>
                        <p className='text-xl opacity-90 max-w-lg'>
                            Join India's premier rental marketplace and connect with thousands of customers.
                        </p>
                        <div className='flex flex-col sm:flex-row gap-4'>
                            <Button className='bg-white hover:bg-blue-100 text-blue-500 font-semibold py-6 px-8  transition-all rounded-sm '>
                                Get Started - Free Registration
                            </Button>
                            {/* <Button variant="ghost" className='border-white text-white hover:bg-white/10 font-bold py-6 px-8 rounded-sm'>
                                See How It Works
                            </Button> */}
                        </div>
                        <div className='bg-white/10 p-4 rounded-lg border border-black/20 inline-block'>
                            <p className='font-medium flex items-center gap-2'>
                                <span className='text-blue-400'>✨ Exclusive:</span>
                                <span>Earn 10% bonus on first ₹50,000</span>
                            </p>
                        </div>
                    </div>
                    <div className="right relative">
                        <div className='relative aspect-square w-full h-auto p-12'>
                            <img className='w-full h-full object-center object-cover' src="https://m.media-amazon.com/images/G/01/sp-marketing-toolkit/guides/design/illustration/LoFi/CN2NA_lofi.webp" alt="" />
                        </div>
                        {/* <div className='absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl hidden md:block'>
                            <div className='text-center'>
                                <p className='text-2xl font-bold text-blue-600'>15K+</p>
                                <p className='text-gray-700'>Active Rentals</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default VendorHome;