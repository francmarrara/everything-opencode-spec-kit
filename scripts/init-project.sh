#!/usr/bin/env bash
#
# init-project.sh - Bootstrap a new OpenCode + Spec Kit project
#
# Creates a new project directory with .opencode/ and .specify/ ready to use.
#
# Usage:
#   ./scripts/init-project.sh <destination>
#   ./scripts/init-project.sh --force <destination>
#   ./scripts/init-project.sh --help
#
set -euo pipefail

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRAMEWORK_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
FRAMEWORK_VERSION="1.0.0"
FRAMEWORK_COMMIT="$(git -C "$FRAMEWORK_DIR" rev-parse --short HEAD 2>/dev/null || echo "unknown")"

# ---------------------------------------------------------------------------
# Colors
# ---------------------------------------------------------------------------
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
info()    { echo -e "${BLUE}[INFO]${NC}  $*"; }
success() { echo -e "${GREEN}[OK]${NC}    $*"; }
warn()    { echo -e "${YELLOW}[WARN]${NC}  $*"; }
error()   { echo -e "${RED}[ERROR]${NC} $*" >&2; }

usage() {
  cat <<'EOF'
Usage: init-project.sh [OPTIONS] <destination>

Bootstrap a new OpenCode + Spec Kit project.

Arguments:
  <destination>       Path where the new project will be created

Options:
  --force             Overwrite if destination already exists
  --help              Show this help message
  --no-git            Skip git initialization (default: prompt)
  --version           Show framework version

Examples:
  ./scripts/init-project.sh ~/Documenti/mio-sito
  ./scripts/init-project.sh --force ~/projects/my-app

EOF
}

# ---------------------------------------------------------------------------
# Argument parsing
# ---------------------------------------------------------------------------
FORCE=false
NO_GIT=false
DEST=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --help|-h)
      usage
      exit 0
      ;;
    --version|-v)
      echo "Framework version: $FRAMEWORK_VERSION ($FRAMEWORK_COMMIT)"
      exit 0
      ;;
    --force|-f)
      FORCE=true
      shift
      ;;
    --no-git)
      NO_GIT=true
      shift
      ;;
    -*)
      error "Unknown option: $1"
      usage
      exit 1
      ;;
    *)
      if [[ -z "$DEST" ]]; then
        DEST="$1"
      else
        error "Unexpected argument: $1"
        usage
        exit 1
      fi
      shift
      ;;
  esac
done

# ---------------------------------------------------------------------------
# Validate arguments
# ---------------------------------------------------------------------------
if [[ -z "$DEST" ]]; then
  error "Missing destination argument."
  echo ""
  usage
  exit 1
fi

# Resolve to absolute path
DEST="$(cd "$(dirname "$DEST")" 2>/dev/null && pwd)/$(basename "$DEST")" || {
  error "Cannot resolve destination path: $DEST"
  exit 1
}

# ---------------------------------------------------------------------------
# Safety checks
# ---------------------------------------------------------------------------

# Prevent initializing inside the framework itself
if [[ "$DEST" == "$FRAMEWORK_DIR" || "$DEST" == "$FRAMEWORK_DIR/"* ]]; then
  error "Cannot initialize a project inside the framework directory."
  error "Destination: $DEST"
  error "Framework:   $FRAMEWORK_DIR"
  exit 1
fi

# Prevent overwriting without --force
if [[ -d "$DEST" ]]; then
  if [[ "$FORCE" == "true" ]]; then
    warn "Overwriting existing directory: $DEST"
    rm -rf "$DEST"
  else
    error "Destination already exists: $DEST"
    error "Use --force to overwrite."
    exit 1
  fi
fi

# ---------------------------------------------------------------------------
# Verify framework integrity
# ---------------------------------------------------------------------------
info "Verifying framework integrity..."

required_paths=(
  ".opencode/agents"
  ".opencode/commands"
  ".opencode/skills"
  ".opencode/plugins"
  ".opencode/lib"
  ".opencode/contracts"
  ".opencode/tests"
  ".specify/templates"
  ".specify/scripts/bash"
  ".specify/workflows/speckit"
  ".specify/memory/.constitution-template.json"
)

for p in "${required_paths[@]}"; do
  if [[ ! -e "$FRAMEWORK_DIR/$p" ]]; then
    error "Framework integrity check failed: missing $p"
    exit 1
  fi
done

success "Framework integrity verified."

# ---------------------------------------------------------------------------
# Create project
# ---------------------------------------------------------------------------
info "Creating project at: $DEST"
mkdir -p "$DEST"

