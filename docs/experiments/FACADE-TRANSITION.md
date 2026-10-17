# Credibilidade → Fachada → Informações da Loja

**Estado atual — 17/10/2026:** implementação compartilhada com a Home para homologação manual. A rota experimental permanece como referência; o isolamento descrito abaixo pertence à etapa inicial. Ver seção final.

17/10/2026. Rota isolada: `/experimentos/fachada`. Experimento pronto para homologação visual, sem aprovação automática e sem integração à Home. Não utiliza vídeo nem biblioteca de animação.

## Inspeção e isolamento

A Home monta `StudioScrollExperience`, com chegada sticky e distância de 120svh separada da altura integral da Credibilidade. A segunda passagem não foi acrescentada a esse controlador: tem geometria e parâmetros próprios, reutilizando somente `CredibilitySection` e o PNG do cenário interno final. Não monta a Hero nem executa seeking.

Arquivos da aplicação criados:

- `app/experimentos/fachada/page.tsx`: rota e metadados `noindex`.
- `components/experiments/facade-transition-experiment.tsx`: composição, controle de progresso, placeholders e fallback.
- `components/experiments/facade-transition-experiment.module.css`: estilos restritos ao experimento.

Home, `StudioScrollExperience`, Hero original, Credibilidade original, Serviços, rota `/experimentos/scroll-video`, seu CSS e vídeo GOP 6 não foram editados. Estado Git preexistente preservado, incluindo arquivos não rastreados e as remoções antigas de `studio-entrada.png` e `studio-entrada-v2.png`. A Credibilidade reutilizada tem seu cenário antigo suprimido por seletores locais, sem solicitar V2 nesta rota.

## Ativo recebido

`public/images/enviroments/studio-facade-dusk.png` já existia antes da tarefa: **1672×941**, RGB, **2.399.033 bytes**. Assinatura PNG válida; CRC dos quatro chunks e descompressão integral dos IDAT aprovados. Decodificação no navegador confirmou dimensões naturais e a imagem foi inspecionada visualmente. Original preservado byte a byte.

SHA-256: `c41e2681ef54f472975e915150ff6ca2a56a785df8d1f8287cb0472c5bfbee98`.

A fachada é tratada como cenário conceitual. Seus serviços escritos, número aparente, telefone, QR code e veículos **não** são dados comerciais ou trabalhos confirmados. Não foram transcritos para o catálogo, contatos ou links. A identificação conceitual aparece junto à revelação e é detalhada na seção de informações.

## Arquitetura e geometria

Há uma única composição visual sticky com uma camada interna, uma camada de escurecimento e uma fachada. A dissolução sobrepõe interior e exterior na mesma origem, sem duplicar o cenário final em outra seção ou simular passagem física pelo prédio.

O conteúdo da Credibilidade permanece em fluxo normal, opaco, durante toda sua leitura. Seu fundo próprio e animação de entrada são neutralizados apenas localmente. Chamando sua altura de **H**, a viewport de **V** e a altura das informações de **I**:

1. A passagem começa em **H − V**, quando o último trecho da Credibilidade já está integralmente na tela. Antes disso, progresso e fade são zero.
2. O wrapper da passagem sobrepõe apenas essa última viewport por `margin-top: -100svh`. A seção de informações começa transparente e sticky em `top: 0`.
3. Um espaçador `::after` reserva **100svh** dentro do wrapper. A distância é medida como altura do wrapper menos altura integral das informações: não depende de quantos campos ou linhas elas ocupem.
4. Após 100%, as informações atingem o limite do sticky e seguem em leitura vertical. O cenário permanece na mesma origem; não há troca de imagem nesse limite.

Não há cópia de cards, mudança de parent no scroll, bloqueio de `body`, corte de conteúdo para fazê-lo caber na viewport ou altura fixa do conteúdo. A altura total cresce conforme o conteúdo e o tamanho da tela.

## Coreografia e parâmetros

`FACADE_TIMING`, no TSX, centraliza:

| Faixa | Comportamento |
|---|---|
| 0–25% | Saída de opacidade da Credibilidade, após a leitura completa |
| 15–55% | Escurecimento progressivo e escala do interior de 1 a 1,035 |
| 40–85% | Dissolução para a fachada |
| 75–100% | Revelação das informações |

