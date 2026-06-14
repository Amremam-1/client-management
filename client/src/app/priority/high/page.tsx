import { Priority } from "@/types";
import ReusablePriorityPage from "../reusablePriorityPage";

const high = () => {
  return (
    <div>
      <ReusablePriorityPage priority={Priority.High} />
    </div>
  );
};

export default high;
