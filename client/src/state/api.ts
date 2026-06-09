import { Project, searchResults, Task } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["Projects", "Tasks"], // here where call the endpoint where response some data which i store data here in indentifer
  // here we add endpoints i created in backend where i call
  endpoints: (build) => ({
    // for get data we use  .query
    getProjects: build.query<Project[], void>({
      // here i write what i expacted return from api or call
      query: () => "projects", // here i write endpoint
      providesTags: ["Projects"], // here i used as when you add some projects will get projects with updates
    }),

    createProjects: build.mutation<Project, Partial<Project>>({
      // here i use mutation for send data
      query: (project) => ({
        url: "projects", // endpoint
        method: "POST",
        body: project, // it is a function or data i will send to backend for updated projects
      }),
      invalidatesTags: ["Projects"], // i used it for when data change call api refetch for updated data
    }),

    // get tasksById
    getTasks: build.query<Task[], { projectId: number }>({
      query: ({ projectId }) => `tasks?projectId=${projectId}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
          : [{ type: "Tasks" as const }],
    }),

    // Create Task
    createTasks: build.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),

    // updated Tasks
    updateTaskStatus: build.mutation<Task, { taskId: number; status: string }>({
      query: ({ taskId, status }) => ({
        url: `tasks/${taskId}/status`,
        method: "PATCH",
        body: { status },
      }),

      invalidatesTags: (result, error, { taskId }) => [
        { type: "Tasks", id: taskId },
      ],
    }),

    search: build.query<searchResults, string>({
      query: (query) => `search?query=${query}`,
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectsMutation,
  useGetTasksQuery,
  useUpdateTaskStatusMutation,
  useCreateTasksMutation,
  useSearchQuery,
} = api;
