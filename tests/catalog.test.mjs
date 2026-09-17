import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {catalog,catalogMeta} from '../site/bench/catalog.mjs';
import {vendors,initialState,selectVendors,normalizeState,calculate,sharedState,decodeState,report} from '../site/bench/model.mjs';
const doc='docusign-clm';
test('catalog retains every discovered listing without manufacturing capability scores',()=>{
 const audit=JSON.parse(readFileSync(new URL('../data/g2-clm-2026-09-17.json',import.meta.url)));
 assert.equal(catalog.length,catalogMeta.toolCount);assert.equal(new Set(catalog.map(v=>v.id)).size,catalog.length);
 assert.equal(audit.listings.length,239);assert.equal(new Set(audit.listings.map(v=>v.url)).size,239);
 const provenance=JSON.parse(readFileSync(new URL('../data/catalog-origin-audit.json',import.meta.url)));
 const urls=new Set(provenance.flatMap(v=>v.listings.map(s=>s.url)));
 assert.deepEqual(catalog.map(v=>v.id),provenance.map(v=>v.id));
 for(const listing of audit.listings)assert.ok(urls.has(listing.url));
 for(const v of vendors){assert.ok(v.description);assert.equal(v.g2Listings,undefined);if(!['ironclad','luminance'].includes(v.id))assert.ok(v.scores.every(n=>n===null));}
});
test('selection reorders and restores evaluations by identity, without leaking scores between tools',()=>{
 let state=initialState();state.scores[0][12]=4;state.gates[0][2]='fail';state.profile.existing_tools='Private CRM';
 state=selectVendors(state,[doc,'ironclad']);assert.equal(state.scores[0][12],null);assert.equal(state.scores[1][12],4);assert.equal(state.gates[1][2],'fail');
 state=selectVendors(state,[doc]);state=selectVendors(state,['ironclad',doc]);assert.equal(state.scores[0][12],4);assert.equal(state.gates[0][2],'fail');assert.equal(state.profile.existing_tools,'Private CRM');
});
test('selection rejects unknown and duplicate IDs, caps four, handles fewer than two',()=>{
 const ids=vendors.slice(0,8).map(v=>v.id);
 const state=selectVendors(initialState(),['unknown',ids[0],...ids]);assert.equal(state.vendorIds.length,4);assert.equal(new Set(state.vendorIds).size,4);
 assert.equal(calculate(selectVendors(state,[])).status,'selection');assert.equal(calculate(selectVendors(state,[doc])).status,'selection');
 const sanitized=normalizeState({vendorIds:['unknown',doc],scores:[[5],[2]]});assert.equal(sanitized.scores[0][0],2);
});
test('shared links retain selection but exclude company context and inactive evaluations',()=>{
 let state=initialState();state.profile.existing_tools='PRIVATE';state=selectVendors(state,[doc,'ironclad']);state.scores[0][0]=3;
 const share=sharedState(state);for(const field of ['profile','savedEvaluations','completed','stage'])assert.ok(!(field in share));
 const restored=decodeState('#cenario='+encodeURIComponent(JSON.stringify(share)));assert.deepEqual(restored.vendorIds,[doc,'ironclad']);assert.equal(restored.scores[0][0],3);assert.equal(restored.profile.existing_tools,'');
 const legacy=decodeState('#cenario='+encodeURIComponent(JSON.stringify({version:'2026-09-17-v2',scores:[[1],[2]]})));assert.deepEqual(legacy.vendorIds,['ironclad','luminance']);assert.equal(legacy.scores[0][0],1);
});
test('new options cannot win from catalog membership and reports follow the chosen tools',()=>{
 const state=selectVendors(initialState(),[doc,'ironclad','luminance']);assert.equal(calculate(state).status,'incomplete');
 const text=report(state);assert.ok(text.includes('Docusign CLM (0–5)'));assert.ok(!text.includes('g2.com'));assert.ok(!text.includes('G2'));
});
