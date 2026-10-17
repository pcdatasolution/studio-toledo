"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Service } from "@/content/services";
import { approvedMedia } from "@/content/types";
import styles from "@/app/servicos/services.module.css";

function ServicePanel({ service, selected, select }: { service: Service; selected: boolean; select: () => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const [imageFailed, setImageFailed] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const image = approvedMedia(service.image);
  const approvedVideo = approvedMedia(service.video)?.kind === "real" && !videoFailed;
  const stop = () => { video.current?.pause(); setPlaying(false); };
  const play = () => {
    if (!approvedVideo || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.current?.play().then(() => setPlaying(true)).catch(() => { setVideoFailed(true); setPlaying(false); });
  };

  return (
    <li className={styles.panel} data-featured={service.featured} data-selected={selected}>
      <button type="button" className={styles.panelControl} aria-label={`Ver prévia de ${service.name}`} aria-expanded={selected} aria-controls="service-preview" onClick={select} onFocus={select} onBlur={stop} onPointerEnter={(e) => { if (e.pointerType === "mouse") play(); }} onPointerLeave={stop}>
        <span className={styles.media}>
          {image && !imageFailed ? <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 759px) 80vw, 400px" onError={() => setImageFailed(true)} /> : <span className={styles.emptyMedia}>{image ? "Imagem indisponível" : "Fotografia em preparação"}</span>}
          {approvedVideo && <video ref={video} className={styles.video} data-playing={playing} src={service.video!.src} muted playsInline preload="none" aria-hidden="true" onError={() => { setVideoFailed(true); setPlaying(false); }} onEnded={stop} />}
        </span>
        <span className={styles.panelCaption}>{service.name}<span>{selected ? "Prévia selecionada" : "Ver prévia"}</span></span>
      </button>
    </li>
  );
}

export function ServiceGallery({ services }: { services: Service[] }) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const selected = services.find((service) => service.slug === selectedSlug);
  return (
    <div className={styles.gallery}>
      {services.length > 0 ? <ul className={styles.wall} aria-label="Selecione um serviço para ver a prévia">{services.map((service) => <ServicePanel key={service.slug} service={service} selected={service.slug === selectedSlug} select={() => setSelectedSlug(service.slug)} />)}</ul> : <p className={styles.emptyCatalog}>Nenhum serviço disponível para prévia neste momento.</p>}
      <section id="service-preview" className={styles.preview} aria-labelledby="preview-title" aria-live="polite" aria-atomic="true">
        {selected ? <>
          <h2 id="preview-title">{selected.name}</h2>
          <p>{selected.shortDescription}</p>
          {selected.approvalStatus === "preliminary" && <p className={styles.status}>Conteúdo preliminar · validação comercial pendente.</p>}
          <p className={styles.status}>{selected.video?.usageApproval === "approved" ? "Vídeo real autorizado disponível para prévia com mouse; a imagem permanece como alternativa." : "Sem vídeo real autorizado disponível nesta versão."}</p>
          {selected.destination.available && selected.approvalStatus === "owner-approved" ? <Link className={styles.destination} href={selected.destination.href}>Conhecer o serviço</Link> : <><button type="button" className={styles.destination} disabled aria-describedby="destination-note">Conhecer o serviço</button><p id="destination-note" className={styles.status}>Indisponível: a página individual ainda não está disponível para acesso.</p></>}
        </> : <><h2 id="preview-title">Escolha uma prévia</h2><p>Selecione o painel por clique, teclado ou toque. As informações aparecem aqui antes de qualquer navegação.</p></>}
      </section>
    </div>
  );
}
