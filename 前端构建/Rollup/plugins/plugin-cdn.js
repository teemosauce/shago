const path = require("path");

const getFiles = (bundle) => {
  const result = {};
  for (const file of Object.values(bundle)) {
    const { fileName } = file;
    const extension = path.extname(fileName).substring(1);
    result[extension] = (result[extension] || []).concat(file);
  }
  return result;
};

const generateCDNFile = (file, resource) => {
  //   console.log(file);
  console.log(file.source);
  let source = file.source;
  let scripts =
    Array.isArray(resource.js) &&
    resource.js
      .map((src) => {
        return `<script src=${src}></script>`;
      })
      .join("\n");

  let links =
    Array.isArray(resource.css) &&
    resource.css
      .map((src) => {
        return `<link href="${src}" rel="stylesheet">`;
      })
      .join("\n");
  source = source.replace("</head>", `${links}\n${scripts}\n</head>`);
    file.source = source;
  //   console.log(file)
  return file;
};

const defaults = {
  js: [],
  css: [],
};

function cdn(resource = {}) {
  resource = Object.assign({}, defaults, resource);
  return {
    name: "cdn",
    async generateBundle(output, bundle) {
      //   console.log(bundle)
      let files = getFiles(bundle);
      let file = generateCDNFile(files.html[0], resource);
      this.emitFile(file);

      //   (resource.js || []).forEach((src) => {
      //     this.emitFile({
      //         fileName: src,
      //         type: 'asset',
      //         name: 'Rollup CDN Asset',
      //         source: ''
      //     })
      //   });
    },
  };
}

module.exports = cdn;
