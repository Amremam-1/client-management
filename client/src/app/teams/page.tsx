"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "@/components/Header";
import { useGetTeamsQuery } from "@/state/api";
import { dataGridClassNames, dataGridStyles } from "@/lib/utils";
import { useAppSelector } from "../redux";
import { Toolbar } from "@mui/x-data-grid";
import { FilterPanelTrigger } from "@mui/x-data-grid";
import { ExportCsv } from "@mui/x-data-grid";
import { DownloadIcon, FilterIcon } from "lucide-react";

const CustomToolbar = () => {
  return (
    <Toolbar className="dark:bg-darksec [&_svg]:text-text-gray-200 bg-white [&_button]:text-black dark:[&_button]:text-white dark:[&_svg]:text-white">
      <FilterPanelTrigger>
        <div className="flex items-center gap-2">
          <FilterIcon size={15} />
          <span>Filter</span>
        </div>
      </FilterPanelTrigger>

      <ExportCsv>
        <div className="flex items-center gap-2">
          <DownloadIcon size={15} />
          <span>Export</span>
        </div>
      </ExportCsv>
    </Toolbar>
  );
};
const TeamView = () => {
  const { data: teams, isLoading, isError } = useGetTeamsQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) return <div>Loading..</div>;
  if (isError) return <div>An error occurred while fetching teams</div>;

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Team ID",
      width: 100,
    },
    {
      field: "teamName",
      headerName: "Team Name",
      width: 200,
    },
    {
      field: "productOwnerUsername",
      headerName: "Product Owner",
      width: 200,
    },
    {
      field: "projectManagerUsername",
      headerName: "Product Manager",
      width: 200,
    },
  ];

  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="py-5">
        <Header name="Teams List View" />
      </div>

      <div className="min-h-screen w-full">
        <DataGrid
          rows={teams || []}
          columns={columns}
          pagination
          showToolbar
          slots={{
            toolbar: CustomToolbar,
          }}
          className={dataGridClassNames}
          sx={dataGridStyles(isDarkMode)}
        />
      </div>
    </div>
  );
};

export default TeamView;
