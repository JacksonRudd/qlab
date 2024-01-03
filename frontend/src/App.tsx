import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Quiz from "./components/Quiz";
import getProviders from "./providers/axios_provider";
import Question from "./components/Question";

interface AppParams {
  url: string;
}

function App({ url }: AppParams) {
  const [topic, setTopic] = useState<string | null>(null);
  const [mode, setMode] = useState<"party" | "scholar">("party");

  // Check the Url for the topc
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const topicFromURL = urlParams.get("topic");
    const modeFromUrl = window.location.pathname.replace(/^\//, "");
    if (topicFromURL) {
      setTopic(topicFromURL);
    }
    if (modeFromUrl === "party" || modeFromUrl === "scholar") {
      setMode(modeFromUrl);
    } else {
      setMode("party");
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
      {/* {hack for input, change later} */}
      {topic == null && (
        <>
          <Question
            title={"Choose your topic."}
            content={"Put any topic you want to be tested on."}
            processUserAnswer={updateTopic}
            mode={mode}
          />
        </>
      )}
      {topic && mode && (
        <Quiz provider={getProviders(url)} topic={topic} mode={mode} />
      )}
    </>
  );
}

export default App;
