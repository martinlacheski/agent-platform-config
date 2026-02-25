#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
UPSTREAM_DIR="$REPO_ROOT/.upstream"

mkdir -p "$UPSTREAM_DIR"

echo "=========================================="
echo "🔄 Sincronizando agent-teams-lite (SDD)..."
echo "=========================================="
if [ -d "$UPSTREAM_DIR/agent-teams-lite/.git" ]; then
    cd "$UPSTREAM_DIR/agent-teams-lite"
    git pull
else
    git clone https://github.com/Gentleman-Programming/agent-teams-lite.git "$UPSTREAM_DIR/agent-teams-lite"
fi

echo "Copiando skills SDD a la carpeta local..."
mkdir -p "$REPO_ROOT/skills"
cp -a "$UPSTREAM_DIR/agent-teams-lite/skills/"sdd-* "$REPO_ROOT/skills/"

echo ""
echo "=========================================="
echo "🧠 Sincronizando engram (Memoria)..."
echo "=========================================="
if [ -d "$UPSTREAM_DIR/engram/.git" ]; then
    cd "$UPSTREAM_DIR/engram"
    git pull
else
    git clone https://github.com/Gentleman-Programming/engram.git "$UPSTREAM_DIR/engram"
fi

if ! command -v engram &> /dev/null; then
    echo "⚠️  'engram' no está instalado."
    echo "Para instalarlo, puedes ejecutar:"
    echo "  brew install gentleman-programming/tap/engram"
    echo "O compilarlo desde el código fuente:"
    echo "  cd \"$UPSTREAM_DIR/engram\" && go install ./cmd/engram"
else
    echo "✅ 'engram' ya se encuentra instalado ($(engram version 2>/dev/null || echo 'versión desconocida'))."
fi

echo ""
echo "✅ Sincronización completada con éxito."
echo "Puedes revisar las skills en $REPO_ROOT/skills/"
