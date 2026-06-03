import Header from "@/components/Header";
import {
  Clock,
  Filter,
  Grid3x3,
  Grid3X3,
  List,
  Share2,
  Table,
} from "lucide-react";

interface ProjectHeaderProps {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
}

const ProjectHeader = ({ activeTab, setActiveTab }: ProjectHeaderProps) => {
  return (
    <div className="px-4 xl:px-6">
      {/* Modal New Project */}

      <div className="lg-pt-8 pt-6 pb-6 xl:pb-4">
        <Header name="Product Desgin Development" />
      </div>

      {/* TABS */}

      <div className="darK:border-stroke-dark flex flex-wrap-reverse gap-2 border-y border-gray-200 py-2 md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <TabButton
            name="Board"
            icon={<Grid3x3 className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="List"
            icon={<List className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="TimeLine"
            icon={<Clock className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Table"
            icon={<Table className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Filter className="h-5 w-5" />
          </button>

          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Share2 className="h-5 w-5" />
          </button>

          <div className="relative">
            <input
              type="text"
              placeholder="Search Task"
              className="dark:border-darksec dark:bg-darksec rounded-md border border-gray-400 py-1 pr-4 pl-10 focus:outline-none dark:text-white"
            />

            <Grid3X3
              className="absolute top-2 left-2 h-5 w-5 text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300"
              strokeWidth={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;

type TabButtonProps = {
  name: string;
  icon: React.ReactNode;
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

export const TabButton = ({
  name,
  icon,
  activeTab,
  setActiveTab,
}: TabButtonProps) => {
  const isActive = activeTab === name;

  return (
    <button
      className={`relative flex items-center gap-2 px-1 py-2 text-gray-500 after:absolute after:-bottom-2.25 after:left-0 after:h-px after:w-full hover:text-blue-600 sm:px-2 lg:px-4 dark:text-neutral-500 dark:hover:text-white ${
        isActive ? "text-blue-600 after:bg-blue-600 dark:text-white" : ""
      }`}
      onClick={() => setActiveTab(name)}
    >
      {icon}
      {name}
    </button>
  );
};
