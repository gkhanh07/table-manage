import React from 'react'
import { useForm } from 'react-hook-form'
import { useLanguage } from '../contexts/LanguageContext'

const AddForm = ({ teacher, onAddTeacher, onCancel, isEditing = false }) => {
    const { t } = useLanguage();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: isEditing ? {
            name: teacher?.name || '',
            subject: teacher?.subject || '',
            location: teacher?.location || '',
            rating: teacher?.rating || '',
            fee: teacher?.fee ? teacher.fee.replace(/^\$(\d+(?:\.\d{2})?)\/hour$/, '$1') : ''
        } : {}
    })

    const onSubmit = async (data) => {
        try {
            // Add the new teacher (API will generate ID)
            if (onAddTeacher) {
                await onAddTeacher({
                    ...data,
                    rating: parseFloat(data.rating),
                    fee: `$${parseFloat(data.fee).toFixed(2)}/hour`
                })
            }
            // Reset form after successful submission
            reset()
        } catch (error) {
            console.error('Error adding teacher:', error)
        }
    }

    const handleCancel = () => {
        reset()
        if (onCancel) {
            onCancel()
        }
    }

    return (
        <div className="relative bg-white rounded-2xl animate-fade-in shadow-2xl transform">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl px-8 py-6 animate-slide-down">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            {isEditing ? t('teacher.editTeacher') : t('teacher.addTeacher')}
                        </h2>
                        <p className="text-blue-100 mt-1">{t('teacher.subtitle')}</p>
                    </div>
                    <button
                        onClick={handleCancel}
                        className="text-blue-100 hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-white/10 transform hover:scale-110 hover:rotate-90"
                        aria-label="Close modal"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Form Content */}
            <div className="px-8 py-6 animate-slide-up">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name Field */}
                    <div className="space-y-2 animate-fade-in-row" style={{ animationDelay: '0.1s' }}>
                        <label htmlFor="name" className="block text-sm font-semibold text-slate-700 animate-bounce-subtle">
                            {t('teacher.name')} *
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="name"
                                {...register('name', {
                                    required: t('form.nameRequired'),
                                    minLength: {
                                        value: 2,
                                        message: 'Name must be at least 2 characters'
                                    }
                                })}
                                className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 transform hover:scale-[1.02] focus:scale-[1.02] ${errors.name
                                    ? 'border-red-300 focus:border-red-400 animate-shake'
                                    : 'border-slate-200 focus:border-blue-400 hover:border-slate-300'
                                    }`}
                                placeholder={t('form.enterName')}
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-slate-400 animate-pulse-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        </div>
                        {errors.name && (
                            <p className="text-sm text-red-600 flex items-center mt-1">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Subject Field */}
                    <div className="space-y-2 animate-fade-in-row" style={{ animationDelay: '0.2s' }}>
                        <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 animate-bounce-subtle">
                            {t('teacher.subject')} *
                        </label>
                        <div className="relative">
                            <select
                                id="subject"
                                {...register('subject', {
                                    required: t('form.subjectRequired')
                                })}
                                className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 appearance-none bg-white transform hover:scale-[1.02] focus:scale-[1.02] ${errors.subject
                                    ? 'border-red-300 focus:border-red-400 animate-shake'
                                    : 'border-slate-200 focus:border-blue-400 hover:border-slate-300'
                                    }`}
                            >
                                <option value="">{t('form.selectSubject')}</option>
                                <option value="Mathematics">{t('subjects.mathematics')}</option>
                                <option value="English Literature">{t('subjects.english')}</option>
                                <option value="Physics">{t('subjects.physics')}</option>
                                <option value="Chemistry">{t('subjects.chemistry')}</option>
                                <option value="Biology">{t('subjects.biology')}</option>
                                <option value="Computer Science">{t('subjects.computerScience')}</option>
                                <option value="History">{t('subjects.history')}</option>
                                <option value="Geography">{t('subjects.geography')}</option>
                                <option value="Art">{t('subjects.art')}</option>
                                <option value="Music">{t('subjects.music')}</option>
                                <option value="Physical Education">Physical Education</option>
                                <option value="Other">Other</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        {errors.subject && (
                            <p className="text-sm text-red-600 flex items-center mt-1">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.subject.message}
                            </p>
                        )}
                    </div>

                    {/* Location Field */}
                    <div className="space-y-2 animate-fade-in-row" style={{ animationDelay: '0.3s' }}>
                        <label htmlFor="location" className="block text-sm font-semibold text-slate-700 animate-bounce-subtle">
                            {t('teacher.location')} *
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="location"
                                {...register('location', {
                                    required: 'Location is required',
                                    minLength: {
                                        value: 2,
                                        message: 'Location must be at least 2 characters'
                                    }
                                })}
                                className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 transform hover:scale-[1.02] focus:scale-[1.02] ${errors.location
                                    ? 'border-red-300 focus:border-red-400 animate-shake'
                                    : 'border-slate-200 focus:border-blue-400 hover:border-slate-300'
                                    }`}
                                placeholder="Enter city or area"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        {errors.location && (
                            <p className="text-sm text-red-600 flex items-center mt-1">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.location.message}
                            </p>
                        )}
                    </div>

                    {/* Rating Field */}
                    <div className="space-y-2 animate-fade-in-row" style={{ animationDelay: '0.4s' }}>
                        <label htmlFor="rating" className="block text-sm font-semibold text-slate-700 animate-bounce-subtle">
                            {t('teacher.rating')} *
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                id="rating"
                                step="0.1"
                                min="1"
                                max="5"
                                {...register('rating', {
                                    required: 'Rating is required',
                                    min: {
                                        value: 1,
                                        message: 'Rating must be at least 1'
                                    },
                                    max: {
                                        value: 5,
                                        message: 'Rating cannot exceed 5'
                                    },
                                    validate: {
                                        range: value => {
                                            const num = parseFloat(value);
                                            return (num >= 1 && num <= 5) || 'Rating must be between 1 and 5';
                                        }
                                    }
                                })}
                                onInput={(e) => {
                                    const value = parseFloat(e.target.value);
                                    if (value > 5) e.target.value = 5;
                                    if (value < 1) e.target.value = 1;
                                }}
                                className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 transform hover:scale-[1.02] focus:scale-[1.02] ${errors.rating
                                    ? 'border-red-300 focus:border-red-400 animate-shake'
                                    : 'border-slate-200 focus:border-blue-400 hover:border-slate-300'
                                    }`}
                                placeholder="1.0 - 5.0"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-amber-400 animate-pulse-gold" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                        </div>
                        {errors.rating && (
                            <p className="text-sm text-red-600 flex items-center mt-1">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.rating.message}
                            </p>
                        )}
                    </div>

                    {/* Fee Field */}
                    <div className="space-y-2 animate-fade-in-row" style={{ animationDelay: '0.5s' }}>
                        <label htmlFor="fee" className="block text-sm font-semibold text-slate-700 animate-bounce-subtle">
                            Fee ($/hour) *
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                id="fee"
                                min="0"
                                step="0.01"
                                {...register('fee', {
                                    required: 'Fee is required',
                                    min: {
                                        value: 0,
                                        message: 'Fee must be a positive number'
                                    }
                                })}
                                className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 transform hover:scale-[1.02] focus:scale-[1.02] ${errors.fee
                                    ? 'border-red-300 focus:border-red-400 animate-shake'
                                    : 'border-slate-200 focus:border-blue-400 hover:border-slate-300'
                                    }`}
                                placeholder="50"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-emerald-500 animate-pulse-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                        </div>
                        {errors.fee && (
                            <p className="text-sm text-red-600 flex items-center mt-1">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.fee.message}
                            </p>
                        )}
                    </div>

                    {/* Form Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200 animate-fade-in-row" style={{ animationDelay: '0.6s' }}>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`flex-1 py-3 px-6 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 animate-pulse-button ${isSubmitting
                                ? 'bg-slate-400 cursor-not-allowed transform-none'
                                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl animate-glow'
                                }`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {t('common.loading')}
                                </span>
                            ) : (
                                t('teacher.addTeacher')
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex-1 py-3 px-6 border-2 border-slate-300 rounded-xl text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-200 transition-all duration-200 transform hover:scale-105"
                        >
                            {t('common.cancel')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddForm