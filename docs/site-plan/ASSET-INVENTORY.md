# Inventário de imagens — Auto Detailer Toledo

**Data:** 09/10/2026 · America/Fortaleza  
**Status:** PROPOSTA DE PLANEJAMENTO; revisão e autorização de publicação pendentes.  
**Referência:** [Arquitetura](ARCHITECTURE.md). Nenhum ativo ou texto produzido nesta tarefa.

## Critérios e contagens

**VERIFICADO NO PROJETO:** 11 arquivos de imagem existentes: 7 em public/ e 4 em docs/references/. Apenas E01, E03, E05 e E06 são usados na Hero atual. Existência, disponibilidade técnica e autorização pública são estados diferentes.

**PROPOSTA:** 15 necessidades/caminhos reservados pendentes (P01–P15), não 15 imagens já produzidas ou obrigação de gerar todas. Cinco ambientes opcionais (P02–P06), dois painéis condicionais (P14/P15), sete registros reais (P07–P13) e uma validação/entrega de identidade (P01). Aprovar/reutilizar mídia pode reduzir a coleta; a quantidade de fotos por caso ou serviço futuro aumentará o inventário após definição do escopo.

Os tipos IA conceitual de E01–E06 preservam o tratamento do protótipo e o contexto fornecido pelo solicitante; não são resultado de detector de IA nem comprovação de licença. Não promover E07 a identidade oficial. R03/R04 foram abertos e inspecionados diretamente nesta rodada: capturas de posts do perfil informado com carros/ambiente. Não autenticam as fotografias, a data do serviço, a autoria, o endereço ou a oferta. O nome dos arquivos registra 09/10/2026; não confirma data de publicação. Não atualizar U1 de RESEARCH.md automaticamente.

## Existentes — caminhos atuais, sem renomeação

| ID | Página de uso | Finalidade | Caminho exato | Tipo | Formato / proporção / dimensões | Transparência | Prioridade | Status | Origem / autorização | Dependências |
|---|---|---|---|---|---|---|---|---|---|---|
| E01 | Home; identidade compartilhada | Logo refinada conceitual | `public/logo/Logo Automotivo Dourado Toledo Detailer.png` | IA conceitual / identidade refinada, não oficial comprovada | PNG RGBA; 1774×887, 2:1 | Sim; transparência já inspecionada | Alta | Existente; requer aprovação | Fornecido para protótipo; autoria/licença e aprovação da marca pendentes | P01; não duplicar caso esta versão seja aprovada |
| E02 | Arquivo comparativo | Versão anterior de cenário | `public/images/enviroments/studio-entrada.png` | IA conceitual | PNG RGB; 1672×941, ~16:9 | Não | Baixa | Existente; reserva | Fornecido; uso público/licença pendentes | Preservar sem duplicar ou usar como instalação real |
| E03 | Home | Garagem principal V2 em uso | `public/images/enviroments/studio-entrada-v2.png` | IA conceitual | PNG RGB; 1672×941, ~16:9 | Não | Alta | Existente; requer aprovação | Fornecido para protótipo; publicação pendente | Não confundir com public/images/environments/ |
| E04 | Arquivo comparativo | Rolls-Royce V1 | `public/images/hero/rolls-royce-preto.png` | IA conceitual | PNG RGBA; 1672×941, ~16:9 | Sim; verificado antes | Baixa | Existente; reserva | Fornecido; não é caso real | Manter V1 para comparação |
| E05 | Home; catálogo/PPF como conceito identificado | Painel PPF com texto/moldura incorporados | `public/images/services/ppf.png` | IA conceitual | PNG RGB; 1024×1536, 2:3 | Não | Alta | Existente; requer aprovação | Fornecido para protótipo; sem comprovação de serviço real | Não duplicar moldura/texto; P07/P08 para evidência |
| E06 | Home | Rolls-Royce V2 em uso | `public/images/hero/rolls-royce-preto-v2.png` | IA conceitual | PNG RGBA; 1671×941, ~16:9 | Sim; pixels transparentes reais verificados | Alta | Existente; requer aprovação | Fornecido para protótipo; não é trabalho Toledo | Não alterar original; contexto conceitual acessível |
| E07 | Referência de marca, não selecionado na Hero | Logo com fundo preto | `public/logo/logo.png` | Identidade oficial: candidata, status não confirmado | PNG RGBA; 642×640, ~1:1 | Arquivo tem alpha, cantos opacos; não é recorte transparente confirmado | Média | Existente; requer aprovação | Origem e oficialidade pendentes | Não deduzir oficialidade pelo nome logo.png |
| R01 | Pesquisa de composição | Referência inicial Pinterest fornecida | `docs/references/hero.png` | Referência de terceiro; fora das categorias de ativos do site | PNG; 685×617 | Não aplicável | Baixa | Existente; só referência | Sem licença de reprodução comprovada | Não copiar veículo, marca, texto ou fotografias |
| R02 | Planejamento da Home | Estudo de composição Toledo V1 | `docs/references/hero-toledo-conceito-v1.png` | IA conceitual / estudo fornecido | PNG RGB; 1672×940, ~16:9 | Não | Alta | Existente; só referência | Diretriz visual do idealizador; aprovação comercial não presumida | Não usar como fundo único; serviços do estudo não confirmados |
| R03 | Referência do contexto físico | Captura local de post Instagram | `docs/references/WhatsApp Image 2026-10-09 at 17.24.29.jpeg` | Real: captura de tela fornecida, original fotográfico não autenticado | JPEG; 720×1600, 9:20 | Não | Média | Existente; só referência | Arquivo mostra interface/perfil e veículos; autorização de reutilização pendente | Solicitar original, contexto e direitos; placas/dados visíveis |
| R04 | Referência do contexto físico | Captura local de post Instagram | `docs/references/WhatsApp Image 2026-10-09 at 17.24.30.jpeg` | Real: captura de tela fornecida, original fotográfico não autenticado | JPEG; 720×1600, 9:20 | Não | Média | Existente; só referência | Arquivo mostra interface/perfil e ambiente; leitura independente não realizada | Não concluir serviço atual, endereço exato ou vínculo com marcas |

