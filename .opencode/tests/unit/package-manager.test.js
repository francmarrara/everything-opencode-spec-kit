/**
 * Tests for OpenCode lib/package-manager.js (T120)
 *
 * Adapted from source package-manager.test.js for OpenCode-native utilities.
 * Validates: package manager detection, configuration, no Claude Code dependencies.
 *
 * Run with: node .opencode/tests/unit/package-manager.test.js
 */

const assert = require('assert');
const path = require('path');
const fs = require('fs');
const os = require('os');

const pm = require('../../lib/package-manager');
const utils = require('../../lib/utils');

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    return true;
  } catch (err) {
    console.log(`  ✗ ${name}`);
    console.log(`    Error: ${err.message}`);
    return false;
  }
}

function createTestDir() {
  const testDir = path.join(os.tmpdir(), `pm-test-${Date.now()}`);
  fs.mkdirSync(testDir, { recursive: true });
  return testDir;
}

function cleanupTestDir(testDir) {
  fs.rmSync(testDir, { recursive: true, force: true });
}

function runTests() {
  console.log('\n=== Testing OpenCode package-manager.js ===\n');

  let passed = 0;
  let failed = 0;

  console.log('PACKAGE_MANAGERS Constant:');

  if (test('PACKAGE_MANAGERS is defined', () => {
    assert.ok(pm.PACKAGE_MANAGERS, 'PACKAGE_MANAGERS should be defined');
    assert.strictEqual(typeof pm.PACKAGE_MANAGERS, 'object');
  })) passed++; else failed++;

  if (test('has npm, pnpm, yarn, bun', () => {
    assert.ok(pm.PACKAGE_MANAGERS.npm, 'Should have npm');
    assert.ok(pm.PACKAGE_MANAGERS.pnpm, 'Should have pnpm');
    assert.ok(pm.PACKAGE_MANAGERS.yarn, 'Should have yarn');
    assert.ok(pm.PACKAGE_MANAGERS.bun, 'Should have bun');
  })) passed++; else failed++;

  if (test('each package manager has required fields', () => {
    for (const [name, config] of Object.entries(pm.PACKAGE_MANAGERS)) {
      assert.ok(config.lockFile, `${name} should have lockFile`);
      assert.ok(config.installCmd, `${name} should have installCmd`);
      assert.ok(config.runCmd, `${name} should have runCmd`);
      assert.ok(config.execCmd, `${name} should have execCmd`);
    }
  })) passed++; else failed++;

  console.log('\ngetPackageManager:');

  if (test('getPackageManager returns valid result', () => {
    const result = pm.getPackageManager();
    assert.ok(result.name, 'Should have name');
    assert.ok(result.source, 'Should have source');
    assert.ok(result.config, 'Should have config');
  })) passed++; else failed++;

  if (test('getPackageManager source is valid', () => {
    const result = pm.getPackageManager();
    const validSources = ['env', 'lockfile', 'package.json', 'fallback', 'default'];
    assert.ok(validSources.includes(result.source), `Invalid source: ${result.source}`);
  })) passed++; else failed++;

  console.log('\nDetection Functions:');

  if (test('detectFromLockFile works', () => {
    const result = pm.detectFromLockFile();
    // Result can be null or a string
    if (result !== null) {
      assert.strictEqual(typeof result, 'string');
    }
  })) passed++; else failed++;

  if (test('detectFromPackageJson works', () => {
    const result = pm.detectFromPackageJson();
    if (result !== null) {
      assert.strictEqual(typeof result, 'string');
    }
  })) passed++; else failed++;

  console.log('\ngetAvailablePackageManagers:');

  if (test('returns array of strings', () => {
    const available = pm.getAvailablePackageManagers();
    assert.ok(Array.isArray(available));
    available.forEach(item => {
      assert.strictEqual(typeof item, 'string');
    });
  })) passed++; else failed++;

  console.log('\nClaude Code Reference Check:');

  if (test('no CLAUDE_ references in package-manager.js source', () => {
    const pmPath = path.join(__dirname, '../../lib/package-manager.js');
    const content = fs.readFileSync(pmPath, 'utf8');
    const lines = content.split('\n').filter(l => !l.trim().startsWith('//') && !l.trim().startsWith('*'));
    const codeContent = lines.join('\n');
    assert.ok(!codeContent.includes('CLAUDE_'), 'package-manager.js should not contain CLAUDE_ references');
  })) passed++; else failed++;

  if (test('no ~/.claude/ references in package-manager.js source', () => {
    const pmPath = path.join(__dirname, '../../lib/package-manager.js');
    const content = fs.readFileSync(pmPath, 'utf8');
    assert.ok(!content.includes('~/.claude/'), 'package-manager.js should not contain ~/.claude/ references');
  })) passed++; else failed++;

  console.log('\n=== Test Results ===');
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total:  ${passed + failed}\n`);

  process.exit(failed > 0 ? 1 : 0);
}

runTests();
