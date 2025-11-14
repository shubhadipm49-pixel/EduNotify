import React from 'react'
import { useState } from 'react';
import { Bell, ChevronDown, GraduationCap, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showLoginDropdown, setShowLoginDropdown] = useState(false);
    const [showSignUpDropdown, setShowSignUpDropdown] = useState(false);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-emerald-950/95 backdrop-blur-lg shadow-lg' : 'bg-emerald-950/80 backdrop-blur-md'}`}>
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Bell className="text-emerald-400" size={32} />
                    <span className="text-2xl font-bold gradient-text">EduNotify</span>
                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center space-x-4">
                    {/* Login Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowLoginDropdown(!showLoginDropdown);
                                setShowSignUpDropdown(false);
                            }}
                            className="flex items-center gap-2 bg-emerald-800/40 hover:bg-emerald-700/50 px-6 py-2 rounded-full transition transform hover:scale-105"
                        >
                            Login
                            <ChevronDown size={18} className={`transition-transform ${showLoginDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {showLoginDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-emerald-950/95 backdrop-blur-lg border border-emerald-700/50 rounded-xl shadow-xl overflow-hidden">
                                <Link to={"/studentlogin"}>
                                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-emerald-800/40 transition text-emerald-100">

                                        <User size={18} className="text-emerald-400" />
                                        <span>Student Login</span>


                                    </button>
                                </Link>

                                <Link to={"/teacherlogin"}>
                                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-emerald-800/40 transition text-emerald-100">
                                        <GraduationCap size={18} className="text-emerald-400" />
                                        <span>Teacher Login</span>
                                    </button>
                                </Link>

                            </div>
                        )}
                    </div>

                    {/* Sign Up Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowSignUpDropdown(!showSignUpDropdown);
                                setShowLoginDropdown(false);
                            }}
                            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 px-6 py-2 rounded-full transition transform hover:scale-105"
                        >
                            Sign Up
                            <ChevronDown size={18} className={`transition-transform ${showSignUpDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {showSignUpDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-emerald-950/95 backdrop-blur-lg border border-emerald-700/50 rounded-xl shadow-xl overflow-hidden">
                                 <Link to={"/studentsignup"}>
                                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-emerald-800/40 transition text-emerald-100">
                                        <User size={18} className="text-emerald-400" />
                                        <span>Student Sign Up</span>
                                    </button>
                                </Link>

                                <Link to={"/teachersignup"}>
                                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-emerald-800/40 transition text-emerald-100">
                                        <GraduationCap size={18} className="text-emerald-400" />
                                        <span>Teacher Sign Up</span>
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu - Removed for cleaner look, but keeping if needed */}
                {/* Mobile version with dropdowns */}
                <div className="md:hidden flex flex-col space-y-4">
                    {/* Login Dropdown Mobile */}
                    <div>
                        <button
                            onClick={() => {
                                setShowLoginDropdown(!showLoginDropdown);
                                setShowSignUpDropdown(false);
                            }}
                            className="flex items-center gap-2 bg-emerald-800/40 hover:bg-emerald-700/50 px-6 py-2 rounded-full transition w-full justify-center"
                        >
                            Login
                            <ChevronDown size={18} className={`transition-transform ${showLoginDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {showLoginDropdown && (
                            <div className="mt-2 bg-emerald-950/95 backdrop-blur-lg border border-emerald-700/50 rounded-xl overflow-hidden">
                                <Link to={"/studentlogin"}>
                                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-emerald-800/40 transition text-emerald-100">

                                        <User size={18} className="text-emerald-400" />
                                        <span>Student Login</span>


                                    </button>
                                </Link>

                                <Link to={"/teacherlogin"}>
                                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-emerald-800/40 transition text-emerald-100">
                                        <GraduationCap size={18} className="text-emerald-400" />
                                        <span>Teacher Login</span>
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Sign Up Dropdown Mobile */}
                    <div>
                        <button
                            onClick={() => {
                                setShowSignUpDropdown(!showSignUpDropdown);
                                setShowLoginDropdown(false);
                            }}
                            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 px-6 py-2 rounded-full transition w-full justify-center"
                        >
                            Sign Up
                            <ChevronDown size={18} className={`transition-transform ${showSignUpDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {showSignUpDropdown && (
                            <div className="mt-2 bg-emerald-950/95 backdrop-blur-lg border border-emerald-700/50 rounded-xl overflow-hidden">

                                <Link to={"/studentsignup"}>
                                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-emerald-800/40 transition text-emerald-100">
                                        <User size={18} className="text-emerald-400" />
                                        <span>Student Sign Up</span>
                                    </button>
                                </Link>

                                <Link to={"/teachersignup"}>
                                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-emerald-800/40 transition text-emerald-100">
                                        <GraduationCap size={18} className="text-emerald-400" />
                                        <span>Teacher Sign Up</span>
                                    </button>
                                </Link>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar