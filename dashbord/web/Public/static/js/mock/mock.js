const Mock = {

	charts1: [{
		"name": "江苏",
		"count": 100
	}, {
		"name": "上海",
		"count": 120
	}],
	charts2: [{
		"year": '2018-09-12', "count": 100
	}, {
		"year": '2018-09-13', "count": 120
	}],
	charts3: [{
		"measure": 1, "name": "三相三线",
		"count": 88
	}, {
		"measure": 1, "name": "三相四线",
		"count": 100
	}],
	charts4: [{
		"rate": 3000, "count": 100
	}, {
		"rate": 2000, "count": 120
	}],
	charts5: [{
		"trade": "大工业用电",
		"count": 100
	}, {
		"trade": "小工业用电",
		"count": 120
	}],
	charts6: [{
		"eventType": 1, "eventName": "二次侧短路",
		"count":10
	}, {
		"eventType": 2, "eventName": "三次侧短路",
		"count":15
	}],
	charts7: [{
		"eventType": 1, "eventName": "二次侧短路",
		"count":15
	}, {
		"eventType": 2, "eventName": "三次侧短路",
		"count":15
	}, {
		"eventType": 2, "eventName": "四次侧短路",
		"count":15
	}, {
		"eventType": 2, "eventName": "五次侧短路",
		"count":15
	}],
	charts8: [{
        time: "10:20",
        waiting: 2,
        people: 5
    },{
        time: "11:20",
        waiting: 3,
        people: 1
      },{
        time: "12:20",
        waiting: 5,
        people: 9
      },]

};


module.exports = Mock;