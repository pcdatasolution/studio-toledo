/** Approval of content is separate from permission to display each media file. */
export type EditorialStatus = "preliminary" | "owner-approved";
export type ContentMode = "prototype" | "public";
export type PublicMediaPath = `/images/${string}` | `/videos/${string}` | `/logo/${string}`;

export type ContentImage = {
  src: PublicMediaPath;
  alt: string;
  width: number;
  height: number;
  kind: "conceptual" | "real";
  usageApproval: "pending" | "approved";
};

export type ContentVideo = {
  src: PublicMediaPath;
  kind: "real";
  usageApproval: "pending" | "approved";
};

export function approvedMedia<T extends { usageApproval: "pending" | "approved" }>(media?: T): T | undefined {
  return media?.usageApproval === "approved" ? media : undefined;
}

export function visibleContent<T extends { approvalStatus: EditorialStatus }>(items: readonly T[], mode: ContentMode): T[] {
  return items.filter((item) => mode === "prototype" || item.approvalStatus === "owner-approved");
}
