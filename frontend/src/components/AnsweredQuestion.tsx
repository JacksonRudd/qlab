import { AnsweredQuestionsParams } from "./AnsweredQuestionsParams";

function AnsweredQuestion(props: AnsweredQuestionsParams) {
  return (
    <div>
      <p>
        <b>Question:</b> {props.question}
      </p>
      <p>
        <b>Your Answer:</b> {props.answer} (
        {props.is_correct ? "Correct" : "Incorrect"})
      </p>
    </div>
  );
}

export default AnsweredQuestion;
