import React, { Component } from 'react'
import BaseView from '../core/view.base'
import $ from 'jquery'
import { Table } from 'antd'
//图表模型
import { Labelline, Basicline, Doubleaxes, Basicbar } from '../ui/ui.charts'

import {
  QueryExceptionCount,
  QueryExceptionByArea,
  QueryExceptionByTime,
  // 行业分布信息查询
  QueryExceptionByTrade,
  // 异常类型分布情况查询
  QueryExceptionDetail,
  // 异常信息表查询
  QueryExceptionList,
  /*
    *  二次回路单-异常分析2
    */
  // 电流分析对比查询
  QueryElecCurrentData,
  // 巡检仪上报事件查询
  QueryXMDEvent,
  // 电能表上报事件查询
  QueryElecEvent,
  // 电量数据查询
  QueryElecData
} from '../models/secondaryLoop.models'
import Mock from '../mock/mock'

import SearchBar from '../ui/ui.searchbar.js'

import Slider from 'react-slick'
import DataServince from '../services/searchbar.services'
import moment from 'moment'
//定义数据模型
const queryExceptionCount = QueryExceptionCount.getInstance()
const queryExceptionByArea = QueryExceptionByArea.getInstance()
const queryExceptionByTime = QueryExceptionByTime.getInstance()
// 行业分布信息查询
const queryExceptionByTrade = QueryExceptionByTrade.getInstance()
// 异常类型分布情况查询
const queryExceptionDetail = QueryExceptionDetail.getInstance()
// 异常信息表查询
const queryExceptionList = QueryExceptionList.getInstance()
/*
*  二次回路单-异常分析2
*/
// 电流分析对比查询
const queryElecCurrentData = QueryElecCurrentData.getInstance()
// 巡检仪上报事件查询
const queryXMDEvent = QueryXMDEvent.getInstance()
// 电能表上报事件查询
const queryElecEvent = QueryElecEvent.getInstance()
// 电量数据查询
const queryElecData = QueryElecData.getInstance()

class SecondaryLoop extends BaseView {
  constructor(props) {
    super(props)

    this.state = {
      pageTitle: '二次回路单-异常分析',
      pageIdx: 0
    }

    const dateFormat = 'YYYY-MM-DD HH:mm'
    const today = moment().format(dateFormat)
    const lastday = moment()
      .add(-1, 'days')
      .format(dateFormat)

    this.indata = {
      defaultTime: [lastday, today]
    }
  }

  componentDidMount() {
    // this.pageInit();
    this.setState({
      pageStatus: 'init'
    })
    const self = this
    DataServince.fetch(function(searchOptions) {
      self.setState(
        {
          searchOptions: searchOptions
        },
        () => {
          self.search()
        }
      )
    })
  }

  search(value) {
    //拿到搜索需要参数
    let _value = value || {}
    if (!_value.province) {
      _value.province = this.state.searchOptions.provinceOpts[0].value
    }

    if (!_value.startTime) {
      _value.startTime = this.indata.defaultTime[0]
      _value.endTime = this.indata.defaultTime[1]
    }
    _value = {
      endTime: '2018-09-29 18:53:00',
      province: '山西',
      startTime: '2009-09-28 18:53:00',
      token: '234sdf234'
    }
    this.fetchPageOne(_value)
    this.fetchPageTwo(_value)
  }

  //切换轮播的回调,idx:当前轮播的页面idx
  afterSlickChange(idx) {
    console.log(idx)
    this.setState({
      pageIdx: idx
    })
  }

  fetchPageOne(value) {
    this.fetchQueryExceptionCount(value)
    this.fetchQueryExceptionByArea(value)
    this.fetchQueryExceptionByTime(value)
    this.fetchQueryExceptionByTrade(value)
    this.fetchQueryExceptionDetail(value)
    this.fetchQueryExceptionList(value)
  }

  fetchPageTwo(value) {
    this.fetchQueryExceptionList(value)
  }

