import { useGetTasksQuery, useUpdateTaskStatusMutation } from "@/state/api";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { Task as TaskType } from "@/types";
import { EllipsisVertical, Plus } from "lucide-react";
import { format } from "date-fns";

type BoardViewProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];

const BoardView = ({ id, setIsModalNewTaskOpen }: BoardViewProps) => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });

  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  console.log(tasks);

  const moveTask = (taskId: number, toStatus: string) => {
    updateTaskStatus({ taskId, status: toStatus });
  };

  if (isLoading) return <div>Loading..</div>;
  if (error) return <div>An error occurred while fetching tasks</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
        {taskStatus.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks || []}
            moveTask={moveTask}
            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          />
        ))}
      </div>
    </DndProvider>
  );
};

type TaskColumnProps = {
  status: string;
  tasks: TaskType[];
  moveTask: (taskId: number, toStatus: string) => void;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const TaskColumn = ({
  status,
  tasks,
  moveTask,
  setIsModalNewTaskOpen,
}: TaskColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: number }) => moveTask(item.id, status),
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const taskCountStatus = tasks.filter((task) => task.status === status).length;

  const statusColor: any = {
    "To Do": "#2563EB",
    "Work In Progress": "#059669",
    "Under Review": "#D97706",
    Completed: "#000000",
  };

  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`rounded-lg py-2 xl:px-2 xl:py-4 border${isOver ? "bg-blue-100 dark:bg-neutral-950" : ""}`}
    >
      <div className="mb-3 flex w-full shadow-sm">
        <div
          className={`w-2 !bg-[${statusColor[status]}] rounded-s-lg`}
          style={{ backgroundColor: statusColor[status] }}
        />

        <div className="dark:bg-darksec flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4">
          <h1 className="flex items-center gap-3 text-lg font-semibold dark:text-white">
            {status}{" "}
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-sm text-white bg-[${statusColor[status]}]`}
              style={{ backgroundColor: statusColor[status] }}
            >
              {taskCountStatus}
            </span>
          </h1>

          <div className="flex items-center gap-2">
            <button className="cursor-pointer">
              <EllipsisVertical size={20} />
            </button>

            <button className="dark:bg-darkbg flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg bg-gray-200 shadow">
              <Plus size={18} />
            </button>
          </div>
        </div>
      </div>

      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <Task key={task.id} task={task} />
        ))}
    </div>
  );
};

type TaskProps = {
  task: TaskType;
};

const Task = ({ task }: TaskProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging,
    }),
  }));

  const taskTagsSplit = task.tags ? task.tags.split(",") : [];
  const formattedStartDate = task.startDate ? format(task.startDate, "P") : "";
  const formattedDueDate = task.dueDate ? format(task.dueDate, "P") : "";
  const numberOfComments = (task.comments && task.comments.length) || 0;

  const PriorityTag = ({ priority }: { priority: TaskType["priority"] }) => {
    return (
      <div
        className={`rounded-full px-1 py-2 text-xs font-semibold ${
          priority === "Urgent"
            ? "bg-red-200 text-red-700"
            : priority === "High"
              ? "bg-yellow-200 text-yellow-700"
              : priority === "Medium"
                ? "bg-green-200 text-green-700"
                : priority === "Low"
                  ? "bg-blue-200 text-blue-700"
                  : "bg-gray-200 text-gray-700"
        }`}
      >
        {priority}
      </div>
    );
  };

  return <div></div>;
};

export default BoardView;
