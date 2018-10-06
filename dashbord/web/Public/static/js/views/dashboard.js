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
  ChinaMapChart,
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
        const listData = resData.eventList || []
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
      target.name = item[filedsName]
      ;(item.detail || []).forEach(detailItem => {
        target[detailItem[key]] = detailItem[value]
      })
      newList.push(target)
    })

    return newList
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
          tradeEventCountMData: self.formatProvinceEventCount(
            listData,
            'trade',
            'eventName',
            'count'
          )
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
    const chartHeight = (height - 25 * 4) / 4;

    //不同省份安装情况
    const charts1 = {
      data: provinceCountData,
      height: chartHeight - 20,
      xAxis: 'name',
      yAxis: 'count',
      forceFit: true,
      padding: 'auto',
      cols: {
        'count':{
          tickCount:5
        }
      },
      style: {
        overflow: 'auto'
      },
      xLabel: {
        offset: 15,
        textStyle:{
          fill:'#fff',
          fontSize:12
        }
      },
      yLabel: {
        offset: 5,
        textStyle:{
          fill:'#fff',
          fontSize:12
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
      cols: {
        sales: {
          alias: 'year',
        },
        count:{
          tickCount:5
        }
      },
      style: {
        overflow: 'hidden'
      },
      xLabel: {
        offset: 15,
        textStyle:{
          fill:'#fff',
          fontSize:12
        }
      },
      yLabel: {
        offset: 5,
        textStyle:{
          fill:'#fff',
          fontSize:12
        }
      }
    }

    //计量类型
    const charts3 = {
      data: measureCountData,
      height: chartHeight,
      forceFit: true,
      padding: 'auto',
      radius:.7,
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
      radius:.7,
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
        textStyle:{
          fill:'#fff',
          fontSize:12
        }
      },
      yLabel: {
        offset: 5,
        textStyle:{
          fill:'#fff',
          fontSize:10
        }
      }
    }

    return (
      <div className="page-left">
        <div className="title-content">
          <h3>安装综合统计</h3>
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

  renderNum(num){
    const temp = num.split('');
    let cls = '';
    return temp.map((item,idx)=>{
      cls = item == ','?'num spec':'num';
      return (
        <li className={cls} key={idx}>{item}</li>
      )
    })
  }
  renderPageCenter() {
    const { provinceCountData } = this.state || {}

    const height = $('.page-center').height()
    const mapHeight = height - 80 - 80 - 20 - 50

    const mapData = this.formatMapData(provinceCountData);
    // const mapData = this.formatMapData(Mock.charts1);
    
    return (
      <div className="page-center">
        <h1>巡检仪大数据分析平台</h1>
        <div className="section-content has-child">
          <div className="section-left child">
            <h4>巡检仪安装总量</h4>
            <div className="num-box">
              {this.renderNum('213,12')}
            </div>
          </div>
          <div className="section-right child">
            <h4>巡检仪线上运行数量</h4>
            <div className="num-box">
              {this.renderNum('342,89')}
            </div>
          </div>
        </div>
        <div className="section-content map">
          <ChinaMapEcharts mapData={mapData} />
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
    let chartHeight = (height - 25 * 3 - 65) / 3;
    let labelHeight = chartHeight;
    //page-right 的innerwidth
    const domWidth = $('body').width() / 4 - 40;
    if(domWidth / 2 < chartHeight){
      labelHeight = domWidth / 2;
      chartHeight = (height - 25 * 3 - 65 - labelHeight) / 2;
    }
    //事件有效性
    const charts6 = {
      // data:validityEventCountData,
      data: eventCountData ? Mock.charts6 : '',
      height: labelHeight,
      innerRadius: 0.7,
      radius:.9,
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
      radius:.9,
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
    //不同省份上报事件情况
    const charts8 = {
      data: provinceEventCountData,
      fields: this.getFields(provinceEventCountData),
      keyName: '地区',
      value: '上报数量',
      fieldsName: 'name',
      forceFit: true,
      style: {
        overflow: 'hidden'
      },
      xLabel: {
        offset: 15,
        textStyle:{
          fill:'#fff',
          fontSize:12
        }
      },
      yLabel: {
        offset: 5,
        textStyle:{
          fill:'#fff',
          fontSize:10
        }
      },
      padding: 'auto',
      height: chartHeight
    }

    console.log(tradeEventCountMData)
    console.log(this.getFields(tradeEventCountMData))

    const charts9 = {
      data: tradeEventCountMData,
      height: chartHeight,
      padding: 'auto',
      fields: this.getFields(tradeEventCountMData),
      keyName: '行业',
      value: '上报数量',
      xLabel: {
        offset: 15,
        textStyle:{
          fill:'#fff',
          fontSize:12
        }
      },
      yLabel: {
        offset: 5,
        textStyle:{
          fill:'#fff',
          fontSize:10
        }
      },
      fieldsName: 'name',
      forceFit: true,
      style: {
        overflow: 'hidden'
      }
    }

    const charts10 = {
      data: tradeEventCountMData && tradeEventCountMData.slice(0,3),
      height: chartHeight,
      padding: 'auto',
      xAxis:'name',
      yAxis:'count',
      fields: tradeEventCountMData && this.getFields(tradeEventCountMData.slice(0,3)),
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

          <div
            className="section-content has-child"
            
          >
            <div className="child">
              <h6>月上报事件数</h6>
              <div className="text">
                <span>{'123,123'}</span> 件
              </div>
            </div>
            <div className="child">
              <h6>有效性</h6>
              <div className="text">
                <span>{'123.22'}</span> %
              </div>
            </div>
          </div>
          <div className="section-content">
            <h6>不同事件上报事件情况</h6>
            <Groupedcolumn {...charts8} />
          </div>
          <div className="section-content flex-column">
            <h6 style={{textAlign:'center'}}>行业类型</h6>
            <Groupedcolumn {...charts9} />
            {/*<Basicradar {...charts10} />*/}
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
