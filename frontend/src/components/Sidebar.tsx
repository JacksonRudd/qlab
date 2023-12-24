import AnsweredQuestion from "./AnsweredQuestion";
import { SideBarProps } from "./SideBarProps";

function SideBar({ answeredQuestions }: SideBarProps) {
  return (
    <div className="col-md-4">
      <div className="history-sidebar sticky-top">
        <h2>Previous Questions:</h2>
        {answeredQuestions.map((item, index) => (
          <AnsweredQuestion key={index} {...item} />
        ))}
      </div>
    </div>
  );
}

export default SideBar;
