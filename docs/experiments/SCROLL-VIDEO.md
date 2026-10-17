# Experimento isolado: scroll e vídeo

**Estado atual — 17/10/2026:** a experiência foi extraída para implementação compartilhada e integrada à Home para homologação. A rota experimental continua como referência. Os registros de isolamento abaixo descrevem as etapas anteriores; esta integração não equivale a aprovação comercial ou para produção. Ver seção final.

16/10/2026. Rota: `/experimentos/scroll-video`. Experimento do idealizador para avaliação visual; sem integração à Home ou aprovação comercial.

## Implementação e isolamento

`app/experimentos/scroll-video/page.tsx` carrega `components/experiments/scroll-video-experiment.tsx` e seu CSS Module. Nenhum arquivo da Home, Hero, Credibilidade, Serviços, dados editoriais ou CSS global foi alterado nesta tarefa. Sem dependência adicional.

A Hero experimental reproduz logo, Rolls-Royce e quatro painéis com as classes existentes, sem montar a Hero original nem seu cenário antigo. PPF e dois serviços pendentes são apenas rótulos já existentes; catálogo aponta a `/servicos`. Não há simulação de orçamento. No mobile, os quatro painéis aparecem juntos para testar a saída simétrica.

`CredibilitySection` é reutilizada sem alterar seu código ou dados. Somente nesta rota, seletores locais retiram seu fundo anterior e sua animação de entrada, mantendo painéis, hierarquia, conteúdo e regras de autorização. Após a correção geométrica da chegada, o conteúdo fica sticky na mesma origem do cenário até o fim da revelação e só então segue a leitura vertical, inclusive em mobile.

## Ativos e continuidade

Os três arquivos recebidos em `public/images/enviroments/` foram preservados byte a byte:

- `studio-hero-start.png`: PNG válido, 1672×941.
- `studio-credibility-end.png`: PNG válido, 1672×941.
- `hero-to-credibility.mp4`: contêiner MP4 `ftypisom`, decodificado no Edge, 1280×720, duração 8 s.

Quadros próximos a 0 s e 7,95 s foram inspecionados no navegador. As imagens são referências próximas, não cópias idênticas dos frames: há diferenças de escala, perspectiva e detalhes. Todas as camadas usam `cover` e centro; dissoluções discretas suavizam as diferenças. O último enquadramento é estabilizado pela imagem final. No retrato, o recorte lateral é maior. Não houve recompressão, renomeação ou alteração dos originais.

**Estado local preexistente:** `studio-entrada.png` e `studio-entrada-v2.png` estavam removidos no início desta tarefa. Home/Serviços ainda referenciam V2. Não restaurados nem corrigidos por este experimento; a Home preserva esse estado, inclusive o recurso ausente. Não interpretar o experimento funcional como correção da Home.

## Parâmetros e coreografia

`SCROLL_VIDEO_TIMING` concentra as faixas:

| Progresso | Efeito |
|---|---|
| 0–16% | Dois painéis para a esquerda, dois para a direita, perdendo opacidade |
| 0–23% | Carro escala até 1,08 e desaparece, sem translação |
| 5–85% | Tempo do vídeo proporcional ao scroll |
| 85–100% | Credibilidade aparece sobre a parede final |

Dissolução inicial: 2–10%; final: 82–87%. Faixas ajustáveis no objeto. Distância lateral `65vw` e escala do carro estão no CSS Module. A distância animada é configurada por `--scroll-distance`: 120svh no desktop e no mobile, reservada por um espaçador `::after` dentro do percurso. A altura total soma essa distância à altura integral da Credibilidade. O progresso desconta a altura do conteúdo, e não a altura da viewport. Assim, a leitura vertical só começa após 100%.

## Controle, recuperação e acessibilidade

Listener de scroll passivo agenda um único `requestAnimationFrame`; referências DOM e variáveis CSS evitam renderizar React a cada frame. O vídeo nunca recebe `play()`: fica pausado e recebe `currentTime`. Seeking é serializado, respeita diferença mínima de 1/30 s e converge para o último destino solicitado após `seeked`; scroll rápido não enfileira todos os tempos intermediários.

`loadedmetadata`, `durationchange`, `loadeddata` e `canplay` sincronizam duração e disponibilidade. Erro, duração inválida, metadados sem resposta em 10 s ou seeking sem resposta em 1,8 s ativam a passagem entre imagens e aviso acessível. O destino temporal é limitado a duração menos 0,05 s para evitar a borda final do decodificador. Seeking móvel varia por navegador, codec e keyframes: fallback não comprova fluidez em aparelhos reais.

Resize e `ResizeObserver` recalculam geometria. Desmontagem remove listeners, observer, callbacks e timers, pausa e descarrega o vídeo. Nenhuma escrita em `body.style.overflow` ou bloqueio de scroll.

Com movimento reduzido: duas cenas estáticas em fluxo normal, sem percurso longo e sem atribuir src ao vídeo. Sem JavaScript: composição estática também. A preferência pode mudar durante a sessão. Navegação visível e sticky oferece retorno à Home e salto para Credibilidade; `inert`/`aria-hidden` retiram controles que estão saindo ou ainda não chegaram. Não existem testemunhos ou materiais factuais novos.

