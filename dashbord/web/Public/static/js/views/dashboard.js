import React, { Component } from 'react'
import BaseView from '../core/view.base'
import $ from 'jquery'
//图表模型
import {
  Basicline,
  Basiccolumn,
  Labelline,
  Grouped,
  Groupedcolumn,
  Basicbar,
  Basicradar,
  ChinaMapEcharts
} from '../ui/ui.charts'

import {
  ProvinceCountModel,
  YearCountModel,
  MeasureCountModel,
  TradeCountModel,
  EventCountModel,
  RateCountModel,
  ValidityEventCountModel,
  ProvinceEventCountModel,
  TradeEventCountModel
} from '../models/dashboard.models'

import Mock from '../mock/mock'

import { uniqueArr } from '../util/util'

import { Menu, Dropdown, Icon } from 'antd'

import MeunTitle from '../ui/ui.menuTitle'

//定义数据模型
const provinceCountModel = ProvinceCountModel.getInstance(),
  yearCountModel = YearCountModel.getInstance(),
  measureCountModel = MeasureCountModel.getInstance(),
  rateCountModel = RateCountModel.getInstance(),
  tradeCountModel = TradeCountModel.getInstance(),
  eventCountModel = EventCountModel.getInstance(),
  validityEventCountModel = ValidityEventCountModel.getInstance(),
  provinceEventCountModel = ProvinceEventCountModel.getInstance(),
  tradeEventCountModel = TradeEventCountModel.getInstance()

