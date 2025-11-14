import React, { useState } from 'react';
import { Bell, Search, Filter, Download, Eye, ThumbsUp, Clock, AlertCircle, BookOpen, Calendar, User, X, Edit, Trash2, Users } from 'lucide-react';
import TeacherNavbar from './TeacherNavbar'

export default function TeacherViewNoticePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  
  // Current logged-in teacher
  const currentTeacher = {
    id: 'T-001',
    name: 'Prof. John Smith'
  };

  const [notices, setNotices] = useState([
    {
      id: 1,
      title: 'Mid-Term Examination Schedule',
      content: 'The mid-term examinations will be conducted from March 15-22. All students must carry their ID cards.',
      date: '2025-03-01',
      category: 'Academics',
      priority: 'important',
      authorId: 'T-001',
      author: 'Prof. John Smith',
      department: 'Computer Science',
      views: 245,
      likes: 24,
      studentsReached: 450
    },
    {
      id: 2,
      title: 'Workshop on AI and Machine Learning',
      content: 'Interactive workshop on AI/ML fundamentals. Limited seats. Register by March 18.',
      date: '2025-02-28',
      category: 'Events',
      priority: 'normal',
      authorId: 'T-001',
      author: 'Prof. John Smith',
      department: 'Computer Science',
      views: 189,
      likes: 45,
      studentsReached: 320
    },
    {
      id: 3,
      title: 'Library Timings Updated',
      content: 'New library timings: Monday-Friday 8AM-8PM, Saturday 9AM-5PM. Sunday closed.',
      date: '2025-02-25',
      category: 'General',
      priority: 'normal',
      authorId: 'T-003',
      author: 'Library Committee',
      department: 'Administration',
      views: 312,
      likes: 12,
      studentsReached: 580
    },
    {
      id: 4,
      title: 'Holiday Notice - Holi',
      content: 'The institution will remain closed from March 8-10 for Holi festival.',
      date: '2025-02-20',
      category: 'Holiday',
      priority: 'important',
      authorId: 'T-002',
      author: 'Administration Office',
      department: 'Administration',
      views: 521,
      likes: 67,
      studentsReached: 892
    },
    {
      id: 5,
      title: 'Python Programming Assignment',
      content: 'Complete the Python assignment on data structures. Submission deadline: March 12, 2025.',
      date: '2025-02-18',
      category: 'Academics',
      priority: 'important',
      authorId: 'T-001',
      author: 'Prof. John Smith',
      department: 'Computer Science',
      views: 167,
      likes: 15,
      studentsReached: 280
    },
    {
      id: 6,
      title: 'Sports Day Registration',
      content: 'Annual sports day on March 25. Register for events by March 10.',
      date: '2025-02-15',
      category: 'Events',
      priority: 'normal',
      authorId: 'T-004',
      author: 'Sports Committee',
      department: 'Sports',
      views: 423,
      likes: 89,
      studentsReached: 650
    }
  ]);

  const filterOptions = [
    { value: 'all', label: 'All Notices', icon: <BookOpen size={16} /> },
    { value: 'mine', label: 'My Notices', icon: <User size={16} /> },
    { value: 'others', label: 'Others Notices', icon: <Users size={16} /> },
    { value: 'important', label: 'Important', icon: <AlertCircle size={16} /> },
    { value: 'latest', label: 'Latest First', icon: <Clock size={16} /> },
    { value: 'oldest', label: 'Oldest First', icon: <Clock size={16} /> }
  ];

  const isMyNotice = (authorId) => authorId === currentTeacher.id;

  const downloadNotice = (notice) => {
    console.log('Downloading notice:', notice.title);
    alert(`Downloading: ${notice.title}`);
  };

  const editNotice = (notice) => {
    console.log('Editing notice:', notice.title);
    alert(`Edit Notice: ${notice.title}`);
  };

  const deleteNotice = (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      setNotices(notices.filter(notice => notice.id !== id));
    }
  };

  const filteredNotices = notices
    .filter(notice => {
      const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           notice.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (selectedFilter === 'mine') return matchesSearch && isMyNotice(notice.authorId);
      if (selectedFilter === 'others') return matchesSearch && !isMyNotice(notice.authorId);
      if (selectedFilter === 'important') return matchesSearch && notice.priority === 'important';
      return matchesSearch;
    })
    .sort((a, b) => {
      if (selectedFilter === 'latest') return new Date(b.date) - new Date(a.date);
      if (selectedFilter === 'oldest') return new Date(a.date) - new Date(b.date);
      return 0;
    });

  const myNoticesCount = notices.filter(n => isMyNotice(n.authorId)).length;
  const totalViews = notices.filter(n => isMyNotice(n.authorId)).reduce((sum, n) => sum + n.views, 0);
  const totalLikes = notices.filter(n => isMyNotice(n.authorId)).reduce((sum, n) => sum + n.likes, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white">
      <style>{`
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 15px rgba(16, 185, 129, 0.3); }
          50% { box-shadow: 0 0 25px rgba(16, 185, 129, 0.5); }
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #10b981, #34d399, #6ee7b7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .notice-card {
          animation: slideIn 0.5s ease-out;
        }
        
        .badge-important {
          background: linear-gradient(135deg, #ef4444, #dc2626);
        }
        
        .badge-mine {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
        }
      `}</style>

        <TeacherNavbar/>

      {/* Header */}
      <div className="bg-emerald-950/80 backdrop-blur-lg border-b border-emerald-700/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Bell className="text-emerald-400" size={32} />
              <div>
                <h1 className="text-3xl font-bold gradient-text">View Notices</h1>
                <p className="text-sm text-emerald-400">Teacher Portal</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="hidden lg:flex gap-4">
              <div className="bg-emerald-900/40 px-4 py-2 rounded-lg border border-emerald-700/50">
                <p className="text-xs text-emerald-400">My Notices</p>
                <p className="text-2xl font-bold text-white">{myNoticesCount}</p>
              </div>
              <div className="bg-emerald-900/40 px-4 py-2 rounded-lg border border-emerald-700/50">
                <p className="text-xs text-emerald-400">Total Views</p>
                <p className="text-2xl font-bold text-white">{totalViews}</p>
              </div>
              <div className="bg-emerald-900/40 px-4 py-2 rounded-lg border border-emerald-700/50">
                <p className="text-xs text-emerald-400">Total Likes</p>
                <p className="text-2xl font-bold text-white">{totalLikes}</p>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notices by title or content..."
                className="w-full bg-emerald-900/40 border border-emerald-700/50 rounded-xl pl-12 pr-4 py-3 text-white placeholder-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-emerald-400 hover:text-emerald-300"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Filter Button */}
            <div className="relative">
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="flex items-center gap-2 bg-emerald-700/50 hover:bg-emerald-600/50 px-6 py-3 rounded-xl transition border border-emerald-600/50"
              >
                <Filter size={20} />
                <span className="font-semibold">
                  {filterOptions.find(f => f.value === selectedFilter)?.label}
                </span>
              </button>

              {showFilterMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-emerald-950/95 backdrop-blur-lg border border-emerald-700/50 rounded-xl shadow-xl overflow-hidden z-50">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSelectedFilter(option.value);
                        setShowFilterMenu(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-emerald-800/40 transition ${
                        selectedFilter === option.value ? 'bg-emerald-800/60 text-emerald-300' : 'text-emerald-100'
                      }`}
                    >
                      <span className="text-emerald-400">{option.icon}</span>
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Notices List */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <p className="text-emerald-300">
            Showing <span className="text-emerald-400 font-semibold">{filteredNotices.length}</span> notices
          </p>
        </div>

        <div className="space-y-6">
          {filteredNotices.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="mx-auto text-emerald-600 mb-4" size={64} />
              <p className="text-xl text-emerald-400">No notices found</p>
              <p className="text-emerald-500 mt-2">Try adjusting your search or filter</p>
            </div>
          ) : (
            filteredNotices.map((notice, index) => (
              <div
                key={notice.id}
                className="notice-card bg-emerald-950/60 backdrop-blur-xl border border-emerald-700/50 rounded-2xl p-6 hover:border-emerald-500/50 transition"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Notice Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-xl font-bold text-white">{notice.title}</h3>
                      {isMyNotice(notice.authorId) && (
                        <span className="badge-mine px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <User size={12} />
                          My Notice
                        </span>
                      )}
                      {notice.priority === 'important' && (
                        <span className="badge-important px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <AlertCircle size={12} />
                          Important
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-emerald-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(notice.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <User size={14} />
                        {notice.author}
                      </span>
                      <span className="px-2 py-1 bg-emerald-800/40 rounded-lg text-xs">
                        {notice.category}
                      </span>
                      <span className="px-2 py-1 bg-emerald-800/40 rounded-lg text-xs">
                        {notice.department}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Notice Content */}
                <p className="text-emerald-200 mb-6 leading-relaxed">{notice.content}</p>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 mb-4 text-sm text-emerald-300">
                  <span className="flex items-center gap-2">
                    <Eye size={16} />
                    <span className="font-semibold">{notice.views}</span> views
                  </span>
                  <span className="flex items-center gap-2">
                    <ThumbsUp size={16} />
                    <span className="font-semibold">{notice.likes}</span> likes
                  </span>
                  <span className="flex items-center gap-2">
                    <Users size={16} />
                    <span className="font-semibold">{notice.studentsReached}</span> students reached
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-emerald-700/30">
                  {isMyNotice(notice.authorId) && (
                    <>
                      <button
                        onClick={() => editNotice(notice)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-700/50 text-emerald-200 hover:bg-emerald-600/50 transition transform hover:scale-105"
                      >
                        <Edit size={18} />
                        <span className="text-sm font-semibold">Edit</span>
                      </button>
                      <button
                        onClick={() => deleteNotice(notice.id)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-900/40 text-red-300 hover:bg-red-800/50 transition transform hover:scale-105 border border-red-700/50"
                      >
                        <Trash2 size={18} />
                        <span className="text-sm font-semibold">Delete</span>
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => downloadNotice(notice)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-900/40 text-emerald-400 hover:bg-emerald-800/40 transition transform hover:scale-105 ml-auto"
                  >
                    <Download size={18} />
                    <span className="text-sm font-semibold">Download PDF</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}