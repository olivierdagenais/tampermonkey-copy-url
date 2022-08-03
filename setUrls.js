var pkg = require('package-json-io')

// read and parse the package.json file in current directory
pkg.read(function (err, data) {
  const args = process.argv;
  if (args.length >= 3) {
    const url = `https://github.com/olivierdagenais/tampermonkey-copy-url/raw/${args[2]}/userscript/index.user.js`;
    data.userscript.downloadURL = url;
    data.userscript.updateURL = url;
  }
  else {
    delete data.userscript.downloadURL
    delete data.userscript.updateURL
  }
  // update the package.json file in the current directory
  pkg.update(data, function (err) {
    if (err) throw err
  })
})
