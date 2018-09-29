import React, { Component } from 'react'
import BaseView from '../core/view.base'
import $ from 'jquery'

class Analy extends BaseView {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
    this.setState({
      pageStatus: 'init'
    })
  }

  pageInit() {
    this.fetchQueryElecCurrentData()

  }
  fetchQueryElecCurrentData(token) {
    const self = this
    const searchValue = this.state.searchValue
    queryElecCurrentData.setParam({
      token: token,
      range: searchValue.range
    })
    queryElecCurrentData.excute(
      res => {
        const exceptionDataObj = res.data || {};
        const exceptionData = exceptionDataObj.exceptionData[0] || 0;
        
        self.setState({
          exceptionData
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
    let appview = $('#appview').height();
    // let { exceptionData }=this.state;
    let exceptionDataAyy=
        [
          {
            rangeName: "江苏省",
            exceptionIndex: 155.68,
            stealingPowerRanking: [
              {
                user: "食品公司A",
                index: 1.8
              },
              {
                user: "食品公司B",
                index: 1.7
              }
            ],
            troubleRanking: [
              {
                user: "食品公司A",
                index: 1.8
              },
              {
                user: "食品公司B",
                index: 1.7
              }
            ],
            wiringFaultRanking: [
              {
                user: "食品公司A",
                index: 1.8
              },
              {
                user: "食品公司B",
                index: 1.7
              }
            ],
            expansionRanking: [
              {
                user: "食品公司A",
                index: 1.8
              },
              {
                user: "食品公司B",
                index: 1.7
              }
            ],
            maintainRanking: [
              {
                user: "食品公司A",
                index: 1.8
              },
              {
                user: "食品公司B",
                index: 1.7
              }
            ],
            failureRanking: [
              {
                user: "食品公司A",
                index: 1.8
              },
              {
                user: "食品公司B",
                index: 1.7
              }
            ],
            loopExceRanking: [
              {
                user: "食品公司A",
                index: 1.8
              },
              {
                user: "食品公司B",
                index: 1.7
              }
            ],
            elecExecRanking: [
              {
                user: "食品公司A",
                index: 1.8
              },
              {
                user: "食品公司B",
                index: 1.7
              }
            ]
          },
          // {
          //   rangeName: "浙江省",
          //   exceptionIndex: 155.68,
          //   stealingPowerRanking: [
          //     {
          //       user: "食品公司A",
          //       index: 1.8
          //     },
          //     {
          //       user: "食品公司B",
          //       index: 1.7
          //     }
          //   ],
          //   troubleRanking: [
          //     {
          //       user: "食品公司A",
          //       index: 1.8
          //     },
          //     {
          //       user: "食品公司B",
          //       index: 1.7
          //     }
          //   ],
          //   wiringFaultRanking: [
          //     {
          //       user: "食品公司A",
          //       index: 1.8
          //     },
          //     {
          //       user: "食品公司B",
          //       index: 1.7
          //     }
          //   ],
          //   expansionRanking: [
          //     {
          //       user: "食品公司A",
          //       index: 1.8
          //     },
          //     {
          //       user: "食品公司B",
          //       index: 1.7
          //     }
          //   ],
          //   maintainRanking: [
          //     {
          //       user: "食品公司A",
          //       index: 1.8
          //     },
          //     {
          //       user: "食品公司B",
          //       index: 1.7
          //     }
          //   ],
          //   failureRanking: [
          //     {
          //       user: "食品公司A",
          //       "index": 1.8
          //     },
          //     {
          //       user: "食品公司B",
          //       index: 1.7
          //     }
          //   ],
          //   loopExceRanking: [
          //     {
          //       "user": "食品公司A",
          //       "index": 1.8
          //     },
          //     {
          //       "user": "食品公司B",
          //       "index": 1.7
          //     }
          //   ],
          //   elecExecRanking: [
          //     {
          //       "user": "食品公司A",
          //       "index": 1.8
          //     },
          //     {
          //       "user": "食品公司B",
          //       "index": 1.7
          //     }
          //   ]
          // }
        ];
        const exceptionData=exceptionDataAyy[0];
       console.log('exceptionData',exceptionData)
    return (
      <div
        className="page-analy page-dashboard page"
        style={{ height: appview }}
      >
        <div className="left">
          <div className="item">
            <h4 className="label ">疑似窃电风险排行榜</h4>
            <div className="tabel" >
              <div className="row1 flex-layout ">
                <h6 className="h6 flex">用户</h6>
                <h6 className="h6 flex">评估值</h6>
              </div>
              <div className="scrollList">
                { Array.isArray(exceptionData.stealingPowerRanking) && 
                 exceptionData.stealingPowerRanking.map((item, index) => {
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
            <h4 className="label ">设备故障风险排行榜</h4>
            <div className="tabel">
              <div className="row1 flex-layout">
                <h6 className="h6 flex">用户</h6>
                <h6 className="h6 flex">评估值</h6>
              </div>
              <div className="scrollList">
                { Array.isArray(exceptionData.troubleRanking) && 
                 exceptionData.troubleRanking.map((item, index) => {
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
            <h4 className="label ">错接线风险排行榜</h4>
            <div className="tabel">
              <div className="row1 flex-layout">
                <h6 className="h6 flex">用户</h6>
                <h6 className="h6 flex">评估值</h6>
              </div>
              <div className="scrollList">
                { Array.isArray(exceptionData.wiringFaultRanking) && 
                 exceptionData.wiringFaultRanking.map((item, index) => {
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
            <h4 className="label ">配变需扩容排行榜</h4>
            <div className="tabel">
              <div className="row1 flex-layout">
                <h6 className="h6 flex">用户</h6>
                <h6 className="h6 flex">评估值</h6>
              </div>
              <div className="scrollList">
                { Array.isArray(exceptionData.expansionRanking) && 
                 exceptionData.expansionRanking.map((item, index) => {
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
        </div>
        {this.renderPageCenter()}
        <div className="right">
          <div className="item">
            <h4 className="label ">现场许维护排行榜</h4>
            <div className="tabel">
              <div className="row1 flex-layout">
                <h6 className="h6 flex">用户</h6>
                <h6 className="h6 flex">评估值</h6>
              </div>
              <div className="scrollList">
                { Array.isArray(exceptionData.maintainRanking) && 
                 exceptionData.maintainRanking.map((item, index) => {
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
            <h4 className="label ">电池失效排行榜</h4>
            <div className="tabel">
              <div className="row1 flex-layout">
                <h6 className="h6 flex">用户</h6>
                <h6 className="h6 flex">评估值</h6>
              </div>
              <div className="scrollList">
                { Array.isArray(exceptionData.failureRanking) && 
                 exceptionData.failureRanking.map((item, index) => {
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
            <h4 className="label ">回路异常风险排行榜</h4>
            <div className="tabel">
              <div className="row1 flex-layout">
                <h6 className="h6 flex">用户</h6>
                <h6 className="h6 flex">评估值</h6>
              </div>
              <div className="scrollList">
                { Array.isArray(exceptionData.loopExceRanking) && 
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
                { Array.isArray(exceptionData.elecExecRanking) && 
                 exceptionData.elecExecRanking.map((item, index) => {
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
        </div>
      </div>
    )
  }
}

module.exports = Analy
