
export enum AppView {
  HOME = 'home',
  TUTOR = 'tutor',
  MODULES = 'modules',
  SIMULATOR = 'simulator',
  CREATOR = 'creator',
  ADMIN = 'admin'
}

export interface Comment {
  id: string;
  userName: string;
  content: string;
  timestamp: Date;
  likes: number;
}

export interface Creator {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  stats: {
    students: number;
    courses: number;
    rating: number;
  };
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  fullContent?: string;
  icon: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  topics: string[];
  comments: Comment[];
  instructor?: string;
}
