import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import AuthLayout from '../components/layout/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useLoginMutation } from '../services/userApi';
import { setCredentials } from '../features/user/userSlice';

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const result = await login({ email, password }).unwrap();
      dispatch(setCredentials(result));
      navigate('/dashboard/overview');
    } catch (err) {
      setErrorMsg(err.data?.message || 'Failed to sign in. Please check your credentials.');
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to manage your store messages"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {errorMsg && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-xl text-error text-body-sm font-medium animate-in fade-in zoom-in duration-300">
            {errorMsg}
          </div>
        )}
        <div className="space-y-4">
          <Input
            label="Email Address"
            placeholder="name@company.com"
            icon={Mail}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 bg-gray-50/50 dark:bg-white/5 border-transparent focus:border-primary/20 transition-all rounded-xl"
          />
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <label className="text-body-sm font-semibold text-text-primary-light dark:text-text-primary-dark">
                Password
              </label>
              <Link to="/forgot-password" size="sm" className="text-small font-bold text-primary hover:text-primary-600 transition-colors">
                Forgot password?
              </Link>
            </div>
            <Input
              placeholder="••••••••"
              icon={Lock}
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 bg-gray-50/50 dark:bg-white/5 border-transparent focus:border-primary/20 transition-all rounded-xl"
            />
          </div>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full h-14 text-lg font-bold rounded-2xl shadow-xl shadow-primary/30 hover:shadow-primary/40 active:scale-[0.98] transition-all transform"
            loading={isLoading}
            icon={!isLoading ? ArrowRight : undefined}
            iconPosition="right"
          >
            {isLoading ? 'Signing in...' : 'Sign In to Dashboard'}
          </Button>
        </div>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100 dark:border-white/5"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
            <span className="bg-white dark:bg-surface-dark-alt px-4 text-text-secondary-light dark:text-text-secondary-dark opacity-50">
              Instant Access
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="secondary"
          className="w-full h-14 font-bold rounded-2xl border-gray-100 dark:border-white/5 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition-all"
        >
          <div className="flex items-center justify-center gap-3">
            <GoogleIcon />
            <span>Continue with Google</span>
          </div>
        </Button>

        <p className="text-center text-body-sm text-text-secondary-light dark:text-text-secondary-dark font-medium pt-4">
          New to AstoEcom?{' '}
          <Link to="/signup" className="text-primary hover:text-primary-600 transition-colors font-extrabold underline-offset-4 hover:underline">
            Create an account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
