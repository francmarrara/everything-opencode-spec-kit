# Everything OpenCode + Spec Kit

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Framework riutilizzabile per sviluppo software assistito da AI con OpenCode + GitHub Spec Kit.**

## Cos'e

Questo e un framework che fornisce:

- **8 agenti specializzati** con permessi least-privilege
- **14 comandi operativi** per TDD, verifica, code review, sicurezza e altro
- **12 skill** che coprono pattern backend/frontend, standard di codice, workflow TDD e sicurezza
- **5 plugin** che implementano lifecycle hooks, salvaguardie git, formattazione, verifica e logging
- **16 configurazioni server MCP** con credenziali basate su environment variables (default: disabilitati)
- **130+ test automatizzati** che coprono livelli comportamentali, integrazione e unit

Tutti i componenti seguono la [Costituzione](.specify/memory/constitution.md) e sono governati dal workflow Spec Kit.

## Struttura

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

## Installazione

```bash
git clone <repo-url>
cd everything-opencode-spec-kit
```

## Creare un Nuovo Progetto

Il bootstrap crea un nuovo progetto autonomo e indipendente dal framework:

```bash
./scripts/init-project.sh ~/Documenti/mio-sito
```

Il comando:

1. Copia `.opencode/` (agents, commands, skills, plugins, lib, contracts, tests)
2. Copia `.specify/` (templates, scripts, workflows)
3. Genera la configurazione Spec Kit
4. Crea `.gitignore` e `README.md`

### Opzioni

```bash
./scripts/init-project.sh --help           # Mostra aiuto
./scripts/init-project.sh --force <path>   # Sovrascrivi se esiste
./scripts/init-project.sh --no-git <path>  # Salta inizializzazione git
./scripts/init-project.sh --version        # Mostra versione framework
```

### Cosa viene copiato

| Componente | Copiato | Note |
|------------|---------|------|
| `.opencode/agents/` | Si | 8 agenti specializzati |
| `.opencode/commands/` | Si | 14 comandi operativi + 10 speckit |
| `.opencode/skills/` | Si | 12 skill |
| `.opencode/plugins/` | Si | 5 plugin lifecycle |
| `.opencode/lib/` | Si | Utility condivise |
| `.opencode/contracts/` | Si | Specifiche componenti |
| `.opencode/tests/` | Si | Suite test |
| `.opencode/package.json` | Si | Dipendenza @opencode-ai/plugin |
| `.specify/templates/` | Si | 5 template |
| `.specify/scripts/bash/` | Si | 6 script helper |
| `.specify/workflows/` | Si | Workflow Spec Kit |

### Cosa NON viene copiato

| Componente | Escluso | Motivo |
|------------|---------|--------|
| `.git/` | Si | Ogni progetto ha il suo repo |
| `specs/` | Si | Documentazione storica migrazione |
| `node_modules/` | Si | Il progetto le installerà |
| `CONTRIBUTING.md` | Si | Specifico del framework |
| `LICENSE` | Si | Specifico del framework |
| `WORLDFLOWAI.md` | Si | Legacy Claude Code |

### Esempio Completo

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
/speckit.clarify           # Risolvi ambiguita
/speckit.plan              # Pianifica implementazione
/speckit.tasks             # Decompone in task
/speckit.implement         # Implementa
/speckit.analyze           # Verifica coerenza
/speckit.converge          # Verifica conformita
```

## Avviare OpenCode

```bash
cd ~/Documenti/mio-sito
opencode .
```

OpenCode scopre automaticamente `.opencode/` e `.specify/` nella directory corrente.

## Workflow Spec Kit

Spec Kit definisce **COSA** (requisiti, architettura). OpenCode definisce **COME** (implementazione, testing, review).

```
Costituzione -> Specify -> Clarify -> Plan -> Tasks -> Implement -> Analyze -> Converge
```

| Comando | Scopo |
|---------|-------|
| `/speckit.constitution` | Ratifica o modifica la costituzione del progetto |
| `/speckit.specify` | Crea specifica feature |
| `/speckit.clarify` | Risolvi ambiguita nella specifica |
| `/speckit.plan` | Genera piano di implementazione |
| `/speckit.tasks` | Decompone in task eseguibili |
| `/speckit.analyze` | Verifica coerenza tra artifacti |
| `/speckit.converge` | Verifica implementazione vs specifica |

## Agenti

| Agente | Strumenti | Ruolo |
|--------|-----------|-------|
| architect | Read, Grep, Glob, Webfetch | Progettazione architettura (sola lettura) |
| build-error-resolver | Read, Write, Edit, Bash, Grep, Glob | Fix errori build |
| code-reviewer | Read, Grep, Glob, Bash | Review qualita codice |
| doc-updater | Read, Write, Edit, Bash, Grep, Glob | Aggiornamento documentazione |
| e2e-runner | Read, Write, Edit, Bash, Grep, Glob | Test end-to-end Playwright |
| refactor-cleaner | Read, Write, Edit, Bash, Grep, Glob | Rimozione codice morto |
| security-reviewer | Read, Write, Edit, Bash, Grep, Glob | Analisi vulnerabilita |
| tdd-guide | Read, Write, Edit, Bash, Grep | Test-driven development |

## Comandi

| Comando | Descrizione |
|---------|-------------|
| `/tdd` | Workflow test-driven development |
| `/verify` | Verifica completa (build, types, lint, test, security) |
| `/code-review` | Review sicurezza e qualita |
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

## MCP

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

## Test

```bash
# Esegui tutti i 130+ test
node .opencode/tests/run-all.js

# Esegui categorie specifiche
node .opencode/tests/behavioral/tdd-workflow.test.js
node .opencode/tests/integration/mcp-config.test.js
node .opencode/tests/unit/utils.test.js
node .opencode/tests/bootstrap/init-project.test.js
```

## Aggiornare il Framework

Per aggiornare il framework con le ultime modifiche:

```bash
cd everything-opencode-spec-kit
git pull

# Per aggiornare un progetto esistente, copia solo i file modificati
# oppure ricrea il progetto con --force
./scripts/init-project.sh --force ~/Documenti/mio-sito
```

## Separazione Framework / Progetto

Il framework e i progetti creati devono restare separati:

- Il framework contiene gli strumenti di bootstrap e la documentazione
- Ogni progetto e autonomo e indipendente dopo il bootstrap
- Non inserire codice applicativo nel framework
- Non inserire artifacti del framework nei progetti generati

## Provenienza

Questo progetto incorpora componenti da [everything-claude-code](https://github.com/affaan-m/everything-claude-code) di Affaan Mustafa, licenziato sotto MIT.

## License

MIT - Vedi [LICENSE](LICENSE) per dettagli.
