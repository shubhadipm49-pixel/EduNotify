import React, { useState, useEffect } from 'react';
import { Bell, Upload, Settings, Eye, Menu, X, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function TeacherNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeNav, setActiveNav] = useState(''); // ❗ No default active
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("id");
    navigate("/teacherlogin");
  };

  return (
    <>
      <style>{`
        .nav-item-active {
          background: linear-gradient(135deg, rgba(16,185,129,0.2), rgba(52,211,153,0.1));
          border-bottom: 3px solid #10b981;
        }
      `}</style>

      <nav
        className={`sticky top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-emerald-950/95 backdrop-blur-lg shadow-lg shadow-emerald-900/50'
            : 'bg-emerald-950/80 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            <div className="flex items-center space-x-3 cursor-pointer">
              <Bell className="text-emerald-400" size={32} />
              <div>
                <span className="text-2xl font-bold gradient-text">EduNotify</span>
                <p className="text-xs text-emerald-400">Teacher Portal</p>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-2">

              <Link
                to={`/${localStorage.getItem("id")}/teachview`}
                onClick={() => setActiveNav("view-notice")}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all hover:scale-105 ${
                  activeNav === "view-notice" ? "nav-item-active text-emerald-300"
                  : "text-emerald-100 hover:bg-emerald-800/40"
                }`}
              >
                <Eye size={20} />
                View Notices
              </Link>

              <Link
                to={`/${localStorage.getItem("id")}/postnotice`}
                onClick={() => setActiveNav("post-notice")}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all hover:scale-105 ${
                  activeNav === "post-notice" ? "nav-item-active text-emerald-300"
                  : "text-emerald-100 hover:bg-emerald-800/40"
                }`}
              >
                <Upload size={20} />
                Post Notice
              </Link>

              <Link
                to={`/${localStorage.getItem("id")}/managenotice`}
                onClick={() => setActiveNav("manage-notice")}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all hover:scale-105 ${
                  activeNav === "manage-notice" ? "nav-item-active text-emerald-300"
                  : "text-emerald-100 hover:bg-emerald-800/40"
                }`}
              >
                <Settings size={20} />
                Manage Notice
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-2 rounded-lg text-red-400 hover:bg-red-900/30 transition-all hover:scale-105"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden text-emerald-400 hover:text-emerald-300 transition"
            >
              {mobileMenu ? <X size={28} /> : <Menu size={28} />}
            </button>

          </div>

          {mobileMenu && (
            <div className="lg:hidden pb-4 space-y-2">

              <Link
                to={`/${localStorage.getItem("id")}/teachview`}
                onClick={() => { setActiveNav("view-notice"); setMobileMenu(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                  activeNav === "view-notice" ? "bg-emerald-700/50 text-emerald-300"
                  : "text-emerald-100 hover:bg-emerald-800/40"
                }`}
              >
                <Eye size={20} /> View Notices
              </Link>

              <Link
                to={`/${localStorage.getItem("id")}/postnotice`}
                onClick={() => { setActiveNav("post-notice"); setMobileMenu(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                  activeNav === "post-notice" ? "bg-emerald-700/50 text-emerald-300"
                  : "text-emerald-100 hover:bg-emerald-800/40"
                }`}
              >
                <Upload size={20} /> Post Notice
              </Link>

              <Link
                to={`/${localStorage.getItem("id")}/managenotice`}
                onClick={() => { setActiveNav("manage-notice"); setMobileMenu(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                  activeNav === "manage-notice" ? "bg-emerald-700/50 text-emerald-300"
                  : "text-emerald-100 hover:bg-emerald-800/40"
                }`}
              >
                <Settings size={20} /> Manage Notice
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/40 transition"
              >
                <LogOut size={20} /> Logout
              </button>

            </div>
          )}
        </div>
      </nav>
    </>
  );
}
