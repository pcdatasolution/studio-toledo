import { CinematicHero } from "@/components/sections/cinematic-hero";
import { PendingContact } from "@/components/ui/pending-contact";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";

export function HomeSections() {
  return (
    <>
      <CinematicHero />

      <section className="section ppf-section" id="ppf" aria-labelledby="ppf-title">
        <div className="container">
          <div className="section-intro">
            <h2 id="ppf-title">PPF. Conhecer antes de escolher.</h2>
            <p>Entenda a proteção de pintura e o que precisa ser esclarecido antes de contratar.</p>
          </div>
          <div className="ppf-grid">
            <PhotoPlaceholder subject="Aplicação e acabamento" description="Fotografia técnica pendente: uma cena real de aplicação de PPF." format="portrait" />
            <div className="ppf-copy">
              <p className="lead">PPF é a sigla de Paint Protection Film: uma película aplicada à superfície do veículo para ajudar a proteger a pintura.</p>
              <p>A escolha da cobertura e do material deve considerar as áreas a proteger, o estado da pintura e os cuidados de manutenção. Não torna a pintura imune a danos.</p>
              <p className="evidence-note">Explicação geral preliminar · revisão técnica pendente.</p>
              <dl className="technical-questions">
                <div><dt>O que você deseja proteger?</dt><dd>As regiões e opções oferecidas pelo Toledo ainda serão confirmadas.</dd></div>
                <div><dt>O que considerar na escolha?</dt><dd>Material, preparação, cuidados e condições do serviço precisam ser esclarecidos com a equipe.</dd></div>
              </dl>
              <a className="text-link" href="#contato">Ver o espaço de contato</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section work-section" id="trabalhos" aria-labelledby="work-title">
        <div className="container">
          <div className="section-intro">
            <h2 id="work-title">Trabalhos em detalhe.</h2>
            <p>Um espaço para o contexto de cada serviço, da intervenção ao acabamento.</p>
          </div>
          <div className="work-composition">
            <PhotoPlaceholder subject="Um trabalho real, com contexto" description="Área reservada a um caso documentado e autorizado. Nenhum resultado está sendo apresentado." format="wide" />
            <div className="empty-case">
              <h3>Casos ainda não disponíveis</h3>
              <p>O portfólio será composto por imagens próprias e informações validadas sobre o serviço executado.</p>
              <p className="evidence-note">Estado de protótipo · fotos e contexto pendentes.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section family-section" id="familia" aria-labelledby="family-title">
        <div className="container family-grid">
          <div className="family-copy">
            <h2 id="family-title">Seu carro é parte da nossa família.</h2>
            <p className="slogan-note">Slogan proposto pelo idealizador · aplicação experimental na Home, pendente de aprovação.</p>
            <p className="lead">O Auto Detailer Toledo reúne a trajetória de Fernando Toledo na estética automotiva e a participação da família na operação.</p>
            <p>Conheça as pessoas por trás do trabalho.</p>
            <p className="evidence-note">Apresentação preliminar do briefing · história, funções e imagens precisam de validação.</p>
          </div>
          <PhotoPlaceholder subject="Pessoas por trás do cuidado" description="Espaço para responsáveis em atividade, identificados e com autorização de uso." format="portrait" />
        </div>
      </section>

      <section className="section contact-section" id="contato" aria-labelledby="contact-title">
        <div className="container contact-grid">
          <div>
            <h2 id="contact-title">Vamos conversar sobre o seu veículo?</h2>
            <p>Este espaço será o caminho para falar com a equipe e consultar as informações de visita.</p>
            <PendingContact descriptionId="final-contact-note" />
          </div>
          <div className="contact-details">
            <h3>Contato e localização</h3>
            <dl>
              <div><dt>WhatsApp</dt><dd>Canal oficial pendente de confirmação.</dd></div>
              <div><dt>Endereço</dt><dd>Localização completa e pin pendentes de confirmação.</dd></div>
              <div><dt>Atendimento</dt><dd>Dias, horários e orientação de visita pendentes.</dd></div>
            </dl>
            <button type="button" className="route-pending" disabled aria-describedby="route-note">Ver rota</button>
            <p id="route-note" className="pending-note">Indisponível · destino oficial ainda não validado.</p>
          </div>
        </div>
      </section>
    </>
  );
}
