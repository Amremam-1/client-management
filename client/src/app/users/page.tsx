"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "@/components/Header";
import { useGetUsersQuery } from "@/state/api";
import { dataGridClassNames, dataGridStyles } from "@/lib/utils";
import { useAppSelector } from "../redux";
import Image from "next/image";
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
const UserView = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading)
    return (
      <div className="flex items-center gap-2">
        Loading...
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500"></div>
      </div>
    );
  if (isError) return <div>An error occurred while fetching tasks</div>;

  const columns: GridColDef[] = [
    {
      field: "userId",
      headerName: "ID",
      width: 100,
    },
    {
      field: "username",
      headerName: "User Name",
      width: 150,
    },
    {
      field: "profilePictureUrl",
      headerName: "Profile Image",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-9 w-9">
              <Image
                src={`/${params.value}`}
                alt={params.row.username}
                width={100}
                height={50}
                className="h-full rounded-full object-cover"
              />
            </div>
          </div>
        );
      },
    },

    {
      field: "teamId",
      headerName: "Team ID",
      width: 150,
    },
  ];

  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="py-5">
        <Header name="User List View" />
      </div>

      <div className="min-h-screen w-full">
        <DataGrid
          getRowId={(row) => row.userId}
          rows={users || []}
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

export default UserView;
