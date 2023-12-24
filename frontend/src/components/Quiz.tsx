import { useEffect, useState } from "react";
import { Explanation } from "../Explanation";
import { QuestionData } from "../QuestionData";
import Question from "./Question";
import Answer from "./Answer";

interface QuizProps {
  topic: string;
  get_question: (topic: string) => Promise<QuestionData>;
  get_explanation: (
    question: string,
    user_answer: string
  ) => Promise<Explanation>;
}

function Quiz({ get_question, get_explanation, topic }: QuizProps) {
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isUserCorrect, setCorrect] = useState<boolean | null>(null);
  const [isLoadingAnswer, setLoadingAnswer] = useState(false);
  const [isLoadingQuestion, setLoadingQuestion] = useState(false);

  const get_next_question = () => {
    setLoadingQuestion(true);
    setQuestionData(null);
    get_question(topic)
      .then((data) => {
        setQuestionData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
    setCorrect(null);
    setLoadingAnswer(false);
    setExplanation(null);
    setLoadingQuestion(false);
  };

  useEffect(() => {
    get_next_question();
  }, []);

  const handleSubmit = (answer: string) => {
    setLoadingAnswer(true);
    if (questionData && questionData.content) {
      // Get the explanation
      get_explanation(questionData.content, answer).then(
        (data: Explanation) => {
          setCorrect(data.is_correct);
          setExplanation(data.explanation);
          setLoadingAnswer(false);
        }
      );
    }
  };

  return (
    <>
      {isLoadingQuestion && <h1>Loading... </h1>}
      {questionData && (
        <Question
          title={"Question"}
          content={questionData.content}
          processUserAnswer={handleSubmit}
        />
      )}
      {isLoadingAnswer && <div className="loading-icon">Loading...</div>}

      {explanation != null && isUserCorrect != null && (
        <>
          <Answer explanation={explanation} isCorrect={isUserCorrect}></Answer>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={get_next_question}
          >
            Next
          </button>
        </>
      )}
    </>
  );
}

export default Quiz;
