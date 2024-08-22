const Module = require('./module');
const Formation = require('./formation');
const Formation_Module = require('./formation_module');

Module.belongsToMany(Formation, {through: Formation_Module, foreignKey: "module_id"});
Formation.belongsToMany(Module, {through: Formation_Module, foreignKey: "formation_id"});


module.exports = {Module, Formation, Formation_Module};