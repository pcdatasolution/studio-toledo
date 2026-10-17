"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import { CredibilitySection } from "@/components/sections/credibility-section";
import styles from "../experiments/scroll-video-experiment.module.css";

/** Scroll fractions, independent of the clip's duration. */
export const SCROLL_VIDEO_TIMING = {
  panels: [0, 0.16],
  car: [0, 0.23],
  video: [0.05, 0.85],
  arrival: [0.85, 1],
  dissolveIn: [0.02, 0.1],
  dissolveOut: [0.82, 0.87],
  seekStep: 1 / 30,
  seekTimeout: 1800,
  metadataTimeout: 10000,
} as const;

const fraction = (value: number, range: readonly [number, number]) => Math.min(1, Math.max(0, (value - range[0]) / (range[1] - range[0])));

function TransitionHero({ context }: { context: "home" | "experiment" }) {
  return (
    <section className={`studio-hero ${styles.hero}`} aria-labelledby={context === "home" ? "hero-title" : "experiment-title"}>
      <h1 id={context === "home" ? "hero-title" : "experiment-title"} className="sr-only">{context === "home" ? "Auto Detailer Toledo" : "Auto Detailer Toledo — estudo de transição entre Hero e Credibilidade"}</h1>
      <div className="studio-composition container">
        <Image className="studio-logo" src="/logo/Logo Automotivo Dourado Toledo Detailer.png" alt="Auto Detailer Toledo" width={1774} height={887} preload />
        <div className="studio-stage">
          <ul className="studio-panels" aria-label="Serviços — estudo visual">
            <li className="studio-panel studio-panel--ppf"><span className="studio-ppf-placeholder"><strong>PPF</strong><span>Paint Protection Film</span></span></li>
            <li className="studio-panel studio-panel--pending"><span>Serviço a confirmar</span></li>
            <li className="studio-panel studio-panel--pending"><span>Serviço a confirmar</span></li>
            <li className="studio-panel studio-panel--catalog"><Link className="studio-catalog-link" href="/servicos"><span>Conheça todos os nossos serviços</span></Link></li>
          </ul>
          <div className="studio-vehicle"><Image className="studio-vehicle-image" src="/images/hero/rolls-royce-preto-v2.png" alt="Rolls-Royce conceitual, sem vínculo com o portfólio do Toledo." width={1671} height={941} sizes="(max-width: 759px) 100vw, 880px" preload /></div>
        </div>
      </div>
    </section>
  );
}

