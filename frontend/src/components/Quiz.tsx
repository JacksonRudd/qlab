import { useEffect, useState } from "react";
import { Explanation } from "../Explanation";
import { QuestionData } from "../QuestionData";
import Question from "./Question";
import Answer from "./Answer";

interface QuizProps {
  get_question: (topic: string) => Promise<QuestionData>;
  get_explanation: (
    question: string,
    user_answer: string
  ) => Promise<Explanation>;
}

function Quiz({ get_question, get_explanation }: QuizProps) {
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

export default Quiz;
