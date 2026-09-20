/**
 * OpenCode-specific constants
 * Replaces all CLAUDE_* references with OpenCode equivalents
 *
 * Upstream provenance: everything-claude-code (MIT License)
 */

const path = require('path');
const os = require('os');

// Base directories
const HOME_DIR = os.homedir();
const OPENCODE_DIR = path.join(HOME_DIR, '.opencode');
const PROJECT_ROOT = process.cwd();

// Config paths
const SESSIONS_DIR = path.join(OPENCODE_DIR, 'sessions');
const LEARNED_SKILLS_DIR = path.join(OPENCODE_DIR, 'skills', 'learned');
const CHECKPOINTS_LOG = path.join(OPENCODE_DIR, 'checkpoints.log');

// Environment variable names
const ENV = {
  PACKAGE_MANAGER: 'OPENCODE_PACKAGE_MANAGER',
  SESSION_ID: 'OPENCODE_SESSION_ID',
  TRANSCRIPT_PATH: 'OPENCODE_TRANSCRIPT_PATH',
  PLUGIN_ROOT: 'OPENCODE_PLUGIN_ROOT'
};

// Hook event names (OpenCode-native)
const HOOK_EVENTS = {
  PRE_TOOL_USE: 'pre-tool-use',
  POST_TOOL_USE: 'post-tool-use',
  PRE_COMPACT: 'pre-compact',
  SESSION_START: 'session-start',
  SESSION_END: 'session-end',
  STOP: 'stop'
};

// Agent paths
const AGENTS_DIR = path.join(PROJECT_ROOT, '.opencode', 'agents');

// Skill paths
const SKILLS_DIR = path.join(PROJECT_ROOT, '.opencode', 'skills');

// Command paths
const COMMANDS_DIR = path.join(PROJECT_ROOT, '.opencode', 'commands');

// Plugin directories
const PLUGINS_DIR = path.join(PROJECT_ROOT, '.opencode', 'plugins');

// Test directories
const TESTS_DIR = path.join(PROJECT_ROOT, '.opencode', 'tests');

module.exports = {
  HOME_DIR,
  OPENCODE_DIR,
  PROJECT_ROOT,
  SESSIONS_DIR,
  LEARNED_SKILLS_DIR,
  CHECKPOINTS_LOG,
  ENV,
  HOOK_EVENTS,
  AGENTS_DIR,
  SKILLS_DIR,
  COMMANDS_DIR,
  PLUGINS_DIR,
  TESTS_DIR
};
