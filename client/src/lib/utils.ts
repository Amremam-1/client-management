export const dataGridClassNames =
  "border border-gray-200 bg-white shadow dark:border-darksec dark:bg-darksec dark:text-gray-200";

export const dataGridStyles = (isDarkMode: boolean) => {
  return {
    "& .MuiDataGrid-columnHeaders": {
      color: `${isDarkMode ? "#e5e7eb" : ""}`,
      '& [role="row"] > *': {
        backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`,
        borderColor: `${isDarkMode ? "#2d3135" : ""}`,
      },
    },
    "& .MuiIconbutton-root": {
      color: `${isDarkMode ? "#a3a3a3" : ""}`,
    },
    "& .MuiTablePagination-root": {
      color: `${isDarkMode ? "#a3a3a3" : ""}`,
      backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`,
    },
    "& .MuiTablePagination-selectIcon": {
      color: `${isDarkMode ? "#a3a3a3" : ""}`,
    },
    "& .MuiDataGrid-cell": {
      border: "none",
    },
    "& .MuiDataGrid-row": {
      color: `${isDarkMode ? "#a3a3a3" : ""}`,
      borderBottom: `0.5px solid ${isDarkMode ? "#2d3135" : "#e5e7eb"}`,
      backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`,
      "&:hover": {
        backgroundColor: isDarkMode ? "#2a2d31" : "#f9fafb",
      },
    },
    "& .MuiDataGrid-row.Mui-selected": {
      backgroundColor: isDarkMode ? "#374151" : "#dbeafe",
    },
    "& .MuiDataGrid-row.Mui-selected:hover": {
      backgroundColor: isDarkMode ? "#4b5563" : "#bfdbfe",
    },
    "& .MuiDataGrid-withBorderColor": {
      borderColor: `${isDarkMode ? "#2d313d" : "#e5e7eb"}`,
    },
    "& .MuiDataGrid-toolbar": {
      borderColor: `${isDarkMode ? "#3b82f6" : "#93c5fd"}`,
    },
    "&.MuiDataGrid-root": {
      border: `1px solid ${isDarkMode ? "#2d3135" : "#e5e7eb"}`,
    },

    "& .MuiDataGrid-scrollbar": {
      height: "4px",
    },
  };
};
