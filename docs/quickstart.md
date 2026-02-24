# 5-Minute Quickstart

## 1) Install bundle globally

```bash
cd /home/martin/Code/agent-platform-config
./scripts/install.sh
```

## 2) Sync current project (root + .agent)

```bash
~/.config/opencode/scripts/sync-agents-skills.sh "$PWD"
```

## 3) (Optional) Symlink global router only

```bash
~/.config/opencode/scripts/link-global-agents.sh "$PWD"
```

## 4) Add OpenCode runtime template

```bash
cp /home/martin/Code/agent-platform-config/templates/opencode.json ~/.config/opencode/templates/opencode.json
```

Edit placeholders in your active OpenCode config and enable Engram MCP.

## 5) Validate tools

```bash
opencode --help
engram --help
engram mcp --help
```
