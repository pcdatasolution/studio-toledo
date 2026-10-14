# Arquitetura do site — Auto Detailer Toledo

**Data:** 09/10/2026 · America/Fortaleza  
**Status:** PROPOSTA DOCUMENTAL, sujeita à revisão do idealizador e aprovação do proprietário. Não autoriza implementação, produção de imagens ou publicação.  
**Fonte:** briefing, pesquisa, design, conteúdo e inspeção local desta rodada.

## 1. Evidência e governança

- **VERIFICADO NO PROJETO:** arquivo, rota ou comportamento identificado por leitura do código; não comprova oferta comercial.
- **INFORMADO NO BRIEF:** relato preliminar, preservando suas pendências.
- **OBSERVADO EM ARQUIVO FORNECIDO PELO USUÁRIO:** inspeção direta de referência local; não navegação no Instagram, comprovação de autoria ou licença.
- **DIRETRIZ DO SOLICITANTE:** experiência cinematográfica, mapa ampliado e navbar centralizada pedidos nesta rodada. Não equivale à confirmação do proprietário sobre fatos comerciais.
- **PROPOSTA:** solução editorial/técnica a revisar.
- **PENDENTE:** confirmação, material, autorização ou aprovação ainda necessária.

PPF é a única especialidade específica INFORMADA no brief; sua oferta atual e especificações exigem validação. Polimento, revestimento cerâmico, IR90 e troca lateral de PPF não são serviços confirmados. Slogan preservado como proposta: “Seu carro é parte da nossa família.” Não inferir parceria com montadoras, certificações ou resultados a partir de veículos e referências.

## 2. Diagnóstico local verificado

Branch `main`; HEAD `fec45bc1b5a4b7b3a24d2b28c50b49418390bea1`. Antes da tarefa: `app/globals.css`, `app/layout.tsx` e `app/page.tsx` modificados; `components/`, `docs/references/` e `public/` não rastreados. Nenhuma alteração anterior foi descartada.

Só `app/page.tsx` define página pública própria: `/`. Não há `/ppf`, catálogo ou páginas internas. `app/layout.tsx` mantém metadata de protótipo com noindex/nofollow; não alterar nesta tarefa. A navbar atual liga a `#ppf`, `#trabalhos`, `#familia` e `#contato`. A Home contém Hero e seções posteriores, portanto tem rolagem vertical hoje.

Componentes existentes: `SiteHeader`, `HomeSections`, `CinematicHero`, `PendingContact` e `PhotoPlaceholder`. Hero: cenário conceitual, logo refinada, PPF em imagem, dois serviços provisórios, catálogo sem destino, carro V2 e orçamento desabilitado. Painéis são prévias, não links comerciais. Não confundir a seção `#ppf` com uma rota.

## 3. Mapa e condições de publicação

| Rota proposta | Função | Documento | Condição mínima |
|---|---|---|---|
| `/` | Entrada visual e escolha de destino | [HOME](pages/HOME.md) | Marca/canal e destinos validados; conceito visual identificado |
| `/servicos` | Catálogo de ofertas confirmadas | [SERVICES](pages/SERVICES.md) | Catálogo aprovado; pode começar apenas com PPF se validado |
| `/servicos/ppf` | Especialidade e informação técnica/comercial | [SERVICE-DETAIL](pages/SERVICE-DETAIL.md) | Oferta, limites, materiais e respostas revisados |
| `/servicos/[slug]` | Expansão por serviço confirmado | [SERVICE-DETAIL](pages/SERVICE-DETAIL.md) | Slug explícito em lista aprovada; conteúdo original suficiente |
| `/trabalhos` | Portfólio contextualizado | [WORKS](pages/WORKS.md) | Pelo menos um caso real autorizado e verificável |
| `/sobre` | História e responsáveis | [ABOUT](pages/ABOUT.md) | Fatos, funções, imagens e slogan revisados |
| `/faq` | Dúvidas práticas e encaminhamento | [FAQ](pages/FAQ.md) | Perguntas reais e respostas úteis aprovadas |
| `/contato` | Fonte canônica de dados e orçamento | [CONTACT](pages/CONTACT.md) | Canal, endereço, horários e rotina confirmados |

**Contagem:** 7 páginas-base (incluindo PPF) e 1 template reutilizável, não uma oitava página literal `[slug]`. Quantidade futura de serviços não definida. Publicação escalonada: retirar itens de navegação de páginas ainda inexistentes; não publicar páginas vazias ou placeholders indexáveis para completar o mapa.

