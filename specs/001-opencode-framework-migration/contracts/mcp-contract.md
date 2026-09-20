# MCP Contract: OpenCode MCP Configuration Format

**Date**: 2026-09-20

## Contract

Every MCP integration MUST conform to this configuration format.

### Configuration Structure

```yaml
mcp_servers:
  <server-name>:
    command: <string>        # For stdio transport
    args: <list[string]>     # For stdio transport
    url: <string>            # For HTTP transport
    env:
      <KEY>: "${ENV_VAR}"    # Environment variable references ONLY
    enabled: <boolean>       # Default: false
    description: <string>    # Documented purpose
```

### Security Rules

- MUST NOT contain hardcoded credentials
- MUST use `${ENV_VAR}` syntax for secrets
- MUST default to disabled unless documented need
- MUST have documented purpose and usage scope

### Prohibited

- `~/.claude.json` references
- `disabledMcpServers` array (use enabled flag per server)
- Hardcoded `YOUR_*_HERE` placeholders in committed config