## Planejados — nenhum destes caminhos existe como ativo nesta inspeção

| ID | Página de uso | Finalidade | Caminho exato | Tipo | Formato / proporção / dimensões | Transparência | Prioridade | Status | Origem / autorização | Dependências |
|---|---|---|---|---|---|---|---|---|---|---|
| P01 | Todas | Identidade aprovada | `public/logo/toledo-logo-oficial.svg` | Identidade oficial | SVG vetorial; variante raster 1200 px se necessária | Sim na aplicação sobre cenário | Alta | Requer aprovação; arquivo pendente | Proprietário/responsável pela marca | Pode ser atendido aprovando E01 ou E07 sem novo arquivo; caminho reservado só se houver novo original |
| P02 | Serviços | Área de apresentação | `public/images/environments/services-hall.webp` | IA conceitual | WebP/AVIF; 1920×1080, 16:9 | Não | Média | Pendente; cenário opcional | Produção futura autorizada, não executada | Aprovar cenário e continuidade E03; fallback editorial |
| P03 | PPF | Área técnica de aplicação cenográfica | `public/images/environments/ppf-bay.webp` | IA conceitual | WebP/AVIF; 1920×1080, 16:9 | Não | Média | Pendente; cenário opcional | Produção futura autorizada | Não provar equipamentos/processos locais |
| P04 | Trabalhos | Galeria cenográfica | `public/images/environments/works-gallery.webp` | IA conceitual | WebP/AVIF; 1920×1080, 16:9 | Não | Baixa | Pendente; cenário opcional | Produção futura autorizada | Cases reais independentes; fallback neutro |
| P05 | Sobre; FAQ se útil | Ambiente institucional discreto | `public/images/environments/institutional-room.webp` | IA conceitual | WebP/AVIF; 1920×1080, 16:9 | Não | Baixa | Pendente; cenário opcional compartilhado | Produção futura autorizada | FAQ não exige imagem própria; sem família fictícia |
| P06 | Contato | Recepção/escritório cenográfico | `public/images/environments/reception.webp` | IA conceitual | WebP/AVIF; 1920×1080, 16:9 | Não | Média | Pendente; cenário opcional | Produção futura autorizada | Não apresentar como recepção real; dados e P13 independentes |
| P07 | PPF; catálogo | Processo real PPF | `public/images/services/ppf-processo-real.webp` | Real | WebP/AVIF; 1600×1200, 4:3 | Não | Alta | Pendente | Fotógrafo/equipe/cliente autorizados | Aplicação identificada, contexto e revisão técnica |
| P08 | PPF | Detalhe real de acabamento | `public/images/services/ppf-detalhe-real.webp` | Real | WebP/AVIF; 1200×1500, 4:5 | Não | Alta | Pendente | Originais autorizados | Relacionar a P07 ou caso, sem simular resultado |
| P09 | Trabalhos; resumo PPF | Contexto do primeiro caso | `public/images/works/caso-01-contexto.webp` | Real | WebP/AVIF; 1600×1067, 3:2 | Não | Alta | Pendente | Equipe/cliente/fotógrafo; cessão registrada | Caso-01 é ID reservado, não trabalho existente |
| P10 | Trabalhos; PPF se pertinente | Intervenção do mesmo caso | `public/images/works/caso-01-intervencao.webp` | Real | WebP/AVIF; 1600×1200, 4:3 | Não | Alta | Pendente | Mesmas autorizações do caso | Não presumir serviço PPF; confirmar |
| P11 | Trabalhos | Acabamento documentado do caso | `public/images/works/caso-01-acabamento.webp` | Real | WebP/AVIF; 1600×1067, 3:2 | Não | Alta | Pendente | Mesmas autorizações do caso | Não equivale a antes/depois comparável |
| P12 | Sobre | Responsáveis em atividade | `public/images/about/responsaveis-em-atividade.webp` | Real | WebP/AVIF; 1200×1500, 4:5 | Não | Alta | Pendente | Pessoas/fotógrafo autorizados | Nomes/funções e consentimento; evitar menores sem revisão |
| P13 | Contato; Sobre | Fachada/local atual real | `public/images/contact/fachada-atual.webp` | Real | WebP/AVIF; 1600×1200, 4:3 | Não | Alta | Pendente | Proprietário/fotógrafo | Confirmar localização, imagem recente e placas/dados |
| P14 | Home; catálogo; serviço futuro | Painel 2 | `public/images/services/painel-servico-02.webp` | Real, após definição | WebP/AVIF; 1000×1500, 2:3 | Não, salvo recorte aprovado | Condicional | Pendente; condicionado ao serviço | Oferta e imagem autorizadas | Não é nome/slug comercial; manter estado provisório até validação |
| P15 | Home; catálogo; serviço futuro | Painel 3 | `public/images/services/painel-servico-03.webp` | Real, após definição | WebP/AVIF; 1000×1500, 2:3 | Não, salvo recorte aprovado | Condicional | Pendente; condicionado ao serviço | Oferta e imagem autorizadas | Não presumir cerâmica/polimento a partir do estudo |

