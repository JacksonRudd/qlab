interface AnswerParams {
  useranswer: string;
  explanation: string;
  isCorrect: boolean;
}

function Answer({ useranswer, explanation, isCorrect }: AnswerParams) {
  return (
    <div>
      <h2>{"Correct :)" ? isCorrect : "Incorrect :("}</h2>
      <h3>You answered</h3>
      <p>{useranswer}</p>
      <h3>Explanation</h3>
      <p>{explanation}</p>
      <button type="button" className="btn btn-primary">
        Next
      </button>
    </div>
  );
}

export default Answer;