# ---------------------------------------------------------------------------
# Copy .opencode/
# ---------------------------------------------------------------------------
info "Copying .opencode/..."

rsync -a \
  --exclude='node_modules' \
  --exclude='package-lock.json' \
  --exclude='.gitignore' \
  "$FRAMEWORK_DIR/.opencode/" \
  "$DEST/.opencode/"

success ".opencode/ copied ($(find "$DEST/.opencode" -type f | wc -l) files)"

# ---------------------------------------------------------------------------
# Copy .specify/ (selective)
# ---------------------------------------------------------------------------
info "Copying .specify/..."

mkdir -p "$DEST/.specify/memory"
mkdir -p "$DEST/.specify/templates"
mkdir -p "$DEST/.specify/scripts/bash"
mkdir -p "$DEST/.specify/workflows/speckit"

# Copy templates
cp -r "$FRAMEWORK_DIR/.specify/templates/"* "$DEST/.specify/templates/"

# Copy scripts
cp -r "$FRAMEWORK_DIR/.specify/scripts/bash/"* "$DEST/.specify/scripts/bash/"

# Copy workflow
cp -r "$FRAMEWORK_DIR/.specify/workflows/speckit/"* "$DEST/.specify/workflows/speckit/"

# Copy .gitignore
cp "$FRAMEWORK_DIR/.specify/.gitignore" "$DEST/.specify/.gitignore"

# Copy constitution template hash
cp "$FRAMEWORK_DIR/.specify/memory/.constitution-template.json" "$DEST/.specify/memory/.constitution-template.json"

success ".specify/ copied (templates, scripts, workflows)"

# ---------------------------------------------------------------------------
# Generate .specify/ config files
# ---------------------------------------------------------------------------
info "Generating .specify/ configuration..."

NOW="$(date -u +%Y-%m-%dT%H:%M:%S+00:00)"

# init-options.json
cat > "$DEST/.specify/init-options.json" <<INITEOF
{
  "ai": "opencode",
  "feature_numbering": "sequential",
  "here": true,
  "integration": "opencode",
  "script": "sh",
  "speckit_version": "1.0.8"
}
INITEOF

# integration.json
cat > "$DEST/.specify/integration.json" <<INTEOF
{
  "version": "1.0.8",
  "integration_state_schema": 1,
  "installed_integrations": ["opencode"],
  "integration_settings": {
    "opencode": {
      "script": "sh",
      "invoke_separator": "."
    }
  },
  "integration": "opencode",
  "default_integration": "opencode"
}
INTEOF

# workflow-registry.json
cat > "$DEST/.specify/workflows/workflow-registry.json" <<WREGEOF
{
  "schema_version": "1.0",
  "workflows": {
    "speckit": {
      "name": "Full SDD Cycle",
      "version": "1.0.1",
      "description": "Runs specify -> plan -> tasks -> implement with review gates",
      "source": "bundled",
      "installed_at": "$NOW",
      "updated_at": "$NOW"
    }
  }
}
WREGEOF

# integration manifests
mkdir -p "$DEST/.specify/integrations"

# Compute hashes for opencode manifest
OFILES=""
FIRST=true
for f in "$DEST/.opencode/commands/speckit."*.md; do
  if [[ -f "$f" ]]; then
    REL="${f#$DEST/}"
    HASH="$(sha256sum "$f" | cut -d' ' -f1)"
    if [[ "$FIRST" == "true" ]]; then
      FIRST=false
    else
      OFILES="$OFILES,"
    fi
    OFILES="$OFILES
    \"$REL\": \"$HASH\""
  fi
done

cat > "$DEST/.specify/integrations/opencode.manifest.json" <<OMEOF
{
  "integration": "opencode",
  "version": "1.0.8",
  "installed_at": "$NOW",
  "files": {$OFILES
  }
}
OMEOF

# Compute hashes for speckit manifest
SFILES=""
FIRST=true
for f in "$DEST/.specify/scripts/bash/"*.sh "$DEST/.specify/templates/"*.md "$DEST/.specify/.gitignore"; do
  if [[ -f "$f" ]]; then
    REL="${f#$DEST/}"
    HASH="$(sha256sum "$f" | cut -d' ' -f1)"
    if [[ "$FIRST" == "true" ]]; then
      FIRST=false
    else
      SFILES="$SFILES,"
    fi
    SFILES="$SFILES
    \"$REL\": \"$HASH\""
  fi
done

cat > "$DEST/.specify/integrations/speckit.manifest.json" <<SMEOF
{
  "integration": "speckit",
  "version": "1.0.8",
  "installed_at": "$NOW",
  "files": {$SFILES
  }
}
SMEOF

