import AnsweredQuestion from "./AnsweredQuestion";
import { SideBarProps } from "./SideBarProps";

function SideBar({ answeredQuestions }: SideBarProps) {
  const percentageTrue = answeredQuestions.map(x => x.is_correct)
    .reduce((acc, curr) => acc + (curr ? 1 : 0), 0) / answeredQuestions.length * 100;

  return (
    <div className="col-md-4">
      {answeredQuestions.length >0 && <h3>Percent Correct: {percentageTrue}%</h3>}
      <div className="history-sidebar sticky-top">
        {answeredQuestions.map((item, index) => (
          <AnsweredQuestion key={index} {...item} />
        ))}
      </div>
    </div>
  );
}

export default SideBar;
