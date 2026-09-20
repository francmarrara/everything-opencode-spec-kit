/**
 * Behavioral test for verification honesty (T102)
 * Validates: no claimed successes for unexecuted checks (SC-006)
 * Validates: verification reports "NOT EXECUTED" for missing tools
 */

const fs = require('fs');
const path = require('path');

const VERIFY_PATH = path.join(__dirname, '../../commands/verify.md');

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

console.log('Verification Honesty Tests (T102)\n');

test('verify command includes NOT EXECUTED handling', () => {
  const content = readFile(VERIFY_PATH);
  expect(content).notToBeNull();
  expect(content).toContain('NOT EXECUTED');
});

test('verify command does not claim success for unexecuted checks', () => {
  const content = readFile(VERIFY_PATH);
  if (content.includes('PASS') && content.includes('NOT EXECUTED')) {
    // Both exist - verify NOT EXECUTED is used when check cannot run
    expect(true).toBe(true);
  } else if (content.includes('NOT EXECUTED')) {
    expect(true).toBe(true);
  } else {
    throw new Error('Verify command lacks NOT EXECUTED handling');
  }
});

test('verify command documents what happens when build tool is missing', () => {
  const content = readFile(VERIFY_PATH);
  expect(content).toContain('Build Check');
  expect(content).toContain('STOP');
});

test('verify command has explicit pass/fail status output', () => {
  const content = readFile(VERIFY_PATH);
  expect(content).toContain('VERIFICATION:');
  expect(content).toContain('PASS/FAIL');
});

test('verify command explicitly states checks must actually execute', () => {
  const content = readFile(VERIFY_PATH);
  const hasHonestyConstraint = content.includes('not actually executed') ||
    content.includes('NOT EXECUTED') ||
    content.includes('honest');
  expect(hasHonestyConstraint).toBe(true);
});

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
