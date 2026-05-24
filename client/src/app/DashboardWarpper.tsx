"use client";
import NavBar from "@/components/Navbar";
import Sidebar from "../components/Sidebar";
import StoreProvider, { useAppSelector } from "./redux";
import { useEffect } from "react";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="dark:bg-darkbg min-h-screen w-full bg-gray-50">
      {/* sideBar */}
      <Sidebar />

      <main
        className={`dark:bg-darkbg flex w-full flex-col bg-gray-50 ${isSidebarCollapsed ? "" : "md:pl-64"}`}
      >
        {/* NavBar */}
        <NavBar />

        {/* Content */}
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
