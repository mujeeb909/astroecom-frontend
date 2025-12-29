import PropTypes from 'prop-types';
import { MessageSquare } from 'lucide-react';
import { Button } from '../ui/Button';

const platformData = [
  { name: 'WhatsApp', count: 2, color: 'text-green-500', icon: '💬' },
  { name: 'Instagram', count: 2, color: 'text-pink-500', icon: '📷' },
  { name: 'Instagram', count: 2, color: 'text-pink-500', icon: '📷' },
];

export const PlatformWidget = ({ contact }) => {
  return (
    <div className="w-80 bg-white dark:bg-surface-dark border-l border-gray-200 dark:border-white/10 p-4 space-y-4 overflow-y-auto">
      {/* Urgent Section */}
      <div className="bg-error/10 border border-error/20 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-error">Urgent</h3>
          <span className="bg-error text-white text-xs font-bold px-2 py-1 rounded-full">
            1
          </span>
        </div>
      </div>

      {/* Interaction Requested */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-blue-600 dark:text-blue-400">
            Interaction requested
          </h3>
          <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            0
          </span>
        </div>
      </div>

      {/* Platform Breakdown */}
      <div className="bg-gray-50 dark:bg-surface-dark-alt rounded-2xl p-4">
        <h3 className="font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
          Platform Breakdown
        </h3>

        <div className="space-y-3">
          {platformData.map((platform, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{platform.icon}</span>
                <span className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                  {platform.name}
                </span>
              </div>
              <span className="text-sm font-bold text-text-secondary-light dark:text-text-secondary-dark">
                ({platform.count})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      {contact && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
              <span className="text-green-600 dark:text-green-400 text-lg">💬</span>
            </div>
            <div>
              <h4 className="font-bold text-text-primary-light dark:text-text-primary-dark">
                Whatsapp
              </h4>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                {contact.name}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Button className="w-full bg-primary hover:bg-primary-600 text-white rounded-xl">
              Chat Now
            </Button>
            <Button variant="outline" className="w-full border-primary text-primary rounded-xl">
              More Info
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

PlatformWidget.propTypes = {
  contact: PropTypes.object,
};

export default PlatformWidget;
