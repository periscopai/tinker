/**
 * see https://webpack.js.org/
 */
const path = require('path');

 
/**
 * Exports properties to webpack
 */
module.exports = [
    {
        name: "periscopai",
        mode: 'development',
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
            },
            {
                test: /\.s?css$/,
                use: [
                    'style-loader', 
                    'css-loader',
                    'sass-loader',
                ],
            }
            ]
        },
        // https://webpack.js.org/configuration/devtool/#root
        devtool: 'eval-cheap-module-source-map',
        devServer:{
            contentBase: path.join(__dirname, "public"),
        },
    },
    {
        name: "pakt",
        mode: 'development',
        // entry is the location of our source code
        entry: './scratch/app.js',
    
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
            },
            {
                test: /\.s?css$/,
                use: [
                    'style-loader', 
                    'css-loader',
                    'sass-loader',
                ],
            }]
        },
        // https://webpack.js.org/configuration/devtool/#root
        devtool: 'eval-cheap-module-source-map',
        devServer:{
            contentBase: path.join(__dirname, "public"),
        },
    }
];

