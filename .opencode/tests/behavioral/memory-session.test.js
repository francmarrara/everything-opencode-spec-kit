/**
 * Behavioral test for memory-session plugin
 * Validates: OpenCode API format, plugin invocability, event hooks, Constitution precedence
 * Verified against OpenCode v1.18.31 plugin API.
 */

const fs = require('fs');
const path = require('path');

const PLUGIN_PATH = path.join(__dirname, '../../plugins/memory-session/index.js');
const CONSTITUTION_PATH = path.join(__dirname, '../../../.specify/memory/constitution.md');

function readFile(filePath) {
  try { return fs.readFileSync(filePath, 'utf8'); } catch { return null; }
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
    toBeFunction() { if (typeof val !== 'function') throw new Error(`Expected function, got ${typeof val}`); },
  };
}

console.log('Memory/Session Plugin Tests\n');

test('plugin file exists', () => {
  const content = readFile(PLUGIN_PATH);
  expect(content).notToBeNull();
});

test('plugin exports a function (OpenCode API)', () => {
  const Plugin = require(PLUGIN_PATH);
  expect(typeof Plugin).toBe('function');
});

test('plugin is invocable with PluginInput', async () => {
  const Plugin = require(PLUGIN_PATH);
  const mockClient = { app: { log: async () => {} } };
  const hooks = await Plugin({ project: {}, client: mockClient, directory: '/tmp', worktree: '/tmp' });
  expect(hooks).notToBeNull();
  expect(typeof hooks).toBe('object');
});

test('plugin returns event handler', async () => {
  const Plugin = require(PLUGIN_PATH);
  const mockClient = { app: { log: async () => {} } };
  const hooks = await Plugin({ project: {}, client: mockClient, directory: '/tmp', worktree: '/tmp' });
  expect(typeof hooks.event).toBe('function');
});

test('plugin handles session.created event', async () => {
  const Plugin = require(PLUGIN_PATH);
  const mockClient = { app: { log: async () => {} } };
  const hooks = await Plugin({ project: {}, client: mockClient, directory: '/tmp', worktree: '/tmp' });
  // Should not throw
  await hooks.event({ event: { type: 'session.created' } });
});

test('plugin handles session.idle event', async () => {
  const Plugin = require(PLUGIN_PATH);
  const mockClient = { app: { log: async () => {} } };
  const hooks = await Plugin({ project: {}, client: mockClient, directory: '/tmp', worktree: '/tmp' });
  // Should not throw
  await hooks.event({ event: { type: 'session.idle' } });
});

test('plugin does NOT use Claude Code paths', () => {
  const content = readFile(PLUGIN_PATH);
  if (content.includes('CLAUDE_')) throw new Error('Contains CLAUDE_ references');
  if (content.includes('~/.claude/')) throw new Error('Contains ~/.claude/ references');
});

test('Constitution exists and is authoritative', () => {
  const content = readFile(CONSTITUTION_PATH);
  expect(content).notToBeNull();
  expect(content).toContain('Constitution');
  expect(content).toContain('MUST NOT override');
});

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
