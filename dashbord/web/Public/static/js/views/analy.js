import React, { Component } from 'react'
import BaseView from '../core/view.base'
import $ from 'jquery'
import Mock from '../mock/mock'
//图表模型
import { ChinaMapChart } from '../ui/ui.charts'

class Analy extends BaseView {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
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
        <h1>二次回路异常主题分析</h1>
        <div className="slick-btn center">
          <div className="btn active" />
          <div className="btn" />
        </div>
        <div className="section-content map ">
          <ChinaMapChart {...mapData} />
        </div>
      </div>
    )
  }
  renderMain() {
    let appview = $('#appview').height()
    let listHeight = $('#listHeight').height()
    let _this = this
    if (!listHeight) {
      let time = setTimeout(function() {
        _this.forceUpdate()
      }, 0)
    }
    // 每个row的高度
    let rowHeight = listHeight / 3
    console.log(rowHeight)
    $('.rowList').each(function(item, index) {
      $(this).css({
        height: rowHeight
      })
    })
    // 定稿 scrollList
    $('.scrollList').each(function(item, index) {
      $(this).css({
        height: listHeight - rowHeight
      })
    })
    let stealingPowerRanking = [
      {
        user: '食品公司A',
        index: 1.8
      },
      {
        user: '食品公司B',
        index: 1.7
      },
      {
        user: '食品公司v',
        index: 1.9
      }
    ]
    return (
      <div
        className="page-analy page-dashboard page"
        style={{ height: appview }}
      >
        <div className="left">
          <div className="item">
            <h4 className="label ">疑似窃电风险排行榜</h4>
            <div className="tabel" id="listHeight">
              <div className="list">
                <div className="row1 flex-layout rowList">
                  <h6 className="h6 flex">用户</h6>
                  <h6 className="h6 flex">评估值</h6>
                </div>
                <div className="scrollList">
                  {stealingPowerRanking.map((item, index) => {
                    return (
                      <div
                        className={
                          index % 2 === 0
                            ? ['row3 flex-layout rowList']
                            : ['row2 flex-layout rowList']
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
          </div>

          {/* <div className="item">
            <h4 className="label ">设备故障风险排行榜</h4>
            <div className="tabel">
              <div className="row1 flex-layout">
                <h6 className="h6 flex">用户</h6>
                <h6 className="h6 flex">评估值</h6>
              </div>
              <div className="row2 flex-layout">
                <div className="flex"> </div>
                <div className="flex" />
              </div>
              <div className="row3 flex-layout">
                <div className="flex" />
                <div className="flex"> </div>
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
              <div className="row2 flex-layout">
                <div className="flex"> </div>
                <div className="flex" />
              </div>
              <div className="row3 flex-layout">
                <div className="flex" />
                <div className="flex"> </div>
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
              <div className="row2 flex-layout">
                <div className="flex"> </div>
                <div className="flex" />
              </div>
              <div className="row3 flex-layout">
                <div className="flex" />
                <div className="flex"> </div>
              </div>
            </div>
          </div> */}
        </div>
        {this.renderPageCenter()}
        {/* <div className="right">
          <div className="item">
            <h4 className="label ">现场许维护排行榜</h4>
            <div className="tabel">
              <div className="row1 flex-layout">
                <h6 className="h6 flex">用户</h6>
                <h6 className="h6 flex">评估值</h6>
              </div>
              <div className="row2 flex-layout">
                <div className="flex"> </div>
                <div className="flex" />
              </div>
              <div className="row3 flex-layout">
                <div className="flex" />
                <div className="flex" />
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
              <div className="row2 flex-layout">
                <div className="flex" />
                <div className="flex" />
              </div>
              <div className="row3 flex-layout">
                <div className="flex" />
                <div className="flex" />
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
              <div className="row2 flex-layout">
                <div className="flex"> </div>
                <div className="flex" />
              </div>
              <div className="row3 flex-layout">
                <div className="flex" />
                <div className="flex" />
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
              <div className="row2 flex-layout">
                <div className="flex"> </div>
                <div className="flex" />
              </div>
              <div className="row3 flex-layout">
                <div className="flex" />
                <div className="flex" />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    )
  }
}

module.exports = Analy
