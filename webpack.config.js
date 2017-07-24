
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var node_modules_dir = path.resolve(__dirname, './node_modules');
var CommonsChunkPlugin =require('./node_modules/webpack/lib/optimize/CommonsChunkPlugin');
var UglifyJsPlugin = require('./node_modules/webpack/lib/optimize/UglifyJsPlugin');
var NoErrorsPlugin = require('./node_modules/webpack/lib/NoErrorsPlugin');
var fs = require('fs');

var debug = true;
var config = {
    debug:debug,
    cache:true, /* 缓存 */

    //页面入口文件配置
    entry: {
        'dist/js/message/index' : path.resolve(__dirname, 'src/js/message/index.js'),
        'dist/js/login/index' : path.resolve(__dirname, 'src/js/login/index.js'),
        'dist/js/index/index' : path.resolve(__dirname, 'src/js/index/index.js')
    },

    //入口文件输出配置
    output: {
        path: path.join(__dirname),
        filename: debug ?'[name].js':'[name]_[hash:8].js',
        publicPath:'/'
    },

    resolve: {
        //增加解析根路径，可直接 require 到 lib 里面的模块
        alias: {
            'zepto': path.resolve(__dirname, './node_modules/webpack-zepto/index.js'),
            'fetch': path.resolve(__dirname,'./src/js/public/fetch.js')
        }
    },

    plugins: [
        /** 公用模块抽取
         *  name为提取的公共文件入口名
         *  filename为抽取文件的具体文件名
         *  chunks为被抽取模块受体
         *  minChunks 指定被至少公用次数
         */
        new CommonsChunkPlugin({
            name:'commons',
            chunks:  [

            ],
            filename: debug ? 'dist/js/common/[name].js': 'dist/js/common/[name]_[hash:8].js',
            minChunks:5
        }),


        new HtmlWebpackPlugin({
            title:'Wordpress首页',
            filename: 'dist/html/index.html',
            chunks:['commons','dist/js/index/index'],
            excludeChunks: [''],
            template:'src/html/default.html',
            chunksSortMode:'dependency',
            favicon: false,
            hash:false,
            inject:true,
            showErrors:debug,
            xhtml:false,
            cache:true,
            minify:{
                removeComments: !debug,
                collapseWhitespace:!debug
            }
        }),

        new HtmlWebpackPlugin({
            title:'Wordpress登录',
            filename: 'dist/html/login.html',
            chunks:['commons','dist/js/login/index'],
            excludeChunks: [''],
            template:'src/html/default.html',
            chunksSortMode:'dependency',
            favicon: false,
            hash:false,
            inject:true,
            showErrors:debug,
            xhtml:false,
            cache:true,
            minify:{
                removeComments: !debug,
                collapseWhitespace:!debug
            }
        }),

        new HtmlWebpackPlugin({
            title:'信息测试',
            filename: 'dist/html/message.html',
            chunks:['commons','dist/js/message/index'],
            excludeChunks: [''],
            template:'src/html/default.html',
            chunksSortMode:'dependency',
            favicon: false,
            hash:false,
            inject:true,
            showErrors:debug,
            xhtml:false,
            cache:true,
            minify:{
                removeComments: !debug,
                collapseWhitespace:!debug
            }
        }),

        /**
         * 压缩所有output输出chunks
         * compress可选项 同 UglifyJS options.
         */
        !debug ? new UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }

        }) : new Function(),

        /** 允许错误不打断程序
         */
        !debug ? new Function() : new NoErrorsPlugin(),

        /**
         * Zepto引入
         */
        new webpack.ProvidePlugin({
            Zepto: 'zepto',
            "window.Zepto":"zepto"
        }),

        /**
         * jquery引入
         */
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "window.jQuery":"jquery"
        }),

        /**
         * 引入Promise、fetch
         */
        new webpack.ProvidePlugin({
            Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
            wFetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
            fetch: 'imports?this=>global!exports?global.fetch!fetch'
        })
    ],

    /** 加载器选择  是最关键的一块配置。它告知 webpack 每一种文件都需要使用什么加载器来处理
     *  本项目主要考虑js css 图片
     */
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [node_modules_dir],
                loader: 'babel',
                query: {
                    presets: ['es2015','react'],
                    cacheDirectory:true,
                    plugins: ["transform-object-rest-spread"]
                }
            },
            {
                test: /\.(jpg|png)$/,
                loader: "url?limit=999999999999&name=dist/style/img/[hash:8][name].ext"
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },

    devServer: {
        contentBase: "./public",
        colors: true,
        historyApiFallback: true,
        inline: true
    }
};

module.exports = config;
