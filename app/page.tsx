import { SiteHeader } from "@/components/layout/site-header";
import { HomeSections } from "@/components/sections/home-sections";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <SiteHeader />
      <main id="conteudo" tabIndex={-1}><HomeSections /></main>
      <footer className={`site-footer ${styles.footer}`}>
        <div className="container footer-inner">
          <p>Auto Detailer Toledo</p>
          <span>Estudo visual · logo e fotografias oficiais pendentes</span>
          <a href="#inicio">Voltar ao início</a>
        </div>
      </footer>
    </>
  );
}
