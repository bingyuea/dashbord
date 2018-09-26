
/*
	format参数，去除前后空格，	
*/
function formatObj(obj){

	var newObj = {};

	for(var k in obj){
		newObj[k] = obj[k].toString().replace(/(^\s*)|(\s*$)/g,"");
	}

	return newObj

}

/*
	{
		"province": "江苏",
		"detail": [{
			"eventType": 1， 
			"eventName": "二次侧短路"，
			"count"：10
		}, {
			"eventType": 2，
			"eventName": "三次侧短路"，
			"count"：15
		}]
	},
*/

function formatGroupedColumnData(list){

	var newList = [],target;

	list.forEach(item=>{
		// target.name = item.
		newList.push({

		});
	})


}

/*
	format 城市信息
*/

function formatCity(list,province){
	let cityList = [{
		value:0,
		desc:'请选择城市信息'
	}]
	const _citylist = list.find(item=>{
		if(item.province == province){
			return item.city
		}
	})

	_citylist.forEach(item=>{
		cityList.push({
			desc:item.name,
			value:item.name
		})
	})

	return cityList

}

//format 省份list
/*
	格式话下拉框的options
	参数：
	param :{
		defaultDesc:'请选择省份',
		list:[{},{},{}],	//原数据
		descKey:'name',
		valueKey:'trade'
	}
*/

function formatSelectOptions(param){
	let _List = [];

	if(param.defaultDesc){
		_List.push({
			desc:param.defaultDesc,
			value:0
		})
	}
	
	param.list.forEach(item=>{
		_List.push({
			desc:item[param.descKey],
			value:item[param.valueKey]
		})
	})
	
	return _List
}
/*

	list:数组
	key需要转换为percent的字段的key
*/
function translateCountToPercent(list,key){
	let total = 0;
	list.forEach(item=>{
		total = total + item[key];
	})

	return list.map(item=>{
		return item.percent = ((item[key] / total) * 100).toFixed(0) + "%"
	})

}

// 最简单数组去重法
function uniqueArr(array) {
    var n = []; //一个新的临时数组
    //遍历当前数组
    for (var i = 0; i < array.length; i++) {
        //如果当前数组的第i已经保存进了临时数组，那么跳过，
        //否则把当前项push到临时数组里面
        if (n.indexOf(array[i]) == -1) n.push(array[i]);
    }
    return n;
}

export {
	formatObj,
	formatSelectOptions,
	formatCity,
	translateCountToPercent,
	uniqueArr
}




