import {
    Building,
    Move,
    Edit,
    Plus,
    FileText,
    Check,
    Clock,
    Landmark,
    Shield,
    BadgeCheck,
    Receipt,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { motion, PanInfo } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

type CardPosition = {
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number;
};

const editBankDetailsSchema = z.object({
    accountName: z.string().min(2, 'Account name must be at least 2 characters'),
    accountNumber: z.string().min(4, 'Account number must be at least 4 characters'),
    bankName: z.string().min(2, 'Bank name must be at least 2 characters'),
    branch: z.string().min(2, 'Branch must be at least 2 characters'),
    swiftCode: z.string().min(8, 'SWIFT code must be at least 8 characters'),
    currency: z.string().min(1, 'Currency is required'),
    gstNumber: z.string().min(15, 'GST number must be 15 characters').max(15, 'GST number must be 15 characters').optional(),
    gstVerified: z.boolean().optional(),
});

const addBankAccountSchema = z.object({
    accountName: z.string().min(2, 'Account name must be at least 2 characters'),
    accountNumber: z.string().min(4, 'Account number must be at least 4 characters'),
    bankName: z.string().min(2, 'Bank name must be at least 2 characters'),
    branch: z.string().min(2, 'Branch must be at least 2 characters'),
    swiftCode: z.string().min(8, 'SWIFT code must be at least 8 characters'),
    currency: z.string().min(1, 'Currency is required'),
    routingNumber: z.string().min(8, 'Routing number must be at least 8 characters'),
    gstNumber: z.string().min(15, 'GST number must be 15 characters').max(15, 'GST number must be 15 characters').optional(),
});

type EditBankDetailsFormValues = z.infer<typeof editBankDetailsSchema>;
type AddBankAccountFormValues = z.infer<typeof addBankAccountSchema>;

export default function BankDetails() {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [addAccountModalOpen, setAddAccountModalOpen] = useState(false);
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1200,
        height: typeof window !== 'undefined' ? window.innerHeight : 800,
    });

    const MIN_CARD_SIZE = { width: 650, height: 700 };
    const MAX_CARD_SIZE = { width: 800, height: 700 };

    // Calculate initial positions based on window width
    const [positions, setPositions] = useState({
        details: {
            x: 20,
            y: 20,
            width: MIN_CARD_SIZE.width,
            height: MIN_CARD_SIZE.height,
            zIndex: 20,
        },
        verification: {
            x: windowSize.width / 2 + 20,
            y: 20,
            width: MIN_CARD_SIZE.width,
            height: MIN_CARD_SIZE.height,
            zIndex: 10,
        },
    });

    const constraintsRef = useRef<HTMLDivElement>(null);
    const resizeData = useRef({
        isResizing: false,
        card: null as 'details' | 'verification' | null,
        startX: 0,
        startY: 0,
        startWidth: 0,
        startHeight: 0,
    });

    const [bankDetails, setBankDetails] = useState({
        accountName: 'Acme Inc.',
        accountNumber: '**** **** **** 4567',
        bankName: 'Chase Bank',
        branch: 'New York Main Branch',
        swiftCode: 'CHASUS33',
        currency: 'USD',
        isVerified: true,
        balance: '$245,678.90',
        lastTransaction: 'May 10, 2023',
        monthlyLimit: '$500,000',
        transactionsThisMonth: 42,
        gstNumber: '22AAAAA0000A1Z5',
        gstVerified: true,
    });

    const editForm = useForm<EditBankDetailsFormValues>({
        resolver: zodResolver(editBankDetailsSchema),
        defaultValues: {
            accountName: bankDetails.accountName,
            accountNumber: bankDetails.accountNumber,
            bankName: bankDetails.bankName,
            branch: bankDetails.branch,
            swiftCode: bankDetails.swiftCode,
            currency: bankDetails.currency,
            gstNumber: bankDetails.gstNumber,
        },
    });

    const addAccountForm = useForm<AddBankAccountFormValues>({
        resolver: zodResolver(addBankAccountSchema),
        defaultValues: {
            accountName: '',
            accountNumber: '',
            bankName: '',
            branch: '',
            swiftCode: '',
            currency: 'USD',
            routingNumber: '',
            gstNumber: '',
        },
    });

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });

            // Update card positions to stay in their respective halves
            setPositions((prev) => ({
                details: {
                    ...prev.details,
                    x: Math.min(prev.details.x, window.innerWidth / 2 - prev.details.width - 20),
                },
                verification: {
                    ...prev.verification,
                    x: Math.max(prev.verification.x, window.innerWidth / 2 + 20),
                },
            }));
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleEditSubmit = (data: EditBankDetailsFormValues) => {
        setBankDetails({
            ...bankDetails,
            ...data,
            isVerified: false,
            gstVerified: data.gstNumber === bankDetails.gstNumber ? bankDetails.gstVerified : false,
        });
        setEditModalOpen(false);
        toast.success('Bank details updated', {
            description: 'Your bank details have been updated and will need verification.',
        });
    };

    const handleAddAccountSubmit = (data: AddBankAccountFormValues) => {
        setAddAccountModalOpen(false);
        toast.success('New account added', {
            description: 'Your new bank account has been added successfully.',
        });
        addAccountForm.reset();
    };

    const handleUploadDocuments = () => {
        setUploadModalOpen(false);
        toast.success('Documents uploaded', {
            description: 'Your verification documents have been submitted for review.',
        });
    };

    const handleDragEnd = (card: 'details' | 'verification', info: PanInfo) => {
        if (resizeData.current.isResizing) return;

        const container = constraintsRef.current?.getBoundingClientRect();
        if (!container) return;

        let newX = positions[card].x + info.offset.x;
        let newY = positions[card].y + info.offset.y;

        // Constrain to left or right half based on card type
        if (card === 'details') {
            newX = Math.max(20, Math.min(windowSize.width / 2 - positions[card].width - 20, newX));
        } else {
            newX = Math.max(
                windowSize.width / 2 + 20,
                Math.min(windowSize.width - positions[card].width - 20, newX)
            );
        }

        newY = Math.max(20, Math.min(windowSize.height - positions[card].height - 20, newY));

        setPositions((prev) => ({
            ...prev,
            [card]: { ...prev[card], x: newX, y: newY, zIndex: 30 },
        }));
    };

    const startResize = (card: 'details' | 'verification', e: React.PointerEvent) => {
        e.stopPropagation();
        resizeData.current = {
            isResizing: true,
            card,
            startX: e.clientX,
            startY: e.clientY,
            startWidth: positions[card].width,
            startHeight: positions[card].height,
        };

        document.addEventListener('pointermove', handleResize);
        document.addEventListener('pointerup', stopResize, { once: true });
    };

    const handleResize = (e: PointerEvent) => {
        if (!resizeData.current.isResizing || !resizeData.current.card) return;

        const { card, startX, startY, startWidth, startHeight } = resizeData.current;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        const newWidth = Math.max(
            MIN_CARD_SIZE.width,
            Math.min(MAX_CARD_SIZE.width, startWidth + deltaX)
        );
        const newHeight = Math.max(
            MIN_CARD_SIZE.height,
            Math.min(MAX_CARD_SIZE.height, startHeight + deltaY)
        );

        setPositions((prev) => ({
            ...prev,
            [card]: { ...prev[card], width: newWidth, height: newHeight },
        }));
    };

    const stopResize = () => {
        resizeData.current.isResizing = false;
        document.removeEventListener('pointermove', handleResize);
    };

    return (
        <div
            ref={constraintsRef}
            className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50/50 p-4"
        >
            {/* Bank Details Card */}
            <motion.div
                className="absolute cursor-grab active:cursor-grabbing bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
                style={{
                    x: positions.verification.x,
                    y: positions.verification.y,
                    width: positions.verification.width,
                    height: positions.verification.height,
                    zIndex: positions.verification.zIndex,
                }}
                drag
                dragConstraints={{
                    left: windowSize.width / 2 + 20,
                    right: windowSize.width - positions.verification.width - 20,
                    top: 20,
                    bottom: windowSize.height - positions.verification.height - 20,
                }}
                dragElastic={0.1}
                dragMomentum={false}
                onDragEnd={(_, info) => handleDragEnd('verification', info)}
                whileDrag={{
                    scale: 1.02,
                    boxShadow: '0 25px 50px -12px rgba(20, 184, 166, 0.25)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                {/* Resize handle */}
                <div
                    className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize z-30"
                    onPointerDown={(e) => startResize('verification', e)}
                >
                    <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-teal-400 rounded-br-lg"></div>
                </div>

                <Card className="h-full bg-transparent border-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-indigo-50/50"></div>
                    <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

                    <CardHeader className="flex flex-row items-center justify-between pb-3 pt-4 px-5">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 shadow-inner">
                                <Shield className="h-5 w-5 text-blue-600" />
                            </div>
                            <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                                Verification Status
                            </CardTitle>
                        </div>
                        {bankDetails.isVerified ? (
                            <Badge className="bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-sm flex items-center gap-1">
                                <BadgeCheck className="h-3.5 w-3.5" />
                                <span>Verified</span>
                            </Badge>
                        ) : (
                            <Badge className="bg-amber-100 text-amber-800 border border-amber-200 shadow-sm flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                <span>Pending</span>
                            </Badge>
                        )}
                    </CardHeader>

                    <CardContent className="pt-2 pb-6 px-5">
                        <div className="grid gap-6">
                            <div className="space-y-4">
                                <div className="bg-white/70 rounded-lg p-4 border border-blue-100/50">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 rounded-lg bg-blue-50">
                                            <FileText className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-blue-800">
                                                Verification Required
                                            </h4>
                                            <p className="text-sm text-blue-600/90 mt-1">
                                                {bankDetails.isVerified
                                                    ? 'Your account was verified on May 5, 2023'
                                                    : 'Please upload documents to verify your bank account'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {!bankDetails.isVerified && (
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-500">
                                                Verification Progress
                                            </span>
                                            <span className="text-sm font-medium text-blue-600">
                                                1/3 steps
                                            </span>
                                        </div>
                                        <Progress
                                            value={33}
                                            className="h-2 bg-blue-50"
                                            indicatorClassName="bg-gradient-to-r from-blue-400 to-indigo-500"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-blue-800 mb-2">Next Steps</h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <div
                                                className={`flex-shrink-0 mt-0.5 p-1 rounded-full ${
                                                    bankDetails.isVerified
                                                        ? 'bg-emerald-100 text-emerald-600'
                                                        : 'bg-blue-100 text-blue-600'
                                                }`}
                                            >
                                                {bankDetails.isVerified ? (
                                                    <Check className="h-3.5 w-3.5" />
                                                ) : (
                                                    <span className="text-xs font-bold">1</span>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">
                                                    Submit bank details
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Enter your account information
                                                </p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div
                                                className={`flex-shrink-0 mt-0.5 p-1 rounded-full ${
                                                    bankDetails.isVerified
                                                        ? 'bg-emerald-100 text-emerald-600'
                                                        : 'bg-gray-100 text-gray-400'
                                                }`}
                                            >
                                                {bankDetails.isVerified ? (
                                                    <Check className="h-3.5 w-3.5" />
                                                ) : (
                                                    <span className="text-xs font-bold">2</span>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">
                                                    Upload documents
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Bank statement or voided check
                                                </p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div
                                                className={`flex-shrink-0 mt-0.5 p-1 rounded-full ${
                                                    bankDetails.isVerified
                                                        ? 'bg-emerald-100 text-emerald-600'
                                                        : 'bg-gray-100 text-gray-400'
                                                }`}
                                            >
                                                {bankDetails.isVerified ? (
                                                    <Check className="h-3.5 w-3.5" />
                                                ) : (
                                                    <span className="text-xs font-bold">3</span>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">
                                                    Wait for verification
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Usually takes 1-2 business days
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <Button
                                    className="w-full gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
                                    onClick={() => setUploadModalOpen(true)}
                                    disabled={bankDetails.isVerified}
                                >
                                    <FileText className="h-4 w-4" />
                                    {bankDetails.isVerified
                                        ? 'Documents Verified'
                                        : 'Upload Verification Documents'}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Verification Status Card */}
            <motion.div
                className="absolute cursor-grab active:cursor-grabbing bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
                style={{
                    x: positions.details.x,
                    y: positions.details.y,
                    width: positions.details.width,
                    height: positions.details.height,
                    zIndex: positions.details.zIndex,
                }}
                drag
                dragConstraints={{
                    left: 20,
                    right: windowSize.width / 2 - positions.details.width - 20,
                    top: 20,
                    bottom: windowSize.height - positions.details.height - 20,
                }}
                dragElastic={0.1}
                dragMomentum={false}
                onDragEnd={(_, info) => handleDragEnd('details', info)}
                whileDrag={{
                    scale: 1.02,
                    boxShadow: '0 25px 50px -12px rgba(20, 184, 166, 0.25)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                {/* Resize handle */}
                <div
                    className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize z-30"
                    onPointerDown={(e) => startResize('details', e)}
                >
                    <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-teal-400 rounded-br-lg"></div>
                </div>

                <Card className="h-full bg-transparent border-0 pointer-events-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-50/20 to-teal-50/50 pointer-events-none"></div>
                    <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-teal-500 to-emerald-600 pointer-events-none"></div>

                    <CardHeader className="flex flex-row items-center justify-between pb-3 pt-4 px-5 pointer-events-none">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-gradient-to-br from-teal-100 to-emerald-100 shadow-inner">
                                <Landmark className="h-5 w-5 text-teal-600" />
                            </div>
                            <CardTitle className="text-xl font-bold bg-gradient-to-r from-teal-600 to-emerald-700 bg-clip-text text-transparent">
                                Bank Account Details
                            </CardTitle>
                        </div>
                        <Badge className="bg-teal-100 text-teal-800 border border-teal-200 shadow-sm pointer-events-none">
                            Primary Account
                        </Badge>
                    </CardHeader>

                    <CardContent className="pt-2 pb-6 px-5 pointer-events-auto">
                        <div className="grid gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Balance</p>
                                        <p className="text-2xl font-bold text-teal-800">
                                            {bankDetails.balance}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-500">
                                            Last Transaction
                                        </p>
                                        <p className="text-sm font-medium text-teal-700">
                                            {bankDetails.lastTransaction}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white/70 rounded-lg p-4 border border-teal-100/50">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs font-medium text-gray-500">
                                                Monthly Limit
                                            </p>
                                            <p className="font-medium text-teal-800">
                                                {bankDetails.monthlyLimit}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500">
                                                Transactions
                                            </p>
                                            <p className="font-medium text-teal-800">
                                                {bankDetails.transactionsThisMonth} this month
                                            </p>
                                        </div>
                                    </div>
                                    <Progress
                                        value={(bankDetails.transactionsThisMonth / 50) * 100}
                                        className="h-2 mt-2 bg-teal-50"
                                        indicatorClassName="bg-gradient-to-r from-teal-400 to-emerald-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                {Object.entries({
                                    accountName: 'Account Name',
                                    accountNumber: 'Account Number',
                                    bankName: 'Bank Name',
                                    branch: 'Branch',
                                    swiftCode: 'SWIFT Code',
                                    currency: 'Currency',
                                    gstNumber: 'GST Number',
                                }).map(([key, label]) => (
                                    <div key={key} className="flex justify-between">
                                        <span className="text-sm font-medium text-gray-500">
                                            {label}
                                        </span>
                                        <span className="text-sm font-medium text-teal-800 flex items-center gap-1">
                                            {bankDetails[key as keyof typeof bankDetails]}
                                            {key === 'gstNumber' && bankDetails.gstVerified && (
                                                <BadgeCheck className="h-4 w-4 text-emerald-500" />
                                            )}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    className="gap-1.5 bg-white text-teal-600 hover:bg-teal-50 border border-teal-100 shadow-sm hover:shadow-md transition-all pointer-events-auto"
                                    onClick={() => setEditModalOpen(true)}
                                >
                                    <Edit className="h-4 w-4" />
                                    <span>Edit</span>
                                </Button>
                                <Button
                                    className="gap-1.5 bg-white text-teal-600 hover:bg-teal-50 border border-teal-100 shadow-sm hover:shadow-md transition-all pointer-events-auto"
                                    onClick={() => setAddAccountModalOpen(true)}
                                >
                                    <Plus className="h-4 w-4" />
                                    <span>New Account</span>
                                </Button>
                                <Button className="gap-1.5 bg-white text-teal-600 hover:bg-teal-50 border border-teal-100 shadow-sm hover:shadow-md transition-all pointer-events-auto">
                                    <FileText className="h-4 w-4" />
                                    <span>Statements</span>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Reset Position Button */}
            <motion.div
                className="fixed bottom-6 right-6 z-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Button
                    onClick={() =>
                        setPositions({
                            details: {
                                x: 20,
                                y: 20,
                                width: MIN_CARD_SIZE.width,
                                height: MIN_CARD_SIZE.height,
                                zIndex: 20,
                            },
                            verification: {
                                x: windowSize.width / 2 + 20,
                                y: 20,
                                width: MIN_CARD_SIZE.width,
                                height: MIN_CARD_SIZE.height,
                                zIndex: 10,
                            },
                        })
                    }
                    className="gap-2 shadow-lg bg-blue-600 hover:bg-blue-700"
                >
                    <Move className="h-4 w-4" />
                    Reset Positions
                </Button>
            </motion.div>

            {/* Edit Bank Details Modal */}
            <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Edit className="h-5 w-5 text-teal-600" />
                            Edit Bank Details
                        </DialogTitle>
                        <DialogDescription>
                            Update your bank account information. Changes will require verification.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...editForm}>
                        <form
                            onSubmit={editForm.handleSubmit(handleEditSubmit)}
                            className="space-y-4"
                        >
                            {Object.entries({
                                accountName: 'Account Name',
                                accountNumber: 'Account Number',
                                bankName: 'Bank Name',
                                branch: 'Branch',
                                swiftCode: 'SWIFT Code',
                                currency: 'Currency',
                                gstNumber: 'GST Number',
                            }).map(([name, label]) => (
                                <FormField
                                    key={name}
                                    control={editForm.control}
                                    name={name as keyof EditBankDetailsFormValues}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{label}</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder={label} 
                                                    {...field} 
                                                    className={name === 'gstNumber' ? 'uppercase' : ''}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                            <div className="flex justify-end gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setEditModalOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit">Save Changes</Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            {/* Add Bank Account Modal */}
            <Dialog open={addAccountModalOpen} onOpenChange={setAddAccountModalOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Plus className="h-5 w-5 text-teal-600" />
                            Add New Bank Account
                        </DialogTitle>
                        <DialogDescription>
                            Add a new bank account to your profile. All accounts are subject to
                            verification.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...addAccountForm}>
                        <form
                            onSubmit={addAccountForm.handleSubmit(handleAddAccountSubmit)}
                            className="space-y-4"
                        >
                            {Object.entries({
                                accountName: 'Account Name',
                                accountNumber: 'Account Number',
                                bankName: 'Bank Name',
                                branch: 'Branch',
                                swiftCode: 'SWIFT Code',
                                currency: 'Currency',
                                routingNumber: 'Routing Number',
                                gstNumber: 'GST Number',
                            }).map(([name, label]) => (
                                <FormField
                                    key={name}
                                    control={addAccountForm.control}
                                    name={name as keyof AddBankAccountFormValues}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{label}</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder={label} 
                                                    {...field} 
                                                    className={name === 'gstNumber' ? 'uppercase' : ''}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                            <div className="flex justify-end gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setAddAccountModalOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit">Add Account</Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            {/* Upload Documents Modal */}
            <Dialog open={uploadModalOpen} onOpenChange={setUploadModalOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-purple-600" />
                            Upload Verification Documents
                        </DialogTitle>
                        <DialogDescription>
                            For your security, please upload one of the following documents to
                            verify your bank account:
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                                <h4 className="font-medium text-purple-800 mb-2">
                                    Accepted Documents
                                </h4>
                                <ul className="text-sm text-purple-600/90 space-y-2">
                                    <li className="flex items-start gap-2">
                                        <Check className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                                        <span>
                                            Bank statement (PDF or image) from the last 3 months
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                                        <span>Voided check with visible account details</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                                        <span>
                                            Official bank letter with account details (on bank
                                            letterhead)
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                                        <span>
                                            GST certificate (for GST verification)
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-purple-500"
                                    >
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="17 8 12 3 7 8"></polyline>
                                        <line x1="12" y1="3" x2="12" y2="15"></line>
                                    </svg>
                                    <p className="text-sm text-gray-600">
                                        Drag and drop files here, or click to select files
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Accepted file types: PDF, JPG, PNG (Max 5MB)
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setUploadModalOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="button" onClick={handleUploadDocuments}>
                                Upload Documents
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}