/*
 *  打包工具
 *  @env 打哪个环境的包  dev、test、prd
 *  @path 项目存放路径
 *      项目根目录下需要有一个配置文件 pkg.config.json，里面的配置项：
 *      1. static：静态资源存放路径
 *      2. config：网站配置文件存放路径
*/

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const program = require('commander');
const fs = require('fs-extra');
const colors = require('colors');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

program
    .version('0.0.1')
    .option('--env <env>', 'package enviroment')
    .option('--path <path>', 'project path')
    .option('--inline')
    .option('--content-base')
    .option('--host')
    .option('--port')
    .option('--progress')
    .parse(process.argv);

// 项目配置信息
const pkg = JSON.parse(fs.readFileSync(program.path + 'pkg.config.json', 'utf-8'));

// web项目配置文件存放路径
const buildConfigPath = program.path + pkg.config;

// 静态资源存放路径
const staticPath = program.path + pkg.static;

console.log('buildConfigPath: '.green + buildConfigPath);
console.log('staticPath: '.green + staticPath);


// 打包环境
const __enviroment__ = program.env || 'aliyun_prod';
console.log(__enviroment__)
console.log(buildConfigPath + 'appconfig.' + __enviroment__ + '.json')

// 读取web发布配置文件
const content = fs.readFileSync(buildConfigPath + 'appconfig.' + __enviroment__ + '.json', 'utf-8');
const appconfig = JSON.parse(content);

console.log('------------------appconfig------------------------'.gray);



function getBuildTime() {
    function formatTimeString(time) {
        return time < 10 ? ('0' + time) : time;
    }

    const cDate = new Date();

    return [
        cDate.getFullYear(),
        formatTimeString(cDate.getMonth() + 1),
        formatTimeString(cDate.getDate()),
        formatTimeString(cDate.getHours()),
        formatTimeString(cDate.getMinutes()),
        formatTimeString(cDate.getSeconds())
    ].join('');
}

const timespan = getBuildTime();

console.log('------------------timespan------------------------'.gray);
console.log('timespan: '.green + timespan);
console.log('');

console.log('------------------enviroment------------------------'.gray);
console.log('enviroment: '.green + __enviroment__);

/*
* 非dev包，包文件夹名：v_ + 当前打包时间
* dev包，包名：v_dev
* 打非dev包时将包名保存到静态资源文件夹下buildtime.txt中
*/
if (__enviroment__ !== 'dev') {
    fs.ensureFileSync(staticPath + 'buildtime.txt');
    fs.writeFileSync(staticPath + 'buildtime.txt', 'v_' + timespan, 'utf-8');
    console.log('save build time: '.green + timespan);
    console.log('');
    console.log('------------------delete previous folders-----------------'.gray);
    // 删除前面在打包文件夹里的文件
    fs.emptyDirSync(staticPath + 'build/');
    console.log('empty build folder done'.green);
    console.log('');
}

const buildPkgName = 'v_' + (__enviroment__ !== 'dev' ? timespan : 'dev');

// 打包文件保存路径
const savePath = staticPath + 'build/' + buildPkgName + '/';
// 发布后静态资源存放路径
const publicPath = appconfig.webresourcePDBaseUrl + buildPkgName + '/';

console.log('------------------package save path---------------'.gray);
console.log(savePath);
console.log('');

console.log('------------------publicPath---------------'.gray);
console.log(publicPath);
console.log('');

console.log('------------------start build---------------'.gray);
console.log('');

// 读取项目依赖npm包，这些依赖一并打进dolphin.js中
const npmconfig = JSON.parse(fs.readFileSync(staticPath + 'package.json', 'utf-8'));
const npmpkgs = [];
for (const o in npmconfig.dependencies) {
    if (npmconfig.dependencies.hasOwnProperty(o)) {
        npmpkgs.push(staticPath + 'node_modules/' + o);
    }
}

console.log('------------------npm pkgs------------------------'.gray);

console.log(npmpkgs.join('\n'));

// webpack配置项
const __webpackConfig__ = {
    mode: 'production',
    entry: {
        libs: npmpkgs,
        app: staticPath + 'js/app.js'
    },

    output: {
        path: savePath,
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js',
        publicPath
    },
    devServer: {
        historyApiFallback: true,
		hot: true,
    },
    module: {
        loaders: [
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: 'babel-loader?presets[]=es2015&presets[]=stage-0&presets[]=react' 
            },
            {
                test: /\.css$/,
                loader: ExtractTextWebpackPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: ExtractTextWebpackPlugin.extract([
                    'css-loader',
                    // 'autoprefixer-loader?browsers=last 10 versions',
                    'less-loader',
                ])
            },
            { 
                test: /\.(eot|woff|svg|ttf|woff2|appcache)(\?|$)/, 
                exclude: /node_modules/, 
                loader: 'file-loader?name=font/[name]_[hash:8].[ext]' 
            },
            { 
                test: /\.(jpg|gif|png)$/, 
                exclude: /node_modules/, 
                loader: 'url-loader?limit=1&name=img/[name]_[hash:8].[ext]' 
            },
            { 
                test: /\.json$/, 
                exclude: /node_modules/, 
                loader: 'json-loader' 
            }

        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'libs',
            filename: 'js/libs.js'
        }),
        new CopyWebpackPlugin([
            {
                from: staticPath + 'img/',
                to: 'img/'
            },
            {
                from: staticPath + 'image/',
                to: 'image/'
            },
            {
                from: staticPath + 'images/',
                to: 'images/'
            }
        ]),
        new ExtractTextWebpackPlugin('css/appmain.css'),
		new webpack.HotModuleReplacementPlugin(),
    ],

    resolve: {
        extensions: ['', '.js']
    }

};

// 非dev包做压缩以及删除调试依赖代码
if (__enviroment__ !== 'dev') {
   
    __webpackConfig__.plugins.push(new OptimizeCssAssetsPlugin({
        assetNameRegExp: /main\.min\.css$/g,
        cssProcessor: cssnano,
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
    }));
   
    __webpackConfig__.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true
        }
    }));

    __webpackConfig__.plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }));
}

module.exports = __webpackConfig__;