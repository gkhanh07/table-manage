import React, { useState, useMemo } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const Table = ({ teachers = [], onAddTeacher, onEditTeacher }) => {
    const { t } = useLanguage();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Calculate pagination
    const totalPages = Math.ceil(teachers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTeachers = teachers.slice(startIndex, endIndex);

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 5; i++) {
                    pages.push(i);
                }
            } else if (currentPage >= totalPages - 2) {
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    pages.push(i);
                }
            }
        }
        return pages;
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <svg key={i} className="w-4 h-4 text-amber-400" viewBox="0 0 20 20">
                        <defs>
                            <linearGradient id={`half-${i}`}>
                                <stop offset="50%" stopColor="currentColor" />
                                <stop offset="50%" stopColor="rgb(156, 163, 175)" />
                            </linearGradient>
                        </defs>
                        <path fill={`url(#half-${i})`} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                );
            } else {
                stars.push(
                    <svg key={i} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                );
            }
        }
        return stars;
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-slide-down">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">{t('teacher.teacherList')}</h2>
                    <p className="text-slate-600 mt-1">
                        {teachers.length > 0 ? (
                            <>
                                {t('teacher.subtitle')} • Showing {startIndex + 1}-{Math.min(endIndex, teachers.length)} of {teachers.length} teachers
                            </>
                        ) : (
                            t('teacher.subtitle')
                        )}
                    </p>
                </div>
                <button
                    onClick={onAddTeacher}
                    className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    <svg
                        className="w-5 h-5 transition-transform group-hover:rotate-90 duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                    {t('teacher.addTeacher')}
                </button>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden animate-slide-up hover:shadow-xl transition-shadow duration-300">
                {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                                    {t('teacher.name')}
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                                    {t('teacher.subject')}
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                                    {t('teacher.location')}
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                                    {t('teacher.rating')}
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                                    {t('teacher.fee')}
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                                    {t('teacher.actions')}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {currentTeachers.map((teacher, index) => (
                                <tr
                                    key={teacher.id}
                                    className="hover:bg-slate-50 transition-all duration-300 group animate-fade-in-row hover:scale-[1.01] hover:shadow-sm"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3 transform group-hover:scale-110 transition-transform duration-200 animate-pulse-slow">
                                                {teacher.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                                                    {teacher.name}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 transform group-hover:scale-105 transition-transform duration-200 animate-bounce-subtle">
                                            {teacher.subject}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center text-sm text-slate-600">
                                            <svg className="w-4 h-4 mr-1 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                            </svg>
                                            {teacher.location}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-1 transform group-hover:scale-105 transition-transform duration-200">
                                            <div className="flex items-center">
                                                {renderStars(teacher.rating)}
                                            </div>
                                            <span className="text-sm font-medium text-slate-900 ml-2">
                                                {teacher.rating}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg inline-block transform group-hover:scale-105 transition-all duration-200 hover:bg-emerald-100 animate-glow">
                                            {teacher.fee}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => onEditTeacher(teacher)}
                                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-110 hover:shadow-md animate-wiggle"
                                            >
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                {t('common.edit')}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-4 p-4">
                    {currentTeachers.map((teacher, index) => (
                        <div
                            key={teacher.id}
                            className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] animate-slide-in-left"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold mr-3 transform hover:scale-110 transition-transform duration-200 animate-pulse-slow">
                                        {teacher.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">{teacher.name}</h3>
                                        <p className="text-sm text-slate-600 flex items-center mt-1">
                                            <svg className="w-3 h-3 mr-1 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                            </svg>
                                            {teacher.location}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-bold text-emerald-600 animate-pulse-green">{teacher.fee}</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 animate-bounce-subtle">
                                    {teacher.subject}
                                </span>
                                <div className="flex items-center space-x-3">
                                    <div className="flex items-center space-x-1">
                                        <div className="flex items-center">
                                            {renderStars(teacher.rating)}
                                        </div>
                                        <span className="text-sm font-medium text-slate-900 ml-1">
                                            {teacher.rating}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => onEditTeacher(teacher)}
                                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-110 hover:shadow-md animate-wiggle"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        {t('common.edit')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {teachers.length === 0 && (
                    <div className="text-center py-12 animate-fade-in">
                        <svg className="w-16 h-16 text-slate-300 mx-auto mb-4 animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                        <h3 className="text-lg font-medium text-slate-900 mb-2">No teachers found</h3>
                        <p className="text-slate-600 mb-4">Get started by adding your first teacher to the directory</p>
                        <button
                            onClick={onAddTeacher}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-md animate-bounce-subtle"
                        >
                            Add First Teacher
                        </button>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {teachers.length > itemsPerPage && (
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 px-6 py-4 animate-slide-up">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        {/* Page Info */}
                        <div className="text-sm text-slate-600">
                            Showing <span className="font-medium text-slate-900">{startIndex + 1}</span> to{' '}
                            <span className="font-medium text-slate-900">{Math.min(endIndex, teachers.length)}</span> of{' '}
                            <span className="font-medium text-slate-900">{teachers.length}</span> results
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex items-center space-x-2">
                            {/* Previous Button */}
                            <button
                                onClick={handlePrevious}
                                disabled={currentPage === 1}
                                className={`p-2 rounded-lg border transition-all duration-200 ${currentPage === 1
                                        ? 'border-slate-200 text-slate-400 cursor-not-allowed'
                                        : 'border-slate-300 text-slate-600 hover:bg-slate-50 hover:border-slate-400 transform hover:scale-105'
                                    }`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            {/* Page Numbers */}
                            <div className="flex items-center space-x-1">
                                {getPageNumbers().map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 ${currentPage === page
                                                ? 'bg-blue-600 text-white shadow-lg animate-pulse-button'
                                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            {/* Next Button */}
                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                className={`p-2 rounded-lg border transition-all duration-200 ${currentPage === totalPages
                                        ? 'border-slate-200 text-slate-400 cursor-not-allowed'
                                        : 'border-slate-300 text-slate-600 hover:bg-slate-50 hover:border-slate-400 transform hover:scale-105'
                                    }`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Table