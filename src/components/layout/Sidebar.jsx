import PropTypes from 'prop-types';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Inbox,
  MessageCircle,
  Link as LinkIcon,
  FileText,
  Zap,
  Cpu,
  Users,
  Meh,
  HelpCircle,
  Moon,
  Sun,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useTheme } from '../../theme/ThemeProvider';
import { logout, selectCurrentUser } from '../../features/user/userSlice';

const navItems = [
  { icon: Inbox, label: 'Inbox', path: '/dashboard/inbox' },
  { icon: MessageCircle, label: 'Comments Manager', path: '/dashboard/comments' },
  { icon: LinkIcon, label: 'Integrations', path: '/dashboard/integrations' },
  { icon: FileText, label: 'Reports', path: '/dashboard/reports' },
  { icon: Zap, label: 'AI Campaigns', path: '/dashboard/campaigns' },
  { icon: Cpu, label: 'AI Agent Testing', path: '/dashboard/ai-agent' },
  { icon: Users, label: 'Customers', path: '/dashboard/customers' },
  { icon: Meh, label: 'Sentiment Analysis', path: '/dashboard/sentiment' },
];

export const Sidebar = ({ isCollapsed, setIsCollapsed, className = '' }) => {
  const [showLogout, setShowLogout] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <aside
      className={cn(
        'group fixed left-4 top-20 bottom-4 z-50 transition-all duration-500 ease-in-out',
        'bg-[#0F172A] text-white rounded-[32px] flex flex-col',
        isCollapsed ? 'w-20' : 'w-72',
        className
      )}
    >
      {/* Top Section: Avatar & Collapse Toggle */}
      <div className={cn("p-5 flex items-center transition-all", isCollapsed ? "justify-center" : "justify-between")}>
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-white/10 overflow-hidden bg-primary/20 flex items-center justify-center shrink-0">
              {user?.avatar ? (
                <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white font-bold">{user?.name ? user.name[0] : 'U'}</span>
              )}
            </div>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white/60 hover:text-white"
        >
          {isCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 mt-4 space-y-1 overflow-y-auto no-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200',
                'group relative',
                isActive
                  ? 'bg-white/10 text-white shadow-xl'
                  : 'text-white/50 hover:bg-white/5 hover:text-white',
                isCollapsed ? 'justify-center px-2' : ''
              )
            }
          >
            <item.icon className={cn('w-6 h-6 shrink-0', isCollapsed ? '' : '')} />
            {!isCollapsed && (
              <span className="text-body-sm font-semibold whitespace-nowrap overflow-hidden">
                {item.label}
              </span>
            )}
            {isCollapsed && (
              <span className="absolute left-full ml-6 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-[60] shadow-2xl">
                {item.label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section: Theme, Support, Profile */}
      <div className="p-3 bg-white/5 mx-3 mb-3 rounded-[32px] space-y-1">
        {/* Support */}
        <button className={cn("flex items-center gap-4 w-full px-4 py-3 text-white/50 hover:text-white transition-colors rounded-2xl group relative shadow-inner", isCollapsed ? 'justify-center px-2' : '')}>
          <HelpCircle className="w-6 h-6 shrink-0" />
          {!isCollapsed && <span className="text-body-sm font-semibold">Support</span>}
          {isCollapsed && (
            <span className="absolute left-full ml-6 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-[60] shadow-2xl">
              Support
            </span>
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={cn("flex items-center gap-4 w-full px-4 py-3 text-white/50 hover:text-white transition-colors rounded-2xl group relative", isCollapsed ? 'justify-center px-2' : '')}
        >
          {theme === 'dark' ? (
            <Sun className="w-6 h-6 shrink-0" />
          ) : (
            <Moon className="w-6 h-6 shrink-0" />
          )}
          {!isCollapsed && <span className="text-body-sm font-semibold">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
          {isCollapsed && (
            <span className="absolute left-full ml-6 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-[60] shadow-2xl">
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
          )}
        </button>

        {/* User Profile - No Logout */}
        <div className="pt-2">
          <div
            className={cn(
              'flex items-center gap-3 w-full p-2 rounded-2xl',
              isCollapsed ? 'justify-center' : ''
            )}
          >
            <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0 border border-white/10">
              <span className="text-white font-bold">{user?.name ? user.name[0] : 'U'}</span>
            </div>
            {!isCollapsed && (
              <div className="flex-1 text-left min-w-0">
                <p className="text-body-sm font-bold text-white truncate">{user?.name || 'Nathan Scott'}</p>
                <p className="text-[10px] uppercase font-bold text-white/40">Pro Account</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  setIsCollapsed: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Sidebar;
