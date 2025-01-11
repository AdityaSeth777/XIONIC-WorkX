import React from 'react';
import { Search } from 'lucide-react';

export function Projects() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Available Projects</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search projects..."
            className="input pl-10 w-64"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="grid gap-6">
        {/* Sample projects - will be populated from Supabase */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold mb-2">Web3 Marketplace Development</h3>
                <p className="text-gray-400 mb-4">
                  Looking for an experienced developer to build a decentralized marketplace with smart contract integration.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm">
                    Smart Contracts
                  </span>
                  <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm">
                    React
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-blue-400">5,000 XION</div>
                <div className="text-sm text-gray-400">Est. 2 months</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}