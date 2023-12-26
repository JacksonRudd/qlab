import { Explanation } from "../Explanation";
import { QuestionData } from "../QuestionData";

export interface IQuizProvider {
  getExplanation: (
    question: string,
    userAnswer: string
  ) => Promise<Explanation>;
  getQuestion: (
    topic: string,
    mode: string,
    previousQuestions: string[]
  ) => Promise<QuestionData>;
}
