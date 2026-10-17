"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { CredibilitySection } from "@/components/sections/credibility-section";
import { business } from "@/content/business";
import styles from "../experiments/facade-transition-experiment.module.css";

export const FACADE_TIMING = {
  contentExit: [0, 0.25],
  darken: [0.15, 0.55],
  facade: [0.4, 0.85],
  information: [0.75, 1],
  travel: "100svh",
  interiorScale: 0.035,
  darkness: 0.78,
} as const;

const fraction = (value: number, range: readonly [number, number]) =>
  Math.min(1, Math.max(0, (value - range[0]) / (range[1] - range[0])));

const READING_RESERVE = { home: "50svh", experiment: "0svh" } as const;

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${business.address}, ${business.locality}`)}`;

const information = [
  { label: "Endereço", placeholder: "Endereço completo solicitado. Aguardando confirmação." },
  { label: "Horário de funcionamento", placeholder: "Dias e horários solicitados. Aguardando confirmação." },
  { label: "WhatsApp", placeholder: "Número oficial solicitado. Contato ainda indisponível." },
  { label: "Google Maps", placeholder: "Link de localização solicitado. Destino ainda não validado." },
] as const;

export function FacadeTransition({ context }: { context: "home" | "experiment" }) {
  const Container = context === "home" ? "div" : "main";
  const rootRef = useRef<HTMLDivElement>(null);
  const readingRef = useRef<HTMLDivElement>(null);
  const passageRef = useRef<HTMLDivElement>(null);
  const informationRef = useRef<HTMLElement>(null);
  const skipRef = useRef<HTMLAnchorElement>(null);
  const [imageFailed, setImageFailed] = useState(false);

  const skipToInformation = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const passage = passageRef.current;
    const section = informationRef.current;
    if (!passage || !section) return;
    event.preventDefault();
    const animated = rootRef.current?.dataset.enhanced === "true";
    const bounds = passage.getBoundingClientRect();
    const top = animated
      ? scrollY + bounds.top + bounds.height - section.getBoundingClientRect().height
      : scrollY + section.getBoundingClientRect().top;
    window.scrollTo({ top, behavior: "instant" });
    section.inert = false;
    section.removeAttribute("aria-hidden");
    section.focus({ preventScroll: true });
  };

  useEffect(() => {
    const root = rootRef.current;
    const reading = readingRef.current;
    const passage = passageRef.current;
    const section = informationRef.current;
    if (!root || !reading || !passage || !section) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const draw = () => {
      frame = 0;
      const animated = !preference.matches;
      root.dataset.enhanced = String(animated);
      const bounds = passage.getBoundingClientRect();
      const travel = Math.max(1, bounds.height - section.getBoundingClientRect().height);
      const progress = animated ? Math.min(1, Math.max(0, -bounds.top / travel)) : 0;
      root.dataset.progress = progress.toFixed(4);
      root.style.setProperty("--content-exit", String(fraction(progress, FACADE_TIMING.contentExit)));
      root.style.setProperty("--darkness", String(fraction(progress, FACADE_TIMING.darken) * FACADE_TIMING.darkness));
      root.style.setProperty("--interior-scale", String(1 + fraction(progress, FACADE_TIMING.darken) * FACADE_TIMING.interiorScale));
      root.style.setProperty("--facade", String(animated ? fraction(progress, FACADE_TIMING.facade) : 1));
      root.style.setProperty("--information", String(animated ? fraction(progress, FACADE_TIMING.information) : 1));
      reading.inert = animated && progress >= FACADE_TIMING.contentExit[1];
      reading.setAttribute("aria-hidden", String(reading.inert));
      section.inert = animated && progress < 0.999;
      section.setAttribute("aria-hidden", String(section.inert));
      if ((reading.inert && reading.contains(document.activeElement)) || (section.inert && section.contains(document.activeElement))) {
        const destination = context === "home"
          ? document.querySelector<HTMLAnchorElement>('a[href="#credibilidade"]')
          : skipRef.current;
        destination?.focus({ preventScroll: true });
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(draw); };
    draw();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(reading);
    observer.observe(section);
    observer.observe(passage);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", schedule);
      observer.disconnect();
    };
  }, [context]);

  return (
    <div ref={rootRef} className={styles.experiment} style={{ "--travel": FACADE_TIMING.travel, "--reading-reserve": READING_RESERVE[context] } as CSSProperties} data-image={imageFailed ? "error" : "available"}>
      {context === "experiment" && <header className={styles.navigation}>
        <Link href="/">Voltar à Home</Link>
        <a ref={skipRef} href="#facade-information" onClick={skipToInformation}>Pular para informações</a>
      </header>}
      <Container>
        {context === "experiment" && <h1 className="sr-only">Estudo de transição da Credibilidade para a fachada</h1>}
        <div className={styles.track}>
          <div className={styles.scene} aria-hidden="true">
            <div className={styles.interior} />
            <div className={styles.darkening} />
            <div className={styles.facade}>
              <Image className={styles.facadeImage} src="/images/enviroments/studio-facade-dusk.png" alt="" fill sizes="100vw" preload unoptimized onError={() => setImageFailed(true)} />
              <p className={styles.sceneNote}>Fachada conceitual · dados da imagem não verificados</p>
            </div>
          </div>
          <div className={styles.readingReserve}>
            <div ref={readingRef} className={styles.reading}>
              <CredibilitySection />
            </div>
          </div>
          <div ref={passageRef} className={styles.passage}>
            <section ref={informationRef} id="facade-information" tabIndex={-1} className={styles.information} aria-labelledby="facade-information-title" aria-describedby="facade-context">
              <div className={styles.informationContent}>
                <div className={`${styles.informationPanel} ${context === "home" ? styles.contactPanel : ""}`}>
                  {context === "home" ? <>
                    <p className={styles.contactEyebrow}>VISITE NOSSO STUDIO</p>
                    <h2 id="facade-information-title">Vamos conversar.</h2>
                    <p className={styles.contactName}>{business.commercialName}</p>
                    <div className={styles.contactDetails}>
                      <div className={styles.contactRow}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
                        <address>{business.address}<br />{business.locality}</address>
                      </div>
                      <div className={styles.contactRow}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                        <dl className={styles.contactHours}>
                          {business.openingSchedule.map(({ days, hours }) => <div key={days}><dt>{days}</dt><dd>{hours}</dd></div>)}
                        </dl>
                      </div>
                      <div className={styles.contactRow}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m8 3 3 5-3 3c1.5 3 2 3.5 5 5l3-3 5 3c0 3-2 5-5 5C9 21 3 15 3 8c0-3 2-5 5-5Z" /></svg>
                        <a className={styles.contactPhone} href={`tel:+${business.whatsapp}`}>{business.telephone}</a>
                      </div>
                    </div>
                    <div className={styles.contactActions}>
                      <a className={styles.contactPrimary} href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer">Conversar no WhatsApp<span className="sr-only"> (abre em nova aba)</span></a>
                      <a className={styles.contactSecondary} href={mapsHref} target="_blank" rel="noopener noreferrer">Como chegar<span className="sr-only"> (abre em nova aba)</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 19 19 5M6 5h13v13" /></svg></a>
                    </div>
                    <p id="facade-context" className={styles.note}>Fachada conceitual. Textos e contatos na imagem não representam os dados de atendimento deste painel.</p>
                  </> : <>
                  <h2 id="facade-information-title">Informações da loja</h2>
                  <p className={styles.introduction}>Um lugar para planejar sua visita.</p>
                  <dl className={styles.details}>
                    {information.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.placeholder}</dd></div>)}
                  </dl>
                  <p className={styles.note}>Dados provisórios · materiais já solicitados ao cliente.</p>
                  <p id="facade-context" className={styles.note}>Fachada conceitual, não um registro factual da loja. Textos, números, veículos e QR code na imagem não são informações comerciais verificadas.</p>
                  </>}
                </div>
              </div>
            </section>
          </div>
        </div>
      </Container>
      <p className={styles.status} style={context === "home" ? { top: "108px", bottom: "auto" } : undefined} role="status">{imageFailed ? "Imagem conceitual da fachada indisponível. As informações provisórias continuam acessíveis." : ""}</p>
    </div>
  );
}
