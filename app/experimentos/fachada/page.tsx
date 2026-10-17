import type { Metadata } from "next";
import { FacadeTransitionExperiment } from "@/components/experiments/facade-transition-experiment";

export const metadata: Metadata = {
  title: "Fachada — experimento | Auto Detailer Toledo",
  robots: { index: false, follow: false },
};

export default function FacadeExperimentPage() {
  return <FacadeTransitionExperiment />;
}
