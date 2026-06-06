"use client";
import { useGetTasksQuery } from "@/state/api";
import { useMemo, useState } from "react";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { useAppSelector } from "@/app/redux";
import { Plus } from "lucide-react";

type TimeLineProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

type TaskTypeItems = "task" | "milestone" | "project";

const TimeLine = ({ id, setIsModalNewTaskOpen }: TimeLineProps) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });

  const [displayOptions, setIsDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  //   to display data for gantt to understand this data
  const ganttTasks = useMemo(() => {
    return (
      tasks?.map((task) => ({
        start: new Date(task.startDate as string),
        end: new Date(task.dueDate as string),
        name: task.title,
        id: `Task-${task.id}`,
        type: "task" as TaskTypeItems,
        progress: task.points ? (Number(task.points) / 10) * 100 : 0,
        isDisabled: false,
      })) || []
    );
  }, [tasks]);

  //   When selcted Mode (Day or  Week Or Month as default)
  const handleViewModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setIsDisplayOptions((prevOptions) => ({
      ...prevOptions,
      viewMode: event.target.value as ViewMode,
    }));
  };

  if (isLoading) return <div>Loading..</div>;
  if (error) return <div>An error occurred while fetching tasks</div>;

  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2 py-5">
        <h1 className="text-lg font-semibold">Projects Tasks TimeLine</h1>

        <div className="relative inline-block w-64">
          <select
            value={displayOptions.viewMode}
            onChange={handleViewModeChange}
            className="dark:bg-darksec dark:border-darksec block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-1.5 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:text-white"
          >
            <option value={ViewMode.Day}>Day</option>
            <option value={ViewMode.Month}>Moth</option>
            <option value={ViewMode.Year}>Year</option>
          </select>
        </div>
      </div>

      <div className="dark:bg-darksec overflow-hidden rounded-md bg-white px-2 py-3 shadow xl:px-4">
        <div className="timeline">
          <Gantt
            tasks={ganttTasks}
            {...displayOptions}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="100px"
            barBackgroundColor={isDarkMode ? "#101214" : "#aeb8c2"}
            barBackgroundSelectedColor={isDarkMode ? "#000" : "#9ba1a6"}
          />
        </div>

        <div className="px-4 pt-2 pb-2">
          <button
            onClick={() => setIsModalNewTaskOpen(true)}
            className="bg-blue-primary flex cursor-pointer items-center rounded px-3 py-2 text-white transition-all duration-300 ease-in-out hover:bg-blue-600"
          >
            Add New Task
            <Plus
              className="ms-2 rounded bg-slate-200 text-gray-700"
              size={15}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
