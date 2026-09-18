# Adaptador da instalação LegalOps

Estes arquivos mostram o backend em produção da contribuição pública: Next.js 14, Supabase e Cloudflare Worker. São um módulo para integrar a uma aplicação existente, não um segundo aplicativo pronto para executar isoladamente.

## Integração

1. Instale os arquivos `app/` e `lib/` na aplicação Next e aplique a migration com o fluxo do seu projeto Supabase. Não reutilize o projeto ou as credenciais da instalação LegalOps.
2. Implemente os helpers locais referenciados: `createAdminClient` apenas no servidor; `createServerSupabaseClient` com sessão autenticada; `isLegalOpsAdminEmail` usando allowlist configurada no servidor. Nunca derive permissão administrativa de metadata editável pelo usuário.
3. Libere **somente** `/api/bench/contributions` no middleware público. Mantenha `/club/admin/bench` autenticado e autorizado. O backend já revalida o administrador nas ações.
4. Configure `NEXT_PUBLIC_SUPABASE_URL`, chave pública Supabase, `SUPABASE_SERVICE_ROLE_KEY` e `LEGALOPS_ADMIN_EMAILS`. Revise as origens permitidas na API; no site, um `<meta name="bench-api" content="https://seu-host/api/bench/contributions">` troca o destino. O POST depende de um `cf-connecting-ip` confiável fornecido pela borda Cloudflare; em outro proxy, adapte essa identificação sem aceitar IP enviado livremente pelo cliente.
5. Rode os testes de integração e confirme as permissões no banco. Os testes de referência usam Vitest e aliases `@/` da aplicação hospedeira. O `npm test` da raiz deste repositório cobre apenas o modelo estático.

## Contrato e privacidade

`POST /api/bench/contributions`: JSON limitado a 20 KB, validação de campos, consentimento, honeypot, origens explícitas e limite atômico de 3 contribuições por email e 20 por rede por dia UTC. Os identificadores de limite são HMAC; o IP bruto não é armazenado. Email de contato fica em tabela privada. Validação não comprova a identidade do autor nem impede toda forma de spam.

`GET /api/bench/contributions?page=0`: páginas de 20 itens aprovados e públicos, ordenados por data e ID. A projeção remove campos privados. Uma publicação revisada é uma cópia separada da submissão original.

`/club/admin/bench`: fila dos 50 itens pendentes mais antigos e 50 publicações mais recentes. Administrador pode editar a versão pública, aprovar, rejeitar ou retirar; ações geram histórico. O avanço da fila libera os próximos pendentes. Retiradas mais antigas exigem consulta administrativa ao banco nesta primeira versão.

Todas as quatro tabelas têm RLS ativa e acesso revogado para `anon` e `authenticated`. O serviço projeta as leituras públicas e mantém ações administrativas atrás da allowlist. As três funções são SECURITY INVOKER e executáveis somente pelo serviço. O aviso informativo “RLS enabled, no policy” é esperado: não há acesso direto de usuários às tabelas.

A migration preserva original, versão revisada e histórico. A política operacional de retenção dos emails deve ser definida pelo operador; a rotina elimina somente buckets de limite com mais de sete dias. Nenhum email é enviado por este módulo.

## Instalação oficial

A cola de autenticação, middleware e deploy está em [agenciaspace/legalops](https://github.com/agenciaspace/legalops). O envio não exige cadastro no Club; a revisão exige administrador. Não compartilhe chaves de serviço nem use a API oficial para publicar automaticamente conteúdo de forks.

## Collaborative CLM migration documents

`components/contract-map`, `lib/contract-map.ts`, `lib/map-diff.ts`, the map API
routes and map migrations are the MIT reference implementation used by
LegalOps Club. See [collaboration/README.md](collaboration/README.md) for the
self-hosted real-time server, security boundaries, persistence and tests.
Install the versions in `collaboration/dependencies.json`, include
`collaboration/editor.css`, and mount `MapWorkspace` in an authenticated page.
Add `MapNotifications` to the community header for mention notifications.

The adapter expects the host's `community_members`, Supabase session helpers,
`hasActiveClubAccess` and `isDirectoryMember`. Apply migrations in order and
replace the placeholder lead email in the initial migration. Existing sites
must review their authorization model before adapting it. Do not copy the
LegalOps production credentials, create mock members, or expose service keys.
No private contributions or member profiles are included in this source.

Features: inline highlighted comments with a document margin (mobile bottom panel),
contextual quote anchors, replies/resolution, member mentions and
private notifications, tables, checklists, shared drafts with authenticated
presence, block-by-block lead review, approved revisions and version conflicts.