`travel: "100svh"`, `interiorScale: 0.035` e `darkness: 0.78` também estão na configuração. Os intervalos são lineares e reversíveis. A fachada permanece sem escala adicional para preservar o letreiro e o enquadramento. O recorte e as medidas do painel podem ser ajustados no CSS Module.

Listener de scroll passivo agenda um rAF, que atualiza variáveis CSS e atributos, sem renderização React por frame. `ResizeObserver` acompanha conteúdo e wrapper; resize e mudança de movimento reduzido recalculam o estado. Desmontagem remove listeners, observer e rAF.

## Responsividade e conteúdo

Desktop usa fachada com `cover`, centralizada, preservando o TOLEDO nas três resoluções verificadas. O painel de informações, limitado a 400 px, fica à esquerda: na primeira inspeção, o painel à direita podia encobrir parte do letreiro durante a continuação da leitura; o ajuste confirmou o letreiro livre no resultado final. A entrada central, iluminação e céu continuam visíveis.

No mobile, a imagem mantém sua proporção horizontal integral no alto do cenário, com entrada e letreiro visíveis, sobre base escura. As informações começam abaixo da imagem. Isso prioriza identificação em vez de preencher uma tela vertical com um recorte agressivo. Ao continuar lendo, o painel sobe e pode cobrir a parte inferior da fachada; o letreiro permanece visível na resolução testada. A base escura é parte dessa composição, não um rodapé residual.

Endereço, horário, WhatsApp e Google Maps estão em uma lista semântica de definições. Todos são placeholders que registram **solicitado, aguardando confirmação**, sem telefone, endereço, horários ou destinos inventados. A coleta já foi iniciada; não foi criado novo questionário. Para futura integração, os rótulos e textos estão no array local `information`; somente dados comerciais confirmados devem substituir os placeholders, incluindo eventual aprovação de links. `content/business.ts` permanece preliminar e não foi alterado.

## Acessibilidade e recuperação

- Ordem de leitura: título da página, Credibilidade, informações. Uma instância de cada seção.
- Navegação sticky com retorno à Home e salto às informações; Enter calcula o fim real do percurso, libera `inert` e transfere foco à seção.
- Conteúdo invisível da chegada fica fora da navegação e árvore acessível; a Credibilidade só recebe `inert` após concluir seu fade. Informações transparentes não interceptam cliques sobre a leitura anterior.
- Movimento reduzido e ausência de JavaScript apresentam duas seções estáticas, sem percurso extra. A regra estática usa o próprio fundo da seção, enquanto o quadro animado fica sem área visível.
- Falha de carregamento esconde a imagem quebrada e anuncia via `role=status`; as informações e o scroll continuam disponíveis sobre base escura. A imagem é decorativa e a natureza conceitual é descrita em texto.
- Foco visível, sem botões de contato falsamente ativos ou links sem destino confirmado.

## Verificações executadas

Chrome em **1920×1080, 1440×900, 1366×768 e 390×844**. Duas rodadas limitadas: inspeção inicial e confirmação após reposicionar o painel e acrescentar a identificação conceitual. Capturas do início/meio da leitura, fim da Credibilidade, 25%, 50%, 75%, 100%, fim absoluto e retorno. A confirmação usa os arquivos finais `output/playwright/facade-<largura>-<ponto>.png` e medições em `facade-results.json`; o script reproduzível está em `facade-checks.js` no mesmo diretório.

| Evidência | Resultado |
|---|---|
| Percurso medido | 1080 / 900 / 768 / 844 px, exatamente uma viewport nas quatro alturas |
| Antes da passagem | Progresso 0 e opacidade da Credibilidade 1 durante a leitura |
| Início nominal | Fim da Credibilidade em y≈altura da viewport, tolerância menor que 0,4 px |
| 25% | Conteúdo já saiu; fachada ainda transparente |
| 50% | Fachada com opacidade ≈0,222, sobre interior escurecido |
| 75% | Fachada com opacidade ≈0,778; informações começando a entrar |
| 100% | Fachada opaca e informações reveladas; conteúdo em y≈0 |
| Após 100% | Conteúdo sobe naturalmente; cenário permanece em y=0 |
| Retorno por 50% e leitura | Opacidades intermediárias restauradas, interior e Credibilidade retornam |

