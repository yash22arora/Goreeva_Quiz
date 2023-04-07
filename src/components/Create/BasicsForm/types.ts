import { IQuestion } from "../../Edit/types";

export type TBasicQuestionInfo = {
  quizName: string;
  quizDescription: string;
  correctMarks: number;
  incorrectMarks: number;
  timeLimit: number;
};

export interface TQuizData extends TBasicQuestionInfo {
  questions: IQuestion[];
  id: string;
}
