import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const target = process.argv[2] && resolve(process.argv[2]);
if (!target || !existsSync(resolve(target, 'cloudflare-landing/site.css'))) throw new Error('Usage: node scripts/sync-to-legalops.mjs /path/to/legalops');
const revision = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding:'utf8' }).trim();
if (execFileSync('git', ['status','--porcelain'], {cwd:root,encoding:'utf8'}).trim()) throw new Error('Commit changes in clm-bench before synchronizing a pinned revision.');
cpSync(resolve(root,'site/bench'), resolve(target,'cloudflare-landing/bench'), {recursive:true});
cpSync(resolve(root,'site/mapa-contratos'), resolve(target,'cloudflare-landing/mapa-contratos'), {recursive:true});
// Backend glue is intentionally installed/reviewed separately; do not overwrite auth or middleware.
mkdirSync(resolve(target,'docs'), {recursive:true});
writeFileSync(resolve(target,'docs/clm-bench-upstream.json'), JSON.stringify({repository:'https://github.com/agenciaspace/clm-bench',revision,paths:['cloudflare-landing/bench','cloudflare-landing/mapa-contratos']},null,2)+'\n');
console.log(`Copied static Bench revision ${revision}. Review the diff, run LegalOps tests/build and commit to deploy.`);
