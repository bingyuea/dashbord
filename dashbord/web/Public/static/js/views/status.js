import React, { Component } from 'react'
import BaseView from '../core/view.base'
import $ from 'jquery';
import Mock from '../mock/mock';
//图表模型
import Slider from "react-slick";
//图表模型
import { 
  ChinaMapEcharts,
  Basicline
} from '../ui/ui.charts.js';

//异常数据统计
import { 
  QuerySecondLoopExceptionDetailData,
  GetTopTenOfSecondLoopExceptionTop
} from '../models/status.models';
//定义数据模型
const querySecondLoopExceptionDetailData = QuerySecondLoopExceptionDetailData.getInstance(),
      getTopTenOfSecondLoopExceptionTop = GetTopTenOfSecondLoopExceptionTop.getInstance();
class Status extends BaseView {

    constructor(props) {

        super(props);

        this.state = {
            pageStatus: "init",
            pageIdx:0
        }
    }

    componentDidMount() {
        //pageone
        let params = {
          token: '234sdf234',
          province: '山西',
          startTime: '2011-01',
          endTime: '2019-01'
          // data: 'yyyy-mm'
        }
        this.fetchGetTopTenOfSecondLoopExceptionTop(params)
        //pagetwo
        this.fetchQuerySecondLoopExceptionDetailData();
    }

    fetchGetTopTenOfSecondLoopExceptionTop(value) {
        let self = this
        getTopTenOfSecondLoopExceptionTop.setParam({ ...value })
        getTopTenOfSecondLoopExceptionTop.excute(
          res => {
            let dataList = res || {}
            self.setState({
              dataList
            })
          },
          err => {
            console.log(err)
          }
        )
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

    renderPageOneCenter() {
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
    renderPageOne() {
        let appview = $('.page-main').height()
        let { dataList } = this.state || {}
        dataList = (dataList && dataList.dataList) || []
        console.log(dataList)

        // dataList = [
        //   {
        //     user: '111',
        //     assessedValue: 1
        //   }
        // ]
        return (
          <div className="status-main page" style={{ height: appview }}>
            <div className="page-left ">
              <h4 className="label ">二次回路状态排行榜</h4>
              <div className="tabel">
                <div className="row1 flex-layout">
                  <h6 className="h6 flex">用户</h6>
                  <h6 className="h6 flex">评估值</h6>
                </div>
                {Array.isArray(dataList) &&
                  dataList.map((item, index) => {
                    return (
                      <div
                        className={
                          (index + 1) % 2 === 0
                            ? ['row2 flex-layout ']
                            : ['row1 flex-layout ']
                        }
                        key={index}
                      >
                        <div className="flex">{item.user}</div>
                        <div className="flex">{item.assessedValue}</div>
                      </div>
                    )
                  })}
              </div>
            </div>
            {this.renderPageOneCenter()}
            <div className="page-right" />
          </div>
        )
    }

    renderPageTwoCenter() {
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

    renderPageTwo() {

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
              {this.renderPageTwoCenter()}
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

    renderMain() {
        
        var settings = {
            dots: false,
            dotsClass: "slick-dots slick-thumb item_box",
            autoplay: false,
            arrows: false,
            infinite: true,
            speed: 500,
            autoplaySpeed: 5000,
            slidesToShow: 1,
            slidesToScroll: 1,
            touchMove: true,
            afterChange:this.afterSlickChange.bind(this)
        };
        const pageIdx = this.state.pageIdx;
        return (
            <div className="page-status page-slick page">
                <h1 className='page-title'>二次回路状态在线监测</h1>
                <div className='slick-btn'>
                    <div className={pageIdx == 0 ?'btn active':'btn'} onClick={this.slickBtn.bind(this,0)}></div>
                    <div className={pageIdx == 1 ?'btn active':'btn'} onClick={this.slickBtn.bind(this,1)}></div>
                </div>
                <div className="page-main slider_content">
                    <Slider {...settings}  ref={slider=>this.slider = slider}>
                        <div className="slider_sec ">
                            {this.renderPageOne()}
                        </div>
                        <div className="slider_sec">
                            {this.renderPageTwo()}
                        </div>
                    </Slider>
                </div>
            </div>

        )
    }

}

module.exports = Status;