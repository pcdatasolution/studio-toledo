# Home — Auto Detailer Toledo

**Faixa superior removida — 17/10/2026:** o aviso de protótipo era renderizado incondicionalmente em `app/page.tsx`, tanto em desenvolvimento quanto em build de produção. Sua renderização foi removida exclusivamente da Home; o cabeçalho passa a iniciar em y=0. O projeto continua provisório, com identidade e conteúdo sujeitos à aprovação, como documentado aqui e em SCROLL-VIDEO. Navegação, experiência cinematográfica, Credibilidade e rodapé não foram alterados nesta etapa.

**Implementação em 17/10/2026 — aguardando homologação:** a Home usa `StudioScrollExperience` compartilhada com `/experimentos/scroll-video`, em vez de montar Hero e Credibilidade separadamente. Sequência atual: Hero validada → vídeo GOP 6 controlado pelo scroll → Credibilidade original reutilizada → rodapé estrutural da Home. Mantidos 120svh e intervalos 0–16%, 0–23%, 5–85% e 85–100%. Navegação própria preservada, sem barra experimental. Detalhes, diferenças da Hero anterior, evidências e limitações em [SCROLL-VIDEO](../../experiments/SCROLL-VIDEO.md). As propostas históricas abaixo não indicam aprovação comercial nem outras seções implementadas. O cenário V2 ausente da Hero antiga não é solicitado pela Home integrada; a implementação antiga permanece preservada.

**Data:** 09/10/2026 · America/Fortaleza  
**Status:** PROPOSTA para revisão. Sem copy final, aprovação comercial ou autorização de implementação.  
**Referências:** [Arquitetura](../ARCHITECTURE.md), [imagens](../ASSET-INVENTORY.md), [textos](../COPY-INVENTORY.md), [transições](../NAVIGATION-TRANSITIONS.md); documentos canônicos preservados.

**Rota:** `/`. Home e `/servicos` existem como protótipos. A seção Credibilidade foi acrescentada em 16/10/2026; as demais propostas deste documento não equivalem a implementação ou aprovação comercial.

## 1. Objetivo

Permitir reconhecimento e escolha de destino em uma entrada visual, sem substituir informação técnica ou história.

## 2. Público e intenção de navegação

Visitante novo, pessoa que já conhece Toledo e visitante que compara fornecedores; acesso ao serviço ou contato sem sequência obrigatória.

## 3. Ambiente do estúdio

Garagem principal conceitual; baseline V3, logo, quatro painéis e Rolls-Royce V2. Não é registro das instalações ou trabalho do Toledo.

## 4. Hierarquia visual e estrutura de conteúdo

Logo → painéis → veículo → CTA. H1 semântico identifica empresa/atividade; descrição comercial discreta, após confirmação. Notas de estudo acessíveis sem disputar protagonismo. Não remover as seções atuais nesta etapa.

## 5. Seções e componentes candidatos

CinematicHero e PendingContact existentes como baseline; futuros Navbar centralizada e acesso aos ambientes. Sem acrescentar missão, métricas, depoimentos ou catálogo fictício.

## 6. Interações e CTAs

Painel PPF → /servicos/ppf quando pronta; 2/3 sem destino até serviço validado; 4 → /servicos quando pronto; orçamento → /contato quando pronto ou canal oficial aprovado. Foco/hover elevam; toque seleciona ou navega conforme rótulo e estado. Distinguir seleção de prévia e navegação.

## 7. Imagens necessárias

E01, E03 e E06 permanecem em uso. Em 14/10/2026, E05 (`public/images/services/ppf.png`) foi retirado da exibição, sem excluir o arquivo: painel provisório HTML/CSS com PPF e Paint Protection Film, mantendo posição, proporção 2:3 e seleção. Fotografia real futura depende de autorização. P01 para identidade aprovada e P14/P15 apenas após confirmação. E02/E04 são alternativas antigas, não novos downloads.

## 8. Textos necessários

H01–H04 e G01–G07; identificação, nomes de painéis, orçamento e contexto conceitual. Texto público definitivo não produzido.

