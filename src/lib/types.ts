export interface MetaAccount {
  id: string;
  email: string;
  username: string | null;
  avatar_url: string | null;
  reputation_score: number;
  completed_projects: number;
  active_projects: number;
  total_earnings: number;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  duration: number;
  client_id: string;
  freelancer_id: string | null;
  created_at: string;
  status: 'open' | 'in_progress' | 'completed';
  tags: string[];
}

export interface AuthState {
  user: MetaAccount | null;
  isLoading: boolean;
  error: string | null;
}