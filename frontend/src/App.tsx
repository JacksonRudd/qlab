import "./App.css";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Quiz from "./components/Quiz";
import getProviders from "./providers/axios_provider";
import { useState } from "react";
import Question from "./components/Question";

const url = "http://localhost:8080";
const { sendAnswer, fetchQuestion } = getProviders(url);

function App() {
  const [topic, setTopic] = useState<string | null>(null);

  return (
    <>
      <Navbar />
      {topic == null && (
        <Question
          title={"Choose your topic."}
          content={"Put any topic you want to be tested on."}
          processUserAnswer={setTopic}
        ></Question>
      )}
      {topic && (
        <Quiz
          get_question={fetchQuestion}
          get_explanation={sendAnswer}
          topic={topic}
        />
      )}
    </>
  );
}

export default App;
