import zhongguo from './map/data-china.json';
import jiangsu from './map/data-jiangsu.json';
import shanghai from './map/data-shanghai.json';
import hebei from './map/data-hebei.json';
import shangxi from './map/data-shangxi.json';
import neimenggu from './map/data-neimenggu.json';
import liaoning from './map/data-liaoning.json';
import jilin from './map/data-jilin.json';
import heilongjiang from './map/data-heilongjiang.json';
import zhejiang from './map/data-zhejiang.json';
import anhui from './map/data-anhui.json';
import fujian from './map/data-fujian.json';
import jiangxi from './map/data-jiangxi.json';
import shangdong from './map/data-shangdong.json';
import henan from './map/data-henan.json';
import hubei from './map/data-hubei.json';
import hunan from './map/data-hunan.json';
import guangdong from './map/data-guangdong.json';
import guangxi from './map/data-guangxi.json';
import hainan from './map/data-hainan.json';
import sichuan from './map/data-sichuan.json';
import guizhou from './map/data-guizhou.json';
import yunnan from './map/data-yunnan.json';
import xizang from './map/data-xizang.json';
import shanxi from './map/data-shanxi.json';
import gansu from './map/data-gansu.json';
import qinghai from './map/data-qinghai.json';
import ningxia from './map/data-ningxia.json';
import xinjiang from './map/data-xinjiang.json';
import beijing from './map/data-beijing.json';
import tianjin from './map/data-tianjin.json';
import chongqing from './map/data-chongqing.json';
import xianggang from './map/data-xianggang.json';
import aomen from './map/data-aomen.json';
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