const fs = require("fs");

module.exports = {
  addUser(username) {
    const fileName = `${Date.now()}.txt`;

    // if (!fs.existsSync(fileName)) {

    // }
    fs.writeFileSync(`files/${fileName}`, username, "utf-8");
  },
};
