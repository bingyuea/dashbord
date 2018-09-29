var zhongguo = require('./map/data-china.json');
var jiangsu = require('./map/data-jiangsu.json');
var shanghai = require('./map/data-shanghai.json');
var hebei = require('./map/data-hebei.json');
var shangxi = require('./map/data-shangxi.json');
var neimenggu = require('./map/data-neimenggu.json');
var liaoning = require('./map/data-liaoning.json');
var jilin = require('./map/data-jilin.json');
var heilongjiang = require('./map/data-heilongjiang.json');
var zhejiang = require('./map/data-zhejiang.json');
var anhui = require('./map/data-anhui.json');
var fujian = require('./map/data-fujian.json');
var jiangxi = require('./map/data-jiangxi.json');
var shangdong = require('./map/data-shangdong.json');
var henan = require('./map/data-henan.json');
var hubei = require('./map/data-hubei.json');
var hunan = require('./map/data-hunan.json');
var guangdong = require('./map/data-guangdong.json');
var guangxi = require('./map/data-guangxi.json');
var hainan = require('./map/data-hainan.json');
var sichuan = require('./map/data-sichuan.json');
var guizhou = require('./map/data-guizhou.json');
var yunnan = require('./map/data-yunnan.json');
var xizang = require('./map/data-xizang.json');
var shanxi = require('./map/data-shanxi.json');
var gansu = require('./map/data-gansu.json');
var qinghai = require('./map/data-qinghai.json');
var ningxia = require('./map/data-ningxia.json');
var xinjiang = require('./map/data-xinjiang.json');
var beijing = require('./map/data-beijing.json');
var tianjin = require('./map/data-tianjin.json');
var chongqing = require('./map/data-chongqing.json');
var xianggang = require('./map/data-xianggang.json');
var aomen = require('./map/data-aomen.json');

var geoCoordMapofProvince = {};
zhongguo.features.forEach(item=>{
	geoCoordMapofProvince[item.properties.name] = item.properties.cp;
})

var cityMap = {
	'中国': zhongguo,
	'上海': shanghai,
	'河北': hebei,
	'山西': shangxi,
	'内蒙古': neimenggu,
	'辽宁': liaoning,
	'吉林': jilin,
	'黑龙江': heilongjiang,
	'江苏': jiangsu,
	'浙江': zhejiang,
	'安徽': anhui,
	'福建': fujian,
	'江西': jiangxi,
	'山东': shangdong,
	'河南': henan,
	'湖北': hubei,
	'湖南': hunan,
	'广东': guangdong,
	'广西': guangxi,
	'海南': hainan,
	'四川': sichuan,
	'贵州': guizhou,
	'云南': yunnan,
	'西藏': xizang,
	'陕西': shanxi,
	'甘肃': gansu,
	'青海': qinghai,
	'宁夏': ningxia,
	'新疆': xinjiang,
	'北京': beijing,
	'天津': tianjin,
	'重庆': chongqing,
	'香港': xianggang,
	'澳门': aomen
}

module.exports = {
	cityMap,
	geoCoordMapofProvince
};