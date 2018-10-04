import React, { Component } from 'react'
import BaseView from '../core/view.base'
import $ from 'jquery'
import { Table } from 'antd'
//图表模型
import {
  Labelline,
  Basicline,
  Doubleaxes,
  Basicbar,
  Groupedcolumn
} from '../ui/ui.charts'

import {
  QueryExceptionCount,
  QueryExceptionByTime,
  
  // 二次回路异常事件查询
  QuerySecondLoopExceptionCount
} from '../models/mergeAnaly.models'

import Mock from '../mock/mock'

import DataServince from '../services/searchbar.services'
import moment from 'moment'
import SearchBar from '../ui/ui.searchbar.js'

import Slider from 'react-slick'
// 异常主题事件评估值 数据没有
//定义数据模型
const queryExceptionCount = QueryExceptionCount.getInstance()
const queryExceptionByTime = QueryExceptionByTime.getInstance()
// 主题类型查询
const getSubjectType = GetSubjectType.getInstance()
// 二次回路异常事件查询
const querySecondLoopExceptionCount = QuerySecondLoopExceptionCount.getInstance()

class SecondaryAnaly extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pageTitle: '二次回路异常主题分析'
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

    this.fetchPageOne(_value)
  }

  fetchPageOne(value) {
    this.fetchQueryExceptionCount(value)
    this.fetchQueryExceptionByTime(value)

    this.fetchQuerySecondLoopExceptionCount(value)
  }

  // 异常事件总数查询
  fetchQueryExceptionCount(value) {
    let self = this
    queryExceptionCount.setParam({ ...value })
    queryExceptionCount.excute(
      res => {
        let pageOne = self.state.pageOne || {}
        pageOne.totalCount = res.totalCount || 0
        self.setState({
          pageOne: pageOne
        })
      },
      err => {
        
      }
    )
  }

  // 异常事件数量变化趋势
  fetchQueryExceptionByTime(value) {
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
      },
      err => {
        
      }
    )
  }

  // 二次回路异常事件查询
  fetchQuerySecondLoopExceptionCount(value) {
    let self = this
    //  '{"token":"234sdf234","province":"山西","subject":1,"startTime":"2011-01-01","endTime":"2019-01-1"}' "' "https://api.c2py.com/ele/shangcen/xmdplatform/querySecondLoopExceptionCount"
    value = {}
    value = {
      token: '234sdf234',
      province: '山西',
      subject: '1',
      startTime: '2011-01-01',
      endTime: '2019-01-1'
    }
    querySecondLoopExceptionCount.setParam({
      ...value
    })
    querySecondLoopExceptionCount.excute(
      res => {
        let pageOne = self.state.pageOne || {}
        pageOne.periodListLine = res.periodList || []
        self.setState({
          pageOne: pageOne
        })
      },
      err => {
        
      }
    )
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

  getThemeData(sourceData, nameList) {
    if (nameList.length > 0) {
      let arr = []
      nameList.forEach((ele, index) => {
        let temp = {}
        sourceData.map(item => {
          temp[item.period] = item[ele]
          temp['name'] = `${ele}`
        })
        arr.push(temp)
      })
      return arr
    }
  }

  renderPageOne() {
    // 正式数据
    // debugger
    let {
      totalCount, // 二次回路异常事件统计
      periodList, //异常事件数量变化趋势
      periodListLine //异常主题评估
    } = this.state.pageOne || {}
    let periodListCharts = {} // 异常事件数量变化趋势
    let loop_bottom = $('.loop_bottom').height() - 20 // 异常事件数量变化趋势 高度
    let theme = {}
    let themeHeight = $('.themeHeight').height() - 20 // 异常主题评估 高度

    let _this = this
    if (!themeHeight) {
      let time = setTimeout(function() {
        // _this.forceUpdate()
      }, 0)
    }

    // console.log(totalCount)
    // console.log(periodList)
    // console.log(periodListLine)
    let fieldsList = []
    if (periodListLine && periodListLine.length > 0) {
      fieldsList = periodListLine.map(item => {
        return item.period
      })
    }
    // stealingPower	疑似窃电	double
    // trouble	设备故障	double
    // wiringFault	错接线	double
    // expansion	配变需扩容	double
    // maintain	现场需维护	double
    // failure	电池失效	double
    // loopExce	回路异常	double
    // elecExec	用电异常	double
    let nameList = [
      'stealingPower',
      'trouble',
      'wiringFault',
      'expansion',
      'maintain',
      'failure',
      'loopExce',
      'elecExec'
    ]
    let data = []
    if (periodListLine && periodListLine.length > 0) {
      data = _this.getThemeData(periodListLine, nameList)
    }
    console.log(data)
    periodListCharts = {
      data: periodList,
      type: 'area',
      height: loop_bottom,
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

    theme = {
      // data: [
      //   {
      //     name: 'London',
      //     'Jan.': 18.9,
      //     'Feb.': 28.8,
      //     'Mar.': 39.3,
      //     'Apr.': 81.4,
      //     May: 47,
      //     'Jun.': 20.3,
      //     'Jul.': 24,
      //     'Aug.': 35.6
      //   },
      //   {
      //     name: 'Berlin',
      //     'Jan.': 12.4,
      //     'Feb.': 23.2,
      //     'Mar.': 34.5,
      //     'Apr.': 99.7,
      //     May: 52.6,
      //     'Jun.': 35.5,
      //     'Jul.': 37.4,
      //     'Aug.': 42.4
      //   }
      // ],
      data: data,
      fields: fieldsList,
      keyName: '时间',
      value: '事件数量',
      fieldsName: 'name',
      style: {
        overflow: 'hidden'
      },
      padding: 'auto',
      height: themeHeight
    }

    // '{"token":"234sdf234","province":"山西","subject":1,"startTime":"2011-01-01","endTime":"2019-01-1"}' "' "https://api.c2py.com/ele/shangcen/xmdplatform/getSubjectType"
    //  '{"token":"234sdf234","province":"山西","subject":1,"startTime":"2011-01-01","endTime":"2019-01-1"}' "' "https://api.c2py.com/ele/shangcen/xmdplatform/querySecondLoopExceptionCount"
    return (
      <div className="SecondaryanalyRight content">
        <div className="SecondaryanalyRight_left">
          <div className="content_box">
            <div className="loop_top">
              <div className="loop_top_box">
                <div className="content_title" style={{ maxWidth: '80%' }}>
                  二次回路异常事件统计
                  <span className="blue_underline" />
                  <div
                    className="loop_content loop_number"
                    style={{
                      height: loop_bottom,
                      lineHeight: `${loop_bottom}px`,
                      fontSize: `${loop_bottom / 6}px`
                    }}
                  >
                    {String(totalCount).replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')}
                    <span className="text-white">&nbsp;件</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="loop_bottom">
              <div className="content_title">异常事件数量变化趋势</div>
              <Basicline {...periodListCharts} />
            </div>
          </div>
        </div>
        <div className="SecondaryanalyRight_right">
          <div className="event">
            <div className="content_box">
              <div className="content_title">异常主题评估</div>
              <div className="event-table themeHeight">
                <Groupedcolumn {...theme} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    let appview = $('.page-main').height()
    return (
      <div
        className="page-slick page-SecondaryAnaly"
        style={{ height: appview }}
      >
        {this.renderSearchBar()}
        {this.renderPageOne()}
      </div>
    )
  }
}

module.exports = SecondaryAnaly
