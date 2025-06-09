// types/survey.ts
export interface Survey {
  id: number;
  title: string;
  activity: string;
  code: string;
  participants: number;
  responses: number;
  status: string;
  statusColor: 'red' | 'green' | 'orange';
  description: string;
  option: string;
  dateCreation: string;
}

export interface Question {
  id: number;
  type: 'text' | 'choice' | 'scale' | 'yesno';
  question: string;
  options?: string[];
  responses?: Record<string, number>;
}

export interface QuestionType {
  id: string;
  name: string;
  icon: string;
}

export interface OptionDetail {
  question: string;
  questionNumber: number;
  option: string;
  count: number;
  percentage: number;
  totalResponses: number;
}
