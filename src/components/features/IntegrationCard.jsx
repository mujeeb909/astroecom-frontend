import PropTypes from 'prop-types';
import { Button } from '../ui/Button';

export const IntegrationCard = ({ name, description, icon: Icon, connected, onDisconnect, isLoading }) => {
  return (
    <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl border border-gray-100 dark:border-white/5 hover:shadow-xl transition-shadow duration-300 flex flex-col items-start h-full group">
      <div className="mb-4">
        <Icon />
      </div>

      <h3 className="text-body font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
        {name}
      </h3>

      <p className="text-small text-text-secondary-light dark:text-text-secondary-dark mb-6 flex-1">
        {description}
      </p>

      <div className="w-full space-y-3">
        {connected ? (
          <>
            <Button
              variant="outline"
              disabled
              className="w-full rounded-xl border-green-500 text-green-600 font-bold bg-green-50 opacity-100 cursor-default"
            >
              Connected
            </Button>
            <Button
              variant="danger"
              onClick={onDisconnect}
              loading={isLoading}
              className="w-full rounded-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity h-0 group-hover:h-auto overflow-hidden p-0 group-hover:p-3"
            >
              Disconnect
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            className="w-full rounded-xl border-primary text-primary font-semibold hover:bg-primary hover:text-white"
          >
            Connect
          </Button>
        )}
      </div>
    </div>
  );
};

IntegrationCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  connected: PropTypes.bool,
  onDisconnect: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default IntegrationCard;
