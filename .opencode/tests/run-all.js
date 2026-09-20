#!/usr/bin/env node
/**
 * Run all OpenCode framework tests
 *
 * Adapted from: tests/run-all.js
 * Upstream provenance: everything-claude-code (MIT License)
 *
 * Usage: node .opencode/tests/run-all.js
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const testsDir = __dirname;
const testFiles = [
  'behavioral/agent-permissions.test.js',
  'behavioral/code-review.test.js',
  'behavioral/hooks.test.js',
  'behavioral/memory-session.test.js',
  'behavioral/orchestration.test.js',
  'behavioral/security-review.test.js',
  'behavioral/tdd-workflow.test.js',
  'behavioral/verification.test.js',
  'behavioral/verification-honesty.test.js',
  'integration/mcp-config.test.js',
  'unit/utils.test.js',
  'unit/package-manager.test.js',
  'bootstrap/init-project.test.js'
];

console.log('╔══════════════════════════════════════════════════════════╗');
console.log('║       Everything OpenCode + Spec Kit - Test Suite        ║');
console.log('╚══════════════════════════════════════════════════════════╝');
console.log();

let totalPassed = 0;
let totalFailed = 0;
let totalTests = 0;

for (const testFile of testFiles) {
  const testPath = path.join(testsDir, testFile);

  if (!fs.existsSync(testPath)) {
    console.log(`⚠ Skipping ${testFile} (file not found)`);
    continue;
  }

  console.log(`\n━━━ Running ${testFile} ━━━`);

  try {
    const output = execSync(`node "${testPath}"`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    console.log(output);

    const passedMatch = output.match(/Passed:\s*(\d+)/);
    const failedMatch = output.match(/Failed:\s*(\d+)/);
    const resultsMatch = output.match(/Results:\s*(\d+)\s*passed,\s*(\d+)\s*failed/);

    if (passedMatch) totalPassed += parseInt(passedMatch[1], 10);
    if (failedMatch) totalFailed += parseInt(failedMatch[1], 10);
    if (resultsMatch && !passedMatch) {
      totalPassed += parseInt(resultsMatch[1], 10);
      totalFailed += parseInt(resultsMatch[2], 10);
    }

  } catch (err) {
    console.log(err.stdout || '');
    console.log(err.stderr || '');

    const output = (err.stdout || '') + (err.stderr || '');
    const passedMatch = output.match(/Passed:\s*(\d+)/);
    const failedMatch = output.match(/Failed:\s*(\d+)/);
    const resultsMatch = output.match(/Results:\s*(\d+)\s*passed,\s*(\d+)\s*failed/);

    if (passedMatch) totalPassed += parseInt(passedMatch[1], 10);
    if (failedMatch) totalFailed += parseInt(failedMatch[1], 10);
    if (resultsMatch && !passedMatch) {
      totalPassed += parseInt(resultsMatch[1], 10);
      totalFailed += parseInt(resultsMatch[2], 10);
    }
  }
}

totalTests = totalPassed + totalFailed;

console.log('\n╔══════════════════════════════════════════════════════════╗');
console.log('║                     Final Results                        ║');
console.log('╠══════════════════════════════════════════════════════════╣');
console.log(`║  Total Tests: ${String(totalTests).padStart(4)}                                      ║`);
console.log(`║  Passed:      ${String(totalPassed).padStart(4)}  ✓                                   ║`);
console.log(`║  Failed:      ${String(totalFailed).padStart(4)}  ${totalFailed > 0 ? '✗' : ' '}                                   ║`);
console.log('╚══════════════════════════════════════════════════════════╝');

process.exit(totalFailed > 0 ? 1 : 0);
