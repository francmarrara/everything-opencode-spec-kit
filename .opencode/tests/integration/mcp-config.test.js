/**
 * Integration test for MCP configurations
 * Validates: github server has command, args, env, and description
 */

const fs = require('fs');
const path = require('path');

const MCP_DIR = path.join(__dirname, '../../mcp/servers');
const SKILL_PATH = path.join(__dirname, '../../skills/mcp-configs/SKILL.md');

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

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

console.log('MCP Config Tests\n');

test('github server has command', () => {
  const config = readJson(path.join(MCP_DIR, 'github.json'));
  expect(config).notToBeNull();
  expect(config.command).toBe('npx');
});

test('github server has args', () => {
  const config = readJson(path.join(MCP_DIR, 'github.json'));
  expect(config.args).toContain('@modelcontextprotocol/server-github');
});

test('github server has env', () => {
  const config = readJson(path.join(MCP_DIR, 'github.json'));
  expect(config).notToBeNull();
  expect(config.env).notToBeNull();
  expect(config.env.GITHUB_PERSONAL_ACCESS_TOKEN).toBe('${GITHUB_PERSONAL_ACCESS_TOKEN}');
});

test('github server has description', () => {
  const config = readJson(path.join(MCP_DIR, 'github.json'));
  expect(config.description).toContain('GitHub');
});

test('vercel server uses HTTP type', () => {
  const config = readJson(path.join(MCP_DIR, 'vercel.json'));
  expect(config).notToBeNull();
  expect(config.type).toBe('http');
  expect(config.url).toContain('mcp.vercel.com');
});

test('all 15 server configs exist', () => {
  const expected = [
    'github', 'firecrawl', 'supabase', 'memory', 'sequential-thinking',
    'vercel', 'railway', 'cloudflare-docs', 'cloudflare-workers-builds',
    'cloudflare-workers-bindings', 'cloudflare-observability', 'clickhouse',
    'context7', 'magic', 'filesystem'
  ];
  const actual = fs.readdirSync(MCP_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace('.json', ''));
  expect(actual.length).toBe(15);
  expected.forEach(name => {
    expect(actual).toContain(name);
  });
});

test('mcp-configs skill exists', () => {
  const content = readFile(SKILL_PATH);
  expect(content).notToBeNull();
  expect(content).toContain('MCP Configs Skill');
  expect(content).toContain('servers/');
});

test('no MCP servers have hardcoded placeholder credentials', () => {
  const servers = fs.readdirSync(MCP_DIR).filter(f => f.endsWith('.json'));
  servers.forEach(server => {
    const config = readJson(path.join(MCP_DIR, server));
    const content = JSON.stringify(config);
    if (content.includes('YOUR_') && content.includes('_HERE')) {
      throw new Error(`${server} contains placeholder credential`);
    }
  });
});

test('all MCP servers default to enabled: false', () => {
  const servers = fs.readdirSync(MCP_DIR).filter(f => f.endsWith('.json'));
  servers.forEach(server => {
    const config = readJson(path.join(MCP_DIR, server));
    if (config.enabled !== false) {
      throw new Error(`${server} does not have enabled: false`);
    }
  });
});

test('all MCP servers have description field', () => {
  const servers = fs.readdirSync(MCP_DIR).filter(f => f.endsWith('.json'));
  servers.forEach(server => {
    const config = readJson(path.join(MCP_DIR, server));
    if (!config.description || config.description.length < 5) {
      throw new Error(`${server} missing or too short description`);
    }
  });
});

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
