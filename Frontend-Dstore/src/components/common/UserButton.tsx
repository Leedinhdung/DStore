import React, { useEffect, useState } from 'react'
import {
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    IconButton,
} from '@mui/material'
import { LogOut, Settings, User } from 'lucide-react'
import { useLogout } from '@/hooks/auth/useAuth'
import { Link } from 'react-router-dom'
import routes from '@/routes/routes'
import { IUser } from '@/types/user'

interface UserButtonProps {
    username?: string
    avatarUrl?: string
    notifications?: number
}
const UserButton: React.FC<UserButtonProps> = () => {
    const [user, setUser] = useState<IUser | null>(null)
    const { mutateAsync } = useLogout()
    useEffect(() => {
        const storedUser = localStorage.getItem('user_data')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleLogout = async () => {
        await mutateAsync()
        handleClose()
        setUser(null)
    }
    return (
        <>{
            user ? (<div className="flex items-center">
                <IconButton
                    id="user-button"
                    aria-controls={open ? 'user-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    size="small"
                >
                    <Avatar src={user?.avatar}>
                        {!user?.avatar && user?.full_name?.charAt(0)?.toUpperCase()}
                    </Avatar>
                </IconButton>
                <Menu
                    id="user-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'user-button',
                    }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <User size="18" />
                        </ListItemIcon>
                        <ListItemText>Hồ sơ cá nhân</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Settings size="18" />
                        </ListItemIcon>
                        <ListItemText>Cài đặt</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <LogOut size="18" />
                        </ListItemIcon>
                        <ListItemText >Đăng xuất</ListItemText>
                    </MenuItem>
                </Menu>
            </div>) : (
                <Link to={routes.login} className='flex text-sm items-center gap-1'><User />Đăng nhập</Link>
            )
        }
        </>
    )
}
export default UserButton
