import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { apiGet, getUser, removeToken } from '../api';
import { useNavigate } from 'react-router-dom';
import { UserRound, Mail, ShieldCheck, LogOut } from 'lucide-react';
import type { User } from '../types';

export default function Profile() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Quick local load
    const localUser = getUser();
    if (localUser) {
      setProfileData(localUser);
    }
    
    // Always fetch fresh profile
    const fetchProfile = async () => {
      try {
        const response = await apiGet('/auth/profile');
        const data = await response.json();
        
        if (response.ok && data.data) {
          setProfileData(data.data);
        }
      } catch (error) {
        console.error("Error fetching profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    removeToken();
    navigate('/');
  };

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 shadow-md">
        <Navbar />
      </div>

      <div className="flex pt-16 h-screen">
        {/* Sidebar */}
        <div className="fixed left-0 top-16 h-full w-64 bg-white shadow-lg z-40">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="ml-64 flex-1 overflow-y-auto p-10">
          
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
              My Profile
            </h1>

            {loading && !profileData ? (
               <div className="flex justify-center p-10">
                 <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
               </div>
            ) : profileData ? (
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Header Banner */}
                <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                
                <div className="px-8 pb-8 relative">
                  {/* Avatar Avatar */}
                  <div className="absolute -top-16 left-8 bg-white p-2 rounded-full shadow-lg inline-block">
                    <div className="bg-blue-100 p-6 rounded-full">
                      <UserRound size={48} className="text-blue-600" />
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex justify-end pt-4 mb-4">
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 px-5 py-2.5 rounded-xl font-medium transition"
                    >
                      <LogOut size={18} />
                      Log out
                    </button>
                  </div>
                  
                  {/* Profile Info */}
                  <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">
                      {profileData.name}
                    </h2>
                    
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-8">
                      <ShieldCheck size={16} />
                      {profileData.role}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl">
                      <div>
                        <p className="text-sm text-gray-500 font-medium mb-1">Email Address</p>
                        <div className="flex items-center gap-2 text-gray-800 font-medium">
                          <Mail size={18} className="text-gray-400" />
                          {profileData.email}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500 font-medium mb-1">Account ID</p>
                        <div className="text-gray-800 font-mono text-sm break-all">
                          {profileData._id}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 p-6 rounded-2xl text-red-600 text-center">
                Failed to load profile data.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}