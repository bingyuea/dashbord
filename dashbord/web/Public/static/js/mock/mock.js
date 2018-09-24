const Mock = {

    charts1: [{
        "name": "江苏",
        "count": 100
    }, {
        "name": "上海",
        "count": 120
    }],
    charts2: [{
        "year": 2017, "count": 100
    }, {
        "year": 2018, "count": 120
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
        "count": 10
    }, {
        "eventType": 2, "eventName": "三次侧短路",
        "count": 15
    }],
    charts7: [{
        "eventType": 1, "eventName": "二次侧短路",
        "count": 15
    }, {
        "eventType": 2, "eventName": "三次侧短路",
        "count": 15
    }, {
        "eventType": 2, "eventName": "四次侧短路",
        "count": 15
    }, {
        "eventType": 2, "eventName": "五次侧短路",
        "count": 15
    }],
    charts8: [{
        time: "10:20",
        waiting: 2,
        people: 5
    }, {
        time: "11:20",
        waiting: 3,
        people: 1
    }, {
        time: "12:20",
        waiting: 5,
        people: 9
    },],
    totalCount: 1420,// 二次回路异常事件统计
    // 异常区域占比查询
    areaList:
        [
            {
                "area": "浦东新区",
                "areaCount": 200
            },
            {
                "area": "黄浦区",
                "areaCount": 300
            }
        ],
    // 异常事件数量变化趋势
    periodList:
        [
            {
                "period": "2017-03-01",
                "periodCount": 200
            },
            {
                "period": "2017-03-02",
                "periodCount": 300
            }
        ],
    // 行业分布信息查询
    tradeList:
        [
            {
                "trade": 1,
                "tradeName": "大工业用电",
                "tradeCount": 200
            },
            {
                "trade": 2,
                "tradeName": "轻工业用电",
                "tradeCount": 100
            }
        ],
    // 异常类型分布情况查询
    exceptionList:
        [
            {
                "exception": 1,
                "name": "二次侧短路",
                "exceptionCount": 20
            },
            {
                "exception": 2,
                "name": "电能表计量示值错误",
                "exceptionCount": 30
            }
        ],
    // 异常信息表查询
    dataList: {
        "result": 1,
        "totalPage": 3,
        "currentPage": 1,
        "dataList": [
            {
                "username": "张三",
                "place": "南京市",
                "serialNum": "SN1234325",
                "elecSerialNum": "SN1234325",
                "trade": "大工业用电",
                "exception": 1,
                "occTime": "2017-10-10",
                "recoverTime": "2017-10-11"
            },
            {
                "username": "李四",
                "place": "南京市",
                "serialNum": "SN1234322",
                "elecSerialNum": "SN1234325",
                "trade": "轻工业用电",
                "exception": 2,
                "occTime": "2017-10-10",
                "recoverTime": "2017-10-11"
            }
        ]
    },
    // 电流分析对比查询
    elecCurrentData: {
        "result": 1,
        "xmdData": [
            {
                "phase": "A相",
                "pointList": [0.5, 0.6, 0.9]
            },
            {
                "phase ": " B相",
                "pointList": [0.5, 0.6, 0.9]
            }
        ],
        "elecData": [
            {
                "phase": "A相",
                "pointList": [0.5, 0.6, 0.9]
            },
            {
                "phase ": " B相",
                "pointList": [0.5, 0.6, 0.9]
            }
        ]
    },
};


module.exports = Mock;