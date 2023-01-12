#!/bin/bash
set -o errexit
set -o nounset
traperr() {
  echo "ERROR: ${BASH_SOURCE[1]} at about ${BASH_LINENO[0]}"
}

set -o errtrace
trap traperr ERR

ACTION=${1:?ACTION argument is required}
BRANCH_VERSION=${2:?BRANCH_VERSION argument is required}
echo "Make sure we can run via docker_node by asking for the node version..."
./docker_node node --version
echo "Make sure the repo is up-to-date..."
git fetch
case "$ACTION" in
    createBranch)
        echo "Creating release branch for ${BRANCH_VERSION}.x series..."
        git checkout -b release/${BRANCH_VERSION} origin/main

        echo "Setting version to ${BRANCH_VERSION}.0..."
        ./docker_node npm --no-git-tag-version version ${BRANCH_VERSION}.0
        ;;

    createPatch)
        # This might be implicit
        git checkout release/${BRANCH_VERSION}

        echo "Incrementing PATCH portion of ${BRANCH_VERSION}..."
        ./docker_node npm --no-git-tag-version version patch
        ;;

    *)
        echo "Unrecognized action '${ACTION}'."
        exit 1
        ;;
esac

echo "Performing release..."
CURRENT_VERSION=$(./docker_node node -pe "require('./package.json').version" | tr -d '[:space:]')
./docker_node npm install
./docker_node npm run setUrls "release/${BRANCH_VERSION}"
git add package-lock.json package.json
./docker_node npm test
./docker_node npm run build
git add userscript/index.user.js -f
git commit -m "release ${CURRENT_VERSION}"
git tag v${CURRENT_VERSION}
