import React, { useEffect, useState } from 'react';
import { Bell, BookOpen, Users, Zap, CheckCircle, ArrowRight, Menu, X } from 'lucide-react';
import Navbar from './Navbar';

export default function EduNotifyLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const FloatingIcon = ({ children, delay, top, left }) => (
    <div 
      className="absolute opacity-10 animate-float"
      style={{
        top: `${top}%`,
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: '20s'
      }}
    >
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white overflow-hidden relative">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-30px) rotate(5deg); }
          50% { transform: translateY(-60px) rotate(-5deg); }
          75% { transform: translateY(-30px) rotate(3deg); }
        }
        
        @keyframes slideInLeft {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInRight {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.5); }
          50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.8); }
        }
        
        .animate-float {
          animation: float 20s infinite ease-in-out;
        }
        
        .animate-slide-left {
          animation: slideInLeft 1s ease-out;
        }
        
        .animate-slide-right {
          animation: slideInRight 1s ease-out;
        }
        
        .animate-scale {
          animation: scaleIn 0.8s ease-out;
        }
        
        .pulse-glow {
          animation: pulse-glow 2s infinite;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #10b981, #34d399, #6ee7b7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Floating Background Icons */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <FloatingIcon delay={0} top={10} left={10}>
          <Bell size={80} strokeWidth={1} />
        </FloatingIcon>
        <FloatingIcon delay={-5} top={60} left={80}>
          <BookOpen size={100} strokeWidth={1} />
        </FloatingIcon>
        <FloatingIcon delay={-10} top={30} left={70}>
          <Users size={90} strokeWidth={1} />
        </FloatingIcon>
        <FloatingIcon delay={-15} top={70} left={20}>
          <Zap size={85} strokeWidth={1} />
        </FloatingIcon>
        <FloatingIcon delay={-7} top={20} left={50}>
          <CheckCircle size={95} strokeWidth={1} />
        </FloatingIcon>
        <FloatingIcon delay={-12} top={80} left={60}>
          <Bell size={75} strokeWidth={1} />
        </FloatingIcon>
      </div>

      {/* Navigation */}
      <Navbar/>
        
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl mx-auto text-center z-10">
          <div className="animate-scale">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="gradient-text">EduNotify</span>
            </h1>
            <p className="text-xl md:text-3xl mb-4 animate-slide-left">
              Revolutionary Notice Management
            </p>
            <p className="text-lg md:text-xl text-emerald-300 mb-12 max-w-3xl mx-auto animate-slide-right">
              Transform how your institution communicates. Instant notifications, seamless organization, and zero missed updates.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale">
            <button className="pulse-glow bg-emerald-500 hover:bg-emerald-600 px-10 py-4 rounded-full text-lg font-semibold transition transform hover:scale-110 flex items-center gap-2">
              Start Free Trial <ArrowRight size={20} />
            </button>
            <button className="border-2 border-emerald-400 hover:bg-emerald-500/20 px-10 py-4 rounded-full text-lg font-semibold transition transform hover:scale-105">
              Watch Demo
            </button>
          </div>

          {/* Animated Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            {[
              { icon: <Bell size={40} />, title: 'Instant Alerts', desc: 'Real-time notifications' },
              { icon: <BookOpen size={40} />, title: 'Organized', desc: 'Categorized notices' },
              { icon: <Users size={40} />, title: 'Collaborative', desc: 'Team management' }
            ].map((item, i) => (
              <div 
                key={i}
                className="bg-emerald-900/30 backdrop-blur-sm border border-emerald-700/50 p-6 rounded-2xl hover:bg-emerald-800/40 transition transform hover:scale-105 hover:-translate-y-2 animate-scale"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="text-emerald-400 mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-emerald-200">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-emerald-900/20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 gradient-text">Powerful Features</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {[
              { icon: <Zap />, title: 'Lightning Fast', desc: 'Deliver notices to thousands of students instantly with our optimized delivery system.' },
              { icon: <CheckCircle />, title: 'Smart Categorization', desc: 'Automatically organize notices by department, priority, and relevance.' },
              { icon: <Users />, title: 'Role-Based Access', desc: 'Control who can create, edit, and view notices with granular permissions.' },
              { icon: <Bell />, title: 'Multi-Channel Delivery', desc: 'Send via email, SMS, push notifications, and in-app alerts simultaneously.' }
            ].map((feature, i) => (
              <div key={i} className="flex gap-6 bg-emerald-950/50 p-8 rounded-2xl border border-emerald-700/30 hover:border-emerald-500/50 transition transform hover:scale-105">
                <div className="text-emerald-400 flex-shrink-0">{React.cloneElement(feature.icon, { size: 48 })}</div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-emerald-200">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-emerald-600 to-emerald-800 p-12 rounded-3xl shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Communication?</h2>
          <p className="text-xl mb-8 text-emerald-100">Join thousands of institutions already using EduNotify</p>
          <button className="bg-white text-emerald-900 hover:bg-emerald-50 px-12 py-4 rounded-full text-lg font-bold transition transform hover:scale-110 shadow-lg">
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-950/80 py-12 px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Bell className="text-emerald-400" size={32} />
            <span className="text-2xl font-bold gradient-text">EduNotify</span>
          </div>
          <p className="text-emerald-300 mb-6">Making education communication effortless</p>
          <p className="text-emerald-500 text-sm">© 2025 EduNotify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}