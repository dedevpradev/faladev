#!/bin/sh

set -e

echo "Running database migrations..."

go run cmd/migrate/main.go

echo "Starting the application with reflex..."

exec reflex -r '\.go$' -s -- sh -c "go run cmd/api/main.go"