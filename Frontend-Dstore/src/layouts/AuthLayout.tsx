import Login from '@/pages/Auth/Login'
import Register from '@/pages/Auth/Register'
import React, { useState } from 'react'

const AuthLayout = () => {
  const [isLogin, setIsLogin] = useState(true)
  return (
    <div className="flex w-full min-h-screen items-center justify-center p-4 md:p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-b-[30%] opacity-80 z-0"></div>
      <div className="hidden lg:block absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-300 to-pink-200 rounded-tl-[50%] opacity-70 z-0"></div>
      <div className="hidden lg:block absolute top-20 left-20 w-32 h-32 bg-yellow-300 rounded-full opacity-20 z-0"></div>
      <div className="hidden lg:block absolute bottom-20 left-1/4 w-24 h-24 bg-green-300 rounded-full opacity-30 z-0"></div>
      <div className="w-full max-w-md z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-blue-200/20">
          <div className="relative">
            <div className="flex">
              <button
                className={`flex-1 py-5 text-center font-medium transition-all duration-300 relative ${isLogin ? 'text-white z-10' : 'text-gray-600 hover:text-gray-800'}`}
                onClick={() => setIsLogin(true)}
              >
                Đăng nhập
                {isLogin && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-tl-lg -z-10"></div>
                )}
              </button>
              <button
                className={`flex-1 py-5 text-center font-medium transition-all duration-300 relative ${!isLogin ? 'text-white z-10' : 'text-gray-600 hover:text-gray-800'}`}
                onClick={() => setIsLogin(false)}
              >
                Đăng ký
                {!isLogin && (
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-tr-lg -z-10"></div>
                )}
              </button>
            </div>
            {/* Animated indicator */}
            <div
              className={`absolute bottom-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-300 ease-in-out ${isLogin ? 'left-0 w-1/2' : 'left-1/2 w-1/2'}`}
            ></div>
          </div>
          <div className="p-8">
            {isLogin ? <Login /> : <Register onSwitchToLogin={() => setIsLogin(true)} />}
          </div>
        </div>
        {/* Brand or app name */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2023 Your Brand Name. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
export default AuthLayout
