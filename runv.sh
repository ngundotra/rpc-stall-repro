#!/usr/bin/env bash
args=(
  --reset
  --bpf-program EMZDuMn33tTJKpkKTmcLHgSp8k5zm6vYvv8FoUZMSGUX target/deploy/caller.so
)

echo "${args[@]}" $SOLANA_RUN_SH_VALIDATOR_ARGS
solana-test-validator "${args[@]}" $SOLANA_RUN_SH_VALIDATOR_ARGS
