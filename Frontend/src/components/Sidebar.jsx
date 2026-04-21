import React from 'react';
import { Home, User, Bell, Mail, Search, LogOut, MoreHorizontal } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function Sidebar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    setUser(null);
    navigate('/');
  };

  const navItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Search, label: 'Explore', path: '/explore' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Mail, label: 'Messages', path: '/messages' },
    { icon: User, label: 'Profile', path: user ? `/profile/${user._id}` : '/profile' },
  ];

  return (
    <div className="flex flex-col justify-between h-screen p-4 xl:w-64 w-20 sticky top-0 border-r border-border/50">
      <div className="flex flex-col items-center xl:items-start gap-4">
        <NavLink to="/home" className="p-3 w-fit rounded-full hover:bg-surface transition-colors flex items-center justify-center">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-8 h-8 fill-current text-white">
            <g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 3.936H5.023z"></path></g>
          </svg>
        </NavLink>

        <nav className="flex flex-col gap-2 w-full mt-2">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-4 p-3 rounded-full hover:bg-surface transition-colors w-fit xl:w-full group",
                isActive && "font-bold"
              )}
            >
              <item.icon className="w-7 h-7" />
              <span className="hidden xl:inline text-xl">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <button className="w-12 h-12 xl:w-full xl:h-14 mt-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary-hover transition-colors flex items-center justify-center">
          <span className="hidden xl:inline">Post</span>
          <span className="xl:hidden">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path></svg>
          </span>
        </button>
      </div>

      {user && (
        <div className="relative mt-auto">
          <button 
            onClick={handleLogout}
            className="flex items-center justify-between w-full p-3 rounded-full hover:bg-surface transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                {user.userName?.charAt(0).toUpperCase()}
              </div>
              <div className="hidden xl:flex flex-col items-start leading-tight">
                <span className="font-bold text-sm">{user.userName}</span>
                <span className="text-text-muted text-sm">@{user.userName.toLowerCase()}</span>
              </div>
            </div>
            <LogOut className="hidden xl:block w-5 h-5 text-text-muted group-hover:text-red-500 transition-colors" />
          </button>
        </div>
      )}
    </div>
  );
}
