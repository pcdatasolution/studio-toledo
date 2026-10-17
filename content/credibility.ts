import type { ContentImage, ContentVideo, PublicMediaPath } from "./types";

export type CollectionStatus = "requested" | "received" | "in-validation" | "approved" | "integrated";

type CollectionRecord = {
  status: CollectionStatus;
  /** Reference to the recorded approval: person, date and permitted use. */
  approvalEvidence?: string;
};

export type CredibilityMedia = CollectionRecord & {
  id: string;
  title: string;
  placeholder: string;
  caption?: string;
  image?: ContentImage;
  video?: ContentVideo & {
    transcript: string;
    captions?: PublicMediaPath;
  };
};

export type CredibilityTestimonial = CollectionRecord & {
  quote?: string;
  attribution?: string;
};

export const credibility: {
  work: CredibilityMedia;
  photos: CredibilityMedia[];
  testimonial: CredibilityTestimonial;
} = {
  work: {
    id: "execution",
    title: "O trabalho em movimento",
    placeholder: "Espaço reservado para vídeo real de execução.",
    status: "requested",
  },
  photos: [
    {
      id: "vehicle",
      title: "Veículos e contexto",
      placeholder: "Espaço reservado para fotografia de um trabalho realizado.",
      status: "requested",
    },
    {
      id: "finish",
      title: "O acabamento de perto",
      placeholder: "Espaço reservado para fotografia real de acabamento.",
      status: "requested",
    },
  ],
  testimonial: { status: "requested" },
};

export function canDisplay(record: CollectionRecord) {
  return (record.status === "approved" || record.status === "integrated") && Boolean(record.approvalEvidence?.trim());
}
