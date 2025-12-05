const fs = require("fs");
const yaml = require("yaml");

require.extensions[".yml"] = function (module, filename) {
    const content = fs.readFileSync(filename, "utf8");
    const parsed = yaml.parse(content);
    module.exports = parsed;
};

require.extensions[".yaml"] = require.extensions[".yml"];
