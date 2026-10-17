# Atualização de conteúdo — Studio Toledo

Este guia descreve a estrutura implementada em 14/10/2026. Arquitetura vigente:
Home cinematográfica com rolagem vertical e páginas independentes planejadas.
Hoje existem apenas Home e Serviços. Transições entre ambientes continuam futuras.
O cadastro de dados não cria páginas nem autoriza publicação.

## Onde editar

| Arquivo existente | Conteúdo |
| --- | --- |
| `content/services.ts` | Serviços e consulta `getServices(mode)` |
| `content/works.ts` | Trabalhos realizados; lista inicialmente vazia |
| `content/history.ts` | Textos institucionais, marcos, equipe e fotos coletivas |
| `content/business.ts` | Nome, canais, endereço, horários e agendamento |
| `content/types.ts` | Tipos comuns e funções de aprovação |

Os três últimos conjuntos de dados ainda não são consumidos pela interface.
Textos existentes da Home, logo, carro e cenário permanecem como estão;
sua migração para os dados será feita quando as páginas correspondentes forem
implementadas, sem substituir automaticamente o protótipo atual.

## Fotografias e vídeos

Use nomes curtos em minúsculas, sem espaços ou acentos, separados por hífen.
Não sobrescreva originais existentes. Para uma nova versão, use `-v2` etc.

| Categoria | Convenção de destino |
| --- | --- |
| Ambientes novos | `public/images/environments/` |
| Serviços | `public/images/services/<slug>/` |
| Trabalhos | `public/images/works/<id>/` |
| Retratos e fotos coletivas | `public/images/team/` |
| História | `public/images/history/` |
| Fachada e contato | `public/images/contact/` |
| Vídeos de execução | `public/videos/services/<slug>/` ou `public/videos/works/<id>/` |

Esses subdiretórios são convenções futuras, não pastas já criadas. Crie apenas
o destino necessário quando receber material. Não há necessidade de versionar
pastas vazias nesta etapa. As pastas atuais `public/images/services/`, `hero/`
e `enviroments/` existem; **não renomeie `enviroments/`**, usada pela Hero e Serviços.
`ppf.png` permanece armazenado, sem exibição; `ppf-processo-real.jpeg` também
permanece sem cadastro ou autorização presumida.

No conteúdo, omita `public`: `public/images/services/ppf/foto-v2.webp` vira
`/images/services/ppf/foto-v2.webp`. Não use caminhos do Windows nem URLs externas
nos campos de mídia. Não há varredura automática de pastas.

## Pendente e aprovado

- **Ausente:** omita o campo opcional de mídia; não use caminho vazio ou arquivo fictício.
- **Recebido, não autorizado:** cadastre com `usageApproval: "pending"`.
- **Autorizado para exibição:** use `usageApproval: "approved"` após confirmar os direitos.
- **Texto/dados preliminares:** `approvalStatus: "preliminary"`.
- **Texto/dados aprovados pelo proprietário:** `approvalStatus: "owner-approved"`.

Registre a evidência de autorização no processo editorial, identificando arquivo,
responsável e aprovação; o status no código não comprova consentimento por si só.
A aprovação de um serviço não aprova automaticamente suas fotos ou vídeos.
Imagens usam `kind: "real"` ou `"conceptual"`; vídeos são reais. Conceitos jamais
podem ser apresentados como casos reais. Descrição alternativa e dimensões da
imagem devem corresponder ao arquivo recebido.

## Atualizar PPF ou cadastrar um serviço

Edite o item em `services.ts`. Preserve seu `id` e `slug` para manter vínculos.
Campos: nome, subtítulo opcional, descrição curta, descrição detalhada opcional,
imagem principal opcional, vídeo opcional, destaque, aprovação e destino.
`featured` indica destaque/especialidade; não implica certificação.

Exemplo de atualização do **item existente**, quando o proprietário entregar
uma descrição e uma foto: substitua `shortDescription` pelo texto recebido,
adicione `detailedDescription` se houver e cadastre a imagem com seu caminho,
`alt`, `width`, `height`, `kind: "real"` e `usageApproval: "pending"`.
Somente depois da autorização altere para `"approved"`.

Modelo de preenchimento (não copiar os marcadores literalmente):

