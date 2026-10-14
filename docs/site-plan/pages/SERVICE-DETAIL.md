# Template de serviço — Auto Detailer Toledo

**Data:** 09/10/2026 · America/Fortaleza  
**Status:** PROPOSTA para revisão. Sem copy final, aprovação comercial ou autorização de implementação.  
**Referências:** [Arquitetura](../ARCHITECTURE.md), [imagens](../ASSET-INVENTORY.md), [textos](../COPY-INVENTORY.md), [transições](../NAVIGATION-TRANSITIONS.md); documentos canônicos preservados.

**Rota planejada:** `/servicos/ppf e /servicos/[slug]`. Não implementada. Publicação depende dos critérios abaixo.

## 1. Objetivo

Definir template reutilizável e orientar a primeira instância PPF sem inventar especificações.

## 2. Público e intenção de navegação

Pessoa com intenção comercial, dúvidas técnicas ou comparação anterior ao orçamento.

## 3. Ambiente do estúdio

Área técnica de aplicação para PPF (P03). Outros serviços recebem contexto próprio apenas após confirmação; não duplicar cenários nem sugerir equipamento inexistente.

## 4. Hierarquia visual e estrutura de conteúdo

Breadcrumb → H1/nome → explicação revisada → escopo e limites → opções reais → processo adotado → caso autorizado → dúvidas específicas → contato. Blocos opcionais sem dados são removidos; informações indispensáveis bloqueiam publicação.

## 5. Seções e componentes candidatos

ServiceDetail, ServiceScope, ProcessSteps, CaseSummary, FAQSubset e ContactCTA são candidatos. Número de etapas não predefinido.

## 6. Interações e CTAs

CTA contextual → /contato; caso → /trabalhos, com âncora de caso se implementada; dúvidas gerais → /faq; retorno → /servicos. Não exigir navegação cinematográfica para contratar.

## 7. Imagens necessárias

P03, P07/P08 e P09–P11 para prova real; E05 apenas conceitual identificado. Cenário nunca substitui fotografia do serviço. Outros serviços acrescentam ativos só após aprovação.

## 8. Textos necessários

D01–D07, um conjunto por instância: identidade, definição, escopo, processo, limites/cuidados/termos, dúvidas e metadados. PPF começa pelas necessidades de CONTENT.md, sem respostas finais.

## 9. Dados comerciais e técnicos pendentes

Oferta atual, regiões de aplicação, película/material, preparação, execução, prazos, existência/termos de garantia, manutenção e orçamento. Nenhum benefício absoluto ou propriedade de fabricante atribuída ao Toledo sem evidência.

## 10. Responsividade e acessibilidade

Leitura vertical em todas as telas; fotos com legendas factuais, respostas acessíveis sem hover. Breadcrumb e CTA por teclado; meios técnicos não podem depender de animação. Sem comparação antes/depois não comparável.

## 11. Relação com SEO

PPF em Fortaleza é hipótese editorial, sem volume/ranking estimado. Cada slug tem title/H1/texto próprios e canonical futuro. /ppf não existe; compatibilidade conforme ARCHITECTURE.md. Slug desconhecido deve resultar em 404; sem gerar páginas de placeholder.

## 12. Critérios de validação

Template possui campos obrigatórios e gate de aprovação antes de renderizar publicamente; fonte/responsável/data por alegação. PPF sem garantia presumida. Conteúdo único, links existentes, leitura sem cenário e revisão técnica assinada.

## Contrato editorial do template — proposta, sem código

| Campo | Necessidade | Falta de validação |
|---|---|---|
| slug e nome | Únicos, aprovados e incluídos no catálogo | Não gerar rota |
| status, responsável, fonte e revisão | Identificar quem aprovou cada alegação | Não publicar |
| definição e oferta local | Separar informação geral do que Toledo executa | Bloquear página comercial |
| escopo e limites | Descrever somente cobertura/opções reais | Bloquear afirmação ausente |
| materiais/processo | Específicos e revisados tecnicamente | Não importar fabricante/concorrente |
| cuidados, prazo e garantia | Condicionais; declarar ausência somente se confirmada | Não preencher automaticamente |
| mídia e permissões | Foto real ou imagem conceitual claramente identificada | Retirar imagem não autorizada |
| caso e perguntas | Opcionais; fatos e respostas aprovados | Omitir bloco sem conteúdo útil |
| contato e metadados | Canal e texto coerentes com oferta | Bloquear link/metadado incorreto |

A instância PPF não herda auto-regeneração, marca de película, duração, instalação certificada ou proteção absoluta. Serviços adicionais precisam de conjunto D01–D07 próprio; os 39 registros do inventário são o mínimo do escopo-base, não toda expansão futura.