Hierarquia: Home → Serviços → PPF/outros slugs aprovados. Trabalhos, Sobre, FAQ e Contato são destinos globais. Serviço → caso pertinente em Trabalhos, FAQ específica e Contato. Sobre → serviço e Contato. FAQ → fonte técnica do serviço e Contato. Não criar rotas de cases, blog ou bairros neste escopo.

## 4. Compatibilidade com /ppf

**VERIFICADO:** `/ppf` nunca foi implementada no estado inspecionado. Está proposta em CONTENT.md, não publicada. Recomendar `/servicos/ppf` como endereço canônico da futura página e atualizar os links em etapa autorizada. Não há migração executada.

**PROPOSTA condicionada:** se domínio anterior, links externos ou URLs publicadas forem confirmados, planejar redirecionamento permanente de `/ppf` para `/servicos/ppf`, sem segunda página duplicada; testar cadeia e canonical no lançamento. Se não houver uso anterior, uma compatibilidade preventiva poderá ser aprovada, mas não é necessária para integrar a aplicação atual. Não instalar redirect nem criar rota hoje. Âncoras antigas da Home devem continuar funcionando enquanto as seções existirem; remoção/migração depende da revisão do escopo.

## 5. Navbar centralizada e dropdown

**DIRETRIZ:** Serviços · Trabalhos · Nossa História · FAQ · Orçamento, sem nome à esquerda. Marca central na Hero; prever em páginas internas um acesso “Início” ou logo discreta que volte a `/`, sem reinstalar automaticamente o bloco de texto à esquerda.

Serviços tem um botão de expansão próprio; lista: PPF primeiro → `/servicos/ppf`; adicionais apenas aprovados/publicados; “Ver todos os serviços” → `/servicos`. Não misturar um mesmo controle entre navegar e abrir. Usar lista de links normal com disclosure, não papel de menu de aplicativo por padrão.

Desktop: conteúdo centralizado; clique abre/fecha. Hover pode dar feedback, mas não é única forma de abrir. Tab alcança botão e links; Enter/Espaço aciona disclosure; Escape fecha e devolve foco ao botão; clique fora fecha sem roubar foco. Estado expandido e relação botão/lista anunciados. Foco visível; itens ativos identificados além da cor.

Mobile: controle de navegação com rótulo, abertura por toque e submenu explícito; evitar hover e submenus fora da tela. Preferir painel em fluxo. Se um drawer modal for aprovado, acrescentar controle de foco, conteúdo de fundo inerte, Escape e retorno de foco. Links com área de toque confortável, meta 44 × 44 px. Movimento reduzido mantém abertura imediata e o mesmo conteúdo.

Navbar só lista destinos existentes na fase implementada. Orçamento leva a `/contato` assim que essa rota estiver pronta; WhatsApp continua condicional. No estado atual, a âncora Contato permanece funcional e o CTA indisponível.

## 6. Home sem rolagem: meta condicional

Preservar Hero V3 como baseline de composição, sem congelar altura em pixels ou aplicar `overflow:hidden` ao documento. **PROPOSTA:** entrada visual de uma tela em desktop confortável; dimensões dependem de viewport, navbar, avisos e CTA. Em notebook baixo, zoom, texto ampliado, mobile ou notas abertas, permitir rolagem natural. Contato, foco e avisos necessários nunca podem ser cortados para cumprir a meta estética.

A migração das seções atuais de PPF/trabalhos/família/contato para páginas internas é uma decisão futura explícita. Não removê-las até haver destinos com conteúdo equivalente aprovado. Não esconder conteúdo somente no desktop. O slogan tem contexto institucional; a proposta canônica de ocorrência principal em Sobre continua pendente.

## 7. Padrões compartilhados e manutenção

**Candidatos, ainda não criados:** navegação global, shell de ambiente, breadcrumb das páginas de serviço, título semântico, superfície de leitura, CTA seguro, caso contextualizado e registro editorial de mídia. Camada de ambiente não substitui HTML; conteúdo principal legível sobre superfície com contraste. Imagens reais separadas de cenários conceituais.

Dados e mídia futuramente em `content/` com status de aprovação, fonte, responsável e data; slugs em lista explícita. Template exige conteúdo aprovado antes de gerar página. Metadados por rota; nenhum preço, garantia ou schema de avaliação padrão. FAQ global referencia detalhes específicos em vez de duplicar textos extensos. O clique em WhatsApp não confirma envio, orçamento ou venda.

## 8. Relação com os documentos canônicos

