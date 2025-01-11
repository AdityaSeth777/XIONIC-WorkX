import React from 'react';
import { Link } from 'react-router-dom';
import { Blocks, Plus, User, Home } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Blocks className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold">XION Market</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link to="/" className="nav-link">
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link to="/projects" className="nav-link">
              <Blocks className="w-5 h-5" />
              <span>Projects</span>
            </Link>
            <Link to="/create-project" className="nav-link">
              <Plus className="w-5 h-5" />
              <span>Create</span>
            </Link>
            <Link to="/profile" className="nav-link">
              <User className="w-5 h-5" />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}