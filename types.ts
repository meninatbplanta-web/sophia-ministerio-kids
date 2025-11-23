export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option (0-3)
  explanation: string;
}

export interface QuizData {
  questions: QuizQuestion[];
}

export enum AppView {
  HOME = 'HOME',
  STORY = 'STORY',
  QUIZ = 'QUIZ',
  GAMES_HUB = 'GAMES_HUB',
  MEMORY_GAME = 'MEMORY_GAME',
  JOURNEY = 'JOURNEY',
  ACTIVITIES = 'ACTIVITIES',
  PROFILE = 'PROFILE',
  LOGIN = 'LOGIN'
}

export interface StoryResponse {
  title: string;
  content: string;
  moral: string;
}

export interface UserProfile {
  name: string;
  avatar: string;
  points: number;
  level: number;
  badges: string[];
  completedStories: number;
}