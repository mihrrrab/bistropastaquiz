#!/bin/bash
set -e

# Ensure the script works no matter where it is launched from
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

PORT=8000

echo "Запускаем локальный сервер для Bistro Pasta Navigator по адресу http://localhost:${PORT}"
python3 -m http.server "$PORT" >/tmp/bistro_pasta_server.log 2>&1 &
SERVER_PID=$!

sleep 1
open "http://localhost:${PORT}/index.html"

echo "Сервер работает. Закройте окно Terminal или нажмите Ctrl+C, чтобы остановить." 
wait $SERVER_PID
