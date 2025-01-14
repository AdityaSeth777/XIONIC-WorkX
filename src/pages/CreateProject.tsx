import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/WalletContext';

export function CreateProject() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    duration: '',
    tags: ['Smart Contracts', 'React']
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.user) {
      alert('Please sign in first');
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([
          {
            title: formData.title,
            description: formData.description,
            budget: parseFloat(formData.budget),
            duration: parseInt(formData.duration),
            client_id: auth.user.id,
            tags: formData.tags,
            status: 'open'
          }
        ])
        .select()
        .single();

      if (error) throw error;
      navigate('/projects');
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create New Project</h1>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Project Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input w-full"
            placeholder="Enter project title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input w-full h-32"
            placeholder="Describe your project requirements"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Budget (XION)
          </label>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="input w-full"
            placeholder="Enter budget in XION"
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Duration (in days)
          </label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="input w-full"
            placeholder="Estimated project duration"
            required
            min="1"
          />
        </div>

        <button
          type="submit"
          className="w-full btn btn-primary flex items-center justify-center gap-2"
          disabled={isSubmitting || !auth.user}
        >
          <Send className="w-5 h-5" />
          {isSubmitting ? 'Creating...' : 'Post Project'}
        </button>

        {!auth.user && (
          <p className="text-yellow-400 text-sm text-center">
            Please sign in to create a project
          </p>
        )}
      </form>
    </div>
  );
}