#!/bin/sh

set -e

echo "Running database migrations..."

go run cmd/migrate/main.go

echo "Starting the application with reflex..."

exec reflex -r '\.go$' -s -- sh -c "dlv debug cmd/api/main.go --headless --listen=:2345 --api-version=2 --accept-multiclient --continue"