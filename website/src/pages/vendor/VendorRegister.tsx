'use client';

import { z } from 'zod';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import {
    Mail,
    Lock,
    ClipboardCheck,
    DollarSign,
    ShieldCheck,
    ClipboardList,
    Eye,
    EyeOff,
    Check,
    User,
    MapPin,
    Home,
    Smartphone,
    Briefcase,
    Info,
    Circle,
    Store,
    Landmark,
    FileText,
} from 'lucide-react';
import { Stepper, Step } from '@/components/ui/CustomStepper';

const RegisterSchema = z
    .object({
        email: z.string().email({ message: 'Invalid email address' }),
        mobile: z.string().min(10, { message: 'Enter valid mobile number' }),
        gstin: z.string().min(15, { message: 'Enter valid GSTIN' }),
        password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
        confirmPassword: z.string(),
        businessName: z.string().min(3, { message: 'Business name is required' }),
        businessType: z.string().min(1, { message: 'Please select business type' }),
        storeName: z.string().min(3, { message: 'Store name is required' }),
        storeCategory: z.string().min(1, { message: 'Please select store category' }),
        address: z.string().min(10, { message: 'Address must be at least 10 characters' }),
        city: z.string().min(2, { message: 'City is required' }),
        state: z.string().min(2, { message: 'State is required' }),
        pincode: z.string().min(6, { message: 'Valid pincode is required' }),
        description: z.string().min(50, { message: 'Description must be at least 50 characters' }),
        ownerName: z.string().min(3, { message: 'Owner name is required' }),
        bankAccountNumber: z.string().min(9, { message: 'Valid account number is required' }),
        ifscCode: z.string().min(11, { message: 'Valid IFSC code is required' }),
        accountHolderName: z.string().min(3, { message: 'Account holder name is required' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

type RegisterFormValues = z.infer<typeof RegisterSchema>;

const RegisterVendor = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [userName, setUserName] = useState('Neeraj');
    const [mobileVerified, setMobileVerified] = useState(false);
    const [progress, setProgress] = useState(0);

    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        control,
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            mobile: '',
            gstin: '',
            password: '',
            confirmPassword: '',
            businessName: '',
            businessType: '',
            storeName: '',
            storeCategory: '',
            address: '',
            city: '',
            state: '',
            pincode: '',
            description: '',
            ownerName: '',
            bankAccountNumber: '',
            ifscCode: '',
            accountHolderName: '',
        },
    });

    // Watch all form fields to calculate progress
    const formValues = useWatch({ control });

    // Calculate form completion progress
    useEffect(() => {
        if (activeStep === 2) {
            const requiredFields = [
                'businessName',
                'businessType',
                'storeName',
                'storeCategory',
                'address',
                'city',
                'state',
                'pincode',
                'description',
                'ownerName',
                'bankAccountNumber',
                'ifscCode',
                'accountHolderName',
            ];

            const filledFields = requiredFields.filter(
                (field) =>
                    formValues[field as keyof RegisterFormValues]?.toString().trim().length > 0
            ).length;

            const newProgress = Math.round((filledFields / requiredFields.length) * 100);
            setProgress(newProgress);
        }
    }, [formValues, activeStep]);

    const onSubmit = (data: RegisterFormValues) => {
        console.log('✅ Form Submitted:', data);
    };

    const handleNext = async () => {
        let isValid = false;

        if (activeStep === 0) {
            isValid = await trigger(['email', 'mobile', 'gstin']);
        } else if (activeStep === 1) {
            isValid = await trigger(['password', 'confirmPassword']);
        }

        if (isValid && !isLastStep) {
            setActiveStep((cur) => cur + 1);
        }
    };

    const handlePrev = () => {
        if (!isFirstStep) setActiveStep((cur) => cur - 1);
    };

    return (
        <div className="w-full bg-[#F5F3EF] p-4">
            <div className="w-full lg:w-2/3 min-h-screen bg-[#F5F3EF] p-2">
                {/* Stepper */}
                <div className="w-full font-bold  bg-[#F5F3EF] pt-6 pb-12">
                    <Stepper
                        activeStep={activeStep}
                        isLastStep={(value) => setIsLastStep(value)}
                        isFirstStep={(value) => setIsFirstStep(value)}
                        className="px-4" // Added some horizontal padding
                    >
                        <Step
                            onClick={() => setActiveStep(0)}
                            icon={<Mail className="h-4 w-4" />}
                            className="cursor-pointer" // Add pointer cursor
                        >
                            <span className="text-sm font-medium text-gray-900">EMAIL & GST</span>
                        </Step>
                        <Step
                            onClick={() => setActiveStep(1)}
                            icon={<ClipboardList className="h-4 w-4" />}
                            className="cursor-pointer"
                        >
                            <span className="text-sm font-medium text-gray-900">
                                Password Creation
                            </span>
                        </Step>
                        <Step
                            onClick={() => setActiveStep(2)}
                            icon={<Check className="h-4 w-4" />}
                            className="cursor-pointer"
                        >
                            <span className="text-sm font-medium text-gray-900">
                                OnBoarding Dashboard
                            </span>
                        </Step>
                    </Stepper>



                    
                </div>

                {/* Form Content */}
                {activeStep < 2 ? (
                    <div className="w-full p-5 rounded-lg border-2">
                        <h2 className="text-2xl font-bold mb-6">Register to Rentpe</h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Step 1 */}
                            {activeStep === 0 && (
                                <div className="space-y-4">
                                    {/* Email */}
                                    <div>
                                        <label className="text-sm font-semibold text-gray-700">
                                            Email Address
                                        </label>
                                        <div className="flex gap-2 mt-1">
                                            <Input
                                                {...register('email')}
                                                placeholder="you@example.com"
                                                aria-invalid={!!errors.email}
                                            />
                                            <Button type="button" variant="outline">
                                                Send OTP
                                            </Button>
                                        </div>
                                        {errors.email && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.email.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Mobile */}
                                    <div>
                                        <label className="text-sm font-semibold text-gray-700">
                                            Mobile Number
                                        </label>
                                        <div className="flex gap-2 mt-1">
                                            <Input
                                                {...register('mobile')}
                                                placeholder="9876543210"
                                                aria-invalid={!!errors.mobile}
                                            />
                                            <Button type="button" variant="outline">
                                                Send OTP
                                            </Button>
                                        </div>
                                        {errors.mobile && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.mobile.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* GSTIN */}
                                    <div>
                                        <label className="text-sm font-semibold text-gray-700">
                                            GSTIN Number
                                        </label>
                                        <Input
                                            {...register('gstin')}
                                            placeholder="22AAAAA0000A1Z5"
                                            aria-invalid={!!errors.gstin}
                                        />
                                        {errors.gstin && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.gstin.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Step 2 */}
                            {activeStep === 1 && (
                                <div className="space-y-4">
                                    <div>
                                        <h1 className="text-black text-lg font-light mb-2">
                                            We have sent a verification link to your email
                                        </h1>
                                        <h6 className="text-black tracking-tight font-light text-sm mb-4">
                                            We need these details to setup your account.
                                        </h6>
                                        <label className="text-sm font-semibold text-gray-700">
                                            Create Password
                                        </label>
                                        <div className="relative mt-1">
                                            <Input
                                                {...register('password')}
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="At least 8 characters"
                                                aria-invalid={!!errors.password}
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-5 w-5" />
                                                ) : (
                                                    <Eye className="h-5 w-5" />
                                                )}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.password.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-sm font-semibold text-gray-700">
                                            Confirm Password
                                        </label>
                                        <div className="relative mt-1">
                                            <Input
                                                {...register('confirmPassword')}
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                placeholder="Confirm your password"
                                                aria-invalid={!!errors.confirmPassword}
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                onClick={() =>
                                                    setShowConfirmPassword(!showConfirmPassword)
                                                }
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff className="h-5 w-5" />
                                                ) : (
                                                    <Eye className="h-5 w-5" />
                                                )}
                                            </button>
                                        </div>
                                        {errors.confirmPassword && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.confirmPassword.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex justify-between pt-8">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={handlePrev}
                                    disabled={activeStep === 0}
                                >
                                    Back
                                </Button>
                                <Button type="button" onClick={handleNext}>
                                    Next
                                </Button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Left Card - Profile Completion */}
                        <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md border border-gray-200 h-fit">
                            <div className="mb-8">
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-700">
                                        Profile Completion
                                    </span>
                                    <span className="text-sm font-medium text-gray-700">
                                        {progress}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Completion Checklist */}
                            <div className="space-y-4">
                                {/* Business Information */}
                                <div className="border-b pb-4">
                                    <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                        <Briefcase className="h-4 w-4" />
                                        Business Info
                                    </h2>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-5 h-5 rounded-full flex items-center justify-center 
                                                ${
                                                    formValues.businessName
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-gray-100 text-gray-400'
                                                }`}
                                            >
                                                {formValues.businessName ? (
                                                    <Check className="w-3 h-3" />
                                                ) : (
                                                    <Circle className="w-3 h-3" />
                                                )}
                                            </div>
                                            <span
                                                className={
                                                    formValues.businessName
                                                        ? 'text-gray-700'
                                                        : 'text-gray-500'
                                                }
                                            >
                                                Business Name
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-5 h-5 rounded-full flex items-center justify-center 
                                                ${
                                                    formValues.businessType
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-gray-100 text-gray-400'
                                                }`}
                                            >
                                                {formValues.businessType ? (
                                                    <Check className="w-3 h-3" />
                                                ) : (
                                                    <Circle className="w-3 h-3" />
                                                )}
                                            </div>
                                            <span
                                                className={
                                                    formValues.businessType
                                                        ? 'text-gray-700'
                                                        : 'text-gray-500'
                                                }
                                            >
                                                Business Type
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-5 h-5 rounded-full flex items-center justify-center 
                                                ${
                                                    formValues.ownerName
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-gray-100 text-gray-400'
                                                }`}
                                            >
                                                {formValues.ownerName ? (
                                                    <Check className="w-3 h-3" />
                                                ) : (
                                                    <Circle className="w-3 h-3" />
                                                )}
                                            </div>
                                            <span
                                                className={
                                                    formValues.ownerName
                                                        ? 'text-gray-700'
                                                        : 'text-gray-500'
                                                }
                                            >
                                                Owner Name
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Store Information */}
                                <div className="border-b pb-4">
                                    <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                        <Store className="h-4 w-4" />
                                        Store Info
                                    </h2>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-5 h-5 rounded-full flex items-center justify-center 
                                                ${
                                                    formValues.storeName
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-gray-100 text-gray-400'
                                                }`}
                                            >
                                                {formValues.storeName ? (
                                                    <Check className="w-3 h-3" />
                                                ) : (
                                                    <Circle className="w-3 h-3" />
                                                )}
                                            </div>
                                            <span
                                                className={
                                                    formValues.storeName
                                                        ? 'text-gray-700'
                                                        : 'text-gray-500'
                                                }
                                            >
                                                Store Name
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-5 h-5 rounded-full flex items-center justify-center 
                                                ${
                                                    formValues.storeCategory
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-gray-100 text-gray-400'
                                                }`}
                                            >
                                                {formValues.storeCategory ? (
                                                    <Check className="w-3 h-3" />
                                                ) : (
                                                    <Circle className="w-3 h-3" />
                                                )}
                                            </div>
                                            <span
                                                className={
                                                    formValues.storeCategory
                                                        ? 'text-gray-700'
                                                        : 'text-gray-500'
                                                }
                                            >
                                                Store Category
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-5 h-5 rounded-full flex items-center justify-center 
                                                ${
                                                    formValues.description
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-gray-100 text-gray-400'
                                                }`}
                                            >
                                                {formValues.description ? (
                                                    <Check className="w-3 h-3" />
                                                ) : (
                                                    <Circle className="w-3 h-3" />
                                                )}
                                            </div>
                                            <span
                                                className={
                                                    formValues.description
                                                        ? 'text-gray-700'
                                                        : 'text-gray-500'
                                                }
                                            >
                                                Description
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Address Information */}
                                <div className="border-b pb-4">
                                    <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        Address
                                    </h2>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-5 h-5 rounded-full flex items-center justify-center 
                                                ${
                                                    formValues.address
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-gray-100 text-gray-400'
                                                }`}
                                            >
                                                {formValues.address ? (
                                                    <Check className="w-3 h-3" />
                                                ) : (
                                                    <Circle className="w-3 h-3" />
                                                )}
                                            </div>
                                            <span
                                                className={
                                                    formValues.address
                                                        ? 'text-gray-700'
                                                        : 'text-gray-500'
                                                }
                                            >
                                                Full Address
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-5 h-5 rounded-full flex items-center justify-center 
                                                ${
                                                    formValues.city &&
                                                    formValues.state &&
                                                    formValues.pincode
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-gray-100 text-gray-400'
                                                }`}
                                            >
                                                {formValues.city &&
                                                formValues.state &&
                                                formValues.pincode ? (
                                                    <Check className="w-3 h-3" />
                                                ) : (
                                                    <Circle className="w-3 h-3" />
                                                )}
                                            </div>
                                            <span
                                                className={
                                                    formValues.city &&
                                                    formValues.state &&
                                                    formValues.pincode
                                                        ? 'text-gray-700'
                                                        : 'text-gray-500'
                                                }
                                            >
                                                Location Details
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Bank Information */}
                                <div className="pb-4">
                                    <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                        <Landmark className="h-4 w-4" />
                                        Bank Details
                                    </h2>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-5 h-5 rounded-full flex items-center justify-center 
                                                ${
                                                    formValues.bankAccountNumber
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-gray-100 text-gray-400'
                                                }`}
                                            >
                                                {formValues.bankAccountNumber ? (
                                                    <Check className="w-3 h-3" />
                                                ) : (
                                                    <Circle className="w-3 h-3" />
                                                )}
                                            </div>
                                            <span
                                                className={
                                                    formValues.bankAccountNumber
                                                        ? 'text-gray-700'
                                                        : 'text-gray-500'
                                                }
                                            >
                                                Account Number
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-5 h-5 rounded-full flex items-center justify-center 
                                                ${
                                                    formValues.ifscCode
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-gray-100 text-gray-400'
                                                }`}
                                            >
                                                {formValues.ifscCode ? (
                                                    <Check className="w-3 h-3" />
                                                ) : (
                                                    <Circle className="w-3 h-3" />
                                                )}
                                            </div>
                                            <span
                                                className={
                                                    formValues.ifscCode
                                                        ? 'text-gray-700'
                                                        : 'text-gray-500'
                                                }
                                            >
                                                IFSC Code
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-5 h-5 rounded-full flex items-center justify-center 
                                                ${
                                                    formValues.accountHolderName
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-gray-100 text-gray-400'
                                                }`}
                                            >
                                                {formValues.accountHolderName ? (
                                                    <Check className="w-3 h-3" />
                                                ) : (
                                                    <Circle className="w-3 h-3" />
                                                )}
                                            </div>
                                            <span
                                                className={
                                                    formValues.accountHolderName
                                                        ? 'text-gray-700'
                                                        : 'text-gray-500'
                                                }
                                            >
                                                Account Holder
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Card - Form Content */}
                        <div className="w-full lg:w-2/3 border-2 p-5 rounded-lg shadow-md">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="space-y-6">
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-800 mb-1">
                                            Hello, {userName}
                                        </h1>
                                        <div className="flex justify-between items-center mb-6">
                                            <div className="text-sm text-gray-500">
                                                Complete your profile to start selling
                                            </div>
                                            <div className="text-sm font-medium text-gray-700">
                                                Step 3 of 3
                                            </div>
                                        </div>

                                        {/* Business Information Section */}
                                        <div className="mb-8">
                                            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                                <Briefcase className="h-5 w-5" />
                                                Business Information
                                            </h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-sm font-semibold text-gray-700">
                                                        Business Name{' '}
                                                        <span className="text-red-500">*</span>
                                                    </label>
                                                    <Input
                                                        {...register('businessName')}
                                                        placeholder="Your business name"
                                                        className="w-full p-2 border rounded-md mt-1"
                                                        aria-invalid={!!errors.businessName}
                                                    />
                                                    {errors.businessName && (
                                                        <p className="text-red-500 text-xs mt-1">
                                                            {errors.businessName.message}
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="text-sm font-semibold text-gray-700">
                                                        Business Type{' '}
                                                        <span className="text-red-500">*</span>
                                                    </label>
                                                    <select
                                                        {...register('businessType')}
                                                        className="w-full p-2 border rounded-md mt-1"
                                                        aria-invalid={!!errors.businessType}
                                                    >
                                                        <option value="">Select type</option>
                                                        <option value="individual">
                                                            Individual
                                                        </option>
                                                        <option value="partnership">
                                                            Partnership
                                                        </option>
                                                        <option value="llp">LLP</option>
                                                        <option value="pvt_ltd">
                                                            Private Limited
                                                        </option>
                                                        <option value="ltd">Public Limited</option>
                                                    </select>
                                                    {errors.businessType && (
                                                        <p className="text-red-500 text-xs mt-1">
                                                            {errors.businessType.message}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                                                    <User className="h-4 w-4" />
                                                    Owner Name{' '}
                                                    <span className="text-red-500">*</span>
                                                </label>
                                                <Input
                                                    {...register('ownerName')}
                                                    placeholder="Full name of business owner"
                                                    className="w-full p-2 border rounded-md mt-1"
                                                    aria-invalid={!!errors.ownerName}
                                                />
                                                {errors.ownerName && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.ownerName.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Store Information Section */}
                                        <div className="mb-8">
                                            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                                <Store className="h-5 w-5" />
                                                Store Information
                                            </h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-sm font-semibold text-gray-700">
                                                        Store Name{' '}
                                                        <span className="text-red-500">*</span>
                                                    </label>
                                                    <Input
                                                        {...register('storeName')}
                                                        placeholder="Your store name"
                                                        className="w-full p-2 border rounded-md mt-1"
                                                        aria-invalid={!!errors.storeName}
                                                    />
                                                    {errors.storeName && (
                                                        <p className="text-red-500 text-xs mt-1">
                                                            {errors.storeName.message}
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="text-sm font-semibold text-gray-700">
                                                        Store Category{' '}
                                                        <span className="text-red-500">*</span>
                                                    </label>
                                                    <select
                                                        {...register('storeCategory')}
                                                        className="w-full p-2 border rounded-md mt-1"
                                                        aria-invalid={!!errors.storeCategory}
                                                    >
                                                        <option value="">Select category</option>
                                                        <option value="electronics">
                                                            Electronics
                                                        </option>
                                                        <option value="fashion">Fashion</option>
                                                        <option value="home">Home & Kitchen</option>
                                                        <option value="beauty">Beauty</option>
                                                        <option value="sports">Sports</option>
                                                    </select>
                                                    {errors.storeCategory && (
                                                        <p className="text-red-500 text-xs mt-1">
                                                            {errors.storeCategory.message}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                                                    <FileText className="h-4 w-4" />
                                                    Business Description{' '}
                                                    <span className="text-red-500">*</span>
                                                </label>
                                                <textarea
                                                    {...register('description')}
                                                    placeholder="Describe your business (at least 50 characters)"
                                                    className="w-full p-2 border rounded-md mt-1 min-h-[100px]"
                                                    aria-invalid={!!errors.description}
                                                />
                                                {errors.description && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.description.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Address Information Section */}
                                        <div className="mb-8">
                                            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                                <MapPin className="h-5 w-5" />
                                                Address Information
                                            </h2>
                                            <div>
                                                <label className="text-sm font-semibold text-gray-700">
                                                    Full Address{' '}
                                                    <span className="text-red-500">*</span>
                                                </label>
                                                <textarea
                                                    {...register('address')}
                                                    placeholder="Your complete business address"
                                                    className="w-full p-2 border rounded-md mt-1 min-h-[80px]"
                                                    aria-invalid={!!errors.address}
                                                />
                                                {errors.address && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.address.message}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                                <div>
                                                    <label className="text-sm font-semibold text-gray-700">
                                                        City <span className="text-red-500">*</span>
                                                    </label>
                                                    <Input
                                                        {...register('city')}
                                                        placeholder="City"
                                                        className="w-full p-2 border rounded-md mt-1"
                                                        aria-invalid={!!errors.city}
                                                    />
                                                    {errors.city && (
                                                        <p className="text-red-500 text-xs mt-1">
                                                            {errors.city.message}
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="text-sm font-semibold text-gray-700">
                                                        State{' '}
                                                        <span className="text-red-500">*</span>
                                                    </label>
                                                    <Input
                                                        {...register('state')}
                                                        placeholder="State"
                                                        className="w-full p-2 border rounded-md mt-1"
                                                        aria-invalid={!!errors.state}
                                                    />
                                                    {errors.state && (
                                                        <p className="text-red-500 text-xs mt-1">
                                                            {errors.state.message}
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="text-sm font-semibold text-gray-700">
                                                        Pincode{' '}
                                                        <span className="text-red-500">*</span>
                                                    </label>
                                                    <Input
                                                        {...register('pincode')}
                                                        placeholder="Pincode"
                                                        className="w-full p-2 border rounded-md mt-1"
                                                        aria-invalid={!!errors.pincode}
                                                    />
                                                    {errors.pincode && (
                                                        <p className="text-red-500 text-xs mt-1">
                                                            {errors.pincode.message}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bank Information Section */}
                                        <div className="mb-8">
                                            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                                <Landmark className="h-5 w-5" />
                                                Bank Account Details
                                            </h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-sm font-semibold text-gray-700">
                                                        Account Number{' '}
                                                        <span className="text-red-500">*</span>
                                                    </label>
                                                    <Input
                                                        {...register('bankAccountNumber')}
                                                        placeholder="Your bank account number"
                                                        className="w-full p-2 border rounded-md mt-1"
                                                        aria-invalid={!!errors.bankAccountNumber}
                                                    />
                                                    {errors.bankAccountNumber && (
                                                        <p className="text-red-500 text-xs mt-1">
                                                            {errors.bankAccountNumber.message}
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="text-sm font-semibold text-gray-700">
                                                        IFSC Code{' '}
                                                        <span className="text-red-500">*</span>
                                                    </label>
                                                    <Input
                                                        {...register('ifscCode')}
                                                        placeholder="Bank IFSC code"
                                                        className="w-full p-2 border rounded-md mt-1"
                                                        aria-invalid={!!errors.ifscCode}
                                                    />
                                                    {errors.ifscCode && (
                                                        <p className="text-red-500 text-xs mt-1">
                                                            {errors.ifscCode.message}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <label className="text-sm font-semibold text-gray-700">
                                                    Account Holder Name{' '}
                                                    <span className="text-red-500">*</span>
                                                </label>
                                                <Input
                                                    {...register('accountHolderName')}
                                                    placeholder="Name as in bank records"
                                                    className="w-full p-2 border rounded-md mt-1"
                                                    aria-invalid={!!errors.accountHolderName}
                                                />
                                                {errors.accountHolderName && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.accountHolderName.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Signature Section */}
                                        <div className="pt-4 mb-6">
                                            <h2 className="text-lg font-semibold text-gray-800 mb-3">
                                                Add Your Signature
                                            </h2>
                                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                                <p className="text-sm text-gray-600 mb-3">
                                                    It is required to sell products on Rentpe
                                                </p>
                                                <div className="flex flex-col sm:flex-row gap-3">
                                                    <input
                                                        type="text"
                                                        placeholder="Enter your signature"
                                                        className="flex-1 p-2 border rounded-md"
                                                    />
                                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                                        OK
                                                    </button>
                                                    <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                                                        Check your signature
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Help Section */}
                                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                            <h3 className="text-sm font-medium text-blue-800 mb-2">
                                                Need help?
                                            </h3>
                                            <p className="text-xs text-blue-700 mb-3">
                                                Our team of specialists is happy to help you set up
                                                your store on Rentpe.
                                            </p>
                                            <button className="text-xs font-medium text-blue-600 hover:text-blue-800">
                                                Request a Callback
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-between pt-8">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={handlePrev}
                                        disabled={activeStep === 0}
                                    >
                                        Back
                                    </Button>
                                    <Button type="submit">Submit</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegisterVendor;
