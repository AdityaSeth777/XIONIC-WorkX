export interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  duration: number;
  client_address: string;
  freelancer_address: string | null;
  created_at: string;
  status: 'open' | 'in_progress' | 'completed';
  tags: string[];
}

export interface WalletState {
  address: string | null;
  balance: string | null;
  isConnecting: boolean;
  error: string | null;
}