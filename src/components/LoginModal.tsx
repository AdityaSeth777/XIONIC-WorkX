import React, { useState } from 'react';
import { X, Mail } from 'lucide-react';
import { useAuth } from '../context/WalletContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { auth, signIn } = useAuth();
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email);
    if (!auth.error) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Sign in with XION Meta</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input w-full pl-10"
                placeholder="Enter your email"
                required
              />
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {auth.error && (
            <p className="text-red-400 text-sm">{auth.error}</p>
          )}

          <button
            type="submit"
            disabled={auth.isLoading}
            className="w-full btn btn-primary"
          >
            {auth.isLoading ? 'Sending link...' : 'Continue with Email'}
          </button>

          <p className="text-sm text-gray-400 text-center">
            We'll send you a magic link to sign in instantly
          </p>
        </form>
      </div>
    </div>
  );
}