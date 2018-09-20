
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

export {
	formatObj
}




