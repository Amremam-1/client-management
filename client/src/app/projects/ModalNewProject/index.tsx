"use client";

import { useState } from "react";
import { FormEvent } from "react";
import Modal from "@/components/Modal";
import { useCreateProjectsMutation } from "@/state/api";
import Header from "@/components/Header";
import { formatISO } from "date-fns";

type props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalNewProject = ({ isOpen, onClose }: props) => {
  const [createProject, { isLoading }] = useCreateProjectsMutation();

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!projectName || !startDate || !endDate) return;

    const formatStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });
    const formatEndDate = formatISO(new Date(endDate), {
      representation: "complete",
    });

    try {
      await createProject({
        name: projectName,
        description,
        startDate: formatStartDate,
        endDate: formatEndDate,
      });

      // reset form
      setProjectName("");
      setDescription("");
      setStartDate("");
      setEndDate("");

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const inputClassName =
    "dark:border-stroke-dark w-full rounded-xl border border-gray-400 px-3 py-2 focus:outline-none text-gray-600 dark:text-white";

  const isFormValid = () => {
    return projectName && description && startDate && endDate;
  };

  return (
    <Modal isOpen={isOpen} name="Create New Project" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className={inputClassName}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={inputClassName}
          />
        </div>

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

export default ModalNewProject;
