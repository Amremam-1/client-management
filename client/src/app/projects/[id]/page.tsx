"use client";

import ProjectHeader from "@/app/projects/ProjectHeader";
import { use, useState } from "react";
import Board from "../Board";
import { useParams } from "next/navigation";

const ProjectPage = () => {
  const params = useParams();
  const id = params.id as string;

  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Board");

  return (
    <div>
      {/* Modal New Task */}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "Board" && (
        <Board id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
};

export default ProjectPage;
