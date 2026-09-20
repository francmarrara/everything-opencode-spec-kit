/**
 * Behavioral test for verification workflow (T101)
 * Validates: verify command implements step sequence, e2e and continuous-learning exist
 */

const fs = require('fs');
const path = require('path');

const VERIFY_PATH = path.join(__dirname, '../../commands/verify.md');
const E2E_PATH = path.join(__dirname, '../../commands/e2e.md');
const CL_PATH = path.join(__dirname, '../../skills/continuous-learning/SKILL.md');

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

console.log('Verification Workflow Tests\n');

test('verify command has build check step', () => {
  const content = readFile(VERIFY_PATH);
  expect(content).notToBeNull();
  expect(content).toContain('Build Check');
});

test('verify command has type check step', () => {
  const content = readFile(VERIFY_PATH);
  expect(content).toContain('Type Check');
});

test('verify command has lint check step', () => {
  const content = readFile(VERIFY_PATH);
  expect(content).toContain('Lint Check');
});

test('verify command has test suite step', () => {
  const content = readFile(VERIFY_PATH);
  expect(content).toContain('Test Suite');
});

test('verify command has console.log audit step', () => {
  const content = readFile(VERIFY_PATH);
  expect(content).toContain('console.log');
});

test('verify command has git status step', () => {
  const content = readFile(VERIFY_PATH);
  expect(content).toContain('Git Status');
});

test('verify command produces output report', () => {
  const content = readFile(VERIFY_PATH);
  expect(content).toContain('VERIFICATION:');
});

test('e2e command exists and describes test generation', () => {
  const content = readFile(E2E_PATH);
  expect(content).notToBeNull();
  expect(content).toContain('end-to-end');
  expect(content).toContain('Playwright');
});

test('continuous-learning skill exists', () => {
  const content = readFile(CL_PATH);
  expect(content).notToBeNull();
  expect(content).toContain('continuous-learning');
  expect(content).toContain('reusable patterns');
});

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