## Como testar

Com o servidor local existente, abrir `http://localhost:3000/experimentos/scroll-video`. Rolar para baixo e depois para cima; testar redimensionamento, Tab/Enter, salto de conteúdo e movimento reduzido. Bloquear a requisição MP4 nas ferramentas do navegador para testar fallback. A Home continua em `/`.

Capturas da inspeção ficam em `output/playwright/scroll-experiment-*.png`; referências do vídeo em `scroll-video-source-*.png`. Este protótipo não garante resultado idêntico em Safari/iOS sem validação em aparelho real.

## Verificações executadas

Os registros abaixo descrevem a primeira versão; não certificavam a continuidade visual da chegada, posteriormente diagnosticada e corrigida na seção seguinte.

- Lint somente dos dois TSX novos, TypeScript sem emissão e `git diff --check`: aprovados. A rota foi compilada pelo servidor de desenvolvimento já aberto pelo usuário, que foi preservado; não se executou suíte completa ou instalação.
- Edge: desktop 1440×900 e mobile 390×900/844; sem overflow horizontal do documento. Saída simétrica confirmada por matrizes negativas nos dois primeiros painéis e positivas nos demais.
- Progresso 0 → 0,6 → 1 → 0,6 → 0 restaurou tempos 0 → 4 → 7,95 → 4 → 0 segundos, sempre pausado, nas duas larguras. Carro apenas escala/opacidade. Credibilidade inacessível antes da chegada e liberada ao final.
- Requisição MP4 bloqueada: fallback estático e aviso funcionais. Movimento reduzido: percurso de uma viewport para Hero, chegada em fluxo normal, sem `src` no vídeo e sem `inert` na chegada.
- Tab alcança retorno e salto; Enter no salto move foco a `experiment-arrival`. Rolagem prossegue até o fim, com `body.style.overflow` vazio.
- Navegação pelo Link de volta à Home: os dois listeners próprios de janela e o `ResizeObserver` foram removidos; não restou wrapper experimental na Home. Demais callbacks e timers têm limpeza explícita no efeito.
- SHA-256 dos três ativos idênticos antes/depois. Nenhum erro de execução da rota observado; falha de rede foi provocada no teste. Ao voltar à Home, confirmou-se o cenário antigo ausente já documentado, além de aviso preexistente sobre smooth scroll global.

Ainda requer homologação em Safari/iOS real, rede lenta e aparelhos com decodificação limitada. A suavidade depende dos keyframes do MP4 recebido; os limites de seeking e os timeouts têm fallback, não equivalem a testes em todos os dispositivos.

## Correção direcionada da chegada — 16/10/2026

O diagnóstico visual encontrou o sticky e os frames funcionando, mas duas cópias do cenário final: aos 90%, uma em y=0 e outra, na seção independente de Credibilidade, em y=360 px no desktop. A margem negativa fazia a seção subir durante o fade, duplicando e deslocando a parede.

Correção restrita a `scroll-video-experiment.tsx` e seu CSS Module:

- Credibilidade passou para dentro do mesmo track. O elemento `arrivalBackdrop` foi removido; no modo animado a chegada tem `background-image: none`. A única imagem final é `.end`, dentro do quadro visual sticky.
- Quadro visual e conteúdo são sticky com `top: 0`, compartilhando a origem durante todo o percurso. A margem negativa agora apenas compensa a altura do quadro dentro do mesmo track; não desloca uma segunda seção/fotografia pela viewport.
- O espaçador em fluxo prolonga a área de contenção dos stickies. A distância de animação independe da altura do conteúdo. Ao atingir 100%, a chegada encontra o limite de seu sticky e começa a subir naturalmente; a imagem continua fixa enquanto há conteúdo para ler. Não se troca, duplica ou reparenta o conteúdo durante o scroll.
- A opacidade continua em 0 até 85%, aproximadamente 1/3 aos 90% e 1 aos 100%. Hero, painéis, Rolls-Royce, seeking e faixas temporais foram preservados.
- A imagem final dissolve sobre o vídeo ainda opaco. Foi retirada a redução simultânea da opacidade do vídeo nessa passagem: ela deixava a imagem inicial transparecer novamente. A imagem final cobre o vídeo ao concluir a dissolução; o controle de tempo permanece inalterado.
- O salto por teclado calcula o fim do percurso, pois a posição visual do conteúdo agora é sticky. Movimento reduzido e ausência de JavaScript mantêm duas cenas estáticas, sem travessia longa; somente nesse modo a seção recebe seu fundo final próprio, enquanto a camada final do quadro não é exibida.

Não se acrescentou gradiente para esconder borda. O tratamento de contraste já existente foi preservado. A correção elimina a segunda origem geométrica do cenário.

### Validação da correção

Inspeção no Edge em 1440×900 e 390×844: capturas em 0%, 20%, 40%, 65%, 85%, 90%, 100% e imediatamente após, com retorno por 90%, 65% e 0%. Artefatos: `output/playwright/arrival-fix-<largura>-<percentual>.png` e `arrival-fix-<largura>-after.png`.