  fetchrowCLick(value) {
    // pageOne.dataList = resData 列表第一条数据
    debugger
    let { serialNum, elecSerialNum, occTime } =
      (this.state.pageTwo && this.state.pageTwo.record) ||
      this.state.pageOne.dataList[0] ||
      {}
    let params = { serialNum, elecSerialNum, occTime }
    /*
    *  二次回路单-异常分析2
    */
    // 电流分析对比查询
    this.fetchQueryElecCurrentData(params)
    // 巡检仪上报事件查询
    this.fetchQueryXMDEvent(params)
    // 电能表上报事件查询
    this.fetchQueryElecEvent(params)
    // 电量数据查询
    this.fetchQueryElecData(params)
  }

  // 异常事件总数查询
  fetchQueryExceptionCount(value) {
    // token	校验字符串	String	是	用于校验	123sdf234
    // province	省份	string	是		江苏
    // city	城市	string	否		南京
    // serialNum	巡检仪资产编号	string	否
    // trade	行业类型	int	否		1
    // exception	异常类型	int	否		1
    // startTime	开始时间	string	是		2017-03-03 10:10:10
    // endTime	结束时间	string	是		2017-03-05 10:10:10
    let self = this
    queryExceptionCount.setParam({ ...value })
    queryExceptionCount.excute(
      res => {
        let pageOne = self.state.pageOne || {}
        pageOne.totalCount = res.totalCount || 0
        self.setState({
          pageOne: pageOne
        })
        // {
        //   "result":1,
        //   "totalCount":12000,
        // }
      },
      err => {
        console.log(err)
      }
    )
  }
  // 异常区域占比查询
  fetchQueryExceptionByArea(value) {
    // token	校验字符串	String	是	用于校验	123sdf234
    // province	省份	string	是		江苏
    // city	城市	string	否		南京
    // serialNum	巡检仪资产编号	string	否
    // trade	行业类型	int	否		1
    // exception	异常类型	int	否		1
    // startTime	开始时间	string	是		2017-03-03 10:10:10
    // endTime	结束时间	string	是		2017-03-05 10:10:10
    let self = this
    queryExceptionByArea.setParam({
      ...value
    })
    queryExceptionByArea.excute(
      res => {
        let pageOne = self.state.pageOne || {}
        pageOne.areaList = res.areaList || []
        self.setState({
          pageOne: pageOne
        })
        // {
        //   "result":1.
        //   "areaList":[
        //   {
        //     "area":"浦东新区,
        //     "areaCount": 200
        //   },
        //     {
        //     "area":"黄浦区",
        //     "areaCount"; 300
        //   }
        //   ]
        // }
      },
      err => {
        console.log(err)
      }
    )
  }

  // 异常事件数量变化趋势
  fetchQueryExceptionByTime(value) {
    // token	校验字符串	String	是	用于校验	123sdf234
    // province	省份	string	是		江苏
    // city	城市	string	否		南京
    // serialNum	巡检仪资产编号	string	否
    // trade	行业类型	int	否		1
    // exception	异常类型	int	否		1
    // startTime	开始时间	string	是		2017-03-03 10:10:10
    // endTime	结束时间	string	是		2017-03-05 10:10:10
    let self = this
    queryExceptionByTime.setParam({
      ...value
    })
    queryExceptionByTime.excute(
      res => {
        let pageOne = self.state.pageOne || {}
        pageOne.periodList = res.periodList || []
        self.setState({
          pageOne: pageOne
        })
        // {
        //   "result":1.
        //   "periodList":[
        //     {
        //       "period":"2017-03-01",
        //       "periodCount":200
        //     },
        //        {
        //       "period":"2017-03-02",
        //       "periodCount":300
        //     }
        //     ]
        // }
      },
      err => {
        console.log(err)
      }
    )
  }

