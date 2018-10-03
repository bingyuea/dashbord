import React, { Component } from 'react'
import BaseView from '../core/view.base'
import $ from 'jquery'
import Mock from '../mock/mock'
//图表模型
import { ChinaMapEcharts } from '../ui/ui.charts'
//二次回路状态值排名前十数据获取
import { GetTopTenOfSecondLoopExceptionTop } from '../models/status.models'
//定义数据模型
const getTopTenOfSecondLoopExceptionTop = GetTopTenOfSecondLoopExceptionTop.getInstance()
let { exceptionDataObj } = Mock
class Status1 extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.setState({
      pageStatus: 'init'
    })
    let params = {
      token: '234sdf234',
      province: '西安'
    }
    //  '{"token":"234sdf234","province":"西安"}'
    this.FetchGetTopTenOfSecondLoopExceptionTop(params)
  }

  //二次回路状态值排名前十数据获取
  FetchGetTopTenOfSecondLoopExceptionTop(value) {
    let self = this
    getTopTenOfSecondLoopExceptionTop.setParam({ ...value })
    getTopTenOfSecondLoopExceptionTop.excute(
      res => {
        let dataList = res || {}
        self.setState({
          dataList
        })
        // {
        //     "result":1,
        //     "dataList":[
        //         {
        //             "serialNum":"123",
        //             "elecSerialNum":"123",
        //             "assessedValue":85.66
        //         },
        //         {
        //             "serialNum":"1243",
        //             "elecSerialNum":"1243",
        //             "assessedValue":82.66
        //         }
        //     ]
        // }
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
          <ChinaMapEcharts {...mapData} />
        </div>
      </div>
    )
  }
  render() {
    let appview = $('.page-main').height()

    return (
      <div className="status-main page" style={{ height: appview }}>
        <div className="page-left ">
          <h4 className="label ">二次回路状态排行榜</h4>
          <div className="tabel">
            <div className="row1 flex-layout">
              <h6 className="h6 flex">用户</h6>
              <h6 className="h6 flex">评估值</h6>
            </div>
            <div className="row2 flex-layout">
              <div className="flex"> </div>
              <div className="flex" />
            </div>
            <div className="row1 flex-layout">
              <div className="flex"> </div>
              <div className="flex" />
            </div>
            <div className="row2 flex-layout">
              <div className="flex"> </div>
              <div className="flex" />
            </div>
            <div className="row1 flex-layout">
              <div className="flex"> </div>
              <div className="flex" />
            </div>
            <div className="row2 flex-layout">
              <div className="flex"> </div>
              <div className="flex" />
            </div>
            <div className="row1 flex-layout">
              <div className="flex"> </div>
              <div className="flex" />
            </div>
            <div className="row2 flex-layout">
              <div className="flex"> </div>
              <div className="flex" />
            </div>
            <div className="row1 flex-layout">
              <div className="flex"> </div>
              <div className="flex" />
            </div>
            <div className="row2 flex-layout">
              <div className="flex"> </div>
              <div className="flex" />
            </div>
          </div>
        </div>
        {this.renderPageCenter()}
        <div className="page-right" />
      </div>
    )
  }
}

module.exports = Status1