## 9. Dados comerciais e técnicos pendentes

Nome/categoria/local, identidade, direitos dos ativos, catálogo e canal. Nenhum telefone encontrado em diretórios vira destino.

## 10. Responsividade e acessibilidade

A Home tem rolagem vertical para conteúdo após a Hero. A composição da Hero permanece preservada. Credibilidade usa coluna única no mobile, sem rolagem horizontal ou conteúdo dependente de hover. Sem foco escondido atrás do carro; sem scroll sequestrado.

## 11. Relação com SEO

Intenção de marca/categoria local. Texto semântico legível por tecnologia assistiva; title/description únicos. Home encaminha à especialidade, sem competir com texto técnico profundo.

## 12. Critérios de validação

Reconhecer marca e serviço; identificar ativos conceituais; todos os destinos prontos; teclado/toque; sem overflow da página; orçamento não simula envio. Rolagem vertical faz parte da experiência.

## 13. Credibilidade — experimento visual de 16/10/2026

Opção B autorizada pelo idealizador para avaliação no navegador: área de trabalho ao fundo e painéis sobrepostos. `CredibilitySection` entra imediatamente após `CinematicHero`, sem alterar a Hero nem remover as seções anteriores. A futura seção Informações não foi implementada nesta rodada.

O cenário conceitual E03 é reutilizado com enquadramento lateral, luz quente e passagem escura; não representa instalações reais nem constitui um novo ativo. Painel principal para vídeo de execução, dois painéis fotográficos e área discreta para depoimento. Sem trabalhos, veículos ou relatos fictícios; os estados vazios são identificados. A chamada “Mais perto de cada detalhe.” é editorial provisória, não alegação comercial aprovada.

A entrada usa CSS vinculado à rolagem: fundo avança de escala 1 para 1,06 e painéis acomodam 24 px. Não move a Hero, controla a rolagem ou usa 3D. Com movimento reduzido, fica estática; sem suporte a scroll timelines, permanece legível e estática. Mobile em fluxo vertical. Vídeo futuro tem controles nativos, sem autoplay, transcrição e suporte a legenda WebVTT.

Dados em `content/credibility.ts`, com estados `requested`, `received`, `in-validation`, `approved` e `integrated`. A coleta nas oito categorias já foi enviada ao cliente, incluindo originais, Google Drive e autorização; recebimento ainda não confirmado. Todos os espaços começam como solicitados. Não enviar novo questionário.

Para integrar material: preencher o item existente com mídia real, legenda factual e referência da aprovação (responsável, data e uso permitido); após validação, aprovar o registro e a mídia separadamente. Somente registros aprovados/integrados com evidência e mídia real autorizada são exibidos. Vídeo exige transcrição; depoimento exige texto e atribuição autorizados. Não cadastrar informações não confirmadas nem usar `ppf-processo-real.jpeg` sem validar origem e permissão. Layout e ordem não dependem da chegada dos arquivos.

Pendentes de avaliação: enquadramento do ambiente reutilizado, escala dos painéis, ritmo da passagem e chamada editorial. Nenhuma aprovação de publicação, catálogo ou condições comerciais decorre deste protótipo.

Validação desta rodada: lint dos arquivos TS/TSX alterados, TypeScript sem emissão e build concluídos. Inspeção no Edge via Playwright em 1440×1000 e 390×844; largura do documento igual à viewport em ambas. Movimento reduzido confirmado sem animações/transformações da seção; scroll timelines reconhecidas no desktop. Sem mídia factual montada no estado inicial. Capturas em `output/playwright/`. Vídeo, legendas e depoimento preenchidos ainda exigirão validação com material autorizado real. Único erro de recurso observado na abertura: favicon ausente, fora deste escopo.

## 14. Composição temporária após homologação — 16/10/2026

