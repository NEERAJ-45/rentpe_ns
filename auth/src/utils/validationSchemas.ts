import z from 'zod';

export const registerSchema = z.object({
    firstname: z
        .string({ required_error: 'First name is required' })
        .min(2, 'First name must be at least 2 characters')
        .max(16, 'First name must not exceed 16 characters'),

    middlename: z
        .string({ required_error: 'Middle name is required' })
        .min(2, 'Middle name must be at least 2 characters')
        .max(16, 'Middle name must not exceed 16 characters'),

    lastname: z
        .string({ required_error: 'Last name is required' })
        .min(2, 'Last name must be at least 2 characters')
        .max(16, 'Last name must not exceed 16 characters'),

    email: z
        .string({ required_error: 'Email is required' })
        .email('Please enter a valid email address'),

    password: z
        .string({ required_error: 'Password is required' })
        .min(8, 'Password must be at least 8 characters long')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must include uppercase, lowercase, number, and special character'
        ),

    mobile: z
        .string()
        .regex(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
        .or(z.literal('')),

    gender: z.enum(['male', 'female', 'other'], {
        required_error: 'Gender is required',
        invalid_type_error: 'Gender must be either male, female, or other',
    }),
});

export const loginSchema = z.object({
    email: z
        .string({ required_error: 'Email is required' })
        .email('Please enter a valid email address'),
    password: z
        .string({ required_error: 'Password is required' })
        .min(8, 'Password must be at least 8 characters long')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must include uppercase, lowercase, number, and special character'
        ),
});
