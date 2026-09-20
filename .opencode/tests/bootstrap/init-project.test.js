#!/usr/bin/env node
/**
 * Bootstrap Tests - init-project.sh
 *
 * Tests the project bootstrap script for correctness,
 * safety, and generated project quality.
 *
 * Usage: node .opencode/tests/bootstrap/init-project.test.js
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

const FRAMEWORK_DIR = path.resolve(__dirname, '../../..');
const SCRIPT_PATH = path.join(FRAMEWORK_DIR, 'scripts', 'init-project.sh');
const TMP_DIR = path.join(os.tmpdir(), 'opencode-bootstrap-test-' + Date.now());

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  \x1b[32m✓\x1b[0m ${name}`);
    passed++;
  } catch (e) {
    console.log(`  \x1b[31m✗\x1b[0m ${name}`);
    console.log(`    ${e.message}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function assertExists(p) {
  assert(fs.existsSync(p), `Expected to exist: ${p}`);
}

function assertNotExists(p) {
  assert(!fs.existsSync(p), `Expected NOT to exist: ${p}`);
}

function assertFileContains(p, text) {
  const content = fs.readFileSync(p, 'utf8');
  assert(content.includes(text), `Expected ${p} to contain: ${text}`);
}

function assertDirNotEmpty(p) {
  assert(fs.existsSync(p) && fs.statSync(p).isDirectory(), `Directory does not exist: ${p}`);
  const files = fs.readdirSync(p);
  assert(files.length > 0, `Directory is empty: ${p}`);
}

function readFileLines(p) {
  return fs.readFileSync(p, 'utf8').split('\n');
}

function exec(cmd, opts = {}) {
  return execSync(cmd, { encoding: 'utf8', timeout: 30000, ...opts });
}

function makeTestProject(name) {
  const p = path.join(TMP_DIR, name);
  // Use --no-git to avoid interactive prompt
  exec(`bash "${SCRIPT_PATH}" --no-git "${p}"`);
  return p;
}

function cleanup() {
  if (fs.existsSync(TMP_DIR)) {
    fs.rmSync(TMP_DIR, { recursive: true, force: true });
  }
}

// ---------------------------------------------------------------------------
console.log('\n\x1b[1m━━━ Bootstrap Tests (init-project.sh) ━━━\x1b[0m\n');

// Setup
fs.mkdirSync(TMP_DIR, { recursive: true });

// ===========================================================================
// 1. --help
// ===========================================================================
test('--help exits with 0 and shows usage', () => {
  const out = exec(`bash "${SCRIPT_PATH}" --help`);
  assert(out.includes('Usage:'), 'Missing Usage: line');
  assert(out.includes('--force'), 'Missing --force in help');
  assert(out.includes('--help'), 'Missing --help in help');
});

// ===========================================================================
// 2. Missing destination argument
// ===========================================================================
test('Missing argument exits with error', () => {
  try {
    exec(`bash "${SCRIPT_PATH}"`);
    assert(false, 'Should have exited with error');
  } catch (e) {
    assert(e.status !== 0, `Expected non-zero exit, got ${e.status}`);
  }
});

// ===========================================================================
// 3. Valid destination - creates project
// ===========================================================================
let projectA;
test('Valid destination creates project successfully', () => {
  projectA = makeTestProject('project-a');
  assertExists(projectA);
  assertExists(path.join(projectA, '.opencode'));
  assertExists(path.join(projectA, '.specify'));
});

// ===========================================================================
// 4. .opencode/ structure
// ===========================================================================
test('.opencode/agents/ exists with agent files', () => {
  const agentsDir = path.join(projectA, '.opencode', 'agents');
  assertDirNotEmpty(agentsDir);
  const files = fs.readdirSync(agentsDir).filter(f => f.endsWith('.md'));
  assert(files.length >= 8, `Expected at least 8 agents, got ${files.length}`);
});

test('.opencode/commands/ exists with command files', () => {
  const cmdsDir = path.join(projectA, '.opencode', 'commands');
  assertDirNotEmpty(cmdsDir);
  const files = fs.readdirSync(cmdsDir).filter(f => f.endsWith('.md'));
  assert(files.length >= 20, `Expected at least 20 commands, got ${files.length}`);
});

test('.opencode/skills/ exists with skill directories', () => {
  const skillsDir = path.join(projectA, '.opencode', 'skills');
  assertDirNotEmpty(skillsDir);
  const dirs = fs.readdirSync(skillsDir).filter(d =>
    fs.statSync(path.join(skillsDir, d)).isDirectory()
  );
  assert(dirs.length >= 10, `Expected at least 10 skills, got ${dirs.length}`);
});

test('.opencode/plugins/ exists with plugin directories', () => {
  const pluginsDir = path.join(projectA, '.opencode', 'plugins');
  assertDirNotEmpty(pluginsDir);
});

test('.opencode/lib/ exists with utility files', () => {
  const libDir = path.join(projectA, '.opencode', 'lib');
  assertDirNotEmpty(libDir);
  assertExists(path.join(libDir, 'utils.js'));
  assertExists(path.join(libDir, 'constants.js'));
  assertExists(path.join(libDir, 'package-manager.js'));
});

test('.opencode/contracts/ exists', () => {
  const contractsDir = path.join(projectA, '.opencode', 'contracts');
  assertDirNotEmpty(contractsDir);
});

test('.opencode/tests/ exists with test files', () => {
  const testsDir = path.join(projectA, '.opencode', 'tests');
  assertDirNotEmpty(testsDir);
  assertExists(path.join(testsDir, 'run-all.js'));
});

test('.opencode/package.json exists with @opencode-ai/plugin dependency', () => {
  const pkg = path.join(projectA, '.opencode', 'package.json');
  assertExists(pkg);
  const content = JSON.parse(fs.readFileSync(pkg, 'utf8'));
  assert(content.dependencies && content.dependencies['@opencode-ai/plugin'],
    'Missing @opencode-ai/plugin dependency');
});

// ===========================================================================
// 5. .specify/ structure
// ===========================================================================
test('.specify/templates/ has all 5 templates', () => {
  const tmplDir = path.join(projectA, '.specify', 'templates');
  assertDirNotEmpty(tmplDir);
  const expected = [
    'spec-template.md',
    'plan-template.md',
    'tasks-template.md',
    'checklist-template.md',
    'constitution-template.md'
  ];
  for (const f of expected) {
    assertExists(path.join(tmplDir, f));
  }
});

test('.specify/scripts/bash/ has all 6 scripts', () => {
  const scriptsDir = path.join(projectA, '.specify', 'scripts', 'bash');
  assertDirNotEmpty(scriptsDir);
  const expected = [
    'common.sh',
    'check-prerequisites.sh',
    'resolve-template.sh',
    'setup-plan.sh',
    'setup-tasks.sh',
    'create-new-feature.sh'
  ];
  for (const f of expected) {
    assertExists(path.join(scriptsDir, f));
  }
});

test('.specify/workflows/speckit/workflow.yml exists', () => {
  assertExists(path.join(projectA, '.specify', 'workflows', 'speckit', 'workflow.yml'));
});

test('.specify/init-options.json is generated with opencode integration', () => {
  const f = path.join(projectA, '.specify', 'init-options.json');
  assertExists(f);
  const content = JSON.parse(fs.readFileSync(f, 'utf8'));
  assert(content.ai === 'opencode', 'ai should be opencode');
  assert(content.integration === 'opencode', 'integration should be opencode');
});

test('.specify/integration.json is generated', () => {
  const f = path.join(projectA, '.specify', 'integration.json');
  assertExists(f);
  const content = JSON.parse(fs.readFileSync(f, 'utf8'));
  assert(content.integration === 'opencode', 'integration should be opencode');
  assert(Array.isArray(content.installed_integrations), 'installed_integrations should be array');
});

test('.specify/workflows/workflow-registry.json is generated', () => {
  const f = path.join(projectA, '.specify', 'workflows', 'workflow-registry.json');
  assertExists(f);
  const content = JSON.parse(fs.readFileSync(f, 'utf8'));
  assert(content.workflows && content.workflows.speckit, 'Missing speckit workflow');
});

test('.specify/integrations/ has manifest files', () => {
  const intDir = path.join(projectA, '.specify', 'integrations');
  assertDirNotEmpty(intDir);
  assertExists(path.join(intDir, 'opencode.manifest.json'));
  assertExists(path.join(intDir, 'speckit.manifest.json'));
});

test('.specify/memory/.constitution-template.json exists', () => {
  assertExists(path.join(projectA, '.specify', 'memory', '.constitution-template.json'));
});

test('.specify/.gitignore exists', () => {
  assertExists(path.join(projectA, '.specify', '.gitignore'));
});

// ===========================================================================
// 6. No framework .git/ in project
// ===========================================================================
test('No .git/ directory from framework', () => {
  assertNotExists(path.join(projectA, '.git'));
});

// ===========================================================================
// 7. No specs/ from framework
// ===========================================================================
test('No specs/ directory from framework', () => {
  assertNotExists(path.join(projectA, 'specs'));
});

// ===========================================================================
// 8. No .claude/ artifacts
// ===========================================================================
test('No .claude/ directory', () => {
  assertNotExists(path.join(projectA, '.claude'));
});

test('No .claude-plugin/ directory', () => {
  assertNotExists(path.join(projectA, '.claude-plugin'));
});

// ===========================================================================
// 9. No legacy Claude Code references in runtime code
// ===========================================================================
test('No runtime references to ~/.claude in .opencode/lib/', () => {
  const libDir = path.join(projectA, '.opencode', 'lib');
  const files = fs.readdirSync(libDir).filter(f => f.endsWith('.js'));
  for (const f of files) {
    const content = fs.readFileSync(path.join(libDir, f), 'utf8');
    // Allow in comments that are provenance headers (first 10 lines)
    const lines = content.split('\n');
    const runtimeCode = lines.slice(10).join('\n');
    assert(!runtimeCode.includes('~/.claude'), `${f} contains ~/.claude in runtime code`);
  }
});

test('No runtime references to CLAUDE_PLUGIN_ROOT in .opencode/plugins/', () => {
  const pluginsDir = path.join(projectA, '.opencode', 'plugins');
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.js')) {
        const content = fs.readFileSync(full, 'utf8');
        const lines = content.split('\n');
        const runtimeCode = lines.slice(10).join('\n');
        assert(!runtimeCode.includes('CLAUDE_PLUGIN_ROOT'),
          `${full.replace(projectA + '/', '')} contains CLAUDE_PLUGIN_ROOT`);
      }
    }
  };
  walk(pluginsDir);
});

// ===========================================================================
// 10. README.md generated
// ===========================================================================
test('README.md is generated with project content', () => {
  const readme = path.join(projectA, 'README.md');
  assertExists(readme);
  const content = fs.readFileSync(readme, 'utf8');
  assert(content.includes('OpenCode'), 'Missing OpenCode reference');
  assert(content.includes('Spec Kit'), 'Missing Spec Kit reference');
  assert(content.includes('.opencode/'), 'Missing .opencode/ reference');
  assert(content.includes('.specify/'), 'Missing .specify/ reference');
  assert(content.includes('/speckit.constitution'), 'Missing /speckit.constitution');
  assert(content.includes('/speckit.specify'), 'Missing /speckit.specify');
  assert(!content.includes('everything-claude-code'), 'Should not contain legacy reference');
  assert(!content.includes('migration'), 'Should not contain migration narrative');
});

// ===========================================================================
// 11. .gitignore generated
// ===========================================================================
test('.gitignore is generated with appropriate rules', () => {
  const gitignore = path.join(projectA, '.gitignore');
  assertExists(gitignore);
  const content = fs.readFileSync(gitignore, 'utf8');
  assert(content.includes('node_modules'), 'Missing node_modules');
  assert(content.includes('.env'), 'Missing .env');
  assert(content.includes('.specify/feature.json'), 'Missing .specify/feature.json');
});

// ===========================================================================
// 12. Cannot overwrite existing directory without --force
// ===========================================================================
test('Cannot overwrite existing directory without --force', () => {
  const dest = path.join(TMP_DIR, 'project-no-overwrite');
  fs.mkdirSync(dest, { recursive: true });
  fs.writeFileSync(path.join(dest, 'marker.txt'), 'original');
  try {
    exec(`bash "${SCRIPT_PATH}" --no-git "${dest}"`);
    assert(false, 'Should have exited with error');
  } catch (e) {
    assert(e.status !== 0, `Expected non-zero exit, got ${e.status}`);
    // Original file should still be there
    assert(fs.readFileSync(path.join(dest, 'marker.txt'), 'utf8') === 'original',
      'Original file should not be overwritten');
  }
});

// ===========================================================================
// 13. --force overwrites existing directory
// ===========================================================================
test('--force overwrites existing directory', () => {
  const dest = path.join(TMP_DIR, 'project-force');
  fs.mkdirSync(dest, { recursive: true });
  fs.writeFileSync(path.join(dest, 'old-file.txt'), 'old');
  exec(`bash "${SCRIPT_PATH}" --no-git --force "${dest}"`);
  assertNotExists(path.join(dest, 'old-file.txt'));
  assertExists(path.join(dest, '.opencode'));
  assertExists(path.join(dest, '.specify'));
});

// ===========================================================================
// 14. Cannot initialize inside framework
// ===========================================================================
test('Cannot initialize inside framework directory', () => {
  const dest = path.join(FRAMEWORK_DIR, 'test-inside-framework');
  try {
    exec(`bash "${SCRIPT_PATH}" --no-git "${dest}"`);
    assert(false, 'Should have exited with error');
  } catch (e) {
    assert(e.status !== 0, `Expected non-zero exit, got ${e.status}`);
  }
});

// ===========================================================================
// 15. node_modules not copied
// ===========================================================================
test('node_modules is not copied to project', () => {
  assertNotExists(path.join(projectA, 'node_modules'));
});

// ===========================================================================
// 16. package-lock.json not copied
// ===========================================================================
test('package-lock.json is not copied to project', () => {
  assertNotExists(path.join(projectA, 'package-lock.json'));
});

// ===========================================================================
// 17. Framework test suite still passes
// ===========================================================================
test('Generated project test runner exists and is valid', () => {
  const runner = path.join(projectA, '.opencode', 'tests', 'run-all.js');
  assertExists(runner);
  const content = fs.readFileSync(runner, 'utf8');
  assert(content.includes('execSync'), 'Runner should use execSync');
  assert(content.includes('testFiles'), 'Runner should define testFiles');
});

// ===========================================================================
// 19. Manifest hashes are valid SHA-256
// ===========================================================================
test('Integration manifests have valid SHA-256 hashes', () => {
  const oManifest = JSON.parse(
    fs.readFileSync(path.join(projectA, '.specify', 'integrations', 'opencode.manifest.json'), 'utf8')
  );
  const sManifest = JSON.parse(
    fs.readFileSync(path.join(projectA, '.specify', 'integrations', 'speckit.manifest.json'), 'utf8')
  );

  // Verify hashes match actual files
  for (const [file, hash] of Object.entries(oManifest.files)) {
    const fullPath = path.join(projectA, file);
    assertExists(fullPath);
    const actualHash = execSync(`sha256sum "${fullPath}"`, { encoding: 'utf8' }).split(' ')[0];
    assert(actualHash === hash, `Hash mismatch for ${file}: expected ${hash}, got ${actualHash}`);
  }

  for (const [file, hash] of Object.entries(sManifest.files)) {
    const fullPath = path.join(projectA, file);
    assertExists(fullPath);
    const actualHash = execSync(`sha256sum "${fullPath}"`, { encoding: 'utf8' }).split(' ')[0];
    assert(actualHash === hash, `Hash mismatch for ${file}: expected ${hash}, got ${actualHash}`);
  }
});

// ===========================================================================
// 20. Speckit commands reference .specify/ correctly
// ===========================================================================
test('Speckit commands in generated project reference .specify/', () => {
  const cmdsDir = path.join(projectA, '.opencode', 'commands');
  const speckitCmds = fs.readdirSync(cmdsDir).filter(f => f.startsWith('speckit.'));
  assert(speckitCmds.length >= 8, `Expected at least 8 speckit commands, got ${speckitCmds.length}`);

  for (const cmd of speckitCmds) {
    const content = fs.readFileSync(path.join(cmdsDir, cmd), 'utf8');
    assert(content.includes('.specify/'), `${cmd} should reference .specify/`);
  }
});

// ===========================================================================
// Summary
// ===========================================================================
cleanup();

console.log(`\n\x1b[1m━━━ Results ━━━\x1b[0m`);
console.log(`  Passed: ${passed}`);
console.log(`  Failed: ${failed}`);
console.log(`  Total:  ${passed + failed}`);
console.log();

process.exit(failed > 0 ? 1 : 0);
