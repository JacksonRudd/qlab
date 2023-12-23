import "./App.css";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchData } from "./providers/api";
import { QuestionData } from "./QuestionData";
import { Explanation } from "./Explanation";
import Quiz from "./components/Quiz";

const get_question = (topic: string): Promise<QuestionData> => {
  return fetchData("http://localhost:8080/question/" + topic)("");
};

const get_explanation = async (
  question: string,
  user_answer: string
): Promise<Explanation> => {
  return {
    is_correct: true,
    explanation: `You answered '${user_answer}', and that is correct for all kinds of reasons to the question '${question}'.`,
  };
};

function App() {
  return (
    <>
      <Navbar />
      <Quiz get_question={get_question} get_explanation={get_explanation} />
    </>
  );
}

export default App;
