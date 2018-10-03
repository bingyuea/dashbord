import {
  CityListModel,
  MeasureListModel,
  TradeListModel,
  UnusalListModel,
  ThemeListModel
} from '../models/business.models';

import {
	formatSelectOptions,
	formatCity
} from '../util/util'

const cityListModel = CityListModel.getInstance(),
      measureListModel = MeasureListModel.getInstance(),
      tradeListModel = TradeListModel.getInstance(),
      unusalListModel = UnusalListModel.getInstance(),
      themeListModel = ThemeListModel.getInstance();

var searchData = {};



//城市信息
function fetchAddressList(cb){
	function success(res){
		const resData = res || {};
		const list = resData.cityList || [];
		const provinceParam = {
			list:list,	//原数据
			descKey:'province',
			valueKey:'province'
		}
		searchData.provinceOpts = formatSelectOptions(provinceParam);
		const cityParam = {
			list:list,	//原数据
			descKey:'province',
			valueKey:'province'
		}
		searchData.cityOpts = formatCity(list,list[0].province);
		DataService.successCb(cb);
	}

	function fail(err){
		searchData.provinceOpts = [{
          value:'上海',
          desc:'上海'
        },{
          value:'江苏',
          desc:'江苏'
        }]
		searchData.cityOpts = [{
          value:'南京',
          desc:'南京'
        },{
          value:'苏州',
          desc:'苏州'
        }];
		DataService.successCb(cb);
	}

	// cityListModel.setParam();
	cityListModel.excute(success,fail);
}
//计量类型
function fetchMeasureList(cb){

	function success(res){
		const resData = res || {};
		const list = resData.cityList || null;
		const param = {
			defaultDesc:'请选择计量类型',
			list:list,	//原数据
			descKey:'name',
			valueKey:'measure'
		}
		searchData.measureOpts = formatSelectOptions(param);
		DataService.successCb(cb);
	}

	function fail(err){
		searchData.measureOpts = [{
            value:1,
            desc:'三相三线'
          },{
            value:2,
            desc:'三相四线'
          }]
		DataService.successCb(cb);
	}

	// measureListModel.setParam();
	measureListModel.excute(success,fail);
}

//行业类型
function fetchTradeList(cb){

	function success(res){
		const resData = res || {};
		const list = resData.cityList || [];
		const param = {
			defaultDesc:'请选择行业类型',
			list:list,	//原数据
			descKey:'name',
			valueKey:'trade'
		}
		searchData.tradeOpts = formatSelectOptions(param);
		DataService.successCb(cb);
	}

	function fail(err){
		searchData.tradeOpts = [{
            value:1,
            desc:'大工业'
          },{
            value:2,
            desc:'小工业'
          }]
		DataService.successCb(cb);
	}

	// tradeListModel.setParam();
	tradeListModel.excute(success,fail);
}

//异常类型
function fetchUnusalList(cb){

	function success(res){
		const resData = res || {};
		const list = resData.cityList || [];
		searchData.unusalOpts = list;
		const param = {
			defaultDesc:'请选择行业类型',
			list:list,	//原数据
			descKey:'name',
			valueKey:'exception'
		}
		searchData.unusalOpts = formatSelectOptions(param);
		DataService.successCb(cb);
	}

	function fail(err){
		searchData.unusalOpts = [{
            value:1,
            desc:'三相三线'
          },{
            value:2,
            desc:'三相四线'
          }],
		DataService.successCb(cb);
	}

	// unusalListModel.setParam();
	unusalListModel.excute(success,fail);
}

//主题类型
function fetchThemeList(cb){

	function success(res){
		const resData = res || {};
		const list = resData.exceptionList || [];
		const param = {
			defaultDesc:'请选择行业类型',
			list:list,	//原数据
			descKey:'name',
			valueKey:'subject'
		}
		searchData.themeOpts = formatSelectOptions(param);
		DataService.successCb(cb);
	}

	function fail(err){
		searchData.themeOpts = [{
            value:1,
            desc:'三相三线'
          },{
            value:2,
            desc:'三相四线'
          }]
		DataService.successCb(cb);
	}

	// themeListModel.setParam();
	themeListModel.excute(success,fail);
}


var DataService = {
	cb:null,
	fetch:function(cb){
		DataService.cb = cb;
		fetchAddressList(DataService.successCb);
		fetchMeasureList(DataService.successCb);
		fetchTradeList(DataService.successCb);
		fetchUnusalList(DataService.successCb);
		fetchThemeList(DataService.successCb);
	},
	successCb:function(){
		if(
			searchData.provinceOpts && 
			searchData.cityOpts && 
			searchData.measureOpts && 
			searchData.unusalOpts && 
			searchData.tradeOpts && 
			(searchData.themeOpts)
		){
			DataService.cb(searchData);
		}
	}
}

module.exports = DataService;

























