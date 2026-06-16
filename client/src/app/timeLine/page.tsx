"use client";
import { useGetProjectsQuery, useGetTasksQuery } from "@/state/api";
import { useMemo, useState } from "react";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { useAppSelector } from "@/app/redux";
import Header from "@/components/Header";

type projectTypeItems = "task" | "milestone" | "project";

const TimeLine = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const { data: projects, isLoading, error } = useGetProjectsQuery();

  const [displayOptions, setIsDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  //   to display data for gantt to understand this data
  const ganttprojects = useMemo(() => {
    return (
      projects?.map((project) => ({
        start: new Date(project.startDate as string),
        end: new Date(project.endDate as string),
        name: project.name,
        id: `Project-${project.id}`,
        type: "project" as projectTypeItems,
        progress: 50,
        isDisabled: false,
      })) || []
    );
  }, [projects]);

  //   When selcted Mode (Day or  Week Or Month as default)
  const handleViewModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setIsDisplayOptions((prevOptions) => ({
      ...prevOptions,
      viewMode: event.target.value as ViewMode,
    }));
  };

  if (isLoading)
    return (
      <div className="flex items-center gap-2">
        Loading...
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500"></div>
      </div>
    );
  if (error) return <div>An error occurred while fetching tasks</div>;

  return (
    <div className="px-4 pb-8 xl:px-6">
      <header className="flex flex-wrap items-center justify-between gap-2 py-5">
        <Header name="Projects Tasks TimeLine" />
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
      </header>

      <div className="dark:bg-darksec overflow-hidden rounded-md bg-white px-2 py-3 shadow xl:px-4">
        <div className="timeline">
          <Gantt
            tasks={ganttprojects}
            {...displayOptions}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="100px"
            projectProgressColor={isDarkMode ? "#3b82f6" : "#2563eb"}
            projectProgressSelectedColor={isDarkMode ? "#60a5fa" : "#1d4ed8"}
            projectBackgroundColor={isDarkMode ? "#1f2937" : "#dbeafe"}
            projectBackgroundSelectedColor={isDarkMode ? "#374151" : "#bfdbfe"}
          />
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
