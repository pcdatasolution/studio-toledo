import type { ContentImage, ContentVideo, EditorialStatus } from "./types";

export type Work = {
  id: string;
  vehicle?: string;
  /** ID from services.ts, only after confirming the service performed. */
  serviceId?: string;
  description?: string;
  images?: ContentImage[];
  videos?: ContentVideo[];
  approvalStatus: EditorialStatus;
};

export const works: Work[] = [];
