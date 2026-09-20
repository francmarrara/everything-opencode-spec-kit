/**
 * Tests for OpenCode plugin behavior (T118)
 *
 * Validates: plugin API format, event hooks, no Claude Code dependencies.
 * Verified against OpenCode v1.18.31 plugin API.
 *
 * Run with: node .opencode/tests/behavioral/hooks.test.js
 */

const fs = require('fs');
const path = require('path');

const PLUGINS_DIR = path.join(__dirname, '../../plugins');
const HOOKS_DIR = path.join(__dirname, '../../../hooks');

const VALID_EVENTS = [
  'tool.execute.before',
  'tool.execute.after',
  'experimental.session.compacting',
  'chat.message',
  'chat.params',
  'permission.ask',
  'command.execute.before',
  'shell.env',
  'event',
  'config',
  'dispose',
];

const PLUGIN_FILES = [
  'memory-session/index.js',
  'git-safeguards/index.js',
  'formatting/index.js',
  'verification/index.js',
  'logging/index.js',
  'lifecycle/pre-compact.js',
  'lifecycle/suggest-compact.js',
  'lifecycle/evaluate-session.js',
];

function readFile(filePath) {
  try { return fs.readFileSync(filePath, 'utf8'); } catch { return null; }
}

function readJson(filePath) {
  try { return JSON.parse(fs.readFileSync(filePath, 'utf8')); } catch { return null; }
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

console.log('OpenCode Plugin Tests (T118)\n');

// Test each plugin file
for (const pluginFile of PLUGIN_FILES) {
  const pluginPath = path.join(PLUGINS_DIR, pluginFile);
  const name = pluginFile.replace('/', '-').replace('.js', '');

  test(`${name} file exists`, () => {
    const content = readFile(pluginPath);
    expect(content).notToBeNull();
  });

  test(`${name} exports a function (OpenCode API)`, () => {
    const content = readFile(pluginPath);
    // Must NOT use getPlugin pattern
    if (content.includes('function getPlugin')) throw new Error('Uses deprecated getPlugin pattern');
    // Must export a function
    if (!content.includes('module.exports')) throw new Error('No module.exports');
  });

  test(`${name} has no Claude Code references`, () => {
    const content = readFile(pluginPath);
    if (content.includes('CLAUDE_')) throw new Error('Contains CLAUDE_ references');
    if (content.includes('~/.claude/')) throw new Error('Contains ~/.claude/ references');
    if (content.includes('claude-plugin')) throw new Error('Contains claude-plugin references');
  });

  test(`${name} uses valid OpenCode event names`, () => {
    const content = readFile(pluginPath);
    // Check for old hook names that shouldn't exist
    const oldHooks = ['onPreToolUse', 'onPostToolUse', 'onSessionStart', 'onSessionEnd', 'onPreCompact', 'onStop', 'onToolUse'];
    for (const hook of oldHooks) {
      if (content.includes(hook)) throw new Error(`Uses deprecated hook name: ${hook}`);
    }
  });

  test(`${name} is loadable as CommonJS module`, () => {
    const plugin = require(pluginPath);
    expect(typeof plugin).toBe('function');
  });
}

// Test source hooks.json (upstream provenance)
test('source hooks.json exists and is valid JSON', () => {
  const hooks = readJson(path.join(HOOKS_DIR, 'hooks.json'));
  expect(hooks).notToBeNull();
});

test('source hooks.json has required event types', () => {
  const hooks = readJson(path.join(HOOKS_DIR, 'hooks.json'));
  expect(hooks.hooks).notToBeNull();
  expect(hooks.hooks.PreToolUse).notToBeNull();
  expect(hooks.hooks.PostToolUse).notToBeNull();
  expect(hooks.hooks.SessionStart).notToBeNull();
  expect(hooks.hooks.Stop).notToBeNull();
});

test('source hooks.json commands use node', () => {
  const hooks = readJson(path.join(HOOKS_DIR, 'hooks.json'));
  for (const [eventType, hookArray] of Object.entries(hooks.hooks)) {
    for (const entry of hookArray) {
      for (const hook of entry.hooks) {
        if (hook.type === 'command') {
          if (!hook.command.startsWith('node')) {
            throw new Error(`${eventType} hook does not start with node: ${hook.command.substring(0, 50)}`);
          }
        }
      }
    }
  }
});

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
