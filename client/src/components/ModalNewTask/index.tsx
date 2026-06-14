"use client";

import { useState } from "react";
import { FormEvent } from "react";
import Modal from "@/components/Modal";
import { useCreateTasksMutation } from "@/state/api";
import { formatISO } from "date-fns";
import { Priority, Status } from "@/types";

type props = {
  isOpen: boolean;
  onClose: () => void;
  id?: string | null;
};

const ModalNewTask = ({ isOpen, onClose, id = null }: props) => {
  const [createTasks, { isLoading }] = useCreateTasksMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>(Status.ToDo);
  const [priority, setPriority] = useState<Priority>(Priority.Backlog);
  const [tags, setTags] = useState("");

  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [authorUserId, setAuthorUserId] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [projectId, setProjectId] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !authorUserId || !(id !== null || projectId)) return;

    const formatStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });
    const formatDueDate = formatISO(new Date(dueDate), {
      representation: "complete",
    });

    try {
      await createTasks({
        title,
        description,
        status,
        priority,
        tags,
        startDate: formatStartDate,
        dueDate: formatDueDate,
        assignedUserId: parseInt(assignedUserId),
        authorUserId: parseInt(authorUserId),
        projectId: id !== null ? Number(id) : Number(projectId),
      }).unwrap();

      // reset form
      setTitle("");
      setDescription("");
      setStatus(Status.ToDo);
      setPriority(Priority.Backlog);
      setTags("");
      setStartDate("");
      setDueDate("");
      setAssignedUserId("");
      setAuthorUserId("");
      setProjectId("");

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const inputClassName =
    "dark:border-stroke-dark w-full rounded-xl border border-gray-400 px-3 py-2 focus:outline-none text-gray-600 dark:text-white";

  const selectStyles =
    "mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white focus:outline-none";

  const isFormValid = () => {
    return title && authorUserId && !(id !== null || projectId);
  };

  return (
    <Modal isOpen={isOpen} name="Create New Task" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClassName}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputClassName}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <select
            className={selectStyles}
            value={status}
            onChange={(e) =>
              setStatus(Status[e.target.value as keyof typeof Status])
            }
          >
            <option value="">Select Status</option>
            <option value={Status.ToDo}>To Do</option>
            <option value={Status.WorkInProgress}>Work In Progress</option>
            <option value={Status.UnderReview}>Under Review</option>
          </select>
          <select
            className={selectStyles}
            value={priority}
            onChange={(e) =>
              setPriority(Priority[e.target.value as keyof typeof Priority])
            }
          >
            <option value="">Select Priority</option>
            <option value={Priority.Urgent}>Urgent</option>
            <option value={Priority.High}>High</option>
            <option value={Priority.Medium}>Medium</option>
            <option value={Priority.Low}>Low</option>
            <option value={Priority.Backlog}>Backlog</option>
          </select>
        </div>

        <input
          type="tags"
          placeholder="Tags (Comma saparated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className={inputClassName}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={inputClassName}
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={inputClassName}
          />
        </div>
        <input
          type="text"
          placeholder="Author User ID"
          className={inputClassName}
          value={authorUserId}
          onChange={(e) => setAuthorUserId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Assigned User ID"
          className={inputClassName}
          value={assignedUserId}
          onChange={(e) => setAssignedUserId(e.target.value)}
        />

        {id === null && (
          <input
            type="text"
            placeholder="Project ID"
            className={inputClassName}
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
        )}

        <button
          type="submit"
          className={`bg-blue-primary flex w-full cursor-pointer items-center justify-center rounded px-5 py-2 text-white shadow hover:bg-blue-800 ${!isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""} `}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating.." : "Create Project"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewTask;
