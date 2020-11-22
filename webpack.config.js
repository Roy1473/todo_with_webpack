const HtmlWebpackPlugin = require('html-webpack-plugin');
const MODE = "development";
const enabledSourceMap = MODE === "development";
module.exports = {
    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: `./src/index.js`,
    // ファイルの出力設定
    output: {
        //出力ファイルのディレクトリ名
        path: `${__dirname}/dist`,
        // 出力ファイル名
        filename: "main.js"
    },
    //target: ["web", "es5"],
    
    devServer:{
        contentBase: "dist",
        open: true,
        port: 8080
    },
    mode: MODE,
    module: {
        rules: [
            {
                test:/\.scss$/,
                use:[
                    "style-loader",
                    {
                        loader: "css-loader",
                        options:{
                            url: false,
                            sourceMap: enabledSourceMap,
                            importLoaders: 2,
                        }
                    },
                    {
                        loader:"sass-loader",
                        options:{
                            sourceMap: enabledSourceMap
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use:[
                    {
                        loader: "html-loader",
                        options: {minimize: true}
                    }
                ]
            },
            {
                test:/\.js$/,
                use:[
                    {
                        loader: "babel-loader",
                        options:{
                            presets:[
                                "@babel/preset-env",
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ],
    target: 'web',
};