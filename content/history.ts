import type { ContentImage, EditorialStatus } from "./types";

export type HistoryMilestone = {
  id: string;
  date?: string;
  description: string;
  approvalStatus: EditorialStatus;
};

export type TeamMember = {
  id: string;
  name?: string;
  role?: string;
  photo?: ContentImage;
  approvalStatus: EditorialStatus;
};

export type History = {
  introduction?: string;
  description?: string;
  milestones: HistoryMilestone[];
  team: TeamMember[];
  photos?: ContentImage[];
  approvalStatus: EditorialStatus;
};

export const history: History = {
  approvalStatus: "preliminary",
  milestones: [],
  team: [],
};
