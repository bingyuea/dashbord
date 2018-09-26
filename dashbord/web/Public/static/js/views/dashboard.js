import React, {Component} from 'react'
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
  ChinaMapChart
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
  TradeEventCountModel,
} from '../models/dashboard.models';

import Mock from '../mock/mock';

import {
  uniqueArr
} from '../util/util'

//定义数据模型
const provinceCountModel = ProvinceCountModel.getInstance(),
      yearCountModel = YearCountModel.getInstance(),
      measureCountModel = MeasureCountModel.getInstance(),
      rateCountModel = RateCountModel.getInstance(),
      tradeCountModel = TradeCountModel.getInstance(),
      eventCountModel = EventCountModel.getInstance(),
      validityEventCountModel = ValidityEventCountModel.getInstance(),
      provinceEventCountModel = ProvinceEventCountModel.getInstance(),
      tradeEventCountModel = TradeEventCountModel.getInstance();

class Dashboard extends BaseView {

    constructor(props) {

        super(props);

        this.state = {
        	
        }
    }

    componentDidMount(){
      this.pageInit();
      this.setState({
        pageStatus:'init'
      });
    }

    pageInit(){
      this.fetchProvinceCount();
      this.fetchYearCount();
      this.fetchMeasureCount();
      this.fetchRateCount();
      this.fetchTradeCount();
      this.fetchEventCount();
      this.fetchValidityEventCount();
      this.fetchProvinceEventCount();
      this.fetchTradeEventCount();

    }

    //不同省份安装情况
    fetchProvinceCount(){
      const self = this;
      provinceCountModel.excute((res)=>{
        const resData = res || {};
        const listData = resData.countList || [];

        self.setState({
          provinceCountData:listData
        });
      },(err)=>{
        
      })
    }

    //安装时间安装情况
    fetchYearCount(){
      const self = this;
      yearCountModel.excute((res)=>{
        const resData = res || {};
        const listData = resData.countList || [];

        self.setState({
          yearCountData:listData
        });
      },(err)=>{
        
      })
    }

    //计量类型统计
    fetchMeasureCount(){
      const self = this;
      measureCountModel.excute((res)=>{
        const resData = res || {};
        const listData = resData.countList || [];
        self.setState({
          measureCountData:listData
        });
      },(err)=>{
        
      })
    }

    //综合倍率统计
    fetchRateCount(){
      const self = this;
      rateCountModel.excute((res)=>{
        const resData = res || {};
        const listData = resData.countList || [];

        self.setState({
          rateCountData:listData
        });
      },(err)=>{
        
      })
    }

    //行业类型统计
    fetchTradeCount(){
      const self = this;

      tradeCountModel.excute((res)=>{
        const resData = res || {};
        const listData = resData.countList || [];
        self.setState({
          tradeCountData:listData
        });
      },(err)=>{
        
      })
    }

    //事件类型情况
    fetchEventCount(){
      const self = this;
      eventCountModel.excute((res)=>{
        const resData = res || {};
        const listData = resData.eventList || [];
        self.setState({
          eventCountData:listData
        });
      },(err)=>{
        
      })
    }

    //有效性事件统计  未完
    fetchValidityEventCount(){
      const self = this;
      validityEventCountModel.setParam({
        eventStatus:1
      });
      validityEventCountModel.excute((res)=>{
        const resData = res || {};
        const listData = resData.eventList || [];
        self.setState({
          validityEventCountData:listData
        });
      },(err)=>{
        
      })
    }

    //不同省份事件上报情况
    fetchProvinceEventCount(){
      const self = this;
      provinceEventCountModel.excute((res)=>{
        const resData = res || {};
        const listData = resData.eventList || [];
        self.setState({
          provinceEventCountData:self.formatProvinceEventCount(listData)
        });
      },(err)=>{
        
      })
    }

    formatProvinceEventCount(list) {
      if(!list){return []}
      let newList = [],target = {};
      list.forEach(item => {
        target.name = item.trade;
        (item.detail || []).forEach(detailItem=>{
          target[detailItem.province] = detailItem.count
        })
        newList.push(target);
      })

      return newList

    }

    getFields(list){
      if(!list){return []}
      let target = [];
      list.forEach(item=>{
        delete item.name;
        target = target.concat(Object.keys(item));
      })

      return uniqueArr(target);

    }



    //行业类型
    fetchTradeEventCount(){
      const self = this;
      tradeEventCountModel.excute((res)=>{
        const resData = res || {};
        const listData = resData.eventList || [];

        self.setState({
          tradeEventCountMData:listData
        });
      },(err)=>{
        
      })
    }



