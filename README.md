# clm-bench

Um processo público e open source para um departamento jurídico escolher e acompanhar um CLM. A matriz é um ponto de partida extensível: cada empresa acrescenta seus requisitos e valida as evidências no próprio contexto.

**[Usar o Bench](https://legalops.dev/bench/)** · [Contribuir](CONTRIBUTING.md) · [Metodologia](METHODOLOGY.md) · [Roadmap](ROADMAP.md) · [OpenCLM](https://legalops.dev/openclm)

## O que já funciona

- Catálogo próprio da comunidade com 234 opções, busca, filtros de escopo e comparação de duas a quatro ferramentas. Três passos: necessidade → ferramentas → avaliar, com um grupo de critérios por vez.
- Diagnóstico de volume, legado, usuários, tipos de contrato, idiomas, ferramentas existentes e integrações obrigatórias. Contagem de sistemas e salvamento local no navegador.
- 32 critérios em sete grupos, pesos de 0 a 5, notas editáveis, requisitos eliminatórios e roteiro de piloto. Todos os critérios começam com o mesmo peso.
- Seis etapas com checklist: diagnóstico → requisitos → comparação → piloto → decisão → acompanhamento.
- Relatório Markdown com contexto e etapas; link que compartilha apenas pesos, notas e requisitos; impressão; apresentação resumida com tela cheia.
- No site oficial, formulário público de fontes, experiências, correções, ferramentas e critérios. Conteúdo recebido fica privado até revisão; email nunca aparece no feed. Código e critérios também recebem issues e PRs.

A calculadora começa com Ironclad e Luminance. As notas dos quatro eixos originais são **hipóteses editoriais**, não desempenho medido. Os outros 28 critérios não têm nota inicial. Uma lacuna aparece como “a validar” e impede indicar vencedor. As demais ferramentas começam com todos os critérios sem nota. Adicionar uma ferramenta em `catalog.mjs` a disponibiliza na comparação, após revisão. Cadastros sem descrição suficiente ou com escopo adjacente são sinalizados; presença no catálogo não certifica um CLM completo. Não há ranking coletivo automático nem endosso comercial.

## Executar localmente

Requisitos: Node.js 20+ para testes; Python 3 para o servidor estático.

```sh
git clone https://github.com/agenciaspace/clm-bench.git
cd clm-bench
npm test
npm start
# http://localhost:8080/bench/
# Apresentação local: http://localhost:8080/bench/apresentacao.html
```

A calculadora não precisa de conta, chave, banco ou instalação de dependências. O formulário usa a API do site oficial, que só aceita envios das origens autorizadas. Em localhost/forks, o diagnóstico funciona, mas envios exigem backend próprio e origem configurada. Consulte [o adaptador](integrations/legalops/README.md). Nunca coloque uma chave service-role no site.

## Onde contribuir

| Arquivo | Papel |
|---|---|
| `site/bench/framework.mjs` | Critérios, perguntas de avaliação, testes de piloto e etapas |
| `site/bench/catalog.mjs` | Ferramentas, descrições breves, aliases, fontes e escopo |
| `data/` | Histórico de pesquisa e rastreabilidade; não faz parte da interface pública |
| `site/bench/model.mjs` | Pesos, notas iniciais, fontes e cálculo explicável |
| `site/bench/calculator.mjs` | Diagnóstico, comparação e exportação |
| `site/bench/community.mjs` | Formulário e leitura das contribuições revisadas |
| `integrations/legalops/` | Adaptador Next.js/Supabase usado na instalação oficial |
| `tests/` | Verificação do modelo sem dependências |

Este repositório é a origem aberta do módulo. O deploy atual é integrado ao [LegalOps](https://github.com/agenciaspace/legalops), em Cloudflare Pages + Worker. O mantenedor sincroniza uma revisão com `node scripts/sync-to-legalops.mjs /caminho/legalops`, revisa o diff, executa os testes do destino e publica por GitHub. Um merge aqui não publica automaticamente no site oficial.

## Licença e dados

Código e documentação original deste repositório: [MIT](LICENSE). Marcas e materiais externos continuam com seus titulares. Contribuições enviadas no site são publicadas mediante autorização no formulário e revisão; o banco de contatos privados não faz parte do repositório. Diagnósticos individuais permanecem no navegador até o próprio usuário exportar ou compartilhar.

## Migração de CLM

A [jornada aberta](https://legalops.dev/mapa-contratos/) reúne 12 etapas em quatro fases: entender o jurídico, preparar a decisão, escolher a solução e fazer a mudança funcionar. Cada etapa traz cinco grupos de variáveis, responsáveis, entrega, condição para avançar e adaptação ao contexto. Serve ao primeiro CLM e à substituição do atual.

Fonte em `site/mapa-contratos/mapa.json`; gere o HTML com `node scripts/build-migration-map.mjs`. Conteúdo sob licença MIT. O site consulta a versão aprovada no Club; membros comentam e propõem textos no Tiptap, membros-lead revisam e publicam. A estrutura anterior do ciclo contratual permanece em `ciclo-contratual.json` e no histórico da comunidade.

O roteiro é editorial, sem pontuação universal ou promessa de exaustividade. Referências de escopo: [CLOC Core 12](https://cloc.org/cloc-core-12/) e [ACC Maturity Model](https://www.acc.com/maturity). Acrescente particularidades e registre o que não se aplica.
