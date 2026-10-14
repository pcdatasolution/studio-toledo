# Dúvidas frequentes — Auto Detailer Toledo

**Data:** 09/10/2026 · America/Fortaleza  
**Status:** PROPOSTA para revisão. Sem copy final, aprovação comercial ou autorização de implementação.  
**Referências:** [Arquitetura](../ARCHITECTURE.md), [imagens](../ASSET-INVENTORY.md), [textos](../COPY-INVENTORY.md), [transições](../NAVIGATION-TRANSITIONS.md); documentos canônicos preservados.

**Rota planejada:** `/faq`. Não implementada. Publicação depende dos critérios abaixo.

## 1. Objetivo

Concentrar dúvidas de contato e contratação, encaminhando detalhes técnicos à página de serviço.

## 2. Público e intenção de navegação

Visitante que precisa esclarecer uma condição antes de conversar ou visitar.

## 3. Ambiente do estúdio

Ambiente discreto; preferir reaproveitar P05 aprovado ou superfície neutra, sem novo ativo obrigatório. Legibilidade tem prioridade sobre cenário.

## 4. Hierarquia visual e estrutura de conteúdo

H1 → dúvidas práticas agrupadas por intenção → vínculos para serviço/local → contato. Somente perguntas com respostas úteis; FAQ técnica principal continua no serviço.

## 5. Seções e componentes candidatos

FAQGroups e disclosure nativo são candidatos, com texto no HTML. Busca interna apenas se quantidade real justificar.

## 6. Interações e CTAs

Links de serviço → /servicos/ppf; localização e condições → /contato. CTA para dúvidas não resolvidas no canal validado. Abrir pergunta não muda rota automaticamente.

## 7. Imagens necessárias

Sem imagem obrigatória nova. P05 pode ser reutilizado de forma discreta; não encomendar cenário exclusivo sem benefício.

## 8. Textos necessários

F01–F04; introdução, perguntas práticas reais, respostas revisadas e metadados. D06 é origem das dúvidas específicas de PPF; evitar cópia longa em duas páginas.

## 9. Dados comerciais e técnicos pendentes

Dúvidas recebidas pela equipe; dados para orçamento, agendamento, visita, horários, canal. Garantia e duração dependem da oferta; não responder sim por padrão.

## 10. Responsividade e acessibilidade

Disclosure funciona por Enter/Espaço, foco visível e estado anunciado; conteúdo disponível sem animação/JS quando possível. Contraste, zoom e áreas de toque; sem fechar tudo obrigatoriamente a cada abertura.

## 11. Relação com SEO

Busca informacional/navegacional; respostas úteis independente de rich result. Não copiar schema concorrente nem prometer vantagem de FAQPage; avaliar marcação só na implementação autorizada.

## 12. Critérios de validação

Cada resposta tem origem e aprovação; links claros e válidos. Sem inventar demanda ou FAQ por palavras-chave. Se não houver respostas, adiar lançamento da página.


