import { test } from 'node:test';
import assert from 'node:assert/strict';
import { criteria, stages, presets, initialState, calculate, normalizeState, decodeState, report } from '../site/bench/model.mjs';

test('the framework has stable unique IDs, questions and pilot tests', () => {
  assert.equal(criteria.length, 32); assert.equal(new Set(criteria.map(c => c.id)).size, criteria.length);
  assert.equal(stages.length, 6);
  for (const c of criteria) for (const key of ['id','group','name','question','test']) assert.ok(c[key]);
});
test('all requirements start prioritized and unknown capabilities do not produce a winner', () => {
  const result = calculate(initialState());
  assert.equal(result.total, 96); assert.equal(result.status, 'incomplete');
  assert.equal(result.results[0].score, null); assert.equal(result.results[0].coverage, 0.125);
  assert.equal(result.results[0].lower, 11.25); assert.equal(result.results[0].upper, 98.75);
});
test('priorities change the provisional ranking when all selected criteria have scores', () => {
  const state = initialState(); state.weights = presets.revenue.weights;
  assert.equal(calculate(state).eligible[0].id, 'ironclad');
  state.weights = presets.intelligence.weights;
  assert.equal(calculate(state).eligible[0].id, 'luminance');
});
test('unknown is different from zero and excluded criteria do not affect the score', () => {
  const state = initialState(); state.weights = presets.balanced.weights; state.scores[0][0] = null;
  assert.equal(calculate(state).status, 'incomplete');
  state.scores[0][0] = 0; assert.equal(calculate(state).results[0].score, 65);
  state.weights = criteria.map(() => 0); assert.equal(calculate(state).status, 'empty');
});
test('vetoes exclude candidates while preserving comparison', () => {
  const state = initialState(); state.weights = presets.balanced.weights; state.gates[0][0] = 'fail';
  const result = calculate(state); assert.equal(result.eligible[0].id, 'luminance'); assert.equal(result.results[0].score, 90);
  state.gates[1][0] = 'fail'; assert.equal(calculate(state).status, 'blocked');
});
test('legacy shared comparisons keep their original four priorities', () => {
  const state = decodeState('#cenario=' + encodeURIComponent(JSON.stringify({version:'2026-09-17',weights:[3,3,3,3]})));
  assert.equal(calculate(state).results[0].score, 90); assert.ok(state.weights.slice(4).every(n => n === 0));
  assert.equal(decodeState('#cenario=%bad'), null);
});
test('state validation bounds context and strips unknown checklist IDs', () => {
  const state = normalizeState({profile:{legal_users:-1,existing_tools:'x'.repeat(900)},completed:['pilot-0','pilot-0','unknown']});
  assert.equal(state.profile.legal_users, ''); assert.equal(state.profile.existing_tools.length, 700); assert.deepEqual(state.completed, ['pilot-0']);
});
test('the exported report carries context, missing data, vetoes and provenance', () => {
  const state = initialState(); state.profile.existing_tools = 'Example CRM'; state.gates[0][0] = 'fail';
  const text = report(state);
  for (const value of ['Example CRM','A validar','hipóteses editoriais','Não atende','https://github.com/agenciaspace/clm-bench']) assert.ok(text.includes(value));
});
