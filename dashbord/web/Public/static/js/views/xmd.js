import React, { Component } from 'react'
import BaseView from '../core/view.base'
import $ from 'jquery'
import { Table } from 'antd'
//图表模型
import {
  Basicline,
  Basiccolumn,
  Labelline,
  Grouped,
  Groupedcolumn,
  Basicbar,
  Basicradar,
  Doubleaxes,
  ChinaMapChart
} from '../ui/ui.charts'
import SearchBar from '../ui/ui.searchbar.js'

import moment from 'moment'

import DataServince from '../services/searchbar.services'

import Slider from 'react-slick'

import { translateCountToPercent } from '../util/util'
import { Menu, Dropdown, Icon } from 'antd'

import MeunTitle from '../ui/ui.menuTitle'
import {
  XmdInstallModel,
  CustomerInfoModel,
  RateModel,
  MeasureModel,
  XmdTableListModel,
  XmdEventModel,
  CustomerXmdEventModel,
  RateEventModel,
  MeasureEventModel,
  XmdEventTableListModel
} from '../models/xmd.models'

const xmdInstallModel = XmdInstallModel.getInstance(),
  customerInfoModel = CustomerInfoModel.getInstance(),
  xmdTableListModel = XmdTableListModel.getInstance(),
  xmdEventModel = XmdEventModel.getInstance(),
  measureModel = MeasureModel.getInstance(),
  customerXmdEventModel = CustomerXmdEventModel.getInstance(),
  rateEventModel = RateEventModel.getInstance(),
  measureEventModel = MeasureEventModel.getInstance(),
  xmdEventTableListModel = XmdEventTableListModel.getInstance(),
  rateModel = RateModel.getInstance()

//巡检仪安装情况
class XMD extends BaseView {
  constructor(props) {
    super(props)
    this.state = {
      pageTitle: '巡检仪安装情况查询',
      pageIdx: 0
    }

    const dateFormat = 'YYYY-MM-DD HH:mm'
    const today = moment().format(dateFormat)
    const lastday = moment()
      .add(-1, 'days')
      .format(dateFormat)

    this.indata = {
      defaultTime: ['2001-01-01 00:00', today],
      size: 5,
      pageTwoTableCloumn: [
        {
          title: '所属地市',
          dataIndex: 'place',
          width: '14.8%',
          align: 'center',
          key: 'city'
        },
        {
          title: '巡检仪资产编号',
          dataIndex: 'serialNum',
          width: '24%',
          align: 'center',
          className: 'blue',
          key: 'serialNum'
        },
        {
          title: '行业类别',
          dataIndex: 'trade',
          width: '14.8%',
          align: 'center',
          key: 'trade'
        },
        {
          title: '异常类型',
          dataIndex: 'exception',
          width: '14.8%',
          align: 'center',
          key: 'exception'
        },
        {
          title: '异常日期',
          dataIndex: 'occTime',
          width: '16.8%',
          align: 'center',
          key: 'occTime',
          render: this.formatDate.bind(this)
        },
        {
          title: '恢复日期',
          dataIndex: 'recoverTime',
          width: '16.8%',
          align: 'center',
          key: 'recoverTime',
          render: this.formatRecoverDate.bind(this)
        }
      ],
      pageOneTableCloumn: [
        {
          title: '所属地市',
          dataIndex: 'place',
          width: '14.8%',
          align: 'center',
          key: 'city'
        },
        {
          title: '巡检仪资产编号',
          dataIndex: 'serialNum',
          className: 'blue',
          width: '28%',
          align: 'center',
          key: 'serialNum'
        },
        {
          title: '行业类别',
          dataIndex: 'trade',
          width: '14.8%',
          align: 'center',
          key: 'trade'
        },
        {
          title: '安装日期',
          dataIndex: 'time',
          width: '14.8%',
          key: 'time',
          align: 'center'
        },
        {
          title: '综合倍率',
          dataIndex: 'rate',
          className: 'yellow',
          width: '14.8%',
          align: 'center',
          key: 'rate'
        },
        {
          title: '接线方式',
          dataIndex: 'measureName',
          width: '14.8%',
          align: 'center',
          key: 'measureName'
        }
      ]
    }
  }

