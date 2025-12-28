import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { Bot, MessageSquare, Instagram, Facebook, Zap } from 'lucide-react';

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.433 5.626 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.415-8.414" fill="currentColor" />
  </svg>
);

const OrbitingIcon = ({ children, delay = 0, radius = "45%", duration = 20, direction = "normal", className = "" }) => (
  <div
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    style={{
      width: "100%",
      height: "100%",
      animation: `orbit ${duration}s linear infinite ${direction}`,
      animationDelay: `${delay}s`
    }}
  >
    <div
      className={cn(
        "absolute w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer overflow-hidden bg-white",
        className
      )}
      style={{
        left: "50%",
        top: `calc(50% - ${radius})`,
        transform: "translate(-50%, -50%)",
        animation: `counter-orbit ${duration}s linear infinite ${direction === "normal" ? "reverse" : "normal"}`,
        animationDelay: `${delay}s`
      }}
    >
      {children}
    </div>
  </div>
);

export const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-surface-dark-alt flex flex-col lg:flex-row overflow-hidden font-sans">
      {/* Left Side: Form Area */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Navbar-like Header */}
        <div className="p-8 pb-0">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold transform group-hover:rotate-12 transition-transform">A</div>
            <span className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark tracking-tight">
              AstroEcom
            </span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-20">
          <div className="w-full max-w-md">
            <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h1 className="text-4xl font-extrabold text-text-primary-light dark:text-text-primary-dark tracking-tight leading-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-3 text-lg text-text-secondary-light dark:text-text-secondary-dark font-medium opacity-80">
                  {subtitle}
                </p>
              )}
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
              {children}
            </div>

            <p className="mt-12 text-small text-text-secondary-light dark:text-text-secondary-dark opacity-60">
              &copy; {new Date().getFullYear()} AstroEcom.ai. Secure customer messaging for Shopify.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Visual Brand Area (Desktop only or sophisticated header on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-[#0F172A] relative items-center justify-center overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -mr-96 -mt-96"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] -ml-40 -mb-40"></div>

        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <div className="relative z-10 w-full max-w-xl p-12 space-y-12">
          {/* Visual Orbit (Simplified for Auth) */}
          <div className="relative w-80 h-80 mx-auto mb-16">
            <div className="absolute inset-0 border border-white/5 rounded-full animate-pulse-slow"></div>
            <div className="absolute inset-4 border border-white/10 rounded-full"></div>
            <div className="absolute inset-8 border border-white/20 rounded-full"></div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center text-primary transform rotate-12">
                <Bot className="w-12 h-12" />
              </div>
            </div>

            <OrbitingIcon delay={0} radius="48%" duration={15} className="bg-whatsapp text-white"><WhatsAppIcon /></OrbitingIcon>
            <OrbitingIcon delay={-5} radius="48%" duration={15} className="bg-facebook text-white"><Facebook className="w-5 h-5" /></OrbitingIcon>
            <OrbitingIcon delay={-10} radius="48%" duration={15} className="bg-white"><GoogleIcon /></OrbitingIcon>
          </div>

          <div className="space-y-6 text-center">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              One platform. <span className="text-primary">Infinite</span> growth.
            </h2>
            <p className="text-lg text-blue-100/60 leading-relaxed">
              Connect your store in seconds and let our AI handle the rest. Used by 1,000+ top-tier brands globally.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FeatureSmall icon={Zap} title="Instant Setup" desc="Click and connect" />
            <FeatureSmall icon={Bot} title="AI Trained" desc="On your brand" />
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-primary rounded-full animate-bounce opacity-40"></div>
        <div className="absolute bottom-40 right-20 w-6 h-6 border-2 border-white/20 rounded-full animate-pulse opacity-20"></div>
      </div>

      {/* Mobile Visual Element (Sticky Header or decorative top) */}
      <div className="lg:hidden h-2 bg-gradient-to-r from-primary to-blue-400"></div>
    </div>
  );
};

const FeatureSmall = ({ icon: Icon, title, desc }) => (
  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-[24px] space-y-1">
    <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center mb-2">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <h4 className="text-sm font-bold text-white">{title}</h4>
    <p className="text-xs text-blue-100/40">{desc}</p>
  </div>
);

export default AuthLayout;
