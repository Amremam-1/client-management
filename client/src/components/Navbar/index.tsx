import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import { Menu, Moon, Search, Settings, Sun } from "lucide-react";
import Link from "next/link";

const NavBar = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const dispatch = useAppDispatch();

  const btn =
    "dark:border-stroke-dark dark:bg-darkbg h-min w-min cursor-pointer rounded border border-gray-300 bg-gray-50 p-1 transition-all duration-300 hover:shadow-xl";

  return (
    <div className="dark:bg-darksec flex items-center justify-between bg-white px-4 py-3">
      <div className="flex items-center gap-8">
        {!isSidebarCollapsed ? null : (
          <button
            className={btn}
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          >
            <Menu className="h-5 w-5 text-gray-700 transition duration-300 ease-in dark:text-gray-100" />
          </button>
        )}

        {/* search Item */}
        {/* <div className="relative flex h-min w-50">
          <Search className="absolute top-1/2 left-1 h-4 w-4 -translate-y-1/2 transform cursor-pointer text-gray-700 dark:text-gray-100" />
          <input
            type="search"
            placeholder="search..."
            className="dark:border-stroke-dark dark:bg-darkbg text-darksec rounded border border-gray-300 bg-gray-100 p-1.5 pl-8 placeholder-gray-500 focus:outline-none dark:text-gray-100"
          />
        </div> */}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          className={btn}
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5 text-gray-700 transition duration-300 ease-in dark:text-gray-100" />
          ) : (
            <Moon className="h-5 w-5 text-gray-700 transition duration-300 ease-in dark:text-gray-100" />
          )}
        </button>
        <Link
          href="/settings"
          className="dark:border-stroke-dark dark:bg-darkbg h-min w-min rounded border border-gray-300 bg-gray-50 p-1 transition-all duration-300 hover:shadow-xl"
        >
          <Settings className="h-5 w-5 text-gray-700 transition-colors duration-300 ease-in dark:text-gray-100" />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
