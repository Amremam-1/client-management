"use client";
import { useAppSelector } from "@/app/redux";
import Header from "@/components/Header";
import ModalNewTask from "@/components/ModalNewTask";
import TaskCard from "@/components/TaskCard";
import { dataGridClassNames, dataGridStyles } from "@/lib/utils";
import { useGetTaskByUserQuery } from "@/state/api";
import { Priority, Task } from "@/types";
import { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

type props = {
  priority: Priority;
};

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    width: 100,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs leading-5 font-semibold text-green-800">
        {params.value}
      </span>
    ),
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 75,
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 130,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 130,
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 130,
  },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: (params) => params.value || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => params.value || "Unassigned",
  },
];

const ReusablePriorityPage = ({ priority }: props) => {
  const [view, setView] = useState("list");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  const userId = 1;
  const {
    data: tasks,
    isLoading,
    isError: isTasksError,
  } = useGetTaskByUserQuery(userId || 0, {
    // we use this if userId === null donot send the request
    skip: userId === null,
  });
  console.log(tasks);

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const filteredTasks = tasks?.filter(
    (task: Task) => task.priority === priority,
  );

  if (isTasksError || !tasks) return <div>Error fetching tasks</div>;
  return (
    <div className="px-4 py-5 pb-8 xl:px-6">
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
      />

      <Header
        name="Prioritiy page"
        buttonComponent={
          <button
            className="bg-blue-primary flex cursor-pointer items-center justify-center rounded border-none px-2 py-1 text-sm tracking-widest text-white hover:bg-blue-600"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            Add Task
          </button>
        }
      />

      {/* Actions */}

      <div className="mb-4 flex items-center gap-2">
        <button
          onClick={() => setView("list")}
          className={`cursor-pointer rounded px-3 py-1.5 transition-colors duration-300 ${
            view === "list"
              ? "bg-blue-500 text-white"
              : "border-slate-200 bg-slate-100 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
          } `}
        >
          List
        </button>

        <button
          onClick={() => setView("table")}
          className={`cursor-pointer rounded px-3 py-1.5 transition-colors duration-300 ${
            view === "table"
              ? "bg-blue-primary text-white"
              : "border-slate-200 bg-slate-100 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
          } `}
        >
          Table
        </button>
      </div>

      {isLoading ? (
        <div>Loading tasks...</div>
      ) : view === "list" ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTasks?.map((task: Task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        view === "table" &&
        filteredTasks && (
          <div className="z-0 w-full">
            <DataGrid
              rows={filteredTasks}
              columns={columns}
              checkboxSelection
              getRowId={(row) => row.id}
              className={dataGridClassNames}
              sx={dataGridStyles(isDarkMode)}
            />
          </div>
        )
      )}
    </div>
  );
};

export default ReusablePriorityPage;
