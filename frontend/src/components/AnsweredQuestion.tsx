import { AnsweredQuestionsParams } from "./AnsweredQuestionsParams";

function AnsweredQuestion(props: AnsweredQuestionsParams) {
  const answerBackgroundStyle = {
    backgroundColor: props.is_correct ? 'lightgreen' : 'pink', // light green for correct, pink for incorrect
    padding: '10px', // Add some padding for better visual appeal
    borderRadius: '5px', // Optional: rounds the corners for a smoother look
    borderBottom: '2px solid gray', // Adds a solid gray border at the bottom
    paddingBottom: '10px', // Padding below the text, above the border
  };



  return (
    <div style={answerBackgroundStyle}>
      <p>
        <b>Question:</b> {props.question}
      </p>
      <div >
        <p>
          <b>Your Answer:</b> {props.answer} (
          {props.is_correct ? "Correct" : "Incorrect"})
        </p>
        <p>
        <b>AI Answer:</b> {props.ai_answer} </p>
      </div>
    </div>
  );
}


export default AnsweredQuestion;