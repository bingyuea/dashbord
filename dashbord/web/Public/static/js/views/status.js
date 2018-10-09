import React, { Component } from 'react'
import BaseView from '../core/view.base'
import $ from 'jquery'
import Mock from '../mock/mock'

//图表模型
import Slider from 'react-slick'

//缓存
import { PageNineStore } from '../store/business.store'

//图表模型
import { ChinaMapEcharts, Basicline, Labelline } from '../ui/ui.charts'
import { DatePicker } from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
const { MonthPicker } = DatePicker
import { Menu, Dropdown, Icon } from 'antd'

import MeunTitle from '../ui/ui.menuTitle'
//异常数据统计
import {
  QuerySecondLoopExceptionDetailData,
  GetTopTenOfSecondLoopExceptionTop,
  GetTopTenOfSecondLoopException
} from '../models/status.models'
//定义数据模型
const querySecondLoopExceptionDetailData = QuerySecondLoopExceptionDetailData.getInstance(),
  getTopTenOfSecondLoopExceptionTop = GetTopTenOfSecondLoopExceptionTop.getInstance(),
  getTopTenOfSecondLoopException = GetTopTenOfSecondLoopException.getInstance()

const pageNineStore = PageNineStore.getInstance()
class Status extends BaseView {
  constructor(props) {
    super(props)

    this.state = {
      pageStatus: 'init',
      pageIdx: 0
    }
  }

  componentDidMount() {
    //pageone
    let params = {
      token: '234sdf234',
      province: '山西',
      date: '2019-01'
    }

    let averageParams = {
      province: '山西'
    }
    // 排行榜
    this.fetchGetTopTenOfSecondLoopExceptionTop(params)
    // 平均分
    this.fetchGetTopTenOfSecondLoopException(averageParams)
    //pagetwo
    this.fetchQuerySecondLoopExceptionDetailData()
  }

  // #page9
  // curl -X POST -d '{"token":"234sdf234","serialNum":"1430009000003609335198","elecSerialNum":"1410101012212120538038","date":"2018-05-30"}' "' "https://api.c2py.com/ele/shangcen/xmdplatform/queryDetailOfSecondLoopException""
  // #page8
  // #1
  // curl -X POST -d '{"token":"234sdf234","province":"西安"}' "' "https://api.c2py.com/ele/shangcen/xmdplatform/getTopTenOfSecondLoopExceptionTop"
  // #2"
  // #2 getTopTenOfSecondLoopException未做

  // 排行榜
  fetchGetTopTenOfSecondLoopExceptionTop(value) {
    let self = this
    getTopTenOfSecondLoopExceptionTop.setParam({ ...value })
    getTopTenOfSecondLoopExceptionTop.excute(
      res => {
        let rangeList = res || {}
        self.setState({
          rangeList
        })
      },
      err => {
        console.log(err)
      }
    )
  }

  // 平均分
  fetchGetTopTenOfSecondLoopException(value) {
    let self = this
    getTopTenOfSecondLoopException.setParam({ ...value })
    getTopTenOfSecondLoopException.excute(
      res => {
        let averageList = res || {}
        self.setState({
          averageList
        })
      },
      err => {
        console.log(err)
      }
    )
  }

  fetchQuerySecondLoopExceptionDetailData() {
    const self = this
    const value = {
      token: '234sdf234',
      serialNum: '1430009000003609335198',
      elecSerialNum: '1410101012212120538038',
      date: '2011-05'
    }
    querySecondLoopExceptionDetailData.setParam(value)
    querySecondLoopExceptionDetailData.excute(
      res => {
        const resData = res || {}
        self.setState({
          detailData: resData
        })
      },
      err => {
        console.log(err)
      }
    )
  }
  //切换轮播的回调,idx:当前轮播的页面idx
  afterSlickChange(idx) {
    this.setState({
      pageIdx: idx
    })
    //认为是到第二个页面，拿数据请求接口
    if (idx == 1) {
    }
  }

  //切换轮播
  slickBtn(idx) {
    this.slider.slickGoTo(idx)
  }

  renderPageOneCenter() {
    const mapData = [
      {
        city: '山西',
        name: '山西',
        userValue: 48.708
      }
    ]
    return (
      <div className="page-center">
        <div className="section-content map ">
          <ChinaMapEcharts mapData={mapData} domId={'pageOneMap'} />
        </div>
      </div>
    )
  }

