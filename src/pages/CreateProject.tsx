import React from 'react';
import { Send } from 'lucide-react';

export function CreateProject() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create New Project</h1>
      
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Project Title
          </label>
          <input
            type="text"
            className="input w-full"
            placeholder="Enter project title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            className="input w-full h-32"
            placeholder="Describe your project requirements"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Budget (XION)
          </label>
          <input
            type="number"
            className="input w-full"
            placeholder="Enter budget in XION"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Duration (in days)
          </label>
          <input
            type="number"
            className="input w-full"
            placeholder="Estimated project duration"
          />
        </div>

        <button
          type="submit"
          className="w-full btn btn-primary flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          Post Project
        </button>
      </form>
    </div>
  );
}