| Ponto | Evidência |
|---|---|
| 0% | Hero com opacidade inicial; vídeo pausado em 0 s |
| 20% | Painéis já saindo do enquadramento, carro preservado; arredondamento de scroll mobile produz progresso 0,1998 |
| 40% | Vídeo visível, aproximadamente 0,8 s; cenário e conteúdo em y=0 |
| 65% | Vídeo visível, aproximadamente 4,8 s; conteúdo ainda transparente |
| 85% | Vídeo em 7,95 s; dissolução para a imagem final, sem revelar conteúdo antes da chegada |
| 90% | Um único fundo final em y=0; conteúdo em y=0, opacidade aproximadamente 0,333 |
| 100% | Mesmo fundo único em y=0; conteúdo em y=0, opacidade 1 |
| Após 100% | Fundo ainda em y=0; avanço de 90 px no desktop / 63 px no mobile desloca o conteúdo exatamente -90 / -63 px, sem troca de cenário |

Sem overflow horizontal nas duas larguras; vídeo permaneceu pausado e o retorno restaurou 7,95 → 4,8 → 0 s. Nenhum fundo `arrivalBackdrop` existe no DOM. Lint do TSX afetado, TypeScript sem emissão e `git diff --check` aprovados; sem suíte completa ou build adicional. Componentes originais, Home, Serviços e ativos não foram alterados.

Também confirmados nesta correção: Tab/Enter no salto transfere foco à chegada em y=0; movimento reduzido remove espaçador e src do vídeo, liberando a leitura estática; MP4 bloqueado apresenta aviso e chegada com uma única imagem final em y=0. A rolagem alcança o fim do documento, sem alterar `body.style.overflow`.

Limitações mantidas: diferenças entre PNGs e frames do MP4 são suavizadas pela dissolução existente; Safari/iOS real e desempenho em aparelhos com seeking limitado ainda exigem homologação. A parte inferior da Credibilidade continua disponível por leitura vertical após a revelação, em vez de reduzir todo o conteúdo para caber numa única tela.

## Variante para seeking: GOP 6 — 17/10/2026

Etapa autorizada apenas para criar e comparar `public/images/enviroments/hero-to-credibility-scroll-g6.mp4`. O caminho usado pelo componente continua sendo o MP4 original. Nenhuma mudança na coreografia, CSS, Home ou Credibilidade. As medições anteriores acima ficam preservadas; a comparação abaixo é uma nova medição pareada, com o mesmo protocolo para os dois arquivos.

### Ferramenta temporária e reprodução

Não foi encontrado FFmpeg completo no PATH ou nos ambientes Python examinados. Foi baixado o wheel oficial do projeto ImageIO no PyPI, `imageio_ffmpeg-0.6.0-py3-none-win_amd64.whl`, e verificado seu SHA-256 publicado: `02fa47c83703c37df6bfe4896aab339013f62bf02c5ebf2dce6da56af04ffc0a`.

Fonte: https://pypi.org/project/imageio-ffmpeg/0.6.0/ . URL versionada do arquivo: https://files.pythonhosted.org/packages/2c/c6/fa760e12a2483469e2bf5058c5faff664acf66cadb4df2ad6205b016a73d/imageio_ffmpeg-0.6.0-py3-none-win_amd64.whl .

Somente o executável contido no ZIP/wheel foi extraído com `zipfile` da biblioteca padrão do Python para `%TEMP%/studio-toledo-ffmpeg-0.6.0/ffmpeg.exe`. Binário identificado como FFmpeg 7.1 essentials, build gyan.dev, com libx264. Não houve pip install, dependência npm, mudança no PATH ou executável adicionado ao repositório.

Comando executado em PowerShell, na raiz do projeto:

```powershell
$ffmpeg = Join-Path $env:TEMP 'studio-toledo-ffmpeg-0.6.0/ffmpeg.exe'
& $ffmpeg -hide_banner -nostdin -n -i public/images/enviroments/hero-to-credibility.mp4 -map 0:v:0 -an -c:v libx264 -preset slow -crf 17 -profile:v high -pix_fmt yuv420p -g 6 -keyint_min 6 -sc_threshold 0 -bf 0 -movflags +faststart public/images/enviroments/hero-to-credibility-scroll-g6.mp4
```

O encoder reporta `keyint_min=4` internamente, apesar do argumento 6; com scenecut desativado e GOP máximo 6, a distribuição efetivamente gerada e decodificada é rigorosamente de seis em seis quadros. A validação abaixo verifica o resultado real, não apenas os argumentos.

### Verificação do arquivo

