export type Role = 'student' | 'admin' | 'staff';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  roll_no?: string;
}

export interface Complaint {
  id: number;
  user_id: number;
  category: string;
  description: string;
  status: 'pending' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  image_url?: string;
  created_at: string;
  student_name?: string;
  staff_id?: number;
  staff_name?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}
