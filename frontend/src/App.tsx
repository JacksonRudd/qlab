import "./App.css";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Quiz from "./components/Quiz";
import getProviders from "./providers/axios_provider";

// const get_question = (topic: string): Promise<QuestionData> => {
//   return fetchData("http://localhost:8080/question/" + topic)("");
// };

// const get_explanation = async (
//   question: string,
//   user_answer: string
// ): Promise<Explanation> => {
//   return {
//     is_correct: true,
//     explanation: `You answered '${user_answer}', and that is correct for all kinds of reasons to the question '${question}'.`,
//   };
// };

// const mock_get_explanation = async (
//   question: string,
//   user_answer: string
// ): Promise<Explanation> => {
//   return {
//     is_correct: true,
//     explanation: `You answered '${user_answer}', and that is correct for all kinds of reasons to the question '${question}'.`,
//   };
// };
const url = "http://localhost:8080";
const { sendAnswer, fetchQuestion } = getProviders(url);

function App() {
  return (
    <>
      <Navbar />
      <Quiz get_question={fetchQuestion} get_explanation={sendAnswer} />
    </>
  );
}

export default App;
