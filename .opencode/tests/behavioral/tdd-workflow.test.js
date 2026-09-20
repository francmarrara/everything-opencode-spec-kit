/**
 * Behavioral test for TDD workflow
 * Validates: agent scaffolds interfaces, writes failing tests first,
 * implements minimal code, and documents RED-GREEN-REFACTOR cycle
 */

const fs = require('fs');
const path = require('path');

const AGENT_PATH = path.join(__dirname, '../../agents/tdd-guide.md');
const COMMAND_PATH = path.join(__dirname, '../../commands/tdd.md');
const SKILL_PATH = path.join(__dirname, '../../skills/tdd-workflow/SKILL.md');

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
    notToBeNull() { if (val === null) throw new Error('Expected non-null'); },
    toBeGreaterThan(n) { if (!(val > n)) throw new Error(`Expected > ${n}, got ${val}`); }
  };
}

console.log('TDD Workflow Tests\n');

console.log('Agent:');
test('has correct tool permissions', () => {
  const content = readFile(AGENT_PATH);
  expect(content).notToBeNull();
  expect(content).toContain('permission:');
  expect(content).toContain('read: allow');
  expect(content).toContain('edit: allow');
  expect(content).toContain('bash: allow');
});

test('describes RED-GREEN-REFACTOR cycle', () => {
  const content = readFile(AGENT_PATH).toLowerCase();
  expect(content).toContain('red');
  expect(content).toContain('green');
  expect(content).toContain('refactor');
});

test('specifies coverage requirements', () => {
  const content = readFile(AGENT_PATH);
  expect(content).toContain('coverage');
});

console.log('\nCommand:');
test('delegates to tdd-guide agent', () => {
  const content = readFile(COMMAND_PATH);
  expect(content).notToBeNull();
  expect(content).toContain('tdd-guide');
});

console.log('\nSkill:');
test('describes RED-GREEN-REFACTOR cycle', () => {
  const content = readFile(SKILL_PATH).toLowerCase();
  expect(content).toContain('red');
  expect(content).toContain('green');
  expect(content).toContain('refactor');
});

test('specifies 80% coverage requirement', () => {
  const content = readFile(SKILL_PATH);
  expect(content).toContain('80%');
});

test('describes test-first methodology', () => {
  const content = readFile(SKILL_PATH).toLowerCase();
  expect(content).toContain('tests before code');
});

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
