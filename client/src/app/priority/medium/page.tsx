import { Priority } from "@/types";
import ReusablePriorityPage from "../reusablePriorityPage";

const urgent = () => {
  return (
    <div>
      <ReusablePriorityPage priority={Priority.Medium} />
    </div>
  );
};

export default urgent;
