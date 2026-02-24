#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SOURCE_AGENTS="$SOURCE_ROOT/AGENTS.md"
SOURCE_SKILLS="$SOURCE_ROOT/skills"

PROJECT_ROOT="${1:-$PWD}"

if [[ ! -d "$PROJECT_ROOT" ]]; then
  echo "Error: project path does not exist: $PROJECT_ROOT" >&2
  exit 1
fi

if [[ ! -f "$SOURCE_AGENTS" ]]; then
  echo "Error: source AGENTS.md not found: $SOURCE_AGENTS" >&2
  exit 1
fi

if [[ ! -d "$SOURCE_SKILLS" ]]; then
  echo "Error: source skills directory not found: $SOURCE_SKILLS" >&2
  exit 1
fi

ROOT_AGENTS="$PROJECT_ROOT/AGENTS.md"
ROOT_SKILLS="$PROJECT_ROOT/skills"
AGENT_DIR="$PROJECT_ROOT/.agent"
AGENT_AGENTS="$AGENT_DIR/AGENTS.md"
AGENT_SKILLS="$AGENT_DIR/skills"

copy_file() {
  local src="$1"
  local dst="$2"

  if [[ -L "$dst" ]]; then
    rm "$dst"
  fi

  cp "$src" "$dst"
}

copy_dir_contents() {
  local src="$1"
  local dst="$2"

  if [[ -L "$dst" ]]; then
    rm "$dst"
  elif [[ -d "$dst" ]]; then
    rm -rf "$dst"
  fi

  mkdir -p "$dst"
  cp -a "$src/." "$dst/"
}

mkdir -p "$AGENT_DIR"

copy_file "$SOURCE_AGENTS" "$ROOT_AGENTS"
copy_file "$SOURCE_AGENTS" "$AGENT_AGENTS"

copy_dir_contents "$SOURCE_SKILLS" "$ROOT_SKILLS"
copy_dir_contents "$SOURCE_SKILLS" "$AGENT_SKILLS"

echo "Synced AGENTS and skills to:"
echo "- $ROOT_AGENTS"
echo "- $ROOT_SKILLS"
echo "- $AGENT_AGENTS"
echo "- $AGENT_SKILLS"
