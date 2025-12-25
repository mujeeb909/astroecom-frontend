import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  ShoppingBag,
  MessageSquare,
  Bot,
  Plug,
  BarChart3,
  HelpCircle,
  User,
  Moon,
  Sun
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useTheme } from '../../theme/ThemeProvider';

const navItems = [
  { icon: ShoppingBag, label: 'Orders', path: '/dashboard/orders' },
  { icon: MessageSquare, label: 'Inbox', path: '/dashboard/inbox' },
  { icon: Bot, label: 'AI Agent', path: '/dashboard/ai-agent' },
  { icon: Plug, label: 'Integrations', path: '/dashboard/integrations' },
  { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
];

export const Sidebar = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside
      className={cn(
        'w-20 h-screen bg-text-primary-light dark:bg-surface-dark-alt',
        'border-r border-border-light dark:border-border-dark',
        'flex flex-col items-center py-6',
        'fixed left-0 top-0',
        className
      )}
    >
      {/* Logo */}
      <div className="mb-8">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-white font-bold text-xl">A</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-4 w-full px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'w-full aspect-square rounded-lg flex items-center justify-center',
                'transition-colors duration-200',
                'group relative',
                isActive
                  ? 'bg-primary text-white'
                  : 'text-text-secondary-dark hover:bg-surface-dark hover:text-text-primary-dark'
              )
            }
          >
            <item.icon className="w-6 h-6" />
            <span className="absolute left-full ml-4 px-2 py-1 bg-surface-dark text-text-primary-dark text-small rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="flex flex-col gap-4 w-full px-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-full aspect-square rounded-lg flex items-center justify-center text-text-secondary-dark hover:bg-surface-dark hover:text-text-primary-dark transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>

        {/* Help */}
        <button className="w-full aspect-square rounded-lg flex items-center justify-center text-text-secondary-dark hover:bg-surface-dark hover:text-text-primary-dark transition-colors">
          <HelpCircle className="w-6 h-6" />
        </button>

        {/* User Profile */}
        <button className="w-full aspect-square rounded-lg flex items-center justify-center text-text-secondary-dark hover:bg-surface-dark hover:text-text-primary-dark transition-colors">
          <User className="w-6 h-6" />
        </button>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
};

export default Sidebar;
