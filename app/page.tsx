import { SiteHeader } from "@/components/layout/site-header";
import { HomeSections } from "@/components/sections/home-sections";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="prototype-notice">
        <div className="container notice-inner">
          <strong>Protótipo local · estudo cinematográfico</strong>
          <span>Identidade e conteúdo preliminares, não aprovados para publicação.</span>
        </div>
      </div>
      <SiteHeader />
      <main id="conteudo" tabIndex={-1}><HomeSections /></main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <p>Auto Detailer Toledo</p>
          <span>Estudo visual · logo e fotografias oficiais pendentes</span>
          <a href="#inicio">Voltar ao início</a>
        </div>
      </footer>
    </>
  );
}
