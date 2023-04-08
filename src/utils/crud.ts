import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase.config";
import { TQuizData } from "../components/Create/BasicsForm/types";
import { IQuestion } from "../components/Edit/types";

export const getQuiZDatafromFirestore = async (quizId: string) => {
  const docRef = doc(db, "quizzes", quizId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as TQuizData;
  } else {
    return null;
  }
};

export const updateQuestionsonFirestore = async (
  quizId: string,
  questions: IQuestion[]
) => {
  const docRef = doc(db, "quizzes", quizId);
  return updateDoc(docRef, { questions: questions });
};
