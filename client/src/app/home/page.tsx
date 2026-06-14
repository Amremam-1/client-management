"use client";
import { useGetProjectsQuery, useGetTasksQuery } from "@/state/api";
import { useAppSelector } from "../redux";
import { Priority, Status, Task } from "@/types";
import Header from "@/components/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { dataGridClassNames, dataGridStyles } from "@/lib/utils";
import { useState } from "react";

const taskColumns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 200 },
  { field: "status", headerName: "Status", width: 150 },
  { field: "priority", headerName: "Priority", width: 150 },
  { field: "dueDate", headerName: "Due Date", width: 150 },
  { field: "startDate", headerName: "Start Date", width: 150 },
];

const COLORS = ["#0088FE", "#7AE2CF", "#00C49F", "#FF8042"];

function objOfMatches(
  arr1: string[],
  arr2: string[],
  callback: (value: string) => string,
): Record<string, string> {
  const result: Record<string, string> = {};

  for (let i = 0; i < arr1.length; i++) {
    if (callback(arr1[i]) === arr2[i]) {
      result[arr1[i]] = arr2[i];
    }
  }

  return result;
}
const arr1 = ["hi", "howdy", "bye", "later", "hello"];
const arr2 = ["HI", "Howdy", "BYE", "LATER", "hello"];

const upperCase = (str: string): string => str.toUpperCase();

console.log(objOfMatches(arr1, arr2, upperCase));

const HomePage = () => {
  const { data: projects, isLoading } = useGetProjectsQuery();
  const [selectProjectId, setSelectProjectId] = useState<number>(1);

  const {
    data: tasks,
    isLoading: tasksLoading,
    isError: tasksIsError,
  } = useGetTasksQuery({ projectId: selectProjectId });

  const handleChangeProjectId = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectProjectId(Number(event.target.value));
  };

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  // For get Count of Priority
  const priorityCount = (tasks || []).reduce(
    (acc: Record<string, number>, task: Task) => {
      const { priority } = task;

      acc[priority as Priority] = (acc[priority as Priority] || 0) + 1;

      return acc;
    },
    {},
  );

  const taskDistribution = Object.keys(priorityCount).map((key) => ({
    name: key,
    count: priorityCount[key],
  }));

  // For get count of Status
  const statusCount = (tasks || []).reduce(
    (acc: Record<string, number>, task: Task) => {
      const { status } = task;

      acc[status as Status] = (acc[status as Status] || 0) + 1;

      return acc;
    },
    {},
  );

  const projectStatus = Object.keys(statusCount).map((key) => ({
    name: key,
    count: statusCount[key],
  }));

  const chartColors = isDarkMode
    ? {
        bar: "#8884d8",
        barGrid: "#303030",
        pieFill: "#4A90E2",
        text: "#FFFFFF",
      }
    : {
        bar: "#8884d8",
        barGrid: "#E0E0E0",
        pieFill: "#82ca9d",
        text: "#000000",
      };

  return (
    <div className="px-4 py-5 xl:px-6">
      <Header
        name="Project Mangament Dashboard"
        buttonComponent={
          <select
            className="dark:bg-darksec dark:border-darksec w-1/3 rounded border border-gray-400 bg-gray-200 px-2 py-1 leading-tight shadow hover:border-gray-500 focus:outline-none dark:text-white"
            value={selectProjectId}
            onChange={handleChangeProjectId}
          >
            {projects?.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="dark:bg-darksec rounded-lg bg-white px-4 py-4 shadow">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Task Priority Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskDistribution}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={chartColors.barGrid}
              />
              <XAxis dataKey="name" stroke={chartColors.text} />
              <YAxis stroke={chartColors.text} />
              <Tooltip
                contentStyle={{
                  width: "min-content",
                  height: "min-content",
                }}
              />
              <Legend />
              <Bar dataKey="count" fill={chartColors.bar} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="dark:bg-darksec rounded-lg bg-white px-4 py-4 shadow">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Project Status
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie dataKey="count" data={projectStatus} fill="#82ca9d" label>
                {projectStatus.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="dark:bg-darksec mt-3 rounded-lg bg-white p-4 shadow md:col-span-2">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Your Tasks
        </h3>
        <div style={{ width: "100%" }}>
          <DataGrid
            rows={tasks}
            columns={taskColumns}
            checkboxSelection
            loading={tasksLoading}
            className={dataGridClassNames}
            sx={dataGridStyles(isDarkMode)}
          />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
