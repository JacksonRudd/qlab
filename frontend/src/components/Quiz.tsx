import { useEffect, useState } from "react";
import { Explanation } from "../Explanation";
import { QuestionData } from "../QuestionData";
import Question from "./Question";
import Answer from "./Answer";
import SideBar from "./Sidebar";
import { AnsweredQuestionsParams } from "./AnsweredQuestionsParams";
import { IQuizProvider } from "../providers/IProvider";

interface QuizProps {
  topic: string;
  provider: IQuizProvider;
  mode: "party" | "scholar";
}

function Quiz({ provider, topic, mode }: QuizProps) {
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isUserCorrect, setCorrect] = useState<boolean | null>(null);
  const [isLoadingAnswer, setLoadingAnswer] = useState(false);
  const [isLoadingQuestion, setLoadingQuestion] = useState(false);
  const [history, setHistory] = useState<Array<AnsweredQuestionsParams>>([]);

  const get_next_question = () => {
    setLoadingQuestion(true);
    provider
      .getQuestion(
        topic,
        mode,
        history.map((item) => item.question)
      )
      .then((data) => {
        setQuestionData(data);
        setLoadingQuestion(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
    setCorrect(null);
    setExplanation(null);
  };

  useEffect(() => {
    get_next_question();
  }, []);

  const handleSubmit = (answer: string) => {
    setLoadingAnswer(true);
    if (questionData && questionData.content) {
      provider
        .getExplanation(questionData.content, answer)
        .then((data: Explanation) => {
          setCorrect(data.is_correct);
          setExplanation(data.explanation);
          setLoadingAnswer(false);
          setHistory((prevHistory) => {
            const newEntry: AnsweredQuestionsParams = {
              question: questionData.content,
              answer: answer,
              is_correct: data.is_correct,
              ai_answer: data.explanation,
            };
            return [...prevHistory, newEntry];
          });
        });
    }
  };

  return (
    <div className="container-fluid">
      {/* Use Bootstrap container */}
      <div className="row">
        {/* Bootstrap row to define a new line */}
        <div className="col-md-8">
          <h1>{mode === "scholar" ? "🧠" : "🎉"}</h1>

          {/* Main content area */}
          {isLoadingQuestion ? (
            <h1>Loading...</h1>
          ) : (
            <>
              {questionData && (
                <Question
                  title={topic}
                  content={questionData.content}
                  processUserAnswer={handleSubmit}
                  mode={mode}
                />
              )}
              {isLoadingAnswer && (
                <div className="loading-icon">Loading...</div>
              )}
              {explanation != null && isUserCorrect != null && (
                <>
                  <Answer
                    explanation={explanation}
                    isCorrect={isUserCorrect}
                  ></Answer>
                  <button
                    type="submit"
                    className={`btn btn-primary`}
                    onClick={get_next_question}
                  >
                    Next
                  </button>
                </>
              )}
            </>
          )}
        </div>
        {<SideBar answeredQuestions={history} />}
      </div>
    </div>
  );
}

export default Quiz;
