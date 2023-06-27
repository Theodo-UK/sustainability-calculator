const { merge } = require('webpack-merge')
const config  = require('./webpack.config.js')

module.exports = (env, argv) => merge(config(env, argv), {
    mode: 'development',
    devtool: 'inline-source-map'
})