| Propriedade | Original | GOP 6 |
|---|---|---|
| Codec / perfil / nível | H.264 High 3.1 | H.264 High 3.1 |
| Resolução / FPS | 1280×720 / 24 constantes | 1280×720 / 24 constantes |
| Duração / quadros de vídeo | 8 s / 192 | 8 s / 192 |
| Keyframes declarados | 1, em 0 s | 32, de 0 a 7,75 s, passo 0,25 s |
| Tipos decodificados da variante | — | 32 I, 160 P, nenhum B |
| Áudio | AAC LC | Ausente |
| Faststart | Não (`moov` após mídia) | Sim (`moov` em byte 32, antes de `mdat` em 1844) |
| Tamanho | 8.065.679 bytes | 15.320.658 bytes |
| Diferença de tamanho | Referência | +89,95% |

Índices de keyframes, numerados a partir de 1: 1, 7, 13, ..., 187. Conferência das tabelas MP4 por `output/video-gop6/inspect-mp4.cjs`, com resultados em `metadata.json`. A validação automatizada exige as dimensões, FPS, duração, quantidade e cada índice esperado, além de ausência de áudio e faststart.

Decodificação integral independente, com erro fatal habilitado:

```powershell
& $ffmpeg -hide_banner -nostdin -xerror -i public/images/enviroments/hero-to-credibility-scroll-g6.mp4 -vf showinfo -f null NUL
```

Saída: 192 quadros, exit code 0, 32 registros `iskey:1`, nenhum `type:B`. Registro completo em `output/video-gop6/decode-validation.log`.

### Qualidade visual

Frames extraídos e inspecionados lado a lado em 0, 4 e 7,95 s, em `output/video-gop6/hero-to-credibility[-scroll-g6]-<tempo>.png`. Não foram observadas diferenças grosseiras de cor, enquadramento ou detalhe nessas amostras. Não é codificação sem perdas.

SSIM sobre os 192 quadros, comparando os vídeos decodificados: **All 0,990389**, Y 0,989407, U 0,992381, V 0,992324. Registro em `output/video-gop6/ssim.log`. Esse índice complementa a inspeção, não comprova transparência visual em todas as telas.

```powershell
& $ffmpeg -hide_banner -nostdin -i public/images/enviroments/hero-to-credibility.mp4 -i public/images/enviroments/hero-to-credibility-scroll-g6.mp4 -lavfi '[0:v:0][1:v:0]ssim' -an -f null NUL
```

### Comparação isolada

Chrome automatizado 154 no Windows, 1440×900, mesmo processo de navegador. Ambos integralmente em buffer antes da medição. Vídeo isolado do React/CSS da rota, documento rolável com 3600 px úteis; progresso 35–84,5% em oito segundos por direção, com 350 ms adicionais para terminar seeks pendentes. Apresentações contadas somente na janela ativa de oito segundos.

Controlador idêntico para ambos: listener passivo de scroll → rAF, um seek em voo, diferença mínima de 1/30 s, seeked → rAF, timeout de 1800 ms. A defasagem compara o destino solicitado ao `mediaTime` do último callback de frame apresentado. Scripts e dados brutos: `output/video-gop6/benchmark.js` e `benchmark-results.json`.

| Métrica | Original avanço | GOP 6 avanço | Original retorno | GOP 6 retorno |
|---|---:|---:|---:|---:|
| Apresentações/s via requestVideoFrameCallback | 9,13 | 21,25 | 9,88 | 21,25 |
| Latência mediana de seek (ms) | 99,7 | 4,6 | 71,4 | 4,7 |
| Latência P95 de seek (ms) | 228,0 | 5,8 | 216,2 | 6,3 |
| Intervalo P95 entre apresentações (ms) | 216,7 | 50,1 | 216,8 | 50,1 |
| Defasagem visual P95 (ms de mídia) | 384,4 | 83,9 | 357,8 | 42,2 |

Zero descartes no contador droppedVideoFrames e nenhuma long task em ambos. Callbacks podem reapresentar o mesmo frame: foram 164/162 tempos de mídia distintos na variante e 72/79 no original, em avanço/retorno. Não interpretar 21,25 apresentações/s como alteração no FPS do arquivo, que continua em 24.

Reprodução do benchmark usando o Playwright CLI já disponível:

```powershell
playwright-cli -s=toledo-g6 run-code --filename output/video-gop6/benchmark.js
playwright-cli -s=toledo-g6 --raw eval '() => window.gop6BenchmarkResults' | Out-File -Encoding utf8 output/video-gop6/benchmark-results.json
```

As métricas são amostras locais de percurso controlado, não garantia para Chrome manual, rede móvel ou Safari/iOS. Não houve instalação de biblioteca para medir.

### Confirmação adicional na rota real

Depois do teste isolado, o componente original foi exercitado sem nenhuma edição: uma interceptação temporária no navegador encaminhou a requisição original ao arquivo de cada condição, mantendo as respostas HTTP Range do servidor (`route.continue({url: ...})`). O atributo `src` permaneceu `/images/enviroments/hero-to-credibility.mp4`. Interceptação removida ao fim; nenhum usuário ou outra sessão foi afetado.

Scripts e dados em `output/video-gop6/route-benchmark.js` e `route-benchmark-results.json`. Mesmo Chrome, viewport e rampas de oito segundos, desta vez com o controlador real e a composição visual atual:

| Métrica | Original avanço | GOP 6 avanço | Original retorno | GOP 6 retorno |
|---|---:|---:|---:|---:|
| Apresentações/s | 6,50 | 21,25 | 9,88 | 21,25 |
| Latência mediana de seek (ms) | 148,7 | 4,2 | 68,1 | 5,1 |
| Latência P95 de seek (ms) | 237,6 | 6,0 | 226,6 | 6,7 |
| Intervalo P95 entre apresentações (ms) | 250,0 | 50,1 | 233,3 | 50,1 |
| Defasagem visual P95 (ms de mídia) | 440,0 | 85,6 | 367,2 | 41,7 |

Nesta confirmação o browser iniciou com buffer parcial diferente (original 0–4,55 s; variante 0–3,285 s). Ela corrobora o resultado, mas não substitui a comparação isolada totalmente em buffer como referência principal. Ambos terminaram em `data-video=ready`, sem fallback.

Uma tentativa anterior de substituir a resposta por `route.fulfill` não apresentou frames corretamente e foi descartada como artefato do método de interceptação; esses valores não entram nas tabelas. A comparação válida preserva as requisições Range.

### Integridade preservada

SHA-256 do original: `239991ebe96c13514b4bc7db5be0d56cb2102a2223a3f28b469710383984e801`.
SHA-256 da variante: `76f6c5facb2c35c32bd204760b9144ef6552d879febe1bcb8598b9694653e902`.

Comparação antes/depois de oito arquivos protegidos (vídeo original, dois PNGs, TSX/CSS experimental, Home, Hero e Credibilidade) confirmou hashes inalterados. Registro em `output/video-gop6/integrity.json`. `git diff --check` aprovado. Não se executaram lint, TypeScript ou build porque nenhum código da aplicação foi modificado; as verificações dirigidas foram estrutura MP4, decodificação integral, comparação visual/SSIM e desempenho no navegador.

### Recomendação

O ganho isolado é relevante: mais que o dobro de apresentações/s, seeks P95 de cerca de 220 ms para cerca de 6 ms e intervalos P95 próximos aos 50 ms observados na reprodução normal anterior. Recomenda-se utilizar a variante no experimento em uma próxima etapa autorizada, mantendo o algoritmo, para homologação manual.

O custo é +7.254.979 bytes (+89,95%). Antes de uso público, avaliar rede/aparelhos reais e eventual ajuste de CRF para reduzir transferência, comparando qualidade novamente. Os 24 FPS da fonte, a cadência de rAF/seeked e a quantização do controlador continuam limitando a apresentação; não há evidência nesta rodada que exija all-intra ou sequência de frames.

Nenhum caminho de mídia do componente foi alterado nesta etapa. Original, PNGs e componentes preservados. Não houve commit, push ou deploy.

## Adoção provisória da variante — 17/10/2026

Autorizada para homologação visual exclusivamente em `/experimentos/scroll-video`: o componente experimental agora usa `/images/enviroments/hero-to-credibility-scroll-g6.mp4`. Esta atualização substitui o estado de referência ao original descrito nas etapas históricas acima. Não é aprovação para produção.

A única alteração de código é a atribuição de `video.src`. Seeking, faixas, coreografia, composição, CSS e componentes originais permanecem iguais. O MP4 original e os PNGs foram preservados. Nenhuma dependência, commit, push ou deploy.

Verificações dirigidas no Chrome, em 1440×900 e 390×844:

- `currentSrc` confirmou a variante GOP 6, com duração de 8 s e estado `ready`. Percurso 0 → 40% → 65% → 90% → 100% → 65% → 0 restaurou aproximadamente 0 → 0,8 → 4,8 → 7,95 → 7,95 → 4,8 → 0 s, sempre pausado.
- Aos 90% e 100%, existe uma única camada de fundo final em y=0; conteúdo também em y=0, com opacidade aproximadamente 0,333 e 1. Sem overflow horizontal nas duas larguras.
- Movimento reduzido desativa o modo animado, remove o `src` do vídeo e libera a chegada. Bloqueio deliberado da requisição da variante ativa o fallback e o aviso de imagens estáticas. Após remover o bloqueio e recarregar, o vídeo volta a `ready`.
- Nenhum erro JavaScript observado. O console registra o 404 preexistente de `/favicon.ico` e, durante o teste de fallback, as falhas de rede provocadas deliberadamente; nenhum erro de carregamento da variante no uso normal.
- Lint do TSX afetado e `git diff --check` aprovados. SHA-256 do original e dos dois PNGs iguais aos registros anteriores. Reverter apenas a string do `src` em memória reproduz o hash anterior do componente, confirmando a alteração única. Sem TypeScript ou build adicionais para esta troca de referência.

A fluidez percebida no Chrome manual e em aparelhos reais permanece sujeita à homologação do idealizador; não foi repetido o benchmark de desempenho nesta adoção.

## Ritmo sobreposto e percurso reduzido — 17/10/2026

