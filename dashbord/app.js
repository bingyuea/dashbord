var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();

// TODO 处理读取文件错误
// 读取web应用配置数据
var appconfigPath = path.join(__dirname, 'conf/appconfig.' + process.env.NODE_ENV + '.json');
var appconfig = JSON.parse(fs.readFileSync(appconfigPath));

// 设置静态资源目录
if (appconfig.ENV == 'dev') {
    appconfig.webresourcePackageName = 'v_dev';
} else {
    var buildTimePath = path.join(__dirname, 'web/Public/static/buildtime.txt');
    appconfig.webresourcePackageName = fs.readFileSync(buildTimePath, 'utf-8');
}

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//ping 发布系统检查
app.use('/health/ping', function(req, res, next) {
    var data = {
        version: '1',
        text: 'MWSK'
    }

    res.send(JSON.stringify(data));
});

// 接收请求，返回根页面，前端处理页面路由(单页应用)
app.use('/', function(req, res, next) {
    res.render('index', appconfig);
});

module.exports = app;