  componentDidMount() {
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

  componentDidUpdate() {
    // //获取需要滚动的高度
    // const scrollHeight = $('.ant-table-body').scrollHeight
    // //算出需要滚动的时间
    // console.log(scrollHeight)
    // if (!scrollHeight) {
    //   return false
    // }
    // const time = scrollHeight / 20
    // //复制
    // $('.ant-table-body').attr('style', 'animationDuration:' + time)
  }

  formatDate(text, record, index) {
    const tempStr = text.split(' ')
    return (
      <div style={{ fontSize: '10px' }}>
        {tempStr[0].slice(2)}
        <br />
        {tempStr[1]}
      </div>
    )
  }

  formatRecoverDate(text, record, index) {
    if (text == '未恢复') {
      return '未恢复'
    } else {
      const tempStr = text.split(' ')
      return (
        <div style={{ fontSize: '10px' }}>
          {tempStr[0].slice(2)}
          <br />
          {tempStr[1]}
        </div>
      )
    }
  }

  search(value) {
    this.setState({
      pageOne: null,
      pageTwo: null
    })
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
    this.fetchPageTwo(_value)
  }

  fetchPageOne(value) {
    this.fetchXmdInstall(value)
    this.fetchCustomerInfo(value)
    this.fetchRate(value)
    this.fetchMeasure(value)
    this.fetchXmdTableLis(value)
  }
  //巡检仪安装情况
  fetchXmdInstall(value) {
    const self = this
    xmdInstallModel.setParam({ ...value })
    xmdInstallModel.excute(
      res => {
        const resData = res || {}
        let pageOne = self.state.pageOne || {}
        pageOne.xmdInstall = resData
        const num = Math.ceil(
          (resData.areaList || []).length / self.indata.size
        )
        self.setState({
          pageOne: pageOne,
          locationInfoNum: num
        })
      },
      err => {}
    )
  }

  //客户分布情况
  fetchCustomerInfo(value) {
    const self = this
    customerInfoModel.setParam({ ...value })
    customerInfoModel.excute(
      res => {
        const resData = res || {}
        let pageOne = self.state.pageOne || {}
        pageOne.customer = resData
        self.setState({
          pageOne: pageOne
        })
      },
      err => {}
    )
  }
  //综合倍率
  fetchRate(value) {
    const self = this
    rateModel.setParam({ ...value })
    rateModel.excute(
      res => {
        const resData = res || {}
        let pageOne = self.state.pageOne || {}
        pageOne.rate = resData
        self.setState({
          pageOne: pageOne
        })
      },
      err => {}
    )
  }

  //计量类型
  fetchMeasure(value) {
    const self = this
    measureModel.setParam({ ...value })
    measureModel.excute(
      res => {
        const resData = res || {}
        let pageOne = self.state.pageOne || {}
        pageOne.measure = resData
        self.setState({
          pageOne: pageOne
        })
      },
      err => {}
    )
  }

  //巡检仪档案table
  fetchXmdTableLis(value) {
    const self = this
    xmdTableListModel.setParam({ ...value })
    xmdTableListModel.excute(
      res => {
        const resData = res || {}
        let pageOne = self.state.pageOne || {}
        pageOne.table = resData
        self.setState({
          pageOne: pageOne
        })
      },
      err => {}
    )
  }

  fetchPageTwo(value) {
    this.fetchXmdEvent(value)
    this.fetchCustomerXmdEvent(value)
    this.fetchRateXmdEvent(value)
    this.fetchMeasureXmdEvent(value)
    this.fetcXmdEventTableListEvent(value)
  }

  //巡检仪上报事件
  fetchXmdEvent(value) {
    const self = this
    xmdEventModel.setParam({ ...value })
    xmdEventModel.excute(
      res => {
        const resData = res || {}
        let pageTwo = self.state.pageTwo || {}
        pageTwo.xmdEvent = resData
        self.setState({
          pageTwo: pageTwo
        })
      },
      err => {}
    )
  }
  //事件分布信息
  fetchCustomerXmdEvent(value) {
    const self = this
    customerXmdEventModel.setParam({ ...value })
    customerXmdEventModel.excute(
      res => {
        const resData = res || {}
        let pageTwo = self.state.pageTwo || {}
        pageTwo.customerXmdEvent = resData
        self.setState({
          pageTwo: pageTwo
        })
      },
      err => {}
    )
  }

  //two综合倍率
  fetchRateXmdEvent(value) {
    const self = this
    rateEventModel.setParam({ ...value })
    rateEventModel.excute(
      res => {
        const resData = res || {}
        let pageTwo = self.state.pageTwo || {}
        pageTwo.rateEvent = resData
        self.setState({
          pageTwo: pageTwo
        })
      },
      err => {}
    )
  }

  //two计量类型
  fetchMeasureXmdEvent(value) {
    const self = this
    measureEventModel.setParam({ ...value })
    measureEventModel.excute(
      res => {
        const resData = res || {}
        let pageTwo = self.state.pageTwo || {}
        pageTwo.measureEvent = resData
        self.setState({
          pageTwo: pageTwo
        })
      },
      err => {}
    )
  }
  //two计量类型
  fetcXmdEventTableListEvent(value) {
    const self = this
    xmdEventTableListModel.setParam({ ...value })
    xmdEventTableListModel.excute(
      res => {
        const resData = res || {}
        let pageTwo = self.state.pageTwo || {}
        pageTwo.xmdEventTable = resData
        self.setState({
          pageTwo: pageTwo
        })
      },
      err => {}
    )
  }

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

    console.log(this.state.searchOptions)

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
      measureData: {
        title: '计量类型',
        key: 'measure',
        options: measureOpts
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
  afterSlickChange(idx) {
    const pageTitle = idx == 0 ? '巡检仪安装情况查询' : '巡检仪上报事件查询'
    this.setState({
      pageTitle: pageTitle,
      pageIdx: idx
    })
  }

  //切换轮播
  slickBtn(idx) {
    this.slider.slickGoTo(idx)
  }

  renderTable(pageIdx, table) {
    const { pageOneTableCloumn, pageTwoTableCloumn } = this.indata

    const columns = pageIdx == 0 ? pageOneTableCloumn : pageTwoTableCloumn

    //增加目前是否选择了城市的判断
    //TODO
    const tableData = table || []

    let list = tableData.map((item, index) => {
      item.key = index
      if (!item.recoverTime) {
        item.recoverTime = '未恢复'
      }
      return item
    })

    const domHeight = $('.page-main').height()

    if (!domHeight) {
      return false
    }

    const tableHeight = domHeight - 10 - 20 - 21 - 20

    let self = this

    $('.scrollTable .ant-table-body').on('scroll', function() {
      let viewH = $(this).height(),
        contentH = $(this)
          .children()
          .height(),
        scrollTop = $(this).scrollTop(),
        distance = 100

      if (contentH - viewH - scrollTop <= distance) {
        // self.fetchPageTwo(value)
      }
    })

    const title = pageIdx == 0 ? '巡检仪档案信息' : '巡检仪上报事件'

    return (
      <div className="table-box">
        <div className="small-title">
          <span className="arrow">&gt;&gt;</span>
          <div className="title">{title}</div>
          <span className="arrow last">&gt;&gt;</span>
          <div className="blue-line" />
        </div>
        <div className="content-table">
          <Table
            className={'scrollTable'}
            columns={columns}
            dataSource={list}
            pagination={false}
            scroll={{ y: tableHeight }}
            locale={{
              emptyText: '暂无数据'
            }}
          />
        </div>
      </div>
    )
  }

  changeLocationPage(canGo, page) {
    if (!canGo) {
      return false
    }
    this.setState({
      locationPageNum: page
    })
  }

  renderLocationInfoCharts(data, height) {
    if (!data) {
      return false
    }
    const size = this.indata.size
    //算出需要几页
    const num = this.state.locationInfoNum || 1
    const current = this.state.locationPageNum || 1

    const tempData = JSON.parse(JSON.stringify(data))

    const chartsData = tempData.splice((current - 1) * size, size)

    const nextPage = current + 1,
      lastPage = current - 1
    const nextCanGo = nextPage <= num || false
    const lastCanGo = lastPage >= 1 || false

    //地区分布信息
    const charts5 = {
      data: chartsData,
      height: height,
      xAxis: 'area',
      yAxis: 'areaCount',
      forceFit: true,
      padding: 'auto',
      style: {
        overflow: 'hidden'
      },
      cols: {
        areaCount: {
          alias: '数量'
        }
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
      <div className="section-content location-info">
        <div className="top-title">
          <span>地区分布信息</span>
          <div className="operaiton">
            <span
              className={lastCanGo ? 'active' : ''}
              onClick={this.changeLocationPage.bind(this, lastCanGo, lastPage)}
            >
              &lt;
            </span>
            <span
              className={nextCanGo ? 'active' : ''}
              onClick={this.changeLocationPage.bind(this, nextCanGo, nextPage)}
            >
              &gt;
            </span>
          </div>
        </div>
        <Basicbar {...charts5} />
      </div>
    )
  }

  renderPageOne() {
    const pageOne = this.state.pageOne || {}
    const [
      xmdInstall = {},
      customer = {},
      rate = {},
      measure = {},
      table = {}
    ] = [
      pageOne.xmdInstall,
      pageOne.customer,
      pageOne.rate,
      pageOne.measure,
      pageOne.table
    ]

    const self = this
    const domHeight = $('.page-main').height()
    if (!domHeight) {
      return false
    }
    const leftChartHeight = (domHeight - 20 - 21 - 70 - 25 * 2) / 2
    const centerChartHeight = (domHeight - 15 - 10) / 2 - 20 - 21 - 25
    // let centerTopHeight = leftChartHeight;
    //巡检仪上线数
    const charts2 = {
      data: xmdInstall.periodList,
      height: leftChartHeight,
      xAxis: 'period',
      yAxis: 'periodCount',
      forceFit: true,
      padding: 'auto',
      style: {
        overflow: 'hidden'
      },
      cols: {
        periodCount: {
          alias: '数量'
        },
        period: {
          tickCount: 6
        }
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

    const tradeList = translateCountToPercent(customer.tradeList, 'tradeCount')
    //客户分布情况
    const charts8 = {
      data: tradeList,
      height: centerChartHeight,
      xAxis: 'tradeName',
      yAxis_line: 'tradeCount',
      yAxis_line_name: '占比',
      yAxis_interval: 'percent',
      yAxis_interval_name: '行业',
      forceFit: false,
      padding: 'auto',
      cols: {
        tradeCount: {
          tickCount: 5,
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
      }
      // yLabel: {
      //   offset: 5,
      //   textStyle: {
      //     fontSize:10
      //   }
      // }
    }

    //综合倍率
    const charts3 = {
      data: rate.rateList,
      height: centerChartHeight,
      forceFit: true,
      padding: 'auto',
      field: 'rateCount',
      // legend: true,
      hideLabel: true,
      dimension: 'rate',
      innerRadius: 0.7,
      cols: {
        percent: {
          formatter: val => {
            val = (val * 100).toFixed(0) + '%'
            return val
          }
        }
      }
    }
    //计量类型
    const charts4 = {
      data: measure.rateList,
      height: centerChartHeight,
      forceFit: true,
      innerRadius: 0.7,
      // legend: true,
      hideLabel: true,
      padding: 'auto',
      field: 'measureCount',
      dimension: 'measureName',
      cols: {
        percent: {
          formatter: val => {
            val = (val * 100).toFixed(0) + '%'
            return val
          }
        }
      }
    }

    const totalCount = xmdInstall.totalCount || 0

    return (
      <div className="slick-page" style={{ height: domHeight }}>
        <div className="side-content content_box">
          <div className="small-title">
            <span className="arrow">&gt;&gt;</span>
            <div className="title">巡检仪安装情况</div>
            <span className="arrow last">&gt;&gt;</span>
            <div className="blue-line" />
          </div>
          <div className="total-num has-bg">
            <span className="blue-txt">
              {totalCount.toString().replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}
            </span>
            台
          </div>
          <div className="charts-content">
            <div className="section-content">
              <span>巡检仪上线数</span>
              <Basicline {...charts2} />
            </div>
            {this.renderLocationInfoCharts(
              xmdInstall.areaList,
              leftChartHeight
            )}
          </div>
        </div>
        <div className="center-content">
          <div className="top content_box">
            <div className="small-title">
              <span className="arrow">&gt;&gt;</span>
              <div className="title">客户分布情况</div>
              <span className="arrow last">&gt;&gt;</span>
              <div className="blue-line" />
            </div>
            <div className="section-content">
              <span>行业信息</span>
              <div
                style={{
                  display: 'flex',
                  alignItem: 'center',
                  justifyContent: 'center'
                }}
              >
                <Doubleaxes {...charts8} />
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="section-content">
              <div className="small-title">
                <span className="arrow">&gt;&gt;</span>
                <div className="title">综合倍率</div>
                <span className="arrow last">&gt;&gt;</span>
                <div className="blue-line" />
              </div>
              <Labelline {...charts3} />
            </div>
            <div className="section-content">
              <div className="small-title">
                <span className="arrow">&gt;&gt;</span>
                <div className="title">计量类型</div>
                <span className="arrow last">&gt;&gt;</span>
                <div className="blue-line" />
              </div>
              <Labelline {...charts4} />
            </div>
          </div>
        </div>
        <div className="side-content content_box spec">
          {this.renderTable(0, table.dataList)}
        </div>
      </div>
    )
  }

  renderPageTwo() {
    const pageTwo = this.state.pageTwo || {}
    const [
      xmdEvent = {},
      customerXmdEvent = {},
      rateEvent = {},
      measureEvent = {},
      xmdEventTable = {}
    ] = [
      pageTwo.xmdEvent,
      pageTwo.customerXmdEvent,
      pageTwo.rateEvent,
      pageTwo.measureEvent,
      pageTwo.xmdEventTable
    ]

    const domHeight = $('.page-main').height()
    if (!domHeight) {
      return false
    }
    const leftChartHeight = (domHeight - 25 - 2 - 70 - 70 - 20) / 2
    const centerChartHeight = domHeight / 2 - 20 - 27
    let centerTopHeight = leftChartHeight

    const charts1 = {
      data: xmdEvent,
      height: leftChartHeight
    }

    //巡检仪事件趋势
    const charts2 = {
      data: xmdEvent.periodList,
      height: leftChartHeight,
      xAxis: 'period',
      yAxis: 'periodCount',
      forceFit: true,
      padding: 'auto',
      style: {
        overflow: 'hidden'
      },
      cols: {
        periodCount: {
          alias: '发生数量'
        }
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
    //事件类型信息
    const charts5 = {
      data: xmdEvent.exceptionList,
      height: leftChartHeight,
      xAxis: 'name',
      yAxis: 'exceptionCount',
      forceFit: true,
      padding: 'auto',
      style: {
        overflow: 'hidden'
      },
      cols: {
        exceptionCount: {
          alias: '发生数量'
        }
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
    const tradeList = translateCountToPercent(
      customerXmdEvent.tradeList,
      'tradeCount'
    )
    //事件分布信息
    const charts8 = {
      data: customerXmdEvent.tradeList,
      height: centerTopHeight,
      xAxis: 'tradeName',
      yAxis_line: 'tradeCount',
      yAxis_line_name: '占比',
      yAxis_interval: 'percent',
      yAxis_interval_name: '行业',
      forceFit: false,
      padding: 'auto',
      cols: {
        tradeCount: {
          tickCount: 5,
          alias: '数量'
        },
        percent: {
          alias: '占比',
          min: 0,
          max: 100,
          formatter: val => {
            val = val + '%'
            return val
          },
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
      }
    }

    //综合倍率
    const charts3 = {
      data: rateEvent.rateList,
      height: centerChartHeight,
      forceFit: true,
      padding: 'auto',
      field: 'rateCount',
      // legend: true,
      innerRadius: 0.7,
      dimension: 'rate',
      hideLabel: true,
      cols: {
        percent: {
          formatter: val => {
            val = (val * 100).toFixed(0) + '%'
            return val
          }
        }
      }
    }
    //计量类型
    const charts4 = {
      data: measureEvent.rateList,
      height: centerChartHeight,
      forceFit: true,
      // legend: true,
      innerRadius: 0.7,
      padding: 'auto',
      field: 'measureCount',
      dimension: 'measureName',
      hideLabel: true,
      cols: {
        percent: {
          formatter: val => {
            val = (val * 100).toFixed(0) + '%'
            return val
          }
        }
      }
    }

    const totalCount = xmdEvent.totalCount || 0

    return (
      <div className="slick-page" style={{ height: domHeight }}>
        <div className="side-content content_box">
          <div className="small-title">
            <span className="arrow">&gt;&gt;</span>
            <div className="title">巡检仪事件统计</div>
            <span className="arrow last">&gt;&gt;</span>
            <div className="blue-line" />
          </div>
          <div className="bottom-section">
            <div className="total-num">
              <span className="blue-txt">
                {totalCount.toString().replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}
              </span>
              件
            </div>
            <div className="right-content">{/*<Labelline {...charts1}/>*/}</div>
          </div>

          <div className="charts-content">
            <div className="section-content">
              <span>巡检仪事件趋势</span>
              <Basicline {...charts2} />
            </div>
            <div className="section-content">
              <span>事件类型信息</span>
              <Basicbar {...charts5} />
            </div>
          </div>
        </div>
        <div className="center-content">
          <div className="top content_box">
            <div className="small-title">
              <span className="arrow">&gt;&gt;</span>
              <div className="title">客户分布情况</div>
              <span className="arrow last">&gt;&gt;</span>
              <div className="blue-line" />
            </div>
            <div className="section-content" id="centerSectionContent">
              <span>行业信息</span>
              <Doubleaxes {...charts8} />
            </div>
          </div>
          <div className="bottom">
            <div className="section-content" id="bottomSectionContent">
              <div className="small-title">
                <span className="arrow">&gt;&gt;</span>
                <div className="title">综合倍率</div>
                <span className="arrow last">&gt;&gt;</span>
                <div className="blue-line" />
              </div>
              <Labelline {...charts3} />
            </div>
            <div className="section-content">
              <div className="small-title">
                <span className="arrow">&gt;&gt;</span>
                <div className="title">计量类型</div>
                <span className="arrow last">&gt;&gt;</span>
                <div className="blue-line" />
              </div>
              <Labelline {...charts4} />
            </div>
          </div>
        </div>
        <div className="side-content content_box spec" style={{ width: '45%' }}>
          {this.renderTable(1, xmdEventTable.rateList)}
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

    const { pageIdx } = this.state

    return (
      <div className="page-xmd page-slick page">
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
            className={pageIdx == 0 ? 'btn active' : 'btn'}
            onClick={this.slickBtn.bind(this, 0)}
          />
          <div
            className={pageIdx == 1 ? 'btn active' : 'btn'}
            onClick={this.slickBtn.bind(this, 1)}
          />
        </div>
        {this.renderSearchBar()}
        <div className="page-main slider_content">
          <Slider {...settings} ref={slider => (this.slider = slider)}>
            <div className="slider_sec">{this.renderPageOne()}</div>
            <div className="slider_sec">{this.renderPageTwo()}</div>
          </Slider>
        </div>
      </div>
    )
  }
}

module.exports = XMD
