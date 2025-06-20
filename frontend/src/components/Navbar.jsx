import React, { useState } from 'react'
import { Link, Navigate } from 'react-router'
import { Search, HelpCircle, Settings, LogOut } from 'lucide-react'
import Logo from '../assets/logo.png'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

const Navbar = () => {
  const {user, logout} = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogOut = async () => {
    const {message} = await logout();
    toast.success(message);
    setShowMenu(false);
  }

  const avatar = user ? "https://api.dicebear.com/9.x/initials/svg?seed="+encodeURIComponent(user.username) : 'Loading...';
  
  return (
    <nav className='bg-black text-gray-200 flex justify-between items-center p-4 h-20 text-sm md:text-[15px] font-medium text-nowrap'>
      <Link to={"/"}>
        <img src={Logo} alt="Netflix Logo" loading='lazy' className='w-24 cursor-pointer brightness-125'  />
      </Link>
      <ul className='hidden xl:flex space-x-6'>
        <li className='cursor-pointer hover:text-[#e50914]'>Home</li>
        <li className='cursor-pointer hover:text-[#e50914]'>TV Shows</li>
        <li className='cursor-pointer hover:text-[#e50914]'>Movies</li>
        <li className='cursor-pointer hover:text-[#e50914]'>Anime</li>
        <li className='cursor-pointer hover:text-[#e50914]'>Games</li>
        <li className='cursor-pointer hover:text-[#e50914]'>New & Popular</li>
        <li className='cursor-pointer hover:text-[#e50914]'>Upcoming</li>
      </ul>

      <div className='flex items-center space-x-4 relative'>
        <div className='relative hidden md:inline-flex'>
          <input type="text" className='bg-[#333333] px-4 py-2 rounded-full min-w-72 pr-10 outline-none' placeholder='Search...' />
          <Search className='absolute top-2 right-4 w-5 h-5' />
        </div>
        <Link to={user ? "ai-recommendations" : "signin" }>
          <button className='bg-[#e50914] px-5 py-2 text-white cursor-pointer'>Get AI Movie Picks</button>
        </Link>
        { !user ? <Link to={"/signin"}>
          <button className='border border-[#333333] py-2 px-4 cursor-pointer'>Sign-In</button>
        </Link> : <div className='text-white-800 cursor-pointer'><img onClick={() => setShowMenu(!showMenu)} src={avatar} loading='lazy' alt="Avatar" className='h-9 w-full rounded-full border-2 border-[#e50914]' />
          {showMenu && (
            <div className='absolute right-0 mt-2 w-64 bg-[#232323] bg-opacity-95 rounded-lg z-50 shadow-lg py-4 px-3 flex flex-col gap-1 border border-[#333333] '>
              <div className='flex flex-col items-center mb-2'>
                <span className='text-white font-semibold text-base'>{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</span>
                <span className='text-xs text-gray-400'>{user.email}</span>
              </div>
              <button className='flex items-center px-2 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer'>
                <HelpCircle />
                Help Center
              </button>
              <button className='flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer'>
                <Settings />
                Settings
              </button>
              <button className='flex items-center px-4 py-2 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-2 cursor-pointer' onClick={handleLogOut}>
                <LogOut />
                Log Out
              </button>
            </div>
          )}
        </div>}
      </div>
    </nav>
  )
}

export default Navbar
