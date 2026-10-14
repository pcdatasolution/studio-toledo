# Navegação entre ambientes — Auto Detailer Toledo

**Data:** 09/10/2026 · America/Fortaleza  
**Status:** PROPOSTA, sem implementação ou aprovação técnica final.  
**Referência:** [Arquitetura](ARCHITECTURE.md), [imagens](ASSET-INVENTORY.md) e páginas em `pages/`.

## 1. Princípio e limites

A navegação normal por páginas é o fundamento. Cinematografia é uma camada progressiva que pode falhar ou ser desativada sem impedir leitura, orçamento, acesso direto, histórico ou teclado. Cenários são representações conceituais, não uma visita virtual fiel às instalações reais.

**VERIFICADO NO PROJETO:** nenhuma transição entre páginas existe; só Home e âncoras internas. Transforms dos painéis não mudam URL. Nenhuma biblioteca, preload ou cenário interno foi instalado/criado nesta tarefa.

**PROPOSTA:** impressão de deslocamento por composição, continuidade de luz e dissolução breve entre cenários 2D. Não prometer câmera 3D, geometria física do local, portas reais ou navegação espacial por gestos. Sem canvas/WebGL ou dependência pressuposta. Viabilidade e custos precisam de estudo técnico posterior.

## 2. Ambientes e disponibilidade

| Destino | Ambiente | Ativo / condição |
|---|---|---|
| `/` | Garagem principal | E03 com logo E01 e veículo E06; uso conceitual identificado |
| `/servicos` | Área de apresentação | P02 pendente; alternativa neutra se não aprovado |
| `/servicos/ppf` | Área técnica de aplicação | P03 pendente; foto técnica P07/P08 separada |
| `/servicos/[slug]` | Área pertinente ao serviço aprovado | Sem cenário/rota automática; acrescentar inventário por oferta |
| `/trabalhos` | Galeria do estúdio | P04 opcional; casos reais P09–P11 indispensáveis |
| `/sobre` | Ambiente institucional | P05 opcional; responsáveis reais P12 |
| `/faq` | Superfície discreta de leitura | Reutilizar P05 se aprovado ou neutro; nenhum novo ativo obrigatório |
| `/contato` | Recepção/escritório | P06 opcional; dados oficiais e fachada real P13 independentes |

Continuidade: temperatura quente, eixo de horizonte compatível, escala de entrada e luminância moderadas. Cada cenário é independente; não esticar fotos para alinhar perspectiva. Uma paleta consistente não autoriza converter foto real em prova editada. Não colocar pessoas/serviços fictícios para completar continuidade.

## 3. Origem, destino e efeito proposto

As faixas são **alvos preliminares para teste**, não benchmark de desempenho ou obrigatoriedade. Nenhuma animação executada aqui.

| Origem / ação | Destino | Efeito pretendido | Duração-alvo / alternativa |
|---|---|---|---|
| Home, painel PPF | `/servicos/ppf` | Avanço contido do painel, seguido de dissolução para área técnica; preservar rótulo | 300–450 ms; troca direta |
| Home, painel catálogo | `/servicos` | Aproximação curta e dissolução para apresentação | 300–450 ms; troca direta |
| Home, painéis 2/3 | Serviço futuro aprovado | Mesmo padrão, apenas após destino existir | Sem transição/navegação hoje |
| Home, orçamento | `/contato` | Dissolução para recepção, sem encenação de envio | 200–300 ms; troca direta |
| Catálogo, item PPF | `/servicos/ppf` | Relação visual da seleção com título da página | 250–350 ms; troca direta |
| Serviço, voltar ao catálogo | `/servicos` | Dissolução inversa simples, sem replay longo | 200–300 ms; troca direta |
| Serviço, ver caso / navbar Trabalhos | `/trabalhos` | Passagem para galeria; entrada pelo conteúdo do caso quando houver âncora real | 250–350 ms; troca direta |
| Navbar Nossa História, de qualquer página | `/sobre` | Dissolução para ambiente institucional | 200–300 ms; troca direta |
| Navbar FAQ / link contextual, de qualquer página | `/faq` | Transição de opacidade discreta; superfície de leitura estável | 150–250 ms; troca direta |
| Navbar Serviços, de qualquer página | `/servicos` | Dissolução curta para área de apresentação | 200–300 ms; troca direta |
| Navbar Orçamento / CTA, de qualquer página | `/contato` | Acesso rápido à recepção, priorizando canal | 150–250 ms; troca direta |
| Marca / Início, de qualquer interna | `/` | Retorno à garagem sem repetir introdução | 200–300 ms; troca direta |
| Links cruzados não listados | Destino aprovado no mapa | Dissolução curta compartilhada, sem desenhar percurso fictício | 150–250 ms; troca direta |
| Contato, WhatsApp/rota externa | Canal/pin oficial confirmado | Navegação externa normal, sem transição interna | Nenhuma; não autoenviar |
| Voltar/avançar do navegador | Entrada anterior/seguinte do histórico | Restaurar posição/estado; evitar animação de introdução | Direta por padrão |
| URL direta, refresh, nova aba | Qualquer página existente | Renderizar destino sem exigir Home prévia | Sem sequência cinematográfica |

