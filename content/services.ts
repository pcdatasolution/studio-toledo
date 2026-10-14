export type ServiceImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  kind: "conceptual" | "real";
};

export type ServiceVideo = {
  src: string;
  kind: "real";
  usageApproval: "approved" | "pending";
};

export type Service = {
  name: string;
  slug: string;
  shortDescription: string;
  image?: ServiceImage;
  video?: ServiceVideo;
  approvalStatus: "preliminary" | "owner-approved";
  destination: { available: false } | { available: true; href: `/servicos/${string}` };
  featured: boolean;
};

export const services: Service[] = [
  {
    name: "PPF",
    slug: "ppf",
    shortDescription: "Paint Protection Film. Especialidade informada no briefing; escopo, materiais e condições ainda aguardam confirmação.",
    image: {
      src: "/images/services/ppf.png",
      alt: "Ilustração conceitual de PPF. Não representa um serviço realizado pelo Toledo.",
      width: 1024,
      height: 1536,
      kind: "conceptual",
    },
    approvalStatus: "preliminary",
    destination: { available: false },
    featured: true,
  },
];
