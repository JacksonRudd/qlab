import React, { useState } from "react";

interface QuestionProps {
  title: string;
  content: string;
  processUserAnswer: (answer: string) => void;
}

function Question({ title, content, processUserAnswer }: QuestionProps) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // This will prevent the default form submission behavior
    processUserAnswer(answer);
  };

  return (
    <div className="container my-4">
      <h1 className="mb-3">{title}</h1>
      <p className="mb-3">{content}</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Question;
