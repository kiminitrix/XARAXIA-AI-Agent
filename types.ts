
export enum TaskStatus {
  PENDING = 'Pending',
  RUNNING = 'Running',
  COMPLETED = 'Completed',
  FAILED = 'Failed',
  WAITING_APPROVAL = 'Waiting Approval'
}

export interface AgentStep {
  id: string;
  action: string;
  status: 'pending' | 'running' | 'done' | 'error';
  timestamp: number;
  details?: string;
}

export interface Task {
  id: string;
  title: string;
  prompt: string;
  status: TaskStatus;
  createdAt: number;
  completedAt?: number;
  steps: AgentStep[];
  result?: string;
  category: string;
}

export interface KnowledgeItem {
  id: string;
  name: string;
  type: 'file' | 'link';
  size?: string;
  addedAt: number;
  content?: string;
}

export interface UserStats {
  activeTasks: number;
  completedTasks: number;
  creditsRemaining: number;
  timeSaved: string;
}
