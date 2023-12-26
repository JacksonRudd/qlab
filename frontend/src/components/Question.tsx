import React, { useState } from "react";

interface QuestionProps {
  title: string;
  content: string;
  processUserAnswer: (answer: string) => void;
  mode: "party" | "scholar";
}

function Question({ title, content, processUserAnswer, mode }: QuestionProps) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents default form submission behavior
    processUserAnswer(answer);
  };

  // Use textarea for scholar mode and input for party mode
  const inputField =
    mode === "scholar" ? (
      <textarea
        className="form-control"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer here"
        rows={4} // You can adjust the number of rows
      />
    ) : (
      <input
        type="text"
        className="form-control"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer here"
      />
    );

  return (
    <div className="container my-4">
      <h1>{mode === "scholar" ? "🧠" : "🎉"}</h1>
      <h1 className="mb-3">{title}</h1>
      <p className="mb-3">{content}</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">{inputField}</div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Question;