```text
id: "ppf"                           ← manter
slug: "ppf"                         ← manter
shortDescription: texto validado enviado pela equipe
detailedDescription: explicação detalhada, quando disponível
image.src: /images/services/ppf/nome-do-arquivo-recebido.webp
image.alt: descrição factual do que aparece na fotografia
image.width / image.height: dimensões reais em pixels
image.kind: "real"
image.usageApproval: "pending"       ← recebimento não autoriza exibição
approvalStatus: "preliminary"        ← até aprovação do texto/oferta
destination: { available: false }    ← detalhe ainda não implementado
```

`ServiceGallery` já lê a imagem aprovada sem mudar JSX: mídia ausente ou pendente
mantém “Fotografia em preparação”; falha de imagem aprovada usa “Imagem indisponível”.
A descrição curta aparece na prévia. Subtítulo e descrição detalhada ficam preparados
para futuros consumidores. A Hero continua com PPF em HTML: adicionar foto ao
serviço **não altera a Home automaticamente**.

Um vídeo usa `src`, `kind: "real"` e `usageApproval`. Só o vídeo autorizado é
montado na galeria; a interação existente por mouse e movimento reduzido permanece.
Não habilite `destination.available` antes de existir uma página válida e aprovada.

## Trabalhos, história e informações comerciais

Em `works.ts`, acrescente à lista `works` apenas trabalhos reais recebidos.
Cada registro tem `id`, aprovação e, opcionalmente, veículo confirmado,
`serviceId` correspondente a um ID existente, descrição, imagens e vídeos.
Não invente registros para preencher a galeria; use listas vazias sem material.

Em `history.ts`, preencha introdução/descrição quando fornecidas. Marcos têm
ID, descrição, data opcional e aprovação própria. Integrantes têm ID, nome e
função opcionais, foto opcional e aprovação própria. Fotos coletivas entram em
`photos`. Não deduza datas, funções ou parentesco das fotografias.

Em `business.ts`, preencha somente dados confirmados: nome comercial, WhatsApp,
Instagram, endereço, horários e orientação de agendamento. Todos começam ausentes.
O conjunto só deve receber `owner-approved` quando todos os campos presentes
estiverem aprovados; mantenha dados ainda não validados fora da publicação.

## Desenvolvimento e publicação

`getServices("prototype")` preserva o catálogo demonstrativo atual, inclusive
textos identificados como preliminares. `getServices("public")` retorna somente
serviços aprovados. `visibleContent(items, mode)` oferece o mesmo filtro para
futuros trabalhos, marcos e integrantes; `approvedMedia(media)` retorna somente
mídia autorizada. A ausência retorna `undefined` e deve manter layout estável.

**Importante:** `/servicos` usa explicitamente `"prototype"`, inclusive em um build
de produção. `NODE_ENV` não determina aprovação comercial. Antes de publicar,
troque o consumidor para `"public"`, revise os conteúdos fixos da Home, as notas
de protótipo e a indexação. O filtro não é um sistema de deploy ou proteção de arquivos:
tudo em `public/` pode ser acessado por URL se o site for hospedado. Materiais que
não podem ficar acessíveis devem permanecer fora de `public/` até autorização.

Não crie páginas públicas vazias, depoimentos ou ofertas fictícias. Um futuro
detalhe deve exigir aprovação, conteúdo útil e mídia autorizada separadamente.

## Conferir uma atualização

1. Confira nome/extensão e existência do arquivo; diferenças de maiúsculas podem falhar no deploy.
2. Confira dimensões, texto alternativo e aprovação; nunca use `approved` só para testar uma foto sem permissão.
3. Com dependências disponíveis, execute `npm.cmd run dev` no Windows e abra `/servicos`.
4. Selecione PPF por clique, teclado e toque; confira descrição, imagem ou estado de preparação.
5. Confira Home em desktop/mobile: cadastrar mídia em Serviços não deve mudar a Hero.
6. Execute TypeScript e lint pertinentes e `git diff --check`; confira a lista filtrada para publicação.

Os cadastros de trabalhos, história e contato só aparecerão quando tiverem
consumidores implementados. Não é necessário alterar esses dados ou inventar
conteúdo para tornar visível uma página que ainda não existe.
