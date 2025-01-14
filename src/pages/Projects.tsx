import React, { useEffect, useState } from 'react';
import { Search, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/WalletContext';
import { PaymentModal } from '../components/PaymentModal';
import type { Project } from '../lib/types';

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { auth } = useAuth();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error loading projects:', error);
      alert('Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = (project: Project) => {
    if (!auth.user) {
      alert('Please sign in first');
      return;
    }
    setSelectedProject(project);
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="text-center">Loading projects...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Available Projects</h1>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search projects..."
            className="input pl-10 w-64"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="grid gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-blue-400">{project.budget} XION</div>
                <div className="text-sm text-gray-400">Est. {project.duration} days</div>
                {project.status === 'open' && auth.user && auth.user.id !== project.client_id && (
                  <button
                    onClick={() => handleApply(project)}
                    className="btn btn-primary mt-4 flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Apply
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredProjects.length === 0 && (
          <div className="text-center text-gray-400">
            No projects found
          </div>
        )}
      </div>

      {selectedProject && (
        <PaymentModal
          isOpen={true}
          onClose={() => setSelectedProject(null)}
          recipientAddress={selectedProject.client_id}
          amount={selectedProject.budget.toString()}
          projectTitle={selectedProject.title}
        />
      )}
    </div>
  );
}