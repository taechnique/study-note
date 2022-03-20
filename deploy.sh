#!/usr/bin/env sh

# abort on errors

set -env

#build

yarn run build

# navigate into the build output directory

cd dist

git init

git add -A
$NOW=$(date+"%y-%m-%d %T")
git commit -m "deployed on $NOW"

git push -f git@github.com:Dev-Phantom/dev-phantom.github.io.git master:gh-pages

cd -

chmod +x deploy.sh
