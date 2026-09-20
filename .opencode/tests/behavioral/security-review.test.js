/**
 * Behavioral test for security review agent
 * Validates: detects hardcoded credential pattern
 */

const fs = require('fs');
const path = require('path');

const AGENT_PATH = path.join(__dirname, '../../agents/security-reviewer.md');
const SKILL_PATH = path.join(__dirname, '../../skills/security-review/SKILL.md');

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

console.log('Security Review Tests\n');

test('agent has correct tool permissions', () => {
  const content = readFile(AGENT_PATH);
  expect(content).notToBeNull();
  expect(content).toContain('permission:');
  expect(content).toContain('read: allow');
  expect(content).toContain('bash: allow');
});

test('agent detects hardcoded secrets', () => {
  const content = readFile(AGENT_PATH);
  expect(content).toContain('Hardcoded');
  expect(content).toContain('secret');
});

test('agent detects SQL injection', () => {
  const content = readFile(AGENT_PATH);
  expect(content).toContain('SQL injection');
});

test('agent detects XSS', () => {
  const content = readFile(AGENT_PATH);
  expect(content).toContain('XSS');
});

test('agent describes OWASP Top 10', () => {
  const content = readFile(AGENT_PATH);
  expect(content).toContain('OWASP');
});

test('skill provides security checklist', () => {
  const content = readFile(SKILL_PATH);
  expect(content).notToBeNull();
  expect(content).toContain('Secrets Management');
  expect(content).toContain('Input Validation');
  expect(content).toContain('SQL Injection');
});

test('skill describes hardcoded credential detection', () => {
  const content = readFile(SKILL_PATH);
  expect(content).toContain('NEVER Do This');
  expect(content).toContain('sk-proj');
});

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
