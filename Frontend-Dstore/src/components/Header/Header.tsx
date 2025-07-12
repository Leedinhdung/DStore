import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MenuIcon,
  PhoneIcon,
  ShoppingCartIcon,
  SearchIcon,
  UserIcon,
  XIcon,
} from 'lucide-react'
import routes from '@/routes/routes'
import UserButton from '@/components/common/UserButton'
import { IUser } from '@/types/user'
import { useGetCategories } from '@/hooks/category/useGetCategories'
const Header = () => {
  const [user, setUser] = useState<IUser | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { data: categories } = useGetCategories()
  useEffect(() => {
    const storedUser = localStorage.getItem('user_data')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-4 px-4 py-3">
        {/* Logo & Hamburger */}
        <div className="flex justify-between items-center md:justify-start">
          <Link to="/" className="text-xl font-bold flex items-center">
            <span className="bg-white text-blue-600 w-8 h-8 rounded-full flex items-center justify-center mr-2">
              D
            </span>
            DStore
          </Link>
          {/* Mobile menu button */}
          <div className='flex gap-3'>
            <Link
              to={routes.cart}
              className="flex items-center gap-2 hover:text-blue-200 transition-colors relative md:hidden"
            >
              <div className="bg-blue-500 p-2 rounded-full hover:bg-blue-400 transition-colors">
                <ShoppingCartIcon className="w-4 h-4" />
              </div>
              <span className="absolute -top-2 left-4 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                0
              </span>
            </Link>
            <button
              onClick={toggleDrawer}
              className="p-1 rounded-md text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 md:hidden"
              aria-label="Open menu"
            >
              <MenuIcon size={24} />
            </button>
          </div>

        </div>
        {/* Search bar - desktop only */}
        <div className="hidden md:flex justify-center relative">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Bạn cần tìm gì?"
              className="w-full pl-10 pr-4 py-2 rounded-full outline-none text-gray-700 focus:ring-2 focus:ring-blue-400"
            />
            <SearchIcon
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
        </div>
        {/* Info section - desktop only */}
        <div className="hidden md:flex justify-end items-center space-x-5">
          {/* Hotline */}
          <div className="flex items-center gap-2 group">
            <div className="bg-blue-500 p-2 rounded-full group-hover:bg-blue-400 transition-colors">
              <PhoneIcon className="w-4 h-4" />
            </div>
            <div className="grid text-xs">
              <span className="text-blue-100">Hotline</span>
              <span className="font-semibold">094.1144.666</span>
            </div>
          </div>
          {/* Shopping Cart */}
          <Link
            to={routes.cart}
            className="flex items-center gap-2 hover:text-blue-200 transition-colors relative"
          >
            <div className="bg-blue-500 p-2 rounded-full hover:bg-blue-400 transition-colors">
              <ShoppingCartIcon className="w-4 h-4" />
            </div>
            <span className="text-sm">Giỏ hàng</span>
            <span className="absolute -top-2 left-4 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              0
            </span>
          </Link>
          {/* User */}
          <UserButton />
        </div>
      </div>
      {/* Mobile Search - only on mobile */}
      <div className="px-4 pb-3 md:hidden">
        <div className="relative">
          <input
            type="text"
            placeholder="Bạn cần tìm gì?"
            className="w-full pl-10 pr-4 py-2 rounded-full outline-none text-gray-700 focus:ring-2 focus:ring-blue-400"
          />
          <SearchIcon
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
      </div>
      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleDrawer}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Link to={routes.home} className="text-lg font-bold text-blue-600 flex items-center">
            <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-2">
              D
            </span>
            DStore
          </Link>

          <button
            onClick={toggleDrawer}
            className="p-1 rounded-md text-gray-500 hover:bg-gray-100"
          >
            <XIcon size={24} />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <ul className="space-y-1">
              {categories?.map((item) => {
                return (
                  <li key={item.id} className="relative group bg-gray-50 rounded-lg">
                    <Link
                      to={routes.category.replace(":slug", item.slug)}
                      onClick={toggleDrawer}
                      className="flex items-center justify-between px-4 py-2.5 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: item.icon_svg,
                          }}
                          className="text-gray-500 group-hover:text-blue-500 w-5 h-5 flex items-center justify-center transition-colors"
                        />
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
            {/* Riêng Đăng nhập */}
            {!user && (
              <li key="login">
                <Link
                  to={routes.login}
                  onClick={toggleDrawer}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <span className="text-gray-500">
                    <UserIcon size={20} />
                  </span>
                  <span>Đăng nhập</span>
                </Link>
              </li>
            )}
          </ul>

        </nav>
        {/* Hotline in drawer */}
        <div className="p-4 border-t mt-4">
          <div className="flex items-center gap-3 text-gray-700">
            <PhoneIcon size={20} className="text-blue-600" />
            <div>
              <div className="text-sm text-gray-500">Hotline</div>
              <div className="font-medium">094.1144.666</div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full p-4 border-t text-center text-sm text-gray-500">
          © 2025 DStore
        </div>
      </div>
    </header>
  )
}
export default Header;