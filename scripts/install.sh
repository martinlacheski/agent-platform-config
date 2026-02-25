#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

TARGET_ROOT="${OPENCODE_CONFIG_DIR:-$HOME/.config/opencode}"
BACKUP_PARENT="${OPENCODE_BACKUP_DIR:-$HOME/.config/opencode-backups}"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"

DO_UPDATE=false
DO_SYNC=false
SYNC_PATH=""

usage() {
  cat <<'EOF'
Usage: scripts/install.sh [--update] [--sync [PROJECT_PATH]] [--target TARGET_DIR]

Options:
  --update               Update from upstream repositories (agent-teams-lite & engram) before install
  --sync [PROJECT_PATH]  Run sync after install (default PROJECT_PATH: current dir)
  --target TARGET_DIR    Override install target (default: ~/.config/opencode)
  -h, --help             Show help
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --update)
      DO_UPDATE=true
      ;;
    --sync)
      DO_SYNC=true
      next_arg="${2:-}"
      if [[ -n "$next_arg" && "${next_arg:0:1}" != "-" ]]; then
        SYNC_PATH="$next_arg"
        shift
      fi
      ;;
    --target)
      if [[ -z ${2:-} ]]; then
        echo "Error: --target requires a path" >&2
        exit 1
      fi
      TARGET_ROOT="$2"
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Error: unknown argument: $1" >&2
      usage
      exit 1
      ;;
  esac
  shift
done

if [[ "$DO_UPDATE" == true ]]; then
  echo "Running upstream update..."
  "$REPO_ROOT/scripts/sync-upstream.sh"
fi

if [[ ! -f "$REPO_ROOT/AGENTS.md" ]]; then
  echo "Error: AGENTS.md not found in repository root: $REPO_ROOT" >&2
  exit 1
fi

if [[ ! -d "$REPO_ROOT/skills" ]]; then
  echo "Error: skills directory not found in repository root: $REPO_ROOT" >&2
  exit 1
fi

if [[ ! -d "$REPO_ROOT/scripts" ]]; then
  echo "Error: scripts directory not found in repository root: $REPO_ROOT" >&2
  exit 1
fi

mkdir -p "$TARGET_ROOT"

BACKUP_ROOT="$BACKUP_PARENT/$TIMESTAMP"
created_backup=false

backup_item() {
  local src="$1"
  local dst="$2"
  if [[ -e "$src" || -L "$src" ]]; then
    if [[ "$created_backup" == false ]]; then
      mkdir -p "$BACKUP_ROOT"
      created_backup=true
    fi
    cp -a "$src" "$dst"
  fi
}

backup_item "$TARGET_ROOT/AGENTS.md" "$BACKUP_ROOT/AGENTS.md"
backup_item "$TARGET_ROOT/skills" "$BACKUP_ROOT/skills"
backup_item "$TARGET_ROOT/scripts" "$BACKUP_ROOT/scripts"

rm -rf "$TARGET_ROOT/skills" "$TARGET_ROOT/scripts"
cp -a "$REPO_ROOT/AGENTS.md" "$TARGET_ROOT/AGENTS.md"
cp -a "$REPO_ROOT/skills" "$TARGET_ROOT/skills"
cp -a "$REPO_ROOT/scripts" "$TARGET_ROOT/scripts"
chmod +x "$TARGET_ROOT/scripts"/*.sh

if [[ ! -f "$TARGET_ROOT/opencode.json" ]] && [[ -f "$REPO_ROOT/templates/opencode.json" ]]; then
  echo "📄 No opencode.json found in $TARGET_ROOT. Copying template..."
  cp -a "$REPO_ROOT/templates/opencode.json" "$TARGET_ROOT/opencode.json"
fi

if command -v engram &> /dev/null; then
  echo "🔌 Registering engram MCP server in OpenCode..."
  engram setup opencode || true
fi

echo "✅ Installed OpenCode config to: $TARGET_ROOT"
if [[ "$created_backup" == true ]]; then
  echo "Backup created at: $BACKUP_ROOT"
else
  echo "No previous AGENTS/skills/scripts found; no backup created."
fi

if [[ "$DO_SYNC" == true ]]; then
  if [[ -z "$SYNC_PATH" ]]; then
    SYNC_PATH="$PWD"
  fi
  "$TARGET_ROOT/scripts/sync-agents-skills.sh" "$SYNC_PATH"
fi
