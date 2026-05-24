import React from "react";

interface ProjectHeaderProps {
  activeTab: string;
  setActiveTab: () => string;
}

const ProjectHeader = ({ activeTab, setActiveTab }: ProjectHeaderProps) => {
  return <div>ProjectHeader</div>;
};

export default ProjectHeader;