  // 行业分布信息查询
  fetchQueryExceptionByTrade(value) {
    // token	校验字符串	String	是	用于校验	123sdf234
    // province	省份	string	是		江苏
    // city	城市	string	否		南京
    // serialNum	巡检仪资产编号	string	否
    // trade	行业类型	int	否		1
    // exception	异常类型	int	否		1
    // startTime	开始时间	string	是		2017-03-03 10:10:10
    // endTime	结束时间	string	是		2017-03-05 10:10:10
    let self = this
    queryExceptionByTrade.setParam({
      ...value
    })
    queryExceptionByTrade.excute(
      res => {
        let pageOne = self.state.pageOne || {}
        // pageOne.tradeList = res.tradeList || []
        pageOne.tradeList = res.periodList || []
        self.setState({
          pageOne: pageOne
        })
        // {
        //   "result":1.
        //   "tradeList":[
        //   {
        //     "trade":1,
        //     "tradeName":"大工业用电",
        //     "tradeCount":200
        //   },
        //   {
        //     "trade":2,
        //     "tradeName":"轻工业用电",
        //     "tradeCount": 100
        //   }
        //     ]
        // }
      },
      err => {
        console.log(err)
      }
    )
  }

  // 异常类型分布情况查询
  fetchQueryExceptionDetail(value) {
    // token	校验字符串	String	是	用于校验	123sdf234
    // province	省份	string	是		江苏
    // city	城市	string	否		南京
    // serialNum	巡检仪资产编号	string	否
    // trade	行业类型	int	否		1
    // exception	异常类型	int	否		1
    // startTime	开始时间	string	是		2017-03-03 10:10:10
    // endTime	结束时间	string	是		2017-03-05 10:10:10
    let self = this
    queryExceptionDetail.setParam({
      ...value
    })
    queryExceptionDetail.excute(
      res => {
        let pageOne = self.state.pageOne || {}
        pageOne.exceptionList = res.exceptionList || []
        self.setState({
          pageOne: pageOne
        })
        // {
        //   "result":1.
        //   "exceptionList":[
        //     {
        //       "exception":1,
        //       "name":"二次侧短路",
        //       "exceptionCount":20
        //     },
        //       {
        //     “exception":2,
        //     “name":"电能表计量示值错误",
        //     “exceptionCount":30
        //     }
        //     ]
        // }
      },
      err => {
        console.log(err)
      }
    )
  }

  // 异常信息表查询
  fetchQueryExceptionList(value) {
    // token	校验字符串	String	是	用于校验	123sdf234
    // province	省份	string	是		江苏
    // city	城市	string	否		南京
    // serialNum	巡检仪资产编号	string	否
    // trade	行业类型	int	否		1
    // exception	异常类型	int	否		1
    // startTime	开始时间	string	是		2017-03-03 10:10:10
    // endTime	结束时间	string	是		2017-03-05 10:10:10
    // pageNo	页码	int	否		1
    let self = this
    value.pageNo = 1
    queryExceptionList.setParam({
      ...value
    })
    queryExceptionList.excute(
      res => {
        let pageOne = self.state.pageOne || {}
        pageOne.dataList = res.dataList || []
        self.setState({
          pageOne: pageOne
        })
        // totalPage	总页数	int	是
        // currentPage	当前页数	int	是
        // username	户名	string	是
        // place	所属地	string	是
        // serialNum	巡检仪资产编号	string	是
        // elecSerialNum	电能表资产编号	string	是
        // trade	行业类别	string	是
        // exception	异常类型	int
        // occTime	异常日期	string	是
        // recoverTime	恢复日期	string	是
        // {
        //     "result":1,
        //     "totalPage":3,
        //     "currentPage":1,
        //     "dataList":[
        //     {
        //         "username":"张三",
        //         "place":"南京市",
        //         "serialNum":"SN1234325",
        //         "elecSerialNum":"SN1234325",
        //         "trade":"大工业用电",
        //         "exception":1,
        //         "occTime":"2017-10-10",
        //         "recoverTime":"2017-10-11'
        //     },
        //     {
        //         "username":"李四",
        //         "place":"南京市",
        //         "serialNum":"SN1234322",
        //         "elecSerialNum":"SN1234325",
        //         "trade":"轻工业用电",
        //         "exception":2,
        //         "occTime":"2017-10-10",
        //         "recoverTime":"2017-10-11'
        //     }
        // ]
        // }
      },
      err => {
        console.log(err)
      }
    )
  }

  /*
    *  二次回路单-异常分析2
    */

