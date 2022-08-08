#!/bin/bash

echo "> Installing node js deps"
yarn

echo "> Installing solana runtime deps"
cargo build-bpf
chmod +x runv.sh
./runv.sh > runtime.out &

echo "> Sleeping for 5s while local validator starts"
sleep 5

echo "> Executing repro (note you may need to install ts-node)"
ts-node test.ts

echo "> Killing local validator"
pkill -f solana-test-validator