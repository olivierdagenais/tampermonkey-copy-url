# tampermonkey-copy-url

A Tampermonkey userscript to copy nice-looking URLs to the clipboard.

## Development

1. Install dependencies with `npm install` or `npm ci`.
2. Edit settings in `userscript` object in [`package.json`](./package.json), you can refer to the comments in [`plugins/userscript.plugin.ts`](./plugins/userscript.plugin.ts).
3. Code your userscript in `src` directory (like [`src/index.ts`](./src/index.ts)).
4. Generate userscript with `npm run build`.
5. Import generated userscript to Tampermonkey by local file URI.

### Debug

Allow Tampermonkey's access to local file URIs ([Tampermonkey FAQs](https://tampermonkey.net/faq.php?ext=dhdg#Q204)) and import built userscript's file URL.
