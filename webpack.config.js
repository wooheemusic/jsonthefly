module.exports = env => {
  var path = require("path");
  var glob = require("glob");

  console.log("ZZZZZZZ", __dirname, path.resolve(__dirname, "dist"));
  // console.log(glob.sync('content/**/index.js'));
  var arr = glob.sync("src/**/*.js");
  var entries = {};
  arr.forEach(each => {
    var entryPoint = each.substring(4);
    if (!/.*(^|\/)_\w*.js$/.test(entryPoint)) {
      entries[entryPoint] = entryPoint;
    }
  });
  console.log(entries);
  var dist = path.resolve(__dirname, "dist");
  // 'src/array/numberOf.js',
  // 'src/array/subtract.js',
  // 'src/index.js',
  // 'src/object/getAssignedByKeys.js',
  // 'src/object/index.js',
  // 'src/object/is.js',
  // 'src/object/shallowEqual.js',

  return {
    entry: entries,
    output: {
      filename: "[name]",
      library: "jsonthefly",
      libraryTarget: "umd",
      path: dist
      // publicPath: "/"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["env"]
            }
          }
        }
      ]
    },
    resolve: {
      modules: [path.resolve(__dirname, "src")]
    }
    // mode: "development"
  };
};
