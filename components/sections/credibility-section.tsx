"use client";

import Image from "next/image";
import { useState } from "react";
import { canDisplay, credibility, type CredibilityMedia } from "@/content/credibility";
import styles from "./credibility-section.module.css";

const collectionLabels = {
  requested: "material solicitado",
  received: "material recebido, aguardando validação",
  "in-validation": "material em validação",
  approved: "material aprovado, aguardando integração",
  integrated: "material em revisão",
};

function MediaPanel({ item, primary = false }: { item: CredibilityMedia; primary?: boolean }) {
  const [imageFailed, setImageFailed] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const authorized = canDisplay(item);
  const image = authorized && item.image?.kind === "real" && item.image.usageApproval === "approved" ? item.image : undefined;
  const video = authorized && item.video?.kind === "real" && item.video.usageApproval === "approved" && item.video.transcript.trim() ? item.video : undefined;
  const showVideo = primary && video && !videoFailed;
  const showImage = image && !imageFailed;

  return (
    <figure className={`${styles.panel} ${primary ? styles.primary : styles.secondary}`}>
      <div className={styles.media}>
        {showVideo ? (
          <video controls playsInline preload="none" poster={showImage ? image.src : undefined} aria-label={item.title} onError={() => setVideoFailed(true)}>
            <source src={video.src} />
            {video.captions && <track kind="captions" src={video.captions} srcLang="pt-BR" label="Português" default />}
          </video>
        ) : showImage ? (
          <Image src={image.src} alt={image.alt} fill sizes={primary ? "(max-width: 759px) 90vw, 65vw" : "(max-width: 759px) 90vw, 30vw"} onError={() => setImageFailed(true)} />
        ) : (
          <div className={styles.placeholder}>
            <svg viewBox="0 0 64 48" fill="none" aria-hidden="true">
              <path d="M8 14V6h12m24 0h12v8M8 34v8h12m24 0h12v-8" />
              {primary ? <path d="m27 17 12 7-12 7V17Z" /> : <><path d="m17 32 10-11 8 8 6-6 8 9" /><circle cx="42" cy="16" r="3" /></>}
            </svg>
            <p>{imageFailed || videoFailed ? "Mídia indisponível nesta prévia." : item.placeholder}</p>
            <span>Placeholder · {imageFailed || videoFailed ? "aguardando revisão" : collectionLabels[item.status]}</span>
          </div>
        )}
      </div>
      <figcaption className={styles.caption}>
        <h3>{item.title}</h3>
        {authorized && item.caption && <p>{item.caption}</p>}
      </figcaption>
      {showVideo && <details className={styles.transcript}><summary>Ler descrição e transcrição do vídeo</summary><p>{video.transcript}</p></details>}
    </figure>
  );
}

export function CredibilitySection() {
  const testimonial = credibility.testimonial;
  const showTestimonial = canDisplay(testimonial) && testimonial.quote?.trim() && testimonial.attribution?.trim();

  return (
    <section className={styles.section} id="credibilidade" aria-labelledby="credibility-title" aria-describedby="credibility-context">
      <div className={styles.scenery} aria-hidden="true" />
      <div className={styles.content}>
        <header className={styles.intro}>
          <h2 id="credibility-title">Mais perto <br />de cada detalhe.</h2>
          <div className={styles.editorial}>
            <p>Um espaço para conhecer o trabalho, os veículos e as pessoas por trás de cada etapa.</p>
            <p className={styles.note}>Chamada editorial provisória · estudo visual de Credibilidade.</p>
          </div>
        </header>
        <div className={styles.composition}>
          <MediaPanel item={credibility.work} primary />
          <div className={styles.photographs}>
            {credibility.photos.map((item) => <MediaPanel key={item.id} item={item} />)}
          </div>
        </div>
        <aside className={styles.testimonial} aria-labelledby="testimonial-title">
          <h3 id="testimonial-title">Relatos de quem passou por aqui</h3>
          {showTestimonial ? <figure><blockquote><p>{testimonial.quote}</p></blockquote><figcaption>{testimonial.attribution}</figcaption></figure> : <p>Espaço reservado para depoimentos reais e autorizados.<br /><span>Nenhum depoimento apresentado neste protótipo.</span></p>}
        </aside>
        <p id="credibility-context" className={styles.context}>Cenário conceitual, não um registro das instalações. Fotos, vídeos e relatos já solicitados ao cliente; recebimento e autorizações ainda não confirmados.</p>
      </div>
    </section>
  );
}
