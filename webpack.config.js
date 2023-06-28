const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");

module.exports = (env, argv) => {
    const currentPath = path.join(__dirname);

    let finalPath;
    if (env.development) {
        finalPath = currentPath + "/.env.development";
    } else {
        finalPath = currentPath + "/.env";
    }

    const fileEnv = dotenv.config({ path: finalPath }).parsed;

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
                            presets: [
                                "@babel/preset-react",
                                "@babel/preset-typescript",
                            ],
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
            new webpack.DefinePlugin(envKeys),
        ],
    };
};
