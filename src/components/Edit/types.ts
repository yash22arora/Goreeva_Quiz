export interface IQuestion {
  id: string;
  prompt: string;
  answers: string[];
  correctAnswer: string;
}

export interface IQuestionProps {
  question: IQuestion;
  onEdit?: (question: IQuestion) => void;
  onDelete?: (id: string) => void;
  isEdit?: boolean;
  error?: string | undefined;
  onSelectAnswer?: (answer: string) => void;
}

export interface IOptionProps {
  id: number;
  option: string;
  selected?: boolean;
  onSelect?: () => void;
  isEdit?: boolean;
  onEdit?: (option: string) => void;
}
