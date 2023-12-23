import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Question from "./components/Question";
import { fetchData } from "./providers/api";
import Answer from "./components/Answer";

interface QuestionData {
  content: string;
}

const get_question = (topic: string) =>
  fetchData("http://localhost:8080/question/" + topic)("");

interface Explanation {
  explanation: string;
  is_correct: boolean;
}

const get_explanation = async (
  question: string,
  user_answer: string
): Promise<Explanation> => {
  return {
    is_correct: true,
    explanation: `You answered ${user_answer}, and that is correct for all kinds of reasons to the question ${question}.`,
  };
};

function App() {
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [useranswer, setUserAnswer] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isUserCorrect, setCorrect] = useState<boolean | null>(null);

  let topic = "airplanes";
  useEffect(() => {
    get_question(topic)
      .then((data) => {
        setQuestionData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSubmit = (answer: string) => {
    setUserAnswer(answer);
    if (questionData) {
      // Get the explanation
      get_explanation(questionData?.content, answer).then(
        (data: Explanation) => {
          setCorrect(data.is_correct);
          setExplanation(data.explanation);
        }
      );
    }
  };

  return (
    <>
      <Navbar />
      {questionData && (
        <Question
          title={"Question"}
          content={questionData.content}
          processUserAnswer={handleSubmit}
        />
      )}

      {explanation && isUserCorrect && (
        <Answer explanation={explanation} isCorrect={isUserCorrect}></Answer>
      )}
    </>
  );
}

export default App;
