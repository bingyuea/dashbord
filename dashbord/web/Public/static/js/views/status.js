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

import { uniqueArr } from '../util/util'

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
      pageIdx: 0,
    }
  }
  componentDidMount() {
    // 排行榜
    let { province, date } = this.state || {}
    this.fetchGetTopTenOfSecondLoopExceptionTop()
    // 平均分
    this.fetchGetTopTenOfSecondLoopException({
      province
    })
  }

  // 排行榜
  fetchGetTopTenOfSecondLoopExceptionTop(value) {
    let self = this
    getTopTenOfSecondLoopExceptionTop.setParam({ ...value },true)
    getTopTenOfSecondLoopExceptionTop.excute(
      res => {
        let rangeList = res || {}
        self.setState({
          rangeList,
          detailData:null
        },()=>{
          //默认取第一行数据
          const dataList = self.state.rangeList.dataList || [];
          const firstRowData  = dataList[0] || {};
          const serialNum =firstRowData.serialNum;
          const elecSerialNum =firstRowData.elecSerialNum;
          let date = self.state.date || moment().format('YYYY-MM');
          self.fetchQuerySecondLoopExceptionDetailData({
            serialNum,
            elecSerialNum,
            date
          });
        })
      },
      err => {}
    )
  }

  // 平均分
  fetchGetTopTenOfSecondLoopException(value) {
    let self = this
    getTopTenOfSecondLoopException.setParam({ ...value },true)
    getTopTenOfSecondLoopException.excute(
      res => {
        let averageList = res || {}
        self.setState({
          averageList
        })
      },
      err => {}
    )
  }

  fetchQuerySecondLoopExceptionDetailData(value) {
    const self = this
    if(value.serialNum && value.elecSerialNum){
      querySecondLoopExceptionDetailData.setParam(value,true)
      querySecondLoopExceptionDetailData.excute(
        res => {
          const resData = res || {}
          self.setState({
            detailData: resData
          })
        },
        err => {}
      )  
    }
  }
  //切换轮播的回调,idx:当前轮播的页面idx
  afterSlickChange(idx) {
    this.setState({
      pageIdx: idx,
      // 是每次切换更新值
      averageClick: null
    })
    //pagetwo

    // if (idx === 1) {
    //   let serialNum, elecSerialNum
    //   if (this.state.pageTwoParam) {
    //     serialNum = this.state.pageTwoParam.serialNum
    //     elecSerialNum = this.state.pageTwoParam.elecSerialNum
    //   } else {
    //     serialNum =
    //       this.state.rangeList.dataList &&
    //       this.state.rangeList.dataList[0].serialNum
    //     elecSerialNum =
    //       this.state.rangeList.dataList &&
    //       this.state.rangeList.dataList[0].elecSerialNum
    //   }
    //   let date = this.state.date || moment().format('YYYY-MM')
    //   this.fetchQuerySecondLoopExceptionDetailData({
    //     serialNum,
    //     elecSerialNum,
    //     date
    //   })
    // }
  }

  //切换轮播
  slickBtn(idx) {
    this.slider.slickGoTo(idx)
  }

  mapcbPageOne(name, option, instance) {
    if (name === '中国') {
      name = ''
    }
    let date  = this.state.date;
    this.setState({
      province: name,
      averageList: null,
      rangeList: null
    })
    this.fetchGetTopTenOfSecondLoopExceptionTop({
      province: name,
      date
    })
    this.fetchGetTopTenOfSecondLoopException({
      province: name,
      date
    })
  }

  mapNameClickPageOne(name) {
    const province = this.state.province
    const flag = province == name || false
    this.setState(
      {
        province: name,
        rangeList: null,
        averageList: null
      },
      () => {
        if (!flag) {
          let { date } = this.state;
          this.fetchGetTopTenOfSecondLoopExceptionTop({
            province: name === '中国' ? '' : name,
            date
          })
          this.fetchGetTopTenOfSecondLoopException({
            province: name,
            date
          })
        }
      }
    )
  }

  renderPageOneCenter() {
    const rangeList = this.state.rangeList || {}
    const dataList = rangeList.dataList || []
    if (!dataList) {
      return
    }

    var newList = []
    let provinceList = dataList.map(item => {
      return item.province
    })

    provinceList = uniqueArr(provinceList);

    let mapData = provinceList.map(item => {
      return {
        city: item,
        name: item,
        userValue: ''
      }
    })

    if(this.state.province && this.state.province !=='中国'){
      mapData = [];
    }

    //需要格式地图数据

    return (
      <div className="page-center">
        <div className="section-content map ">
          <ChinaMapEcharts
            mapData={mapData}
            provinceName={this.state.province}
            hideMapName={true}
            mapNameClick={this.mapNameClickPageOne.bind(this)}
            goDown={true}
            goDownCallBack={this.mapcbPageOne.bind(this)}
          />
        </div>
      </div>
    )
  }

  goPageTwo(value) {
    this.setState({
      detailData:null
    },()=>{
      const date = this.state.date || moment().format('YYYY-MM');
      this.fetchQuerySecondLoopExceptionDetailData({
        serialNum:value.serialNum,
        elecSerialNum:value.elecSerialNum,
        date:date
      });
      this.slickBtn(1);
    })
    
  }

  onChange(date, dateString) {
    this.setState({
      date: dateString
    })
  }
  searchHandle() {
    let { date } = this.state || {};

    this.setState({
      province:null,
      averageClick:null,
      averageList:null

    },()=>{
      
      this.fetchGetTopTenOfSecondLoopExceptionTop({
        date
      }) 
      this.fetchGetTopTenOfSecondLoopException({
        date
      })
    })

    
  }

  renderPageOne() {
    let appview = $('.page-main').height()
    let { rangeList } = this.state || {}
    // 排行榜
    rangeList = (rangeList && rangeList.dataList) || []
    const bottomHeight = $('#status2RightBottom').height()
    const monthChartsHeight = $('.chartsBox').height() / 2

    setTimeout(function(){
      const height = $('.page-one-left-bottom').height();
      const scrollHeight = $('.page-one-left-bottom .scroll-body').height();
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
      $('.page-one-left-bottom .scroll-body').css(animationStyle);
    },100);


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
          <div className="tabel pd-30 page-one-left-bottom">
            {rangeList.length > 0?<div className='scroll-body'>
              {
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
                })
              } 
            </div> : <div className='empty-data'>暂无数据</div>
           }
          </div>
        </div>
        {this.renderPageOneCenter()}
        {this.renderRightCommon()}
      </div>
    )
  }

  plotClickCb(data) {
    let { pageIdx } = this.state || {}
    let averageClick
    if (pageIdx === 1) {
      averageClick = data._origin.grade
    } else {
      averageClick = data._origin.average
    }
    this.setState({
      averageClick
    })
  }
  renderRightCommon() {

    let { averageList, averageClick, pageIdx, detailData } = this.state || {}
    let averageDataList, average, averageTrend, monthChain, monthChainTrend
    // page-9
    if (pageIdx === 1) {
      detailData = detailData && detailData.dataList
      let { grade, gradeTrend, ranking, rankingTrend } = detailData || {}
      averageDataList = (detailData && detailData.gradeList) || []
      // 平均分
      // 如果state 里面有点击的值取 点击的值
      average = averageClick || grade || 0
      averageTrend = gradeTrend || 0
      monthChain = ranking || 0
      monthChainTrend = rankingTrend || 0
    } else {
      averageList = averageList && averageList.dataList

      // 平均分
      averageDataList = (averageList && averageList.dataList) || []
      // 如果state 里面有点击的值取 点击的值
      average = averageClick || (averageList && averageList.average) || 0
      averageTrend = (averageList && averageList.averageTrend) || 0
      monthChain = (averageList && averageList.monthChain) || 0
      monthChainTrend = (averageList && averageList.monthChainTrend) || 0
    }

    let averageChartsData = [
      {
        name: '以往',
        count: Math.round(100 - average)
      },
      {
        name: '当月',
        count: Math.round(average)
      }
    ]
    let monthChartsData = [
      {
        name: '上月',
        count: Math.round(100 - monthChain)
      },
      {
        name: '当月',
        count: Math.round(monthChain)
      }
    ]
    const bottomHeight = $('#status2RightBottom').height()
    const monthChartsHeight = $('.chartsBox').height() / 2
    //状态变化
    const chartsData = {
      data: averageDataList,
      height: monthChartsHeight,
      xAxis: 'date',
      yAxis: pageIdx == 0?'average':'grade',
      forceFit: true,
      padding: 'auto',
      hideTooltip: true,
      plotClickCb: this.plotClickCb.bind(this),
      cols: {
        date: {
          alias: '日期',
          tickCount:'3'
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
      data: averageChartsData,
      height: monthChartsHeight,
      hideLabel: true,
      innerText: Number(average).toFixed(0) + '分',
      innerRadius: 0.7,
      radius: 0.9,
      forceFit: true,
      padding: 'auto',
      hideTooltip: true,
      field: 'count',
      dimension: 'name',
      cols: {
        percent: {
          formatter: val => {
            val = val.toFixed(0) + '%'
            return val
          }
        }
      }
    }

    // 月环比
    const innerText = pageIdx == 0 ?monthChain.toFixed(2).toString():monthChain.toFixed(0).toString();
    const monthCharts = {
      data: monthChartsData,
      height: monthChartsHeight,
      innerText: innerText,
      innerRadius: 0.7,
      hideLabel: true,
      hideTooltip: true,
      radius: 0.9,
      forceFit: true,
      padding: 'auto',
      field: 'count',
      dimension: 'name',
      cols: {
        percent: {
          formatter: val => {
            val = val.toFixed(0) + '%'
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
                <div className="itemLeft">
                  {this.state.pageIdx == 0 ? '平均评分' : '评分'}
                </div>
                <div className="itemCenter">
                  <div className="charts">
                    <Labelline {...averageCharts} />
                  </div>
                </div>
                <div className="itemRight">
                  <div
                    className={
                      Number(averageTrend) >= 0
                        ? ['iconfont icon-icon-dsj red']
                        : ['iconfont icon-sanx-up green']
                    }
                  />
                  <span className="monthRange">
                    {(Number(averageTrend)).toFixed(2) + '%'}
                  </span>
                </div>
              </div>
              <div className="chartsBotttom">
                <div className="itemLeft">
                  {this.state.pageIdx == 0 ? '月环比' : '排名'}
                </div>
                <div className="itemCenter">
                  <div className="charts">
                    <Labelline {...monthCharts} />
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
                  <span className="monthRange">
                    {(Number(monthChainTrend)).toFixed(2) + '%'}
                  </span>
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
  
  renderPageTwoCenter() {
    const detailData = this.state.detailData || {}
    const info = detailData.dataList || {}
    const mapData = [
      {
        city: info.province,
        name: info.province,
        userValue: ''
      }
    ]
    return (
      <div className="page-center">
        <div className="section-content map ">
          <ChinaMapEcharts
            mapData={mapData}
            domId={'pageTwoMap'}
            provinceName={'中国'}
            hideMapName={true}
            goDown={false}
          />
        </div>
      </div>
    )
  }

  renderPageTwo() {
    
    let domHeight = $('.page-main').height();
    
    if(!this.state.detailData){
      return (
        <div className="status-main status-2" style={{ height: domHeight }}>
          <div className="page-left ">
            <div className="title-content">
              <h3>二次回路信息</h3>
            </div>
            <div className='empty-data'>暂无数据</div>
          </div>
          {this.renderPageTwoCenter()}
          <div className="page-right ">
            <div className="title-content">
              <h3>区域回路二次状态评估</h3>
            </div>
            <div className='empty-data'>暂无数据</div>
          </div>
        </div>
      )
    }

    let detailData = this.state.detailData || {};
    
    detailData = detailData.dataList
    let {
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

    eventList = eventList || [];

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
      plotClickCb: this.plotClickCb.bind(this),
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

    setTimeout(function(){
      const height = $('.even-details').height();
      const scrollHeight = $('.even-details .scroll-body').height();
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
      $('.even-details .scroll-body').css(animationStyle);
    },100);

    
    return (
      <div className="status-main status-2" style={{ height: domHeight }}>
        <div className="page-left ">

          <div className="title-content">
            <h3>二次回路信息</h3>
          </div>
          <div className="small-title label">
            <span className="arrow">&gt;&gt;</span>
            <div className="title">用户信息</div>
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
              {
                eventList.length > 0?
                <div className='scroll-body'>
                  {
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
                    })
                  }
                </div>:
                <div className='empty-data'>暂无数据</div>
              }
              
              
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
