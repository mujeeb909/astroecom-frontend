import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

export const Card = ({
  children,
  className = '',
  header,
  footer,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-surface-light dark:bg-surface-dark',
        'border border-border-light dark:border-border-dark',
        'rounded-card shadow-card',
        'overflow-hidden',
        className
      )}
      {...props}
    >
      {header && (
        <div className="px-6 py-4 border-b border-border-light dark:border-border-dark">
          {header}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 border-t border-border-light dark:border-border-dark bg-surface-light-alt dark:bg-surface-dark-alt">
          {footer}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  header: PropTypes.node,
  footer: PropTypes.node,
};

export default Card;
