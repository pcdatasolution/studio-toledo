import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ServiceGallery } from "@/components/sections/service-gallery";
import { services } from "@/content/services";
import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Serviços — estudo preliminar | Auto Detailer Toledo",
  description: "Galeria demonstrativa de serviços. Conteúdo comercial e mídias em revisão.",
  robots: { index: false, follow: false },
};

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      <a className="skip-link" href="#services-main">Pular para o conteúdo</a>
      <header className={styles.header}>
        <nav aria-label="Navegação da galeria">
          <Link href="/">Início</Link>
          <Link href="/servicos" aria-current="page">Serviços</Link>
          <Link href="/#contato">Contato na Home</Link>
        </nav>
      </header>
      <main id="services-main" tabIndex={-1}>
        <div className={styles.intro}>
          <h1>Serviços</h1>
          <p>Explore uma prévia antes de conhecer cada serviço.</p>
        </div>
        <section className={styles.environment} aria-label="Galeria de serviços">
          <Image className={styles.scenery} src="/images/enviroments/studio-entrada-v2.png" alt="" fill sizes="100vw" preload />
          <ServiceGallery services={services} />
        </section>
        <div className={styles.notes}>
          <p>Estudo preliminar. Cenário e imagem de PPF conceituais; não são registros das instalações ou dos serviços realizados pelo Toledo.</p>
          <p>Catálogo e informações comerciais aguardam confirmação do proprietário.</p>
          <Link href="/">Voltar à Home</Link>
        </div>
      </main>
    </div>
  );
}
