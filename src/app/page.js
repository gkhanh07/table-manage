"use client";
import { useState, useEffect } from "react";
import Table from "./components/Table";
import AddForm from "./components/AddForm";
import LanguageToggle from "./components/LanguageToggle";
import { useLanguage } from "./contexts/LanguageContext";
import { fetchTeachers, addTeacher, updateTeacher } from "./utils/api";

export default function Home() {
  const { t } = useLanguage();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch teachers from API on component mount
  useEffect(() => {
    const loadTeachers = async () => {
      try {
        setLoading(true);
        setError(null);
        const teachersData = await fetchTeachers();
        setTeachers(teachersData);
      } catch (err) {
        setError('Failed to load teachers');
        console.error('Error loading teachers:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTeachers();
  }, []);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setShowAddForm(false);
        setEditingTeacher(null);
      }
    };

    if (showAddForm || editingTeacher) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showAddForm, editingTeacher]);

  const handleAddTeacher = async (newTeacher) => {
    try {
      setError(null);
      // Add teacher to API
      const addedTeacher = await addTeacher(newTeacher);
      // Add the new teacher to the local state
      setTeachers(prevTeachers => [...prevTeachers, addedTeacher]);
      // Hide the form after adding
      setShowAddForm(false);
    } catch (err) {
      setError('Failed to add teacher');
      console.error('Error adding teacher:', err);
    }
  };

  const handleEditTeacher = async (updatedTeacher) => {
    try {
      setError(null);
      // Update teacher via API
      const updated = await updateTeacher(editingTeacher.id, updatedTeacher);
      // Update the teacher in local state
      setTeachers(prevTeachers =>
        prevTeachers.map(teacher =>
          teacher.id === editingTeacher.id ? updated : teacher
        )
      );
      // Hide the edit form
      setEditingTeacher(null);
    } catch (err) {
      setError('Failed to update teacher');
      console.error('Error updating teacher:', err);
    }
  };

  const handleShowEditForm = (teacher) => {
    setEditingTeacher(teacher);
  };

  const handleShowAddForm = () => {
    setShowAddForm(true);
  };

  const handleCancelAddForm = () => {
    setShowAddForm(false);
  };

  const handleCancelEdit = () => {
    setEditingTeacher(null);
  };

  // Handle clicking outside the modal to close it
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowAddForm(false);
      setEditingTeacher(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                {t('teacher.title')}
              </h1>
              <p className="text-slate-600 mt-1">{t('teacher.subtitle')}</p>
              {/* Sample translated text */}
              <p className="text-sm text-blue-600 mt-2 font-medium">
                {t('common.hello')} 👋
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-4">
                <div className="text-sm text-slate-500">
                  {teachers.length} {teachers.length !== 1 ? t('teacher.teachersAvailable') : t('teacher.teacherAvailable')}
                </div>
              </div>
              <LanguageToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
            <button
              onClick={() => window.location.reload()}
              className="ml-auto text-red-800 hover:text-red-900 font-medium"
            >
              {t('common.retry') || 'Retry'}
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-slate-600">{t('common.loading')}</span>
          </div>
        ) : (
          <Table
            teachers={teachers}
            onAddTeacher={handleShowAddForm}
            onEditTeacher={handleShowEditForm}
          />
        )}
      </div>

      {/* Modal overlay for AddForm */}
      {showAddForm && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
          onClick={handleBackdropClick}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-out animate-in slide-in-from-bottom-4 zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <AddForm
              onAddTeacher={handleAddTeacher}
              onCancel={handleCancelAddForm}
            />
          </div>
        </div>
      )}

      {/* Modal overlay for EditForm */}
      {editingTeacher && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
          onClick={handleBackdropClick}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-out animate-in slide-in-from-bottom-4 zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <AddForm
              teacher={editingTeacher}
              onAddTeacher={handleEditTeacher}
              onCancel={handleCancelEdit}
              isEditing={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}

