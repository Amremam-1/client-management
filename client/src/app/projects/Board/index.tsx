import { useGetTasksQuery, useUpdateTaskStatusMutation } from "@/state/api";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { Task as TaskType } from "@/types";
import {
  CalendarDays,
  CalendarRange,
  EllipsisVertical,
  MessageSquare,
  Plus,
} from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";

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
      className={`rounded-lg py-2 shadow-2xl xl:px-2 xl:py-4 ${isOver ? "bg-blue-100 dark:bg-neutral-950" : ""}`}
    >
      <div className="mb-3 flex w-full shadow-sm">
        <div
          className={`w-2 rounded-s-lg`}
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
            {/* <button className="cursor-pointer">
              <EllipsisVertical size={20} />
            </button> */}

            <button
              onClick={() => setIsModalNewTaskOpen(true)}
              className="dark:bg-darkbg flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg bg-gray-200 shadow"
            >
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
  const formattedStartDate = task.startDate
    ? format(task.startDate, "MMM dd")
    : "";
  const formattedDueDate = task.dueDate ? format(task.dueDate, "MMM dd") : "";
  const numberOfComments = (task.comments && task.comments.length) || 0;

  const PriorityTag = ({ priority }: { priority: TaskType["priority"] }) => {
    return (
      <span
        className={`rounded px-2.5 py-1 text-xs font-medium ${
          priority === "Urgent"
            ? "bg-red-500/15 text-red-500"
            : priority === "High"
              ? "bg-orange-500/15 text-orange-500"
              : priority === "Medium"
                ? "bg-yellow-500/15 text-yellow-500"
                : priority === "Low"
                  ? "bg-blue-500/15 text-blue-500"
                  : "bg-neutral-500/15 text-neutral-500"
        }`}
      >
        {priority}
      </span>
    );
  };
  return (
    <div
      ref={(instance) => {
        drag(instance);
      }}
      className={`dark:bg-darksec mb-4 rounded-md bg-white shadow ${isDragging ? "opacity-70" : "opacity-100"}`}
    >
      {task.attachments && task.attachments.length > 0 && (
        <Image
          src={`/${task.attachments[0].fileURL}`}
          alt={task.attachments[0].fileName || ""}
          width={400}
          height={200}
          loading="lazy"
          className="h-auto w-full rounded-t-md object-cover"
        />
      )}

      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {task.priority && <PriorityTag priority={task.priority} />}

            <div className="flex gap-2">
              {taskTagsSplit.map((tag) => (
                <div
                  key={tag}
                  className="rounded bg-gray-600/40 px-2.5 py-1 text-xs"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <button className="flex h-6 w-4 items-center justify-center dark:text-neutral-500">
            <EllipsisVertical size={26} />
          </button>
        </div>

        <div className="my-3 flex items-center justify-between">
          <h4 className="line-clamp-2 text-base font-semibold">{task.title}</h4>

          {typeof task.points === "number" && (
            <div className="text-xs font-semibold">{task.points} Pts</div>
          )}
        </div>

        <p className="mt-2 text-sm">{task.description}</p>

        <div className="flex items-center justify-between pt-4 dark:border-neutral-700">
          <div className="flex items-center gap-2">
            <CalendarDays size={14} className="text-slate-500" />
            <span className="text-xs text-slate-500">
              {task.startDate && formattedStartDate}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <CalendarRange size={14} className="text-slate-500" />
            <span className="text-xs text-slate-500">
              {task.dueDate && formattedDueDate}
            </span>
          </div>
        </div>

        <div className="dark:border-stroke-dark my-4 border-t border-gray-400" />

        {/* User */}

        <div className="flex items-center justify-between">
          <div className="flex -space-x-3 overflow-hidden">
            {task.assignee && (
              <Image
                src={`/${task.assignee.profilePictureUrl}`}
                alt={task.assignee.username || ""}
                width={30}
                height={30}
                loading="lazy"
                className="dark:border-darkbg h-8 w-8 rounded-full border-2 border-white object-cover"
              />
            )}
            {task.author && (
              <Image
                src={`/${task.author.profilePictureUrl}`}
                alt={task.author.username || ""}
                width={30}
                height={30}
                loading="lazy"
                className="dark:border-darkbg h-8 w-8 rounded-full border-2 border-white object-cover"
              />
            )}
          </div>

          <div className="flex items-center gap-1 text-gray-500 dark:text-neutral-500">
            <MessageSquare size={18} />
            <span className="">{numberOfComments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardView;
