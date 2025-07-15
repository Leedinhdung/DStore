import React, { useEffect, useRef, useState } from 'react'
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
import { useDebounce } from '@/hooks/common/useDebounce'
import { useSearch } from '@/hooks/other/useOther'
import { getImageUrl } from '@/lib/common'
import { priceFormat } from '@/helpers/formatHelper'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'

const Header = () => {
  const [user, setUser] = useState<IUser | null>(null)
  const [search, setSearch] = useState("")
  const [visible, setVisible] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { data: categories } = useGetCategories()
  const debounceSearch = useDebounce(search, 500)
  const { data, isLoading } = useSearch(debounceSearch)
  const boxRef = useRef<HTMLDivElement>(null)

  const totalQuantity = useSelector((state: RootState) => {
    return state.cart.products.reduce((sum, item) => sum + item.quantity, 0);
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user_data')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md fixed top-0 w-full py-2 z-30 ">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-4 px-4 py-3">
        <div className="flex justify-between items-center md:justify-start">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <span className="bg-white text-blue-600 w-10 h-10 rounded-full flex items-center justify-center mr-2">
              D
            </span>
            DStore
          </Link>
          <div className='flex gap-3'>
            <Link
              to={routes.cart}
              className="flex items-center gap-2 hover:text-blue-200 transition-colors relative md:hidden"
            >
              <div className="bg-blue-500 p-2 rounded-full hover:bg-blue-400 transition-colors">
                <ShoppingCartIcon className="w-4 h-4" />
              </div>
              <span className="absolute -top-2 left-4 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalQuantity}
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
        <div className="hidden md:flex justify-center relative text-black">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Bạn cần tìm gì?"
              onChange={(e) => setSearch(e.target.value)}
              onClick={() => setVisible(true)}
              className="w-full pl-10 pr-4 py-2 rounded-full outline-none text-gray-700 focus:ring-2 focus:ring-blue-400"
            />
            <SearchIcon
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
          {search.length > 0 && visible && (
            <div
              ref={boxRef}
              className="absolute top-[120%] z-40 max-h-[75vh] w-full overflow-y-auto rounded-lg border bg-white px-4 py-3 shadow"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  {isLoading && search.length > 1 ? (
                    <div className="flex items-center justify-center">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-darkGrey border-t-transparent"></div>
                    </div>
                  ) : (
                    <SearchIcon className="size-5 text-primary" />
                  )}
                  <span className="text-darkGrey">Kết quả cho '{search}'</span>
                </div>
                {data && data.length > 0 && (
                  <div>
                    <div className="flex flex-col gap-3">
                      {data?.map((item, index) => (
                        <Link
                          to={routes.detailProduct.replace(':slug', item.slug)}
                          key={index}
                          className="flex items-center gap-4 border-b"
                          onClick={() => setVisible(false)}
                        >
                          <img
                            src={getImageUrl(item.image)}
                            alt={item.title}
                            className="h-10 w-10 rounded-full"
                          />
                          <div>
                            <h3 className="w-[300px] overflow-hidden truncate whitespace-nowrap text-base">
                              {item.title}
                            </h3>
                            {item?.sale_price == null ? <span className='text-red-500 font-medium text-sm'>{priceFormat(item?.original_price || 0)}</span> : <div>
                              <span className='text-red-500 text-sm font-medium'>{priceFormat(item?.sale_price || 0)}</span> <del className='text-gray-500 text-xs'>{priceFormat(item?.original_price || 0)}</del>
                            </div>}
                          </div>

                        </Link>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}
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
              {totalQuantity}
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
            onChange={(e) => setSearch(e.target.value)}
            onClick={() => setVisible(true)}
          />
          <SearchIcon
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
        {search.length > 0 && visible && (
          <div
            ref={boxRef}
            className="absolute top-[100%] z-40 w-screen max-w-full sm:hidden left-0 right-0 mx-auto rounded-lg border bg-white px-3 py-2 shadow-lg text-black"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                {isLoading && search.length > 1 ? (
                  <div className="flex items-center justify-center">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
                  </div>
                ) : (
                  <SearchIcon className="size-4 text-primary" />
                )}
                <span className="text-gray-600 text-sm">Kết quả cho '{search}'</span>
              </div>

              {data && data.length > 0 && (
                <div className="flex flex-col gap-2">
                  {data.map((item, index) => (
                    <Link
                      to={routes.detailProduct.replace(':slug', item.slug)}
                      key={index}
                      className="flex items-center gap-3 border-b pb-2"
                      onClick={() => setVisible(false)}
                    >
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.title}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                      <div className="flex flex-col text-sm">
                        <span className="line-clamp-1 font-medium">{item.title}</span>
                        {item.sale_price == null ? (
                          <span className="text-red-500 font-semibold text-xs">
                            {priceFormat(item.original_price || 0)}
                          </span>
                        ) : (
                          <div className="flex items-center gap-1 text-xs">
                            <span className="text-red-500 font-semibold">
                              {priceFormat(item.sale_price || 0)}
                            </span>
                            <del className="text-gray-400">{priceFormat(item.original_price || 0)}</del>
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

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