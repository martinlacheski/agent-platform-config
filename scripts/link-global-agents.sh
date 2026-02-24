#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

TARGET="$SOURCE_ROOT/AGENTS.md"
PROJECT_ROOT="${1:-$PWD}"
LINK_PATH="$PROJECT_ROOT/AGENTS.md"

if [[ ! -d "$PROJECT_ROOT" ]]; then
  echo "Error: project path does not exist: $PROJECT_ROOT" >&2
  exit 1
fi

if [[ ! -f "$TARGET" ]]; then
  echo "Error: global AGENTS file not found at $TARGET" >&2
  exit 1
fi

if [[ -e "$LINK_PATH" || -L "$LINK_PATH" ]]; then
  if [[ -L "$LINK_PATH" ]]; then
    CURRENT_TARGET="$(readlink "$LINK_PATH")"
    if [[ "$CURRENT_TARGET" == "$TARGET" ]]; then
      echo "No-op: AGENTS.md already links to global router."
      exit 0
    fi
  fi

  echo "Warning: $LINK_PATH exists and is not the expected symlink to $TARGET" >&2
  echo "Refusing to overwrite existing file." >&2
  exit 1
fi

if ! git -C "$PROJECT_ROOT" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Note: current directory is not a git repository; creating link anyway."
fi

ln -s "$TARGET" "$LINK_PATH"
echo "Created symlink: $LINK_PATH -> $TARGET"
