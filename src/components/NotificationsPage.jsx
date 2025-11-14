import React, { useState } from 'react';
import { Bell, Check, Clock, AlertCircle, Info, BookOpen, Trophy, X } from 'lucide-react';
import StudentNavbar from '../components/StudentNavbar'; // ✅ Adjust the path as per your folder

export default function NotificationsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Notice Posted: Mid-Term Exam Schedule',
      message: 'The examination schedule has been uploaded. Please check the notice board for details.',
      type: 'notice',
      time: '2 hours ago',
      date: '2025-03-10T14:30:00',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      title: 'Assignment Deadline Reminder',
      message: 'Your Computer Science assignment is due in 2 days. Submit before March 12, 2025.',
      type: 'reminder',
      time: '5 hours ago',
      date: '2025-03-10T11:00:00',
      read: false,
      priority: 'high'
    },
    {
      id: 3,
      title: 'Sports Day Registration Open',
      message: 'Register for annual sports day events. Last date: March 10, 2025.',
      type: 'event',
      time: '1 day ago',
      date: '2025-03-09T09:00:00',
      read: true,
      priority: 'medium'
    },
    {
      id: 4,
      title: 'Library Book Return Reminder',
      message: 'You have 2 books due for return. Please return them by March 15 to avoid late fees.',
      type: 'reminder',
      time: '1 day ago',
      date: '2025-03-09T16:00:00',
      read: true,
      priority: 'medium'
    },
    {
      id: 5,
      title: 'Holiday Notice - Holi Festival',
      message: 'The institution will remain closed from March 8-10. Enjoy the festivities!',
      type: 'announcement',
      time: '3 days ago',
      date: '2025-03-07T10:00:00',
      read: true,
      priority: 'low'
    },
    {
      id: 6,
      title: 'Workshop on AI and Machine Learning',
      message: 'Join us for an interactive workshop on March 20. Limited seats available!',
      type: 'event',
      time: '4 days ago',
      date: '2025-03-06T14:00:00',
      read: true,
      priority: 'medium'
    },
    {
      id: 7,
      title: 'Exam Results Published',
      message: 'Your semester exam results are now available. Check your student portal.',
      type: 'announcement',
      time: '5 days ago',
      date: '2025-03-05T12:00:00',
      read: true,
      priority: 'high'
    }
  ]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'notice': return <BookOpen className="text-emerald-400" size={24} />;
      case 'reminder': return <Clock className="text-yellow-400" size={24} />;
      case 'event': return <Trophy className="text-purple-400" size={24} />;
      case 'announcement': return <Info className="text-blue-400" size={24} />;
      default: return <Bell className="text-emerald-400" size={24} />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-blue-500';
      default: return 'border-l-emerald-500';
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'unread') return !notif.read;
    return notif.type === selectedFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white">
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 15px rgba(16, 185, 129, 0.3); }
          50% { box-shadow: 0 0 25px rgba(16, 185, 129, 0.5); }
        }
        .notification-card { animation: slideIn 0.5s ease-out; }
        .unread-dot { animation: pulse-glow 2s infinite; }
      `}</style>

      {/* ✅ Fixed Sticky Header */}
      <div className="sticky top-0 z-50 bg-emerald-950/90 backdrop-blur-lg border-b border-emerald-800 shadow-lg">
        <StudentNavbar />
      </div>

      {/* Notifications List */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-20">
            <Bell className="mx-auto text-emerald-600 mb-4" size={64} />
            <p className="text-xl text-emerald-400">No notifications</p>
            <p className="text-emerald-500 mt-2">
              {selectedFilter === 'unread' 
                ? "You're all caught up!" 
                : "No notifications in this category"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notification, index) => (
              <div
                key={notification.id}
                className={`notification-card bg-emerald-950/60 backdrop-blur-xl border border-emerald-700/50 rounded-2xl p-5 hover:border-emerald-500/50 transition border-l-4 ${getPriorityColor(notification.priority)} ${
                  !notification.read ? 'bg-emerald-900/40' : ''
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 bg-emerald-900/40 p-3 rounded-xl">
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-white">
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <span className="unread-dot bg-emerald-500 w-2 h-2 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-emerald-200 text-sm leading-relaxed">
                          {notification.message}
                        </p>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="flex-shrink-0 text-emerald-400 hover:text-red-400 transition"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-emerald-700/30">
                      <div className="flex items-center gap-4 text-xs text-emerald-400">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {notification.time}
                        </span>
                        <span className="px-2 py-1 bg-emerald-800/40 rounded-lg capitalize">
                          {notification.type}
                        </span>
                        {notification.priority === 'high' && (
                          <span className="flex items-center gap-1 text-red-400">
                            <AlertCircle size={12} />
                            High Priority
                          </span>
                        )}
                      </div>

                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="flex items-center gap-2 bg-emerald-700/50 hover:bg-emerald-600/50 px-3 py-1 rounded-lg transition text-xs font-semibold"
                        >
                          <Check size={14} />
                          Mark as Read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
