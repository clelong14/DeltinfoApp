const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.blockList = [
  /node_modules\/ws\/lib\/websocket-server\.js/,
  /node_modules\/ws\/lib\/stream\.js/,
  /node_modules\/ws\/lib\/websocket\.js/,
  /node_modules\/ws\/lib\/crypto\.js/, 
];

config.resolver.extraNodeModules = {
  http: require.resolve("./emptyShim.js"),
  https: require.resolve("./emptyShim.js"),
  net: require.resolve("./emptyShim.js"),
  tls: require.resolve("./emptyShim.js"),
  stream: require.resolve("readable-stream"),
  crypto: require.resolve("./emptyShim.js"),
  url: require.resolve("./emptyShim.js"),  // <- shim pour url
  ws: require.resolve("./emptyShim.js"),
  zlib: require.resolve("./emptyShim.js"),
};

module.exports = config;