Nenhum overflow horizontal, seção duplicada ou erro JavaScript observado. A tolerância subpixel decorre de arredondamento do scroll. Tab/Enter no salto encontrou foco em `facade-information`, progresso 1 e `inert=false`. Movimento reduzido remove o espaçador. Sem JavaScript, as duas opacidades são 1 e a chegada não fica inert. Requisição da fachada bloqueada ativou aviso e manteve informações acessíveis; após remover o bloqueio, o carregamento normal foi restaurado. Retorno à Home remove o wrapper experimental e mantém `body.style.overflow` vazio. Evidências adicionais em `facade-reduced.png`, `facade-fallback.png` e `facade-additional.json`.

Lint dos dois TSX novos, TypeScript sem emissão (`--incremental false`) e `git diff --check` aprovados. Hashes antes/depois de sete arquivos protegidos confirmam ausência de alterações nos componentes/rotas existentes; fachada mantém o hash acima. Não houve build completo, instalação, recompressão de ativos, commit, push ou deploy. O console registra favicon ausente preexistente e falhas de rede provocadas no teste de fallback.

## Limitações para homologação

A mudança de plano usa fotografias estáticas: há sobreposição intencional de interior e exterior durante a dissolução, especialmente em 50%; não é uma câmera 3D nem um novo vídeo. O painel pode exigir leitura adicional após a chegada; não foi comprimido para caber numa tela. Na imagem há textos e contatos não verificados que não foram editados; o aviso conceitual precisa permanecer enquanto esse ativo for utilizado.

O enquadramento mobile mostra a fachada em escala menor para preservar sua identificação. Sua relação com o painel, o ritmo e o grau de escurecimento ainda exigem avaliação manual do idealizador. Safari/iOS, zoom nativo e aparelhos reais não foram homologados nesta etapa. Nenhum resultado autoriza automaticamente a integração desta segunda transição à Home.

## Segunda transição compartilhada na Home — 17/10/2026

A Home agora compõe Hero → travessia de 120svh → Credibilidade → passagem de 100svh → fachada conceitual → Informações da Loja → rodapé estrutural. Integração disponível para homologação manual, sem aprovação automática para produção.

`FacadeTransition` foi extraído para `components/sections/facade-transition.tsx`, com contexto explícito `home` ou `experiment`. A rota `/experimentos/fachada` usa um adaptador curto e mantém sua navegação. A Home não recebe essa barra. O CSS e os parâmetros aprovados da segunda passagem foram preservados.

`StudioScrollExperience` recebeu somente um slot `children` na chegada. Na Home, esse slot contém `FacadeTransition`, que renderiza a única Credibilidade. Sem children, a primeira experiência mantém sua composição anterior, inclusive na rota de referência. Não houve reconstrução do seeking nem segunda Hero. O cálculo da primeira distância continua descontando a altura integral da chegada; ampliar seu conteúdo não muda os 120svh. A segunda passagem começa somente quando o fim da Credibilidade alcança o limite inferior da viewport, após sua leitura integral. Não há remount ou novo carregamento do vídeo ao percorrer a segunda passagem.

### Validação da sequência integrada

Chrome em 1920×1080, 1440×900, 1366×768 e 390×844, com capturas do início, primeira passagem, chegada, leitura, segunda passagem, informações, rodapé e retorno completo. Uma Hero, uma Credibilidade, um main e uma seção de informações; nenhuma navegação experimental ou overflow horizontal na Home.

