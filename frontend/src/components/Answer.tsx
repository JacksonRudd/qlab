interface AnswerParams {
  explanation: string;
  isCorrect: boolean;
}

function Answer({ explanation, isCorrect }: AnswerParams) {
  const headingStyle = {
    color: isCorrect ? "green" : "red",
    fontSize: "1.5em",
    fontWeight: "bold",
  };

  const explanationStyle = {
    fontSize: "1em",
    lineHeight: "1.5",
    marginTop: "10px",
  };

  const containerStyle = {
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#f3f3f3",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={containerStyle}>
      <h3 style={headingStyle}>{isCorrect ? "Correct" : "Incorrect"}</h3>
      <p style={explanationStyle}>{explanation}</p>
    </div>
  );
}

export default Answer;
