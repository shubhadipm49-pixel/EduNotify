import React, { useState } from 'react';
import { Bell, Search, Filter, Edit, Trash2, Eye, ThumbsUp, Users, Calendar, Clock, AlertCircle, X, CheckCircle, Loader, Save } from 'lucide-react';
import TeacherNavbar from './TeacherNavbar'


export default function ManageNoticePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [noticeToDelete, setNoticeToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [notices, setNotices] = useState([
    {
      id: 1,
      heading: 'Mid-Term Examination Schedule',
      description: 'The mid-term examinations will be conducted from March 15-22. All students must carry their ID cards and hall tickets.',
      date: '2025-03-01',
      category: 'Examination',
      priority: 'important',
      targetAudience: 'All Students',
      views: 245,
      likes: 24,
      studentsReached: 450
    },
    {
      id: 2,
      heading: 'Workshop on AI and Machine Learning',
      description: 'Interactive workshop on AI/ML fundamentals. Limited seats available. Register by March 18.',
      date: '2025-02-28',
      category: 'Events',
      priority: 'normal',
      targetAudience: 'B.Tech Students',
      views: 189,
      likes: 45,
      studentsReached: 320
    },
    {
      id: 3,
      heading: 'Python Programming Assignment',
      description: 'Complete the Python assignment on data structures. Submission deadline: March 12, 2025. Submit via student portal.',
      date: '2025-02-18',
      category: 'Assignment',
      priority: 'important',
      targetAudience: 'B.Tech Students',
      views: 167,
      likes: 15,
      studentsReached: 280
    },
    {
      id: 4,
      heading: 'Computer Lab Maintenance Notice',
      description: 'Computer lab will be closed for maintenance on March 5. All practical sessions rescheduled.',
      date: '2025-02-10',
      category: 'General',
      priority: 'normal',
      targetAudience: 'All Students',
      views: 312,
      likes: 8,
      studentsReached: 580
    }
  ]);

  const filterOptions = [
    { value: 'all', label: 'All Notices', icon: <Bell size={16} /> },
    { value: 'latest', label: 'Latest First', icon: <Clock size={16} /> },
    { value: 'oldest', label: 'Oldest First', icon: <Clock size={16} /> },
    { value: 'important', label: 'Important', icon: <AlertCircle size={16} /> },
    { value: 'most-viewed', label: 'Most Viewed', icon: <Eye size={16} /> }
  ];

  const categories = ['General', 'Academics', 'Events', 'Holiday', 'Examination', 'Assignment'];
  const priorities = [
    { value: 'normal', label: 'Normal' },
    { value: 'important', label: 'Important' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const handleEdit = (notice) => {
    setEditingNotice({ ...notice });
    setShowEditDialog(true);
  };

  const handleDelete = (notice) => {
    setNoticeToDelete(notice);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    setIsLoading(true);
    setTimeout(() => {
      setNotices(notices.filter(n => n.id !== noticeToDelete.id));
      setIsLoading(false);
      setActionSuccess(true);
      setSuccessMessage('Notice deleted successfully!');
      
      setTimeout(() => {
        setShowDeleteDialog(false);
        setNoticeToDelete(null);
        setActionSuccess(false);
      }, 1500);
    }, 1500);
  };

  const saveEdit = () => {
    if (!editingNotice.heading.trim() || !editingNotice.description.trim()) {
      alert('Heading and description are required!');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setNotices(notices.map(n => n.id === editingNotice.id ? editingNotice : n));
      setIsLoading(false);
      setActionSuccess(true);
      setSuccessMessage('Notice updated successfully!');
      
      setTimeout(() => {
        setShowEditDialog(false);
        setEditingNotice(null);
        setActionSuccess(false);
      }, 1500);
    }, 1500);
  };

  const filteredNotices = notices
    .filter(notice => 
      notice.heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (selectedFilter === 'latest') return new Date(b.date) - new Date(a.date);
      if (selectedFilter === 'oldest') return new Date(a.date) - new Date(b.date);
      if (selectedFilter === 'important') return b.priority === 'important' ? 1 : -1;
      if (selectedFilter === 'most-viewed') return b.views - a.views;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white">
      <style>{`
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes checkmark {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
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
        
        .scale-in {
          animation: scaleIn 0.3s ease-out;
        }
        
        .spinner {
          animation: spin 1s linear infinite;
        }
        
        .checkmark-animate {
          animation: checkmark 0.5s ease-out;
        }
        
        .badge-important {
          background: linear-gradient(135deg, #ef4444, #dc2626);
        }
        
        .badge-urgent {
          background: linear-gradient(135deg, #dc2626, #991b1b);
        }
        
        .badge-normal {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
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
                <h1 className="text-3xl font-bold gradient-text">Manage Notices</h1>
                <p className="text-sm text-emerald-400">Edit or delete your posted notices</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="hidden lg:flex gap-4">
              <div className="bg-emerald-900/40 px-4 py-2 rounded-lg border border-emerald-700/50">
                <p className="text-xs text-emerald-400">Total Notices</p>
                <p className="text-2xl font-bold text-white">{notices.length}</p>
              </div>
              <div className="bg-emerald-900/40 px-4 py-2 rounded-lg border border-emerald-700/50">
                <p className="text-xs text-emerald-400">Total Views</p>
                <p className="text-2xl font-bold text-white">
                  {notices.reduce((sum, n) => sum + n.views, 0)}
                </p>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notices..."
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
              <Bell className="mx-auto text-emerald-600 mb-4" size={64} />
              <p className="text-xl text-emerald-400">No notices found</p>
            </div>
          ) : (
            filteredNotices.map((notice, index) => (
              <div
                key={notice.id}
                className="notice-card bg-emerald-950/60 backdrop-blur-xl border border-emerald-700/50 rounded-2xl p-6 hover:border-emerald-500/50 transition"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-xl font-bold text-white">{notice.heading}</h3>
                      {notice.priority === 'important' && (
                        <span className="badge-important px-3 py-1 rounded-full text-xs font-semibold">
                          Important
                        </span>
                      )}
                      {notice.priority === 'urgent' && (
                        <span className="badge-urgent px-3 py-1 rounded-full text-xs font-semibold">
                          Urgent
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-emerald-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(notice.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                      <span className="px-2 py-1 bg-emerald-800/40 rounded-lg text-xs">
                        {notice.category}
                      </span>
                      <span className="px-2 py-1 bg-emerald-800/40 rounded-lg text-xs">
                        {notice.targetAudience}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-emerald-200 mb-4 leading-relaxed">{notice.description}</p>

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
                    <span className="font-semibold">{notice.studentsReached}</span> reached
                  </span>
                </div>

                <div className="flex gap-3 pt-4 border-t border-emerald-700/30">
                  <button
                    onClick={() => handleEdit(notice)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-700/50 text-emerald-200 hover:bg-emerald-600/50 transition transform hover:scale-105"
                  >
                    <Edit size={18} />
                    <span className="text-sm font-semibold">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(notice)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-900/40 text-red-300 hover:bg-red-800/50 transition transform hover:scale-105 border border-red-700/50"
                  >
                    <Trash2 size={18} />
                    <span className="text-sm font-semibold">Delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit Dialog */}
      {showEditDialog && editingNotice && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4 overflow-y-auto py-8">
          <div className="scale-in bg-emerald-950/95 backdrop-blur-xl border border-emerald-700/50 rounded-3xl p-8 max-w-2xl w-full shadow-2xl my-8">
            {!isLoading && !actionSuccess ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Edit Notice</h2>
                  <button
                    onClick={() => setShowEditDialog(false)}
                    className="text-emerald-400 hover:text-emerald-300"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-emerald-200">Heading</label>
                    <input
                      type="text"
                      value={editingNotice.heading}
                      onChange={(e) => setEditingNotice({...editingNotice, heading: e.target.value})}
                      className="w-full bg-emerald-900/40 border border-emerald-700/50 rounded-xl px-4 py-3 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-emerald-200">Description</label>
                    <textarea
                      value={editingNotice.description}
                      onChange={(e) => setEditingNotice({...editingNotice, description: e.target.value})}
                      rows="5"
                      className="w-full bg-emerald-900/40 border border-emerald-700/50 rounded-xl px-4 py-3 text-white resize-none"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-emerald-200">Category</label>
                      <select
                        value={editingNotice.category}
                        onChange={(e) => setEditingNotice({...editingNotice, category: e.target.value})}
                        className="w-full bg-emerald-900/40 border border-emerald-700/50 rounded-xl px-4 py-3 text-white"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat} className="bg-emerald-950">{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-emerald-200">Priority</label>
                      <select
                        value={editingNotice.priority}
                        onChange={(e) => setEditingNotice({...editingNotice, priority: e.target.value})}
                        className="w-full bg-emerald-900/40 border border-emerald-700/50 rounded-xl px-4 py-3 text-white"
                      >
                        {priorities.map(p => (
                          <option key={p.value} value={p.value} className="bg-emerald-950">{p.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={saveEdit}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
                  >
                    <Save size={20} />
                    Save Changes
                  </button>
                  <button
                    onClick={() => setShowEditDialog(false)}
                    className="px-8 bg-emerald-900/40 hover:bg-emerald-800/40 text-emerald-300 font-semibold py-3 rounded-xl transition"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : isLoading ? (
              <div className="text-center py-8">
                <div className="spinner w-16 h-16 border-4 border-emerald-700 border-t-emerald-400 rounded-full mx-auto mb-4"></div>
                <h3 className="text-2xl font-bold text-white mb-2">Updating Notice...</h3>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="checkmark-animate bg-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{successMessage}</h3>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && noticeToDelete && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="scale-in bg-emerald-950/95 backdrop-blur-xl border border-emerald-700/50 rounded-3xl p-8 max-w-md w-full shadow-2xl">
            {!isLoading && !actionSuccess ? (
              <>
                <div className="text-center mb-6">
                  <div className="bg-red-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle size={32} className="text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Delete Notice?</h3>
                  <p className="text-emerald-300">Are you sure you want to delete this notice?</p>
                  <p className="text-emerald-400 font-semibold mt-2">"{noticeToDelete.heading}"</p>
                  <p className="text-sm text-emerald-500 mt-4">This action cannot be undone.</p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={confirmDelete}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setShowDeleteDialog(false)}
                    className="flex-1 bg-emerald-900/40 hover:bg-emerald-800/40 text-emerald-300 font-semibold py-3 rounded-xl transition"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : isLoading ? (
              <div className="text-center py-8">
                <div className="spinner w-16 h-16 border-4 border-emerald-700 border-t-emerald-400 rounded-full mx-auto mb-4"></div>
                <h3 className="text-2xl font-bold text-white mb-2">Deleting Notice...</h3>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="checkmark-animate bg-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{successMessage}</h3>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}