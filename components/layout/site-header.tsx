export function SiteHeader() {
  return (
    <header className="site-header" id="inicio">
      <div className="container header-inner">
        <a className="brand-name" href="#inicio" aria-label="Auto Detailer Toledo — início">
          Auto Detailer <strong>Toledo</strong>
        </a>
        <nav aria-label="Seções da página inicial">
          <a href="#ppf">PPF</a>
          <a href="#trabalhos">Trabalhos</a>
          <a href="#familia">Nossa história</a>
          <a href="#contato" className="nav-contact">Contato</a>
        </nav>
      </div>
    </header>
  );
}
