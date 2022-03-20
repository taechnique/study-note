#!/usr/bin/env sh

# abort on errors

set -e

#build

yarn build

# navigate into the build output directory

cd dist

git init

git add -A

NOW=$(date +"%y-%m-%d %T")

git commit -m "deployed on $NOW"

git push -f git@github.com:Dev-Phantom/dev-phantom.github.io.git main:gh-pages

cd -