Parâmetros atuais: painéis 0–16%, carro 0–23%, vídeo 5–85%, chegada 85–100%. Intervalos centralizados em `SCROLL_VIDEO_TIMING`; distância configurável no CSS por `--scroll-distance`, 250svh no desktop e 220svh abaixo de 759px. As faixas anteriores nos registros históricos descrevem suas respectivas versões.

A dissolução inicial foi antecipada para 2–10%: mostra gradualmente o primeiro frame antes de iniciar seu avanço em 5%, evitando uma troca instantânea entre o PNG e o vídeo. Ordem preservada: imagem inicial atrás do vídeo, imagem final sobre o vídeo e elementos transparentes da Hero na frente. Removido o fade do contêiner `heroLayer`, que multiplicava novamente a opacidade do carro e dos painéis. Cada elemento conserva seu próprio fade: carro escala de 1 a 1,08 sem translação; painéis mantêm saída simétrica independente. Nenhuma alteração no seeking, arquivo GOP 6, dissolução final, geometria da chegada ou componentes originais.

### Verificações dirigidas

Chrome em 1440×900 e 390×844: capturas e inspeção em 0%, 5%, 10%, 16%, 23%, 50%, 85%, 100% e logo após, com retorno por 50%, 10% e 0%. Arquivos em `output/playwright/rhythm-<largura>-<percentual>.png`; medições em `rhythm-results.json` e `rhythm-recovery.json` no mesmo diretório.

| Progresso | Resultado nas duas larguras |
|---|---|
| 0% | Hero preservada, carro e painéis opacos, vídeo em 0 s |
| 5% | Painéis em saída, carro com cerca de 78% de opacidade; vídeo em 0 s, dissolução com cerca de 38% |
| 10% | Frame efetivamente apresentado em 0,5 s; vídeo opaco e carro ainda com cerca de 56,5% de opacidade |
| 16% | Painéis transparentes, dois deslocamentos negativos e dois positivos; frame apresentado próximo a 1,083 s; carro com cerca de 30,4% de opacidade |
| 23% | Carro desaparecido, escala próxima a 1,08; frame apresentado próximo a 1,792 s |
| 50% | Vídeo próximo a 4,5 s; câmera já orientada para a parede de destino |
| 85% | Tempo solicitado 7,95 s, último frame apresentado próximo a 7,917 s; dissolução final mantida, conteúdo ainda transparente |
| 100% | Conteúdo revelado sobre um único cenário final em y=0 |

`requestVideoFrameCallback` confirma avanço de frames antes do desaparecimento do carro, além de `currentTime`. No retorno, frames voltam a aproximadamente 4,5 → 0,5 → 0 s. Distâncias medidas: 2250 px no desktop e aproximadamente 1857 px no mobile. Arredondamentos subpixel explicam progresso móvel próximo a 0,9996 no ponto nominal de 100%. Após o percurso, conteúdo sobe naturalmente enquanto o único cenário permanece em y=0; nenhum overflow horizontal identificado.

Salto por teclado (Enter) transfere foco a `experiment-arrival`, sem `inert`. Movimento reduzido remove `src`, desativa o percurso animado e libera leitura. Requisição da variante bloqueada deliberadamente ativa fallback e aviso; ao retirar o bloqueio, volta a `ready`. Nenhum erro JavaScript observado; console mantém o 404 preexistente de favicon e as falhas de rede provocadas no teste. Lint do TSX, TypeScript sem emissão (`--incremental false`) e `git diff --check` aprovados. Sem build ou benchmark adicional.

Limitações visuais preservadas: PNGs e vídeo possuem enquadramentos diferentes, perceptíveis como sobreposição durante as dissoluções, especialmente a final em torno de 85%; não há uma segunda origem de fundo. O carro fica deliberadamente translúcido durante o fade. Safari/iOS e a percepção de ritmo na rolagem manual continuam dependentes de homologação. O vídeo GOP 6 mantém seu SHA-256 registrado anteriormente. Home, Serviços, ativos e componentes originais não foram editados; sem instalação, commit, push ou deploy.

## Percurso de 120svh — 17/10/2026

Alterados exclusivamente os dois valores de `--scroll-distance` no CSS experimental para 120svh. A etapa anterior de 250/220svh permanece acima como histórico. Intervalos 0–16%, 0–23%, 5–85% e 85–100%, dissoluções, seeking e arquivos de mídia não foram alterados.

Chrome em 1440×900 e 390×844: percurso útil de 1080 px e aproximadamente 1013 px (valor inteiro medido de 1012 px devido a arredondamento de `offsetHeight`). Ida e volta por 0%, 10%, 50%, 90%, 100% e após o fim confirmaram tempos 0 → 0,5 → 4,5 → 7,95 s e retorno até 0. Cenário final único em y=0 durante a chegada; depois de 100%, apenas o conteúdo começa a subir, sem duplicação ou salto geométrico observado. Sem overflow horizontal. Capturas: `output/playwright/short120-<largura>-90.png`, `-100.png` e `-108.png`; medições: `short120-results.json` no mesmo diretório.

