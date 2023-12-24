import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Quiz from "./components/Quiz";
import getProviders from "./providers/axios_provider";
import Question from "./components/Question";

const url = "https://qlwebapp.azurewebsites.net/";
const { sendAnswer, fetchQuestion } = getProviders(url);

function App() {
  const [topic, setTopic] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const topicFromURL = urlParams.get("topic");
    if (topicFromURL) {
      setTopic(topicFromURL);
    }
  }, []);

  const updateTopic = (newTopic: string) => {
    setTopic(newTopic);
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("topic", newTopic);
    window.history.pushState(null, "", "?" + queryParams.toString());
  };

  return (
    <>
      <Navbar />
      {topic == null && (
        <Question
          title={"Choose your topic."}
          content={"Put any topic you want to be tested on."}
          processUserAnswer={updateTopic}
        />
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
