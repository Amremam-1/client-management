import { useAppSelector } from "@/app/redux";
import Header from "@/components/Header";
import { dataGridClassNames, dataGridStyles } from "@/lib/utils";
import { useGetTasksQuery } from "@/state/api";
import { GridColDef } from "@mui/x-data-grid";
import { DataGrid, GridRowsProp } from "@mui/x-data-grid";

type TableViewProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
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
      <span
        className={`inline-flex rounded p-1 text-xs leading-5 text-white ${
          params.value === "To Do"
            ? "bg-[#2563EB]"
            : params.value === "Work In Progress"
              ? "bg-green-400 text-green-900"
              : params.value === "Under Review"
                ? "bg-[#d97706]"
                : "bg-gray-900"
        }`}
      >
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
    renderCell: (params) => params.value.username || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => params.value.username || "Unassigned",
  },
];

const TableView = ({ id, setIsModalNewTaskOpen }: TableViewProps) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });

  return (
    <div className="px-4 py-5 xl:px-6">
      <Header
        name="Table View"
        textSmall
        buttonComponent={
          <button
            className="bg-blue-primary cursor-pointer rounded px-3 py-1 text-white hover:bg-blue-600"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            Add New Task
          </button>
        }
      />
      {/* Table */}
      <div>
        <DataGrid
          rows={tasks || []}
          columns={columns}
          className={dataGridClassNames}
          sx={dataGridStyles(isDarkMode)}
        />
      </div>
    </div>
  );
};

export default TableView;
