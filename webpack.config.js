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
        entry: {
            popup: "./src/view/popup/popup.tsx",
            background: "./src/background/background.ts",
        },
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
                {
                    test: /\.css$/i,
                    use: [
                        "style-loader",
                        "css-loader",
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [["postcss-preset-env"]],
                                },
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/view/popup/popup.html",
                filename: "popup.html",
            }),
            new CopyPlugin({
                patterns: [{ from: "public" }],
            }),
            new webpack.DefinePlugin(envKeys),
        ],
    };
};
