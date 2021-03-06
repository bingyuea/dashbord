import React, { Component } from 'react'
import BaseView from '../core/view.base'
import $ from 'jquery'
import { Table } from 'antd'
//图表模型
import { Labelline, Basicline, Doubleaxes, Basicbar, Doubleline } from '../ui/ui.charts'

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

import { translateCountToPercent } from '../util/util'
import { Menu, Dropdown, Icon } from 'antd'

import MeunTitle from '../ui/ui.menuTitle'
import Slider from 'react-slick'
import DataServince from '../services/searchbar.services'
import moment from 'moment'
import { formatEleList } from '../util/util'

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
      pageTitle: '二次回路单一异常分析',
      pageIdx: 0
    }

    const dateFormat = 'YYYY-MM-DD HH:mm'
    const today = moment().format(dateFormat)
    const lastday = moment()
      .add(-1, 'days')
      .format(dateFormat)

    this.indata = {
      defaultTime: ['2001-01-01 00:00', today]
    }
  }

  componentDidMount() {
    // this.pageInit();
    this.setState({
      pageStatus: 'init'
    })
    const self = this
    DataServince.fetch(function (searchOptions) {
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

    this.setState({
      searchValue: _value,
      pageOne: null,
      pageTwo: null
    })
    this.fetchPageOne(_value)
    this.fetchPageTwo(_value)
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

  fetchrowCLick() {
    // pageOne.dataList = resData 列表第一条数据
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
    
    let self = this
    queryExceptionCount.setParam({ ...value }, true)
    queryExceptionCount.excute(
      res => {
        let pageOne = self.state.pageOne || {}
        pageOne.totalCount = res.totalCount || 0
        self.setState({
          pageOne: pageOne
        })
      },
      err => { }
    )
  }
  // 异常区域占比查询
  fetchQueryExceptionByArea(value) {
   
    let self = this
    queryExceptionByArea.setParam(
      {
        ...value
      },
      true
    )
    queryExceptionByArea.excute(
      res => {
        let pageOne = self.state.pageOne || {}
        pageOne.areaList = res.areaList || []
        self.setState({
          pageOne: pageOne
        })
      },
      err => { }
    )
  }

  // 异常事件数量变化趋势
  fetchQueryExceptionByTime(value) {
    
    let self = this
    queryExceptionByTime.setParam(
      {
        ...value
      },
      true
    )
    queryExceptionByTime.excute(
      res => {
        let pageOne = self.state.pageOne || {}
        pageOne.periodList = res.periodList || []
        self.setState({
          pageOne: pageOne
        })
      },
      err => { }
    )
  }

  // 行业分布信息查询
  fetchQueryExceptionByTrade(value) {
    
    let self = this
    queryExceptionByTrade.setParam(
      {
        ...value
      },
      true
    )
    queryExceptionByTrade.excute(
      res => {
        let pageOne = self.state.pageOne || {}
        // pageOne.tradeList = res.tradeList || []
        pageOne.tradeList = res.periodList || []
        self.setState({
          pageOne: pageOne
        })
      },
      err => { }
    )
  }

  // 异常类型分布情况查询
  fetchQueryExceptionDetail(value) {
    
    let self = this
    queryExceptionDetail.setParam(
      {
        ...value
      },
      true
    )
    queryExceptionDetail.excute(
      res => {
        let pageOne = self.state.pageOne || {}
        pageOne.exceptionList = res.exceptionList || []
        self.setState({
          pageOne: pageOne
        })
      },
      err => { }
    )
  }

  // 异常信息表查询
  fetchQueryExceptionList(value) {
    
    let self = this
    value.pageNo = 1
    queryExceptionList.setParam(
      {
        ...value
      },
      true
    )
    queryExceptionList.excute(
      res => {
        let pageOne = self.state.pageOne || {}
        pageOne.dataList = res.dataList || []
        self.setState(
          {
            pageOne: pageOne
          },
          () => {
            self.fetchrowCLick()
          }
        )
      },
      err => { }
    )
  }

  /*
    *  二次回路单-异常分析2
    */

  // 电流分析对比查询
  fetchQueryElecCurrentData(params) {
    const self = this
   
    queryElecCurrentData.setParam(
      {
        ...params
      },
      true
    )
    queryElecCurrentData.excute(
      res => {
        let pageTwo = this.state.pageTwo || {}
        pageTwo.elecCurrentData = res
        self.setState({
          pageTwo
        })
      },
      err => { }
    )
  }
  // 巡检仪上报事件查询
  fetchQueryXMDEvent(params) {
    const self = this
    let data = JSON.parse(JSON.stringify(params))
    
    queryXMDEvent.setParam(
      {
        ...data
      },
      true
    )
    queryXMDEvent.excute(
      res => {
        let pageTwo = this.state.pageTwo || {}
        pageTwo.xmdEventData = res
        self.setState({
          pageTwo
        })
      },
      err => { }
    )
  }
  // 电能表上报事件查询
  fetchQueryElecEvent(params) {
    const self = this
    let data = JSON.parse(JSON.stringify(params))
    
    queryElecEvent.setParam(
      {
        ...data
      },
      true
    )
    queryElecEvent.excute(
      res => {
        let pageTwo = this.state.pageTwo || {}
        pageTwo.eleEventData = res || {}
        self.setState({
          pageTwo
        })
      },
      err => { }
    )
  }
  // 电量数据查询
  fetchQueryElecData(params) {
    const self = this
    
    queryElecData.setParam(
      {
        ...params
      },
      true
    )
    queryElecData.excute(
      res => {
        let pageTwo = this.state.pageTwo || {}
        pageTwo.elecDayData = res
        self.setState({
          pageTwo
        })
      },
      err => { }
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
        key: 'serialNum',
        placeholder: '请输入资产编号'
      },
      tradeData: {
        title: '行业类型',
        key: 'trade',
        options: tradeOpts
      },
      unusualData: {
        title: '异常类型',
        key: 'exception',
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
    let loop_content = $('#eventAccount').height() - 40 // 算出表格高度
    let tradeListChartsHeight = $('#tradeListChartsHeight').height() - 20 - 30 // 图表高度
    let periodListCharts = {} // 异常事件数量变化趋势
    let tradeListCharts = {} // 异常事件行业分布信息
    let exceptionListCharts = {} // 异常事件类型信息
    let areaListCharts = {} // 区域占比

    let _this = this
    if (!tradeListChartsHeight) {
      let time = setTimeout(function () {
        _this.forceUpdate()
      }, 0)
    }

    periodListCharts = {
      data: periodList,
      type: 'area',
      height: loop_content,
      hidePoint: true,
      xAxis: 'period',
      yAxis: 'periodCount',
      xLabel: {
        offset: 15,
        textStyle: {
          fill: '#fff',
          fontSize: 10
        }
      },
      yLabel: {
        offset: 5,
        textStyle: {
          fill: '#fff',
          fontSize: 10
        }
      },
      cols: {
        periodCount: {
          tickCount: 5,
          alias: '数量'
        },
        period:{
          tickCount:2
        }

      },
      forceFit: true,
      padding: 'auto',
      style: {
        overflow: 'hidden'
      },
      xLabel: {
        offset: 15,
        textStyle: {
          fill: '#fff',
          fontSize: 10
        }
      },
      yLabel: {
        offset: 5,
        textStyle: {
          fill: '#fff',
          fontSize: 10
        }
      }
    }
    const _tradeList = translateCountToPercent(tradeList, 'tradeCount')
    tradeListCharts = {
      data: _tradeList,
      height: tradeListChartsHeight,
      xAxis: 'tradeName',
      yAxis_line: 'tradeCount',
      yAxis_line_name: '事件数量',
      yAxis_interval: 'percent',
      yAxis_interval_name: '事件占比',
      forceFit: true,
      padding: 'auto',
      cols: {
        tradeCount: {
          min: 0,
          alias: '数量'
        },
        percent: {
          tickCount: 5,
          alias: '占比',
          formatter: val => {
            val = val + '%'
            return val
          }
        }
      },
      style: {
        overflow: 'hidden'
      },
      xLabel: {
        offset: 15,
        textStyle: {
          fill: '#fff',
          fontSize: 10
        }
      },
      yLabel: {
        offset: 5,
        textStyle: {
          fill: '#fff',
          fontSize: 10
        }
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
        offset: 15,
        textStyle: {
          fill: '#fff',
          fontSize: 10
        }
      },
      yLabel: {
        offset: 5,
        textStyle: {
          fill: '#fff',
          fontSize: 10
        }
      }
    }
    // 区域占比
    areaListCharts = {
      data: areaList,
      height: loop_content,
      forceFit: true,
      hideLabel: true,
      padding: 'auto',
      radius: 1,
      innerRadius: 0.7,
      field: 'areaCount',
      dimension: 'area',
      innerText: '区域占比',
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
              <div className="small-title">
                <span className="arrow">&gt;&gt;</span>
                <div className="title">二次回路异常事件统计</div>
                <span className="arrow last">&gt;&gt;</span>
                <div className="blue-line" />
              </div>
              <div className="loop_top_content">
                <div className="loop_top_left">
                  <div
                    className="loop_content loop_number"
                    style={{
                      height: loop_content
                    }}
                  >
                    <p>
                      {String(totalCount || 0).replace(
                        /(\d)(?=(?:\d{3})+$)/g,
                        '$1,'
                      )}
                      <span className="text-white">&nbsp;件</span>
                    </p>
                  </div>
                </div>
                <div className="loop_top_right">
                  <div className="loop_content">
                    <Labelline {...areaListCharts} />
                  </div>
                </div>
              </div>
            </div>
            <div className="loop_bottom">
              <div className="small-title">
                <span className="arrow">&gt;&gt;</span>
                <div className="title">异常事件数量变化趋势</div>
                <span className="arrow last">&gt;&gt;</span>
                <div className="blue-line" />
              </div>
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
                  <div className="small-title">
                    <span className="arrow">&gt;&gt;</span>
                    <div className="title">异常事件行业分布信息</div>
                    <span className="arrow last">&gt;&gt;</span>
                    <div className="blue-line" />
                  </div>
                  <div className="event-table">
                    <Doubleaxes {...tradeListCharts} />
                  </div>
                </div>
              </div>
              <div className="event_bottom_right">
                <div className="content_box">
                  <div className="small-title">
                    <span className="arrow">&gt;&gt;</span>
                    <div className="title">异常事件类型信息</div>
                    <span className="arrow last">&gt;&gt;</span>
                    <div className="blue-line" />
                  </div>
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

  elecCurrentDataToChart(elecCurrentData, phase) {
    const timeArr = formatEleList();
    let tempArr = elecCurrentData.xmdData
      .filter(item => {
        item.type = '巡检仪'
        return item.phase === phase
      })
      .concat(
        elecCurrentData.elecData.filter(item => {
          item.type = '电能表'
          return item.phase === phase
        })
      )
    // 展开数组 ，转化为图表数据
    let data = [], tempObj = {};
    ((tempArr[0] || {}).pointList || []).map((item, idx) => {
      tempObj = {};
      tempObj.time = timeArr[idx];
      tempObj['巡检仪'] = item;
      tempObj['电流表'] = tempArr[1].pointList[idx];
      data.push(tempObj);
    })
    return data
  }

  //切换轮播的回调,idx:当前轮播的页面idx
  afterSlickChange(idx) {
    this.setState({
      pageIdx: idx
    })
  }

  //切换轮播
  slickBtn(idx) {
    this.slider.slickGoTo(idx)
  }

  renderPageTwo() {
    // 正式数据
    let {
      elecCurrentData, // 电流分析对比查询
      xmdEventData, // 巡检仪上报事件查询
      eleEventData, // 电能表上报事件查询
      elecDayData // 电量数据查询
    } = this.state.pageTwo || {}

    xmdEventData = (xmdEventData && xmdEventData.xmdData) || []
    eleEventData = (eleEventData && eleEventData.elecData) || []
    elecDayData = (elecDayData && elecDayData.elecData) || []

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
      let time = setTimeout(function () {
        _this.forceUpdate()
      }, 0)
    }

    let dataA, dataB, dataC
    if (
      elecCurrentData &&
      elecCurrentData.xmdData &&
      elecCurrentData.elecData
    ) {
      dataA = _this.elecCurrentDataToChart(elecCurrentData, 'A 相')
      dataB = _this.elecCurrentDataToChart(elecCurrentData, 'B 相')
      dataC = _this.elecCurrentDataToChart(elecCurrentData, 'C 相')
    }
    // 电流分析对比查询 图表A
    chartsEleA = {
      data: dataA,
      height: chartsEleHeight,
      xAxis: 'time',
      yAxis: 'count',
      fields: ['巡检仪', '电流表'],
      forceFit: true,
      padding: 'auto',
      keyName: 'ele',
      style: {
        overflow: 'hidden'
      },
      cols: {
        time: {
          alias: '时间',
          tickCount: 5
        },
        count: {
        }
      },
      xLabel: {
        offset: 15,
        textStyle: {
          fill: '#fff',
          fontSize: 8
        }
      },
      yLabel: {
        offset: 5,
        textStyle: {
          fill: '#fff',
          fontSize: 8
        }
      }
    }
    // 电流分析对比查询 图表B
    chartsEleB = {
      data: dataB,
      height: chartsEleHeight,
      xAxis: 'time',
      yAxis: 'count',
      fields: ['巡检仪', '电流表'],
      forceFit: true,
      padding: 'auto',
      keyName: 'ele',
      style: {
        overflow: 'hidden'
      },
      cols: {
        time: {
          alias: '时间',
          tickCount: 5
        },
        count: {
          
        }
      },
      xLabel: {
        offset: 15,
        textStyle: {
          fill: '#fff',
          fontSize: 8
        }
      },
      yLabel: {
        offset: 5,
        textStyle: {
          fill: '#fff',
          fontSize: 8
        }
      }
    }
    // // 电流分析对比查询 图表C
    chartsEleC = {
      data: dataC,
      height: chartsEleHeight,
      xAxis: 'time',
      yAxis: 'count',
      fields: ['巡检仪', '电流表'],
      forceFit: true,
      padding: 'auto',
      keyName: 'ele',
      style: {
        overflow: 'hidden'
      },
      cols: {
        time: {
          alias: '时间',
          tickCount: 5
        },
        count: {
        }
      },
      xLabel: {
        offset: 15,
        textStyle: {
          fill: '#fff',
          fontSize: 8
        }
      },
      yLabel: {
        offset: 5,
        textStyle: {
          fill: '#fff',
          fontSize: 8
        }
      }
    }
    // 这个也是双折线图
    let elecDayDataCharts = [];
    elecDayData.forEach((item, index) => {
      item['正向有功总'] = item.activePower;
      item['正向无功总'] = item.reactivePower;
      elecDayDataCharts.push(item)
    })
    chartsEleChange = {
      data: elecDayDataCharts,
      height: chartsEleChangeHeight,
      xAxis: 'time',
      yAxis: 'power',
      fields: ['正向有功总'],
      forceFit: true,
      padding: 'auto',
      keyName: 'ele',
      style: {
        overflow: 'hidden'
      },
      cols: {
        time: {
          alias: '时间',
          tickCount: 3
        },
      },
      xLabel: {
        offset: 15,
        textStyle: {
          fill: '#fff',
          fontSize: 8
        }
      },
      yLabel: {
        offset: 5,
        textStyle: {
          fill: '#fff',
          fontSize: 8
        }
      }
    }
    return (
      <div className="SecondaryLoopRight content" style={{ height: domHeight }}>
        <div className="SecondaryLoopRight_left">
          <div className="content_box">
            <div className="small-title">
              <span className="arrow">&gt;&gt;</span>
              <div className="title">电流对比分析</div>
              <span className="arrow last">&gt;&gt;</span>
              <div className="blue-line" />
            </div>
            <div className="ele_charts">
              <p className="ele_charts_title">A相</p>
              <Doubleline {...chartsEleA} />
            </div>
            <div className="ele_charts">
              <p className="ele_charts_title">B相</p>
              <Doubleline {...chartsEleB} />
            </div>
            <div className="ele_charts">
              <p className="ele_charts_title">C相</p>
              <Doubleline {...chartsEleC} />
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
                <div className="content_box" style={{ paddingRight: '10px' }}>
                  <div className="small-title">
                    <span className="arrow">&gt;&gt;</span>
                    <div className="title">事件信息</div>
                    <span className="arrow last">&gt;&gt;</span>
                    <div className="blue-line" />
                  </div>
                  <div className="event-table">
                    <div className="xmdEvent">
                      <div className="event-table-title">
                        <div className="title text-l font-12">巡检仪上报事件</div>
                        <div className="blue_underline" />
                      </div>
                      <ul>
                        <div className={xmdEventData.length > 0?"scroll-content":'scroll-content unscroll'}>
                          {Array.isArray(xmdEventData) &&
                            xmdEventData.length > 0 ? (
                              xmdEventData.map((item, index) => {
                                return (
                                  <div className="item" key={index}>
                                    <li className="item-section">
                                      <ul className="event_report event_blue">
                                        <li>异常类型 : {item.exception}</li>
                                        <li>事件状态 : {item.event}</li>
                                        <li>事件发生时间 : {item.eventTime}</li>
                                        <li>
                                          A相异常 :{' '}
                                          {item.phaseA ? '发生' : '未发生'}
                                        </li>
                                        <li>
                                          B相异常 :{' '}
                                          {item.phaseB ? '发生' : '未发生'}
                                        </li>
                                        <li>
                                          C相异常 :{' '}
                                          {item.phaseC ? '发生' : '未发生'}
                                        </li>
                                      </ul>
                                    </li>
                                  </div>
                                )
                              })
                            ) : (
                              <div className="empty-data">暂无数据</div>
                            )}
                        </div>
                      </ul>
                    </div>
                    <div className="xmdEvent">
                      <div className="event-table-title">
                        <div className="title text-l font-12">电能表上报事件</div>
                        <div className="blue_underline" />
                      </div>
                      <ul>
                        <div className={eleEventData.length > 0?"scroll-content":'scroll-content unscroll'}>
                          {Array.isArray(eleEventData) &&
                            eleEventData.length > 0 ? (
                              eleEventData.map((item, index) => {
                                return (
                                  <div className="item">
                                    <li key={index}>
                                      <ul className="event_report event_red">
                                        <li>异常类型 : {item.exception}</li>
                                        <li>事件状态 : {item.event}</li>
                                        <li>事件发生时间 : {item.eventTime}</li>
                                        <li>
                                          A相异常 :{' '}
                                          {item.phaseA ? '发生' : '未发生'}
                                        </li>
                                        <li>
                                          B相异常 :{' '}
                                          {item.phaseB ? '发生' : '未发生'}
                                        </li>
                                        <li>
                                          C相异常 :{' '}
                                          {item.phaseC ? '发生' : '未发生'}
                                        </li>
                                      </ul>
                                    </li>
                                  </div>
                                )
                              })
                            ) : (
                              <div className="empty-data">暂无数据</div>
                            )}
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="event_bottom_center ">
                <div className="content_box chartsEleChangeHeight">
                  <div className="small-title">
                    <span className="arrow">&gt;&gt;</span>
                    <div className="title">电量变化</div>
                    <span className="arrow last">&gt;&gt;</span>
                    <div className="blue-line" />
                  </div>
                  <div className="event-table">
                    <Doubleline {...chartsEleChange} />
                  </div>
                </div>
              </div>
              <div className="event_bottom_right">
                <div className="content_box">
                  <div className="small-title">
                    <span className="arrow">&gt;&gt;</span>
                    <div className="title">判定条件</div>
                    <span className="arrow last">&gt;&gt;</span>
                    <div className="blue-line" />
                  </div>
                  <div className="event-table event-table-info">
                    <div className="empty-data">暂无数据</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderTable() {
    const searchValue = this.state.searchValue

    let columns = [
      {
        title: '所属城市',
        dataIndex: 'place',
        width: '12%',
        align: 'center',
        key: 'place'
      },
      {
        title: '所属区县',
        dataIndex: 'region',
        width: '12%',
        align: 'center',
        key: 'region'
      },
      {
        title: '巡检仪资产编号',
        dataIndex: 'serialNum',
        width: '20%',
        align: 'center',
        key: 'serialNum'
      },
      {
        title: '电能表资产编号',
        dataIndex: 'elecSerialNum',
        width: '20%',
        align: 'center',
        key: 'elecSerialNum'
      },
      // {
      //   title: '户名',
      //   dataIndex: 'username',
      //   width: '5.4%',
      //   align: 'center',
      //   key: 'username'
      // },
      {
        title: '用电类型',
        dataIndex: 'trade',
        width: '12%',
        align: 'center',
        key: 'trade'
      },
      {
        title: '异常类型',
        dataIndex: 'name',
        width: '12%',
        key: 'name',
        align: 'center'
      },
      {
        title: '异常日期',
        dataIndex: 'occTime',
        width: '12%',
        align: 'center',
        key: 'occTime'
      },
      {
        title: '恢复日期',
        dataIndex: 'recoverTime',
        width: '12%',
        align: 'center',
        key: 'recoverTime'
      }
    ]

    if (searchValue && searchValue.city) {
      columns.splice(0, 1)
    } else {
      columns.splice(1, 1)
    }
    // 正式数据
    let {
      dataList // 异常信息表查询
    } = this.state.pageOne || []

    let tableData = dataList
    Array.isArray(tableData) &&
      tableData.map((item, index) => {
        item.key = index
        if (!item.recoverTime) {
          item.recoverTime = '未恢复'
        }
        return item
      })

    let tableHeight = $('#tableHeight').height() - 60 // table表格的高度
    let self = this;

    setTimeout(function(){
      const height = $('.ant-table-body').height();
      const scrollHeight = $('.ant-table-tbody').height();
      let animationStyle = {};
      //认为有滚动条
      if(scrollHeight > height){
        const time = scrollHeight / 20 + 's';
        animationStyle = {
          animationDuration:time
        }
      }else{
        animationStyle = {
          animationDuration:'unset'
        }
      }
      $('.scrollTable .ant-table-tbody').css(animationStyle);
    },100);

    // $('.scrollTable .ant-table-body').on('scroll', function () {
    //   let viewH = $(this).height(),
    //     contentH = $(this)
    //       .children()
    //       .height(),
    //     scrollTop = $(this).scrollTop(),
    //     distance = 100

    //   // console.log('viewH' + viewH)
    //   // console.log('contentH' + contentH)
    //   // console.log('scrollTop' + scrollTop)

    //   // if (contentH - viewH - scrollTop <= distance) {
    //   //   //到达底部100px时,加载新内容
    //   //   // 这里加载数据..
    //   //   console.log('加载数据')
    //   //   console.log(dataList)
    //   //   self.fetchPageTwo(value)
    //   // }
    // })

    //

    return (
      <div>
        <div className="small-title">
          <span className="arrow">&gt;&gt;</span>
          <div className="title">二次回路异常事件</div>
          <span className="arrow last">&gt;&gt;</span>
          <div className="blue-line" />
        </div>
        <div className="content-table">
          <Table
            className={'scrollTable'}
            columns={columns}
            dataSource={tableData}
            pagination={false}
            scroll={{ y: tableHeight }}
            locale={{
              emptyText: '暂无数据'
            }}
            onRow={(record, idx) => {
              return {
                onClick: () => {
                  let pageTwo = {}
                  pageTwo.record = record

                  self.setState({
                    pageTwo
                  },()=>{
                    self.fetchrowCLick(record)  
                  })
                  
                }
              }
            }}
          />
        </div>
      </div>
    )
  }

  renderMeunTitle() {
    return <MeunTitle />
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
      <div className="page-slick page-SecondaryLoopLeft page">
        <h1 className="page-title" id="dropTitle">
          {
            <Dropdown overlay={this.renderMeunTitle()} className="dropContent">
              <a className="ant-dropdown-link">
                {this.state.pageTitle}
                <Icon type="ordered-list" theme="outlined" />
              </a>
            </Dropdown>
          }
        </h1>

        <div className="slick-btn">
          <div
            className={this.state.pageIdx == 0 ? 'btn active' : 'btn'}
            onClick={this.slickBtn.bind(this, 0)}
          />
          <div
            className={this.state.pageIdx == 1 ? 'btn active' : 'btn'}
            onClick={this.slickBtn.bind(this, 1)}
          />
        </div>
        {this.renderSearchBar()}
        <div className="page-main slider_content">
          <Slider {...settings} ref={slider => (this.slider = slider)}>
            <div className="slider_sec ">{this.renderPageOne()}</div>
            <div className="slider_sec">{this.renderPageTwo()}</div>
          </Slider>
        </div>
      </div>
    )
  }
}

module.exports = SecondaryLoop
