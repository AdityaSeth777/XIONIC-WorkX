import React from 'react';
import { ArrowRight, Shield, Zap, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-8">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Decentralized Gig Economy
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Connect with top talent globally, secure payments with smart contracts, and build your reputation on the blockchain.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/create-project"
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium flex items-center gap-2"
          >
            Post a Project <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/projects"
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium flex items-center gap-2"
          >
            Find Work <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <div className="feature-card">
          <Shield className="w-12 h-12 text-blue-400" />
          <h3 className="text-xl font-semibold">Secure Escrow</h3>
          <p className="text-gray-400">
            Smart contract-based escrow ensures safe and transparent payments
          </p>
        </div>
        <div className="feature-card">
          <Zap className="w-12 h-12 text-blue-400" />
          <h3 className="text-xl font-semibold">Instant Payments</h3>
          <p className="text-gray-400">
            Get paid instantly in XION tokens when milestones are completed
          </p>
        </div>
        <div className="feature-card">
          <RefreshCw className="w-12 h-12 text-blue-400" />
          <h3 className="text-xl font-semibold">Decentralized Reputation</h3>
          <p className="text-gray-400">
            Build your reputation on-chain with verifiable project completions
          </p>
        </div>
      </section>
    </div>
  );
}