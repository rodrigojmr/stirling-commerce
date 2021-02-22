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

// const { alias, configPaths } = require('react-app-rewire-alias');

// module.exports = function override(config) {
//   return alias(configPaths('./tsconfig.paths.json'))(config);
// };