  // 电流分析对比查询
  fetchQueryElecCurrentData(params) {
    const self = this
    queryElecCurrentData.setParam({
      ...params
    })
    queryElecCurrentData.excute(
      res => {
        const elecCurrentData = res.data || {}
        let pageTwo = this.state.pageTwo || {}
        pageTwo.xmdData = resData
        self.setState({
          pageTwo
        })
        // {
        //     "result":1,
        //     "xmdData":[
        //     {
        //         "phase":"A相",
        //         "pointList":[0.5,0.6,.....,0.9]
        // },
        //     {
        //         "phase ":" B相",
        //         "pointList":[0.5,0.6,.....,0.9]
        //     }
        // ],
        //     "elecData":[
        //     {
        //         "phase":"A相",
        //         "pointList":[0.5,0.6,.....,0.9]
        // },
        //     {
        //         "phase ":" B相",
        //         "pointList":[0.5,0.6,.....,0.9]
        //     }
        // ]
        // }
      },
      err => {
        console.log(err)
      }
    )
  }
  // 巡检仪上报事件查询
  fetchQueryXMDEvent(params) {
    const self = this
    let data = JSON.parse(JSON.stringify(params))
    data.occTime = ''
    queryXMDEvent.setParam({
      ...data
    })
    queryXMDEvent.excute(
      res => {
        const resData = res.data || {}
        let pageTwo = this.state.pageTwo || {}
        pageTwo.xmdEventData = resData
        self.setState({
          pageTwo
        })
        // {
        //     "result":1,
        //     "xmdData":[
        //     {
        //         "exception":"表示值不平",
        //         "event":"发生",
        //         "eventTime":"　2018-06-01 0:33:55",
        //         "phaseA":0,
        //         "phaseB":0,
        //         "phaseC":1
        //     },
        //     {
        //         "exception":"电能表飞走",
        //         "event":"发生",
        //         "eventTime":"　2018-06-01 0:33:55",
        //         "phaseA":0,
        //         "phaseB":0,
        //         "phaseC":1
        //     }
        // ]
        // }
      },
      err => {
        console.log(err)
      }
    )
  }
  // 电能表上报事件查询
  fetchQueryElecEvent(params) {
    const self = this
    let data = JSON.parse(JSON.stringify(params))
    data.occTime = ''
    queryElecEvent.setParam({
      ...data
    })
    queryElecEvent.excute(
      res => {
        const resData = res.data || {}
        let pageTwo = this.state.pageTwo || {}
        pageTwo.eleEventData = resData
        self.setState({
          pageTwo
        })
        // {
        //     "result":1,
        //     "elecData":[
        //     {
        //         "exception":"表示值不平",
        //         "event":"发生",
        //         "eventTime":"　2018-06-01 0:33:55",
        //         "phaseA":0,
        //         "phaseB":0,
        //         "phaseC":1
        //     },
        //       {
        //         "exception":"电能表飞走",
        //         "event":"发生",
        //         "eventTime":"　2018-06-01 0:33:55",
        //         "phaseA":0,
        //         "phaseB":0,
        //         "phaseC":1
        //     }
        //      ]
        // }
      },
      err => {
        console.log(err)
      }
    )
  }
  // 电量数据查询
  fetchQueryElecData(params) {
    const self = this
    // 这里是点击当前行的的数据
    // 参数	参数名称	类型	必填	描述	范例
    // token	校验字符串	String	是	用于校验	123sdf234
    // serialNum	巡检仪资产编号	string	是
    // elecSerialNum	电能表资产编号	string	是		1
    // occTime	异常发生时间	string	是
    // pageOne.exceptionList = resData 列表第一条数据
    queryElecData.setParam({
      ...params
    })
    queryElecData.excute(
      res => {
        const resData = res.data || {}
        let pageTwo = this.state.pageTwo || {}
        pageTwo.elecDayData = resData
        self.setState({
          pageTwo
        })
        // {
        //     "result":1,
        //     "elecData":[
        //     {
        //         "time ":"　2018-06-01",
        //         "activePower":100,
        //         "reactivePower":100
        //     },
        //       {
        //         "time ":"　2018-06-02",
        //         "activePower":100,
        //         "reactivePower":100
        //     },
        //     {
        //         "time ":"　2018-06-03",
        //         "activePower":100,
        //         "reactivePower":100
        //     },
        //       {
        //         "time ":"　2018-06-04",
        //         "activePower":100,
        //         "reactivePower":100
        //     },
        //     {
        //         "time ":"　2018-06-05",
        //         "activePower":100,
        //         "reactivePower":100
        //     }
        //      ]
        // }
      },
      err => {
        console.log(err)
      }
    )
  }

