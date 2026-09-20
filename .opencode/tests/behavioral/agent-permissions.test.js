/**
 * Behavioral test for agent permissions (T098)
 * Validates: read-only agents cannot access write tools
 * Validates: all agents have explicit permission declarations
 * Updated for OpenCode v1.18.31 (permission: format, not tools:)
 */

const fs = require('fs');
const path = require('path');

const AGENTS_DIR = path.join(__dirname, '../../agents');

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
    notToBeNull() { if (val === null) throw new Error('Expected non-null'); }
  };
}

const READ_ONLY_AGENTS = ['architect', 'code-reviewer'];

console.log('Agent Permissions Tests (T098)\n');

test('all agents have permission field (OpenCode format)', () => {
  const agents = fs.readdirSync(AGENTS_DIR).filter(f => f.endsWith('.md') && f !== 'README.md');
  agents.forEach(agent => {
    const content = readFile(path.join(AGENTS_DIR, agent));
    if (!content.includes('permission:')) {
      throw new Error(`${agent} missing permission field`);
    }
  });
});

test('read-only agents have edit: deny', () => {
  READ_ONLY_AGENTS.forEach(agent => {
    const file = path.join(AGENTS_DIR, `${agent}.md`);
    const content = readFile(file);
    if (!content) throw new Error(`${agent}.md not found`);
    if (!content.includes('edit: deny')) {
      throw new Error(`${agent} is read-only but does not have edit: deny`);
    }
  });
});

test('read-only agents have read: allow', () => {
  READ_ONLY_AGENTS.forEach(agent => {
    const file = path.join(AGENTS_DIR, `${agent}.md`);
    const content = readFile(file);
    if (!content.includes('read: allow')) {
      throw new Error(`${agent} is read-only but does not have read: allow`);
    }
  });
});

test('read-only agents have grep: allow', () => {
  READ_ONLY_AGENTS.forEach(agent => {
    const file = path.join(AGENTS_DIR, `${agent}.md`);
    const content = readFile(file);
    if (!content.includes('grep: allow')) {
      throw new Error(`${agent} is read-only but does not have grep: allow`);
    }
  });
});

test('write-capable agents have explicit description justifying write access', () => {
  const agents = fs.readdirSync(AGENTS_DIR).filter(f => f.endsWith('.md') && f !== 'README.md');
  agents.forEach(agent => {
    if (READ_ONLY_AGENTS.includes(agent)) return;
    const content = readFile(path.join(AGENTS_DIR, agent));
    const hasDescription = content.includes('description:');
    if (!hasDescription) {
      throw new Error(`${agent} has write tools but no description field`);
    }
  });
});

test('no agent has unnecessary bash when read+grep suffice', () => {
  const architectFile = path.join(AGENTS_DIR, 'architect.md');
  const content = readFile(architectFile);
  if (content.includes('bash: allow')) {
    throw new Error('architect has bash: allow but should be read-only');
  }
});

test('all agents have mode: subagent', () => {
  const agents = fs.readdirSync(AGENTS_DIR).filter(f => f.endsWith('.md') && f !== 'README.md');
  agents.forEach(agent => {
    const content = readFile(path.join(AGENTS_DIR, agent));
    if (!content.includes('mode: subagent')) {
      throw new Error(`${agent} missing mode: subagent`);
    }
  });
});

test('no agent has deprecated tools: field', () => {
  const agents = fs.readdirSync(AGENTS_DIR).filter(f => f.endsWith('.md') && f !== 'README.md');
  agents.forEach(agent => {
    const content = readFile(path.join(AGENTS_DIR, agent));
    if (/^tools:/m.test(content)) {
      throw new Error(`${agent} still has deprecated tools: field`);
    }
  });
});

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
