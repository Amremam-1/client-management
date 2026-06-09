"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { useGetProjectsQuery } from "@/state/api";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Layers3,
  LockIcon,
  LucideIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Sidebar = () => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const dispatch = useAppDispatch();

  // for get all projects
  const { data: projects, isLoading } = useGetProjectsQuery();

  // state for toggle list of projects || priority
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  const sidebarClassNames = `${isSidebarCollapsed ? "w-0" : "w-64"} dark:bg-darksec fixed z-50 flex h-full flex-col custom-scrollbar overflow-y-auto bg-white shadow-xl transition-all duration-300`;

  const linkIcon =
    "hover:bg- mt-2 flex w-full cursor-pointer items-center justify-between px-3 py-2 text-sm text-gray-600 transition-all duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-900 dark:border-blue-500 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white";

  return (
    <div className={sidebarClassNames}>
      <div className="flex h-full flex-col items-start">
        {/* Top logo */}
        <div className="flex h-15 w-full justify-between px-3 py-4">
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            EDLIST
          </h1>

          <X
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
            className="h-5 w-5 cursor-pointer text-gray-800 transition-all duration-300 ease-in hover:text-gray-500 dark:text-gray-100"
          />
        </div>

        {/* Team Work */}
        <div className="flex w-full items-center gap-4 border-y-[1.5px] border-gray-200 px-3 py-4 dark:border-gray-700">
          <Image
            src="/logo.png"
            alt="logo"
            className=""
            width={40}
            height={40}
          />

          <div className="flex flex-col gap-1">
            <h5 className="font-semibold tracking-widest text-gray-800 dark:text-gray-200">
              EDROH TEAM
            </h5>

            <p className="dark-text-gray-200 flex items-center gap-1 text-gray-500">
              <LockIcon className="h-3 w-3" />
              <span className="text-sm">Private</span>
            </p>
          </div>
        </div>

        {/* NAVBAR LINKS */}
        <nav className="mt-5 w-full">
          <SidebarLink icon={Home} label="Home" href="/" />
          <SidebarLink icon={Briefcase} label="Timeline" href="/timeLine" />
          <SidebarLink icon={Search} label="Search" href="/search" />
          <SidebarLink icon={Settings} label="Settings" href="/settings" />
          <SidebarLink icon={User} label="Users" href="/users" />
          <SidebarLink icon={Users} label="Teams" href="/teams" />
        </nav>

        {/* PROJECTS LINKS */}

        <button
          onClick={() => setShowProjects((prev) => !prev)}
          className={linkIcon}
        >
          <span className="flex items-center gap-2">
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500"></div>
            ) : (
              "Projects"
            )}
          </span>
          {showProjects ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        <div
          className={`w-full transition-all duration-300 ease-in-out ${
            showProjects ? "opacity-100" : "opacity-0"
          }`}
        >
          {showProjects &&
            projects?.map((project) => (
              <SidebarLink
                key={project.id}
                icon={Briefcase}
                label={project.name}
                href={`/projects/${project.id}`}
              />
            ))}
        </div>

        <button
          onClick={() => setShowPriority((prev) => !prev)}
          className={linkIcon}
        >
          <span className="">Priority</span>
          {showPriority ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        <div
          className={`w-full transition-all duration-300 ease-in-out ${
            showPriority ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="w-full pb-2">
            <SidebarLink
              icon={AlertCircle}
              label="Urgent"
              href="/priority/urgent"
            />
            <SidebarLink
              icon={ShieldAlert}
              label="High"
              href="/priority/high"
            />
            <SidebarLink
              icon={AlertTriangle}
              label="Medium"
              href="/priority/medium"
            />
            <SidebarLink icon={AlertOctagon} label="Low" href="/priority/low" />
            <SidebarLink
              icon={Layers3}
              label="Backlog"
              href="/priority/backlog"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

interface sidebarProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

export const SidebarLink = ({ href, icon: Icon, label }: sidebarProps) => {
  const pathname = usePathname();

  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className={`${isActive ? "dark:bg-gray-700" : ""}`}>
      <button
        className={`group flex w-full cursor-pointer items-center gap-3 rounded px-4 py-3 text-sm font-medium transition-all duration-200 ${
          isActive
            ? "bg-blue-500 text-white shadow-md"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
        }`}
      >
        <Icon
          className={`h-5 w-5 transition-colors duration-200 ${isActive ? "text-white" : "text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"}`}
        />

        <span>{label}</span>
      </button>
    </Link>
  );
};
