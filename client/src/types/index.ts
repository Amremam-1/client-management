export interface Project {
  id: number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  profilePictureUrl?: string;
  cognitoId?: string;
  teamId?: number;
}

export interface Attachments {
  id: number;
  fileURL?: string;
  fileName?: string;
  taskId: number;
  uploadedById: number;
}

export enum Status {
  ToDo = "To Do",
  WorkInProgress = "Work In Progress",
  UderReview = "Under Review",
  Completed = "completed",
}

export enum Priority {
  Urgent = "Urgent",
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Backlog = "Backlog",
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  tags?: string;
  startDate?: string;
  dueDate?: string;
  points?: string;
  projectId: string;
  authorUserId?: string;
  assignedUserId?: string;

  author?: User;
  assignee?: User;
  attachments?: Attachments;
  comments?: Comment;
}


