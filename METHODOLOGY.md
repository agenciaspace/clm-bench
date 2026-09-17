# Método de decisão

O objetivo é encontrar aderência ao contexto da empresa. A matriz inicial não pretende esgotar todos os departamentos jurídicos: proponha critérios que faltem ao seu cenário.

## Três camadas

**Contexto da empresa:** volume, legado, usuários, tipos de contratos, países/idiomas, inventário de ferramentas, integrações obrigatórias e problema atual. O preenchimento ajuda a escolher pesos; não há inferência automática de prioridades.

**Capacidade da ferramenta:** 32 critérios com perguntas e testes em `site/bench/framework.mjs`. Grupos: operação contratual, integrações, IA e revisão, acervo e dados, segurança e governança, adoção e implantação, viabilidade econômica. O jurídico decide com TI, segurança, compras, finanças e áreas usuárias.

**Condições eliminatórias:** segurança, integrações indispensáveis, implantação/migração e custo total. “Não atende” veta; “a validar” mantém a compra pendente mesmo com uma nota alta.

## Como pontuar

Peso: 0 exclui; 1–5 indicam prioridade relativa. Nota: 0 não atende, 1 muito limitado, 2 limitado, 3 adequado, 4 forte, 5 muito forte. Registre as evidências e limites no relatório do piloto.

`pontos = 100 × soma(peso × nota) / (5 × soma(pesos))`

Uma nota ausente é `null`, nunca zero. Mostramos o intervalo de resultados se todas as notas ausentes fossem 0 ou 5. Cobertura = soma dos pesos com nota / soma de todos os pesos. Enquanto alguma opção sem veto tiver critério priorizado sem avaliação, não indicamos vencedor. Com tudo avaliado, diferença inferior a 5 pontos é considerada próxima; esse limiar é convenção editorial, não inferência estatística.

As quatro notas iniciais traduzem a hipótese que originou o Bench: Ironclad `[5,5,4,4]`; Luminance `[2,2,5,5]` nos eixos workflows, Salesforce, playbooks e repositório. Elas podem ser removidas ou substituídas no piloto. Fontes oficiais descrevem capacidades anunciadas e não provam essas notas nem superioridade. Os 28 critérios restantes começam sem nota.

## Ciclo de vida da decisão

1. **Diagnóstico e requisitos:** explicitar problema, indicador atual, responsáveis, sistemas e restrições. Mapear volume/picos, modalidades de licença, entidades, permissões e fluxos de dados.
2. **Comparação:** priorizar requisitos, registrar evidências por edição e cenário, levantar lacunas e selecionar opções para testar. Não presumir que “tem integração” significa que suporta o fluxo necessário.
3. **Piloto:** aplicar os mesmos contratos fictícios e critérios às opções. Validar exceções, qualidade em português, falsos positivos/negativos, rastreabilidade, assinatura e sincronização completa.
4. **Decisão e implantação:** documentar recomendação, vetos, riscos aceitos e custo total — licenças, IA, conectores, assinatura, migração, implantação, horas internas, suporte e saída. Definir responsáveis e aceite.
5. **Acompanhamento:** comparar indicadores com a linha de base, revisar adoção e custo, registrar problemas e testar exportação/portabilidade antes de renovar. A interface separa diagnóstico e requisitos, totalizando seis etapas.

A checklist registra conclusões declaradas pelo avaliador; marcar uma etapa não é certificação. Não estimamos preço, ROI, precisão ou prazo sem dados. A matriz e as contribuições ajudam a montar uma decisão rastreável; não substituem o piloto ou as aprovações da empresa.

## Catálogo e seleção

Consulta em 17/09/2026 às 16 páginas da [categoria de CLM do G2](https://www.g2.com/categories/contract-lifecycle-management-clm): 239 URLs de produtos, agrupadas por nomes idênticos, geram 233 entradas. Luminance, já presente no Bench, permanece como entrada adicional com seu perfil G2 separado. Todos os links de origem ficam preservados em `data/g2-clm-2026-09-17.json` e `catalog.mjs`. Agrupar nomes não comprova que as edições sejam equivalentes.

Descrições são resumos próprios em português. Escopo é classificação editorial para descoberta; páginas insuficientes ou inconsistentes ficam sinalizadas. Não importamos estrelas, rankings nem depoimentos do G2 para a pontuação. Recursos e integrações precisam de evidência por edição e cenário. Novas opções têm 32 notas ausentes.

Compare de duas a quatro ferramentas por vez. A seleção e as notas são salvas por ID no navegador, inclusive ao remover e adicionar novamente. Links compartilhados incluem apenas a comparação ativa; excluem contexto da empresa, checklist e avaliações de ferramentas removidas. Links anteriores com duas ferramentas continuam válidos.
