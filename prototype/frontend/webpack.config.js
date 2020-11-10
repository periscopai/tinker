/**
 * see https://webpack.js.org/
 */
const path = require('path');
 
/**
 * Exports properties to webpack
 */
module.exports = {
    // entry is the location of our source code
    entry: './src/app.js',

    // output is the location of the webpack bundle that will be served.
    output: {
        path: path.join(__dirname, "public"),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_module/
        }]
    },
};

