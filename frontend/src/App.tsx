import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Question from "./components/Question";
import { fetchData } from "./providers/api";
import Answer from "./components/Answer";

interface QuestionData {
  title: string;
  content: string;
}

function App() {
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [useranswer, setUserAnswer] = useState<string | null>(null);
  let topic = "airplanes";
  useEffect(() => {
    fetchData("http://localhost:8080/question/" + topic)("")
      .then((data) => {
        setQuestionData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSubmit = (answer: string) => {
    setUserAnswer(answer);
    fetchData("http://localhost:8080/explanation/<useranswer>");
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

      {useranswer && (
        <Answer
          explanation={"Moscow is indeed the captial of Russia"}
          isCorrect={true}
        ></Answer>
      )}
    </>
  );
}

export default App;
