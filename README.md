# tampermonkey-copy-url

A Tampermonkey userscript to copy nice-looking URLs to the clipboard.

## Installation

1. First, you need to install the Tampermonkey extension for your browser, which can be found at: <https://www.tampermonkey.net/>
1. If you are using Firefox, follow the one-time configuration in the sub-section below.
1. You have to decide whether you want to always track the latest version (known as the `live` branch) or one of the release branches (which start with `release/`). Go to <https://github.com/olivierdagenais/tampermonkey-copy-url/branches/all> and make your choice.
1. Navigate to the `userscript/index.user.js` file.
1. Activate the **Raw** link. Tampermonkley should detect that a UserScript is there and prompt you to install it.
1. Tampermonkey will check for updates and prompt you to upgrade when a new version is released.

### Firefox one-time configuration

Since version 87, Firefox's Clipboard API is disabled by default and will result in an error like:

> Uncaught ReferenceError: ClipboardItem is not defined

Clipboard support can be enabled by following these steps:

1. Open a new tab and navigate to about:config
2. Find the `dom.events.asyncClipboard.clipboardItem` item and set it to **true**.

## Development

1. Install dependencies with `npm install` or `npm ci`.
2. Run unit tests with `npm test`.
3. Generate userscript with `npm run build`.
4. Import generated userscript to Tampermonkey by local file URI.

### Using the [Node.js container](https://github.com/nodejs/docker-node/blob/main/README.md)

To avoid having to install anything (except Podman!), just prefix any `node` or `npm` command with `./podman_node`. For example: `./podman_node npm install`

### Debug

Allow Tampermonkey's access to local file URIs ([Tampermonkey FAQs](https://tampermonkey.net/faq.php?ext=dhdg#Q204)) and import built userscript's file URL.

## Release process

1. The `release.sh` script has 2 actions:
    1. `createBranch` for when we're ready to prepare a release for a new minor or major version, by branching off of the contents of `main`: `bash release.sh createBranch "1.2"`
    2. `createPatch` for when we want to prepare a release for a new patch version (after adding fixes to the release branch); we just need to provide tha MAJOR.MINOR portions and the PATCH portion will be automatically incremented: `bash release.sh createPatch "1.2"`
2. Next we push the branch and its release tag: `git push origin release/1.2 --tags`
3. Optionally, we can update the `live` branch with a release: `bash prepublish.sh v1.2.0`
4. Finally, we push the `live` branch: `git push origin live`
