# OpenCode + Engram Setup

This guide installs OpenCode, enables Engram MCP memory, and validates everything quickly.

## 1) Install OpenCode

Use your preferred installation method from the official OpenCode docs, then confirm:

```bash
opencode --version
```

## 2) Install Engram

Reference: https://github.com/Gentleman-Programming/engram

```bash
git clone https://github.com/Gentleman-Programming/engram.git
cd engram
bun install
bun run build
```

Install the `engram` CLI as documented in that repository (method may vary by version).

## 3) Install this portable config bundle

From this repository root:

```bash
./scripts/install.sh
```

This installs `AGENTS.md`, `skills/`, and `scripts/` into `~/.config/opencode`.

## 4) Optional: sync current project for dual consumption

OpenCode mode usually reads your global config. If you also want project-local files (`AGENTS.md`, `skills/`, `.agent/`):

```bash
./scripts/install.sh --sync "$PWD"
```

## 5) Add or merge your runtime config

Copy template and fill placeholders:

```bash
mkdir -p ~/.config/opencode/templates
cp ./templates/opencode.json ~/.config/opencode/templates/opencode.json
```

Then merge needed sections into your active OpenCode config file.

## 6) Validate MCP and memory

Run OpenCode and verify MCP tools are visible and callable.

Useful checks:

```bash
opencode --help
engram --help
engram mcp --help
```

Inside OpenCode, confirm Engram tools are available (for example memory context/search/save actions).