class Dashboard extends BaseView {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    this.pageInit()
    this.setState({
      pageStatus: 'init'
    })
  }

  pageInit() {
    this.fetchProvinceCount()
    this.fetchYearCount()
    this.fetchMeasureCount()
    this.fetchRateCount()
    this.fetchTradeCount()
    this.fetchEventCount()
    this.fetchValidityEventCount()
    this.fetchProvinceEventCount()
    this.fetchTradeEventCount()
  }

  //不同省份安装情况
  fetchProvinceCount() {
    const self = this
    provinceCountModel.excute(
      res => {
        const resData = res || {}
        const listData = resData.countList || []

        self.setState({
          provinceCountData: listData
        })
      },
      err => {}
    )
  }

  //安装时间安装情况
  fetchYearCount() {
    const self = this
    yearCountModel.excute(
      res => {
        const resData = res || {}
        const listData = resData.countList || []

        self.setState({
          yearCountData: listData
        })
      },
      err => {}
    )
  }

  //计量类型统计
  fetchMeasureCount() {
    const self = this
    measureCountModel.excute(
      res => {
        const resData = res || {}
        const listData = resData.countList || []
        self.setState({
          measureCountData: listData
        })
      },
      err => {}
    )
  }

  //综合倍率统计
  fetchRateCount() {
    const self = this
    rateCountModel.excute(
      res => {
        const resData = res || {}
        const listData = resData.countList || []

        self.setState({
          rateCountData: listData
        })
      },
      err => {}
    )
  }

  //行业类型统计
  fetchTradeCount() {
    const self = this

    tradeCountModel.excute(
      res => {
        const resData = res || {}
        const listData = resData.countList || []
        self.setState({
          tradeCountData: listData
        })
      },
      err => {}
    )
  }

  //事件类型情况
  fetchEventCount() {
    const self = this
    eventCountModel.excute(
      res => {
        const resData = res || {}
        const listData = resData.eventList || []
        self.setState({
          eventCountData: listData
        })
      },
      err => {}
    )
  }

  //有效性事件统计  未完
  fetchValidityEventCount() {
    const self = this
    validityEventCountModel.setParam({
      eventStatus: 1
    })
    validityEventCountModel.excute(
      res => {
        const resData = res || {}
        const listData = resData.eventList || []
        self.setState({
          validityEventCountData: listData
        })
      },
      err => {}
    )
  }

  //不同省份事件上报情况
  fetchProvinceEventCount() {
    const self = this
    provinceEventCountModel.excute(
      res => {
        const resData = res || {}
        const listData = resData.eventList || [];
        self.setState({
          provinceEventCountData: self.formatProvinceEventCount(
            listData,
            'eventName',
            'province',
            'count'
          )
        })
      },
      err => {}
    )
  }

  formatProvinceEventCount(list, filedsName, key, value) {
    if (!list) {
      return []
    }
    let newList = [],
      target = {}
    list.forEach(item => {
      target = {}
      target.name = item[filedsName];
      (item.detail || []).forEach(detailItem => {
        target[detailItem[key]] = detailItem[value]
      })
      newList.push(target)
    })

    return newList
  }

  // formatProvinceEventCountRadar(list){
  //   if (!list) {
  //     return []
  //   }
  //   let tempList = [],countKey,target = {};

  //   list.forEach(item=>{
  //     target = {};
  //     target.name = item.trade;
  //     (item.detail || []).forEach(detailItem=>{
  //       countKey ='trade' + detailItem.eventType;
  //       target[countKey] = detailItem.count;
  //     })
  //     tempList.push(target);
  //   })

  //   var fields  = this.getFields(tempList);
  //   var newList = [];
  //   var detail = {};

  //   fields.forEach(item=>{
  //     detail[item] = 0;
  //   })

  //   tempList.forEach(item=>{

  //     var detail = {
  //       trade1:0,
  //       trade2:0,
  //       trade3:0,
  //       trade4:0,
  //     }
  //     target = $.extend(detail, item);
      
  //     newList.push(target);
  //   })
  //   console.log(newList)

  //   return newList
  // }
   formatProvinceEventCountRadar(list){
    if (!list) {
      return []
    }
    let tempList = [],target = {};

    list.forEach(item=>{
      target = {};
      target.name = item.trade;
      (item.detail || []).forEach(detailItem=>{
        target[detailItem.eventName] = detailItem.count;
      })
      tempList.push(target);
    })
    return tempList
  }


  getFields(list) {
    if (!list) {
      return []
    }
    var temp = JSON.stringify(list)
    temp = JSON.parse(temp)
    let target = []
    temp.forEach(item => {
      delete item.name
      target = target.concat(Object.keys(item))
    })

    return uniqueArr(target)
  }

  //行业类型
  fetchTradeEventCount() {
    const self = this
    tradeEventCountModel.excute(
      res => {
        const resData = res || {}
        const listData = resData.eventList || []
        self.setState({
          tradeEventCountMData: self.formatProvinceEventCountRadar(listData)
        })
      },
      err => {}
    )
  }

  //地图数据
  formatMapData(list) {
    if (!list || list.length == 0) {
      return
    }
    let mapData = []
    list.map(item => {
      mapData.push({
        city: item.name,
        name: item.name,
        userValue: item.count
      })
    })
    return mapData
  }

  renderPageLeft() {
    const {
      provinceCountData,
      yearCountData,
      measureCountData,
      rateCountData,
      tradeCountData
    } = this.state

    const height = $('.page-left .charts-content').height()
    const chartHeight = (height - 35 * 4) / 4

    //不同省份安装情况
    const charts1 = {
      data: provinceCountData,
      height: chartHeight - 20,
      xAxis: 'name',
      yAxis: 'count',
      forceFit: true,
      padding: 'auto',
      cols: {
        count: {
          alias: '数量',
          tickCount: 5
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

    //安装时间
    const charts2 = {
      data: yearCountData,
      height: chartHeight,
      xAxis: 'year',
      yAxis: 'count',
      forceFit: true,
      padding: 'auto',
      hideTooltip: true,
      cols: {
        count: {
          alias: '数量',
          tickCount: 5
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

    //计量类型
    const charts3 = {
      data: measureCountData,
      height: chartHeight,
      forceFit: true,
      padding: 'auto',
      radius: 1,

      field: 'count',
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

    //综合倍率
    const charts4 = {
      data: rateCountData,
      height: chartHeight,
      forceFit: true,
      padding: 'auto',
      radius: 1,
      field: 'count',
      dimension: 'rate',
      cols: {
        percent: {
          formatter: val => {
            val = (val * 100).toFixed(0) + '%'
            return val
          }
        }
      }
    }

    //行业类型
    const charts5 = {
      data: tradeCountData,
      height: chartHeight + 20,
      xAxis: 'trade',
      yAxis: 'count',
      forceFit: false,
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

    return (
      <div className="page-left">
        <div className="title-content">
          <h3>安装综合统计</h3>
          <div className="bule-title-line" />
        </div>
        <div className="charts-content">
          <div className="section-content">
            <h6>不同省份安装情况</h6>
            <Basiccolumn {...charts1} />
          </div>
          <div className="section-content">
            <h6>安装时间</h6>
            <Basicline {...charts2} />
          </div>
          <div className="section-content has-child">
            <div className="section-left child">
              <h6>计量类型</h6>
              <Labelline {...charts3} />
            </div>
            <div className="section-right child">
              <h6>综合倍率</h6>
              <Labelline {...charts4} />
            </div>
          </div>
          <div className="section-content">
            <h6>行业类型</h6>
            <Basicbar {...charts5} />
          </div>
        </div>
      </div>
    )
  }

  renderNum(num) {
    const temp = num.split('')
    let cls = ''
    return temp.map((item, idx) => {
      cls = item == ',' ? 'num spec' : 'num'
      return (
        <li className={cls} key={idx}>
          {item}
        </li>
      )
    })
  }

  renderMeunTitle() {
    return <MeunTitle />
  }

  mapcb(name, option, instance){
    console.log(name)
    console.log(option)
    console.log(instance)
  }

  renderPageCenter() {
    const { provinceCountData } = this.state || {}

    const mapData = this.formatMapData(provinceCountData)
    // const mapData = this.formatMapData(Mock.charts1);
    let _this = this
    return (
      <div className="page-center">
        <h1 id="dropTitle">
          {
            <Dropdown overlay={this.renderMeunTitle()} className="dropContent">
              <a className="ant-dropdown-link">
                巡检仪大数据分析平台
                <Icon type="ordered-list" theme="outlined" />
              </a>
            </Dropdown>
          }
        </h1>
        <div className="section-content has-child">
          <div className="section-left child">
            <h4>巡检仪安装总量</h4>
            <div className="num-box">{this.renderNum('213,12')}</div>
          </div>
          <div className="section-right child">
            <h4>巡检仪线上运行数量</h4>
            <div className="num-box">{this.renderNum('342,89')}</div>
          </div>
        </div>
        <div className="section-content map">
          <ChinaMapEcharts mapData={mapData}  goDownCallBack= {this.mapcb.bind(this)} goDown={true}/>
          <div className="bottom-txt">中国电力科学研究院</div>
        </div>
      </div>
    )
  }
  renderPageRight() {
    const {
      eventCountData,
      validityEventCountData,
      provinceEventCountData,
      tradeEventCountMData
    } = this.state

    const height = $('.page-right .charts-content').height()
    let chartHeight = (height - 25 * 3 - 65) / 3
    let labelHeight = chartHeight
    //page-right 的innerwidth
    const domWidth = $('body').width() / 4 - 40
    if (domWidth / 2 < chartHeight) {
      labelHeight = domWidth / 2
      chartHeight = (height - 25 * 3 - 65 - labelHeight) / 2
    }
    //事件有效性
    const charts6 = {
      // data:validityEventCountData,
      data: eventCountData ? Mock.charts6 : '',
      height: labelHeight,
      innerRadius: 0.7,
      legend: {
        position: 'bottom-center',
        textStyle: {
          fontSize: 10
        }
      },
      radius: 0.9,
      forceFit: true,
      padding: 'auto',
      field: 'count',
      dimension: 'eventName',
      cols: {
        percent: {
          formatter: val => {
            val = (val * 100).toFixed(0) + '%'
            return val
          }
        }
      }
    }
    //事件类型
    const charts7 = {
      data: eventCountData,
      height: labelHeight,
      innerRadius: 0.7,
      radius: 0.9,
      forceFit: true,
      padding: 'auto',
      legend: {
        position: 'bottom-center',
        textStyle: {
          fontSize: 10
        }
      },
      field: 'count',
      dimension: 'eventName',
      cols: {
        percent: {
          formatter: val => {
            val = (val * 100).toFixed(0) + '%'
            return val
          }
        }
      }
    }
    //不同省份上报事件情况
    const charts8 = {
      data: provinceEventCountData,
      fields: this.getFields(provinceEventCountData),
      keyName: '地区',
      value: '上报数量',
      fieldsName: 'name',
      forceFit: true,
      hideTooltip:true,
      legend: {
        position: 'top-center',
        marker: 'circle',
        textStyle: {
          fontSize: 10
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
      },
      padding: 'auto',
      height: chartHeight
    }
    console.log(tradeEventCountMData)
    console.log(this.getFields(tradeEventCountMData))
    const charts10 = {
      data: tradeEventCountMData,
      height: chartHeight,
      padding: 'auto',
      xAxis: 'name',
      fields:this.getFields(tradeEventCountMData),
      forceFit: false,
      style: {
        overflow: 'hidden'
      }
    }

    return (
      <div className="page-right">
        <div className="title-content">
          <h3>异常综合统计</h3>
        </div>
        <div className="charts-content">
          <div className="section-content has-child">
            <div className="section-left child">
              <h6>事件有效性</h6>
              <Labelline {...charts6} />
            </div>
            <div className="section-right child">
              <h6>事件类型</h6>
              <Labelline {...charts7} />
            </div>
          </div>

          <div className="section-content has-child">
            <div className="child">
              <h6 className="spec">月上报事件数</h6>
              <div className="text">
                <span>{'123,123'}</span> 件
              </div>
            </div>
            <div className="child">
              <h6 className="spec">有效性</h6>
              <div className="text">
                <span>{'98'}</span> %
              </div>
            </div>
          </div>
          <div className="section-content">
            <h6>不同事件上报事件情况</h6>
            <Groupedcolumn {...charts8} />
          </div>
          <div className="section-content flex-column">
            <h6 style={{ textAlign: 'center' }}>行业类型</h6>
            <Basicradar {...charts10} />
          </div>
        </div>
      </div>
    )
  }
  renderMain() {
    return (
      <div className="page-dashboard page">
        {this.renderPageLeft()}
        {this.renderPageCenter()}
        {this.renderPageRight()}
      </div>
    )
  }
}

module.exports = Dashboard
