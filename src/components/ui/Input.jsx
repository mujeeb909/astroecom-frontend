import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

export const Input = ({
  label,
  error,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  containerClassName = '',
  ...props
}) => {
  return (
    <div className={cn('flex flex-col gap-1.5', containerClassName)}>
      {label && (
        <label className="text-body-sm font-medium text-text-primary-light dark:text-text-primary-dark">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          className={cn(
            'w-full px-3 py-2 rounded-button',
            'bg-surface-light dark:bg-surface-dark',
            'border border-border-light dark:border-border-dark',
            'text-text-primary-light dark:text-text-primary-dark',
            'placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            'transition-colors duration-200',
            Icon && iconPosition === 'left' && 'pl-10',
            Icon && iconPosition === 'right' && 'pr-10',
            error && 'border-error focus:ring-error',
            className
          )}
          {...props}
        />
        {Icon && iconPosition === 'right' && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      {error && (
        <span className="text-small text-error">{error}</span>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  icon: PropTypes.elementType,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
  containerClassName: PropTypes.string,
};

export default Input;