Serviços dropdown é disclosure, não transição de ambiente: abrir lista rapidamente (150–200 ms opcional); movimento reduzido imediato. Seleção visual dos painéis mantém duração curta e não provoca reflow. Nenhum efeito deve depender de hover para ativar navegação.

## 4. Navegação, URL e histórico

Links semânticos com href real; abertura em nova aba, copiar link e acesso sem JavaScript devem continuar possíveis. Não interceptar clique modificado nem links externos. URL identifica página mesmo quando efeito desativado. Não criar histórico falso para etapas de animação ou dropdown.

Acesso direto deve fornecer conteúdo, metadata e estado de navegação correto; slug desconhecido retorna 404 útil. Carregar destino sem Home não é erro. Voltar restaura scroll da página anterior e, quando apropriado, filtro/seleção; avançar não reinicia percurso cinematográfico.

**PROPOSTA:** foco no título/main após navegação iniciada pelo usuário, com anúncio acessível da mudança de página; não forçar foco em qualquer refresh ou simples abertura do dropdown. Em troca por âncora, posicionar conteúdo sem cobrir título com barra fixa. Não prender foco durante uma transição visual.

## 5. Carregamento e recuperação

Conteúdo e navegação não devem aguardar decodificação de cenário decorativo. Exibir superfície legível e dimensões reservadas se imagem atrasar/falhar. Falha de destino/rede mantém opção de tentar novamente e acesso às rotas disponíveis; não exibir tela preta nem spinner indefinido.

Não atrasar a navegação para completar tempo de animação. Se destino estiver lento, encerrar efeito e mostrar estado real de carregamento. Links repetidos rapidamente não devem produzir overlays empilhados ou comandos em fila; último destino explícito prevalece quando tecnicamente seguro.

Precarregamento é só possibilidade futura: avaliar depois, priorizando destino provável e rede adequada, sem carregar todos os ambientes/serviços por padrão. Nenhum preload adicional configurado aqui. Conteúdo técnico e Contato devem funcionar mesmo sem qualquer cena carregada.

## 6. Movimento reduzido e mobile

Com prefers-reduced-motion: troca direta, sem zoom, deslocamento, parallax ou espera estética. Mesma informação, URLs, foco, estados e possibilidade de contato. Uma preferência adicional do site pode ser estudada, sem exigir cookie novo nesta tarefa.

Mobile: transição opcional de opacidade de 150–250 ms apenas se teste justificar; manter toque e scroll nativos, sem swipe obrigatório entre páginas. Painéis podem usar sequência horizontal com foco/área de toque adequados e controle de seleção. A página não deve ter overflow horizontal; scroll localizado é explícito e não impede a leitura/contato.

Em aparelho/rede com limitação, usar navegação direta e cenários menores/estáticos; orçamento não exige percurso por ambientes. Reservar espaço, não reordenar conteúdo ao carregar imagens. Priorizar estabilidade, contraste e latência percebida sobre fidelidade ao conceito.

## 7. Riscos e avaliação posterior

| Risco | Mitigação / teste futuro |
|---|---|
| Muitos cenários grandes, latência ou memória | Otimizar por viewport, limitar recursos e medir em rede/aparelho reais |
| Overlays escondem texto, foco ou links | Não bloquear interação; testar keyboard, zoom e tela baixa |
| Náusea/zoom intenso | Movimento reduzido, amplitudes pequenas, sem movimento contínuo |
| Percurso visual sugere prédio/equipamento real | Identificar cenografia e separar fotos reais autorizadas |
| URL/histórico quebrados | Testar refresh, nova aba, rota direta, 404 e voltar/avançar |
| SEO depende do efeito ou imagem | Texto HTML e metadata independentes, sem conteúdo atrás de scroll/JS obrigatório |
| Efeito prejudica orçamento | Canal acessível em Contato e CTA, alternativa imediata |
| Falta de cenários coerentes/licenciados | Aprovar inventário; fallback simples sem geração automática |

## 8. Gate de implementação e validação

Primeiro páginas e links funcionais sem animação; depois protótipo isolado do efeito; só então avaliar integração. Comparar com e sem movimento em desktop/notebook/tablet/celular. Testar foco, redução de movimento, rede lenta/erro, navegação direta/histórico, conteúdo rolável e clique modificado.

Nenhuma equivalência entre estudo e ambiente real, desempenho aprovado ou ganho de conversão é declarado. Aprovação deste documento não autoriza biblioteca, geração de imagens, remoção de conteúdo, implementação ou deploy.

