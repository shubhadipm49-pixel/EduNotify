import React, { useState } from 'react';
import { Bell, Upload, FileText, Image, X, CheckCircle, Loader, AlertCircle } from 'lucide-react';
import TeacherNavbar from './TeacherNavbar'

export default function UploadNoticePage() {
  const [formData, setFormData] = useState({
    heading: '',
    description: '',
    category: 'general',
    priority: 'normal',
    targetAudience: 'all'
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const categories = [
    { value: 'general', label: 'General' },
    { value: 'academics', label: 'Academics' },
    { value: 'events', label: 'Events' },
    { value: 'holiday', label: 'Holiday' },
    { value: 'examination', label: 'Examination' },
    { value: 'assignment', label: 'Assignment' }
  ];

  const priorities = [
    { value: 'normal', label: 'Normal', color: 'text-blue-400' },
    { value: 'important', label: 'Important', color: 'text-yellow-400' },
    { value: 'urgent', label: 'Urgent', color: 'text-red-400' }
  ];

  const audiences = [
    { value: 'all', label: 'All Students' },
    { value: 'class10', label: 'Class 10' },
    { value: 'class12', label: 'Class 12' },
    { value: 'btech', label: 'B.Tech Students' },
    { value: 'mtech', label: 'M.Tech Students' }
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload only PDF or Image files (JPG, PNG)');
        return;
      }
      
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size should be less than 10MB');
        return;
      }
      
      setUploadedFile(file);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.heading.trim()) {
      alert('Please enter a heading');
      return;
    }
    if (!formData.description.trim()) {
      alert('Please enter a description');
      return;
    }

    // Show loading dialog
    setShowDialog(true);
    setIsLoading(true);
    setIsSuccess(false);

    try {
      const payload = {
        heading: formData.heading,
        description: formData.description,
        category: formData.category,
        priority: formData.priority,
        targetAudience: formData.targetAudience,
        fileUrl: null,
        authorEmail: localStorage.getItem('teacherEmail') || undefined,
      };

      const res = await fetch('http://localhost:3000/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to post notice');
      }

      await res.json();
      setIsLoading(false);
      setIsSuccess(true);

      // Auto close after 2 seconds
      setTimeout(() => {
        setShowDialog(false);
        // Reset form
        setFormData({
          heading: '',
          description: '',
          category: 'general',
          priority: 'normal',
          targetAudience: 'all'
        });
        setUploadedFile(null);
      }, 2000);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setShowDialog(false);
      alert(error.message);
    }
  };

  const getFileIcon = (file) => {
    if (!file) return null;
    if (file.type === 'application/pdf') {
      return <FileText className="text-red-400" size={24} />;
    }
    return <Image className="text-blue-400" size={24} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white">
      <style>{`
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
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
        
        .slide-in {
          animation: slideIn 0.5s ease-out;
        }
        
        .spinner {
          animation: spin 1s linear infinite;
        }
        
        .scale-in {
          animation: scaleIn 0.3s ease-out;
        }
        
        .checkmark-animate {
          animation: checkmark 0.5s ease-out;
        }
        
        .input-glow:focus {
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3);
        }
      `}</style>

         <TeacherNavbar/>

      {/* Header */}
      <div className="bg-emerald-950/80 backdrop-blur-lg border-b border-emerald-700/50">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <Bell className="text-emerald-400" size={32} />
            <div>
              <h1 className="text-3xl font-bold gradient-text">Upload Notice</h1>
              <p className="text-sm text-emerald-400">Create and publish a new notice</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="slide-in bg-emerald-950/60 backdrop-blur-xl border border-emerald-700/50 rounded-2xl p-8">
          <div className="space-y-6">
            {/* Heading */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-emerald-200">
                Notice Heading <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.heading}
                onChange={(e) => setFormData({...formData, heading: e.target.value})}
                placeholder="Enter notice heading..."
                className="w-full bg-emerald-900/40 border border-emerald-700/50 rounded-xl px-4 py-3 text-white placeholder-emerald-400/50 focus:outline-none input-glow transition"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-emerald-200">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Enter detailed description..."
                rows="6"
                className="w-full bg-emerald-900/40 border border-emerald-700/50 rounded-xl px-4 py-3 text-white placeholder-emerald-400/50 focus:outline-none input-glow transition resize-none"
              />
            </div>

            {/* Category, Priority, Target Audience */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-emerald-200">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-emerald-900/40 border border-emerald-700/50 rounded-xl px-4 py-3 text-white focus:outline-none input-glow transition"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value} className="bg-emerald-950">
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-emerald-200">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  className="w-full bg-emerald-900/40 border border-emerald-700/50 rounded-xl px-4 py-3 text-white focus:outline-none input-glow transition"
                >
                  {priorities.map(priority => (
                    <option key={priority.value} value={priority.value} className="bg-emerald-950">
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-emerald-200">
                  Target Audience
                </label>
                <select
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                  className="w-full bg-emerald-900/40 border border-emerald-700/50 rounded-xl px-4 py-3 text-white focus:outline-none input-glow transition"
                >
                  {audiences.map(aud => (
                    <option key={aud.value} value={aud.value} className="bg-emerald-950">
                      {aud.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-emerald-200">
                Attach File (Optional)
              </label>
              <div className="border-2 border-dashed border-emerald-700/50 rounded-xl p-8 text-center hover:border-emerald-500/50 transition">
                {!uploadedFile ? (
                  <div>
                    <Upload className="mx-auto text-emerald-400 mb-3" size={48} />
                    <p className="text-emerald-300 mb-2">Upload PDF or Image</p>
                    <p className="text-sm text-emerald-500 mb-4">
                      Supported formats: PDF, JPG, PNG (Max 10MB)
                    </p>
                    <label className="inline-block bg-emerald-600 hover:bg-emerald-500 px-6 py-2 rounded-lg cursor-pointer transition transform hover:scale-105">
                      <span className="font-semibold">Choose File</span>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-emerald-900/40 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getFileIcon(uploadedFile)}
                      <div className="text-left">
                        <p className="text-white font-semibold">{uploadedFile.name}</p>
                        <p className="text-sm text-emerald-400">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={removeFile}
                      className="text-red-400 hover:text-red-300 transition"
                    >
                      <X size={24} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-emerald-900/30 border border-emerald-700/50 rounded-xl p-4 flex gap-3">
              <AlertCircle className="text-emerald-400 flex-shrink-0" size={20} />
              <p className="text-sm text-emerald-300">
                Once posted, the notice will be visible to all selected students. Make sure all information is correct before publishing.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Upload size={20} />
                Post Notice
              </button>
              <button
                onClick={() => {
                  setFormData({
                    heading: '',
                    description: '',
                    category: 'general',
                    priority: 'normal',
                    targetAudience: 'all'
                  });
                  setUploadedFile(null);
                }}
                className="px-8 bg-emerald-900/40 hover:bg-emerald-800/40 text-emerald-300 font-semibold py-3 rounded-xl transition border border-emerald-700/50"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="scale-in bg-emerald-950/95 backdrop-blur-xl border border-emerald-700/50 rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center">
              {isLoading ? (
                <>
                  <div className="spinner w-16 h-16 border-4 border-emerald-700 border-t-emerald-400 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-2xl font-bold text-white mb-2">Posting Notice...</h3>
                  <p className="text-emerald-300">Please wait while we publish your notice</p>
                </>
              ) : isSuccess ? (
                <>
                  <div className="checkmark-animate bg-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={40} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Notice Posted Successfully!</h3>
                  <p className="text-emerald-300">Your notice has been published and sent to students</p>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}