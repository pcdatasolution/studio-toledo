import type { Metadata } from "next";
import { ScrollVideoExperiment } from "@/components/experiments/scroll-video-experiment";

export const metadata: Metadata = {
  title: "Scroll e vídeo — experimento | Auto Detailer Toledo",
  robots: { index: false, follow: false },
};

export default function ScrollVideoPage() {
  return <ScrollVideoExperiment />;
}
