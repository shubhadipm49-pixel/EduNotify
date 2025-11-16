import React, { useEffect, useState } from 'react';
import { Bell, Search, Filter, Download, Eye, ThumbsUp, Clock, AlertCircle, BookOpen, Calendar, User, X } from 'lucide-react';
import StudentNavbar from './StudentNavbar'

export default function ViewNoticePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('latest');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [notices, setNotices] = useState([]);

  const filterOptions = [
    { value: 'latest', label: 'Latest First', icon: <Clock size={16} /> },
    { value: 'oldest', label: 'Oldest First', icon: <Clock size={16} /> },
    { value: 'important', label: 'Important', icon: <AlertCircle size={16} /> },
    { value: 'unseen', label: 'Unseen', icon: <Eye size={16} /> }
  ];

  const toggleSeen = (id) => {
    setNotices(notices.map(notice => 
      notice.id === id ? { ...notice, seen: !notice.seen } : notice
    ));
  };

  const toggleLike = (id) => {
    setNotices(notices.map(notice => 
      notice.id === id ? { 
        ...notice, 
        liked: !notice.liked,
        likes: notice.liked ? notice.likes - 1 : notice.likes + 1
      } : notice
    ));
  };

  const downloadNotice = (notice) => {
    console.log('Downloading notice:', notice.title);
    alert(`Downloading: ${notice.title}`);
  };

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const audience = localStorage.getItem('studentAudience') || 'all';
        const res = await fetch(`http://localhost:3000/notices?audience=${encodeURIComponent(audience)}`);
        if (!res.ok) throw new Error('Failed to fetch notices');
        const data = await res.json();
        // Map backend to UI shape
        const mapped = (data.notices || []).map((n) => ({
          id: n._id,
          title: n.heading,
          content: n.description,
          date: n.createdAt,
          category: n.category,
          priority: n.priority,
          author: n.authorEmail || 'Teacher',
          seen: false,
          liked: false,
          likes: 0,
        }));
        setNotices(mapped);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotices();
  }, []);

  const filteredNotices = notices
    .filter(notice => 
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (selectedFilter === 'latest') return new Date(b.date) - new Date(a.date);
      if (selectedFilter === 'oldest') return new Date(a.date) - new Date(b.date);
      if (selectedFilter === 'important') return b.priority === 'important' ? 1 : -1;
      if (selectedFilter === 'unseen') return a.seen ? 1 : -1;
      return 0;
    });

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
        
        .badge-normal {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }
      `}</style>

      <StudentNavbar/>

      {/* Header */}
      <div className="bg-emerald-950/80 backdrop-blur-lg border-b border-emerald-700/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="text-emerald-400" size={32} />
            <h1 className="text-3xl font-bold gradient-text">View Notices</h1>
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
        <div className="mb-6 flex items-center justify-between">
          <p className="text-emerald-300">
            Showing <span className="text-emerald-400 font-semibold">{filteredNotices.length}</span> notices
          </p>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-emerald-900/40 rounded-full text-xs text-emerald-300 border border-emerald-700/50">
              {notices.filter(n => !n.seen).length} Unseen
            </span>
          </div>
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
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{notice.title}</h3>
                      {notice.priority === 'important' && (
                        <span className="badge-important px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <AlertCircle size={12} />
                          Important
                        </span>
                      )}
                      {!notice.seen && (
                        <span className="bg-blue-500 px-2 py-1 rounded-full text-xs font-semibold">
                          New
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
                    </div>
                  </div>
                </div>

                {/* Notice Content */}
                <p className="text-emerald-200 mb-6 leading-relaxed">{notice.content}</p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-emerald-700/30">
                  <button
                    onClick={() => toggleSeen(notice.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition transform hover:scale-105 ${
                      notice.seen 
                        ? 'bg-emerald-700/50 text-emerald-300' 
                        : 'bg-emerald-900/40 text-emerald-400 hover:bg-emerald-800/40'
                    }`}
                  >
                    <Eye size={18} />
                    <span className="text-sm font-semibold">
                      {notice.seen ? 'Seen' : 'Mark as Seen'}
                    </span>
                  </button>

                  <button
                    onClick={() => toggleLike(notice.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition transform hover:scale-105 ${
                      notice.liked 
                        ? 'bg-emerald-600/50 text-emerald-200' 
                        : 'bg-emerald-900/40 text-emerald-400 hover:bg-emerald-800/40'
                    }`}
                  >
                    <ThumbsUp size={18} fill={notice.liked ? 'currentColor' : 'none'} />
                    <span className="text-sm font-semibold">{notice.likes}</span>
                  </button>

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