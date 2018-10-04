import React, { Component } from 'react'
import BaseView from '../core/view.base'
import $ from 'jquery'
import Mock from '../mock/mock'
//图表模型
import { 
  ChinaMapChart,
  Labelline,
  Basicline,
  Doubleaxes,
  Basicbar,
  Groupedcolumn
} from '../ui/ui.charts'
import Slider from 'react-slick'

import SearchBar from '../ui/ui.searchbar.js';

import moment from 'moment';

import DataServince from '../services/searchbar.services';

import {
  //异常数据统计a
  QueryElecCurrentData,
  QueryExceptionCount,
  QueryExceptionByTime,
  //二次回路异常事件查询
  QuerySecondLoopExceptionCount
} from '../models/mergeAnaly.models'
//定义数据模型
const queryElecCurrentData = QueryElecCurrentData.getInstance()
const queryExceptionCount = QueryExceptionCount.getInstance()
const queryExceptionByTime = QueryExceptionByTime.getInstance()
const querySecondLoopExceptionCount = QuerySecondLoopExceptionCount.getInstance()
class MergeAnaly extends BaseView {
  constructor(props) {
    super(props)

    this.state = {
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
    //pageOne
    this.fetchQueryElecCurrentData()
    const self = this;
    DataServince.fetch(function(searchOptions){
        self.setState({
            searchOptions:searchOptions
        },()=>{
          self.search();
        });
    });
  }

  fetchQueryElecCurrentData(token) {
    const self = this
    let params = {
      token: '234sdf234',
      range: '全国'
      // range: '山西'
    }
    queryElecCurrentData.setParam({
      ...params
    })
    queryElecCurrentData.excute(
      res => {
        const exceptionDataObj = res || {}
        self.setState({
          exceptionDataObj
        })
      },
      err => {
        console.log(err)
      }
    )
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

    this.fetchPageTwo(_value)
  }

  fetchPageTwo(value) {
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
        let pageTwo = self.state.pageTwo || {}
        pageTwo.totalCount = res.totalCount || 0
        self.setState({
          pageTwo: pageTwo
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
        let pageTwo = self.state.pageTwo || {}
        pageTwo.periodList = res.periodList || []
        self.setState({
          pageTwo: pageTwo
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
        let pageTwo = self.state.pageTwo || {}
        pageTwo.periodListLine = res.periodList || []
        self.setState({
          pageTwo: pageTwo
        })
      },
      err => {
        
      }
    )
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

  /**************   pageOne    *******************/
  renderPageCenter() {
    const { provinceCountData } = this.state
    const height = $('.section-content.map').height()
    const mapHeight = height - 50
    let _this = this
    // if (!height) {
    //   let time = setTimeout(function() {
    //     _this.forceUpdate()
    //   }, 0)
    // }
    const mapData = {
      height: mapHeight,
      // userData:provinceCountData,
      userData: Mock.charts1,
      padding: 'auto',
      xAxis: 'name',
      yAxis: 'count',
      scale: {
        count: {
          alias: '安装数量'
        }
      },
      forceFit: true
    }

    return (
      <div className="page-center">
        <div className="section-content map ">
          <ChinaMapChart {...mapData} />
        </div>
      </div>
    )
  }

  renderRank(list){
    if(!list){return false}
    return list.map((item, index) => {
      return (
        <div
          className={
            (index + 1) % 2 === 0
              ? ['row3 flex-layout ']
              : ['row2 flex-layout ']
          }
          key={item.index}
        >
          <div className="flex">{item.user}</div>
          <div className="flex">{item.index}</div>
        </div>
      )
    })
  }

  renderPageOne() {
    let appview = $('#appview').height()
    const domHeight = $('.page-main').height()
    let _this = this
    if (!domHeight) {
      let time = setTimeout(function() {
        // _this.forceUpdate()
      }, 0)
    }
    let { exceptionDataObj } = this.state
    const exceptionData =
      (exceptionDataObj && exceptionDataObj.rankData[0]) || {}
    // 这里是不需要做去重处理
    let data = {}
    if (JSON.stringify(exceptionData) !== '{}') {
      for (let k in exceptionData) {
        exceptionData[k].map((item, index) => {
          item.key = index
          return item
        })
      }
    }
    return (
      <div className="page-analy page-dashboard" style={{ height: domHeight }}>
        <div className="page-left">
          <div className="item">
            <h4 className="label ">疑似窃电风险排行榜</h4>
            <div className="tabel">
              <div className="row1 flex-layout ">
                <h6 className="h6 flex">用户</h6>
                <h6 className="h6 flex">评估值</h6>
              </div>
              <div className="scrollList">
                {this.renderRank(exceptionData.stealingPowerRanking)}
              </div>
            </div>
          </div>

          <div className="item">
            <h4 className="label ">设备故障风险排行榜</h4>
            <div className="tabel">
              <div className="row1 flex-layout">
                <h6 className="h6 flex">用户</h6>
                <h6 className="h6 flex">评估值</h6>
              </div>
              <div className="scrollList">
                {Array.isArray(exceptionData.troubleRanking) &&
                  exceptionData.troubleRanking.map((item, index) => {
                    return (
                      <div
                        className={
                          (index + 1) % 2 === 0
                            ? ['row3 flex-layout ']
                            : ['row2 flex-layout ']
                        }
                        key={item.key}
                      >
                        <div className="flex">{item.user}</div>
                        <div className="flex">{item.index}</div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>

          <div className="item">
            <h4 className="label ">错接线风险排行榜</h4>
            <div className="tabel">
              <div className="row1 flex-layout">
                <h6 className="h6 flex">用户</h6>
                <h6 className="h6 flex">评估值</h6>
              </div>
              <div className="scrollList">
                {Array.isArray(exceptionData.wiringFaultRanking) &&
                  exceptionData.wiringFaultRanking.map((item, index) => {
                    return (
                      <div
                        className={
                          (index + 1) % 2 === 0
                            ? ['row3 flex-layout ']
                            : ['row2 flex-layout ']
                        }
                        key={item.key}
                      >
                        <div className="flex">{item.user}</div>
                        <div className="flex">{item.index}</div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>

          <div className="item">
            <h4 className="label ">配变需扩容排行榜</h4>
            <div className="tabel">
              <div className="row1 flex-layout">
                <h6 className="h6 flex">用户</h6>
                <h6 className="h6 flex">评估值</h6>
              </div>
              <div className="scrollList">
                {Array.isArray(exceptionData.expansionRanking) &&
                  exceptionData.expansionRanking.map((item, index) => {
                    return (
                      <div
                        className={
                          (index + 1) % 2 === 0
                            ? ['row3 flex-layout ']
                            : ['row2 flex-layout ']
                        }
                        key={item.key}
                      >
                        <div className="flex">{item.user}</div>
                        <div className="flex">{item.index}</div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
        {this.renderPageCenter()}
        <div className="page-right">
          <div className="item">
            <h4 className="label ">现场许维护排行榜</h4>
            <div className="tabel">
              <div className="row1 flex-layout">
                <h6 className="h6 flex">用户</h6>
                <h6 className="h6 flex">评估值</h6>
              </div>
              <div className="scrollList">
                {Array.isArray(exceptionData.maintainRanking) &&
                  exceptionData.maintainRanking.map((item, index) => {
                    return (
                      <div
                        className={
                          (index + 1) % 2 === 0
                            ? ['row3 flex-layout ']
                            : ['row2 flex-layout ']
                        }
                        key={item.key}
                      >
                        <div className="flex">{item.user}</div>
                        <div className="flex">{item.index}</div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
          <div className="item">
            <h4 className="label ">电池失效排行榜</h4>
            <div className="tabel">
              <div className="row1 flex-layout">
                <h6 className="h6 flex">用户</h6>
                <h6 className="h6 flex">评估值</h6>
              </div>
              <div className="scrollList">
                {Array.isArray(exceptionData.failureRanking) &&
                  exceptionData.failureRanking.map((item, index) => {
                    return (
                      <div
                        className={
                          (index + 1) % 2 === 0
                            ? ['row3 flex-layout ']
                            : ['row2 flex-layout ']
                        }
                        key={item.key}
                      >
                        <div className="flex">{item.user}</div>
                        <div className="flex">{item.index}</div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>

          <div className="item">
            <h4 className="label ">回路异常风险排行榜</h4>
            <div className="tabel">
              <div className="row1 flex-layout">
                <h6 className="h6 flex">用户</h6>
                <h6 className="h6 flex">评估值</h6>
              </div>
              <div className="scrollList">
                {Array.isArray(exceptionData.loopExceRanking) &&
                  exceptionData.loopExceRanking.map((item, index) => {
                    return (
                      <div
                        className={
                          (index + 1) % 2 === 0
                            ? ['row3 flex-layout ']
                            : ['row2 flex-layout ']
                        }
                        key={item.user}
                      >
                        <div className="flex">{item.user}</div>
                        <div className="flex">{item.index}</div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
          <div className="item">
            <h4 className="label ">用电异常风险排行榜</h4>
            <div className="tabel">
              <div className="row1 flex-layout">
                <h6 className="h6 flex">用户</h6>
                <h6 className="h6 flex">评估值</h6>
              </div>
              <div className="scrollList">
                {Array.isArray(exceptionData.elecExecRanking) &&
                  exceptionData.elecExecRanking.map((item, index) => {
                    return (
                      <div
                        className={
                          (index + 1) % 2 === 0
                            ? ['row3 flex-layout ']
                            : ['row2 flex-layout ']
                        }
                        key={item.key}
                      >
                        <div className="flex">{item.user}</div>
                        <div className="flex">{item.index}</div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  /**************   pageOne    *******************/


  /****************   pageTwo    *****************/
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

  renderPageTwoContent() {
    // 正式数据
    // debugger
    let {
      totalCount, // 二次回路异常事件统计
      periodList, //异常事件数量变化趋势
      periodListLine //异常主题评估
    } = this.state.pageTwo || {}
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
    // stealingPower  疑似窃电  double
    // trouble  设备故障  double
    // wiringFault  错接线 double
    // expansion  配变需扩容 double
    // maintain 现场需维护 double
    // failure  电池失效  double
    // loopExce 回路异常  double
    // elecExec 用电异常  double
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

  renderPageTwo() {
    let appview = $('.page-main').height()
    return (
      <div
        className="page-slick page-SecondaryAnaly"
        style={{ height: appview }}
      >
        {this.renderSearchBar()}
        {this.renderPageTwoContent()}
      </div>
    )
  }
  /*****************   pageTwo   ****************/

  renderMain() {
    var settings ={
      dots: false,
      dotsClass: 'slick-dots slick-thumb item_box',
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
      <div className="page-slick page">
        <h1 className="page-title">二次回路异常主题分析</h1>
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
        <div className="page-main slider_content">
          <Slider {...settings} ref={slider => (this.slider = slider)}>
            <div className="slider_sec ">
              {this.renderPageOne()}
            </div>
            <div className="slider_sec">
              {this.renderPageTwo()}
            </div>
          </Slider>
        </div>
      </div>
    )
  }
}

module.exports = MergeAnaly
