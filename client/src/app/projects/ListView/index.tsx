import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import { useGetTasksQuery } from "@/state/api";
import { Task } from "@/types";

type ListProps = {
  id: string;
  setIsmodalNewTaskOpen: (isOpen: boolean) => void;
};

const List = ({ id, setIsmodalNewTaskOpen }: ListProps) => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) return <div>Loading..</div>;
  if (error) return <div>An error occurred while fetching tasks</div>;

  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header name="List View" />
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:gap-6">
        {tasks?.map((task: Task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default List;
