import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Question from "./components/Quiz";
import { fetchData } from "./providers/api";
import Answer from "./components/Answer";

interface QuestionData {
  title: string;
  content: string;
}

function App() {
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);

  useEffect(() => {
    fetchData("http://localhost:8080/question")("")
      .then((data) => {
        setQuestionData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle the submission logic here
    console.log("Submitted Answer:", event);
  };

  return (
    <>
      <Navbar />
      {questionData && (
        <Question
          title={"Question"}
          content={questionData.content}
          handleSubmit={handleSubmit}
        />
      )}
      <Answer
        useranswer={"My answer"}
        explanation={"Your answer is wrong"}
        isCorrect={true}
      ></Answer>
    </>
  );
}

export default App;
