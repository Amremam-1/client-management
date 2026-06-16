import { Priority } from "@/types";
import ReusablePriorityPage from "../reusablePriorityPage";

const high = () => {
  return (
    <div>
      <ReusablePriorityPage priority={Priority.Low} />
    </div>
  );
};

export default high;