- Primeira distância medida: 1296 / 1080 / 921,59 / 1012,80 px. Segunda: 1080 / 900 / 768 / 844 px. Tempos do vídeo próximos a 0 → 0,5 → 4,5 → 7,95 s e retorno até 0; permanece pausado no último frame durante a segunda passagem.
- Título da Credibilidade em y≈88 na primeira chegada; segunda passagem ainda em progresso 0. Conteúdo permanece opaco durante a leitura. Na segunda chegada, fachada opaca e informações em y≈0; depois, leitura vertical normal e rodapé branco estrutural acessível. Sem faixa vazia entre experiências ou salto de origem do cenário observado.
- Enter na navegação própria e acesso direto a `/#credibilidade` alcançam o início da seção. Movimento reduzido e ausência de JavaScript mantêm leitura estática acessível. Bloqueio simultâneo do MP4 e da fachada mantém conteúdo e avisos acessíveis; o aviso da fachada fica no topo somente na Home, separado do aviso inferior do vídeo. Recuperação após recarregar sem bloqueios confirmada. Nenhum erro JavaScript observado.
- Lint dos quatro TSX envolvidos, TypeScript sem emissão e `git diff --check` aprovados. Hashes de nove arquivos protegidos confirmaram preservação da página/CSS estrutural, componentes originais, CSS das duas experiências, Serviços e ativos GOP 6/fachada.

Evidências: `output/playwright/full-home-<largura>-<ponto>.png`, `full-home-results.json`, `full-home-recovery.json` e scripts correspondentes. Não houve build adicional, dependências, commit, push ou deploy.

Persistem as dissoluções entre imagens com enquadramentos diferentes e os saltos temporais possíveis da roda em 120svh. A fachada contém textos conceituais não verificados; os dados da loja continuam placeholders identificados. O enquadramento mobile preserva a fachada inteira e sua base escura aprovada. Zoom nativo, Safari/iOS e aparelhos reais continuam pendentes de homologação.

## Reserva inicial de leitura na Home — 17/10/2026

Adicionada reserva configurável em `READING_RESERVE`, no componente compartilhado `facade-transition.tsx`: Home `50svh`, experimento `0svh`. Um contêiner envolve a única Credibilidade e reserva sua distância por pseudo-elemento em fluxo. O conteúdo fica sticky em `top: 0` dentro dessa contenção; o espaço é consumido mantendo o conteúdo visível, sem faixa vazia. Ao atingir o limite, a leitura vertical prossegue continuamente. Não há snap, interceptação de wheel/touch, bloqueio de scroll ou espera temporal.

A segunda passagem continua medindo 100svh, mas começa após a reserva mais a leitura restante. A primeira continua em 120svh e seu controlador não foi editado: a altura adicional é descontada junto com a chegada. GOP 6, seeking, coreografias, conteúdo e ativos preservados. Sem movimento animado, inclusive com `prefers-reduced-motion`, a reserva não é gerada e a leitura fica em fluxo estático.

| Viewport | Reserva | Scroll entre chegada e início do fade: antes → depois |
|---|---:|---:|
| 1920×1080 | 540 px | 180 → 720 px |
| 1440×900 | 450 px | 360 → 810 px |
| 1366×768 | 384 px | 493 → 877 px |
| 390×844 | 422 px | 789 → 1211 px |

Chrome: título em y=88 durante a reserva nas quatro resoluções; primeiro card também estável e opacidade 1. Mais 50 px após o limite deslocam o conteúdo aproximadamente 50 px, com tolerância subpixel, sem salto ou faixa vazia observado. Depoimentos continuam visíveis antes do fade. Retorno pela reserva restaura o enquadramento e retorno à Hero restaura o vídeo inicial. Uma única Credibilidade, sem overflow horizontal ou erro JavaScript observado. Capturas de chegada, reserva, liberação, fim da leitura, fachada e Hero em `output/playwright/reserve-<largura>-<ponto>.png`; script `reserve-checks.js` e medições `reserve-results.json` no mesmo diretório.

Roda automatizada em passos de 100 px: no desktop 1920×1080, cinco passos preservam título em y=88, conteúdo opaco e segunda passagem em zero; antes, o primeiro passo já cortava o título e o segundo iniciava o fade. No oitavo passo, a leitura já avançou e o fade está em aproximadamente 7,4%, comportamento esperado após ultrapassar os 720 px. Demais larguras mantêm a segunda passagem em zero após oito passos. Esse teste não reproduz todas as configurações de mouse ou inércia de trackpad real.

