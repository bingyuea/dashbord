import React, { Component } from 'react'
import BaseView from '../core/view.base'
import $ from 'jquery'
import Mock from '../mock/mock'
//图表模型
import { ChinaMapChart } from '../ui/ui.charts'
//异常数据统计
import { QueryElecCurrentData } from '../models/mergeAnaly.models'
//定义数据模型
const queryElecCurrentData = QueryElecCurrentData.getInstance()
let { exceptionDataObj } = Mock
class Analy extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.setState({
      pageStatus: 'init'
    })
    this.pageInit()
  }

  pageInit() {
    this.fetchQueryElecCurrentData()
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

  renderRank(){
    const { exceptionDataObj } = this.state;
    if(!exceptionDataObj){return false}
    const stealingPowerRanking = exceptionDataObj.exceptionDataObj;
    if(!stealingPowerRanking){return false}
    let a =stealingPowerRanking.map((item, index) => {
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
  console.log('jxgo' + a)
  return a
  }

  render() {
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
    console.log(exceptionData)
    // 这里本是有值的

    // debugger
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
                {this.renderRank()}
                {Array.isArray(exceptionData.stealingPowerRanking) &&
                  exceptionData.stealingPowerRanking.map((item, index) => {
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
                  })}
                }
              }
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
}

module.exports = Analy
