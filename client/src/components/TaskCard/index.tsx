import { Task } from "@/types";
import {
  ChevronsDown,
  GripHorizontal,
  ChevronUp,
  ChevronsUp,
  MessageCircleCode,
} from "lucide-react";
import Image from "next/image";
import { CalendarDays, CalendarRange } from "lucide-react";
import { format } from "date-fns";
type TaskCardProps = {
  task: Task;
};

const statusColor: any = {
  "To Do": "#2563EB",
  "Work In Progress": "#059669",
  "Under Review": "#D97706",
  Completed: "#000000",
};

const priorityConfig = {
  Low: {
    icon: ChevronsDown,
    color: "text-blue-500",
  },
  Medium: {
    icon: GripHorizontal,
    color: "text-green-500",
  },
  High: {
    icon: ChevronUp,
    color: "text-orange-500",
  },
  Urgent: {
    icon: ChevronsUp,
    color: "text-red-500",
  },
};

const TaskCard = ({ task }: TaskCardProps) => {
  const priority =
    task.priority &&
    priorityConfig[task.priority as keyof typeof priorityConfig];

  const PriorityIcon = priority?.icon;
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100/50 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">
      {/* Attachment */}
      {task.attachments && task.attachments.length > 0 && (
        <div className="p-2">
          <Image
            src={`/${task.attachments[0].fileURL}`}
            alt={task.attachments[0].fileName || ""}
            width={400}
            height={200}
            className="h-48 w-full rounded-2xl object-cover"
          />
        </div>
      )}

      <div className="space-y-4 p-4">
        {/* Title */}
        <h3 className="line-clamp-2 text-lg font-semibold">{task.title}</h3>

        {/* Description */}
        <p className="line-clamp-3 text-sm text-gray-500">
          {task.description || "No Description Provided"}
        </p>

        {/* Status && priority && tags*/}

        <div className="flex flex-wrap items-center">
          <div className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: statusColor[task.status ?? "To Do"] }}
            />

            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
              {task.status}
            </span>
          </div>

          <div className="ms-3 flex items-center gap-2">
            {PriorityIcon && (
              <PriorityIcon size={16} className={priority.color} />
            )}

            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
              {task.priority}
            </span>
          </div>

          <div className="ms-3 flex items-center gap-2">
            {task.tags &&
              task.tags.split(",").map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  {tag}
                </span>
              ))}
          </div>
        </div>

        {/* Footer */}
        <div>
          <div className="flex items-center justify-between border-b border-gray-300 pb-4 dark:border-neutral-700">
            <div className="flex items-center gap-2">
              <CalendarDays size={14} className="text-slate-500" />
              <span className="text-xs text-slate-500">
                {task.startDate && format(task.startDate, "MMM dd")}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <CalendarRange size={14} className="text-slate-500" />
              <span className="text-xs text-slate-500">
                {task.dueDate && format(task.dueDate, "MMM dd")}
              </span>
            </div>
          </div>

          {/* User */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center -space-x-2">
              {task.author && (
                <Image
                  src={`/${task.author.profilePictureUrl}`}
                  alt={task.author.username}
                  width={28}
                  height={28}
                  className="h-10 w-10 rounded-full border-2 border-white object-contain dark:border-slate-900"
                />
              )}

              {task.assignee && (
                <Image
                  src={`/${task.assignee.profilePictureUrl}`}
                  alt={task.assignee.username}
                  width={28}
                  height={28}
                  className="h-10 w-10 rounded-full border-2 border-white object-contain dark:border-slate-900"
                />
              )}
            </div>

            <div className="text-xs text-slate-500">
              {task.assignee?.username}
            </div>
          </div>

          {/* Comments */}
          {task.comments && task.comments.length > 0 && (
            <div className="mt-4 text-sm">
              <span className="flex items-center">
                <MessageCircleCode size={15} />
                <span className="ms-2 text-neutral-700 dark:text-gray-100">
                  Comments {task.comments.length}
                </span>
              </span>

              <div className="mt-2 space-y-2">
                {task.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="rounded-lg bg-slate-100 p-2 text-xs dark:bg-slate-800"
                  >
                    {comment.text}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
