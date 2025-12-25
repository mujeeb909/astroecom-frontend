import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

const badgeVariants = {
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  error: 'bg-error/10 text-error border-error/20',
  primary: 'bg-primary/10 text-primary border-primary/20',
  neutral: 'bg-surface-light-alt dark:bg-surface-dark text-text-secondary-light dark:text-text-secondary-dark border-border-light dark:border-border-dark',
};

export const Badge = ({
  children,
  variant = 'neutral',
  className = '',
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-small font-medium border',
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'primary', 'neutral']),
  className: PropTypes.string,
};

export default Badge;
