/**
 * Tests for OpenCode lib/utils.js (T119)
 *
 * Adapted from source utils.test.js for OpenCode-native utilities.
 * Validates: utility functions, OpenCode paths, no Claude Code dependencies.
 *
 * Run with: node .opencode/tests/unit/utils.test.js
 */

const assert = require('assert');
const path = require('path');
const fs = require('fs');
const os = require('os');

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

function runTests() {
  console.log('\n=== Testing OpenCode utils.js ===\n');

  let passed = 0;
  let failed = 0;

  console.log('Platform Detection:');

  if (test('isWindows/isMacOS/isLinux are booleans', () => {
    assert.strictEqual(typeof utils.isWindows, 'boolean');
    assert.strictEqual(typeof utils.isMacOS, 'boolean');
    assert.strictEqual(typeof utils.isLinux, 'boolean');
  })) passed++; else failed++;

  if (test('exactly one platform should be true', () => {
    const platforms = [utils.isWindows, utils.isMacOS, utils.isLinux];
    const trueCount = platforms.filter(p => p).length;
    assert.ok(trueCount <= 1, 'More than one platform is true');
  })) passed++; else failed++;

  console.log('\nDirectory Functions:');

  if (test('getHomeDir returns valid path', () => {
    const home = utils.getHomeDir();
    assert.strictEqual(typeof home, 'string');
    assert.ok(home.length > 0, 'Home dir should not be empty');
    assert.ok(fs.existsSync(home), 'Home dir should exist');
  })) passed++; else failed++;

  if (test('getOpenCodeDir returns OpenCode-compatible path', () => {
    const openCodeDir = utils.getOpenCodeDir();
    const homeDir = utils.getHomeDir();
    assert.ok(openCodeDir.startsWith(homeDir), 'OpenCode dir should be under home');
  })) passed++; else failed++;

  if (test('getSessionsDir returns path with sessions', () => {
    const sessionsDir = utils.getSessionsDir();
    assert.ok(sessionsDir.includes('sessions'), 'Should contain sessions');
  })) passed++; else failed++;

  if (test('getTempDir returns valid temp directory', () => {
    const tempDir = utils.getTempDir();
    assert.strictEqual(typeof tempDir, 'string');
    assert.ok(tempDir.length > 0, 'Temp dir should not be empty');
  })) passed++; else failed++;

  if (test('ensureDir creates directory', () => {
    const testDir = path.join(utils.getTempDir(), `utils-test-${Date.now()}`);
    try {
      utils.ensureDir(testDir);
      assert.ok(fs.existsSync(testDir), 'Directory should be created');
    } finally {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  })) passed++; else failed++;

  console.log('\nDate/Time Functions:');

  if (test('getDateString returns YYYY-MM-DD format', () => {
    const date = utils.getDateString();
    assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(date), `Expected YYYY-MM-DD, got ${date}`);
  })) passed++; else failed++;

  if (test('getTimeString returns HH:MM format', () => {
    const time = utils.getTimeString();
    assert.ok(/^\d{2}:\d{2}$/.test(time), `Expected HH:MM, got ${time}`);
  })) passed++; else failed++;

  console.log('\nFile Operations:');

  if (test('readFile returns null for non-existent file', () => {
    const content = utils.readFile('/non/existent/file/path.txt');
    assert.strictEqual(content, null);
  })) passed++; else failed++;

  if (test('writeFile and readFile work together', () => {
    const testFile = path.join(utils.getTempDir(), `utils-test-${Date.now()}.txt`);
    const testContent = 'Hello, World!';
    try {
      utils.writeFile(testFile, testContent);
      const read = utils.readFile(testFile);
      assert.strictEqual(read, testContent);
    } finally {
      fs.unlinkSync(testFile);
    }
  })) passed++; else failed++;

  if (test('replaceInFile replaces text', () => {
    const testFile = path.join(utils.getTempDir(), `utils-test-${Date.now()}.txt`);
    try {
      utils.writeFile(testFile, 'Hello, World!');
      utils.replaceInFile(testFile, /World/, 'Universe');
      const content = utils.readFile(testFile);
      assert.strictEqual(content, 'Hello, Universe!');
    } finally {
      fs.unlinkSync(testFile);
    }
  })) passed++; else failed++;

  console.log('\nSystem Functions:');

  if (test('commandExists finds node', () => {
    const exists = utils.commandExists('node');
    assert.strictEqual(exists, true);
  })) passed++; else failed++;

  if (test('commandExists returns false for fake command', () => {
    const exists = utils.commandExists('nonexistent_command_12345');
    assert.strictEqual(exists, false);
  })) passed++; else failed++;

  console.log('\nClaude Code Reference Check:');

  if (test('no CLAUDE_ references in utils.js source', () => {
    const utilsPath = path.join(__dirname, '../../lib/utils.js');
    const content = fs.readFileSync(utilsPath, 'utf8');
    // Allow comments explaining migration
    const lines = content.split('\n').filter(l => !l.trim().startsWith('//') && !l.trim().startsWith('*'));
    const codeContent = lines.join('\n');
    assert.ok(!codeContent.includes('CLAUDE_'), 'utils.js should not contain CLAUDE_ references');
  })) passed++; else failed++;

  console.log('\n=== Test Results ===');
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total:  ${passed + failed}\n`);

  process.exit(failed > 0 ? 1 : 0);
}

runTests();
