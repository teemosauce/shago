const fs = require("fs");

module.exports = {
  save(content) {
    const fileName = `${Date.now()}.txt`;

    // if (!fs.existsSync(fileName)) {

    // }
    fs.writeFileSync(`files/${fileName}`, content, "utf-8");
  },
};
