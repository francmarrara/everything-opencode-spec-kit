---
name: mcp-configs
description: Use this skill when adding, removing, or configuring MCP servers. Manages MCP server definitions in .opencode/mcp/servers/ and provides guidance on MCP integration patterns.
---

# MCP Configs Skill

Manage MCP (Model Context Protocol) server integrations for OpenCode.

## Directory Structure

```
.opencode/mcp/
  servers/
    github.json
    firecrawl.json
    supabase.json
    memory.json
    sequential-thinking.json
    vercel.json
    railway.json
    cloudflare-docs.json
    cloudflare-workers-builds.json
    cloudflare-workers-bindings.json
    cloudflare-observability.json
    clickhouse.json
    context7.json
    magic.json
    filesystem.json
```

## Server Configuration Format

Each server file follows this structure:

```json
{
  "name": "server-name",
  "command": "npx",
  "args": ["-y", "@package/name"],
  "env": {
    "API_KEY": "YOUR_KEY_HERE"
  },
  "description": "What this server provides"
}
```

For HTTP-based servers:

```json
{
  "name": "server-name",
  "type": "http",
  "url": "https://endpoint/mcp",
  "description": "What this server provides"
}
```

## Guidelines

1. **Keep under 10 MCPs enabled** to preserve context window
2. **Replace placeholder values** (YOUR_*_HERE) with actual credentials
3. **Never commit secrets** — use environment variables
4. **One server per file** for maintainability
5. **Document purpose** in description field

## Adding a New Server

1. Create `.opencode/mcp/servers/{name}.json`
2. Follow the format above
3. Replace placeholder values
4. Test with OpenCode

## Removing a Server

1. Delete `.opencode/mcp/servers/{name}.json`
2. Remove any references in agent configurations
