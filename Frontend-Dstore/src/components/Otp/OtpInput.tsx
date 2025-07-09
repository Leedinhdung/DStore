import React, { useEffect, useRef } from 'react'
interface OtpInputProps {
  value: string
  onChange: (value: string) => void
  index: number
  otp: string[]
}
const OtpInput: React.FC<OtpInputProps> = ({ value, onChange, index, otp }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  // Focus the first empty input on component mount
  useEffect(() => {
    if (index === 0 && !otp[0] && inputRef.current) {
      inputRef.current.focus()
    }
  }, [])
  // Auto focus next input after filling current one
  useEffect(() => {
    if (value && inputRef.current) {
      const nextIndex = index + 1
      if (nextIndex < otp.length) {
        const nextInput = document.querySelector(
          `input[name=otp-${nextIndex}]`,
        ) as HTMLInputElement
        if (nextInput) {
          nextInput.focus()
        }
      }
    }
  }, [value, index, otp.length])
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !value) {
      const prevIndex = index - 1
      if (prevIndex >= 0) {
        const prevInput = document.querySelector(
          `input[name=otp-${prevIndex}]`,
        ) as HTMLInputElement
        if (prevInput) {
          prevInput.focus()
        }
      }
    }
  }
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData('text')
    if (pasteData) {
      const digits = pasteData.slice(0, otp.length - index).split('')
      let currentIndex = index
      digits.forEach((digit) => {
        if (/^\d$/.test(digit) && currentIndex < otp.length) {
          const newOtp = [...otp]
          newOtp[currentIndex] = digit
          // Update the current input
          if (currentIndex === index) {
            onChange(digit)
          } else {
            // For subsequent inputs, we need to update them through DOM
            const input = document.querySelector(
              `input[name=otp-${currentIndex}]`,
            ) as HTMLInputElement
            if (input) {
              input.value = digit
              // Trigger change event
              const event = new Event('input', {
                bubbles: true,
              })
              input.dispatchEvent(event)
            }
          }
          currentIndex++
        }
      })
      // Focus the next empty input
      if (currentIndex < otp.length) {
        const nextInput = document.querySelector(
          `input[name=otp-${currentIndex}]`,
        ) as HTMLInputElement
        if (nextInput) {
          nextInput.focus()
        }
      }
    }
  }
  return (
    <input
      ref={inputRef}
      type="text"
      name={`otp-${index}`}
      value={value}
      onChange={(e) => {
        const val = e.target.value
        // Only accept numbers
        if (/^\d*$/.test(val) && val.length <= 1) {
          onChange(val)
        }
      }}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      maxLength={1}
      className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
      autoComplete="off"
      aria-label={`Digit ${index + 1}`}
    />
  )
}
export default OtpInput
