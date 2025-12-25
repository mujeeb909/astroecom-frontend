import PropTypes from 'prop-types';
import Sidebar from './Sidebar';

export const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-20 bg-surface-light-alt dark:bg-surface-dark-alt">
        {children}
      </main>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
