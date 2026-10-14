# Catálogo de serviços — Auto Detailer Toledo

**Data:** 09/10/2026 · America/Fortaleza  
**Status:** PROPOSTA para revisão. Sem copy final, aprovação comercial ou autorização de implementação.  
**Referências:** [Arquitetura](../ARCHITECTURE.md), [imagens](../ASSET-INVENTORY.md), [textos](../COPY-INVENTORY.md), [transições](../NAVIGATION-TRANSITIONS.md); documentos canônicos preservados.

**Rota:** `/servicos`. Protótipo funcional implementado em 10/10/2026; publicação comercial continua condicionada à validação abaixo.

## 1. Objetivo

Apresentar somente o que a operação oferece atualmente e encaminhar a uma página útil por serviço.

## 2. Público e intenção de navegação

Visitante que compara opções ou conhece a marca e deseja descobrir o catálogo.

## 3. Ambiente do estúdio

Área de apresentação de serviços, cenográfica, não acervo real. P02 é pendente; fallback editorial sem cenário novo aprovado é aceitável.

## 4. Hierarquia visual e estrutura de conteúdo

H1 de catálogo → introdução curta → PPF em destaque se confirmado → outras ofertas aprovadas → orientação para contato. Imagens e descrições com vínculo claro ao serviço.

## 5. Seções e componentes candidatos

ServiceIndex, ServicePreview, breadcrumb opcional e CTA compartilhado são candidatos. Baseline visual dos painéis inspira hierarquia, não obriga quatro ofertas.

## 6. Interações e CTAs

Links para /servicos/ppf e slugs aprovados, orçamento → /contato. Sem card clicável vazio; categorias/filtros só se volume real justificar.

## 7. Imagens necessárias

P02 para ambiente; E05 apenas ilustração conceitual de PPF; P07/P08 para evidência real. P14/P15 só após oferta confirmada. Não copiar imagens do estudo para novos serviços.

## 8. Textos necessários

S01–S03; apresentação do catálogo, nome/escopo de cada oferta, orientação para avaliação. Acrescentar unidades de copy quando novo serviço for aprovado.

## 9. Dados comerciais e técnicos pendentes

Lista vigente, nomes, restrições, prioridade, responsável por atualização. Polimento e cerâmica do estudo não entram automaticamente.

## 10. Responsividade e acessibilidade

Lista semântica; links descritivos; ordem única em mobile. Descrições fora de imagens, contraste e foco. Nenhuma informação essencial apenas em hover.

## 11. Relação com SEO

Página de categoria/descoberta; páginas individuais concentram intenção técnica/comercial específica. Sem repetição artificial de bairros ou catálogo gerado por palavras-chave.

## 12. Critérios de validação

Catálogo corresponde à lista aprovada; cada item tem destino pronto e conteúdo próprio. Se só PPF for validado, catálogo pode ser pequeno e honesto; sem serviços a confirmar em página publicada.



## 13. Decisão visual e implementação inicial — 10/10/2026

**APROVADO PELO IDEALIZADOR:** galeria panorâmica cinematográfica, painéis grandes integrados visualmente ao ambiente, PPF em destaque, catálogo expansível, prévia antes do detalhe, suporte futuro a vídeos reais autorizados e acesso por toque. Não é aprovação comercial do proprietário.

**IMPLEMENTADO:** cenário conceitual E03 reaproveitado; painel PPF E05 identificado como conceito; lista em fluxo horizontal preparada para mais serviços; prévia em HTML por clique, foco ou toque; página individual indisponível; retorno à Home; ausência de mídia e catálogo vazio tratados. Apenas um item demonstrativo, sem novas ofertas.

Modelo em `content/services.ts`: nome, slug, descrição curta, imagem opcional com origem conceitual/real, vídeo opcional real com status de autorização, aprovação comercial, prioridade visual e disponibilidade do destino. Componentes em `components/sections/service-gallery.tsx`; estilos isolados em CSS Module, sem alteração da Home.

**PREPARADO, NÃO UTILIZADO:** vídeo real autorizado pode ser carregado sob demanda no hover do mouse, silencioso e inline, sem autoplay contínuo ou loop; ao sair/perder foco, pausa e retorna à imagem. Movimento reduzido não inicia essa prévia. Falha de reprodução mantém a alternativa estática. Nenhum vídeo real foi fornecido; nenhum vídeo é montado ou reprodução simulada no catálogo atual. Uma experiência de vídeo completa por toque/teclado com controles e alternativas deverá ser validada quando houver material; hoje essas modalidades têm a prévia textual completa.

**PENDENTE:** dados comerciais, materiais/coberturas/garantias, fotos reais P07/P08, direitos dos ativos, vídeos autorizados e página individual. P02 continua opcional/pendente; a garagem conceitual atual não é evidência de instalação real. Acesso ao detalhe só será habilitado quando a página existir e o conteúdo estiver aprovado. Transições cinematográficas completas ficam para outra autorização.