#!/bin/bash
set -o errexit
set -o nounset
traperr() {
  echo "ERROR: ${BASH_SOURCE[1]} at about ${BASH_LINENO[0]}"
}

set -o errtrace
trap traperr ERR

TAG=${1:?TAG argument is required}

echo "Merging release ${TAG} into live branch..."
git checkout -B tmp ${TAG}
git merge -s ours origin/live
git checkout live
git merge tmp
git branch -D tmp
./docker_node npm install
./docker_node npm run setUrls "live"
git add package-lock.json package.json
git commit -m "set URLs for live branch"
