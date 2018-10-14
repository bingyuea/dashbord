import React, { Component } from 'react'
import BaseView from '../core/view.base'
import $ from 'jquery'
import Mock from '../mock/mock'
//图表模型
import {
  ChinaMapEcharts,
  Labelline,
  Basicline,
  Doubleaxes,
  Basicbar,
  Groupedcolumn
} from '../ui/ui.charts'
import Slider from 'react-slick'

import SearchBar from '../ui/ui.searchbar.js'

import moment from 'moment'

import DataServince from '../services/searchbar.services'
import { Menu, Dropdown, Icon } from 'antd'

import MeunTitle from '../ui/ui.menuTitle'
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
    this.fetchQueryElecCurrentData({
      range: '全国'
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

  fetchQueryElecCurrentData(params) {
    const self = this
    const mapProvinceName = this.state.mapProvinceName
    const mapData = this.state.mapData
    queryElecCurrentData.setParam(
      {
        ...params
      },
      true
    )
    queryElecCurrentData.excute(
      res => {
        const exceptionDataObj = res || {}
        const exceptionData = exceptionDataObj.exceptionData || []
        self.setState({
          exceptionDataObj,
          mapData: mapProvinceName ? mapData : self.formatMapData(exceptionData)
        })
      },
      err => {}
    )
  }

  search(value) {
    //拿到搜索需要参数
    let _value = value || {}
    if (!_value.province) {
      _value.province = this.state.searchOptions.provinceOpts[0].value
    }

    if (!_value.subject) {
      _value.subject = this.state.searchOptions.themeOpts[0].value
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
    queryExceptionCount.setParam({ ...value }, true)
    queryExceptionCount.excute(
      res => {
        let pageTwo = self.state.pageTwo || {}
        pageTwo.totalCount = res.totalCount || 0
        self.setState({
          pageTwo: pageTwo
        })
      },
      err => {}
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
        let pageTwo = self.state.pageTwo || {}
        pageTwo.periodList = res.periodList || []
        self.setState({
          pageTwo: pageTwo
        })
      },
      err => {}
    )
  }

  // 二次回路异常事件查询
  fetchQuerySecondLoopExceptionCount(value) {
    let self = this
    //  '{"token":"234sdf234","province":"山西","subject":1,"startTime":"2011-01-01","endTime":"2019-01-1"}' "' "https://api.c2py.com/ele/shangcen/xmdplatform/querySecondLoopExceptionCount"
    // value = {}
    // value = {
    //   token: '234sdf234',
    //   province: '山西',
    //   subject: '1',
    //   startTime: '2011-01-01',
    //   endTime: '2019-01-1'
    // }
    querySecondLoopExceptionCount.setParam(
      {
        ...value
      },
      true
    )
    querySecondLoopExceptionCount.excute(
      res => {
        let pageTwo = self.state.pageTwo || {}
        pageTwo.periodListLine = res.periodList || []
        self.setState({
          pageTwo: pageTwo
        })
      },
      err => {}
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

  //地图数据
  formatMapData(list) {
    if (!list || list.length == 0) {
      return
    }
    let mapData = []
    list.map(item => {
      mapData.push({
        city: item.rangeName,
        name: item.rangeName,
        userValue: item.exceptionIndex
      })
    })
    return mapData
  }

  /**************   pageOne    *******************/
  renderPageCenter() {
    let mapData = this.state.mapData || [];
    let count = 0;
    const provinceName = this.state.provinceName;
    if(provinceName !== '中国' && provinceName){
      mapData = [{}];
    };


    let _this = this
    return (
      <div className="page-center">
        <div className="section-content map ">
          {/* <ChinaMapEcharts mapData={mapData} /> */}
          {/* <ChinaMapEcharts
            mapData={mapData}
            provinceClick={this.provinceClick.bind(this)}
          /> */}
          <ChinaMapEcharts
            mapData={mapData}
            provinceName={this.state.provinceName}
            hideMapName={true}
            mapNameClick={this.mapNameClick.bind(this)}
            goDown={true}
            goDownCallBack={this.mapcb.bind(this)}
          />
        </div>
      </div>
    )
  }

  mapNameClick(mapName){
    const provinceName = this.state.provinceName;
    const flag = provinceName == mapName || false;
    this.setState({
      provinceName:mapName,
      exceptionDataObj:null
    },()=>{
      if(!flag){
        this.fetchQueryElecCurrentData({
          range: mapName === '中国'?'全国':mapName
        })  
      }
    })
  }

  mapcb(name, option, instance) {
    const provinceName = this.state.provinceName;
    if(provinceName == name ){return}
    this.setState({
      provinceName:name,
      exceptionDataObj:null
    },()=>{
      if (name === '中国') {
        name = '全国'
      }
      this.fetchQueryElecCurrentData({
        range: name
      })  
    });
  }

  renderRank(list) {
    if (!list || list.length == 0) {
      return (
        <div className="scrollList">
          <div className="empty-data">暂无数据</div>
        </div>
      )
    }
    return (
      <div className="scrollList">
        <div className={list.length > 2 ? ['scroll-body'] : ['']}>
          {list.map((item, idx) => (
            <div
              className={
                (idx + 1) % 2 === 0
                  ? ['row3 flex-layout ']
                  : ['row2 flex-layout ']
              }
              key={idx}
            >
              <div className="flex">{item.user}</div>
              <div className="flex">{item.index}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  renderPageOne() {
    let appview = $('#appview').height()
    const domHeight = $('.page-main').height()
    let _this = this
    if (!domHeight) {
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
            <div className="small-title label">
              <span className="arrow">&gt;&gt;</span>
              <div className="title">疑似窃电风险排行榜</div>
              <span className="arrow last">&gt;&gt;</span>
              <div className="blue-line" />
            </div>
            <div className="tabel">
              <div className="row1 flex-layout ">
                <h6 className="h6 flex">用户</h6>
                <h6 className="h6 flex">评估值</h6>
              </div>
              {this.renderRank(exceptionData.stealingPowerRanking)}
            </div>
          </div>

          <div className="item">
            <div className="small-title label">
              <span className="arrow">&gt;&gt;</span>
              <div className="title">设备故障风险排行榜</div>
              <span className="arrow last">&gt;&gt;</span>
              <div className="blue-line" />
            </div>
            <div className="tabel">
              <div className="row1 flex-layout">
                <h6 className="h6 flex">用户</h6>
                <h6 className="h6 flex">评估值</h6>
              </div>
              {this.renderRank(exceptionData.troubleRanking)}
            </div>
          </div>

          <div className="item">
            <div className="small-title label">
              <span className="arrow">&gt;&gt;</span>
              <div className="title">错接线风险排行榜</div>
              <span className="arrow last">&gt;&gt;</span>
              <div className="blue-line" />
            </div>
            <div className="tabel">
              <div className="row1 flex-layout">
                <h6 className="h6 flex">用户</h6>
                <h6 className="h6 flex">评估值</h6>
              </div>
              {this.renderRank(exceptionData.wiringFaultRanking)}
            </div>
          </div>

          <div className="item">
            <div className="small-title label">
              <span className="arrow">&gt;&gt;</span>
              <div className="title">配变需扩容排行榜</div>
              <span className="arrow last">&gt;&gt;</span>
              <div className="blue-line" />
            </div>
            <div className="tabel">
              <div className="row1 flex-layout">
                <h6 className="h6 flex">用户</h6>
                <h6 className="h6 flex">评估值</h6>
              </div>
              {this.renderRank(exceptionData.expansionRanking)}
            </div>
          </div>
        </div>
        {this.renderPageCenter()}
        <div className="page-right">
          <div className="item">
            <div className="small-title label">
              <span className="arrow">&gt;&gt;</span>
              <div className="title">现场需维护排行榜</div>
              <span className="arrow last">&gt;&gt;</span>
              <div className="blue-line" />
            </div>
            <div className="tabel">
              <div className="row1 flex-layout">
                <h6 className="h6 flex">用户</h6>
                <h6 className="h6 flex">评估值</h6>
              </div>
              {this.renderRank(exceptionData.maintainRanking)}
            </div>
          </div>
          <div className="item">
            ·
            <div className="small-title label">
              <span className="arrow">&gt;&gt;</span>
              <div className="title">电池失效排行榜</div>
              <span className="arrow last">&gt;&gt;</span>
              <div className="blue-line" />
            </div>
            <div className="tabel">
              <div className="row1 flex-layout">
                <h6 className="h6 flex">用户</h6>
                <h6 className="h6 flex">评估值</h6>
              </div>
              {this.renderRank(exceptionData.failureRanking)}
            </div>
          </div>

          <div className="item">
            <div className="small-title label">
              <span className="arrow">&gt;&gt;</span>
              <div className="title">回路异常风险排行榜</div>
              <span className="arrow last">&gt;&gt;</span>
              <div className="blue-line" />
            </div>
            <div className="tabel">
              <div className="row1 flex-layout">
                <h6 className="h6 flex">用户</h6>
                <h6 className="h6 flex">评估值</h6>
              </div>
              {this.renderRank(exceptionData.loopExceRanking)}
            </div>
          </div>
          <div className="item">
            <div className="small-title label">
              <span className="arrow">&gt;&gt;</span>
              <div className="title">用电异常风险排行榜</div>
              <span className="arrow last">&gt;&gt;</span>
              <div className="blue-line" />
            </div>
            <div className="tabel">
              <div className="row1 flex-layout">
                <h6 className="h6 flex">用户</h6>
                <h6 className="h6 flex">评估值</h6>
              </div>
              {this.renderRank(exceptionData.elecExecRanking)}
            </div>
          </div>
        </div>
      </div>
    )
  }
  /**************   pageOne    *******************/

  /****************   pageTwo    *****************/
  renderSearchBar() {
    const {
      provinceOpts,
      cityOpts,
      measureOpts,
      unusalOpts,
      tradeOpts,
      themeOpts
    } = this.state.searchOptions || {}

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
      themeData: {
        title: '主题类型',
        key: 'subject',
        options: themeOpts
      },
      dateData: {
        title: '上报时间',
        defaultTime: this.indata.defaultTime
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
    let {
      totalCount, // 二次回路异常事件统计
      periodList, //异常事件数量变化趋势
      periodListLine //异常主题评估
    } = this.state.pageTwo || {}
    let periodListCharts = {} // 异常事件数量变化趋势
    let loop_bottom = $('.loop_bottom').height() - 40 // 异常事件数量变化趋势 高度
    let theme = {}
    let themeHeight = $('.themeHeight').height() - 20 // 异常主题评估 高度

    let _this = this

    let fieldsList = []
    if (periodListLine && periodListLine.length > 0) {
      fieldsList = periodListLine.map(item => {
        // return item.period.replace(/\'/g, '')
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
    let dataTemplate = {
      stealingPower: '疑似窃电',
      trouble: '设备故障',
      wiringFault: '错接线',
      expansion: '配变需扩容',
      maintain: '现场需维护',
      failure: '电池失效',
      loopExce: '回路异常',
      elecExec: '用电异常'
    }
    let data = []
    if (periodListLine && periodListLine.length > 0) {
      data = _this.getThemeData(periodListLine, nameList)
    }

    // 转化name
    if (Array.isArray) {
      data.map(item => {
        return (item.name = dataTemplate[item.name])
      })
    }

    periodListCharts = {
      data: periodList,
      height: loop_bottom,
      xAxis: 'period',
      yAxis: 'periodCount',
      forceFit: true,
      hidePoint: true,
      padding: 'auto',
      cols: {
        periodCount: {
          alias: '数量'
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
    theme = {
      data: data,
      fields: fieldsList,
      keyName: '时间',
      value: '事件数量',
      fieldsName: 'name',
      legend: {
        marker:'circle'
      },
      forceFit: true,
      hideTooltip: true,
      style: {
        overflow: 'hidden'
      },
      padding: 'auto',
      height: themeHeight,
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

    // '{"token":"234sdf234","province":"山西","subject":1,"startTime":"2011-01-01","endTime":"2019-01-1"}' "' "https://api.c2py.com/ele/shangcen/xmdplatform/getSubjectType"
    //  '{"token":"234sdf234","province":"山西","subject":1,"startTime":"2011-01-01","endTime":"2019-01-1"}' "' "https://api.c2py.com/ele/shangcen/xmdplatform/querySecondLoopExceptionCount"
    return (
      <div className="SecondaryanalyRight content">
        <div className="SecondaryanalyRight_left">
          <div className="content_box">
            <div className="loop_top">
                <div className="small-title">
                  <span className="arrow">&gt;&gt;</span>
                  <div className="title">二次回路异常事件统计</div>
                  <span className="arrow last">&gt;&gt;</span>
                  <div className="blue-line" />
                </div>
                <div className="loop_content loop_number">
                  <div className='text'>
                    {String(totalCount || 0).replace(
                      /(\d)(?=(?:\d{3})+$)/g,
                      '$1,'
                    )}
                    <span className="text-white">&nbsp;件</span>
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
        <div className="SecondaryanalyRight_right">
          <div className="event">
            <div className="content_box">
              <div className="small-title">
                <span className="arrow">&gt;&gt;</span>
                <div className="title">异常主题评估</div>
                <span className="arrow last">&gt;&gt;</span>
                <div className="blue-line" />
              </div>
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
  renderMeunTitle() {
    return <MeunTitle />
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
      touchMove: true,
      afterChange: this.afterSlickChange.bind(this)
    }

    return (
      <div className="page-slick page page-merge-analy">
        <div className="top-content">
          <h1 id="dropTitle" className="page-title">
            {
              <Dropdown
                overlay={this.renderMeunTitle()}
                className="dropContent"
              >
                <a className="ant-dropdown-link">
                  二次回路异常主题分析
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

module.exports = MergeAnaly