| Documento | Divergência / proposta de revisão futura |
|---|---|
| BRIEF.md | Mantém fatos relatados e lacunas. Não amplia catálogo; validar identificação e operação antes de copy final |
| RESEARCH.md | SEO continua exploratório; não há métricas novas nem auditoria. Referências locais agora disponíveis não autorizam reutilização |
| DESIGN.md | Direção preliminar B + A convive com Hero cinematográfica solicitada; proposta de revisar princípios de ambientes, navbar e legibilidade após aprovação |
| CONTENT.md | Propõe quatro páginas, `/ppf` e Home com resumos. Novo plano amplia para sete páginas-base, `/servicos/ppf`, FAQ/portfólio e Home visual. Requer revisão expressa, sem substituir automaticamente o cânone |
| Implementação | Navbar com marca à esquerda e seções por âncoras; nova proposta é multipágina. Nenhum desses componentes foi alterado aqui |

O estudo `hero-toledo-conceito-v1.png` orienta composição conforme solicitação anterior; aprovação visual do idealizador não confirma serviços do estudo nem aprovação comercial do proprietário.

## 9. Ordem de implementação sugerida

1. Revisar mapa, escopo e divergências; confirmar nome, catálogo, PPF, canais, história e direitos de mídia.
2. Aprovar inventários e coletar originais reais; definir política de uso identificado dos ambientes conceituais.
3. Implementar navegação confiável sem animação e Contato com dados validados; manter links só para destinos prontos.
4. Implementar template e PPF, depois catálogo com ofertas aprovadas; revisar eventual compatibilidade `/ppf`.
5. Implementar Sobre e FAQ com revisão editorial; Trabalhos somente quando houver caso autorizado.
6. Migrar cuidadosamente a Home para entrada visual, após equivalência dos conteúdos internos; verificar notebook baixo, mobile e zoom.
7. Adicionar transições progressivas, medir impacto e manter caminho sem movimento. Não condicionar leitura ou orçamento ao efeito.
8. Revisar publicação, metadados e indexação em uma etapa própria autorizada; nada é publicado por este plano.

## 10. Decisões abertas e critérios gerais

Confirmar sete páginas ou lançamento reduzido; catálogo vigente e prioridade PPF; nome e identidade oficial; slogan; portfólio mínimo e consentimentos; WhatsApp/pin/horários; papel dos ambientes IA; tipografia; orçamento de mídia e manutenção; política de animação; destino da Home atual e URLs anteriores. Não presumir consentimento por silêncio.

Aceitação: nenhum link quebrado ou serviço fictício; rotas diretas funcionais sem animação; contexto conceitual identificável; navegação por teclado e toque; foco nunca encoberto; rolagem quando necessária; informações comerciais aprovadas; inventários coerentes com cada página. Ver [inventário de imagens](ASSET-INVENTORY.md), [textos](COPY-INVENTORY.md) e [transições](NAVIGATION-TRANSITIONS.md).


## 11. Decisões do idealizador — 10/10/2026

**APROVADO PELO IDEALIZADOR:** arquitetura multipágina deste documento; Serviços como ambiente cinematográfico; galeria panorâmica com grandes imagens integradas às paredes; expansão para qualquer quantidade de serviços confirmados; destaque visual de PPF; seleção com prévia informativa antes de abrir o detalhe; vídeos reais do Toledo quando disponíveis e autorizados; mobile por toque sem depender de hover. Transições entre ambientes estão aprovadas como direção futura, não implementadas nesta rodada.

Essa aprovação é de arquitetura/direção visual. **PENDENTE DE APROVAÇÃO COMERCIAL PELO PROPRIETÁRIO:** catálogo vigente, oferta/especificações de PPF, demais serviços, canais, condições, identidade oficial, direitos de mídia e copy pública. Não converter estudo em serviço confirmado.

**AUTORIZAÇÃO DE IMPLEMENTAÇÃO NESTA RODADA:** somente `/servicos`, componentes necessários e modelo tipado. **VERIFICADO NO PROJETO AO FINAL DA RODADA:** `/servicos` acrescentada como protótipo preliminar; `/servicos/ppf`, Trabalhos, Sobre, FAQ e Contato continuam ausentes. O diagnóstico da seção 2 descreve o estado anterior, de 09/10/2026.

Home e navbar existente preservadas. O protótipo Serviços tem navegação própria apenas para destinos existentes: Home, Serviços e contato por âncora na Home. A galeria possui um único serviço demonstrativo e prévia selecionável; nenhum catálogo fictício foi criado. O acesso ao detalhe está desabilitado. O noindex/nofollow do protótipo permanece.