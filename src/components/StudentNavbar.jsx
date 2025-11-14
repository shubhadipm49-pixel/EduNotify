import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, Eye, Menu, X, User, LogOut } from "lucide-react";

export default function StudentNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to manage active link highlight
  const isActive = (path) =>
    location.pathname === path ? "nav-item-active text-emerald-300" : "text-emerald-100 hover:bg-emerald-800/40";

  return (
    <>
      <style>{`
        .gradient-text {
          background: linear-gradient(135deg, #10b981, #34d399, #6ee7b7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .nav-item-active {
          background: linear-gradient(
            135deg,
            rgba(16, 185, 129, 0.25),
            rgba(52, 211, 153, 0.2)
          );
          border-bottom: 3px solid #10b981;
        }
      `}</style>

      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-emerald-950/95 backdrop-blur-lg shadow-lg shadow-emerald-900/60"
            : "bg-emerald-950/80 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer">
              <Bell className="text-emerald-400" size={32} />
              <div>
                <span className="text-2xl font-bold gradient-text">EduNotify</span>
                <p className="text-xs text-emerald-400">Student Portal</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">

              {/* HARD CODED LINK 1 */}
              <Link
                to={`/${localStorage.getItem("roll")}/viewnotice`}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all ${isActive(
                  `/${localStorage.getItem("roll")}/viewnotice`
                )}`}
              >
                <Eye size={20} />
                <span className="font-semibold">View Notice</span>
              </Link>

              {/* HARD CODED LINK 2 */}
              <Link
                to={`/${localStorage.getItem("roll")}/notification`}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all ${isActive(
                  `/${localStorage.getItem("roll")}/notification`
                )}`}
              >
                <Bell size={20} />
                <span className="font-semibold">Notifications</span>
              </Link>
            </div>

            {/* Profile + Mobile menu */}
            <div className="flex items-center gap-4">

              {/* Profile Dropdown */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 bg-emerald-800/40 hover:bg-emerald-700/50 px-4 py-2 rounded-lg"
                >
                  <User size={20} className="text-emerald-400" />
                  <span className="text-emerald-100 font-semibold">
                    {localStorage.getItem("roll")}
                  </span>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-emerald-950/95 backdrop-blur-lg border border-emerald-700/50 rounded-xl shadow-xl">

                    <div className="px-4 py-3 border-b border-emerald-700/50">
                      <p className="text-sm text-emerald-300">
                        Roll No: {localStorage.getItem("roll")}
                      </p>
                      <p className="text-xs text-emerald-400">
                        Class: {localStorage.getItem("class") || "N/A"}
                      </p>
                    </div>

                    <Link
                      to="/student/profile"
                      className="w-full flex items-center gap-2 px-4 py-3 hover:bg-emerald-800/40"
                    >
                      <User size={18} /> Profile
                    </Link>

                    <button
                      className="w-full flex items-center gap-2 px-4 py-3 hover:bg-emerald-800/40 text-red-400"
                      onClick={() => {
                        localStorage.clear();
                        window.location.href = "/";
                      }}
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="md:hidden text-emerald-400 hover:text-emerald-300"
              >
                {mobileMenu ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenu && (
            <div className="md:hidden pb-4 space-y-2">

              <Link
                to={`/${localStorage.getItem("roll")}/viewnotice`}
                onClick={() => setMobileMenu(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg ${isActive(
                  `/${localStorage.getItem("roll")}/viewnotice`
                )}`}
              >
                <Eye size={20} /> View Notice
              </Link>

              <Link
                to={`/${localStorage.getItem("roll")}/notification`}
                onClick={() => setMobileMenu(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg ${isActive(
                  `/${localStorage.getItem("roll")}/notification`
                )}`}
              >
                <Bell size={20} /> Notifications
              </Link>

              {/* Mobile Profile */}
              <div className="pt-3 border-t border-emerald-700/50 px-4">
                <p className="text-emerald-300 text-sm">
                  Roll No: {localStorage.getItem("roll")}
                </p>
                <p className="text-emerald-400 text-xs">
                  Class: {localStorage.getItem("class") || "N/A"}
                </p>
              </div>

              <Link
                to="/student/profile"
                onClick={() => setMobileMenu(false)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-emerald-800/40 rounded-lg"
              >
                <User size={18} /> Profile
              </Link>

              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-emerald-800/40 text-red-400 rounded-lg"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Spacer so content isn't covered by navbar */}
      <div className="h-20"></div>
    </>
  );
}
