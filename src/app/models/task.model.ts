export interface Task {
  id?: string;
  title: string;
  description: string;
  status: 'pending' | 'completed' | 'in-progress';
  createdAt?: Date;
  userId?: string;
}
