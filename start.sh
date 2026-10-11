#!/usr/bin/env bash

# Prefix each server's output so the combined log is readable
(python -m flask run --host=0.0.0.0 --port=5000 --reload 2>&1 | sed -u 's/^/[flask]  /') &
(cd mockup && npm install --legacy-peer-deps && \
 ionic serve --host=0.0.0.0 --port=8100 --no-open --no-interactive --disable-host-check 2>&1 | sed -u 's/^/[ionic]  /') &

# Stop the container if either server exits
wait -n
kill 0