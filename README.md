# Agent Platform Config Bundle

Portable configuration package for:

- OpenCode global router and skills
- Engram MCP memory integration support
- Agent Teams Lite / Antigravity-style `.agent/` project consumption

## What is included

- `AGENTS.md` - global skill router copied from your active OpenCode config
- `skills/` - complete skill tree copied from your active OpenCode config
- `scripts/` - install + sync + link helper scripts
- `templates/opencode.json` - placeholder-based OpenCode configuration template
- `docs/` - practical setup guides

## Repository structure

```text
.
├── AGENTS.md
├── skills/
├── scripts/
│   ├── install.sh
│   ├── sync-agents-skills.sh
│   └── link-global-agents.sh
├── templates/
│   └── opencode.json
└── docs/
    ├── quickstart.md
    ├── setup-opencode-engram.md
    └── setup-agent-teams-lite.md
```

## Install options

### Option A: Global install only (OpenCode mode)

```bash
./scripts/install.sh
```

Installs into `~/.config/opencode`:

- `AGENTS.md`
- `skills/`
- `scripts/`

If these already exist, `install.sh` creates a timestamped backup under `~/.config/opencode-backups/`.

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
