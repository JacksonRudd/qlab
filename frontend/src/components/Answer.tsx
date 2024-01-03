interface AnswerParams {
  explanation: string;
  isCorrect: boolean;
}

function Answer({ explanation, isCorrect }: AnswerParams) {
  const headingStyle = {
    color: isCorrect ? "#00FF00" : "red", // Green for correct, red for incorrect
    fontSize: "1.5em",
    fontWeight: "bold",
    fontFamily: "Courier New, monospace", // Monospaced font
  };

  const explanationStyle = {
    color: "#00FF00", // Green text for explanation
    fontSize: "1em",
    lineHeight: "1.5",
    marginTop: "10px",
    fontFamily: "Courier New, monospace", // Monospaced font
  };

  const containerStyle = {
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#000000", // Black background for container
    boxShadow: "0px 2px 4px rgba(0, 255, 0, 0.4)", // Slight green glow for shadow
    border: "1px solid #00FF00", // Green border for the container
  };

  return (
    <div style={containerStyle}>
      <h3 style={headingStyle}>{isCorrect ? "Correct" : "Incorrect"}</h3>
      <p style={explanationStyle}>{explanation}</p>
    </div>
  );
}

export default Answer;
