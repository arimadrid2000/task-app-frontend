export interface Task {
  id?: string;
  title: string;
  description: string;
  status: 'pendiente' | 'completado';
  createdAt?: Date;
  userId?: string;
}
