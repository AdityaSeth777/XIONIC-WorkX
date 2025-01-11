import React from 'react';
import { Wallet, Star, Clock, CheckCircle } from 'lucide-react';

export function Profile() {
  return (
    <div className="space-y-8">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">John Doe</h1>
            <p className="text-gray-400">Full Stack Blockchain Developer</p>
            <div className="flex items-center gap-2 mt-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400">4.9</span>
              <span className="text-gray-400">(24 reviews)</span>
            </div>
          </div>
          <button className="btn btn-primary ml-auto">
            <Wallet className="w-5 h-5 mr-2" />
            Connect Wallet
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <h3 className="text-lg font-semibold">Completed Projects</h3>
          </div>
          <p className="text-3xl font-bold">18</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-semibold">Active Projects</h3>
          </div>
          <p className="text-3xl font-bold">3</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Wallet className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-semibold">Total Earned</h3>
          </div>
          <p className="text-3xl font-bold">25,420 XION</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-0">
              <div>
                <h4 className="font-medium">NFT Marketplace Development</h4>
                <p className="text-sm text-gray-400">Milestone 2 completed</p>
              </div>
              <div className="text-right">
                <div className="font-medium text-blue-400">+1,500 XION</div>
                <div className="text-sm text-gray-400">2 days ago</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}