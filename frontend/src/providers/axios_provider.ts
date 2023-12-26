import { Explanation } from "../Explanation";
import axios, { AxiosResponse } from "axios";
import { QuestionData } from "../QuestionData";
import { IQuizProvider } from "./IProvider";

// Define the function as an arrow function with proper parameter types and return type.
const getProviders = (url: string): IQuizProvider => {
  // Define the functions inside the getProviders function.
  // This ensures they have access to the 'url' parameter.

  // Function to send an answer and get an explanation.
  async function sendAnswer(
    question: string,
    useranswer: string
  ): Promise<Explanation> {
    try {
      const response: AxiosResponse = await axios.post(`${url}/explanation`, {
        question,
        useranswer,
      });
      console.log(`${url}/explanation`);
      return {
        is_correct: response.data.is_correct,
        explanation: response.data.explanation,
      };
    } catch (error) {
      // Handle error here if needed.
      throw error;
    }
  }

  // Function to fetch a question.
  async function fetchQuestion(
    topic: string,
    mode: string,
    previousQuestions: string[]
  ): Promise<QuestionData> {
    try {
      console.log(mode);
      const response: AxiosResponse = await axios.post(`${url}/question`, {
        topic: topic,
        mode: mode,
        previous_questions: previousQuestions,
      });
      console.log(`POST request sent to ${url}/question with topic: ${topic}`);
      return { content: response.data.content };
    } catch (error) {
      // Handle error here if needed.
      throw error;
    }
  }

  // Export the functions.
  return {
    getExplanation: sendAnswer,
    getQuestion: fetchQuestion,
  };
};

export default getProviders;