success ".specify/ configuration generated."

# ---------------------------------------------------------------------------
# Create .gitignore
# ---------------------------------------------------------------------------
info "Creating .gitignore..."

cat > "$DEST/.gitignore" <<'GIEOF'
# Dependencies
node_modules/
package-lock.json
bun.lock

# Environment
.env
.env.local
.env.*.local

# Secrets
*.key
*.pem
secrets.json

# OS
.DS_Store
Thumbs.db

# IDE
.idea/
.vscode/
*.swp
*.swo

# OpenCode sessions (global)
# Note: session data is stored in ~/.opencode/sessions/, not here

# Spec Kit local state
.specify/feature.json
.specify/extensions/*/local-config.yml

# Project-specific
personal/
private/
*.tmp
GIEOF

success ".gitignore created."

# ---------------------------------------------------------------------------
# Create README.md
# ---------------------------------------------------------------------------
info "Creating README.md..."

cat > "$DEST/README.md" <<'READMEEOF'
# Progetto

Progetto creato con [Everything OpenCode + Spec Kit](https://github.com/francmarrara/everything-opencode-spec-kit).

## Stack

- **OpenCode** - AI coding assistant
- **GitHub Spec Kit** - Spec-driven development governance

## Struttura

```
.opencode/          # Runtime OpenCode (agents, commands, skills, plugins)
.specify/           # Spec Kit governance (constitution, templates, workflows)
```

## Per Iniziare

### 1. Apri il progetto con OpenCode

```bash
cd <project-directory>
opencode .
```

### 2. Ratifica la Costituzione

```
/speckit.constitution
```

La costituzione definisce i principi fondamentali del progetto.
Personalizzala in base alle tue esigenze.

### 3. Crea una Feature

```
/speckit.specify <nome-feature>
```

### 4. Workflow Completo

```
/speckit.constitution    # Definisci i principi
/speckit.specify         # Crea la specifica
/speckit.clarify         # Risolvi ambiguita
/speckit.plan            # Pianifica l'implementazione
/speckit.tasks           # Decompone in task
/speckit.implement       # Implementa
/speckit.analyze         # Verifica coerenza
/speckit.converge        # Verifica conformita
```

## Agenti Disponibili

| Agent | Ruolo |
|-------|-------|
| architect | Progettazione architettura |
| build-error-resolver | Fix errori di build |
| code-reviewer | Review codice |
| doc-updater | Aggiornamento documentazione |
| e2e-runner | Test end-to-end |
| refactor-cleaner | Pulizia codice morto |
| security-reviewer | Analisi sicurezza |
| tdd-guide | Test-driven development |

## Comandi Disponibili

| Comando | Descrizione |
|---------|-------------|
| `/tdd` | Workflow TDD |
| `/verify` | Verifica completa (build, types, lint, test, security) |
| `/code-review` | Review sicurezza e qualita |
| `/e2e` | Generazione test E2E |
| `/build-fix` | Fix incrementale errori build |
| `/orchestrate` | Coordinamento multi-agente |
| `/learn` | Estrazione pattern |
| `/checkpoint` | Snapshot stato workflow |

## Test

```bash
node .opencode/tests/run-all.js
```

## Documentazione

- [Costituzione](.specify/memory/constitution.md) - Principi del progetto
- [Contratti](.opencode/contracts/) - Specifiche dei componenti
READMEEOF

success "README.md created."

# ---------------------------------------------------------------------------
# Optional git init
# ---------------------------------------------------------------------------
if [[ "$NO_GIT" == "false" ]]; then
  echo ""
  read -r -p "Initialize git repository? [Y/n] " response
  response="${response:-Y}"
  if [[ "$response" =~ ^[Yy]$ ]]; then
    info "Initializing git repository..."
    git -C "$DEST" init -q
    git -C "$DEST" add -A
    git -C "$DEST" commit -q -m "Initial commit: project bootstrapped with OpenCode + Spec Kit"
    success "Git repository initialized."
  else
    info "Skipping git initialization."
  fi
fi

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------
echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  Project created successfully!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "  ${BLUE}Location:${NC}  $DEST"
echo -e "  ${BLUE}Framework:${NC} $FRAMEWORK_VERSION ($FRAMEWORK_COMMIT)"
echo ""
echo -e "  ${YELLOW}Next steps:${NC}"
echo ""
echo -e "    cd $DEST"
echo -e "    opencode ."
echo ""
echo -e "  Then run:"
echo ""
echo -e "    /speckit.constitution   # Define project principles"
echo -e "    /speckit.specify        # Create your first feature spec"
echo ""
