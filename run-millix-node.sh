#!/bin/sh
ip_address=127.0.0.1
echo "running on $ip_address"
babel-node --max-old-space-size=2048 index.js --host $ip_address --port 10000 --api-port 5500 --debug true --folder ./millix/
