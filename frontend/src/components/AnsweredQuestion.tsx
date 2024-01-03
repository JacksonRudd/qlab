import { AnsweredQuestionsParams } from "./AnsweredQuestionsParams";

function AnsweredQuestion(props: AnsweredQuestionsParams) {
  const answerBackgroundStyle = {
    backgroundColor: "#000000", // Black background for container
    color: "#00FF00", // Green text color for the terminal theme
    padding: "10px",
    borderRadius: "5px",
    paddingBottom: "10px",
    fontFamily: "Courier New, monospace", // Monospaced font for the terminal look
  };

  const yourAnswerStyle = {
    color: props.is_correct ? "#00FF00" : "red", // Green for correct, red for incorrect
  };

  return (
    <div style={answerBackgroundStyle}>
      <p>
        <b>Question:</b> {props.question}
      </p>
      <div>
        <p style={yourAnswerStyle}>
          <b>Your Answer:</b> {props.answer} (
          {props.is_correct ? "Correct" : "Incorrect"})
        </p>
        <p>
          <b>AI Answer:</b> {props.ai_answer}
        </p>
      </div>
    </div>
  );
}

export default AnsweredQuestion;
