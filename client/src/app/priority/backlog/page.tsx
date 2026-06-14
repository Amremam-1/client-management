import { Priority } from "@/types";
import ReusablePriorityPage from "../reusablePriorityPage";

const backlog = () => {
  return (
    <div>
      <ReusablePriorityPage priority={Priority.Backlog} />
    </div>
  );
};

export default backlog;
