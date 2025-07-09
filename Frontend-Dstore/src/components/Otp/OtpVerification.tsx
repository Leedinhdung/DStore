import React, { useEffect, useState, useRef } from 'react'
import { ArrowRightIcon, ClockIcon } from 'lucide-react'
import { toast } from 'sonner'
import OtpInput from './OtpInput'

interface OtpVerificationProps {
  isOpen: boolean
  onClose: () => void
  onVerify: (otp: string) => Promise<void>
  email: string
  isVerifying?: boolean
}

const OtpVerification = ({ isOpen, onClose, onVerify, email, isVerifying = false }: OtpVerificationProps) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const [timeLeft, setTimeLeft] = useState<number>(60)
  const [isResending, setIsResending] = useState<boolean>(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  useEffect(() => {
    if (isOpen) {
      setOtp(Array(6).fill(''))
      setTimeLeft(60)
    }
  }, [isOpen])

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current as NodeJS.Timeout)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isResending])
  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
  }
  const handleResendCode = () => {
    setIsResending(true)
    // Simulate API call to resend code
    setTimeout(() => {
      setIsResending(false)
      setTimeLeft(60)
      toast.success('Mã OTP mới đã được gửi đến email của bạn')
    }, 1000)
  }
  const handleVerify = async () => {
    const otpCode = otp.join('')
    if (otpCode.length === 6) {
      try {
        await onVerify(otpCode)
      } catch (error) {
        console.error('OTP verification error:', error)
      }
    } else {
      toast.error('Vui lòng nhập đầy đủ mã OTP')
    }
  }
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full max-w-md mx-4 p-8 bg-white rounded-lg shadow-lg relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Xác thực Email</h1>
          <p className="text-gray-600">
            Chúng tôi đã gửi mã xác thực đến
          </p>
          <p className="text-blue-600 font-medium">{email}</p>
        </div>
        <div className="mb-8">
          <div className="flex justify-center gap-2 mb-6">
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <OtpInput
                  key={index}
                  value={otp[index]}
                  onChange={(value) => handleChange(value, index)}
                  index={index}
                  otp={otp}
                />
              ))}
          </div>
          <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
            <ClockIcon size={16} className="mr-1" />
            <span>
              {timeLeft > 0
                ? `Mã xác thực có hiệu lực trong ${timeLeft} giây`
                : 'Mã xác thực đã hết hạn'}
            </span>
          </div>
          <div className="text-center">
            <button
              onClick={handleResendCode}
              disabled={isResending || timeLeft > 0}
              className={`text-sm ${isResending || timeLeft > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'}`}
            >
              {isResending ? 'Đang gửi lại...' : 'Gửi lại mã'}
            </button>
          </div>
        </div>
        <button
          onClick={handleVerify}
          disabled={isVerifying || otp.join('').length !== 6}
          className={`w-full py-3 text-white rounded-md font-medium flex items-center justify-center transition-colors ${isVerifying || otp.join('').length !== 6
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          {isVerifying ? (
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
              Đang xác thực...
            </>
          ) : (
            <>
              Xác thực
              <ArrowRightIcon size={18} className="ml-2" />
            </>
          )}
        </button>
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Bạn cần hỗ trợ?{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Liên hệ chúng tôi
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default OtpVerification
