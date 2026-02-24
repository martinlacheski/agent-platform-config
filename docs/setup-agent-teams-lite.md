# Agent Teams Lite Setup

Reference: https://github.com/Gentleman-Programming/agent-teams-lite

This guide shows how to connect Agent Teams Lite with this repository's `AGENTS.md` and `skills/` assets.

## 1) Clone and install Agent Teams Lite

```bash
git clone https://github.com/Gentleman-Programming/agent-teams-lite.git
cd agent-teams-lite
bun install
```

Follow any extra setup in that repository for your selected runtime.

## 2) Install global OpenCode config bundle

From this repository root:

```bash
./scripts/install.sh
```

This makes the router and skills available globally under `~/.config/opencode`.

## 3) Sync into your target project

For Antigravity-style project consumption (`.agent/` plus root copies):

```bash
~/.config/opencode/scripts/sync-agents-skills.sh /path/to/your/project
```

What it creates:

- `/path/to/your/project/AGENTS.md`
- `/path/to/your/project/skills/`
- `/path/to/your/project/.agent/AGENTS.md`
- `/path/to/your/project/.agent/skills/`

## 4) Alternative: symlink only global AGENTS

If you prefer a single-file link for router updates:

```bash
~/.config/opencode/scripts/link-global-agents.sh /path/to/your/project
```

## 5) How this connects to Agent Teams Lite

- `AGENTS.md` acts as the skill router and behavior contract.
- `skills/` provides concrete skill instructions used by agents/sub-agents.
- `.agent/` mirrors these files for tooling that expects agent assets inside project scope.
