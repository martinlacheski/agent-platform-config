# Agent Platform Config Bundle

Portable configuration package for:

- OpenCode global router and skills
- Engram MCP memory integration support
- Agent Teams Lite / Antigravity-style `.agent/` project consumption
- Spec-Driven Development (SDD) orchestrated skills

## What is included

- `AGENTS.md` - global skill router copied from your active OpenCode config
- `skills/` - complete skill tree (including upstream SDD skills)
- `scripts/` - install + sync + link helper scripts
- `templates/opencode.json` - placeholder-based OpenCode configuration template
- `docs/` - practical setup guides

## Repository structure

```text
.
├── AGENTS.md
├── skills/                  # Includes sdd-* skills
├── scripts/
│   ├── install.sh
│   ├── sync-upstream.sh     # Auto-syncs engram & agent-teams-lite
│   ├── sync-agents-skills.sh
│   └── link-global-agents.sh
├── templates/
│   └── opencode.json
└── docs/
    ├── quickstart.md
    ├── setup-opencode-engram.md
    └── setup-agent-teams-lite.md
```

## Fresh Machine Setup (Recommended)

When setting up a new computer, use the `--update` flag. This will automatically download the latest skills, install Engram, and configure OpenCode for you:

```bash
git clone https://github.com/martinlacheski/agent-platform-config.git
cd agent-platform-config
./scripts/install.sh --update
```

**What this automated setup does:**
1. 🔄 Clones or updates `agent-teams-lite` and `engram` from GitHub (in `.upstream/`).
2. 📦 Copies the latest SDD (`sdd-*`) skills into your local `skills/` folder.
3. 🍺 Installs `Homebrew` automatically if it's not present on your system.
4. 🧠 Installs the `engram` binary automatically (using `brew` or `go` if needed).
5. 📂 Installs `AGENTS.md`, `skills/`, and `scripts/` into `~/.config/opencode`.
6. 📄 Copies the `opencode.json` template to `~/.config/opencode/opencode.json` (if it doesn't exist).
7. 🔌 Registers the Engram MCP server automatically by running `engram setup opencode`.

If existing configurations are found, `install.sh` creates a timestamped backup under `~/.config/opencode-backups/`.

---

## Other Install Options

### Option A: Global install only (Without updating upstream)

```bash
./scripts/install.sh
```

### Option B: Global install + project sync

```bash
./scripts/install.sh --sync /path/to/project
```

Also syncs files into project root and `.agent/` for tooling that expects local agent assets.

### Option C: Project sync only (after install)

```bash
~/.config/opencode/scripts/sync-agents-skills.sh /path/to/project
```

### Option D: Symlink global router only

```bash
~/.config/opencode/scripts/link-global-agents.sh /path/to/project
```

## Related projects

- Engram: https://github.com/Gentleman-Programming/engram
- Agent Teams Lite: https://github.com/Gentleman-Programming/agent-teams-lite

See `docs/` for full setup instructions and validation commands.