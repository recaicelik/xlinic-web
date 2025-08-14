'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

// Custom Date Picker Component
const CustomDatePicker = ({ value, onChange, disabled, placeholder }: {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);

  // Close calendar when disabled
  useEffect(() => {
    if (disabled && isOpen) {
      setIsOpen(false);
    }
  }, [disabled, isOpen]);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const today = new Date();

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
    onChange(newDate.toISOString().split('T')[0]);
    setIsOpen(false);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(today);
  };

  const monthNames = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];

  const dayNames = ['Pzr', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];

  return (
    <div className="relative">
      <input
        type="text"
        value={value ? new Date(value).toLocaleDateString('tr-TR') : ''}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        readOnly
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600 text-base ${
          disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
        }`}
        style={{ minHeight: '48px' }}
      />
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 w-80">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              ←
            </button>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900 dark:text-white">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <button
                onClick={goToToday}
                className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Bugün
              </button>
            </div>
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              →
            </button>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-1 p-2">
            {dayNames.map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 p-2">
            {/* Previous month days */}
            {Array.from({ length: firstDayOfMonth }, (_, i) => (
              <div key={`prev-${i}`} className="text-center text-gray-400 dark:text-gray-600 py-2">
                {new Date(currentDate.getFullYear(), currentDate.getMonth(), -firstDayOfMonth + i + 1).getDate()}
              </div>
            ))}
            
            {/* Current month days */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
              const isSelected = selectedDate && 
                selectedDate.getDate() === day && 
                selectedDate.getMonth() === currentDate.getMonth() && 
                selectedDate.getFullYear() === currentDate.getFullYear();
              const isToday = today.getDate() === day && 
                today.getMonth() === currentDate.getMonth() && 
                today.getFullYear() === currentDate.getFullYear();
              
              return (
                <button
                  key={day}
                  onClick={() => handleDateSelect(day)}
                  className={`text-center py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors ${
                    isSelected 
                      ? 'bg-blue-600 text-white' 
                      : isToday 
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold'
                        : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {day}
                </button>
              );
            })}
            
            {/* Next month days */}
            {Array.from({ length: 42 - firstDayOfMonth - daysInMonth }, (_, i) => (
              <div key={`next-${i}`} className="text-center text-gray-400 dark:text-gray-600 py-2">
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, updateProfile, logout } = useAuth();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    height: '',
    weight: ''
  });

  const [healthData, setHealthData] = useState({
    bloodType: '',
    allergies: '',
    chronicConditions: '',
    medications: '',
    familyHistory: '',
    lifestyle: {
      smoking: '',
      alcohol: '',
      exercise: '',
      diet: ''
    },
    medicalHistory: '',
    currentSymptoms: '',
    lastCheckup: '',
    insuranceProvider: ''
  });



  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || '',
        height: user.height || '',
        weight: user.weight || ''
      });
      
      setHealthData({
        bloodType: user.bloodType || '',
        allergies: user.allergies || '',
        chronicConditions: user.chronicConditions || '',
        medications: user.medications || '',
        familyHistory: user.familyHistory || '',
        lifestyle: {
          smoking: user.lifestyle?.smoking || '',
          alcohol: user.lifestyle?.alcohol || '',
          exercise: user.lifestyle?.exercise || '',
          diet: user.lifestyle?.diet || ''
        },
        medicalHistory: user.medicalHistory || '',
        currentSymptoms: user.currentSymptoms || '',
        lastCheckup: user.lastCheckup || '',
        insuranceProvider: user.insuranceProvider || ''
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleHealthDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('lifestyle.')) {
      const lifestyleField = name.split('.')[1];
      setHealthData(prev => ({
        ...prev,
        lifestyle: {
          ...prev.lifestyle,
          [lifestyleField]: value
        }
      }));
    } else {
      setHealthData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSaveProfile = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update profile logic would go here
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };



  const handleDeleteAccount = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      logout();
      router.push('/');
      toast.success('Account deleted successfully');
    } catch (error) {
      toast.error('Failed to delete account');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-200 dark:bg-gray-900 flex items-center justify-center">
        <div className="auth-loading"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const tabs = [
    { id: 'profile', name: 'Profile Information', icon: '👤' },
    { id: 'health', name: 'Health Information', icon: '🏥' },
    { id: 'preferences', name: 'Preferences', icon: '⚙️' },
    { id: 'account', name: 'Account Management', icon: '🛠️' }
  ];

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Page Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Profile Settings ⚙️
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account information and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span className="font-medium">{tab.name}</span>
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Profile Information
                    </h2>
                    <motion.button
                      onClick={() => setIsEditing(!isEditing)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600 ${
                          !isEditing ? 'cursor-not-allowed opacity-60' : ''
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600 ${
                          !isEditing ? 'cursor-not-allowed opacity-60' : ''
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600 ${
                          !isEditing ? 'cursor-not-allowed opacity-60' : ''
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Date of Birth
                      </label>
                      <CustomDatePicker
                        value={formData.dateOfBirth}
                        onChange={(value) => setFormData({ ...formData, dateOfBirth: value })}
                        disabled={!isEditing}
                        placeholder="Doğum tarihinizi seçin"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600 ${
                          !isEditing ? 'cursor-not-allowed opacity-60' : ''
                        }`}
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Height (cm)
                      </label>
                      <input
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600 ${
                          !isEditing ? 'cursor-not-allowed opacity-60' : ''
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600 ${
                          !isEditing ? 'cursor-not-allowed opacity-60' : ''
                        }`}
                      />
                    </div>


                  </div>

                  {isEditing && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 flex justify-end space-x-4"
                    >
                      <motion.button
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        onClick={handleSaveProfile}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Save Changes
                      </motion.button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {activeTab === 'health' && (
                <motion.div
                  key="health"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Health Information
                    </h2>
                    <motion.button
                      onClick={() => setIsEditing(!isEditing)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isEditing ? 'Cancel' : 'Edit Health Info'}
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Health Info */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Blood Type
                      </label>
                                             <select
                         name="bloodType"
                         value={healthData.bloodType}
                         onChange={handleHealthDataChange}
                         disabled={!isEditing}
                         className={`w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600 ${
                           !isEditing ? 'cursor-not-allowed opacity-60' : ''
                         }`}
                       >
                        <option value="">Select blood type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>

                                         <div>
                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                         Last Checkup Date
                       </label>
                       <CustomDatePicker
                         value={healthData.lastCheckup}
                         onChange={(value) => setHealthData({ ...healthData, lastCheckup: value })}
                         disabled={!isEditing}
                         placeholder="Son kontrol tarihini seçin"
                       />
                     </div>

                    {/* Lifestyle Section */}
                    <div className="md:col-span-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Lifestyle Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Smoking Status
                          </label>
                                                     <select
                             name="lifestyle.smoking"
                             value={healthData.lifestyle.smoking}
                             onChange={handleHealthDataChange}
                             disabled={!isEditing}
                             className={`w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600 ${
                               !isEditing ? 'cursor-not-allowed opacity-60' : ''
                             }`}
                           >
                            <option value="">Select status</option>
                            <option value="never">Never smoked</option>
                            <option value="former">Former smoker</option>
                            <option value="current">Current smoker</option>
                            <option value="occasional">Occasional smoker</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Alcohol Consumption
                          </label>
                                                     <select
                             name="lifestyle.alcohol"
                             value={healthData.lifestyle.alcohol}
                             onChange={handleHealthDataChange}
                             disabled={!isEditing}
                             className={`w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600 ${
                               !isEditing ? 'cursor-not-allowed opacity-60' : ''
                             }`}
                           >
                            <option value="">Select frequency</option>
                            <option value="never">Never</option>
                            <option value="rarely">Rarely</option>
                            <option value="moderate">Moderate</option>
                            <option value="frequent">Frequent</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Exercise Frequency
                          </label>
                                                     <select
                             name="lifestyle.exercise"
                             value={healthData.lifestyle.exercise}
                             onChange={handleHealthDataChange}
                             disabled={!isEditing}
                             className={`w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600 ${
                               !isEditing ? 'cursor-not-allowed opacity-60' : ''
                             }`}
                           >
                            <option value="">Select frequency</option>
                            <option value="never">Never</option>
                            <option value="rarely">Rarely (1-2 times/month)</option>
                            <option value="sometimes">Sometimes (1-2 times/week)</option>
                            <option value="regular">Regular (3-4 times/week)</option>
                            <option value="daily">Daily</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Diet Type
                          </label>
                                                     <select
                             name="lifestyle.diet"
                             value={healthData.lifestyle.diet}
                             onChange={handleHealthDataChange}
                             disabled={!isEditing}
                             className={`w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600 ${
                               !isEditing ? 'cursor-not-allowed opacity-60' : ''
                             }`}
                           >
                            <option value="">Select diet</option>
                            <option value="omnivore">Omnivore</option>
                            <option value="vegetarian">Vegetarian</option>
                            <option value="vegan">Vegan</option>
                            <option value="keto">Keto</option>
                            <option value="paleo">Paleo</option>
                            <option value="mediterranean">Mediterranean</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Medical Information */}
                    <div className="md:col-span-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Medical Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Allergies
                          </label>
                                                     <textarea
                             name="allergies"
                             value={healthData.allergies}
                             onChange={handleHealthDataChange}
                             disabled={!isEditing}
                             rows={3}
                             placeholder="List any allergies (food, medication, environmental)"
                             className={`w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600 resize-none ${
                               !isEditing ? 'cursor-not-allowed opacity-60' : ''
                             }`}
                           />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Chronic Conditions
                          </label>
                                                     <textarea
                             name="chronicConditions"
                             value={healthData.chronicConditions}
                             onChange={handleHealthDataChange}
                             disabled={!isEditing}
                             rows={3}
                             placeholder="List any chronic health conditions"
                             className={`w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600 resize-none ${
                               !isEditing ? 'cursor-not-allowed opacity-60' : ''
                             }`}
                           />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Current Medications
                          </label>
                          <textarea
                            name="medications"
                            value={healthData.medications}
                            onChange={handleHealthDataChange}
                            disabled={!isEditing}
                            rows={3}
                            placeholder="List current medications and dosages"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600 resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Family Medical History
                          </label>
                          <textarea
                            name="familyHistory"
                            value={healthData.familyHistory}
                            onChange={handleHealthDataChange}
                            disabled={!isEditing}
                            rows={3}
                            placeholder="Relevant family medical history"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600 resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Past Medical History
                          </label>
                          <textarea
                            name="medicalHistory"
                            value={healthData.medicalHistory}
                            onChange={handleHealthDataChange}
                            disabled={!isEditing}
                            rows={3}
                            placeholder="Significant past medical events, surgeries, hospitalizations"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600 resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Current Symptoms
                          </label>
                          <textarea
                            name="currentSymptoms"
                            value={healthData.currentSymptoms}
                            onChange={handleHealthDataChange}
                            disabled={!isEditing}
                            rows={3}
                            placeholder="Any current symptoms or concerns"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600 resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Insurance Provider
                          </label>
                          <input
                            type="text"
                            name="insuranceProvider"
                            value={healthData.insuranceProvider}
                            onChange={handleHealthDataChange}
                            disabled={!isEditing}
                            placeholder="Insurance company name"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 flex justify-end space-x-4"
                    >
                      <motion.button
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        onClick={handleSaveProfile}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Save Changes
                      </motion.button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {activeTab === 'preferences' && (
                <motion.div
                  key="preferences"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Preferences
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Receive updates about your health reports</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">SMS Notifications</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Get important alerts via SMS</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>


                  </div>
                </motion.div>
              )}

              {activeTab === 'account' && (
                <motion.div
                  key="account"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Account Management
                  </h2>

                  <div className="space-y-6">
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <h3 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">
                        Export Data
                      </h3>
                      <p className="text-yellow-700 dark:text-yellow-300 text-sm mb-4">
                        Download all your health data and reports in a secure format.
                      </p>
                      <motion.button
                        className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Export Data
                      </motion.button>
                    </div>

                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <h3 className="font-medium text-red-900 dark:text-red-100 mb-2">
                        Delete Account
                      </h3>
                      <p className="text-red-700 dark:text-red-300 text-sm mb-4">
                        This action cannot be undone. All your data will be permanently deleted.
                      </p>
                      <motion.button
                        onClick={() => setIsDeletingAccount(true)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Delete Account
                      </motion.button>
                    </div>
                  </div>

                  {/* Delete Account Confirmation Modal */}
                  <AnimatePresence>
                    {isDeletingAccount && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                      >
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.9, opacity: 0 }}
                          className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4"
                        >
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            Delete Account
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Are you sure you want to delete your account? This action cannot be undone.
                          </p>
                          <div className="flex justify-end space-x-4">
                            <motion.button
                              onClick={() => setIsDeletingAccount(false)}
                              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Cancel
                            </motion.button>
                            <motion.button
                              onClick={handleDeleteAccount}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Delete
                            </motion.button>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

