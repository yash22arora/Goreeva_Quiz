export interface IQuestion {
  id: number;
  prompt: string;
  answers: string[];
  correctAnswer: string;
}

export interface IQuestionProps {
  question: IQuestion;
  onEdit?: (question: IQuestion) => void;
  onDelete?: (id: number) => void;
  isEdit?: boolean;
}

export interface IOptionProps {
  id: number;
  option: string;
  selected?: boolean;
  onSelect?: () => void;
  isEdit?: boolean;
}
