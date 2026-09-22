# Everything OpenCode + Spec Kit

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Free for everyone](https://img.shields.io/badge/free_for_everyone-yes-green.svg)](LICENSE)

> **🌍 Multilingual README / README multilingua:**
> **🇬🇧 [English](#-english) | 🇮🇹 [Italiano](#-italiano)**
>
> **License / Licenza:** MIT — free for everyone / libera per tutti (commercial, private, educational use allowed / uso commerciale, privato e didattico consentito). See [LICENSE](LICENSE).

---

## 🇬🇧 English

**Reusable framework for AI-assisted software development with OpenCode + GitHub Spec Kit.**

**License:** MIT — free for everyone. You can use, copy, modify, merge, publish, distribute, sublicense and sell this software, including for commercial purposes, with no restrictions other than preserving the copyright notice. See [LICENSE](LICENSE) for details.

### What it is

This is a framework that provides:

- **8 specialized agents** with least-privilege permissions
- **14 operational commands** for TDD, verification, code review, security and more
- **12 skills** covering backend/frontend patterns, code standards, TDD workflow and security
- **5 plugins** implementing lifecycle hooks, git safeguards, formatting, verification and logging
- **16 MCP server configurations** with environment-variable based credentials (default: disabled)
- **130+ automated tests** covering behavioral, integration and unit levels

All components follow the [Constitution](.specify/memory/constitution.md) and are governed by the Spec Kit workflow.

### Structure

```
.opencode/                 # OpenCode runtime
├── agents/                # Specialized agents
├── commands/              # Operational slash commands
├── skills/                # Reusable knowledge and procedures
├── instructions/          # Runtime instructions
├── plugins/               # Native OpenCode lifecycle extensions
├── contracts/             # Component format specifications
├── lib/                   # Shared utilities
├── mcp/servers/           # MCP server configurations
└── tests/                 # Automated test suite

.specify/                  # Spec Kit governance layer
├── memory/                # Constitution and memory
├── templates/             # Document templates
├── scripts/bash/          # Helper scripts
└── workflows/             # Workflow definitions
```

### Installation

```bash
git clone <repo-url>
cd everything-opencode-spec-kit
```

### Create a New Project

Bootstrap creates a new standalone project, independent from the framework:

```bash
./scripts/init-project.sh ~/Documents/my-site
```

The command:

1. Copies `.opencode/` (agents, commands, skills, plugins, lib, contracts, tests)
2. Copies `.specify/` (templates, scripts, workflows)
3. Generates the Spec Kit configuration
4. Creates `.gitignore` and `README.md`

#### Options

```bash
./scripts/init-project.sh --help           # Show help
./scripts/init-project.sh --force <path>   # Overwrite if exists
./scripts/init-project.sh --no-git <path>  # Skip git initialization
./scripts/init-project.sh --version        # Show framework version
```

#### What gets copied

| Component | Copied | Notes |
|------------|---------|------|
| `.opencode/agents/` | Yes | 8 specialized agents |
| `.opencode/commands/` | Yes | 14 operational commands + 10 speckit |
| `.opencode/skills/` | Yes | 12 skills |
| `.opencode/plugins/` | Yes | 5 lifecycle plugins |
| `.opencode/lib/` | Yes | Shared utilities |
| `.opencode/contracts/` | Yes | Component specifications |
| `.opencode/tests/` | Yes | Test suite |
| `.opencode/package.json` | Yes | @opencode-ai/plugin dependency |
| `.specify/templates/` | Yes | 5 templates |
| `.specify/scripts/bash/` | Yes | 6 helper scripts |
| `.specify/workflows/` | Yes | Spec Kit workflows |

#### What is NOT copied

| Component | Excluded | Reason |
|------------|---------|--------|
| `.git/` | Yes | Each project has its own repo |
| `specs/` | Yes | Historical migration documentation |
| `node_modules/` | Yes | The project will install them |
| `CONTRIBUTING.md` | Yes | Framework-specific |
| `LICENSE` | Yes | Framework-specific |
| `WORLDFLOWAI.md` | Yes | Claude Code legacy |

#### Full Example

```bash
# 1. Create the project
./scripts/init-project.sh ~/Documents/my-site

# 2. Enter the directory
cd ~/Documents/my-site

# 3. Open with OpenCode
opencode .

# 4. Ratify the Constitution
/speckit.constitution

# 5. Create the first feature
/speckit.specify user-authentication

# 6. Full workflow
/speckit.clarify           # Resolve ambiguities
/speckit.plan              # Plan implementation
/speckit.tasks             # Break down into tasks
/speckit.implement         # Implement
/speckit.analyze           # Verify consistency
/speckit.converge          # Verify compliance
```

### Start OpenCode

```bash
cd ~/Documents/my-site
opencode .
```

OpenCode automatically discovers `.opencode/` and `.specify/` in the current directory.

### Spec Kit Workflow

Spec Kit defines **WHAT** (requirements, architecture). OpenCode defines **HOW** (implementation, testing, review).

```
Constitution -> Specify -> Clarify -> Plan -> Tasks -> Implement -> Analyze -> Converge
```

| Command | Purpose |
|---------|-------|
| `/speckit.constitution` | Ratify or amend the project constitution |
| `/speckit.specify` | Create feature specification |
| `/speckit.clarify` | Resolve ambiguities in the specification |
| `/speckit.plan` | Generate implementation plan |
| `/speckit.tasks` | Break down into executable tasks |
| `/speckit.analyze` | Verify consistency between artifacts |
| `/speckit.converge` | Verify implementation vs specification |

### Agents

| Agent | Tools | Role |
|--------|-----------|-------|
| architect | Read, Grep, Glob, Webfetch | Architecture design (read-only) |
| build-error-resolver | Read, Write, Edit, Bash, Grep, Glob | Build error fixes |
| code-reviewer | Read, Grep, Glob, Bash | Code quality review |
| doc-updater | Read, Write, Edit, Bash, Grep, Glob | Documentation updates |
| e2e-runner | Read, Write, Edit, Bash, Grep, Glob | Playwright end-to-end tests |
| refactor-cleaner | Read, Write, Edit, Bash, Grep, Glob | Dead code removal |
| security-reviewer | Read, Write, Edit, Bash, Grep, Glob | Vulnerability analysis |
| tdd-guide | Read, Write, Edit, Bash, Grep | Test-driven development |

### Commands

| Command | Description |
|---------|-------------|
| `/tdd` | Test-driven development workflow |
| `/verify` | Full verification (build, types, lint, test, security) |
| `/code-review` | Security and quality review |
| `/e2e` | Playwright E2E test generation |
| `/build-fix` | Incremental build error fixes |
| `/orchestrate` | Multi-agent workflow coordination |
| `/learn` | Pattern extraction from sessions |
| `/checkpoint` | Workflow state snapshot |
| `/eval` | Eval-driven development |
| `/refactor-clean` | Dead code removal |
| `/test-coverage` | Coverage analysis |
| `/update-docs` | Documentation synchronization |
| `/update-codemaps` | Code map updates |
| `/setup-pm` | Package manager setup |

### MCP

16 MCP servers configured with environment-variable based credentials:

| Server | Type | Purpose |
|--------|------|-------|
| github | stdio | GitHub operations |
| firecrawl | stdio | Web scraping |
| supabase | stdio | Database operations |
| memory | stdio | Persistent memory |
| sequential-thinking | stdio | Chain-of-thought reasoning |
| vercel | http | Vercel deploy |
| railway | stdio | Railway deploy |
| cloudflare-docs | http | Cloudflare documentation |
| cloudflare-workers-builds | http | Workers builds |
| cloudflare-workers-bindings | http | Workers bindings |
| cloudflare-observability | http | Observability |
| clickhouse | http | Analytics queries |
| context7 | stdio | Live documentation |
| magic | stdio | UI components |
| filesystem | stdio | Filesystem operations |

All servers default to `enabled: false`. Enable only the ones you need.

### Tests

```bash
# Run all 130+ tests
node .opencode/tests/run-all.js

# Run specific categories
node .opencode/tests/behavioral/tdd-workflow.test.js
node .opencode/tests/integration/mcp-config.test.js
node .opencode/tests/unit/utils.test.js
node .opencode/tests/bootstrap/init-project.test.js
```

### Update the Framework

To update the framework with the latest changes:

```bash
cd everything-opencode-spec-kit
git pull

# To update an existing project, copy only the changed files
# or recreate the project with --force
./scripts/init-project.sh --force ~/Documents/my-site
```

### Framework / Project Separation

The framework and created projects must remain separated:

- The framework contains bootstrap tools and documentation
- Each project is standalone and independent after bootstrap
- Do not put application code in the framework
- Do not put framework artifacts in generated projects

### Provenance

This project incorporates components from [everything-claude-code](https://github.com/affaan-m/everything-claude-code) by Affaan Mustafa, licensed under MIT.

### License

MIT — free for everyone. Commercial, private and educational use allowed. See [LICENSE](LICENSE) for details.

---

## 🇮🇹 Italiano

**Framework riutilizzabile per sviluppo software assistito da AI con OpenCode + GitHub Spec Kit.**

**Licenza:** MIT — libera per tutti. Puoi usare, copiare, modificare, unire, pubblicare, distribuire, concedere in sottolicenza e vendere questo software, anche per scopi commerciali, senza altre restrizioni oltre a conservare l'avviso di copyright. Vedi [LICENSE](LICENSE) per i dettagli.

### Cos'è

Questo è un framework che fornisce:

- **8 agenti specializzati** con permessi least-privilege
- **14 comandi operativi** per TDD, verifica, code review, sicurezza e altro
- **12 skill** che coprono pattern backend/frontend, standard di codice, workflow TDD e sicurezza
- **5 plugin** che implementano lifecycle hooks, salvaguardie git, formattazione, verifica e logging
- **16 configurazioni server MCP** con credenziali basate su environment variables (default: disabilitati)
- **130+ test automatizzati** che coprono livelli comportamentali, integrazione e unit

Tutti i componenti seguono la [Costituzione](.specify/memory/constitution.md) e sono governati dal workflow Spec Kit.

### Struttura

```
.opencode/                 # Runtime OpenCode
├── agents/                # Agenti specializzati
├── commands/              # Comandi slash operativi
├── skills/                # Knowledge e procedure riutilizzabili
├── instructions/          # Istruzioni runtime
├── plugins/               # Estensioni lifecycle native OpenCode
├── contracts/             # Specifiche formato componenti
├── lib/                   # Utility condivise
├── mcp/servers/           # Configurazioni server MCP
└── tests/                 # Suite di test automatizzati

.specify/                  # Layer governance Spec Kit
├── memory/                # Costituzione e memoria
├── templates/             # Template per documenti
├── scripts/bash/          # Script helper
└── workflows/             # Definizioni workflow
```

### Installazione

```bash
git clone <repo-url>
cd everything-opencode-spec-kit
```

### Creare un Nuovo Progetto

Il bootstrap crea un nuovo progetto autonomo e indipendente dal framework:

```bash
./scripts/init-project.sh ~/Documenti/mio-sito
```

Il comando:

1. Copia `.opencode/` (agents, commands, skills, plugins, lib, contracts, tests)
2. Copia `.specify/` (templates, scripts, workflows)
3. Genera la configurazione Spec Kit
4. Crea `.gitignore` e `README.md`

#### Opzioni

```bash
./scripts/init-project.sh --help           # Mostra aiuto
./scripts/init-project.sh --force <path>   # Sovrascrivi se esiste
./scripts/init-project.sh --no-git <path>  # Salta inizializzazione git
./scripts/init-project.sh --version        # Mostra versione framework
```

#### Cosa viene copiato

| Componente | Copiato | Note |
|------------|---------|------|
| `.opencode/agents/` | Sì | 8 agenti specializzati |
| `.opencode/commands/` | Sì | 14 comandi operativi + 10 speckit |
| `.opencode/skills/` | Sì | 12 skill |
| `.opencode/plugins/` | Sì | 5 plugin lifecycle |
| `.opencode/lib/` | Sì | Utility condivise |
| `.opencode/contracts/` | Sì | Specifiche componenti |
| `.opencode/tests/` | Sì | Suite test |
| `.opencode/package.json` | Sì | Dipendenza @opencode-ai/plugin |
| `.specify/templates/` | Sì | 5 template |
| `.specify/scripts/bash/` | Sì | 6 script helper |
| `.specify/workflows/` | Sì | Workflow Spec Kit |

#### Cosa NON viene copiato

| Componente | Escluso | Motivo |
|------------|---------|--------|
| `.git/` | Sì | Ogni progetto ha il suo repo |
| `specs/` | Sì | Documentazione storica migrazione |
| `node_modules/` | Sì | Il progetto le installerà |
| `CONTRIBUTING.md` | Sì | Specifico del framework |
| `LICENSE` | Sì | Specifico del framework |
| `WORLDFLOWAI.md` | Sì | Legacy Claude Code |

#### Esempio Completo

```bash
# 1. Crea il progetto
./scripts/init-project.sh ~/Documenti/mio-sito

# 2. Entra nella directory
cd ~/Documenti/mio-sito

# 3. Apri con OpenCode
opencode .

# 4. Ratifica la Costituzione
/speckit.constitution

# 5. Crea la prima feature
/speckit.specify autenticazione-utenti

# 6. Workflow completo
/speckit.clarify           # Risolvi ambiguità
/speckit.plan              # Pianifica implementazione
/speckit.tasks             # Decomponi in task
/speckit.implement         # Implementa
/speckit.analyze           # Verifica coerenza
/speckit.converge          # Verifica conformità
```

### Avviare OpenCode

```bash
cd ~/Documenti/mio-sito
opencode .
```

OpenCode scopre automaticamente `.opencode/` e `.specify/` nella directory corrente.

### Workflow Spec Kit

Spec Kit definisce **COSA** (requisiti, architettura). OpenCode definisce **COME** (implementazione, testing, review).

```
Costituzione -> Specify -> Clarify -> Plan -> Tasks -> Implement -> Analyze -> Converge
```

| Comando | Scopo |
|---------|-------|
| `/speckit.constitution` | Ratifica o modifica la costituzione del progetto |
| `/speckit.specify` | Crea specifica feature |
| `/speckit.clarify` | Risolvi ambiguità nella specifica |
| `/speckit.plan` | Genera piano di implementazione |
| `/speckit.tasks` | Decomponi in task eseguibili |
| `/speckit.analyze` | Verifica coerenza tra artefatti |
| `/speckit.converge` | Verifica implementazione vs specifica |

### Agenti

| Agente | Strumenti | Ruolo |
|--------|-----------|-------|
| architect | Read, Grep, Glob, Webfetch | Progettazione architettura (sola lettura) |
| build-error-resolver | Read, Write, Edit, Bash, Grep, Glob | Fix errori build |
| code-reviewer | Read, Grep, Glob, Bash | Review qualità codice |
| doc-updater | Read, Write, Edit, Bash, Grep, Glob | Aggiornamento documentazione |
| e2e-runner | Read, Write, Edit, Bash, Grep, Glob | Test end-to-end Playwright |
| refactor-cleaner | Read, Write, Edit, Bash, Grep, Glob | Rimozione codice morto |
| security-reviewer | Read, Write, Edit, Bash, Grep, Glob | Analisi vulnerabilità |
| tdd-guide | Read, Write, Edit, Bash, Grep | Test-driven development |

### Comandi

| Comando | Descrizione |
|---------|-------------|
| `/tdd` | Workflow test-driven development |
| `/verify` | Verifica completa (build, types, lint, test, security) |
| `/code-review` | Review sicurezza e qualità |
| `/e2e` | Generazione test E2E con Playwright |
| `/build-fix` | Fix incrementale errori build |
| `/orchestrate` | Coordinamento workflow multi-agente |
| `/learn` | Estrazione pattern da sessioni |
| `/checkpoint` | Snapshot stato workflow |
| `/eval` | Eval-driven development |
| `/refactor-clean` | Rimozione codice morto |
| `/test-coverage` | Analisi coverage |
| `/update-docs` | Sincronizzazione documentazione |
| `/update-codemaps` | Aggiornamento code map |
| `/setup-pm` | Configurazione package manager |

### MCP

16 server MCP configurati con credenziali basate su environment variables:

| Server | Tipo | Scopo |
|--------|------|-------|
| github | stdio | Operazioni GitHub |
| firecrawl | stdio | Web scraping |
| supabase | stdio | Operazioni database |
| memory | stdio | Memoria persistente |
| sequential-thinking | stdio | Chain-of-thought reasoning |
| vercel | http | Deploy Vercel |
| railway | stdio | Deploy Railway |
| cloudflare-docs | http | Documentazione Cloudflare |
| cloudflare-workers-builds | http | Workers builds |
| cloudflare-workers-bindings | http | Workers bindings |
| cloudflare-observability | http | Observability |
| clickhouse | http | Query analytics |
| context7 | stdio | Documentazione live |
| magic | stdio | Componenti UI |
| filesystem | stdio | Operazioni filesystem |

Tutti i server hanno default `enabled: false`. Abilita solo quelli che ti servono.

### Test

```bash
# Esegui tutti i 130+ test
node .opencode/tests/run-all.js

# Esegui categorie specifiche
node .opencode/tests/behavioral/tdd-workflow.test.js
node .opencode/tests/integration/mcp-config.test.js
node .opencode/tests/unit/utils.test.js
node .opencode/tests/bootstrap/init-project.test.js
```

### Aggiornare il Framework

Per aggiornare il framework con le ultime modifiche:

```bash
cd everything-opencode-spec-kit
git pull

# Per aggiornare un progetto esistente, copia solo i file modificati
# oppure ricrea il progetto con --force
./scripts/init-project.sh --force ~/Documenti/mio-sito
```

### Separazione Framework / Progetto

Il framework e i progetti creati devono restare separati:

- Il framework contiene gli strumenti di bootstrap e la documentazione
- Ogni progetto è autonomo e indipendente dopo il bootstrap
- Non inserire codice applicativo nel framework
- Non inserire artefatti del framework nei progetti generati

### Provenienza

Questo progetto incorpora componenti da [everything-claude-code](https://github.com/affaan-m/everything-claude-code) di Affaan Mustafa, licenziato sotto MIT.

### Licenza

MIT — libera per tutti. Uso commerciale, privato e didattico consentito. Vedi [LICENSE](LICENSE) per i dettagli.
