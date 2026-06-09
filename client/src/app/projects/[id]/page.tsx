"use client";

import ProjectHeader from "@/app/projects/ProjectHeader";
import { useState } from "react";
import Board from "../Board";
import { useParams } from "next/navigation";
import List from "../ListView";
import TimeLine from "../TimeLineView";
import TableView from "../TableView";
import ModalNewTask from "@/components/ModalNewTask";

const ProjectPage = () => {
  const params = useParams();
  const id = params.id as string;

  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Board");

  return (
    <div>
      {/* Modal New Task */}
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
        projectId={id}
      />

      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "Board" && (
        <Board id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}

      {activeTab === "List" && (
        <List id={id} setIsmodalNewTaskOpen={setIsModalNewTaskOpen} />
      )}

      {activeTab === "TimeLine" && (
        <TimeLine id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Table" && (
        <TableView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
};

export default ProjectPage;
