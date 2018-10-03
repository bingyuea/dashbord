import React, { Component } from 'react'
import $ from 'jquery'
import Mock from '../mock/mock'
//图表模型
import { 
  ChinaMapEcharts,
  Basicline
} from '../ui/ui.charts.js';


//异常数据统计
import { 
  QuerySecondLoopExceptionDetailData
} from '../models/status.models';
//定义数据模型
const querySecondLoopExceptionDetailData = QuerySecondLoopExceptionDetailData.getInstance();


class Status2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
    this.fetchQuerySecondLoopExceptionDetailData()

    // this.setState({
    //   detailData:{
    //     "result":1,
    //     "username":"张三",
    //     "province":"江苏省",
    //     "city":"南京市",
    //     "serialNum":"SN1234325",
    //     "elecType":"SN1234325",
    //     "trade":"大工业用电",
    //     "rate":1000,
    //     "measure":"三相三线",
    //     "grade":98,
    //     "gradeTrend":0.01,
    //     "ranking":0.01,
    //     " rankingTrend":0.01,
    //     "eventList":[
    //     {
    //       "eventName":"电流流失",
    //       "date":"2017-10-11"
    //     },
    //       {
    //       "eventName":"电流流失",
    //       "date":"2017-10-11"
    //     }
    //     ],
    //     "gradeList":[
    //     {
    //       "grade":99,
    //       "date":"2017-10"
    //     },
    //       {
    //       "grade":98,
    //       "date":"2017-11"
    //     }
    //     ]

    //   }

    // })
  }


  fetchQuerySecondLoopExceptionDetailData(){
    const self = this;
    const value = {
      token:"234sdf234",
      serialNum:"1430009000003609335198",
      elecSerialNum:"1410101012212120538038",
      date:"2018-05"
    }
    querySecondLoopExceptionDetailData.setParam(value);
    querySecondLoopExceptionDetailData.excute((res)=>{
      const resData = res || {};
      console.log(resData)
      self.setState({
        detailData:resData
      })
    },(err)=>{
      console.log(err)
    });
  }

  renderPageCenter() {
    const { 
      city,
      province

    } = this.state
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

  renderLoopEvent(list){
    if(!list || list.length == 0){return ''}
    return list.map((item,idx)=>{
      return (
        <div className='flex-layout row' key={idx}>
            <div className='flex'>{item.eventName}</div>
            <div className='flex'>{item.date}</div>
        </div>
      )
    })
  }

  render() {

    const detailData = this.state.detailData;

    if(!detailData){return <div></div>};

    const {
      eventList,
      username,
      province,
      city,
      serialNum,
      elecType,
      trade,
      rate,
      measure,
      grade,
      gradeTrend,
      ranking,
      rankingTrend,
      gradeList
    } = detailData;

    const bottomHeight = $('#status2RightBottom').height();

    //状态变化
    const chartsData = {
      data: gradeList,
      height: bottomHeight - 35,
      xAxis: 'date',
      yAxis: 'grade',
      forceFit: true,
      padding: 'auto',
      cols: {
        sales: {
          alias: 'date'
        }
      },
      style: {
        overflow: 'hidden'
      },
      xLabel: {
        offset: 15
      },
      yLabel: {
        offset: 5
      }
    }

    let domHeight = $(".page-main").height();
    return (
      <div className='status-main status-2' style = {{height:domHeight}}>
          <div className='page-left '>
              <h4 className='label '>二次回路信息</h4>
              <div className='topTable'>
                  <div className=' flex-layout row'>
                      <h6 className='h6 flex'>省份</h6>
                      <h6 className='h6 flex'>城市</h6>
                  </div>
                  <div className=' flex-layout row'>
                      <div className=' font flex'>{province || ''}</div>
                      <div className='font flex'>{city || ''}</div>
                  </div>
                  <div className=' flex-layout row'>
                      <h6 className='h6 flex'>户名</h6>
                      <h6 className='h6 flex ellipsis'>巡检仪资产编号</h6>
                  </div>
                  <div className=' flex-layout row'>
                      <div className=' font flex'>{username || ''}</div>
                      <div className='font flex'>{serialNum || ''}</div>
                  </div>
                  <div className=' flex-layout row'>
                      <h6 className='h6 flex'>用电类别</h6>
                      <h6 className='h6 flex ellipsis'>行业类别</h6>
                  </div>
                  <div className=' flex-layout row'>
                      <div className=' font flex'>{elecType || ''}</div>
                      <div className='font flex'>{trade || ''}</div>
                  </div>
                  <div className=' flex-layout row'>
                      <h6 className='h6 flex'>综合倍率</h6>
                      <h6 className='h6 flex ellipsis'>接线方式</h6>
                  </div>
                  <div className=' flex-layout row'>
                      <div className=' font flex'>{rate || ''}</div>
                      <div className='font flex'>{measure || ''}</div>
                  </div>
              </div>
              <h4 className='label2 '>影响二次回路事件</h4>
              <div className='table'>
                  <div className='row1 flex-layout row'>
                      <div className='flex '>事件</div>
                      <div className='flex'>时间</div>
                  </div>
                  {this.renderLoopEvent(eventList)}
              </div>
          </div>
          {this.renderPageCenter()}
          <div className='page-right'>
              <h4 className='label '>二次回路状态</h4>
              <div className='top'>
                  <div className='title'>当前状态</div>
                  <div className='dt'>
                      <div className='title2 '>评分</div>
                      <div className='mr_b flex-layout'>
                          <div style={{ fontSize: '20px' }}>{grade || 100}</div>
                          <div className='pa_l flex-layout'>
                              <div className='iconfont icon-icon-dsj'></div>
                              <span>{gradeTrend || ''}</span>
                          </div>
                      </div>
                      <div className='title2 '>排名</div>
                      <div className='mr_b flex-layout'>
                          <div>
                              <span style={{ fontSize: '20px' }}>{ranking || ''}</span>
                              <span style={{ color: '#5fa3ac' }}>%</span>
                          </div>
                          <div className='pa_l flex-layout'>
                              <div className='iconfont icon-icon-dsj'></div>
                              <span>{rankingTrend || ''}</span>
                          </div>
                      </div>
                  </div>
              </div>
              <div className='bottom' id='status2RightBottom'>
                  <div className='title'>状态变化</div>
                  <Basicline {...chartsData}/>
              </div>
          </div>
      </div>
    )
  }
}

module.exports = Status2
