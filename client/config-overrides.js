const {
  aliasDangerous,
  configPaths,
  CracoAliasPlugin
} = require('react-app-rewire-alias/lib/aliasDangerous');

module.exports = function override(config) {
  aliasDangerous({
    ...configPaths('tsconfig.paths.json')
  })(config);

  return config;
};