A Home renderiza somente Hero e Credibilidade como seções principais. Aviso de protótipo, cabeçalho e rodapé estrutural permanecem. PPF, Trabalhos, Família e Contato da composição anterior estão preservados em `LegacyHomeSections`, sem uso na árvore da Home; os componentes reutilizáveis e os dados não foram excluídos. Esta decisão substitui a manutenção temporária das seções antigas descrita nas seções anteriores, preservadas como histórico.

Navbar mantém estrutura e estilos, com Serviços → `/servicos` e Credibilidade → `#credibilidade`; itens sem destino existente foram retirados. O antigo link de contato na navegação de Serviços passa a `/#credibilidade`, sem alterar catálogo, dados ou comportamento da galeria. Rodapé mantém retorno a `#inicio`. Link de salto permanece alcançável por Tab, aparece apenas com foco visível e aponta ao main da página; não ocupa espaço nem intercepta toques quando oculto.

Hero, Credibilidade, modelo de dados e animações existentes não foram modificados nesta correção. Sem novas transições, páginas ou animações.

Verificações da correção: lint dos TSX afetados, TypeScript e build aprovados. Home e Serviços responderam HTTP 200 no Edge em 1440 e 390 px, sem overflow horizontal ou links internos/âncoras quebrados. Home contém exatamente duas seções principais e nenhum dos quatro IDs antigos. Link de salto oculto inicialmente, visível com Tab e Enter levando foco ao main correto em ambas as páginas. Capturas `output/playwright/home-fix-*.png`.



## 15. Sequência cinematográfica integrada — 17/10/2026

Estado atual para homologação: Hero → travessia cinematográfica de 120svh → Credibilidade com leitura integral → transição de 100svh para fachada → Informações da Loja → rodapé estrutural. Esta composição substitui as composições temporárias descritas acima, preservadas como histórico. O aviso superior de protótipo foi retirado da renderização; o caráter provisório continua documentado.

`HomeSections` compõe `StudioScrollExperience` com `FacadeTransition` no slot da chegada. Existe uma única Credibilidade, dentro da segunda experiência, sem duplicar a Hero ou reiniciar o vídeo. Ambos os experimentos permanecem como referências com seus adaptadores e navegação próprios. A Home usa apenas sua navegação existente; rodapé estrutural preservado. Seeking, GOP 6, coreografias, dissoluções e ativos aprovados permanecem iguais.

Inspeção visual no Chrome em 1920×1080, 1440×900, 1366×768 e 390×844 confirmou chegada legível, leitura antes da segunda passagem, fachada, informações, rodapé e retorno completo. Teclado, hash de Credibilidade, fallback simultâneo, movimento reduzido e composição sem JavaScript verificados. Lint dirigido, TypeScript sem emissão e diff check aprovados. Detalhes e evidências em `docs/experiments/SCROLL-VIDEO.md` e `docs/experiments/FACADE-TRANSITION.md`, seção de integração compartilhada.

Dados comerciais continuam provisórios e a fachada é conceitual; textos incorporados à imagem não são fatos verificados. Zoom nativo, Safari/iOS e aparelhos reais permanecem pendentes. Home pronta para avaliação manual, sem aprovação automática, commit, push ou deploy.

## 16. Repouso inicial da Credibilidade — 17/10/2026

A Home reserva 50svh para manter estável e opaco o enquadramento inicial da Credibilidade antes de liberar a leitura vertical. Configuração centralizada em `READING_RESERVE` no componente `FacadeTransition`; o experimento conserva 0svh. Não há bloco vazio visível, snap, interceptação de entrada ou espera temporal. Movimento reduzido e modo estático não geram a reserva.

A leitura total entre as transições passa de aproximadamente 180/360/493/789 px para 720/810/877/1211 px em 1920×1080, 1440×900, 1366×768 e 390×844. Título e primeiros cards estáveis na reserva, leitura dos depoimentos, segunda passagem posterior, teclado e retorno verificados no Chrome. Percursos de 120svh/100svh, vídeo e conteúdo preservados. Resultados e evidências na seção de reserva de `docs/experiments/SCROLL-VIDEO.md`. Ajuste pronto para homologação manual, sem aprovação automática.
