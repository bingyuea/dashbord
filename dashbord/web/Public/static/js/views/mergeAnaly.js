import React, { Component } from 'react'
import BaseView from '../core/view.base'
import $ from 'jquery'
import Mock from '../mock/mock'
import Analy from './../views/analy'
import SecondaryAnaly from './../views/SecondaryAnaly'
//图表模型
import { ChinaMapChart } from '../ui/ui.charts'
import Slider from 'react-slick'
import {
  //异常数据统计
  QueryElecCurrentData,
  //二次回路异常事件查询
  QuerySecondLoopExceptionCount
} from '../models/mergeAnaly.models'
//定义数据模型
const queryElecCurrentData = QueryElecCurrentData.getInstance()
const querySecondLoopExceptionCount = QuerySecondLoopExceptionCount.getInstance()
class MergeAnaly extends BaseView {
  constructor(props) {
    super(props)

    this.state = {
        pageIdx:0
    }
  }

  componentDidMount() {
    // this.pageInit();
    this.setState({
      pageStatus: 'init'
    })
  }

  pageInit() {
    this.fecthQueryElecCurrentData()
    this.fecthQuerySecondLoopExceptionCount()
  }
  /*
    fecthQueryElecCurrentData(token) {
        const self = this
        const searchValue = this.state.searchValue
        queryElecCurrentData.setParam({
            token: token,
            range: searchValue.range
        })
        queryElecCurrentData.excute(
            res => {
                const resData = res.data || {}
                const totalCount = resData.totalCount || 0
                // {
                //     "result":1,
                //     "exceptionData":[
                //     {
                //         "rangeName":"江苏省",
                //         "exceptionIndex":155.68,
                //         "stealingPowerRanking":[
                //             {
                //                 "user":"食品公司A",
                //                 "index":1.8
                //             },
                //             {
                //                 "user":"食品公司B",
                //                 "index":1.7
                //             }
                //         ],
                //         "troubleRanking":[
                //             {
                //                 "user":"食品公司A",
                //                 "index":1.8
                //             },
                //             {
                //                 "user":"食品公司B",
                //                 "index":1.7
                //             }
                //         ],
                //         "wiringFaultRanking":[
                //         {
                //                 "user":"食品公司A",
                //                 "index":1.8
                //             },
                //             {
                //                 "user":"食品公司B",
                //                 "index":1.7
                //             }
                //         ],
                //         "expansionRanking":[
                //             {
                //                 "user":"食品公司A",
                //                 "index":1.8
                //             },
                //             {
                //                 "user":"食品公司B",
                //                 "index":1.7
                //             }
                //         ],
                //         "maintainRanking":[
                //             {
                //                 "user":"食品公司A",
                //                 "index":1.8
                //             },
                //             {
                //                 "user":"食品公司B",
                //                 "index":1.7
                //             }
                //         ],
                //         "failureRanking":[
                //             {
                //                 "user":"食品公司A",
                //                 "index":1.8
                //             },
                //             {
                //                 "user":"食品公司B",
                //                 "index":1.7
                //             }
                //         ],
                //         "loopExceRanking":[
                //             {
                //                 "user":"食品公司A",
                //                 "index":1.8
                //             },
                //             {
                //                 "user":"食品公司B",
                //                 "index":1.7
                //             }
                //         ],
                //         "elecExecRanking":[
                //             {
                //                 "user":"食品公司A",
                //                 "index":1.8
                //             },
                //             {
                //                 "user":"食品公司B",
                //                 "index":1.7
                //             }
                //         ]
                //     },
                //       {
                //         "rangeName":"浙江省",
                //         "exceptionIndex":155.68,
                //         "stealingPowerRanking":[
                //             {
                //                 "user":"食品公司A",
                //                 "index":1.8
                //             },
                //             {
                //                 "user":"食品公司B",
                //                 "index":1.7
                //             }
                //         ],
                //         "troubleRanking":[
                //             {
                //                 "user":"食品公司A",
                //                 "index":1.8
                //             },
                //             {
                //                 "user":"食品公司B",
                //                 "index":1.7
                //             }
                //         ],
                //         "wiringFaultRanking":[
                //         {
                //                 "user":"食品公司A",
                //                 "index":1.8
                //             },
                //             {
                //                 "user":"食品公司B",
                //                 "index":1.7
                //             }
                //         ],
                //         "expansionRanking":[
                //             {
                //                 "user":"食品公司A",
                //                 "index":1.8
                //             },
                //             {
                //                 "user":"食品公司B",
                //                 "index":1.7
                //             }
                //         ],
                //         "maintainRanking":[
                //             {
                //                 "user":"食品公司A",
                //                 "index":1.8
                //             },
                //             {
                //                 "user":"食品公司B",
                //                 "index":1.7
                //             }
                //         ],
                //         "failureRanking":[
                //             {
                //                 "user":"食品公司A",
                //                 "index":1.8
                //             },
                //             {
                //                 "user":"食品公司B",
                //                 "index":1.7
                //             }
                //         ],
                //         "loopExceRanking":[
                //             {
                //                 "user":"食品公司A",
                //                 "index":1.8
                //             },
                //             {
                //                 "user":"食品公司B",
                //                 "index":1.7
                //             }
                //         ],
                //         "elecExecRanking":[
                //             {
                //                 "user":"食品公司A",
                //                 "index":1.8
                //             },
                //             {
                //                 "user":"食品公司B",
                //                 "index":1.7
                //             }
                //         ]
                //     }
                //      ]
                // }

                self.setState({
                    totalCount
                })
            },
            err => {
                console.log(err)
            }
        )
    }

  fecthQuerySecondLoopExceptionCount(token) {
    const self = this
    const searchValue = this.state.searchValue
    querySecondLoopExceptionCount.setParam({
      token: token,
      province: searchValue.province,
      city: searchValue.city,
      serialNum: searchValue.serialNum,
      trade: searchValue.trade,
      subject: searchValue.subject,
      startTime: searchValue.startTime,
      endTime: searchValue.endTime
    })
    querySecondLoopExceptionCount.excute(
      res => {
        const resData = res.data || {}
        // {
        //     "result":1,
        //     "totalCount":12000,
        //     "periodList":[
        //         {
        //             "period":"2017-03",
        //             "periodCount":200，
        //             "stealingPower":1.1,
        //             "trouble":1.1,
        //             "wiringFault":1.1,
        //             "expansion":1.1,
        //             "maintain":1.1,
        //             "failure":1.1,
        //             "loopExec":1.1,
        //             "elecExec":1.1,
        //         },
        //            {
        //             "period":"2017-04",
        //             "periodCount":300,
        //             "stealingPower":1.1,
        //             "trouble":1.1,
        //             "wiringFault":1.1,
        //             "expansion":1.1,
        //             "maintain":1.1,
        //             "failure":1.1,
        //             "loopExec":1.1,
        //             "elecExec":1.1,
        //         }
        //       ]
        // }

        self.setState({})
      },
      err => {
        console.log(err)
      }
    )
  }
  */

  //切换轮播的回调,idx:当前轮播的页面idx
    afterSlickChange(idx){
      this.setState({
        pageIdx:idx
      });
    }

    //切换轮播
    slickBtn(idx){
      this.slider.slickGoTo(idx);
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
      afterChange:this.afterSlickChange.bind(this)
    }
    return (
        <div className='page-slick page'>
          <h1 className='page-title'>二次回路异常主题分析</h1>
          <div className='slick-btn'>
            <div className={this.state.pageIdx == 0 ?'btn active':'btn'} onClick={this.slickBtn.bind(this,0)}></div>
            <div className={this.state.pageIdx == 1 ?'btn active':'btn'} onClick={this.slickBtn.bind(this,1)}></div>
          </div>
          <div className='page-main slider_content'>
            <Slider {...settings} ref={slider=>this.slider = slider}>
              <div className="slider_sec ">
                <Analy />
              </div>
              <div className="slider_sec">
                <SecondaryAnaly />
              </div>
            </Slider>
          </div>
      </div>
    )
  }
}

module.exports = MergeAnaly
