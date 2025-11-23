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
}

export interface StoryResponse {
  title: string;
  content: string;
  moral: string;
}
