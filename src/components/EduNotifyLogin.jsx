import React, { useState } from 'react';
import { Bell, BookOpen, Users, Zap, CheckCircle, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom'

export default function EduNotifyLogin() {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    rollNumber: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login data:', formData);
    // Add your login logic here
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const response = await fetch(`${backendUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })

    // Always check if the response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    try {
      const data = await response.json();
      console.log("Response:", data);

      localStorage.setItem("roll", formData.rollNumber)
      navigate(`/${formData.rollNumber}/viewnotice`)
    } catch (error) {
      console.error("Error during login:", error);
    }

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

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="animate-slide-up bg-emerald-950/60 backdrop-blur-xl border border-emerald-700/50 rounded-3xl p-8 md:p-10 shadow-2xl">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Bell className="text-emerald-400" size={40} />
            <span className="text-3xl font-bold gradient-text">EduNotify</span>
          </div>

          <h2 className="text-3xl font-bold text-center mb-2">Welcome Back!</h2>
          <p className="text-emerald-300 text-center mb-8">Login to access your notices</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Roll Number */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-emerald-200">
                Student Roll Number
              </label>
              <input
                type="text"
                value={formData.rollNumber}
                onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                className="w-full bg-emerald-900/40 border border-emerald-700/50 rounded-xl px-4 py-3 text-white placeholder-emerald-400/50 focus:outline-none input-glow transition"
                placeholder="Enter your roll number"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-emerald-200">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-emerald-900/40 border border-emerald-700/50 rounded-xl px-4 py-3 text-white placeholder-emerald-400/50 focus:outline-none input-glow transition pr-12"
                  placeholder="Enter your password"
                  required
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

            {/* Forgot Password */}
            <div className="flex justify-end">
              <a href="#" className="text-sm text-emerald-400 hover:text-emerald-300 transition">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full pulse-glow bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Login <ArrowRight size={20} />
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-emerald-300">
              Don't have an account?{' '}
              <a href="#" className="text-emerald-400 hover:text-emerald-300 font-semibold transition">
                Sign Up
              </a>
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-emerald-600/20 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
}