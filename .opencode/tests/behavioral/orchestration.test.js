/**
 * Behavioral test for agent orchestration
 * Validates: HANDOFF protocol, no model overrides
 */

const fs = require('fs');
const path = require('path');

const ORCHESTRATE_PATH = path.join(__dirname, '../../commands/orchestrate.md');
const AGENTS_DIR = path.join(__dirname, '../../agents');

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

console.log('Agent Orchestration Tests\n');

test('orchestrate command uses HANDOFF protocol', () => {
  const content = readFile(ORCHESTRATE_PATH);
  expect(content).notToBeNull();
  expect(content).toContain('HANDOFF:');
});

test('orchestrate defines feature workflow', () => {
  const content = readFile(ORCHESTRATE_PATH);
  expect(content).toContain('tdd-guide');
  expect(content).toContain('code-reviewer');
  expect(content).toContain('security-reviewer');
});

test('orchestrate defines bugfix workflow', () => {
  const content = readFile(ORCHESTRATE_PATH);
  expect(content).toContain('bugfix');
});

test('orchestrate defines refactor workflow', () => {
  const content = readFile(ORCHESTRATE_PATH);
  expect(content).toContain('refactor');
});

test('no agent has model override', () => {
  const agents = fs.readdirSync(AGENTS_DIR).filter(f => f.endsWith('.md'));
  agents.forEach(agent => {
    const content = readFile(path.join(AGENTS_DIR, agent));
    const hasModel = /^model:\s*\w+/m.test(content);
    if (hasModel) {
      throw new Error(`${agent} has model override`);
    }
  });
});

test('all agents have permission field (OpenCode format)', () => {
  const agents = fs.readdirSync(AGENTS_DIR).filter(f => f.endsWith('.md') && f !== 'README.md');
  agents.forEach(agent => {
    const content = readFile(path.join(AGENTS_DIR, agent));
    if (!content.includes('permission:')) {
      throw new Error(`${agent} missing permission field`);
    }
  });
});

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