Teste de roda do mouse automatizada no desktop: 12 eventos de +100 px, separados por cerca de 100 ms, e depois 12 de -100 px. Callbacks de apresentação mostraram avanços de aproximadamente 0,92–0,96 s de mídia por evento na faixa ativa, equivalentes a cerca de 22 quadros da fonte por passo, nos dois sentidos. Há perda de continuidade em passos grandes: o percurso menor amplifica o deslocamento temporal por evento, e o seeking direto não interpola esses intervalos. Isso não indica sozinho regressão de decodificação. A roda automatizada não reproduz todas as configurações de mouse/Windows; fluidez e quantidade de giros exigem avaliação manual. Não foi alterado o algoritmo para compensar esse efeito.

Enter no salto manteve foco em `experiment-arrival`; movimento reduzido removeu o `src` e liberou a chegada; bloqueio deliberado do MP4 ativou fallback e, removido o bloqueio, o vídeo voltou a `ready`. `git diff --check` aprovado. Sem lint, TypeScript ou build adicionais por se tratar apenas de dois valores CSS; o teste diretamente relacionado foi no navegador. Mantidas as diferenças preexistentes entre PNGs e vídeo nas dissoluções. Sem alteração da Home, componentes originais, dependências, commit, push ou deploy. Rota disponível para homologação manual.

## Fim da leitura e posição do título — 17/10/2026

### Diagnóstico antes da edição

Reprodução no Chrome nas quatro resoluções solicitadas. A faixa inferior era o `footer` experimental, posterior ao `main`/track, com background `#101112`, padding vertical de 32 px e link de 44 px: altura total de 108 px, mesmo com o status vazio. Em 1440×900, no fim absoluto, começava em y≈792 e ocupava os últimos 108 px. O espaçador estava correto: a altura do track correspondia ao conteúdo mais 120svh, sem sobra independente após a Credibilidade.

O título estava integral na chegada: topo y=88, navegação até y=68, nas quatro resoluções. Depois de mais 100 px de leitura, o topo passava para aproximadamente -12 px; a navegação sticky cobria a parte que passava sob ela. Não era clipping do título nem entrada antecipada dos cards. Após 100%, o sticky da chegada atinge seu limite e libera o conteúdo para subir naturalmente; congelar o título ou comprimir todos os cards numa tela prejudicaria essa leitura. O salto por teclado retorna ao começo da chegada, com título integral.

### Correção mínima

Removidos apenas o rodapé experimental e seu retorno duplicado. O retorno à Home permanece na navegação superior. A faixa escura superior é intencional: abriga navegação e foco de teclado e foi preservada.

O mesmo `role=status` agora fica após a navegação, fora dos contêineres `inert`, com posicionamento fixo e sem altura no fluxo. Somente quando contém uma mensagem recebe fundo e padding: é um aviso de fallback, não um rodapé permanente. Assim permanece visível e acessível durante uma falha, sem acrescentar scroll ou mudar a geometria do track. Nenhuma alteração no título, sticky, espaçador, coreografia, 120svh, dissoluções, GOP 6 ou seeking. Não se introduziu clipping nem altura fixa para mascarar a faixa.

### Resultados

- Capturas de chegada, primeira leitura (+50 px), meio, final absoluto e retorno à Hero nas resoluções 1440×900, 1920×1080, 1366×768 e 390×844. Ao fim, o limite inferior do track coincide com o limite da viewport, com tolerância subpixel inferior a 1 px; cenário em y=0, uma única imagem final, nenhum rodapé ou overflow horizontal.
- Título legível no início: confirmação adicional por Tab/Enter no salto nas quatro larguras encontrou y=88, foco em `experiment-arrival` e `inert=false`. Durante a leitura ele pode naturalmente sair pelo topo e pode ser revisto rolando para cima ou usando o salto. O retorno até a Hero restaura progresso e tempo inicial.
- Viewports de layout 1800×1125, 2400×1350 e 1708×960 verificam espaço equivalente aos três desktops a 80%. Isso é uma aproximação de layout, **não validação do zoom nativo do Chrome**. Zoom real de 80% permanece para homologação manual. Em 2400×1350 o conteúdo cabe integralmente; não foi criada rolagem extra para forçar uma etapa de leitura inexistente.
- Movimento reduzido continua sem `src` no vídeo e sem `inert` na chegada. MP4 bloqueado ativa aviso fixo legível, fora de `inert`; removido o bloqueio, volta a `ready`. Nenhum erro JavaScript observado nesses testes; mantido o 404 preexistente de favicon e os erros de rede deliberados do fallback.
- Lint do TSX, TypeScript sem emissão e `git diff --check` aprovados. Sem build ou suíte adicional.

Evidências: `output/playwright/end-before-*.png`, `end-before.json`, `end-fix-<largura>-{arrival,after,middle,end,hero}.png`, `end-fix-fallback.png`, `end-after.json` e `end-recovery.json`. A primeira medição pós-edição de 1440×900 coincidiu com atualização de layout/HMR; sua captura de chegada foi refeita após estabilização, com título em y=88 confirmado pelo salto e pelas medições finais de recuperação. As diferenças preexistentes entre PNG e MP4 e os saltos temporais da roda em 120svh não foram alterados. Home e componentes originais preservados; sem dependências, commit, push ou deploy.

