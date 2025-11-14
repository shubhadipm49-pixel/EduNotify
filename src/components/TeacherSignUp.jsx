import React, { useState } from 'react';
import { Bell, BookOpen, Users, Zap, CheckCircle, Eye, EyeOff, ArrowRight, GraduationCap } from 'lucide-react';

export default function TeacherSignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    teacherId: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Teacher Sign up data:', formData);
  };

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
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white overflow-hidden relative flex items-center justify-center px-6 py-12">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-30px) rotate(5deg); }
          50% { transform: translateY(-60px) rotate(-5deg); }
          75% { transform: translateY(-30px) rotate(3deg); }
        }
        
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
          50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.6); }
        }
        
        .animate-float {
          animation: float 20s infinite ease-in-out;
        }
        
        .animate-slide-up {
          animation: slideUp 0.6s ease-out;
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

        .input-glow:focus {
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3);
        }
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-0">
        <FloatingIcon delay={0} top={10} left={10}>
          <GraduationCap size={80} strokeWidth={1} />
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

      <div className="relative z-10 w-full max-w-md">
        <div className="animate-slide-up bg-emerald-950/60 backdrop-blur-xl border border-emerald-700/50 rounded-3xl p-8 md:p-10 shadow-2xl">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Bell className="text-emerald-400" size={40} />
            <span className="text-3xl font-bold gradient-text">EduNotify</span>
          </div>

          <div className="flex items-center justify-center gap-2 mb-8">
            <GraduationCap className="text-emerald-400" size={28} />
            <span className="text-emerald-300 font-semibold">Teacher Portal</span>
          </div>

          <h2 className="text-3xl font-bold text-center mb-2">Create Account</h2>
          <p className="text-emerald-300 text-center mb-8">Join EduNotify as a Teacher</p>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2 text-emerald-200">
                Teacher ID
              </label>
              <input
                type="text"
                value={formData.teacherId}
                onChange={(e) => setFormData({...formData, teacherId: e.target.value})}
                className="w-full bg-emerald-900/40 border border-emerald-700/50 rounded-xl px-4 py-3 text-white placeholder-emerald-400/50 focus:outline-none input-glow transition"
                placeholder="Enter your teacher ID (e.g., T-12345)"
              />
              <p className="text-xs text-emerald-400 mt-1">Contact admin if you don't have a Teacher ID</p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-emerald-200">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-emerald-900/40 border border-emerald-700/50 rounded-xl px-4 py-3 text-white placeholder-emerald-400/50 focus:outline-none input-glow transition"
                placeholder="teacher@school.edu"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-emerald-200">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-emerald-900/40 border border-emerald-700/50 rounded-xl px-4 py-3 text-white placeholder-emerald-400/50 focus:outline-none input-glow transition pr-12"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-emerald-400 hover:text-emerald-300 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-emerald-200">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full bg-emerald-900/40 border border-emerald-700/50 rounded-xl px-4 py-3 text-white placeholder-emerald-400/50 focus:outline-none input-glow transition pr-12"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-emerald-400 hover:text-emerald-300 transition"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="bg-emerald-900/30 border border-emerald-700/50 rounded-lg p-3">
              <p className="text-xs text-emerald-300">
                By signing up, you agree to EduNotify's Terms of Service and Privacy Policy
              </p>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full pulse-glow bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition transform hover:scale-105 flex items-center justify-center gap-2 mt-6"
            >
              Create Teacher Account <ArrowRight size={20} />
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-emerald-300">
              Already have an account?{' '}
              <button className="text-emerald-400 hover:text-emerald-300 font-semibold transition">
                Login
              </button>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-emerald-700/50 text-center">
            <p className="text-sm text-emerald-400">
              Student? <button className="text-emerald-300 hover:text-emerald-200 font-semibold">Sign up here</button>
            </p>
          </div>
        </div>

        <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-emerald-600/20 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
}