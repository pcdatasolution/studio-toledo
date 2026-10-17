export function SiteHeader() {
  return (
    <header className="site-header" id="inicio">
      <div className="container header-inner">
        <a className="brand-name" href="#inicio" aria-label="Auto Detailer Toledo — início">
          Auto Detailer <strong>Toledo</strong>
        </a>
        <nav aria-label="Seções da página inicial">
          <a href="/servicos">Serviços</a>
          <a href="#credibilidade">Credibilidade</a>
        </nav>
      </div>
    </header>
  );
}