    renderPageLeft(){
      const {
        provinceCountData,
        yearCountData,
        measureCountData,
        rateCountData,
        tradeCountData
      } = this.state; 

      const height = $('.page-left .charts-content').height();
      const chartHeight = (height - 160) / 4;

      //不同省份安装情况
      const charts1 = {
        data:provinceCountData,
        height:chartHeight,
        xAxis:'name',
        yAxis:'count',
        forceFit:true,
        padding:'auto',
        cols:{
          
        },
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

      //安装时间
      const charts2 = {
        data:yearCountData,
        height:chartHeight,
        xAxis:'year',
        yAxis:'count',
        forceFit:true,
        padding:'auto',
        cols:{
          sales: {
            alias:'year'
          }
        },
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

      //计量类型
      const charts3 = {
        data:measureCountData,
        height:chartHeight,
        forceFit:true,
        padding:'auto',
        field:'count',
        dimension:'name',
        cols:{
          percent: {
            formatter: val => {
              val = (val * 100).toFixed(0) + "%";
              return val;
            }
          }
        }
      }

      //综合倍率
      const charts4 = {
        data:rateCountData,
        height:chartHeight,
        forceFit:true,
        padding:'auto',
        field:'count',
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

      //行业类型
      const charts5 = {
        data:tradeCountData,
        height:chartHeight,
        xAxis:'trade',
        yAxis:'count',
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

      return (
        <div className='page-left'>
          <div className='title-content'>
            <h3>安装综合统计</h3>
          </div>
          <div className='charts-content'>
            <div className='section-content'>
              <h6>不同省份安装情况</h6>
              <Basiccolumn {...charts1}/>
            </div>
            <div className='section-content'>
              <h6>安装时间</h6>
              <Basicline {...charts2} />
            </div>
            <div className='section-content has-child'>
              <div className='section-left child'>
                <h6>计量类型</h6>
                <Labelline {...charts3}/>
              </div>
              <div className='section-right child'>
                <h6>综合倍率</h6>
                <Labelline {...charts4}/>
              </div>
            </div>
            <div className='section-content'>
              <h6>行业类型</h6>
              <Basicbar {...charts5}/>
            </div>
          </div>
        </div>
      )
    }
    renderPageCenter(){
      const {
        provinceCountData
      } = this.state; 

      const height = $('.page-center').height();
      const mapHeight = height - 80 - 80 - 20 - 50;
      const mapData = {
        height:mapHeight,
        userData:provinceCountData,
        padding:'auto',
        xAxis:'name',
        yAxis:'count',
        scale:{
          'count': {
            alias: '安装数量'
          }
        },
        forceFit:true
      }

      return (
        <div className='page-center'>
          <h1>巡检仪大数据分析平台</h1>
          <div className='section-content has-child'>
            <div className='section-left child'>
              <h4>巡检仪安装总量</h4>
              <div className='num-box'>
                <li className='num'>1</li>
                <li className='num'>2</li>
                <li className='num'>3</li>
                <li className='num'>3</li>
                <li className='num'>4</li>
                <li className='num'>4</li>
              </div>
            </div>
            <div className='section-right child'>
              <h4>巡检仪线上运行数量</h4>
              <div className='num-box'>
                <li className='num'>2</li>
                <li className='num'>3</li>
                <li className='num'>4</li>
                <li className='num'>5</li>
                <li className='num'>6</li>
                <li className='num'>3</li>
              </div>
            </div>
          </div>
          <div className='section-content map'>
            <ChinaMapChart {...mapData}/>
            <div className='bottom-txt'>中国电力科学研究院</div>
          </div>
        </div>
      )
    }
    renderPageRight(){

      const {
        eventCountData,
        validityEventCountData,
        provinceEventCountData,
        tradeEventCountMData
      } = this.state;  

      const height = $('.page-right .charts-content').height();
      const chartHeight = (height - 80 - 75 - 40) / 3;
      //事件有效性
      const charts6 = {
        // data:validityEventCountData,
        data:Mock.charts6,
        height:chartHeight,
        innerRadius:0.6,
        forceFit:true,
        padding:'auto',
        field:'count',
        dimension:'eventName',
        cols:{
          percent: {
            formatter: val => {
              val = (val * 100).toFixed(0) + "%";
              return val;
            }
          }
        }
      }
      //事件类型
      const charts7 = {
        data:eventCountData,
        height:chartHeight,
        innerRadius:0.6,
        forceFit:true,
        padding:'auto',
        field:'count',
        dimension:'eventName',
        cols:{
          percent: {
            formatter: val => {
              val = (val * 100).toFixed(0) + "%";
              return val;
            }
          }
        }
      }

      //不同省份上报事件情况
      const charts8 = {
        data:provinceEventCountData,
        fields:this.getFields(provinceEventCountData),
        keyName:'地区',
        value:'上报数量',
        fieldsName:'name',
        forceFit:true,
        style:{
          overflow:'auto'
        },
        padding:'auto',
        height:chartHeight
      };

      const charts9 = {
        data:tradeEventCountMData,
        height:chartHeight,
        padding:'auto',
        fields:['count'],
        xAxis:'eventName',
        yAxis:'count'

      }

      return (
        <div className='page-right'>
          <div className='title-content'>
            <h3>异常综合统计</h3>
          </div>
          <div className='charts-content'>
            <div className='section-content has-child'>
                <div className='section-left child'>
                  <h6>事件有效性</h6>
                  <Labelline {...charts6}/>
                </div>
                <div className='section-right child'>
                  <h6>事件类型</h6>
                  <Labelline {...charts7}/>
                </div>
            </div>

            <div className='section-content has-child' style={{height:'75px',flex:'none'}}>
              <div className='child'>
                <h6 className='text-blue'>月上报事件数</h6>
                <div className='text'>
                  <span>{'123,123'}</span> 件
                </div>
              </div>
              <div className='child'>
                <h6 className='text-blue'>有效性</h6>
                <div className='text'>
                  <span>{'123.22'}</span> %
                </div>
              </div>
            </div>
            <div className='section-content'>
              <h6>不同事件上报事件情况</h6>
              <Groupedcolumn {...charts8}/>
            </div>
            <div className='section-content flex-column'>
              <h6>行业类型</h6>
              <Basicradar {...charts9}/>
            </div>
          </div>

        </div>
      )
    }
    renderMain(){

        return (
          <div className='page-dashboard'>
            {this.renderPageLeft()}
            {this.renderPageCenter()}
            {this.renderPageRight()}
          </div>
        )

    }

}

module.exports = Dashboard;