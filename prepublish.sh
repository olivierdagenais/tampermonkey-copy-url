#!/bin/bash
set -o errexit
set -o nounset
traperr() {
  echo "ERROR: ${BASH_SOURCE[1]} at about ${BASH_LINENO[0]}"
}

set -o errtrace
trap traperr ERR

TAG=${1:?TAG argument is required}

MESSAGE="Merging release ${TAG} into live branch..."
echo $MESSAGE
git checkout -B tmp ${TAG}
git merge -s ours origin/live -m "${MESSAGE}"
git checkout live
git merge tmp
git branch -D tmp
./podman_node yarn install
./podman_node yarn run setUrls "live"
git add package.json
./podman_node yarn test
./podman_node yarn run build
git add userscript/index.user.js -f
git commit -m "set URLs for live branch"
