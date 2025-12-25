import { useState, useEffect, useRef } from 'react';
import { Button } from '../components/ui/Button';
import {
  MessageSquare,
  Instagram,
  Facebook,
  Circle,
  Play,
  Bot,
  ChevronLeft,
  ChevronRight,
  Infinity,
  Zap,
  BarChart3,
  CheckCircle2,
  Clock,
  ArrowRight,
  Twitter,
  Linkedin
} from 'lucide-react';
import { cn } from '../utils/cn';
import whyBanner from '../assets/why-banner.jpg';

const Reveal = ({ children, threshold = 0.1, className = "", delay = "0ms" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={sectionRef}
      style={{ transitionDelay: delay }}
      className={cn(
        "transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20",
        className
      )}
    >
      {children}
    </div>
  );
};

// Custom SVG Icons to match the design style
const WhatsAppIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.433 5.626 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.415-8.414" fill="currentColor" />
  </svg>
);

const MetaIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.14 13.56c-.66 0-1.14-.38-1.3-.98-.16-.6-.02-1.2.38-1.6.4-.4 1.02-.54 1.62-.38.6.16.98.64.98 1.3 0 .88-.78 1.66-1.68 1.66zm-8.3 0c-.66 0-1.14-.38-1.3-.98-.16-.6-.02-1.2.38-1.6.4-.4 1.02-.54 1.62-.38.6.16.98.64.98 1.3 0 .88-.78 1.66-1.68 1.66zm14.16-1.56c0-4.42-3.58-8-8-8s-8 3.58-8 8c.02 1.12.3 2.2.82 3.14l-1.16 4.3 4.42-1.14c1.18.54 2.48.82 3.92.82 4.42 0 8-3.58 8-8.12zm-12 5c-1.1 0-2.18-.3-3.14-.88l-.22-.12-2.32.6.62-2.28-.14-.22c-.64-1-1-2.16-1-3.32 0-3.46 2.82-6.28 6.28-6.28s6.28 2.82 6.28 6.28-2.82 6.28-6.28 6.28h-.08z" fill="currentColor" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const OrbitVisual = () => {
  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center">
      {/* Background Rings */}
      <div className="absolute w-[100%] h-[100%] border border-primary/5 rounded-full animate-pulse-slow"></div>
      <div className="absolute w-[80%] h-[80%] border border-primary/10 rounded-full"></div>
      <div className="absolute w-[60%] h-[60%] border border-primary/20 rounded-full"></div>

      {/* Glowing Center */}
      <div className="absolute w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute w-[30%] h-[30%] bg-primary/20 rounded-full blur-2xl opacity-20"></div>

      {/* Center WhatsApp Icon */}
      <div className="relative z-10 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center text-whatsapp scale-110 hover:scale-125 transition-transform cursor-pointer">
        <WhatsAppIcon />
      </div>

      {/* Orbiting Icons */}
      <OrbitingIcon
        delay={0}
        radius="48%"
        duration={25}
        className="bg-facebook shadow-blue-200"
      >
        <Facebook className="text-white w-6 h-6" />
      </OrbitingIcon>

      <OrbitingIcon
        delay={-5}
        radius="48%"
        duration={25}
        className="bg-instagram shadow-pink-200"
      >
        <Instagram className="text-white w-6 h-6" />
      </OrbitingIcon>

      <OrbitingIcon
        delay={-12.5}
        radius="48%"
        duration={25}
        className="bg-messenger shadow-blue-100"
      >
        <MessageSquare className="text-white w-6 h-6" />
      </OrbitingIcon>

      <OrbitingIcon
        delay={-18}
        radius="48%"
        duration={25}
        className="bg-white shadow-md"
      >
        <GoogleIcon />
      </OrbitingIcon>

      <OrbitingIcon
        delay={-2}
        radius="35%"
        duration={20}
        direction="reverse"
        className="bg-meta shadow-blue-200"
      >
        <div className="text-white">
          <MetaIcon />
        </div>
      </OrbitingIcon>

      <OrbitingIcon
        delay={-10}
        radius="35%"
        duration={20}
        direction="reverse"
        className="bg-whatsapp shadow-primary/10"
      >
        <WhatsAppIcon />
      </OrbitingIcon>
    </div>
  );
};

