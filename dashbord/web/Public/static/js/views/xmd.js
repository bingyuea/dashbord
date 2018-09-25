import React, { Component } from 'react'
import BaseView from '../core/view.base'
import $ from 'jquery'

import Mock from '../mock/mock'
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
      pageTitle: '巡检仪安装情况查询'
    }

    const dateFormat = 'YYYY-MM-DD HH:mm'
    const today = moment().format(dateFormat)
    const lastday = moment()
      .add(-1, 'days')
      .format(dateFormat)

    this.indata = {
      defaultTime: [lastday, today]
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

  search(value) {
    console.log(this.state.searchOptions)
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
    const self = this
    this.fetchXmdInstall(value)
    this.fetchCustomerInfo(value)
    this.fetchRate(value)
    this.fetchXmdTableLis(value)
  }
  //巡检仪安装情况
  fetchXmdInstall(value) {
    xmdInstallModel.setParam({ ...value })
    xmdInstallModel.excute(
      res => {
        const resData = res.data || {}
        let pageOne = this.state.pageOne || {}
        pageOne.xmdInstall = resData
        self.setData({
          pageOne: pageOne
        })
      },
      err => {}
    )
  }

  //客户分布情况
  fetchCustomerInfo(value) {
    customerInfoModel.setParam({ ...value })
    customerInfoModel.excute(
      res => {
        const resData = res.data || {}
        let pageOne = this.state.pageOne || {}
        pageOne.customer = resData
        self.setData({
          pageOne: pageOne
        })
      },
      err => {}
    )
  }
  //综合倍率
  fetchRate(value) {
    rateModel.setParam({ ...value })
    rateModel.excute(
      res => {
        const resData = res.data || {}
        let pageOne = this.state.pageOne || {}
        pageOne.rate = resData
        self.setData({
          pageOne: pageOne
        })
      },
      err => {}
    )
  }

  //计量类型
  fetchMeasure(value) {
    measureModel.setParam({ ...value })
    measureModel.excute(
      res => {
        const resData = res.data || {}
        let pageOne = this.state.pageOne || {}
        pageOne.measure = resData
        self.setData({
          pageOne: pageOne
        })
      },
      err => {}
    )
  }

  //巡检仪档案table
  fetchXmdTableLis(value) {
    xmdTableListModel.setParam({ ...value })
    xmdTableListModel.excute(
      res => {
        const resData = res.data || {}
        let pageOne = this.state.pageOne || {}
        pageOne.table = resData
        self.setData({
          pageOne: pageOne
        })
      },
      err => {}
    )
  }

  fetchPageTwo(value) {
    this.fetchXmdEvent()
    this.fetchCustomerXmdEvent()
    this.fetchRateXmdEvent()
    this.fetchMeasureXmdEvent()
    this.fetcXmdEventTableListEvent()
  }

  //巡检仪上报事件
  fetchXmdEvent(value) {
    xmdEventModel.setParam({ ...value })
    xmdEventModel.excute(
      res => {
        const resData = res.data || {}
        let pageTwo = this.state.pageTwo || {}
        pageTwo.xmdEvent = resData
        self.setData({
          pageTwo: pageTwo
        })
      },
      err => {}
    )
  }
  //事件分布信息
  fetchCustomerXmdEvent(value) {
    customerXmdEventModel.setParam({ ...value })
    customerXmdEventModel.excute(
      res => {
        const resData = res.data || {}
        let pageTwo = this.state.pageTwo || {}
        pageTwo.customerXmdEvent = resData
        self.setData({
          pageTwo: pageTwo
        })
      },
      err => {}
    )
  }

  //two综合倍率
  fetchRateXmdEvent(value) {
    rateEventModel.setParam({ ...value })
    rateEventModel.excute(
      res => {
        const resData = res.data || {}
        let pageTwo = this.state.pageTwo || {}
        pageTwo.rateEvent = resData
        self.setData({
          pageTwo: pageTwo
        })
      },
      err => {}
    )
  }

  //two计量类型
  fetchMeasureXmdEvent(value) {
    measureEventModel.setParam({ ...value })
    measureEventModel.excute(
      res => {
        const resData = res.data || {}
        let pageTwo = this.state.pageTwo || {}
        pageTwo.measureEvent = resData
        self.setData({
          pageTwo:pageTwo
        });
      },(err)=>{

      });
    }

    renderSearchBar(){

      const {
        provinceOpts,
        cityOpts,
        measureOpts,
        unusalOpts,
        tradeOpts,
        themeOpts
      } = this.state.searchOptions || {};

      if(!this.state.searchOptions){return false}

      const barOptions = {
        locationData:{
          title:'安装地点',
          province:{
            options:provinceOpts,
            key:'province'
          },
          city:{
            options:cityOpts,
            key:'city'
          },
        },
        measureData:{
          title:'计量类型',
          key:'measure',
          options:measureOpts,
        },
        tradeData:{
          title:'行业类型',
          key:'trade',
          options:tradeOpts,
        },
        unusualData:{
          title:'异常类型',
          key:'unusual',
          options:unusalOpts,
        },
        dateData:{
          title:'上报时间',
          defaultTime:this.indata.defaultTime
        },
        
        searchHandle:this.search.bind(this)

      }
      return(
        
          <SearchBar {...barOptions}/>
      )
    }
    //切换轮播的回调,idx:当前轮播的页面idx
    afterSlickChange(idx){
      const pageTitle = idx == 0 ?'巡检仪安装情况查询':'巡检仪上报事件查询';
      this.setState({
        pageTitle:pageTitle,
        pageIdx:idx
      });
    }

    renderPageOne(){
      const {
        xmdInstall,
        customer,
        rate,
        measure,
        table
      } = this.state.pageOne || {}; 
      const self = this;
      const domHeight = $('.page-main').height();
      const leftChartHeight = (domHeight - 25 - 2 - 70 - 70 - 20) / 2;
      const centerChartHeight = (domHeight / 2) - 20 - 27;
      let centerTopHeight = leftChartHeight;
      setTimeout(function(){
        centerTopHeight = $('#centerSectionContent').height() - 35; 
        self.foreUpdata(); 
      },0);
      
      //巡检仪上线数
      const charts2 = {
        data:xmdInstall.periodList,
        height:leftChartHeight,
        xAxis:'period',
        yAxis:'periodCount',
        forceFit:true,
        padding:'auto',
        style:{
          overflow:'auto',
        },
        xLabel:{
          offset:15,
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
  afterSlickChange(idx) {}

  renderPageOne() {
    const { xmdInstall, customer, rate, measure, table } =
      this.state.pageOne || {}

    const domHeight = $('.page-main').height()
    // if(!domHeight){return}
    const leftChartHeight = (domHeight - 25 - 2 - 70 - 70 - 20) / 2
    const centerChartHeight = domHeight / 2 - 20 - 27
    let centerTopHeight = leftChartHeight
    setTimeout(function() {
      centerTopHeight = $('#centerSectionContent').height() - 35
    }, 0)

    //巡检仪上线数
    const charts2 = {
      // data:xmdInstall.periodList,
      height: leftChartHeight,
      xAxis: 'period',
      yAxis: 'periodCount',
      forceFit: true,
      padding: 'auto',
      style: {
        overflow: 'auto'
      },
      xLabel: {
        offset: 15
      },
      yLabel: {
        offset: 5
      }
    }
    //地区分布信息
    const charts5 = {
      // data: xmdInstall.areaList,
      height: leftChartHeight,
      xAxis: 'area',
      yAxis: 'areaCount',
      forceFit: true,
      padding: 'auto',
      style: {
        overflow: 'auto'
      },
      xLabel: {
        offset: 15
      },
      yLabel: {
        offset: 5
      }
    }

      //客户分布情况
      const charts8 = {
        data:translateCountToPercent(customer.tradeList,'tradeCount'),
        height:centerTopHeight,
        xAxis:'tradeName',
        yAxis_line:'percent',
        yAxis_interval:'tradeCount',
        forceFit:true,
        padding:'auto',
        cols:{
          tradeName: {
            min: 0
          },
          percent: {
            min: 0
          }
        },
        style:{
          overflow:'auto'
        },
        xLabel:{
          offset:15,
        },
        percent: {
          min: 0
        }
      },
      style: {
        overflow: 'auto'
      },
      xLabel: {
        offset: 15
      },
      yLabel: {
        offset: 5
      }
    }

      //综合倍率
      const charts3 = {
        data:rate.rateList,
        height:centerChartHeight,
        forceFit:true,
        padding:'auto',
        field:'rateCount',
        dimension:'rate',
        innerRadius:.6,
        cols:{
          percent: {
            formatter: val => {
              val = (val * 100).toFixed(0) + "%";
              return val;
            }
          }
        }
      }
      //计量类型
      const charts4 = {
        data:measure.rateList,
        height:centerChartHeight,
        forceFit:true,
        innerRadius:.6,
        padding:'auto',
        field:'measureCount',
        dimension:'measureName',
        cols:{
          percent: {
            formatter: val => {
              val = (val * 100).toFixed(0) + "%";
              return val;
            }
          }
        }
      }
    }

    return (
      <div className="slick-page" style={{ height: domHeight }}>
        <div className="side-content content_box">
          <div className="content_title">巡检仪安装情况</div>
          <div className="blue_underline" />
          <div className="total-num">
            <span className="blue-txt">
              {/* {xmdInstall.totalCount.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')} */}
            </span>
            台
          </div>
          <div className="charts-content">
            <div className="section-content">
              <span>巡检仪上线数</span>
              <Basicline {...charts2} />
            </div>
            <div className="section-content">
              <span>地区分布信息</span>
              <Basicbar {...charts5} />
            </div>
          </div>
        </div>
        <div className="center-content">
          <div className="top content_box">
            <div className="content_title">客户分布情况</div>
            <div className="blue_underline" />
            <div className="section-content" id="centerSectionContent">
              <span>行业信息</span>
              <Doubleaxes {...charts8} />
            </div>
          </div>
          <div className="bottom">
            <div className="section-content" id="bottomSectionContent">
              <div className="content_title">综合倍率</div>
              <Labelline {...charts3} />
            </div>
            <div className="section-content">
              <div className="content_title">计量类型</div>
              <Labelline {...charts4} />
            </div>
          </div>
        </div>
        <div className="side-content content_box" />
      </div>
    )
  }

    renderPageTwo(){
      const {
        xmdEvent,
        customerXmdEvent,
        measureEvent,
        rateEvent,
        xmdEventTable,
      } = this.state.pageTwo || {}; 

      const domHeight = $('.page-main').height();
      const leftChartHeight = (domHeight - 25 - 2 - 70 - 70 - 20) / 2;
      const centerChartHeight = (domHeight / 2) - 20 - 27;
      let centerTopHeight = leftChartHeight;
      setTimeout(function(){
        centerTopHeight = $('#centerSectionContent').height() - 35;  
      },0);

      const charts1 = {
        data:xmdEvent,
        height:leftChartHeight,

      }
      
      //巡检仪事件趋势
      const charts2 = {
        data:xmdEvent.periodList,
        height:leftChartHeight,
        xAxis:'period',
        yAxis:'periodCount',
        forceFit:true,
        padding:'auto',
        style:{
          overflow:'auto',
        },
        xLabel:{
          offset:15,
        },
        yLabel:{
          offset:5,
        }
      }
       //事件类型信息
      const charts5 = {
        data:xmdEvent.exceptionList,
        height:leftChartHeight,
        xAxis:'name',
        yAxis:'exceptionCount',
        forceFit:true,
        padding:'auto',
        style:{
          overflow:'auto',
        },
        xLabel:{
          offset:15,
        },
        yLabel:{
          offset:5,
        }
      }

      //事件分布信息
      const charts8 = {
        data:translateCountToPercent(customerXmdEvent.tradeList,'tradeCount'),
        height:centerTopHeight,
        xAxis:'tradeName',
        yAxis_line:'percent',
        yAxis_interval:'tradeCount',
        forceFit:true,
        padding:'auto',
        cols:{
          tradeName: {
            min: 0
          },
          percent: {
            min: 0
          }
        },
        style:{
          overflow:'auto'
        },
        xLabel:{
          offset:15,
        },
        yLabel:{
          offset:5,
        }
      }

      //综合倍率
      const charts3 = {
        data:rateEvent.rateList,
        height:centerChartHeight,
        forceFit:true,
        padding:'auto',
        field:'rateCount',
        innerRadius:.6,
        dimension:'rate',
        cols:{
          percent: {
            formatter: val => {
              val = (val * 100).toFixed(0) + "%";
              return val;
            }
          }
        }
      }
      //计量类型
      const charts4 = {
        data:measureEvent.rateList,
        height:centerChartHeight,
        forceFit:true,
        innerRadius:.6,
        padding:'auto',
        field:'measureCount',
        dimension:'measureName',
        cols:{
          percent: {
            formatter: val => {
              val = (val * 100).toFixed(0) + "%";
              return val;
            }
          }
        }
      }

      return (
        <div className="slick-page"  style={{height:domHeight}}>
          <div className='side-content content_box'>
            <div className="content_title">
                <span>巡检仪事件统计</span>
                <span>事件有效性</span>
            </div>
            <div className="blue_underline"></div>
            <div className='bottom-section'>
              <div className='total-num'>
                <span className='blue-txt'>{xmdEvent.totalCount.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</span>
                件
              </div>
              <div className='right-content'>
                <Labelline {...charts1}/>
              </div>
            </div>
            
            <div className='charts-content'>
              <div className='section-content'>
                <span>巡检仪事件趋势</span>
                <Basicline {...charts2} />
              </div>
              <div className='section-content'>
                <span>事件类型信息</span>
                <Basicbar {...charts5}/>
              </div>
            </div>
          </div>
          <div className='center-content'>
            <div className='top content_box'>
              <div className="content_title">
                  客户分布情况
              </div>
              <div className="blue_underline"></div>
              <div className='section-content' id='centerSectionContent'>
                  <span>行业信息</span>
                  <Doubleaxes {...charts8}/>
                </div>
            </div>
            <div className='bottom'>
              <div className='section-content' id='bottomSectionContent'>
                <div className="content_title">
                  综合倍率
                </div>
                <Labelline {...charts3}/>
              </div>
              <div className='section-content' >
                <div className="content_title">
                  计量类型
                </div>
                <Labelline {...charts4}/>
              </div>
            </div>
          </div>
          <div className='side-content content_box'>
            
          </div>
        </div>
      )
    }
    
    renderMain(){

      var settings = {
        dots: false,
        autoplay: false,
        arrows: false,
        infinite: true,
        speed: 500,
        autoplaySpeed:5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        touchMove:true,
        afterChange:this.afterSlickChange.bind(this)
      };

      return (
        <div className='page-xmd page-slick'>
          <h1 className='page-title'>{this.state.pageTitle}</h1>
          <div className='slick-btn'>
            <div className='btn active'></div>
            <div className='btn'></div>
          </div>
          {this.renderSearchBar()}
          <div className='page-main slider_content'>
            <Slider {...settings}>
              <div className="slider_sec">
                {this.renderPageOne()}
              </div>
              <div className="slider_sec">
                {this.renderPageTwo()}
              </div>
            </Slider>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = XMD
