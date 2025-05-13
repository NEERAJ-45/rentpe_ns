import React from 'react';
import { Camera, User, Lock, Mail, ArrowRight, ChevronLeft, Smartphone } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';

// Define validation schema
const authSchema = z.object({
  emailOrMobile: z.string()
    .min(1, 'Email or mobile number is required')
    .refine(value => {
      // Check if it's a valid email or Indian mobile number
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const mobileRegex = /^[6-9]\d{9}$/;
      return emailRegex.test(value) || mobileRegex.test(value);
    }, {
      message: 'Please enter a valid email or 10-digit Indian mobile number'
    })
});

type AuthFormData = z.infer<typeof authSchema>;

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema)
  });

  const onSubmit = async (data: AuthFormData) => {
    setIsSubmitting(true);
    setSuccess(false);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setSuccess(true);
    setIsSubmitting(false);

    // Reset success message after 3 seconds
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    reset();
    setSuccess(false);
  };

  const isMobileNumber = /^[6-9]\d{9}$/.test(watch('emailOrMobile') || '');

  return (
    <React.Fragment>
      {/* <Navbar /> */}
      <div className="flex items-center justify-center md:p-20 px-4 py-20">
        <div className="w-full max-w-3xl">
          {/* Main Card */}
          <div className="bg-white overflow-hidden flex flex-col md:flex-row">
            {/* Left Panel - Visual */}
            <div className="md:w-5/12 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl font-semibold mb-6">{isLogin ? 'Login' : 'Join Us'}</h2>
                <p className="text-blue-100 leading-relaxed mb-8 text-sm">
                  {isLogin
                    ? 'Access your account to manage orders, track shipments, and pre book deals.'
                    : 'Create an account to enjoy exclusive benefits, easy order tracking, and personalized shopping experiences.'}
                </p>

                <div className="hidden md:block">
                  <button
                    onClick={toggleAuthMode}
                    className="group flex items-center text-sm font-medium text-white hover:text-blue-200 transition-colors"
                  >
                    <span>{isLogin ? 'New to our platform?' : 'Already have an account?'}</span>
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Panel - Form */}
            <div className="md:w-7/12 p-8 md:p-12">
              {/* <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800">
                {isLogin ? 'Sign In' : 'Create Account'}
              </h3>
              <p className="text-gray-600 mt-2">
                {isLogin
                  ? 'Enter your contact details to continue'
                  : 'Fill in your details to get started'}
              </p>
            </div> */}

              {success && (
                <Alert className="mb-6 bg-green-50 border-green-100 text-green-800">
                  <AlertDescription>
                    {isMobileNumber
                      ? `OTP sent successfully to +91${watch('emailOrMobile')}`
                      : `Verification link sent to ${watch('emailOrMobile')}`}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  {/* <label htmlFor="emailOrMobile" className="block text-sm font-semibold text-gray-500 mb-3">
                    Enter Email / Mobile Number
                  </label> */}
                  <div className="relative">
                    {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      // {isMobileNumber ? <Smartphone size={18} /> : <Mail size={18} />}s
                    </div> */}
                    <input
                      id="emailOrMobile"
                      type="text"
                      placeholder="Enter Email / Mobile Number"
                      className={`w-full pr-4 py-3 border-b-2 outline-none border-blue-500 ${errors.emailOrMobile ? 'border-red-300' : 'border-gray-300'} 
                     focus:border-blue-500 transition-all duration-200`}
                      {...register('emailOrMobile')}
                    />
                  </div>
                  {errors.emailOrMobile && (
                    <p className="mt-1 text-sm text-red-600">{errors.emailOrMobile.message}</p>
                  )}
                </div>

                {!isLogin && (
                  <>
                    <div>
                      {/* <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label> */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                          {/* <User size={18} /> */}
                        </div>
                        <input
                          id="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          className="w-full pr-4 py-3 border-b-2 outline-none  focus:border-blue-500 transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      {/* <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label> */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                          {/* <Lock size={18} /> */}
                        </div>
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          className="w-full pr-4 py-3 border-b-2 outline-none  focus:border-blue-500 transition-all duration-200"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>

                      {/* need to change according to backend */}
                      <p className="mt-1 text-xs text-gray-500">
                        Use 8 or more characters with a mix of letters, numbers & symbols
                      </p>
                    </div>
                  </>
                )}

                <div className="text-xs text-gray-600">
                  <p>
                    By continuing, you agree to our{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                      Privacy Policy
                    </a>
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="var1"
                  disabled={isSubmitting}
                  className={`w-full rounded-none
                ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Continue"
                  )}
                </Button>

                {/* Login Alternatives */}
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <Button
                      type="button"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md 
                    shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 
                    transition-colors duration-200"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                      </svg>
                    </Button>
                    <Button
                      type="button"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md 
                    shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 
                    transition-colors duration-200"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </Button>
                    <Button
                      type="button"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md 
                    shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 
                    transition-colors duration-200"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </Button>
                  </div>
                </div>

                {/* Mobile Toggle */}
                <div className="pt-4 text-center md:hidden">
                  <button
                    type="button"
                    onClick={toggleAuthMode}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    {isLogin ? 'New to our platform? Create an account' : 'Already have an account? Sign in'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AuthPage;