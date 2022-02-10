const path = require('path');
const Htmlwebpackplugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    devtool: 'cheap-source-map',
    entry: {
        main: './src/index.js'
    },
    devServer: { //开发过程中 webpack-dev-server时会用到这里，上线代码不会走这步
        hot: true,
        open: true,
        port: 8080,
        proxy: {
            //context:['/auth','/api']//多个路径都跳到target网址
            //index:'',//当希望/代理时需要设置index为空
            //'/':{xxxxxx}
            '/react/api': {
                target: 'http://www.dell-lee.com',
                changeOrigin: true,//发送请求头中host会设置成target的值
                secure: false,//访问https
                pathRewrite: {
                    'header.json': 'demo.json'
                },
                headers: {
                    host: 'www.dell-lee.com',
                    cookie: 'sasasa'
                },
                //拦截:走html时直接跳过代理
                bypass: function (req, res, proxyOptions) {
                    if (req.headers.accept.indexOf('html') !== -1) {
                        console.log(111)
                        return false
                    }
                }
            },
        }
        // hot: 'only'//开启hout module replacement功能
        // proxy:{} // 可跨域
        // port:'8080 //本地打开的端口
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    performance: { hints: false },
    plugins: [
        new Htmlwebpackplugin({
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.(gif|png|jpg)$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name]_[hash].[ext]',
                    outputPath: 'image/',
                    limit: 204800
                }
            }
        }, {
            test: /\.scss$/,
            use: ['style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2,
                        modules: true
                    }
                }
                , 'sass-loader', 'postcss-loader']
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader']
        }, {
            test: /\.(eot|ttf|svg)$/,
            use: {
                loader: 'file-loader'
            }
        }]
    }
}