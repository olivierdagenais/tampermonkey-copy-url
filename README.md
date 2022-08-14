# tampermonkey-copy-url

A Tampermonkey userscript to copy nice-looking URLs to the clipboard.

## Development

1. Install dependencies with `npm install` or `npm ci`.
2. Run unit tests with `npm test`.
3. Generate userscript with `npm run build`.
4. Import generated userscript to Tampermonkey by local file URI.

### Using the [Node.js container](https://github.com/nodejs/docker-node/blob/main/README.md)

To avoid having to install anything (except the Docker Engine CLI!), just prefix any `node` or `npm` command with `./docker_node`.  For example: `./docker_node npm install`

### Debug

Allow Tampermonkey's access to local file URIs ([Tampermonkey FAQs](https://tampermonkey.net/faq.php?ext=dhdg#Q204)) and import built userscript's file URL.

## Release process

1. The `release.sh` script has 2 actions:
    1. `createBranch` for when we're ready to prepare a release for a new minor or major version, by branching off of the contents of `main`: `bash release.sh createBranch "1.2"`
    2. `createPatch` for when we want to prepare a release for a new patch version (after adding fixes to the release branch); we just need to provide tha MAJOR.MINOR portions and the PATCH portion will be automatically incremented: `bash release.sh createPatch "1.2"`
2. Next we push the branch and its release tag: `git push origin release/1.2 --follow-tags`
3. Optionally, we can update the `live` branch with a release: `bash prepublish.sh v1.2.0`
4. Finally, we push the `live` branch: `git push origin live`
