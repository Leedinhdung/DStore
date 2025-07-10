import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { EyeIcon, EyeOffIcon, UserIcon, LockIcon, MailIcon } from 'lucide-react'
import { registerSchema, type RegisterFormData } from '@/utils/validation'
import { toast } from 'sonner'
import { useRegister } from '@/hooks/auth/useAuth'
import { SuccessModal } from '@/components/modals'
import OtpVerification from '@/components/Otp/OtpVerification'
import { useVerifyOTP } from '@/hooks/auth/useOTP'


interface RegisterProps {
    onSwitchToLogin?: () => void;
}

const Register = ({ onSwitchToLogin }: RegisterProps) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [showOTPModal, setShowOTPModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [userEmail, setUserEmail] = useState('')
    const { mutateAsync, isPending } = useRegister()
    const { mutateAsync: verifyOTP, isPending: isVerifying } = useVerifyOTP()
    const {
        register,
        setError,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: yupResolver(registerSchema),
        mode: 'onChange',
    })

    const password = watch('password')

    const onSubmit = async (data: RegisterFormData) => {
        try {

            const apiData = {
                full_name: data.fullName,
                email: data.email,
                password: data.password,
                password_confirm: data.confirmPassword,
            }

            await mutateAsync(apiData)
            setUserEmail(data.email)
            setShowOTPModal(true)
        } catch (error: unknown) {
            const err = error as { response?: { data?: { errors?: any } }, message?: string };
            console.error('Error details:', err.response, err.message);

            if (err?.response?.data?.errors) {
                const errors = err.response.data.errors;
                if (Array.isArray(errors)) {
                    (errors as Record<string, string>[]).forEach((errorItem) => {
                        Object.entries(errorItem).forEach(([key, value]) => {
                            const message = value as string;
                            // Map field name từ API về form field
                            let fieldName = key;
                            if (key === 'fullname') fieldName = 'fullName';
                            if (key === 'password_confirm') fieldName = 'confirmPassword';

                            setError(fieldName as keyof RegisterFormData, {
                                type: 'manual',
                                message: message
                            });
                        });
                    });
                }
            } else {
                const message = err?.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại!'
                toast.error(message);
            }
        }
    }

    const handleVerifyOTP = async (otp: string) => {
        try {
            const result = await verifyOTP({ email: userEmail, otp })
            console.log('OTP verify result:', result)
            setShowOTPModal(false)
            setShowSuccessModal(true)
            reset()
        } catch (error: unknown) {
            console.error('OTP failed:', error);
        }

    }

    const handleCloseOTPModal = () => {
        setShowOTPModal(false)
        toast.info('Bạn có thể đăng ký lại khi cần thiết')
    }

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false)
    }

    const handleGoToLogin = () => {
        setShowSuccessModal(false)
        if (onSwitchToLogin) onSwitchToLogin();
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Tạo tài khoản mới</h2>
                    <p className="text-gray-600 mt-2">Đăng ký để trải nghiệm dịch vụ</p>
                </div>
                <div className="space-y-5">
                    <div className="group">
                        <label
                            htmlFor="fullName"
                            className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600"
                        >
                            Họ và tên
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UserIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                id="fullName"
                                type="text"
                                {...register('fullName')}
                                className={`block w-full pl-10 pr-3 py-3 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all`}
                                placeholder="Nguyễn Văn A"
                            />
                        </div>
                        {errors.fullName && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                <span className="inline-block w-1 h-1 rounded-full bg-red-500 mr-2"></span>
                                {errors.fullName.message}
                            </p>
                        )}
                    </div>
                    <div className="group">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MailIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                id="email"
                                type="text"
                                {...register('email')}
                                className={`block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all`}
                                placeholder="your.email@example.com"
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                <span className="inline-block w-1 h-1 rounded-full bg-red-500 mr-2"></span>
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div className="group">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600"
                        >
                            Mật khẩu
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LockIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                {...register('password')}
                                className={`block w-full pl-10 pr-10 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all`}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOffIcon className="h-5 w-5" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                <span className="inline-block w-1 h-1 rounded-full bg-red-500 mr-2"></span>
                                {errors.password.message}
                            </p>
                        )}
                        <div className="mt-1">
                            <div className="flex space-x-1">
                                <div
                                    className={`h-1 flex-1 rounded-full ${password && password.length >= 1 ? 'bg-red-400' : 'bg-gray-200'}`}
                                ></div>
                                <div
                                    className={`h-1 flex-1 rounded-full ${password && password.length >= 4 ? 'bg-orange-400' : 'bg-gray-200'}`}
                                ></div>
                                <div
                                    className={`h-1 flex-1 rounded-full ${password && password.length >= 6 ? 'bg-yellow-400' : 'bg-gray-200'}`}
                                ></div>
                                <div
                                    className={`h-1 flex-1 rounded-full ${password && password.length >= 8 ? 'bg-green-400' : 'bg-gray-200'}`}
                                ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số
                            </p>
                        </div>
                    </div>
                    <div className="group">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600"
                        >
                            Xác nhận mật khẩu
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LockIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                {...register('confirmPassword')}
                                className={`block w-full pl-10 pr-10 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all`}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                    <EyeOffIcon className="h-5 w-5" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                <span className="inline-block w-1 h-1 rounded-full bg-red-500 mr-2"></span>
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex items-center">
                    <input
                        id="agreeTerms"
                        type="checkbox"
                        {...register('agreeTerms')}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                        htmlFor="agreeTerms"
                        className="ml-2 block text-sm text-gray-700"
                    >
                        Tôi đồng ý với{' '}
                        <a
                            href="#"
                            className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                        >
                            điều khoản dịch vụ
                        </a>{' '}
                        và{' '}
                        <a
                            href="#"
                            className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                        >
                            chính sách bảo mật
                        </a>
                    </label>
                </div>
                {errors.agreeTerms && (
                    <p className="text-sm text-red-600 flex items-center">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500 mr-2"></span>
                        {errors.agreeTerms.message}
                    </p>
                )}
                <div>
                    <button
                        type="submit"
                        disabled={isPending}
                        className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${isPending ? 'opacity-80 cursor-not-allowed' : ''}`}
                    >
                        {isPending ? (
                            <>
                                <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Đang xử lý...
                            </>
                        ) : (
                            'Đăng ký'
                        )}
                    </button>
                </div>
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                                Hoặc đăng ký với
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            <span className="ml-2">Google</span>
                        </button>
                        <button
                            type="button"
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            <span className="ml-2">Facebook</span>
                        </button>
                    </div>
                </div>
            </form>

            <OtpVerification
                isOpen={showOTPModal}
                onClose={handleCloseOTPModal}
                onVerify={handleVerifyOTP}
                email={userEmail}
                isVerifying={isVerifying}
            />

            {/* Success Modal */}
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={handleCloseSuccessModal}
                onAction={handleGoToLogin}
                actionText="Đăng nhập ngay"
            />
        </>
    )
}

export default Register
