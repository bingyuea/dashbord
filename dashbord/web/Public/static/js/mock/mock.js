const Mock = {
  charts1: [
    {
      name: '江苏',
      count: 100
    },
    {
      name: '上海',
      count: 120
    }
  ],
  charts2: [
    {
      year: 2017,
      count: 100
    },
    {
      year: 2018,
      count: 120
    }
  ],
  charts3: [
    {
      measure: 1,
      name: '三相三线',
      count: 88
    },
    {
      measure: 1,
      name: '三相四线',
      count: 100
    }
  ],
  charts4: [
    {
      rate: 3000,
      count: 100
    },
    {
      rate: 2000,
      count: 120
    }
  ],
  charts5: [
    {
      trade: '大工业用电',
      count: 100
    },
    {
      trade: '小工业用电',
      count: 120
    }
  ],
  charts6: [
    {
      eventType: 1,
      eventName: '二次侧短路',
      count: 10
    },
    {
      eventType: 2,
      eventName: '三次侧短路',
      count: 15
    }
  ],
  charts7: [
    {
      eventType: 1,
      eventName: '二次侧短路',
      count: 15
    },
    {
      eventType: 2,
      eventName: '三次侧短路',
      count: 15
    },
    {
      eventType: 2,
      eventName: '四次侧短路',
      count: 15
    },
    {
      eventType: 2,
      eventName: '五次侧短路',
      count: 15
    }
  ],
  charts8: [
    {
      time: '10:20',
      waiting: 2,
      people: 5
    },
    {
      time: '11:20',
      waiting: 3,
      people: 1
    },
    {
      time: '12:20',
      waiting: 5,
      people: 9
    }
  ],
  totalCount: 1420, // 二次回路异常事件统计
  // 异常区域占比查询
  areaList: [
    {
      area: '浦东新区',
      areaCount: 200
    },
    {
      area: '黄浦区',
      areaCount: 300
    }
  ],
  // 异常事件数量变化趋势
  periodList: [
    {
      period: '2017-03-01',
      periodCount: 200
    },
    {
      period: '2017-03-02',
      periodCount: 300
    }
  ],
  // 行业分布信息查询
  tradeList: [
    {
      trade: 1,
      tradeName: '大工业用电',
      tradeCount: 200
    },
    {
      trade: 2,
      tradeName: '轻工业用电',
      tradeCount: 100
    }
  ],
  // 异常类型分布情况查询
  exceptionList: [
    {
      exception: 1,
      name: '二次侧短路',
      exceptionCount: 20
    },
    {
      exception: 2,
      name: '电能表计量示值错误',
      exceptionCount: 30
    }
  ],
  // 异常信息表查询
  dataList: {
    result: 1,
    totalPage: 3,
    currentPage: 1,
    dataList: [
      {
        username: '张三',
        city: '南京市',
        region: '松江区',
        serialNum: 'SN1234325',
        elecSerialNum: 'SN1234325',
        trade: '大工业用电',
        name: '二次侧短路',
        occTime: '2017-10-10',
        recoverTime: '2017-10-11'
      },
      {
        username: '张三',
        city: '南京市',
        region: '松江区',
        serialNum: 'SN1234325',
        elecSerialNum: 'SN1234325',
        trade: '大工业用电',
        name: '二次侧短路',
        occTime: '2017-10-10',
        recoverTime: '2017-10-11'
      },
      {
        username: '张三',
        city: '南京市',
        region: '松江区',
        serialNum: 'SN1234325',
        elecSerialNum: 'SN1234325',
        trade: '大工业用电',
        name: '二次侧短路',
        occTime: '2017-10-10',
        recoverTime: '2017-10-11'
      },
      {
        username: '张三',
        city: '南京市',
        region: '松江区',
        serialNum: 'SN1234325',
        elecSerialNum: 'SN1234325',
        trade: '大工业用电',
        name: '二次侧短路',
        occTime: '2017-10-10',
        recoverTime: '2017-10-11'
      },
      {
        username: '张三',
        city: '南京市',
        region: '松江区',
        serialNum: 'SN1234325',
        elecSerialNum: 'SN1234325',
        trade: '大工业用电',
        name: '二次侧短路',
        occTime: '2017-10-10',
        recoverTime: '2017-10-11'
      },
      {
        username: '张三',
        city: '南京市',
        region: '松江区',
        serialNum: 'SN1234325',
        elecSerialNum: 'SN1234325',
        trade: '大工业用电',
        name: '二次侧短路',
        occTime: '2017-10-10',
        recoverTime: '2017-10-11'
      },
      {
        username: '张三',
        city: '南京市',
        region: '松江区',
        serialNum: 'SN1234325',
        elecSerialNum: 'SN1234325',
        trade: '大工业用电',
        name: '二次侧短路',
        occTime: '2017-10-10',
        recoverTime: '2017-10-11'
      },
      {
        username: '张三',
        city: '南京市',
        region: '松江区',
        serialNum: 'SN1234325',
        elecSerialNum: 'SN1234325',
        trade: '大工业用电',
        name: '二次侧短路',
        occTime: '2017-10-10',
        recoverTime: '2017-10-11'
      },
      {
        username: '张三',
        city: '南京市',
        region: '松江区',
        serialNum: 'SN1234325',
        elecSerialNum: 'SN1234325',
        trade: '大工业用电',
        name: '二次侧短路',
        occTime: '2017-10-10',
        recoverTime: '2017-10-11'
      },
      {
        username: '张三',
        city: '南京市',
        region: '松江区',
        serialNum: 'SN1234325',
        elecSerialNum: 'SN1234325',
        trade: '大工业用电',
        name: '二次侧短路',
        occTime: '2017-10-10',
        recoverTime: '2017-10-11'
      },
      {
        username: '张三',
        city: '南京市',
        region: '松江区',
        serialNum: 'SN1234325',
        elecSerialNum: 'SN1234325',
        trade: '大工业用电',
        name: '二次侧短路',
        occTime: '2017-10-10',
        recoverTime: '2017-10-11'
      },
      {
        username: '张三',
        city: '南京市',
        region: '松江区',
        serialNum: 'SN1234325',
        elecSerialNum: 'SN1234325',
        trade: '大工业用电',
        name: '二次侧短路',
        occTime: '2017-10-10',
        recoverTime: '2017-10-11'
      },
      {
        username: '张三',
        city: '南京市',
        region: '松江区',
        serialNum: 'SN1234325',
        elecSerialNum: 'SN1234325',
        trade: '大工业用电',
        name: '二次侧短路',
        occTime: '2017-10-10',
        recoverTime: '2017-10-11'
      },
      {
        username: '张三',
        city: '南京市',
        region: '松江区',
        serialNum: 'SN1234325',
        elecSerialNum: 'SN1234325',
        trade: '大工业用电',
        name: '二次侧短路',
        occTime: '2017-10-10',
        recoverTime: '2017-10-11'
      },
      {
        username: '张三',
        city: '南京市',
        region: '松江区',
        serialNum: 'SN1234325',
        elecSerialNum: 'SN1234325',
        trade: '大工业用电',
        name: '二次侧短路',
        occTime: '2017-10-10',
        recoverTime: '2017-10-11'
      },
      {
        username: '张三',
        city: '南京市',
        region: '松江区',
        serialNum: 'SN1234325',
        elecSerialNum: 'SN1234325',
        trade: '大工业用电',
        name: '二次侧短路',
        occTime: '2017-10-10',
        recoverTime: '2017-10-11'
      },
      {
        username: '张三',
        city: '南京市',
        region: '松江区',
        serialNum: 'SN1234325',
        elecSerialNum: 'SN1234325',
        trade: '大工业用电',
        name: '二次侧短路',
        occTime: '2017-10-10',
        recoverTime: '2017-10-11'
      },
      {
        username: '张三',
        city: '南京市',
        region: '松江区',
        serialNum: 'SN1234325',
        elecSerialNum: 'SN1234325',
        trade: '大工业用电',
        name: '二次侧短路',
        occTime: '2017-10-10',
        recoverTime: '2017-10-11'
      },
      {
        username: '张三',
        city: '南京市',
        region: '松江区',
        serialNum: 'SN1234325',
        elecSerialNum: 'SN1234325',
        trade: '大工业用电',
        name: '二次侧短路',
        occTime: '2017-10-10',
        recoverTime: '2017-10-11'
      },
      {
        username: '张三',
        city: '南京市',
        region: '松江区',
        serialNum: 'SN1234325',
        elecSerialNum: 'SN1234325',
        trade: '大工业用电',
        name: '二次侧短路',
        occTime: '2017-10-10',
        recoverTime: '2017-10-11'
      },
      {
        username: '张三',
        city: '南京市',
        region: '松江区',
        serialNum: 'SN1234325',
        elecSerialNum: 'SN1234325',
        trade: '大工业用电',
        name: '二次侧短路',
        occTime: '2017-10-10',
        recoverTime: '2017-10-11'
      }
    ]
  },
  // 电流分析对比查询
  testData: [
    { month: 'Jan', city: 'Tokyo', temperature: 7 },
    { month: 'Jan', city: 'London', temperature: 3.9 },
    { month: '2', city: 'Tokyo', temperature: 7 },
    { month: '2', city: 'London', temperature: 3.9 }
  ],
  elecCurrentData: {
    xmdData: [
      {
        phase: 'A相',
        pointList: [0.5, 0.6, 0.9]
      },
      {
        phase: 'B相',
        pointList: [0.5, 0.6, 0.9]
      },
      {
        phase: 'C相',
        pointList: [0.5, 0.6, 0.9]
      }
    ],
    elecData: [
      {
        phase: 'A相',
        pointList: [0.2, 0.1, 0.3]
      },
      {
        phase: 'B相',
        pointList: [0.5, 0.3, 0.9]
      },
      {
        phase: 'C相',
        pointList: [0.1, 0.2, 0.3]
      }
    ]
  },

  // 巡检仪上报事件查询
  xmdEventData: [
    {
      exception: '巡检仪上报表示值不平',
      event: '发生',
      eventTime: '2018-06-01 0:33:55',
      phaseA: 0,
      phaseB: 0,
      phaseC: 1
    },
    {
      exception: '巡检仪上报事件查询',
      event: '发生',
      eventTime: '2018-06-01 0:33:55',
      phaseA: 0,
      phaseB: 0,
      phaseC: 1
    }
  ],

  // 电能表上报事件查询
  eleEventData: [
    {
      exception: '表示值不平',
      event: '发生',
      eventTime: '2018-06-01 0:33:55',
      phaseA: 0,
      phaseB: 0,
      phaseC: 1
    },
    {
      exception: '电能表飞走',
      event: '发生',
      eventTime: '2018-06-01 0:33:55',
      phaseA: 0,
      phaseB: 0,
      phaseC: 1
    }
  ],
  // 电量数据查询
  elecDayData: [
    {
      time: '　2018-06-01',
      activePower: 100,
      reactivePower: 100
    },
    {
      time: '　2018-06-02',
      activePower: 100,
      reactivePower: 100
    },
    {
      time: '　2018-06-03',
      activePower: 100,
      reactivePower: 100
    },
    {
      time: '　2018-06-04',
      activePower: 100,
      reactivePower: 100
    },
    {
      time: '　2018-06-05',
      activePower: 100,
      reactivePower: 100
    }
  ],
  //异常数据统计(排行榜数据)
  exceptionDataObj: {
    result: 1,
    exceptionData: [
      {
        rangeName: '江苏省',
        exceptionIndex: 155.68,
        stealingPowerRanking: [
          {
            user: '食品公司A',
            index: 1.8
          },
          {
            user: '食品公司B',
            index: 1.7
          }
        ],
        troubleRanking: [
          {
            user: '食品公司A',
            index: 1.8
          },
          {
            user: '食品公司B',
            index: 1.7
          }
        ],
        wiringFaultRanking: [
          {
            user: '食品公司A',
            index: 1.8
          },
          {
            user: '食品公司B',
            index: 1.7
          }
        ],
        expansionRanking: [
          {
            user: '食品公司A',
            index: 1.8
          },
          {
            user: '食品公司B',
            index: 1.7
          }
        ],
        maintainRanking: [
          {
            user: '食品公司A',
            index: 1.8
          },
          {
            user: '食品公司B',
            index: 1.7
          }
        ],
        failureRanking: [
          {
            user: '食品公司A',
            index: 1.8
          },
          {
            user: '食品公司B',
            index: 1.7
          }
        ],
        loopExceRanking: [
          {
            user: '食品公司A',
            index: 1.8
          },
          {
            user: '食品公司B',
            index: 1.7
          }
        ],
        elecExecRanking: [
          {
            user: '食品公司A',
            index: 1.8
          },
          {
            user: '食品公司B',
            index: 1.7
          }
        ]
      },
      {
        rangeName: '浙江省',
        exceptionIndex: 155.68,
        stealingPowerRanking: [
          {
            user: '食品公司A',
            index: 1.8
          },
          {
            user: '食品公司B',
            index: 1.7
          }
        ],
        troubleRanking: [
          {
            user: '食品公司A',
            index: 1.8
          },
          {
            user: '食品公司B',
            index: 1.7
          }
        ],
        wiringFaultRanking: [
          {
            user: '食品公司A',
            index: 1.8
          },
          {
            user: '食品公司B',
            index: 1.7
          }
        ],
        expansionRanking: [
          {
            user: '食品公司A',
            index: 1.8
          },
          {
            user: '食品公司B',
            index: 1.7
          }
        ],
        maintainRanking: [
          {
            user: '食品公司A',
            index: 1.8
          },
          {
            user: '食品公司B',
            index: 1.7
          }
        ],
        failureRanking: [
          {
            user: '食品公司A',
            index: 1.8
          },
          {
            user: '食品公司B',
            index: 1.7
          }
        ],
        loopExceRanking: [
          {
            user: '食品公司A',
            index: 1.8
          },
          {
            user: '食品公司B',
            index: 1.7
          }
        ],
        elecExecRanking: [
          {
            user: '食品公司A',
            index: 1.8
          },
          {
            user: '食品公司B',
            index: 1.7
          }
        ]
      }
    ]
  }
}

module.exports = Mock