## Regras de organização e produção futura

- A pasta existente é literalmente `public/images/enviroments/`. Não renomeada. `public/images/environments/` é proposta para futuros cenários, não uma pasta já criada; eventual migração exige tarefa autorizada e atualização de referências. Não duplicar E03 só para corrigir grafia.
- `public/logo/toledo-logo-refinado.png` e `public/images/environments/studio-entrada-v2.png` não existem. E01/E03 são os arquivos realmente usados. P01 não é substituição automática.
- Dimensões propostas são alvos aproximados para coleta/exportação, não exigência de ampliar fontes pequenas. Decidir formato/tamanho por uso, mantendo original e sem distorcer. Transparência deve ser real, não fundo preto ocultado por CSS.
- Cada mídia terá origem, autor/cedente, permissão, pessoa/veículo representado, contexto, data quando pertinente e restrições. Não presumir autorização porque o usuário entregou arquivo para estudo ou porque está no Instagram.
- Fotos reais para cases/equipe/local; cenas conceituais identificadas como cenografia. Nunca gerar pessoas, instalações, processos ou resultados e apresentá-los como fatos. Nenhuma geração, cópia, otimização ou alteração de ativo executada aqui.
- Painel 4 pode permanecer tipográfico; sem necessidade de foto adicional. FAQ pode usar superfície neutra ou P05; não criar imagem só para completar decoração. Um caso compartilhado entre páginas referencia os mesmos P09–P11.
- Referências ficam fora de public/. Não usar capturas com UI/compressão como mídia final. Verificar placa, dados de clientes e consentimentos antes de planejar tratamento.

