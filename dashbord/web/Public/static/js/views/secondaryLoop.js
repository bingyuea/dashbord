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
      pageTitle: '二次回路单-异常分析'
    }
  }

  componentDidMount() {
    // this.pageInit();
    this.setState({
      pageStatus: 'init'
    })
  }

  pageInit() {
    this.fetchQueryExceptionCount()
    this.fetchQueryExceptionByArea()
    this.fetchQueryExceptionByTime()
    this.fetchQueryExceptionByTrade()
    this.fetchQueryExceptionDetail()
    this.fetchQueryExceptionList()
    /*
        *  二次回路单-异常分析2
        */
    // 电流分析对比查询
    this.fetchQueryElecCurrentData()
    // 巡检仪上报事件查询
    this.fetchQueryXMDEvent()
    // 电能表上报事件查询
    this.fetchQueryElecEvent()
    // 电量数据查询
    this.fetchQueryElecData()
  }

  // 异常事件总数查询
  fetchQueryExceptionCount(token) {
    const self = this
    const searchValue = this.state.searchValue
    queryExceptionCount.setParam({
      token: token,
      province: searchValue.province,
      city: searchValue.city,
      serialNum: searchValue.serialNum,
      trade: searchValue.trade,
      exception: searchValue.exception,
      startTime: searchValue.startTime,
      endTime: searchValue.endTime
    })
    queryExceptionCount.excute(
      res => {
        const resData = res.data || {}
        const totalCount = resData.totalCount || 0
        self.setState({
          totalCount
        })
      },
      err => {
        console.log(err)
      }
    )
  }

  // 异常区域占比查询
  fetchQueryExceptionByArea(token) {
    const self = this
    const searchValue = this.state.searchValue
    queryExceptionByArea.setParam({
      token: token,
      province: searchValue.province,
      city: searchValue.city,
      serialNum: searchValue.serialNum,
      trade: searchValue.trade,
      exception: searchValue.exception,
      startTime: searchValue.startTime,
      endTime: searchValue.endTime
    })
    queryExceptionByArea.excute(
      res => {
        const resData = res.data || {}
        const areaList = resData.areaList || []
        // "areaList":[
        //         {
        //             "area":"浦东新区,
        //             "areaCount": 200
        //         },
        //         {
        //             "area":"黄浦区",
        //             "areaCount"; 300
        // }
        // ]
        self.setState({
          areaList
        })
      },
      err => {
        console.log(err)
      }
    )
  }

  // 异常事件数量变化趋势
  fetchQueryExceptionByTime(token) {
    const self = this
    const searchValue = this.state.searchValue
    queryExceptionByTime.setParam({
      token: token,
      province: searchValue.province,
      city: searchValue.city,
      serialNum: searchValue.serialNum,
      trade: searchValue.trade,
      exception: searchValue.exception,
      startTime: searchValue.startTime,
      endTime: searchValue.endTime
    })
    queryExceptionByTime.excute(
      res => {
        const resData = res.data || {}
        const periodList = resData.periodList || []
        //  "periodList":[
        // {
        // 	"period":"2017-03-01",
        // 	"periodCount":200
        // },
        // 	{
        // 	"period":"2017-03-02",
        // 	"periodCount":300
        // }
        // ]
        self.setState({
          periodList
        })
      },
      err => {
        console.log(err)
      }
    )
  }

  // 行业分布信息查询
  fetchQueryExceptionByTrade(token) {
    const self = this
    const searchValue = this.state.searchValue
    queryExceptionByTrade.setParam({
      token: token,
      province: searchValue.province,
      city: searchValue.city,
      serialNum: searchValue.serialNum,
      trade: searchValue.trade,
      exception: searchValue.exception,
      startTime: searchValue.startTime,
      endTime: searchValue.endTime
    })
    queryExceptionByTrade.excute(
      res => {
        const resData = res.data || {}
        const tradeList = resData.tradeList || []
        // "tradeList":[
        //     {
        //         "trade":1,
        //         "tradeName":"大工业用电",
        //         "tradeCount":200
        //     },
        //     {
        //         "trade":2,
        //         "tradeName":"轻工业用电",
        //         "tradeCount": 100
        //     }
        // ]
        self.setState({
          tradeList
        })
      },
      err => {
        console.log(err)
      }
    )
  }

  // 异常类型分布情况查询
  fetchQueryExceptionDetail(token) {
    const self = this
    const searchValue = this.state.searchValue
    queryExceptionDetail.setParam({
      token: token,
      province: searchValue.province,
      city: searchValue.city,
      serialNum: searchValue.serialNum,
      trade: searchValue.trade,
      exception: searchValue.exception,
      startTime: searchValue.startTime,
      endTime: searchValue.endTime
    })
    queryExceptionDetail.excute(
      res => {
        const resData = res.data || {}
        const exceptionList = resData.exceptionList || []
        //     "exceptionList":[
        //         {
        //             "exception":1,
        //             "name":"二次侧短路",
        //             "exceptionCount":20
        //         },
        //         {
        // “except ion":2,
        // “name":"电能表计量示值错误",
        // “exceptionCount":30
        // }
        // ]
        self.setState({
          exceptionList
        })
      },
      err => {
        console.log(err)
      }
    )
  }

  // 异常信息表查询
  fetchQueryExceptionList(token) {
    const self = this
    const searchValue = this.state.searchValue
    queryExceptionList.setParam({
      token: token,
      province: searchValue.province,
      city: searchValue.city,
      serialNum: searchValue.serialNum,
      trade: searchValue.trade,
      exception: searchValue.exception,
      startTime: searchValue.startTime,
      endTime: searchValue.endTime
    })
    queryExceptionList.excute(
      res => {
        const resData = res.data || {}
        const dataList = resData.dataList || []
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
        self.setState({
          dataList
        })
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
  fetchQueryElecCurrentData(token) {
    const self = this
    // 这里是点击当前行的的数据
    const searchValue = this.state.searchValue
    queryElecCurrentData.setParam({
      token: token,
      serialNum: searchValue.serialNum,
      elecSerialNum: searchValue.elecSerialNum,
      occTime: searchValue.occTime
    })
    queryElecCurrentData.excute(
      res => {
        const elecCurrentData = res.data || {}
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
        self.setState({
          elecCurrentData
        })
      },
      err => {
        console.log(err)
      }
    )
  }
  // 巡检仪上报事件查询
  fetchQueryXMDEvent(token) {
    const self = this
    // 这里是点击当前行的的数据
    const searchValue = this.state.searchValue
    queryXMDEvent.setParam({
      token: token,
      serialNum: searchValue.serialNum,
      elecSerialNum: searchValue.elecSerialNum
    })
    queryXMDEvent.excute(
      res => {
        const resData = res.data || {}
        const xmdEventData = resData.xmdData || []
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
        self.setState({
          xmdEventData
        })
      },
      err => {
        console.log(err)
      }
    )
  }
  // 电能表上报事件查询
  fetchQueryElecEvent(token) {
    const self = this
    // 这里是点击当前行的的数据
    const searchValue = this.state.searchValue
    queryElecEvent.setParam({
      token: token,
      serialNum: searchValue.serialNum,
      elecSerialNum: searchValue.elecSerialNum
    })
    queryElecEvent.excute(
      res => {
        const resData = res.data || {}
        const eleEventData = resData.elecData || []
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
        self.setState({
          eleEventData
        })
      },
      err => {
        console.log(err)
      }
    )
  }
  // 电量数据查询
  fetchQueryElecData(token) {
    const self = this
    // 这里是点击当前行的的数据
    const searchValue = this.state.searchValue
    // 参数	参数名称	类型	必填	描述	范例
    // token	校验字符串	String	是	用于校验	123sdf234
    // serialNum	巡检仪资产编号	string	是
    // elecSerialNum	电能表资产编号	string	是		1
    // occTime	异常发生时间	string	是
    queryElecData.setParam({
      token: token,
      serialNum: searchValue.serialNum,
      elecSerialNum: searchValue.elecSerialNum,
      occTime: searchValue.occTime
    })
    queryElecData.excute(
      res => {
        const resData = res.data || {}
        const elecDayData = resData.elecData || []
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
        self.setState({
          elecDayData
        })
      },
      err => {
        console.log(err)
      }
    )
  }

  search(value) {
    console.log(value)
    this.setState({
      searchValue: value
    })
  }

  renderSearchBar() {
    const barOptions = {
      locationData: {
        title: '安装地点',
        province: {
          options: [
            {
              value: '上海',
              desc: '上海'
            },
            {
              value: '江苏',
              desc: '江苏'
            }
          ],
          key: 'province'
        },
        city: {
          options: [
            {
              value: '南京',
              desc: '南京'
            },
            {
              value: '苏州',
              desc: '苏州'
            }
          ],
          key: 'city'
        }
      },
      measureData: {
        title: '计量类型',
        key: 'measure',
        options: [
          {
            value: 1,
            desc: '三相三线'
          },
          {
            value: 2,
            desc: '三相四线'
          }
        ]
      },
      tradeData: {
        title: '行业类型',
        key: 'trade',
        options: [
          {
            value: 1,
            desc: '三相三线'
          },
          {
            value: 2,
            desc: '三相四线'
          }
        ]
      },
      unusualData: {
        title: '异常类型',
        key: 'unusual',
        options: [
          {
            value: 1,
            desc: '三相三线'
          },
          {
            value: 2,
            desc: '三相四线'
          }
        ]
      },
      dateData: {
        title: '上报时间'
      },
      inputData: {
        title: '巡检仪资产编号',
        key: 'xmdId',
        placeholder: '请输入资产编号'
      },
      searchHandle: this.search.bind(this)
    }

    return <SearchBar {...barOptions} />
  }

  renderPageOne() {
    let [
      domHeight,
      loop_content, // 算出表格高度
      tradeListChartsHeight, // 图表高度
      periodListCharts, // 异常事件数量变化趋势
      tradeListCharts, // 异常事件行业分布信息
      exceptionListCharts, // 异常事件类型信息
      areaListCharts // 区域占比
    ] = [
      $('.page-main').height(),
      $('#eventAccount').height() - 20, // 算出表格高度
      $('#tradeListChartsHeight').height() - 20 - 30, // 图表高度
      {}, // 异常事件数量变化趋势
      {}, // 异常事件行业分布信息
      {}, // 异常事件类型信息
      {} // 区域占比
    ]
    let _this = this
    if (!tradeListChartsHeight) {
      let time = setTimeout(function() {
        _this.forceUpdate()
      }, 0)
    }
    // 正式数据
    // let {
    //     totalCount,// 二次回路异常事件统计
    //     areaList, // 异常区域占比查询
    //     periodList, //异常事件数量变化趋势
    //     tradeList, // 行业分布信息查询
    //     exceptionList, // 异常类型分布情况查询
    //     elecCurrentData,// 电流分析对比查询
    // } = this.state;
    let {
      totalCount, // 二次回路异常事件统计
      areaList, // 异常区域占比查询
      periodList, //异常事件数量变化趋势
      tradeList, // 行业分布信息查询
      exceptionList, // 异常类型分布情况查询
      elecCurrentData // 电流分析对比查询
    } = Mock
    periodListCharts = {
      data: periodList,
      type: 'area',
      height: loop_content,
      xAxis: 'period',
      yAxis: 'periodCount',
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
      yAxis_line_name: '占比',
      yAxis_interval: 'trade',
      yAxis_interval_name: '行业',
      forceFit: true,
      padding: 'auto',
      cols: {
        tradeName: {
          min: 0
        },
        tradeCount: {
          min: 0
        },
        trade: {
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
      // data: Mock.charts5,
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
                    lineHeight: `${loop_content}px`
                  }}
                >
                  {String(totalCount).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}
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
    let [
      domHeight, // tab页面的高度
      chartsEleA, // 电流分析对比查询 图表A
      chartsEleB, // 电流分析对比查询 图表B
      chartsEleC, // 电流分析对比查询 图表C
      chartsEleHeight, // 电流分析对比查询 高度
      chartsEleChange, // 电量变化图表
      chartsEleChangeHeight // 电量变化图表 高度
    ] = [
      $('.page-main').height(), // tab页面的高度
      {},
      {},
      {},
      ($('.SecondaryLoopRight_left').height() - 60 - 45 - 30) / 3, // 电流分析对比查询 高度
      {}, // 电量变化图表
      $('.chartsEleChangeHeight').height() - 40 // 电量变化图表 高度
    ]
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
    let dataA = elecCurrentData.xmdData
      .filter(item => {
        return item.phase === 'A相'
      })
      .concat(
        elecCurrentData.elecData.filter(item => {
          return item.phase === 'A相'
        })
      )
    chartsEleA = {
      data: Mock.charts2,
      height: chartsEleHeight,
      xAxis: 'phase',
      xAxisDouble: 'phase',
      yAxis: 'pointList',
      yAxisDouble: 'pointList',
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
    // 电流分析对比查询 图表A
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
    } // 电流分析对比查询 图表B
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
    } // 电流分析对比查询 图表C
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
        title: '所属地区',
        dataIndex: 'place',
        width: 60,
        align: 'center',
        key: 'place'
      },
      // {
      //     title: '所属县市',
      //     dataIndex: 'kong',
      // },
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
        dataIndex: 'exception',
        width: 60,
        key: 'exception',
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
    // let {
    //     dataList, // 异常信息表查询
    // } = this.state;
    let {
      dataList // 异常信息表查询
    } = Mock
    let tableData = dataList.dataList
    tableData.map((item, index) => {
      return (item.key = index)
    })
    let tableHeight = $('#tableHeight').height() - 60 // table表格的高度
    return (
      <div>
        <div className="content_title">二次回路异常事件</div>
        <div className="content-table">
          <Table
            columns={columns}
            dataSource={tableData}
            pagination={false}
            scroll={{ y: tableHeight }}
            onRow={record => {
              return {
                onClick: () => {
                  console.log(record)
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
      dotsClass: 'slick-dots slick-thumb item_box',
      autoplay: false,
      arrows: false,
      infinite: true,
      speed: 500,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1,
      touchMove: true
    }
    return (
      <div className="page-slick page-SecondaryLoopLeft">
        <h1 className="page-title">{this.state.pageTitle}</h1>
        <div className="slick-btn">
          <div className="btn active" />
          <div className="btn" />
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