const OrbitingIcon = ({ children, delay = 0, radius = "45%", duration = 20, direction = "normal", className = "" }) => {
  return (
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
          "absolute w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer overflow-hidden bg-white",
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
};

const FeatureTab = ({ label, active }) => (
  <button
    className={cn(
      "px-6 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap",
      active
        ? "bg-primary text-white shadow-lg shadow-primary/30"
        : "text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-50 dark:hover:bg-white/5"
    )}
  >
    {label}
  </button>
);

export const Landing = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-sans">
      {/* Concentric Circle Background Pattern */}
      <div className="absolute top-[-20%] right-[-10%] w-[1200px] h-[1200px] pointer-events-none opacity-[0.03] dark:opacity-[0.01]">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {[...Array(20)].map((_, i) => (
            <circle
              key={i}
              cx="50"
              cy="50"
              r={10 + i * 5}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.1"
            />
          ))}
        </svg>
      </div>

      {/* Floating Navbar */}
      <nav
        className={cn(
          "fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[95%] max-w-7xl",
          scrolled ? "top-4" : "top-6"
        )}
      >
        <div className="bg-white rounded-full shadow-xl shadow-gray-100/50 border border-gray-100 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">
              AstroEcom.ai
            </span>
          </div>

          <div className="hidden md:flex items-center gap-12 font-medium">
            <a href="#tour" className="text-gray-600 hover:text-primary transition-colors">Product tour</a>
            <div className="flex items-center gap-8">
              <a href="#free" className="text-primary hover:text-primary-700 transition-colors">Try for free</a>
              <Button size="md" className="bg-primary hover:bg-primary-600 rounded-full px-8 py-2 font-semibold text-white">
                Book a demo
              </Button>
            </div>
          </div>

          {/* Mobile Menu Toggle (simplified) */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <span className="sr-only">Menu</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column Content */}
          <Reveal className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
            <h1 className="text-5xl md:text-6xl font-extrabold text-text-primary-light dark:text-text-primary-dark leading-[1.1]">
              Unlock <span className="text-primary">unlimited</span> opportunities for your ecommerce store with AstroEcom.ai
            </h1>

            <p className="text-lg md:text-xl text-gray-500 max-w-lg leading-relaxed">
              Turn messages into revenue! All your conversations in one place, AI trained specifically on your brand, campaigns, cart recovery, shipping status update, Shopify sync. and much more!
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary-600 rounded-xl px-12 py-4 text-lg font-bold w-full sm:w-auto text-white">
                Try Free
              </Button>
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5 rounded-xl px-12 py-4 text-lg font-bold w-full sm:w-auto group">
                Book a demo
              </Button>
            </div>
          </Reveal>

          {/* Right Column Visual */}
          <Reveal delay="200ms" className="relative order-first lg:order-last">
            <OrbitVisual />
          </Reveal>
        </div>
      </main>

      {/* Why Choose AstroEcom Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-16 gap-8">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary-light dark:text-text-primary-dark max-w-md leading-tight">
            Why Choose <br />
            <span className="text-primary italic">AstoEcom</span>?
          </h2>

          {/* Feature Tabs Swiper Layout */}
          <div className="bg-white dark:bg-surface-dark p-2 rounded-2xl shadow-xl shadow-gray-100/50 border border-gray-100 dark:border-border-dark flex flex-wrap gap-2">
            <FeatureTab label="Unified Inbox" />
            <FeatureTab label="Personalized AI agent" active />
            <FeatureTab label="AI-powered campaigns" />
          </div>
        </div>

        {/* Feature Showcase Card */}
        <Reveal>
          <div className="relative group">
            {/* Decorative Orbs */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors duration-500"></div>
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-100 dark:bg-primary/10 rounded-full blur-3xl group-hover:bg-blue-200 dark:group-hover:bg-primary/20 transition-colors duration-500"></div>

            <div className="relative z-10 bg-primary/5 dark:bg-white/[0.02] rounded-[40px] border border-primary/10 dark:border-white/10 overflow-hidden min-h-[600px] flex flex-col lg:flex-row items-center p-8 lg:p-16 gap-16">
              {/* Subtle Grid Pattern Overlay */}
              <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

              {/* Feature Description (Left) */}
              <div className="relative z-20 w-full lg:w-1/3 space-y-8 text-center lg:text-left">
                <div className="w-16 h-16 bg-white dark:bg-surface-dark rounded-2xl shadow-lg flex items-center justify-center mx-auto lg:mx-0">
                  <Bot className="w-8 h-8 text-text-primary-light dark:text-text-primary-dark" />
                </div>
                <p className="text-2xl md:text-3xl font-medium text-text-primary-light dark:text-text-primary-dark leading-snug max-w-sm mx-auto lg:mx-0">
                  24/7 AI Agent customizable according to your needs
                </p>
              </div>

              {/* Image Placeholder Container (Right) */}
              <div className="relative z-20 w-full lg:w-2/3 aspect-[4/3] bg-white dark:bg-surface-dark rounded-3xl shadow-2xl border border-gray-100 dark:border-white/5 overflow-hidden group-hover:scale-[1.02] transition-transform duration-700">
                {/* User will add image here manually */}
                <img src={whyBanner} alt="AstoEcom Dashboard" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Product Video Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal>
          <div className="relative group cursor-pointer overflow-hidden rounded-[40px] border border-primary/10 shadow-2xl">
            {/* Video Placeholder/Thumbnail */}
            <div className="relative aspect-video bg-gray-900 overflow-hidden">
              <img
                src={whyBanner}
                alt="Video Preview"
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-pulse"></div>
                  <button className="relative z-10 w-24 h-24 bg-white rounded-full shadow-2xl flex items-center justify-center text-primary hover:scale-110 transition-transform duration-300">
                    <Play className="w-10 h-10 fill-current ml-1" />
                  </button>
                </div>
              </div>

              {/* Bottom Info Bar (Glassmorphic) */}
              <div className="absolute bottom-0 inset-x-0 p-8 bg-black/20 backdrop-blur-md border-t border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold text-lg">Product Tour</h3>
                  <p className="text-white/60 text-sm">See AstoEcom in action • 2:45 min</p>
                </div>
                <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
                  Full Screen
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Trusted By Section */}
      <section className="py-24 border-y border-gray-100 dark:border-white/5 bg-gray-50/30 dark:bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-16">
              Loved and <span className="text-primary">trusted</span> by
            </h2>
          </Reveal>

          <Reveal delay="100ms">
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 dark:opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="text-3xl font-bold flex items-center gap-1 text-[#58cc02] cursor-default">
                <span className="w-8 h-8 rounded-full bg-current"></span> duolingo
              </div>
              <div className="text-3xl font-bold text-black dark:text-white cursor-default">amazon</div>
              <div className="text-2xl font-black uppercase tracking-tight text-black dark:text-white cursor-default">Princess Polly</div>
              <div className="text-2xl font-serif font-bold text-gray-800 dark:text-gray-200 cursor-default">J.P.Morgan</div>
              <div className="text-2xl font-bold flex flex-col items-center cursor-default">
                <span className="text-pink-500">printcious</span>
                <span className="text-[10px] uppercase tracking-widest text-gray-400">Your Merchandise Partner</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <Reveal className="w-full lg:w-1/3 space-y-8 flex-shrink-0">
              <h2 className="text-4xl md:text-5xl font-bold text-text-primary-light dark:text-text-primary-dark leading-tight">
                Hear from our <br />
                <span className="text-primary">customers</span>
              </h2>

              <div className="flex gap-4">
                <button
                  onClick={() => document.getElementById('testimonial-scroll').scrollBy({ left: -400, behavior: 'smooth' })}
                  className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => document.getElementById('testimonial-scroll').scrollBy({ left: 400, behavior: 'smooth' })}
                  className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </Reveal>

            <Reveal delay="100ms" className="w-full lg:w-2/3 flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <TestimonialCard
                quote="AstoEcom has transformed how we handle customer conversations. The AI agent is incredibly smart and saves us hours every day."
                author="Sarah Johnson"
                role="CEO and Founder, Aurelian Group"
              />
              <TestimonialCard
                quote="Our cart recovery campaigns saw a 35% boost within the first month. The automation is seamless and feels very professional."
                author="Michael Chen"
                role="Marketing Director, Bloom Co"
              />
              <TestimonialCard
                quote="The unified inbox is a game changer. We no longer miss DMs from Instagram or WhatsApp. Highly recommend for any Shopify store."
                author="Emma Williams"
                role="Owner, Serene Decor"
              />
              <TestimonialCard
                quote="Scaleable AI that actually sounds human. It handles 80% of our support tickets now, allowing us to focus on growth."
                author="James Roberts"
                role="Operations Head, TechVault"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Integration Hub Section */}
      <section className="py-32 px-6 relative overflow-hidden bg-white dark:bg-surface-dark-alt">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <Reveal>
            <div className="text-center mb-24 space-y-4">
              <h2 className="text-4xl md:text-6xl font-extrabold text-text-primary-light dark:text-text-primary-dark">
                <span className="text-primary italic">Connect</span> all your business <br />
                platforms in one place
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto text-xl leading-relaxed opacity-80">
                Add AstroEcom to the tools you already use. Sync conversations, orders, customers, and shipping - zero tab-hopping, everything in one place.
              </p>
            </div>
          </Reveal>

          {/* Integration Visual */}
          <Reveal delay="100ms">
            <div className="relative min-h-[700px] flex items-center justify-center">
              {/* SVG Connectors Container */}
              <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
                <svg width="100%" height="100%" viewBox="0 0 1000 600" fill="none" preserveAspectRatio="xMidYMid meet" className="mx-auto max-w-5xl">
                  <defs>
                    <linearGradient id="left-gradient" x1="100%" y1="0%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#4DD0E1" />
                      <stop offset="100%" stopColor="#4142FE" />
                    </linearGradient>
                    <linearGradient id="right-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4DD0E1" />
                      <stop offset="100%" stopColor="#4142FE" />
                    </linearGradient>
                  </defs>

                  {/* Left Side Connectors */}
                  <path d="M500 300 C400 300, 350 50, 270 50" stroke="url(#left-gradient)" strokeWidth="2" strokeOpacity="0.4" fill="none" />
                  <path d="M500 300 C400 300, 350 110, 220 110" stroke="url(#left-gradient)" strokeWidth="2" strokeOpacity="0.4" fill="none" />
                  <path d="M500 300 C420 300, 380 170, 280 170" stroke="url(#left-gradient)" strokeWidth="2" strokeOpacity="0.4" fill="none" />
                  <path d="M500 300 C450 300, 420 230, 220 230" stroke="url(#left-gradient)" strokeWidth="2" strokeOpacity="0.4" fill="none" />
                  <path d="M500 300 C420 300, 380 370, 220 370" stroke="url(#left-gradient)" strokeWidth="2" strokeOpacity="0.4" fill="none" />
                  <path d="M500 300 C400 300, 350 430, 250 430" stroke="url(#left-gradient)" strokeWidth="2" strokeOpacity="0.4" fill="none" />
                  <path d="M500 300 C400 300, 350 490, 220 490" stroke="url(#left-gradient)" strokeWidth="2" strokeOpacity="0.4" fill="none" />
                  <path d="M500 300 C400 300, 350 550, 270 550" stroke="url(#left-gradient)" strokeWidth="2" strokeOpacity="0.4" fill="none" />

                  {/* Right Side Connectors */}
                  <path d="M500 300 C600 300, 650 50, 730 50" stroke="url(#right-gradient)" strokeWidth="2" strokeOpacity="0.4" fill="none" />
                  <path d="M500 300 C600 300, 650 110, 770 110" stroke="url(#right-gradient)" strokeWidth="2" strokeOpacity="0.4" fill="none" />
                  <path d="M500 300 C580 300, 620 170, 740 170" stroke="url(#right-gradient)" strokeWidth="2" strokeOpacity="0.4" fill="none" />
                  <path d="M500 300 C550 300, 580 230, 780 230" stroke="url(#right-gradient)" strokeWidth="2" strokeOpacity="0.4" fill="none" />
                  <path d="M500 300 C580 300, 620 370, 770 370" stroke="url(#right-gradient)" strokeWidth="2" strokeOpacity="0.4" fill="none" />
                  <path d="M500 300 C600 300, 650 430, 750 430" stroke="url(#right-gradient)" strokeWidth="2" strokeOpacity="0.4" fill="none" />
                  <path d="M500 300 C600 300, 650 490, 780 490" stroke="url(#right-gradient)" strokeWidth="2" strokeOpacity="0.4" fill="none" />
                  <path d="M500 300 C600 300, 650 550, 730 550" stroke="url(#right-gradient)" strokeWidth="2" strokeOpacity="0.4" fill="none" />
                </svg>
              </div>

              {/* Nodes Layout Container */}
              <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 relative">
                {/* Left Side Logos */}
                <div className="flex flex-col gap-6 items-center lg:items-end w-full lg:w-1/4 order-2 lg:order-1">
                  <IntegrationLogo name="PayTabs" color="#00adef" />
                  <IntegrationLogo name="salesforce" color="#00a1e0" />
                  <IntegrationLogo name="Ai Trillion" color="#1c1c1c" />
                  <IntegrationLogo name="Zoho" color="#f15b22" />
                  <IntegrationLogo name="Leadsquared" color="#0057b8" />
                  <IntegrationLogo name="WooCommerce" color="#96588a" />
                  <IntegrationLogo name="Pabbly" color="#6f42c1" />
                  <IntegrationLogo name="KPay" color="#000" />
                </div>

                {/* Central AstroEcom Node */}
                <div className="relative z-10 w-56 h-36 bg-primary rounded-[40px] shadow-[0_20px_50px_rgba(65,66,254,0.3)] flex items-center justify-center text-white scale-110 border-[6px] border-white dark:border-surface-dark order-1 lg:order-2">
                  <span className="text-3xl font-bold tracking-tight">AstoEcom</span>
                  <div className="absolute inset-0 bg-primary/20 rounded-[40px] blur-3xl animate-pulse -z-10"></div>
                </div>

                {/* Right Side Logos */}
                <div className="flex flex-col gap-6 items-center lg:items-start w-full lg:w-1/4 order-3">
                  <IntegrationLogo name="Yotpo." color="#000" />
                  <IntegrationLogo name="HubSpot" color="#ff7a59" />
                  <IntegrationLogo name="Make" color="#9e1f63" />
                  <IntegrationLogo name="Zapier" color="#ff4f00" />
                  <IntegrationLogo name="Klaviyo" color="#000" />
                  <IntegrationLogo name="Shopify" color="#95bf47" />
                  <IntegrationLogo name="Twilio" color="#f22f46" />
                  <IntegrationLogo name="Google Ads" color="#4285f4" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* AI Performance Section */}
      <section className="py-32 px-6 relative bg-gray-50/50 dark:bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <Reveal>
            <div className="text-center mb-32 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-text-primary-light dark:text-text-primary-dark">
                Enhance your performance <br />
                with <span className="text-primary italic">AstroEcom's AI</span>
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto text-lg leading-relaxed opacity-80">
                Let us close all the order for you so you can focus on meaningful conversations to grow your brand.
              </p>
            </div>
          </Reveal>

          {/* Cards Grid */}
          <Reveal delay="100ms">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-stretch pt-20">
              {/* Card 1: Inbound Intelligence Agent */}
              <div className="relative group">
                {/* Overlapping Header Pill */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 bg-white dark:bg-surface-dark px-8 py-5 rounded-[40px] shadow-2xl border-2 border-[#10B981]/20 flex items-center gap-6 min-w-[280px] rotate-[2deg]">
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Convert orders</span>
                  </div>
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-4xl font-black text-[#10B981] italic">24/7</span>
                  </div>
                </div>

                {/* Main Card Body */}
                <div className="bg-[#ECFDF5] dark:bg-emerald-900/10 rounded-[48px] border border-[#10B981]/20 p-10 h-full flex flex-col pt-20">
                  <div className="flex-grow space-y-6">
                    {/* Chat Bubbles */}
                    <div className="rotate-[-2deg] bg-white dark:bg-surface-dark p-4 rounded-2xl rounded-tl-none shadow-lg border border-emerald-100 max-w-[85%] transition-transform hover:scale-105 duration-300">
                      <p className="text-[#065F46] font-medium leading-tight tracking-tight family-casual">Hello! How can I assist you today?</p>
                    </div>
                    <div className="rotate-[1deg] bg-[#10B981] p-4 rounded-2xl rounded-tr-none shadow-lg ml-auto max-w-[85%] transition-transform hover:scale-105 duration-300">
                      <p className="text-white font-medium leading-tight family-casual">Hi, I'm having trouble with my order. It seems to be delayed.</p>
                    </div>

                    {/* Lead Info Card */}
                    <div className="bg-white/90 dark:bg-surface-dark/90 backdrop-blur rounded-3xl p-6 shadow-xl border border-emerald-100 space-y-4 translate-y-2">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                          <Zap className="w-6 h-6 text-red-500 fill-current" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-bold text-text-primary-light">Alex Johnson</h4>
                          <p className="text-xs text-gray-400">NovaTech Inc.</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-bold text-gray-400">Score</span>
                          <p className="font-black text-lg">92</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-[10px] font-bold">Intent: Purchase</span>
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-bold">Hot Lead</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 text-center space-y-6">
                    <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">Inbound Intelligence Agent</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Build agents that qualify leads, uncover intent, and close sales on chat - all in no time.</p>
                    <Button className="w-fit mx-auto px-12 h-14 rounded-2xl border-2 border-black bg-white dark:bg-surface-dark hover:bg-black hover:text-white text-black font-bold transition-all duration-300">
                      Build Agent
                    </Button>
                  </div>
                </div>
              </div>

              {/* Card 2: AI Support Agent (Sky) */}
              <div className="relative group">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 bg-white dark:bg-surface-dark px-8 py-5 rounded-[40px] shadow-2xl border-2 border-[#0EA5E9]/20 flex items-center gap-6 min-w-[280px] rotate-[2deg]">
                  <div className="w-12 h-12 rounded-full bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center">
                    <Infinity className="w-8 h-8 text-[#0EA5E9]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-widest text-gray-400 font-bold leading-tight">Customer care agent available around the clock</span>
                  </div>
                </div>

                <div className="bg-[#F0F9FF] dark:bg-sky-900/10 rounded-[48px] border border-[#0EA5E9]/20 p-10 h-full flex flex-col pt-20">
                  <div className="flex-grow space-y-6">
                    <div className="rotate-[-1deg] bg-white dark:bg-surface-dark p-4 rounded-2xl rounded-tl-none shadow-lg border border-sky-100 max-w-[85%] transition-transform hover:scale-105 duration-300">
                      <p className="text-[#0369A1] font-medium leading-tight family-casual">what help you need</p>
                    </div>
                    <div className="rotate-[2deg] bg-[#0EA5E9] p-4 rounded-2xl rounded-tr-none shadow-lg ml-auto max-w-[85%] transition-transform hover:scale-105 duration-300">
                      <p className="text-white font-medium leading-tight family-casual">Hi, I'm having trouble Resetting my password</p>
                    </div>
                    <div className="rotate-[-1deg] bg-white dark:bg-surface-dark p-4 rounded-2xl rounded-tl-none shadow-lg border border-sky-100 max-w-[85%] transition-transform hover:scale-105 duration-300">
                      <p className="text-[#0369A1] font-medium leading-tight family-casual">Thanks whats your return policy</p>
                    </div>
                    <div className="rotate-[1deg] bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-lg border border-sky-100 max-w-[85%] transition-transform hover:scale-105 duration-300">
                      <p className="text-[#0369A1] font-medium leading-tight family-casual">you can make a return within 7 days of purchasing products</p>
                    </div>
                  </div>

                  <div className="mt-12 text-center space-y-6">
                    <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">AI Support Agent</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Train your AI support agent in minutes, and let it deflect up to 60% of customer queries.</p>
                    <Button className="w-fit mx-auto px-12 h-14 rounded-2xl border-2 border-black bg-white dark:bg-surface-dark hover:bg-black hover:text-white text-black font-bold transition-all duration-300">
                      Build Agent
                    </Button>
                  </div>
                </div>
              </div>

              {/* Card 3: AI Support Agent (Deep Blue) */}
              <div className="relative group">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 bg-white dark:bg-surface-dark px-8 py-5 rounded-[40px] shadow-2xl border-2 border-primary/20 flex items-center gap-6 min-w-[280px] rotate-[2deg]">
                  <div className="flex items-center gap-1">
                    <span className="text-4xl font-black text-primary italic">90%</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-widest text-gray-400 font-bold leading-tight">Queries answered instantly</span>
                  </div>
                </div>

                <div className="bg-[#EBEBFF] dark:bg-blue-900/10 rounded-[48px] border border-primary/20 p-10 h-full flex flex-col pt-20 bg-gradient-to-b from-[#EBEBFF] to-white/0 dark:from-[#1E1E2E] dark:to-transparent">
                  <div className="flex-grow space-y-6">
                    <div className="rotate-[-1deg] bg-white dark:bg-surface-dark p-4 rounded-2xl rounded-tl-none shadow-lg border border-blue-100 max-w-[85%] transition-transform hover:scale-105 duration-300">
                      <p className="text-primary font-medium leading-tight family-casual">what help you need</p>
                    </div>
                    <div className="rotate-[2deg] bg-primary p-4 rounded-2xl rounded-tr-none shadow-lg ml-auto max-w-[85%] transition-transform hover:scale-105 duration-300">
                      <p className="text-white font-medium leading-tight family-casual">Hi, I'm having trouble Resetting my password</p>
                    </div>
                    <div className="rotate-[-1deg] bg-[#0091FF] p-4 rounded-2xl rounded-tl-none shadow-lg ml-auto max-w-[85%] transition-transform hover:scale-105 duration-300">
                      <p className="text-white font-medium leading-tight family-casual">Thanks whats your return policy</p>
                    </div>
                    <div className="rotate-[1deg] bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-lg border border-blue-100 max-w-[85%] transition-transform hover:scale-105 duration-300">
                      <p className="text-primary font-medium leading-tight family-casual">you can make a return within 7 days of purchasing products</p>
                    </div>
                  </div>

                  <div className="mt-12 text-center space-y-6">
                    <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">AI Support Agent</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Train your AI support agent in minutes, and let it deflect up to 60% of customer queries.</p>
                    <Button className="w-fit mx-auto px-12 h-14 rounded-2xl border-2 border-black bg-white dark:bg-surface-dark hover:bg-black hover:text-white text-black font-bold transition-all duration-300">
                      Build Agent
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Unibox Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-bold text-center text-text-primary-light dark:text-text-primary-dark mb-24">
              What you can unlock with <span className="text-primary">Astroecom.ai</span>
            </h2>
          </Reveal>

          {/* Feature Spotlight Card */}
          <Reveal delay="100ms">
            <div className="bg-gradient-to-b from-[#A1D8F5] to-[#FFFFFF1A] dark:from-sky-900/40 dark:to-transparent rounded-[48px] p-8 md:p-16 lg:p-24 relative overflow-hidden">
              {/* Background Decorative Rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-sky-400/20 rounded-full -z-0"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-sky-400/30 rounded-full -z-0"></div>

              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                {/* Left Column: Content */}
                <div className="w-full lg:w-1/2 space-y-10">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-sky-800 dark:text-sky-400/80">ASTROECOM.AI FOR ALL CONVERSATIONS</h4>
                    <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.1]">
                      Unibox: All Conversations, One Screen!
                    </h3>
                  </div>

                  <ul className="space-y-6">
                    <CheckItem text="WhatsApp, Instagram, Facebook, web chat, merged into one customer thread." />
                    <CheckItem text="Auto-assign status to conversations in by skills/priority with alerts to hit response targets." />
                    <CheckItem text="Add internal notes, tags, attach files, collab without leaving the thread" />
                    <CheckItem text="Comment inbox: Pull IG/TikTok/FB comments; hide, reply, or convert to DM from the same view." />
                  </ul>

                  <Button className="h-16 px-12 rounded-2xl bg-[#00A1FF] hover:bg-[#0081d6] text-white text-xl font-bold shadow-lg shadow-sky-400/40 border-none transition-transform hover:scale-105">
                    Try Free
                  </Button>
                </div>

                {/* Right Column: Visuals */}
                <div className="w-full lg:w-1/2 space-y-12">
                  {/* Workflow Progress */}
                  <div className="flex items-center justify-between gap-2 max-w-lg mx-auto lg:mx-0">
                    <WorkflowPill label="INQUIRY" />
                    <ArrowRight className="w-4 h-4 text-sky-600/50" />
                    <WorkflowPill label="RESPOND" active />
                    <ArrowRight className="w-4 h-4 text-sky-600/50" />
                    <WorkflowPill label="ESCALATE" />
                    <ArrowRight className="w-4 h-4 text-sky-600/50" />
                    <WorkflowPill label="RESOLVE" />
                  </div>

                  {/* Dashboard Mockup */}
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-sky-400/20 blur-2xl rounded-[40px] group-hover:bg-sky-400/30 transition-colors"></div>
                    <div className="relative bg-[#1A1C1E] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                      <div className="bg-[#2D2F31] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                        </div>
                        <div className="mx-auto w-32 h-4 bg-white/5 rounded-full"></div>
                      </div>
                      <div className="p-1">
                        {/* Stylized UI Mockup Image Placeholder */}
                        <div className="aspect-[4/3] bg-gradient-to-br from-[#1E1E2E] to-[#12121A] rounded-2xl relative overflow-hidden">
                          <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
                          {/* Inner Mockup UI Elements */}
                          <div className="p-4 flex h-full">
                            <div className="w-12 border-r border-white/5 space-y-4">
                              <div className="w-6 h-6 rounded bg-primary/20"></div>
                              <div className="w-6 h-6 rounded bg-white/5"></div>
                              <div className="w-6 h-6 rounded bg-white/5"></div>
                            </div>
                            <div className="flex-grow p-4 space-y-4">
                              <div className="h-6 w-1/3 bg-white/10 rounded-full"></div>
                              <div className="space-y-2">
                                <div className="h-4 w-3/4 bg-white/5 rounded-full"></div>
                                <div className="h-4 w-1/2 bg-white/5 rounded-full"></div>
                              </div>
                              <div className="mt-8 flex gap-4">
                                <div className="w-32 h-48 bg-white/[0.02] rounded-2xl border border-white/5"></div>
                                <div className="flex-grow h-48 bg-white/[0.02] rounded-2xl border border-white/5"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating Characteristic Pills */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
                      <CharacteristicPill label="MULTILINGUAL" color="#0091FF" />
                      <CharacteristicPill label="CONTEXTUAL" color="#10B981" />
                      <CharacteristicPill label="EMPATHETIC" color="#4142FE" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* AI Agent Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Feature Spotlight Card */}
          <Reveal>
            <div className="bg-gradient-to-b from-[#60D5B8] to-[#FFFFFF1A] dark:from-emerald-900/40 dark:to-transparent rounded-[48px] p-8 md:p-16 lg:p-24 relative overflow-hidden">
              {/* Background Decorative Rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-emerald-400/20 rounded-full -z-0"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-emerald-400/30 rounded-full -z-0"></div>

              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                {/* Left Column: Visuals */}
                <div className="w-full lg:w-1/2 space-y-12 order-2 lg:order-1">
                  {/* Conversion Workflow */}
                  <div className="flex items-center justify-between gap-2 max-w-lg mx-auto lg:mx-0">
                    <WorkflowPill label="AD" color="#10B981" />
                    <ArrowRight className="w-4 h-4 text-emerald-600/50" />
                    <WorkflowPill label="CHAT" color="#10B981" />
                    <ArrowRight className="w-4 h-4 text-emerald-600/50" />
                    <WorkflowPill label="ENGAGE" color="#10B981" active />
                    <ArrowRight className="w-4 h-4 text-emerald-600/50" />
                    <WorkflowPill label="CONVERT" color="#10B981" />
                  </div>

                  {/* Chat Mockup */}
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-emerald-400/20 blur-2xl rounded-[40px] group-hover:bg-emerald-400/30 transition-colors"></div>
                    <div className="relative bg-white dark:bg-surface-dark rounded-[32px] overflow-hidden shadow-2xl border-4 border-white dark:border-white/5 p-6 md:p-10 space-y-6">
                      {/* Message 1 */}
                      <div className="bg-gray-100 dark:bg-white/5 rounded-2xl rounded-tl-none p-4 max-w-[80%] transition-transform hover:scale-105 duration-300">
                        <p className="text-slate-800 dark:text-slate-200 font-medium family-casual">Can you recommend a product?</p>
                      </div>

                      {/* Message 2 */}
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 max-w-[85%] transition-transform hover:scale-105 duration-300">
                        <p className="text-blue-800 dark:text-blue-200 font-medium family-casual">Absolutely! Based on your interest in eco-friendly items, I suggest our new "Aura" collection.</p>
                      </div>

                      {/* Product Card */}
                      <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/10 rounded-2xl p-4 shadow-md max-w-[85%] transition-transform hover:scale-105 duration-300">
                        <div className="aspect-video bg-gray-50 dark:bg-white/5 rounded-xl mb-3 overflow-hidden flex items-center justify-center">
                          <Bot className="w-10 h-10 text-emerald-400/50" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white">Aura Collection</h4>
                          <p className="text-emerald-500 font-black">$99.00</p>
                        </div>
                      </div>
                    </div>

                    {/* Central Floating Pill */}
                    <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 z-30 bg-[#60D5B8] px-10 py-5 rounded-[40px] shadow-2xl border-4 border-white dark:border-surface-dark flex items-center">
                      <span className="text-xl font-black text-white italic whitespace-nowrap">AI Agent: Your 24/7</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Content */}
                <div className="w-full lg:w-1/2 space-y-10 order-1 lg:order-2">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400/80">AI AGENT FOR HELP</h4>
                    <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.1]">
                      AI Agent: Your 24/7 Sales & Support Rep
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed opacity-80">
                      Trained on your brand, catalog, and policies. Handles conversations across every channel - fast, on-brand, and human-hand-off when needed
                    </p>
                  </div>

                  <ul className="space-y-6">
                    <CheckItem text="Always on: Instant replies across WhatsApp, IG, FB, and website chat" color="#10B981" />
                    <CheckItem text="Brand-true voice: Tone, policies, and FAQs baked in" color="#10B981" />
                    <CheckItem text="Channel-aware: Platform-specific responses for WhatsApp/IG/FB, etc." color="#10B981" />
                    <CheckItem text="Close the sale: Pricing, product info, discounts, and product links (with real photos/videos)" color="#10B981" />
                    <CheckItem text="Understands media: Reads images and voice notes from customers" color="#10B981" />
                  </ul>

                  <Button className="h-16 px-12 rounded-2xl bg-[#10B981] hover:bg-emerald-600 text-white text-xl font-bold shadow-lg shadow-emerald-400/40 border-none transition-transform hover:scale-105">
                    Use It
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* AI Commerce & Ops Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Feature Spotlight Card */}
          <Reveal>
            <div className="bg-gradient-to-b from-[#C0E1F1] to-[#FFFFFF1A] dark:from-sky-900/40 dark:to-transparent rounded-[48px] p-8 md:p-16 lg:p-24 relative overflow-hidden">
              {/* Background Decorative Rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-blue-400/20 rounded-full -z-0"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-blue-400/30 rounded-full -z-0"></div>

              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24 mb-20">
                  {/* Left Column: Content */}
                  <div className="w-full lg:w-3/5 space-y-10">
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-[#3B82F6] dark:text-blue-400/80">KEEP RECORD OF EVERYTHING</h4>
                      <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.1]">
                        AI Commerce & Ops: Orders, Payments, Shipping, Returns
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed opacity-80 max-w-xl">
                        Execute the work—not just the chat. Automate storefront actions and route complex issues to the right human in seconds
                      </p>
                    </div>

                    <ul className="space-y-6">
                      <CheckItem text="Shopify actions: Place, modify, or reorder directly from chat" color="#3B82F6" />
                      <CheckItem text="Payments: Share secure payment details; verify status (incl. screenshot checks)" color="#3B82F6" />
                      <CheckItem text="Shipping: Live tracking and delivery ETAs from your courier" color="#3B82F6" />
                      <CheckItem text="Cancellations/Returns/Damage: Collect photos/video, verify, and auto-escalate" color="#3B82F6" />
                      <CheckItem text="Smart routing & handoff: Send B2B/PR/wholesale to the right team; escalate with full context" color="#3B82F6" />
                    </ul>
                  </div>

                  {/* Right Column: Visuals */}
                  <div className="w-full lg:w-2/5 space-y-12">
                    {/* Workflow Progress */}
                    <div className="flex items-center justify-between gap-2 max-w-sm ml-auto">
                      <WorkflowPill label="AD" color="#3B82F6" />
                      <ArrowRight className="w-4 h-4 text-blue-600/50" />
                      <WorkflowPill label="CHAT" color="#3B82F6" />
                      <ArrowRight className="w-4 h-4 text-blue-600/50" />
                      <WorkflowPill label="ENGAGE" color="#3B82F6" active />
                      <ArrowRight className="w-4 h-4 text-blue-600/50" />
                      <WorkflowPill label="CONVERT" color="#3B82F6" />
                    </div>

                    {/* Order Card Mockup */}
                    <div className="relative group pt-10">
                      <div className="absolute -inset-4 bg-blue-400/20 blur-2xl rounded-[40px] group-hover:bg-blue-400/30 transition-colors"></div>
                      <div className="relative bg-white dark:bg-surface-dark rounded-[32px] overflow-hidden shadow-2xl border-4 border-white dark:border-white/5 p-6 md:p-10 space-y-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-slate-900 dark:text-white">Order #SHOPIFY-1234</h4>
                            <p className="text-xs text-emerald-500 font-bold">Payment Confirmed</p>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-black text-slate-900 dark:text-white">$104.00</span>
                          </div>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-white/5">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Aura Collection Tee</span>
                            <span className="font-bold text-slate-900 dark:text-white">$99.00</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Shipping</span>
                            <span className="font-bold text-slate-900 dark:text-white">$5.00</span>
                          </div>
                        </div>

                        {/* Operational Progress Bar */}
                        <div className="relative h-2 bg-gray-100 dark:bg-white/5 rounded-full mt-8 flex items-center">
                          <div className="absolute left-0 top-0 h-full w-[60%] bg-[#3B82F6] rounded-full"></div>
                          <div className="absolute left-0 w-4 h-4 rounded-full bg-[#3B82F6] border-2 border-white dark:border-surface-dark"></div>
                          <div className="absolute left-[60%] w-4 h-4 rounded-full bg-[#3B82F6] border-2 border-white dark:border-surface-dark"></div>
                          <div className="absolute right-0 w-4 h-4 rounded-full bg-gray-200 dark:bg-white/10 border-2 border-white dark:border-surface-dark"></div>
                        </div>
                      </div>

                      {/* Manage Easily Pill */}
                      <div className="absolute top-0 right-[-20px] z-30 bg-[#72C1E8] px-8 py-3 rounded-[30px] shadow-2xl border-4 border-white dark:border-surface-dark flex items-center">
                        <span className="text-lg font-black text-white italic whitespace-nowrap">Manage easily</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Stats & CTA */}
                <div className="space-y-16">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 border-t border-blue-400/20 pt-16">
                    <StatBox number="Up to 80%" label="less human workload" color="#3B82F6" />
                    <StatBox number="85%" label="AI-resolved queries" color="#3B82F6" className="md:border-x border-blue-400/20 px-4" />
                    <StatBox number="90%" label="faster resolution" color="#3B82F6" />
                  </div>

                  <Button className="h-16 px-16 rounded-2xl bg-[#3B82F6] hover:bg-blue-600 text-white text-xl font-bold shadow-lg shadow-blue-400/40 border-none transition-transform hover:scale-105">
                    Try now
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Real Time Reports Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Feature Spotlight Card */}
          <Reveal>
            <div className="bg-gradient-to-b from-[#AEAEFE] to-[#FFFFFF1A] dark:from-indigo-900/40 dark:to-transparent rounded-[48px] p-8 md:p-16 lg:p-24 relative overflow-hidden">
              {/* Background Decorative Rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-indigo-400/20 rounded-full -z-0"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-indigo-400/30 rounded-full -z-0"></div>

              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                {/* Left Column: Visuals */}
                <div className="w-full lg:w-1/2 space-y-12">
                  {/* Workflow Progress */}
                  <div className="flex items-center justify-between gap-2 max-w-lg mx-auto lg:mx-0">
                    <WorkflowPill label="AD" color="#4142FE" />
                    <ArrowRight className="w-4 h-4 text-indigo-600/50" />
                    <WorkflowPill label="CHAT" color="#4142FE" />
                    <ArrowRight className="w-4 h-4 text-indigo-600/50" />
                    <WorkflowPill label="ENGAGE" color="#4142FE" active />
                    <ArrowRight className="w-4 h-4 text-indigo-600/50" />
                    <WorkflowPill label="CONVERT" color="#4142FE" />
                  </div>

                  {/* Dashboard Visual Mockup */}
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-indigo-400/20 blur-2xl rounded-[40px] group-hover:bg-indigo-400/30 transition-colors"></div>
                    <div className="relative bg-white dark:bg-surface-dark rounded-[32px] overflow-hidden shadow-2xl border-4 border-white dark:border-white/5 p-8 space-y-8">
                      <div className="grid grid-cols-2 gap-6">
                        {/* Sentiment card */}
                        <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-4 space-y-4">
                          <h4 className="text-xs font-bold text-slate-500 uppercase">Sentiment Analysis</h4>
                          <div className="flex justify-center py-2">
                            <div className="relative w-24 h-24">
                              <svg className="w-full h-full" viewBox="0 0 100 100">
                                <circle className="text-gray-200 dark:text-white/5 stroke-current" strokeWidth="10" fill="transparent" r="40" cx="50" cy="50" />
                                <circle className="text-indigo-500 stroke-current" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="62.8" strokeLinecap="round" fill="transparent" r="40" cx="50" cy="50" style={{ transition: 'stroke-dashoffset 1s ease-in-out' }} />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center font-black text-xl text-slate-900 dark:text-white">75%</div>
                            </div>
                          </div>
                        </div>
                        {/* Revenue card */}
                        <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-4 space-y-2">
                          <h4 className="text-xs font-bold text-slate-500 uppercase">Revenue from Chat</h4>
                          <p className="text-3xl font-black text-slate-900 dark:text-white">$12,482</p>
                          <div className="h-2 w-full bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                            <div className="h-full w-2/3 bg-indigo-500 rounded-full"></div>
                          </div>
                        </div>
                      </div>

                      {/* Trending Topics */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-slate-500 uppercase">Trending Topics</h4>
                        <div className="flex flex-wrap gap-2">
                          <TopicPill label="Shipping Cost" />
                          <TopicPill label="Return Policy" />
                          <TopicPill label="#AuraTee" />
                        </div>
                      </div>
                    </div>

                    {/* Manage Easily Pill */}
                    <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 z-30 bg-[#4142FE] px-10 py-4 rounded-[40px] shadow-2xl border-4 border-white dark:border-surface-dark flex items-center">
                      <span className="text-xl font-black text-white italic whitespace-nowrap">Manage easily</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Content */}
                <div className="w-full lg:w-1/2 space-y-10">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-[#4142FE] dark:text-indigo-400/80">REAL TIME REPORTS</h4>
                    <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.1]">
                      Real time Reports, Insights and Sentiment Analysis.
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed opacity-80">
                      See conversations, orders, sentiment, and customer growth in one dashboard
                    </p>
                  </div>

                  <ul className="space-y-6">
                    <CheckItem text="Sentiment Analysis: See what customers are talking about across all platforms on your brand using AI" color="#4142FE" />
                    <CheckItem text="Revenue from chat: Orders closed, AOV uplift, recovered-cart revenue, channel attribution." color="#4142FE" />
                    <CheckItem text="Conversation funnel: Initiated, active, resolved—plus first-response and resolution times." color="#4142FE" />
                    <CheckItem text="Sentiment & topics: Automatic sentiment scores, top queries, trending issues, product mentions." color="#4142FE" />
                    <CheckItem text="Customer base: New vs returning, cohorts, LTV estimates, segment sizes." color="#4142FE" />
                    <CheckItem text="Channel breakdown: WhatsApp/IG/FB/email/web" color="#4142FE" />
                  </ul>

                  <Button className="h-16 px-12 rounded-2xl bg-[#4142FE] hover:bg-blue-700 text-white text-xl font-bold shadow-lg shadow-indigo-400/40 border-none transition-transform hover:scale-105">
                    And MUCH MORE!
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* AI Campaigns Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Feature Spotlight Card */}
          <Reveal>
            <div className="bg-gradient-to-b from-[#FFF8E3] to-[#FFFFFF1A] dark:from-amber-900/20 dark:to-transparent rounded-[48px] p-8 md:p-16 lg:p-24 relative overflow-hidden">
              {/* Background Decorative Rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-amber-400/20 rounded-full -z-0"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-amber-400/30 rounded-full -z-0"></div>

              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-20">
                  {/* Left Column: Content */}
                  <div className="w-full lg:w-3/5 space-y-10">
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400/80">KEEP RECORD OF EVERYTHING</h4>
                      <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.1]">
                        AI campaigns
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed opacity-80 max-w-xl">
                        AI Campaigns — Templates that convert. Whatsapp based custom campaigns made for you. Launch in minutes with prebuilt playbooks, or target any segment with your own data. Multi-channel, on brand, and measurable.
                      </p>
                    </div>

                    <ul className="space-y-6">
                      <CheckItem text="Abandoned Cart Recovery" color="#FBBF24" />
                      <CheckItem text="Product recommender" color="#FBBF24" />
                      <CheckItem text="Big-sale mode: 11.11, Blessed Friday, new drops and much more." color="#FBBF24" />
                      <CheckItem text="Custom campaign of your choice" color="#FBBF24" />
                      <CheckItem text="Real time tracking of campaigns such as open rate, response rate, and orders from campaigns." color="#FBBF24" />
                    </ul>
                  </div>

                  {/* Right Column: Visuals */}
                  <div className="w-full lg:w-2/5 space-y-12">
                    {/* Workflow Progress */}
                    <div className="flex items-center justify-between gap-2 max-w-sm ml-auto">
                      <WorkflowPill label="AD" color="#FBBF24" />
                      <ArrowRight className="w-4 h-4 text-amber-600/50" />
                      <WorkflowPill label="CHAT" color="#FBBF24" />
                      <ArrowRight className="w-4 h-4 text-amber-600/50" />
                      <WorkflowPill label="ENGAGE" color="#FBBF24" active />
                      <ArrowRight className="w-4 h-4 text-amber-600/50" />
                      <WorkflowPill label="CONVERT" color="#FBBF24" />
                    </div>

                    {/* Campaigns Dashboard Mockup */}
                    <div className="relative group pt-10">
                      <div className="absolute -inset-4 bg-amber-400/20 blur-2xl rounded-[40px] group-hover:bg-amber-400/30 transition-colors"></div>
                      <div className="relative bg-white dark:bg-surface-dark rounded-[32px] overflow-hidden shadow-2xl border-4 border-white dark:border-white/5 p-6 md:p-8 space-y-6">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-slate-900 dark:text-white">Campaigns</h4>
                          <button className="px-4 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg text-xs font-bold">Create New</button>
                        </div>

                        <div className="space-y-4">
                          {/* Campaign Item 1 */}
                          <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">Abandoned Cart</p>
                                <p className="text-[10px] text-slate-500">Avg. Recovery: 22%</p>
                              </div>
                            </div>
                            <div className="w-10 h-5 bg-amber-500 rounded-full relative">
                              <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                            </div>
                          </div>

                          {/* Campaign Item 2 */}
                          <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">Product Recommender</p>
                                <p className="text-[10px] text-slate-500">Active on 3 channels</p>
                              </div>
                            </div>
                            <div className="w-10 h-5 bg-amber-500 rounded-full relative">
                              <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Stats & CTA */}
                <div className="space-y-16">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 border-t border-amber-400/20 pt-16">
                    <StatBox number="30%" label="Increased Conversions" color="#FBBF24" />
                    <StatBox number="20%" label="Abandoned Cart Recovery" color="#FBBF24" className="md:border-x border-amber-400/20 px-4" />
                    <StatBox number="50%" label="Revenue Growth" color="#FBBF24" />
                  </div>

                  <Button className="h-16 px-16 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 text-xl font-bold shadow-lg shadow-amber-400/40 border-none transition-transform hover:scale-105">
                    Create Now
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-black text-center text-slate-900 dark:text-white mb-24">
              Case <span className="text-[#4142FE]">Studies</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {/* Case Study Card 1 */}
            <Reveal delay="100ms">
              <div className="bg-white dark:bg-surface-dark p-8 md:p-12 rounded-[40px] border-2 border-slate-100 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all hover:translate-y-[-4px]">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8 leading-tight">
                  Reduce Response Time from 3 Hours to 3 Seconds
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-12">
                  With Wati, we can reply to customers with pricing within 3 seconds instead of 3 hours. When customers survey multiple suppliers, whoever responds faster has the best chance to close deals. This automation has been game-changing for our business.
                </p>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-yellow-400/30 rounded-full blur-sm"></div>
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-yellow-400 bg-yellow-100 flex items-center justify-center">
                      <img src="https://ui-avatars.com/api/?name=Vincent+Tong&background=FFD700&color=fff&size=256" alt="Vincent Tong" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">Vincent Tong</h4>
                    <p className="text-slate-500 font-medium">Co-founder</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Case Study Card 2 */}
            <Reveal delay="200ms">
              <div className="bg-white dark:bg-surface-dark p-8 md:p-12 rounded-[40px] border-2 border-slate-100 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all hover:translate-y-[-4px]">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8 leading-tight">
                  Reduce Response Time by 97%
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-12">
                  Wati isn't a software that we use, but a business partner that helps supercharge our care team's productivity as they take care of each user's experience with us. As we scale, and go global, Wati would be instrumental in helping us drive that growth over the coming years and help us reach to millions of users over WhatsApp.
                </p>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-pink-400/30 rounded-full blur-sm"></div>
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-pink-400 bg-pink-100 flex items-center justify-center">
                      <img src="https://ui-avatars.com/api/?name=Abhineet+Kumar&background=FF69B4&color=fff&size=256" alt="Abhineet Kumar" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">Abhineet Kumar</h4>
                    <p className="text-slate-500 font-medium">Co-founder</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Book Demo Section */}
      <section className="py-32 px-6 bg-gray-50/50 dark:bg-transparent">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-black text-center text-slate-900 dark:text-white mb-16">
              <span className="text-[#4142FE]">Book</span> your demo
            </h2>
          </Reveal>

          <Reveal delay="100ms">
            <div className="bg-white dark:bg-surface-dark rounded-[40px] p-8 md:p-16 shadow-2xl border-2 border-slate-100 dark:border-white/5">
              <form className="space-y-10">
                <div className="grid grid-cols-1 gap-8">
                  {/* Name Field */}
                  <div className="space-y-3">
                    <label className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1">
                      Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full h-14 px-6 rounded-xl border-2 border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 focus:border-[#4142FE] focus:ring-4 focus:ring-[#4142FE]/10 transition-all outline-none text-slate-900 dark:text-white"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-3">
                    <label className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1">
                      Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full h-14 px-6 rounded-xl border-2 border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 focus:border-[#4142FE] focus:ring-4 focus:ring-[#4142FE]/10 transition-all outline-none text-slate-900 dark:text-white"
                    />
                  </div>

                  {/* Function Selection */}
                  <div className="space-y-6">
                    <label className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1">
                      Which team or function will primarily use AstroEcom? <span className="text-rose-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        'Marketing',
                        'Sales',
                        'Support',
                        'Admin / Founder / Business Owner',
                        'IT / Developer / Product Manager',
                        'HR',
                        'Others'
                      ].map((role) => (
                        <label key={role} className="flex items-center gap-4 cursor-pointer group">
                          <div className="relative flex items-center justify-center">
                            <input type="radio" name="role" className="peer sr-only" />
                            <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-white/20 peer-checked:border-[#4142FE] peer-checked:border-[6px] transition-all"></div>
                          </div>
                          <span className="text-slate-600 dark:text-slate-400 font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                            {role}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* WhatsApp Number */}
                  <div className="space-y-3">
                    <label className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1">
                      Your WhatsApp Number – we'll reach out to you here <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex gap-4">
                      <div className="w-32 h-14 px-4 rounded-xl border-2 border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 flex items-center justify-between text-slate-600 dark:text-slate-400 font-bold cursor-pointer">
                        Pakistan
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                      <div className="flex-grow h-14 px-6 rounded-xl border-2 border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 flex items-center gap-3">
                        <span className="text-slate-400 dark:text-white/20 font-bold">+92</span>
                        <input
                          type="tel"
                          className="bg-transparent outline-none w-full text-slate-900 dark:text-white font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Terms & Consent */}
                  <label className="flex items-start gap-4 cursor-pointer group pt-4">
                    <div className="relative mt-1">
                      <input type="checkbox" className="peer sr-only" />
                      <div className="w-5 h-5 rounded border-2 border-slate-300 dark:border-white/20 peer-checked:bg-[#4142FE] peer-checked:border-[#4142FE] transition-all flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      </div>
                    </div>
                    <span className="text-sm text-slate-500 leading-relaxed">
                      By signing up, you agree to the <a href="#" className="text-slate-900 dark:text-white font-bold underline decoration-[#4142FE]/30 hover:decoration-[#4142FE]">Terms & Conditions</a> and <a href="#" className="text-slate-900 dark:text-white font-bold underline decoration-[#4142FE]/30 hover:decoration-[#4142FE]">Privacy Policy</a>, and consent to receive marketing communications from AstroEcom. *
                    </span>
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button className="h-16 px-10 rounded-2xl bg-[#4142FE] hover:bg-blue-700 text-white text-lg font-bold shadow-lg shadow-indigo-400/40 border-none transition-transform hover:scale-105">
                    Schedule Demo
                  </Button>
                  <Button variant="outline" className="h-16 px-10 rounded-2xl border-2 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-lg font-bold transition-transform hover:scale-105">
                    Learn
                  </Button>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-[#161B2E] text-white pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-12 lg:gap-8 pb-20">
            {/* Column 1: Branding */}
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center gap-2">
                <Infinity className="w-8 h-8 text-primary" />
                <span className="text-2xl font-bold tracking-tight">AstroEcom.ai</span>
              </div>
              <p className="text-white text-lg leading-relaxed max-w-xs font-normal">
                Manage all your ecommerce conversations, automate tasks, and grow your sales effortlessly with AI.
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Column 2: Social Channels */}
            <div className="space-y-6">
              <h4 className="font-bold text-lg">Social Channels</h4>
              <ul className="space-y-4 text-white font-normal">
                <li><a href="#" className="hover:opacity-80 transition-opacity">WhatsApp</a></li>
                <li><a href="#" className="hover:opacity-80 transition-opacity">Line</a></li>
                <li><a href="#" className="hover:opacity-80 transition-opacity">Telegram</a></li>
                <li><a href="#" className="hover:opacity-80 transition-opacity">Instagram</a></li>
                <li><a href="#" className="hover:opacity-80 transition-opacity">Facebook</a></li>
                <li><a href="#" className="hover:opacity-80 transition-opacity">Viber</a></li>
              </ul>
            </div>

            {/* Column 3: eCommerce */}
            <div className="space-y-6">
              <h4 className="font-bold text-lg">eCommerce</h4>
              <ul className="space-y-4 text-white font-normal">
                <li><a href="#" className="hover:opacity-80 transition-opacity">Shopify</a></li>
                <li><a href="#" className="hover:opacity-80 transition-opacity">WooCommerce</a></li>
              </ul>
            </div>

            {/* Column 4: Insider */}
            <div className="space-y-6">
              <h4 className="font-bold text-lg">Insider</h4>
              <ul className="space-y-4 text-white font-normal">
                <li><a href="#" className="hover:opacity-80 transition-opacity">Pricing</a></li>
                <li><a href="#" className="hover:opacity-80 transition-opacity">Help Center</a></li>
                <li><a href="#" className="hover:opacity-80 transition-opacity">API Reference</a></li>
                <li><a href="#" className="hover:opacity-80 transition-opacity">Roadmap</a></li>
                <li><a href="#" className="hover:opacity-80 transition-opacity">Documentation</a></li>
                <li><a href="#" className="hover:opacity-80 transition-opacity">Compare AstroEcom</a></li>
                <li><a href="#" className="hover:opacity-80 transition-opacity">System Status</a></li>
              </ul>
            </div>

            {/* Column 5: Resources */}
            <div className="space-y-6">
              <h4 className="font-bold text-lg">Resources</h4>
              <ul className="space-y-4 text-white font-normal">
                <li><a href="#" className="hover:opacity-80 transition-opacity">Partners</a></li>
                <li><a href="#" className="hover:opacity-80 transition-opacity">Blog</a></li>
                <li><a href="#" className="hover:opacity-80 transition-opacity">Podcast</a></li>
                <li><a href="#" className="hover:opacity-80 transition-opacity">Community</a></li>
              </ul>
            </div>

            {/* Column 6: Company */}
            <div className="space-y-6">
              <h4 className="font-bold text-lg">Company</h4>
              <ul className="space-y-4 text-white font-normal">
                <li><a href="#" className="hover:opacity-80 transition-opacity">About</a></li>
                <li><a href="#" className="hover:opacity-80 transition-opacity">Career</a></li>
                <li><a href="#" className="hover:opacity-80 transition-opacity">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-white font-normal opacity-60">© 2025 AstroEcom.ai. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-8 text-white font-normal">
              <a href="#" className="hover:opacity-80 transition-opacity">Privacy Policy</a>
              <a href="#" className="hover:opacity-80 transition-opacity">Security</a>
              <a href="#" className="hover:opacity-80 transition-opacity">Terms of Service</a>
              <a href="#" className="hover:opacity-80 transition-opacity">Cookies Settings</a>
            </div>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes orbit {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes counter-orbit {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
      `}} />
    </div>
  );
};

const IntegrationLogo = ({ name, color }) => (
  <div
    className="flex items-center gap-3 bg-white dark:bg-surface-dark px-6 py-3 rounded-2xl border border-gray-100 dark:border-white/5 shadow-lg group hover:scale-105 transition-transform duration-300 pointer-events-auto"
  >
    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
    <span className="font-bold text-lg text-text-primary-light dark:text-text-primary-dark whitespace-nowrap">{name}</span>
  </div>
);

const TestimonialCard = ({ quote, author, role }) => (
  <div className="w-[400px] flex-shrink-0 bg-white dark:bg-surface-dark p-8 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-100/50 snap-start flex flex-col justify-between">
    <p className="text-xl text-text-secondary-light dark:text-text-secondary-dark italic leading-relaxed mb-8">
      "{quote}"
    </p>
    <div>
      <h4 className="font-bold text-text-primary-light dark:text-text-primary-dark">{author}</h4>
      <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{role}</p>
    </div>
  </div>
);

const StatBox = ({ number, label, color, className }) => (
  <div className={cn("text-center md:text-left space-y-2", className)}>
    <h3 className="text-5xl lg:text-7xl font-black italic tracking-tighter" style={{ color }}>{number}</h3>
    <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">{label}</p>
  </div>
);

const CharacteristicPill = ({ label, color }) => (
  <div
    className="px-6 py-2 bg-white dark:bg-surface-dark rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:translate-x-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-default"
  >
    <span className="text-sm font-black tracking-widest text-slate-900 dark:text-white" style={{ color }}>{label}</span>
  </div>
);

const WorkflowPill = ({ label, active, color = "#00A1FF" }) => (
  <div className={cn(
    "px-4 py-2 rounded-full text-[10px] font-black tracking-widest transition-all",
    active ? "text-white shadow-lg" : "bg-white/50"
  )} style={{ backgroundColor: active ? color : undefined, color: !active ? color : undefined }}>
    {label}
  </div>
);

const CheckItem = ({ text, color = "#00A1FF" }) => (
  <li className="flex items-start gap-4 group">
    <div className="mt-1 w-6 h-6 rounded-full bg-white dark:bg-surface-dark flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">
      <CheckCircle2 className="w-4 h-4" style={{ color }} />
    </div>
    <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed font-medium">
      {text}
    </p>
  </li>
);

const TopicPill = ({ label }) => (
  <div className="px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 rounded-full text-indigo-600 dark:text-indigo-300 text-xs font-bold border border-indigo-100 dark:border-indigo-800/50">
    {label}
  </div>
);

export default Landing;
