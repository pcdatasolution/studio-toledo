"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PendingContact } from "@/components/ui/pending-contact";

export function CinematicHero() {
  const [selected, setSelected] = useState(false);
  return (
    <section className="hero studio-hero" aria-labelledby="hero-title">
      <Image className="studio-scenery" src="/images/enviroments/studio-entrada-v2.png" alt="" fill sizes="100vw" preload />
      <div className="studio-composition container">
        <h1 id="hero-title" className="sr-only">Auto Detailer Toledo — estética automotiva em Fortaleza</h1>
        <Image className="studio-logo" src="/logo/Logo Automotivo Dourado Toledo Detailer.png" alt="Auto Detailer Toledo" width={1774} height={887} sizes="(max-width: 759px) 240px, 300px" preload />
        <div className="studio-stage">
          <ul className="studio-panels" aria-label="Serviços — estudo visual">
            <li className="studio-panel studio-panel--ppf" data-selected={selected}>
              <button type="button" className="studio-panel-control" aria-label="Selecionar prévia visual de PPF" aria-pressed={selected} aria-describedby="studio-notes" onPointerEnter={(e) => { if (e.pointerType === "mouse") setSelected(true); }} onPointerLeave={() => setSelected(false)} onFocus={() => setSelected(true)} onBlur={() => setSelected(false)} onClick={() => setSelected(true)}>
                <span className="studio-ppf-placeholder">
                  <strong>PPF</strong>
                  <span>Paint Protection Film</span>
                </span>
              </button>
            </li>
            <li className="studio-panel studio-panel--pending" tabIndex={0} aria-label="Prévia visual de serviço a confirmar, sem navegação" onPointerDown={(e) => e.currentTarget.focus()}><span>Serviço a confirmar</span></li>
            <li className="studio-panel studio-panel--pending" tabIndex={0} aria-label="Prévia visual de serviço a confirmar, sem navegação" onPointerDown={(e) => e.currentTarget.focus()}><span>Serviço a confirmar</span></li>
            <li className="studio-panel studio-panel--catalog"><Link className="studio-catalog-link" href="/servicos"><span>Conheça todos os nossos serviços</span></Link></li>
          </ul>
          <div className="studio-vehicle"><Image className="studio-vehicle-image" src="/images/hero/rolls-royce-preto-v2.png" alt="Rolls-Royce preto: veículo conceitual para este estudo visual, sem vínculo com o portfólio do Toledo." width={1671} height={941} sizes="(max-width: 759px) 100vw, (max-width: 1100px) 88vw, 880px" preload /></div>
        </div>
        <div className="studio-budget"><PendingContact label="Faça um orçamento" descriptionId="hero-contact-note" /></div>
      </div>
      <details className="studio-prototype-notes container" id="studio-notes">
        <summary>Sobre este estudo visual</summary>
        <p>Cenário, veículo e logo refinada são ativos conceituais fornecidos para o protótipo; não representam instalações ou serviços reais do Toledo. O painel PPF é provisório, sem fotografia. Identidade e informações comerciais aguardam aprovação.</p>
        <p>O painel PPF permite seleção visual por mouse, foco ou toque; sua página individual ainda não existe. O quarto painel abre o catálogo demonstrativo em /servicos. Os demais serviços aguardam confirmação.</p>
      </details>
    </section>
  );
}