  goPageTwo(value) {
    this.setState(
      {
        pageTwoParam: value
      },
      () => {
        this.slickBtn(1)
      }
    )
  }

  onChange(value) {
    value = moment(value).format('YYYY-MM')
    this.setState({
      changeTime: value
    })
  }
  searchHandle() {
    let changeTime = this.state.changeTime
    this.fetchGetTopTenOfSecondLoopExceptionTop(changeTime)
  }

  renderPageOne() {
    let appview = $('.page-main').height()
    let { rangeList } = this.state || {}
    // 排行榜
    rangeList = (rangeList && rangeList.dataList) || []
    const bottomHeight = $('#status2RightBottom').height()
    const monthChartsHeight = $('.chartsBox').height() / 2

    const monthFormat = 'YYYY-MM'
    const self = this
    return (
      <div className="status-main" style={{ height: appview }}>
        <div className="page-left ">
          <div className="title-content">
            <h3>二次回路状态排行榜</h3>
          </div>
          <div className="small-title label">
            <span className="arrow">&gt;&gt;</span>
            <div className="title">查询日期</div>
            <span className="arrow last">&gt;&gt;</span>
            <div className="blue-line" />
          </div>
          <div className="searchTime">
            <MonthPicker
              onChange={this.onChange.bind(this)}
              allowEmpty={false}
              placeholder={'请选择日期'}
              format={monthFormat}
              locale={locale}
            />
            <span className="search-btn" onClick={this.searchHandle.bind(this)}>
              查询
            </span>
          </div>
          <div className="fixedTable pd-30">
            <div className="row1 flex-layout">
              <h6 className="h6 flex text-c">用户</h6>
              <h6 className="h6 flex text-c">评估值</h6>
            </div>
          </div>
          <div className="tabel pd-30">
            <div
              className={
                rangeList && rangeList.length > 10 ? ['scroll-body'] : ['']
              }
            >
              {Array.isArray(rangeList) &&
                rangeList.map((item, index) => {
                  return (
                    <div
                      className={
                        (index + 1) % 2 === 0
                          ? ['row2 flex-layout ']
                          : ['row3 flex-layout ']
                      }
                      key={index}
                      onClick={self.goPageTwo.bind(self, item)}
                    >
                      <div className="flex text-l">{item.user}</div>
                      <div className="flex ">{item.assessedValue}</div>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
        {this.renderPageOneCenter()}
        {this.renderRightCommon()}
      </div>
    )
  }

  renderRightCommon() {
    let { averageList } = this.state || {}
    averageList = averageList && averageList.dataList
    // averageList = {
    //   result: 1,
    //   average: 88.65,
    //   monthChain: 0.01,
    //   dataList: [
    //     {
    //       date: '2018-01',
    //       average: 85.66
    //     },
    //     {
    //       date: '2018-02',
    //       average: 85.66
    //     }
    //   ]
    // }
    // 平均分
    let averageDataList = (averageList && averageList.dataList) || []
    let average = (averageList && averageList.average) || 0
    let averageTrend = (averageList && averageList.averageTrend) || 0
    let monthChain = (averageList && averageList.monthChain) || 0
    let monthChainTrend = (averageList && averageList.monthChainTrend) || 0

    let averageChartsData = [
      {
        name: '以往',
        count: 100 - average
      },
      {
        name: '当月',
        count: average
      }
    ]
    let monthChartsData = [
      {
        name: '上月',
        count: 100 - monthChain
      },
      {
        name: '当月',
        count: monthChain
      }
    ]
    const bottomHeight = $('#status2RightBottom').height()
    const monthChartsHeight = $('.chartsBox').height() / 2

    //状态变化
    const chartsData = {
      data: averageDataList,
      height: monthChartsHeight,
      xAxis: 'date',
      yAxis: 'average',
      forceFit: true,
      padding: 'auto',
      cols: {
        sales: {
          alias: 'date'
        }
      },
      style: {
        overflow: 'hidden'
      },
      xLabel: {
        offset: 15,
        textStyle: {
          fontSize: 10,
          fill: '#fff'
        }
      },
      yLabel: {
        offset: 5,
        textStyle: {
          fontSize: 10,
          fill: '#fff'
        }
      }
    }

    // 平均得分
    const averageCharts = {
      // data: average,
      data: averageChartsData,
      // data: Mock.charts3,
      height: monthChartsHeight,
      hideLabel: true,
      innerText: average + '分',
      innerRadius: 0.7,
      radius: 0.9,
      forceFit: true,
      padding: 'auto',
      field: 'count',
      // dimension: 'eventName',
      dimension: 'name',
      cols: {
        percent: {
          formatter: val => {
            val = (val * 100).toFixed(0) + '%'
            return val
          }
        }
      }
    }

    // 月环比
    const monthCharts = {
      // data: Mock.charts3,
      // data: monthChain,
      data: monthChartsData,
      height: monthChartsHeight,
      innerText: monthChain.toString(),
      innerRadius: 0.7,
      hideLabel: true,
      radius: 0.9,
      forceFit: true,
      padding: 'auto',
      field: 'count',
      // dimension: 'eventName',
      dimension: 'name',
      cols: {
        percent: {
          formatter: val => {
            val = (val * 100).toFixed(0) + '%'
            return val
          }
        }
      }
    }

    return (
      <div className="page-right">
        <div className="title-content">
          <h3>区域回路二次状态评估</h3>
        </div>
        <div className="chartsStatus">
          <div className="top">
            <div className="small-title label">
              <span className="arrow">&gt;&gt;</span>
              <div className="title">总体状态</div>
              <span className="arrow last">&gt;&gt;</span>
              <div className="blue-line" />
            </div>

            <div className="chartsBox">
              <div className="chartsTop">
                {/* <div className="itemLeft">平均得分</div> */}
                <div className="itemLeft">
                  {this.state.pageIdx == 0 ? '平均评分' : '评分'}
                </div>
                <div className="itemCenter">
                  <div className="charts">
                    <Labelline {...averageCharts} />
                  </div>
                  {/* {average} */}
                </div>
                <div className="itemRight">
                  <div
                    className={
                      Number(averageTrend) >= 0
                        ? ['iconfont icon-icon-dsj red']
                        : ['iconfont icon-sanx-up green']
                    }
                  />
                  <span className="monthRange">{averageTrend}</span>
                </div>
              </div>
              <div className="chartsBotttom">
                {/* <div className="itemLeft">月环比</div> */}
                <div className="itemLeft">
                  {this.state.pageIdx == 0 ? '月环比' : '排名'}
                </div>
                <div className="itemCenter">
                  <div className="charts">
                    <Labelline {...monthCharts} />
                    {/* {monthChain} */}
                  </div>
                </div>
                <div className="itemRight">
                  <div
                    className={
                      Number(monthChainTrend) >= 0
                        ? ['iconfont icon-icon-dsj red']
                        : ['iconfont icon-sanx-up green']
                    }
                  />
                  <span className="monthRange">{monthChainTrend}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom" id="status2RightBottom">
            <div className="small-title label">
              <span className="arrow">&gt;&gt;</span>
              <div className="title">状态变化</div>
              <span className="arrow last">&gt;&gt;</span>
              <div className="blue-line" />
            </div>
            <div>
              <Basicline {...chartsData} />
            </div>
          </div>
        </div>
      </div>
    )
  }
  mapcb(name, option, instance) {
    console.log(name)
    // console.log(option)
    // console.log(instance)
    this.fetchGetTopTenOfSecondLoopException({ province: name })
  }
  renderPageTwoCenter() {
    const mapData = [
      {
        city: '山西',
        name: '山西',
        userValue: 48.708
      }
    ]

    return (
      <div className="page-center">
        <div className="section-content map ">
          {/* <ChinaMapEcharts mapData={mapData} domId={'pageTwoMap'} /> */}
          <ChinaMapEcharts
            mapData={mapData}
            domId={'pageTwoMap'}
            goDownCallBack={this.mapcb.bind(this)}
          />
        </div>
      </div>
    )
  }

  renderPageTwo() {
    let detailData = this.state.detailData || {}
    if (!detailData) {
      return <div />
    }
    detailData = detailData && detailData.dataList
    const {
      eventList,
      username,
      province,
      city,
      serialNum,
      elecType,
      trade,
      rate,
      measure,
      grade,
      gradeTrend,
      ranking,
      rankingTrend,
      gradeList
    } = detailData || {}

    const bottomHeight = $('#status2RightBottom').height()

    //状态变化
    const chartsData = {
      data: gradeList,
      height: bottomHeight - 35,
      xAxis: 'date',
      yAxis: 'grade',
      forceFit: true,
      padding: 'auto',
      cols: {
        sales: {
          alias: 'date'
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

    let domHeight = $('.page-main').height()
    return (
      <div className="status-main status-2" style={{ height: domHeight }}>
        <div className="page-left ">
          <div className="title-content">
            <h3>二次回路信息</h3>
          </div>
          <div className="small-title label">
            <span className="arrow">&gt;&gt;</span>
            <div className="title">查询日期</div>
            <span className="arrow last">&gt;&gt;</span>
            <div className="blue-line" />
          </div>

          <div className="info-box">
            <div className="row1 flex-layout ">
              <h6 className="h6 flex text-c">省份</h6>
              <h6 className="h6 flex text-c">城市</h6>
            </div>
            <div className="fixedTable row3 flex-layout status_9">
              <div className="flex text-c">{province || ''}</div>
              <div className="flex text-c">{city || ''}</div>
            </div>
          </div>

          <div className="info-box">
            <div className="row1 flex-layout ">
              <h6 className="h6 flex text-c">户名</h6>
              <h6 className="h6 flex text-c">巡检仪资产编号</h6>
            </div>
            <div className="fixedTable row3 flex-layout status_9">
              <div className="flex text-c">{username || ''}</div>
              <div className="flex text-c changeLineParent">
                <p className="changeLine">
                  {serialNum &&
                    serialNum.substring(0, Math.floor(serialNum.length / 2))}
                </p>
                <p className="changeLine">
                  {(serialNum &&
                    serialNum.substring(
                      Math.floor(serialNum.length / 2),
                      serialNum.length
                    )) ||
                    ''}
                </p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="row1 flex-layout ">
              <h6 className="h6 flex text-c">用电类别</h6>
              <h6 className="h6 flex text-c">行业类别</h6>
            </div>
            <div className="fixedTable row3 flex-layout status_9">
              <div className="flex text-c">{elecType || ''}</div>
              <div className="flex text-c">{trade || ''}</div>
            </div>
          </div>

          <div className="info-box">
            <div className="row1 flex-layout ">
              <h6 className="h6 flex text-c">综合倍率</h6>
              <h6 className="h6 flex text-c">接线方式</h6>
            </div>
            <div className="fixedTable row3 flex-layout status_9">
              <div className="flex text-c">{rate || ''}</div>
              <div className="flex text-c">{measure || ''}</div>
            </div>
          </div>

          <div className="event mt-20 ">
            <div className="small-title label mb-20">
              <span className="arrow">&gt;&gt;</span>
              <div className="title">影响二次回路事件</div>
              <span className="arrow last">&gt;&gt;</span>
              <div className="blue-line" />
            </div>
            <div className="even-details">
              <div
                className={
                  eventList && eventList.length > 2 ? ['scroll-body'] : ['']
                }
              >
                {Array.isArray(eventList) &&
                  eventList.map((item, index) => {
                    return (
                      <div
                        className={
                          (index + 1) % 2 === 0
                            ? ['row2 flex-layout status_9']
                            : ['row3 flex-layout status_9']
                        }
                        key={index}
                      >
                        <div className="flex">{item.eventName}</div>
                        <div className="flex">{item.date}</div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
        {this.renderPageTwoCenter()}
        {this.renderRightCommon()}
      </div>
    )
  }
  renderMeunTitle() {
    return <MeunTitle />
  }
  renderMain() {
    var settings = {
      autoplay: false,
      arrows: false,
      infinite: false,
      speed: 500,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1,
      touchMove: true,
      afterChange: this.afterSlickChange.bind(this)
    }
    const pageIdx = this.state.pageIdx
    return (
      <div className="page-status page-slick page page-content-box">
        <div className="top-content">
          <h1 id="dropTitle" className="page-title">
            {
              <Dropdown
                overlay={this.renderMeunTitle()}
                className="dropContent"
              >
                <a className="ant-dropdown-link">
                  二次回路状态在线监测
                  <Icon type="ordered-list" theme="outlined" />
                </a>
              </Dropdown>
            }
          </h1>
          <div className="slick-btn">
            <div
              className={pageIdx == 0 ? 'btn active' : 'btn'}
              onClick={this.slickBtn.bind(this, 0)}
            />
            <div
              className={pageIdx == 1 ? 'btn active' : 'btn'}
              onClick={this.slickBtn.bind(this, 1)}
            />
          </div>
        </div>
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

module.exports = Status
