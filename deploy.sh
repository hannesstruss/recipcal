#!/bin/bash

set -o errexit -o nounset

rev=$(git rev-parse --short HEAD)

npm install
npm install -g gulp-cli
bundle install
gulp build

cd build
git init

git config user.name "Hannes Struss (Travis CI)"
git config user.email "x@hannesstruss.de"

git remote add origin "https://$GH_TOKEN@github.com/hannesstruss/recipcal.git"
git fetch origin
git reset origin/gh-pages

touch .

git add -A .
git commit -m "Rebuild gh-pages at ${rev}"
git push -q origin HEAD:gh-pages

rm -rf .git
