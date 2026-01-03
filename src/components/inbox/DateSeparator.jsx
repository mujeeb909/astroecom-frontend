import PropTypes from 'prop-types';

/**
 * DateSeparator Component - WhatsApp-style date divider
 * Shows "Today", "Yesterday", or formatted date in the middle of chat
 */
export const DateSeparator = ({ label }) => {
  return (
    <div className="flex items-center justify-center my-4">
      <div className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg">
        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
          {label}
        </span>
      </div>
    </div>
  );
};

DateSeparator.propTypes = {
  label: PropTypes.string.isRequired,
};

export default DateSeparator;
