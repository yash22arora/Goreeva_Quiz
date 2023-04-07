import ShortUniqueId from "short-unique-id";
import { IQuestion } from "./components/Edit/types";

const uid = new ShortUniqueId({ length: 10 });

export const DUMMY_QUESTIONS: IQuestion[] = [
  {
    prompt: "What is the capital of India?",
    answers: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
    correctAnswer: "Delhi",
    id: uid(),
  },
  {
    prompt: "Which is not a neighbouring country to India?",
    answers: ["Pakistan", "Nepal", "China", "Japan"],
    correctAnswer: "Japan",
    id: uid(),
  },
  {
    prompt: "Which is the largest country in the world?",
    answers: ["Russia", "China", "India", "USA"],
    correctAnswer: "Russia",
    id: uid(),
  },
  {
    prompt: "Which is the largest city in the world?",
    answers: ["Tokyo", "New York", "Delhi", "Shanghai"],
    correctAnswer: "Shanghai",
    id: uid(),
  },
];
