import type { EditorialStatus } from "./types";

export type CommercialInformation = {
  commercialName?: string;
  whatsapp?: string;
  instagram?: string;
  address?: string;
  openingHours?: string;
  appointmentInfo?: string;
  approvalStatus: EditorialStatus;
};

export const business: CommercialInformation = {
  approvalStatus: "preliminary",
};
