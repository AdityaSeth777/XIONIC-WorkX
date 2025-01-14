import React from 'react';
import { Mail, Star, Clock, CheckCircle, User } from 'lucide-react';
import { useAuth } from '../context/WalletContext';
import { LoginModal } from '../components/LoginModal';

export function Profile() {
  const { auth, signOut } = useAuth();
  const [showLoginModal, setShowLoginModal] = React.useState(false);

  if (auth.isLoading) {
    return <div className="text-center">Loading profile...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center">
            {auth.user?.avatar_url ? (
              <img
                src={auth.user.avatar_url}
                alt={auth.user.username || 'Profile'}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <User className="w-12 h-12 text-blue-400" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {auth.user ? auth.user.username || auth.user.email : 'Guest User'}
            </h1>
            <div className="flex items-center gap-2 text-gray-400">
              <Mail className="w-4 h-4" />
              <span>{auth.user?.email || 'Not signed in'}</span>
            </div>
            {auth.user && (
              <div className="flex items-center gap-2 mt-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400">{auth.user.reputation_score.toFixed(1)}</span>
                <span className="text-gray-400">
                  ({auth.user.completed_projects} projects)
                </span>
              </div>
            )}
          </div>
          <button 
            className="btn btn-primary ml-auto"
            onClick={() => auth.user ? signOut() : setShowLoginModal(true)}
          >
            {auth.user ? 'Sign Out' : 'Sign In'}
          </button>
        </div>
      </div>

      {auth.user ? (
        <>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <h3 className="text-lg font-semibold">Completed Projects</h3>
              </div>
              <p className="text-3xl font-bold">{auth.user.completed_projects}</p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-semibold">Active Projects</h3>
              </div>
              <p className="text-3xl font-bold">{auth.user.active_projects}</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-semibold">Total Earned</h3>
              </div>
              <p className="text-3xl font-bold">{auth.user.total_earnings} XION</p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {/* We'll fetch this data from Supabase in a future update */}
              <div className="text-gray-400 text-center py-4">
                No recent activity
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-400">Sign in to view your profile and activity</p>
          <button
            onClick={() => setShowLoginModal(true)}
            className="btn btn-primary mt-4"
          >
            Sign In
          </button>
        </div>
      )}

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}