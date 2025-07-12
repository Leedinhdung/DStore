import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
    UserIcon,
    LogOutIcon,
    SettingsIcon,
    UserCircleIcon,
} from 'lucide-react'
import { IUser } from '@/types/user'
import { useLogout } from '@/hooks/auth/useAuth'
import routes from '@/routes/routes'

const UserButton = () => {
    const [user, setUser] = useState<IUser | null>(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { mutateAsync } = useLogout()
    const menuRef = useRef<HTMLDivElement>(null)
    const avatarRef = useRef<HTMLButtonElement>(null)
    useEffect(() => {
        const storedUser = localStorage.getItem('user_data')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                avatarRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                !avatarRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])
    const handleLogout = async () => {
        await mutateAsync()
        setUser(null)
        setIsMenuOpen(false)
    }

    return (
        <>{
            user ? (<div className="relative">
                <button
                    ref={avatarRef}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center focus:outline-none"
                    aria-expanded={isMenuOpen}
                    aria-haspopup="true"
                >
                    {user.avatar ? (
                        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-blue-400 hover:border-blue-300 transition-colors">
                            <img
                                src={user.avatar}
                                alt={user.full_name || 'User'}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-9 h-9 rounded-full bg-blue-500 hover:bg-blue-400 text-white flex items-center justify-center border-2 border-blue-400 hover:border-blue-300 transition-colors">
                            {user.full_name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                    )}
                </button>
                {isMenuOpen && (
                    <div
                        ref={menuRef}
                        className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                    >
                        <div className="py-1" role="menu" aria-orientation="vertical">
                            <div className="px-4 py-3 border-b">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {user.full_name || 'User'}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    {user.email || ''}
                                </p>
                            </div>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                            >
                                <UserCircleIcon size={18} className="mr-3 text-gray-500" />
                                <span>Hồ sơ cá nhân</span>
                            </button>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                            >
                                <SettingsIcon size={18} className="mr-3 text-gray-500" />
                                <span>Cài đặt</span>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                role="menuitem"
                            >
                                <LogOutIcon size={18} className="mr-3 text-red-500" />
                                <span>Đăng xuất</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>) : (<Link
                to={routes.login}
                className="flex items-center gap-2 hover:text-blue-200 transition-colors"
            >
                <div className="bg-blue-500 p-2 rounded-full hover:bg-blue-400 transition-colors">
                    <UserIcon className="w-4 h-4" />
                </div>
                <span className="text-sm">Đăng nhập</span>
            </Link>)
        }
        </>

    )
}
export default UserButton