export function StudioScrollExperience({ context, children }: { context: "home" | "experiment"; children?: ReactNode }) {
  const arrivalId = context === "home" ? "studio-arrival" : "experiment-arrival";
  const TrackContainer = context === "home" ? "div" : "main";
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const arrivalRef = useRef<HTMLElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  const skipToArrival = useCallback((event: MouseEvent<HTMLAnchorElement> | globalThis.MouseEvent) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const arrival = arrivalRef.current;
    if (!arrival) return;
    event.preventDefault();
    // Bypass the global anchor scroll padding and do not focus an inert target.
    const track = trackRef.current;
    const destination = rootRef.current?.dataset.enhanced === "true" && track
      ? track.getBoundingClientRect().top + window.scrollY + track.offsetHeight - arrival.offsetHeight
      : arrival.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: destination, behavior: "instant" });
    arrival.inert = false;
    arrival.setAttribute("aria-hidden", "false");
    arrival.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const hero = heroRef.current;
    const video = videoRef.current;
    const arrival = arrivalRef.current;
    if (!root || !track || !hero || !video || !arrival) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let navigationFrame = 0;
    let duration = 0;
    let desiredTime = 0;
    let inFlight = false;
    let failed = false;
    let disposed = false;
    let seekTimer: ReturnType<typeof setTimeout> | undefined;
    let metadataTimer: ReturnType<typeof setTimeout> | undefined;

    const announce = (message: string) => { if (statusRef.current) statusRef.current.textContent = message; };
    const fail = () => {
      failed = true;
      inFlight = false;
      clearTimeout(seekTimer);
      clearTimeout(metadataTimer);
      video.pause();
      root.dataset.video = "fallback";
      announce("Vídeo indisponível para controle por rolagem. A transição usa as imagens estáticas.");
      schedule();
    };
    const seek = () => {
      if (disposed || failed || preference.matches || !duration || inFlight || video.readyState < 2) return;
      const target = Math.min(desiredTime, Math.max(0, duration - 0.05));
      if (Math.abs(video.currentTime - target) < SCROLL_VIDEO_TIMING.seekStep) return;
      try {
        inFlight = true;
        video.pause();
        video.currentTime = target;
        seekTimer = setTimeout(fail, SCROLL_VIDEO_TIMING.seekTimeout);
      } catch { fail(); }
    };
    const draw = () => {
      frame = 0;
      if (disposed) return;
      const reduced = preference.matches;
      const bounds = track.getBoundingClientRect();
      // The track reserves travel separately from the full reading height.
      // The arrival remains sticky until this travel is exhausted.
      const distance = Math.max(1, bounds.height - arrival.getBoundingClientRect().height);
      const progress = reduced ? 0 : Math.min(1, Math.max(0, -bounds.top / distance));
      const panels = fraction(progress, SCROLL_VIDEO_TIMING.panels);
      const car = fraction(progress, SCROLL_VIDEO_TIMING.car);
      const clip = fraction(progress, SCROLL_VIDEO_TIMING.video);
      const entering = fraction(progress, SCROLL_VIDEO_TIMING.arrival);
      root.style.setProperty("--panels", String(panels));
      root.style.setProperty("--car", String(car));
      root.style.setProperty("--arrival", String(reduced ? 1 : entering));
      // The final still dissolves over an opaque video. Fading both layers
      // would let the initial studio show through again during arrival.
      root.style.setProperty("--clip-opacity", String(fraction(progress, SCROLL_VIDEO_TIMING.dissolveIn)));
      root.style.setProperty("--end-opacity", String(reduced ? 1 : failed || !duration ? clip : fraction(progress, SCROLL_VIDEO_TIMING.dissolveOut)));
      root.dataset.progress = progress.toFixed(4);
      // Removed from keyboard and accessibility tree as soon as the panels move.
      hero.inert = !reduced && progress > 0.001;
      hero.setAttribute("aria-hidden", String(hero.inert));
      arrival.inert = !reduced && progress < 0.99;
      arrival.setAttribute("aria-hidden", String(arrival.inert));
      if ((hero.inert && hero.contains(document.activeElement)) || (arrival.inert && arrival.contains(document.activeElement))) {
        if (context === "home") document.querySelector<HTMLAnchorElement>('a[href="#credibilidade"]')?.focus({ preventScroll: true });
        else root.querySelector<HTMLAnchorElement>(`a[href="#experiment-arrival"]`)?.focus({ preventScroll: true });
      }
      desiredTime = clip * duration;
      seek();
    };
    function schedule() { if (!disposed && !frame) frame = requestAnimationFrame(draw); }
    const metadata = () => {
      if (disposed || preference.matches || failed) return;
      if (!Number.isFinite(video.duration) || video.duration <= 0) { fail(); return; }
      duration = video.duration;
      clearTimeout(metadataTimer);
      root.dataset.video = "ready";
      announce("");
      schedule();
    };
    const seeked = () => { clearTimeout(seekTimer); inFlight = false; schedule(); };
    const pause = () => video.pause();
    const modeChanged = () => {
      clearTimeout(metadataTimer);
      clearTimeout(seekTimer);
      video.pause();
      duration = 0;
      inFlight = false;
      failed = false;
      root.dataset.video = "loading";
      root.dataset.enhanced = String(!preference.matches);
      announce("");
      if (preference.matches) { video.removeAttribute("src"); video.load(); }
      else {
        video.src = "/images/enviroments/hero-to-credibility-scroll-g6.mp4";
        video.load();
        metadataTimer = setTimeout(fail, SCROLL_VIDEO_TIMING.metadataTimeout);
      }
      schedule();
    };

    video.addEventListener("loadedmetadata", metadata);
    video.addEventListener("durationchange", metadata);
    video.addEventListener("loadeddata", schedule);
    video.addEventListener("canplay", schedule);
    video.addEventListener("seeked", seeked);
    video.addEventListener("error", fail);
    video.addEventListener("play", pause);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", modeChanged);
    const observer = new ResizeObserver(schedule);
    observer.observe(track);
    // A sticky section's DOM anchor is not its reading destination.
    const navigateToArrival = (event: globalThis.MouseEvent) => {
      if (context !== "home" || !(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('a[href="#credibilidade"]');
      if (link) skipToArrival(event);
    };
    document.addEventListener("click", navigateToArrival);
    modeChanged();
    if (context === "home" && window.location.hash === "#credibilidade") {
      // Let the browser finish its native hash restoration before correcting
      // the sticky anchor to the same destination used by the navigation link.
      navigationFrame = requestAnimationFrame(() => {
        navigationFrame = requestAnimationFrame(() => {
          const destination = track.getBoundingClientRect().top + window.scrollY + track.getBoundingClientRect().height - arrival.getBoundingClientRect().height;
          window.scrollTo({ top: preference.matches ? arrival.getBoundingClientRect().top + window.scrollY : destination, behavior: "instant" });
          schedule();
        });
      });
    }
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      cancelAnimationFrame(navigationFrame);
      clearTimeout(metadataTimer);
      clearTimeout(seekTimer);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", modeChanged);
      observer.disconnect();
      document.removeEventListener("click", navigateToArrival);
      video.removeEventListener("loadedmetadata", metadata);
      video.removeEventListener("durationchange", metadata);
      video.removeEventListener("loadeddata", schedule);
      video.removeEventListener("canplay", schedule);
      video.removeEventListener("seeked", seeked);
      video.removeEventListener("error", fail);
      video.removeEventListener("play", pause);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [context, skipToArrival]);

  return (
    <div ref={rootRef} className={styles.experiment}>
      {context === "experiment" && <header className={styles.navigation}>
        <Link href="/">Voltar à Home</Link>
        <a href="#experiment-arrival" onClick={skipToArrival}>Pular para Credibilidade</a>
      </header>}
      <p ref={statusRef} className={styles.status} role="status" />
      <TrackContainer>
        <div ref={trackRef} className={styles.track}>
          <div className={styles.viewport}>
            <div className={styles.start} aria-hidden="true" />
            <video ref={videoRef} className={styles.video} muted playsInline preload="auto" aria-hidden="true" tabIndex={-1} />
            <div className={styles.end} aria-hidden="true" />
            <div ref={heroRef} className={styles.heroLayer}><TransitionHero context={context} /></div>
            <p className={styles.disclaimer}>Experimento visual · cenário e veículo conceituais</p>
          </div>
          <section ref={arrivalRef} id={arrivalId} tabIndex={-1} className={styles.arrival} aria-label="Chegada à Credibilidade">
            <div className={styles.arrivalContent}>
              {children ?? <div className={styles.existingContent}><CredibilitySection /></div>}
            </div>
          </section>
        </div>
      </TrackContainer>
    </div>
  );
}
