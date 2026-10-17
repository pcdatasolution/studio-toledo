import type { EditorialStatus } from "./types";

export type CommercialInformation = {
  commercialName?: string;
  whatsapp?: string;
  telephone?: string;
  instagram?: string;
  address?: string;
  openingHours?: string;
  openingSchedule?: readonly { days: string; hours: string }[];
  appointmentInfo?: string;
  approvalStatus: EditorialStatus;
};

/** Supplied by the project requester on 17/10/2026 for local visual review. */
export const business = {
  commercialName: "Studio Toledo",
  address: "Av. Santos Dumont, 6369",
  locality: "Papicu, Fortaleza – CE",
  telephone: "(85) 98816-6289",
  whatsapp: "5585988166289",
  openingSchedule: [
    { days: "Segunda a sexta", hours: "8h às 18h" },
    { days: "Sábado", hours: "8h às 14h" },
  ],
  approvalStatus: "preliminary",
} satisfies CommercialInformation & { locality: string };
