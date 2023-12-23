import { Explanation } from "../Explanation";
import axios, { AxiosResponse } from "axios";
import { QuestionData } from "../QuestionData";

// Define the function as an arrow function with proper parameter types and return type.
const getProviders = (url: string) => {
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
  async function fetchQuestion(topic: string): Promise<QuestionData> {
    try {
      const response: AxiosResponse = await axios.get(
        `${url}/question/${topic}`
      );
      console.log(`${url}/question/${topic}`);
      return { content: response.data.content };
    } catch (error) {
      // Handle error here if needed.
      throw error;
    }
  }

  // Export the functions.
  return {
    sendAnswer,
    fetchQuestion,
  };
};

export default getProviders;
