import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import Header from './Header';

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
    <div className="flex flex-col h-screen bg-surface-light-alt dark:bg-surface-dark-alt overflow-hidden">
      {/* Dashboard Header - FIXED */}
      <div className="flex-shrink-0 z-40">
        <Header />
      </div>

      <div className="flex flex-1 relative overflow-hidden">
        {/* Mobile Backdrop */}
        {isMobile && !isCollapsed && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity animate-in fade-in"
            onClick={() => setIsCollapsed(true)}
          />
        )}

        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} className="z-50 shadow-2xl" />
        <main
          className={`flex-1 transition-all duration-500 ease-in-out overflow-hidden ${isCollapsed ? 'pl-28' : 'pl-28 lg:pl-80'}`}
        >
          <div className="h-full overflow-hidden">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
