#!/bin/sh

set -e

pnpm i --frozen-lockfile

pnpm build

cd dist/element3
npm publish
cd -


echo "✅ Publish completed"