Enter no link da Home conserva foco em `studio-arrival`, título em y=88 e segunda passagem em zero. Movimento reduzido remove a reserva, mantém posição relativa e vídeo sem src. Experimento conserva reserva zero. Lint do TSX afetado, TypeScript sem emissão e diff check aprovados. Uma tentativa inicial com padding apenas adiava a segunda passagem, sem estabilizar o conteúdo; foi substituída pela contenção com espaço em fluxo e todas as medições/capturas finais foram refeitas.

Pronta para homologação manual, sem aprovação automática. Permanecem as limitações conhecidas das dissoluções e dos passos temporais do vídeo; zoom nativo, Safari/iOS e trackpad físico não foram homologados nesta rodada. Sem dependências, commit, push ou deploy.

## Painel funcional de contato na Home — 17/10/2026

A Home substitui os placeholders por dados fornecidos pelo solicitante, centralizados em `content/business.ts`, com status editorial ainda `preliminary`: Studio Toledo; Av. Santos Dumont, 6369, Papicu, Fortaleza – CE; segunda a sexta 8h às 18h; sábado 8h às 14h; telefone (85) 98816-6289. Domingo não informado e omitido. O painel da rota experimental mantém seus placeholders e configuração própria.

Hierarquia: “VISITE NOSSO STUDIO”, “Vamos conversar.”, nome, endereço, horários e telefone, com ícones SVG decorativos. Ação principal laranja “Conversar no WhatsApp”, ação secundária “Como chegar” e telefone clicável. WhatsApp usa `https://wa.me/5585988166289`, sem parâmetro de mensagem; Google Maps usa busca textual pelo endereço codificado, sem coordenadas ou place ID. Ambos abrem nova aba com noopener/noreferrer e aviso acessível. Telefone usa tel:+5585988166289. O aviso conceitual distingue os dados do painel dos números e textos incorporados à imagem, que não foram alterados.

Preservados fachada, posicionamento à esquerda e espaçamento de chegada; no mobile a fachada inteira antecede o painel. Fundo escuro opaco, detalhes laranja e ações com 48 px de altura. É possível continuar a leitura para alcançar informações e ações abaixo da primeira dobra. Em 1920×1080 o botão secundário termina aproximadamente em y=1089; em 1440×900, em y=996; a rolagem normal e o foco por Tab os tornam acessíveis. Não se comprimiu a seção para caber numa única tela.

Validação local no Chrome em 1920×1080, 1440×900 e 390×844: inspeção de Credibilidade, reserva, passagem, fachada, painel, leitura, rodapé e retorno. Sem overflow horizontal ou erro JavaScript observado. Os percursos permaneceram 1296/1080/1012,80 px na primeira travessia e 1080/900/844 px na segunda. Título da Credibilidade em y=88 durante a reserva; retorno à Hero restaura vídeo em 0 s. Foco visível e sequência telefone → WhatsApp → Maps nas três larguras; botões liberados ao final da transição. Contraste calculado dos textos sobre #101112: mínimo de 8,49:1 entre as cores usadas; texto escuro no botão laranja também 8,49:1.

Abertura dos dois destinos confirmada em novas abas com navegações externas interceptadas para o teste; não foi enviada mensagem nem validada titularidade da conta WhatsApp ou ficha de estabelecimento. Movimento reduzido mantém leitura estática sem reserva, vídeo sem src e links acessíveis. Falha deliberada da fachada mantém os três links e o aviso; sem JavaScript os três links também estão presentes. Rodapé branco preservado e acessível. Serviços, seeking, coreografias, reserva de 50svh e arquivos de mídia não foram editados.

Evidências em `output/playwright/contact-<largura>-<ponto>.png`, `contact-checks.js`, `contact-results.json` e `contact-links.js`. As primeiras capturas do roteiro calcularam o destino enquanto a chegada externa ainda estava pinned; foram substituídas após corrigir apenas a medição e refazer a rodada. Servidor local não estava ativo e foi iniciado para a validação. Lint dirigido, TypeScript sem emissão e diff check aprovados; sem build, dependências, commit, push ou deploy.

Pendências: domingo, aprovação comercial/publicação, direitos de mídia factual e homologação visual final. A fachada continua conceitual e contém contatos diferentes dos fornecidos; o aviso foi preservado para tornar essa distinção explícita. Safari/iOS, zoom nativo e aparelhos reais não foram homologados nesta etapa.
