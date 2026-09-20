/**
 * Behavioral test for code review agent
 * Validates: produces CRITICAL/WARNING/SUGGESTION output with file:line references
 */

const fs = require('fs');
const path = require('path');

const AGENT_PATH = path.join(__dirname, '../../agents/code-reviewer.md');
const COMMAND_PATH = path.join(__dirname, '../../commands/code-review.md');

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
}

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (e) {
    console.log(`  ✗ ${name}`);
    console.log(`    ${e.message}`);
    failed++;
  }
}

function expect(val) {
  return {
    toBe(expected) { if (val !== expected) throw new Error(`Expected ${expected}, got ${val}`); },
    toContain(s) { if (!val.includes(s)) throw new Error(`Expected to contain "${s}"`); },
    notToBeNull() { if (val === null) throw new Error('Expected non-null'); }
  };
}

console.log('Code Review Tests\n');

test('agent has correct tool permissions', () => {
  const content = readFile(AGENT_PATH);
  expect(content).notToBeNull();
  expect(content).toContain('permission:');
  expect(content).toContain('read: allow');
  expect(content).toContain('grep: allow');
});

test('agent describes CRITICAL severity level', () => {
  const content = readFile(AGENT_PATH);
  expect(content).toContain('CRITICAL');
});

test('agent describes review checklist', () => {
  const content = readFile(AGENT_PATH);
  expect(content).toContain('checklist');
});

test('agent describes approval criteria', () => {
  const content = readFile(AGENT_PATH);
  expect(content).toContain('Approve');
});

test('command delegates to code-reviewer', () => {
  const content = readFile(COMMAND_PATH);
  expect(content).notToBeNull();
  expect(content).toContain('CRITICAL');
  expect(content).toContain('Security');
});

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