## Implementação compartilhada e integração à Home — 17/10/2026

Integração autorizada para homologação visual, ainda sem aprovação automática da Home resultante. `app/page.tsx` mantém aviso de protótipo, skip link, `SiteHeader`, main e rodapé estrutural. `HomeSections` agora monta uma única `StudioScrollExperience` com `context="home"`. A Hero original e `LegacyHomeSections` permanecem preservadas como código, sem serem montadas adicionalmente.

### Arquitetura e diferenças de contexto

- `components/sections/studio-scroll-experience.tsx`: implementação extraída da versão validada, incluindo composição da Hero, uma instância da Credibilidade original, camadas, geometria sticky, seeking, fallback e movimento reduzido. Parâmetros aprovados preservados integralmente: painéis 0–16%, carro 0–23%, vídeo 5–85%, chegada 85–100%, 120svh e GOP 6. O controlador não foi reconstruído nem duplicado.
- `components/experiments/scroll-video-experiment.tsx`: adaptador curto com `context="experiment"`, preservando exportação dos parâmetros. A rota de referência continua com navegação experimental, h1 de estudo e main próprio.
- CSS Module existente em `components/experiments/scroll-video-experiment.module.css` é consumido pelo componente compartilhado, sem edição nesta integração. Manter o arquivo no caminho atual evitou duplicar ou reescrever os estilos validados. Nenhum CSS global acrescentado.
- Na Home, o contêiner interno é div (sem main aninhado), o h1 identifica a empresa e não existe navegação experimental. O link próprio `#credibilidade` usa o destino calculado do fim da travessia e transfere foco à chegada. Acesso direto com hash aguarda a restauração nativa por dois rAF antes de corrigir o destino sticky; callbacks e listener de navegação são removidos na desmontagem. Sem bloquear scroll.
- `app/page.module.css` mantém o rodapé estrutural da Home acima das camadas sticky e com o fundo claro preexistente. Sem esse ajuste local, as camadas do cenário podiam encobrir os links do rodapé. Esse rodapé identificado da Home é continuação normal do layout, não o retorno experimental removido anteriormente; não foi redesenhado.

A composição usada é a Hero validada do experimento, com cenário inicial disponível, quatro painéis e carro; não monta a Hero antiga com seu cenário independente, prévia interativa de PPF e CTA de orçamento pendente. O arquivo original foi preservado. `studio-entrada-v2.png` e `studio-entrada.png` continuam ausentes no estado local preexistente. A Home integrada não solicita V2; a referência preexistente em Serviços continua fora do escopo. Não se restauraram arquivos nem se alteraram Serviços, dados ou autorizações.

### Verificações da integração

Chrome: 1920×1080, 1440×900, 1366×768 e 390×844. Capturas inspecionadas no início, 10%, 50%, 85%, 100%, leitura e retorno. Tempos observados próximos a 0 → 0,5 → 4,5 → 7,95 s; retorno à Hero restaura 0. Um main, um h1 e uma Credibilidade por página. Sem overflow horizontal, rodapé experimental, cenário final duplicado ou trava de scroll. Título na chegada em y≈88; após leitura adicional de 100 px, sobe naturalmente para y≈-12. A navbar e o aviso preexistentes permanecem no fluxo da Home, enquanto a navegação da referência é sticky; esse enquadramento inicial difere entre os contextos.

Navegação própria por Enter leva ao início da Credibilidade com foco em `studio-arrival`; `/#credibilidade` também abre com progresso 1 e título em y≈88. Link Serviços chega à rota existente. Retorno do rodapé restaura progresso 0. Movimento reduzido remove o src do vídeo e libera leitura estática; bloqueio deliberado do MP4 ativa aviso de fallback, removido ao recarregar sem bloqueio. A rota experimental mantém seu salto funcional e título em y=88. Nenhum erro JavaScript observado; permanecem o favicon ausente e o recurso V2 ausente em Serviços, além das falhas de rede deliberadas no teste.

Uma viewport de 1800×1125 confirma layout equivalente ao espaço de 1440×900 com zoom de 80%, sem overflow e título legível; não substitui teste do zoom nativo do Chrome. Zoom real, Safari/iOS, rede lenta e aparelhos reais continuam pendentes. Diferenças entre PNG/MP4 nas dissoluções, tamanho do GOP 6 e saltos temporais de roda com 120svh permanecem como limitações conhecidas, sem nova alteração da coreografia.

Lint dos TSX afetados, TypeScript sem emissão e `git diff --check` aprovados. Sem build adicional, instalação, commit, push ou deploy. Evidências em `output/playwright/home-integration-*.png`, `home-integration-results.json`, `home-footer-*.png`, `home-reference-arrival.png`, `home-layout80-arrival.png` e script `home-integration-checks.js`/resultados correspondentes. As capturas iniciais de fim registram o cenário antes do ajuste de empilhamento do rodapé; `home-footer-*.png` registra o resultado final. Materiais continuam como placeholders identificados, sem novas alegações comerciais.

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
