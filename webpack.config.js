const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs'); // to check if the file exists


module.exports = (env, argv) => {
  // Get the root path (assuming your webpack config is in the root of your project!)
  const currentPath = path.join(__dirname);

  console.log('env:', env)

  // Create the fallback path (the production .env)
  // const basePath = currentPath + '/.env';

  // We're concatenating the environment name to our filename to specify the correct env file!
  // const envPath = basePath + '.' + env.ENVIRONMENT;

  // Check if the file exists, otherwise fall back to the production .env
  // const finalPath = fs.existsSync(envPath) ? envPath : basePath;
  let finalPath;
  if (env.production) {
    console.log('Production mode')
    finalPath = currentPath + '/.env';
  } else if (env.development) {
    console.log('Development mode')
    finalPath = currentPath + '/.env.development';
  } else {
    console.log('No mode specified!!!!!!!!!!!!!!!')

    finalPath = currentPath + '/.env';
  }

  // Set the path parameter in the dotenv config
  const fileEnv = dotenv.config({ path: finalPath }).parsed;

  // reduce it to a nice object, the same as before (but with the variables from the file)
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  return {
    entry: { popup: "./src/popup.tsx", background: "./src/background.ts" },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react", "@babel/preset-typescript"],
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/popup.html",
        filename: "popup.html",
      }),
      new CopyPlugin({
        patterns: [{ from: "public" }],
      }),
      new webpack.DefinePlugin(envKeys)
    ],
  };

}