  renderSearchBar() {
    const { provinceOpts, cityOpts, unusalOpts, tradeOpts } =
      this.state.searchOptions || {}

    if (!this.state.searchOptions) {
      return false
    }
    const barOptions = {
      locationData: {
        title: '安装地点',
        province: {
          options: provinceOpts,
          key: 'province'
        },
        city: {
          options: cityOpts,
          key: 'city'
        }
      },
      inputData: {
        title: '巡检仪资产编号',
        key: 'xmdId',
        placeholder: '请输入资产编号'
      },
      tradeData: {
        title: '行业类型',
        key: 'trade',
        options: tradeOpts
      },
      unusualData: {
        title: '异常类型',
        key: 'unusual',
        options: unusalOpts
      },
      dateData: {
        title: '上报时间',
        defaultTime: this.indata.defaultTime
      },

      searchHandle: this.search.bind(this)
    }
    return <SearchBar {...barOptions} />
  }
  //切换轮播的回调,idx:当前轮播的页面idx
  afterSlickChange(idx) {}

  renderPageOne() {
    // 正式数据
    // debugger
    let {
      totalCount, // 二次回路异常事件统计
      areaList, // 异常区域占比查询
      periodList, //异常事件数量变化趋势
      tradeList, // 行业分布信息查询
      exceptionList // 异常类型分布情况查询
    } = this.state.pageOne || {}
    let domHeight = $('.page-main').height()
    let loop_content = $('#eventAccount').height() - 20 // 算出表格高度
    let tradeListChartsHeight = $('#tradeListChartsHeight').height() - 20 - 30 // 图表高度
    let periodListCharts = {} // 异常事件数量变化趋势
    let tradeListCharts = {} // 异常事件行业分布信息
    let exceptionListCharts = {} // 异常事件类型信息
    let areaListCharts = {} // 区域占比

    let _this = this
    if (!tradeListChartsHeight) {
      let time = setTimeout(function() {
        _this.forceUpdate()
      }, 0)
    }

    let {
      // totalCount, // 二次回路异常事件统计
      // areaList, // 异常区域占比查询
      // periodList, //异常事件数量变化趋势
      // tradeList // 行业分布信息查询
      // exceptionList // 异常类型分布情况查询
    } = Mock

    periodListCharts = {
      data: periodList,
      type: 'area',
      height: loop_content,
      xAxis: 'period',
      yAxis: 'periodCount',
      xLabel: '异常事件数量',
      yLabel: '异常事件数量',
      forceFit: true,
      padding: 'auto',
      style: {
        overflow: 'hidden'
      },
      xLabel: {
        offset: 15
      },
      yLabel: {
        offset: 5
      }
    }
    tradeListCharts = {
      data: tradeList,
      height: tradeListChartsHeight,
      xAxis: 'tradeName',
      yAxis_line: 'tradeCount',
      yAxis_line_name: '异常数量',
      yAxis_interval: 'trade',
      yAxis_interval_name: '异常名称',
      forceFit: true,
      padding: 'auto',
      cols: {
        tradeCount: {
          min: 0
        }
      },
      style: {
        overflow: 'hidden'
      },
      xLabel: {
        offset: 15
      },
      yLabel: {
        offset: 5
      }
    }
    exceptionListCharts = {
      data: exceptionList,
      height: tradeListChartsHeight,
      xAxis: 'name',
      yAxis: 'exceptionCount',
      forceFit: true,
      padding: 'auto',
      style: {
        overflow: 'hidden'
      },
      xLabel: {
        offset: 15
      },
      yLabel: {
        offset: 5
      }
    }
    // 区域占比
    areaListCharts = {
      data: areaList,
      height: loop_content,
      forceFit: true,
      padding: 'auto',
      radius: 1,
      innerRadius: 0.7,
      field: 'areaCount',
      dimension: 'area',
      cols: {
        percent: {
          formatter: val => {
            val = (val * 100).toFixed(0) + '%'
            return val
          }
        }
      }
    }
    loop_content = loop_content ? loop_content : 0
    domHeight = domHeight ? domHeight : 0
    return (
      <div className="SecondaryLoopLeft content" style={{ height: domHeight }}>
        <div className="SecondaryLoopLeft_left">
          <div className="content_box">
            <div className="loop_top" id="eventAccount">
              <div className="loop_top_left">
                <div className="content_title">二次回路异常事件统计</div>
                <div className="blue_underline" />
                <div
                  className="loop_content loop_number"
                  style={{
                    height: loop_content,
                    lineHeight: `${loop_content}px`,
                    fontSize: `${loop_content / 6}px`
                  }}
                >
                  {String(totalCount).replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')}
                  <span className="text-white">&nbsp;件</span>
                </div>
              </div>
              <div className="loop_top_right">
                <div className="content_title no_border_left">区域占比</div>
                <div className="blue_underline" />
                <div className="loop_content">
                  <Labelline {...areaListCharts} />
                </div>
              </div>
            </div>
            <div className="loop_bottom">
              <div className="content_title">异常事件数量变化趋势</div>
              <Basicline {...periodListCharts} />
            </div>
          </div>
        </div>
        <div className="SecondaryLoopLeft_right">
          <div className="event">
            <div className="event_top">
              <div className="content_box" id="tableHeight">
                {this.renderTable()}
              </div>
            </div>
            <div className="event_bottom" id="tradeListChartsHeight">
              <div className="event_bottom_left">
                <div className="content_box">
                  <div className="content_title">异常事件行业分布信息</div>
                  <div className="event-table">
                    <Doubleaxes {...tradeListCharts} />
                  </div>
                </div>
              </div>
              <div className="event_bottom_right">
                <div className="content_box">
                  <div className="content_title">异常事件类型信息</div>
                  <div className="event-table">
                    <Basicbar {...exceptionListCharts} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderPageTwo() {
    // 正式数据
    // let {
    // elecCurrentData, // 电流分析对比查询
    // xmdEventData, // 巡检仪上报事件查询
    // eleEventData, // 电能表上报事件查询
    // elecDayData, // 电量数据查询
    // exceptionList, // 异常类型分布情况查询
    // } = this.state.pageTwo || {};
    let domHeight = $('.page-main').height() // tab页面的高度
    let chartsEleA = {} // 电流分析对比查询 图表A
    let chartsEleB = {} // 电流分析对比查询 图表B
    let chartsEleC = {} // 电流分析对比查询 图表C
    let chartsEleHeight =
      ($('.SecondaryLoopRight_left').height() - 60 - 45 - 30) / 3 // 电流分析对比查询 高度
    let chartsEleChange = {} // 电量变化图表
    let chartsEleChangeHeight = $('.chartsEleChangeHeight').height() - 40 // 电量变化图表 高度

    let _this = this
    if (!chartsEleChangeHeight) {
      let time = setTimeout(function() {
        _this.forceUpdate()
      }, 0)
    }
    let {
      elecCurrentData, // 电流分析对比查询
      xmdEventData, // 巡检仪上报事件查询
      eleEventData, // 电能表上报事件查询
      elecDayData // 电量数据查询
    } = Mock

    // let dataA = elecCurrentData.xmdData
    //   .filter(item => {
    //     return item.phase === 'A相'
    //   })
    //   .concat(
    //     elecCurrentData.elecData.filter(item => {
    //       return item.phase === 'A相'
    //     })
    //   )
    // console.log(dataA)
    // 电流分析对比查询 图表A
    chartsEleA = {
      data: Mock.testData,
      height: chartsEleHeight,
      xAxis: 'month',
      yAxis: 'temperature',
      // doubletype: 'type',
      doubletype: ['type', ['#ff0000', '#00ff00']],
      doubleLine: true,
      forceFit: true,
      padding: 'auto',
      style: {
        overflow: 'hidden'
      },
      xLabel: {
        offset: 15
      },
      yLabel: {
        offset: 5
      }
    }
    // 电流分析对比查询 图表B
    chartsEleB = {
      // data:yearCountData,
      data: Mock.charts2,
      type: 'area',
      height: chartsEleHeight,
      xAxis: 'year',
      yAxis: 'count',
      forceFit: true,
      padding: 'auto',
      cols: {
        year: {
          tickInterval: 1
        }
      },
      style: {
        overflow: 'hidden'
      },
      xLabel: {
        offset: 15
      },
      yLabel: {
        offset: 5
      }
    }
    // 电流分析对比查询 图表C
    chartsEleC = {
      // data:yearCountData,
      data: Mock.charts2,
      type: 'area',
      height: chartsEleHeight,
      xAxis: 'year',
      yAxis: 'count',
      doubleLine: true,
      forceFit: true,
      padding: 'auto',
      style: {
        overflow: 'hidden'
      },
      xLabel: {
        offset: 15
      },
      yLabel: {
        offset: 5
      }
    }
    chartsEleChange = {
      data: elecDayData,
      height: chartsEleChangeHeight,
      xAxis: 'time',
      yAxis: 'activePower',
      forceFit: true,
      padding: 'auto',
      style: {
        overflow: 'hidden'
      },
      xLabel: {
        offset: 15
      },
      yLabel: {
        offset: 5
      }
    } // 电量变化图表
    return (
      <div className="SecondaryLoopRight content" style={{ height: domHeight }}>
        <div className="SecondaryLoopRight_left">
          <div className="content_box">
            <div className="content_title">电流对比分析</div>
            <div className="ele_charts">
              <p className="ele_charts_title">A组</p>
              <Basicline {...chartsEleA} />
            </div>
            <div className="ele_charts">
              <p className="ele_charts_title">A组</p>
              <Basicline {...chartsEleB} />
            </div>
            <div className="ele_charts">
              <p className="ele_charts_title">A组</p>
              <Basicline {...chartsEleC} />
            </div>
          </div>
        </div>
        <div className="SecondaryLoopRight_right">
          <div className="event">
            <div className="event_top">
              <div className="content_box">{this.renderTable()}</div>
            </div>
            <div className="event_bottom">
              <div className="event_bottom_left">
                <div className="content_box">
                  <div className="content_title">事件信息</div>
                  <div className="event-table">
                    <ul>
                      {xmdEventData.map((item, index) => {
                        return (
                          <li key={index}>
                            <div className="title">巡检仪上报事件</div>
                            <div className="blue_underline" />
                            <ul className="event_report">
                              <li>异常类型 : {item.exception}</li>
                              <li>事件状态 : {item.event}</li>
                              <li>事件发生时间 : {item.eventTime}</li>
                              <li>
                                A相异常 : {item.phaseA ? '发生' : '未发生'}
                              </li>
                              <li>
                                B相异常 : {item.phaseB ? '发生' : '未发生'}
                              </li>
                              <li>
                                C相异常 : {item.phaseC ? '发生' : '未发生'}
                              </li>
                            </ul>
                          </li>
                        )
                      })}
                    </ul>
                    <ul>
                      {eleEventData.map((item, index) => {
                        return (
                          <li key={index}>
                            <div className="title">电能表上报事件</div>
                            <div className="blue_underline" />
                            <ul className="event_report">
                              <li>异常类型 : {item.exception}</li>
                              <li>事件状态 : {item.event}</li>
                              <li>事件发生时间 : {item.eventTime}</li>
                              <li>
                                A相异常 : {item.phaseA ? '发生' : '未发生'}
                              </li>
                              <li>
                                B相异常 : {item.phaseB ? '发生' : '未发生'}
                              </li>
                              <li>
                                C相异常 : {item.phaseC ? '发生' : '未发生'}
                              </li>
                            </ul>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="event_bottom_center ">
                <div className="content_box chartsEleChangeHeight">
                  <div className="content_title">电量变化</div>
                  <div className="event-table">
                    <Basicline {...chartsEleChange} />
                  </div>
                </div>
              </div>
              <div className="event_bottom_right">
                <div className="content_box">
                  <div className="content_title">判定条件</div>
                  <div className="event-table" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderTable() {
    let columns = [
      {
        title: '所属城市',
        dataIndex: 'place',
        width: 60,
        align: 'center',
        key: 'place'
      },
      {
        title: '所属区县',
        dataIndex: 'region',
        width: 60,
        align: 'center',
        key: 'region'
      },
      {
        title: '巡检仪资产编号',
        dataIndex: 'serialNum',
        width: 60,
        align: 'center',
        key: 'serialNum'
      },
      {
        title: '电能表资产编号',
        dataIndex: 'elecSerialNum',
        width: 60,
        align: 'center',
        key: 'elecSerialNum'
      },
      {
        title: '户名',
        dataIndex: 'username',
        width: 60,
        align: 'center',
        key: 'username'
      },
      {
        title: '用电类型',
        dataIndex: 'trade',
        width: 60,
        align: 'center',
        key: 'trade'
      },
      {
        title: '异常类型',
        dataIndex: 'name',
        width: 60,
        key: 'name',
        align: 'center'
      },
      {
        title: '异常日期',
        dataIndex: 'occTime',
        width: 60,
        align: 'center',
        key: 'occTime'
      },
      {
        title: '恢复日期',
        dataIndex: 'recoverTime',
        width: 60,
        align: 'center',
        key: 'recoverTime'
      }
    ]
    // 正式数据
    let {
      dataList // 异常信息表查询
    } = this.state.pageOne || []
    // let {
    //   dataList // 异常信息表查询
    // } = Mock

    let tableData = dataList
    Array.isArray(tableData) &&
      tableData.map((item, index) => {
        return (item.key = index)
      })
    let tableHeight = $('#tableHeight').height() - 60 // table表格的高度
    let self = this

    $('.scrollTable .ant-table-body').on('scroll', function() {
      let viewH = $(this).height(),
        contentH = $(this)
          .children()
          .height(),
        scrollTop = $(this).scrollTop(),
        distance = 100

      console.log('viewH' + viewH)
      console.log('contentH' + contentH)
      console.log('scrollTop' + scrollTop)

      // if (contentH - viewH - scrollTop <= distance) {
      //   //到达底部100px时,加载新内容
      //   // 这里加载数据..
      //   console.log('加载数据')
      //   console.log(dataList)
      //   self.fetchPageTwo(value)
      // }
    })

    return (
      <div>
        <div className="content_title">二次回路异常事件</div>
        <div className="content-table">
          <Table
            className={'scrollTable'}
            columns={columns}
            dataSource={tableData}
            pagination={false}
            scroll={{ y: tableHeight }}
            onRow={record => {
              return {
                onClick: () => {
                  let pageTwo = self.state.pageTwo || {}
                  pageTwo.record = record
                  self.setState({
                    pageTwo
                  })
                  self.fetchrowCLick(record)
                }
              }
            }}
          />
        </div>
      </div>
    )
  }
  renderMain() {
    var settings = {
      dots: false,
      autoplay: false,
      arrows: false,
      infinite: true,
      speed: 500,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1,
      touchMove: true,
      afterChange: this.afterSlickChange.bind(this)
    }
    return (
      <div className="page-slick page-SecondaryLoopLeft">
        <h1 className="page-title">{this.state.pageTitle}</h1>
        <div className="slick-btn">
          <div className={this.state.pageIdx == 0 ? 'btn ' : 'btn'} />
          <div className={this.state.pageIdx == 0 ? 'btn' : ' btn'} />
        </div>
        {this.renderSearchBar()}
        <div className="page-main slider_content">
          <Slider {...settings}>
            <div className="slider_sec ">{this.renderPageOne()}</div>
            <div className="slider_sec">{this.renderPageTwo()}</div>
          </Slider>
        </div>
      </div>
    )
  }
}

module.exports = SecondaryLoop
