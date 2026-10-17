import { visibleContent, type ContentImage, type ContentVideo, type ContentMode, type EditorialStatus } from "./types";

export type ServiceImage = ContentImage;
export type ServiceVideo = ContentVideo;

export type Service = {
  id: string;
  name: string;
  slug: string;
  subtitle?: string;
  shortDescription: string;
  detailedDescription?: string;
  image?: ServiceImage;
  video?: ServiceVideo;
  approvalStatus: EditorialStatus;
  destination: { available: false } | { available: true; href: `/servicos/${string}` };
  featured: boolean;
};

export const services: Service[] = [
  {
    id: "ppf",
    name: "PPF",
    slug: "ppf",
    shortDescription: "Paint Protection Film. Especialidade informada no briefing; escopo, materiais e condições ainda aguardam confirmação.",
    approvalStatus: "preliminary",
    destination: { available: false },
    featured: true,
  },
];

export function getServices(mode: ContentMode): Service[] {
  return visibleContent(services, mode);
}
