import { Project } from "@/types";
import { Calendar, Clock3 } from "lucide-react";

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  console.log(project.startDate);

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {project.name}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-400">
            {project.description}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-slate-200 dark:border-slate-700" />

      {/* Dates */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <div className="rounded-lg bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30">
            <Calendar size={16} />
          </div>

          <div>
            <p className="text-slate-500 dark:text-slate-400">Start Date</p>
            <p className="font-medium text-slate-800 dark:text-slate-200">
              {new Date(project?.startDate ?? "").toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600 dark:bg-emerald-900/30">
            <Clock3 size={16} />
          </div>

          <div>
            <p className="text-slate-500 dark:text-slate-400">End Date</p>
            <p className="font-medium text-slate-800 dark:text-slate-200">
              {new Date(project.endDate ?? "").toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
