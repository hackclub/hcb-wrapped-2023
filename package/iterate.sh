#!/bin/bash

cd "$(dirname "$0")"
npm version patch
npm publish
echo "Version patched!"