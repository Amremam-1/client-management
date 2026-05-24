"use client";

import ProjectHeader from "@/app/project/ProjectHeader";
import { useState } from "react";

type Props = {
  params: { id: string };
};

const ProjectPage = ({ params }: Props) => {
  const { id } = params;
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Board");

  return (
    <div>
      {/* Modal New Task */}
      {/* <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} /> */}

      {/* {activeTab === "Board" && (
        <Board />
      )} */}
    </div>
  );
};

export default ProjectPage;
