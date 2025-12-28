import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';

export const DashboardLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-surface-light-alt dark:bg-surface-dark-alt relative">
      {/* Mobile Backdrop */}
      {isMobile && !isCollapsed && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity animate-in fade-in"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} className="z-50 shadow-2xl" />
      <main
        className={`flex-1 p-4 lg:p-8 transition-all duration-500 ease-in-out ${isCollapsed ? 'pl-28' : 'pl-28 lg:pl-80'
          }`}
      >
        <div className="max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
