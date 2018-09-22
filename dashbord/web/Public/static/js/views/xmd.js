import React, {Component} from 'react'
import BaseView from '../core/view.base'
import $ from 'jquery'

//update something
import {
  ProvinceCountModel,
  YearCountModel
} from '../models/business.models';

import Mock from '../mock/mock';
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
import SearchBar from '../ui/ui.searchbar.js';

import Slider from "react-slick";

//定义数据模型
const provinceCountModel = ProvinceCountModel.getInstance(),
      yearCountModel = YearCountModel.getInstance();
//巡检仪安装情况
class XMD extends BaseView {

    constructor(props) {

        super(props);
        this.state = {
          pageTitle:'巡检仪安装情况查询'
        }
    }

    componentDidMount(){
      this.setState({
        pageStatus:'init'
      })
    }



    renderSearchBar(){

      const barOptions = {
        locationData:{
          title:'安装地点',
          province:{
            options:[{
              value:'上海',
              desc:'上海'
            },{
              value:'江苏',
              desc:'江苏'
            }],
            key:'province'
          },
          city:{
            options:[{
              value:'南京',
              desc:'南京'
            },{
              value:'苏州',
              desc:'苏州'
            }],
            key:'city'
          },
        },
        measureData:{
          title:'计量类型',
          key:'measure',
          options:[{
            value:1,
            desc:'三相三线'
          },{
            value:2,
            desc:'三相四线'
          },]
        },
        tradeData:{
          title:'行业类型',
          key:'trade',
          options:[{
            value:1,
            desc:'三相三线'
          },{
            value:2,
            desc:'三相四线'
          },]
        },
        unusualData:{
          title:'异常类型',
          key:'unusual',
          options:[{
            value:1,
            desc:'三相三线'
          },{
            value:2,
            desc:'三相四线'
          }]
        },
        dateData:{
          title:'上报时间'

        },
        inputData:{
          title:'巡检仪资产编号',
          key:'xmdId',
          placeholder:'请输入资产编号'
        }

      }

      return(
        
          <SearchBar {...barOptions}/>
      )
    }

    renderPageOne(){

      const {
        provinceCountData,
        yearCountData,
        measureCountData,
        rateCountData,
        tradeCountData
      } = this.state; 

      const domHeight = $('.page-main').height();
      if(!domHeight){return}
      const leftChartHeight = (domHeight - 25 - 2 - 70 - 70) / 2;
      const centerChartHeight = (domHeight - 25 - 2 - 70 - 70) / 2;

       //地区分布信息
      const charts5 = {
        // data:tradeCountData,
        data:Mock.charts5,
        height:leftChartHeight,
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

      //巡检仪上线数
      const charts2 = {
        // data:yearCountData,
        data:Mock.charts2,
        height:leftChartHeight,
        xAxis:'year',
        yAxis:'count',
        forceFit:true,
        padding:'auto',
        cols:{
          year: {
            tickInterval: 1,
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

      //客户分布情况
      const charts3 = {
        data:Mock.charts8,
        height:centerChartHeight,
        xAxis:'time',
        yAxis_line:'people',
        yAxis_interval:'waiting',
        forceFit:true,
        padding:'auto',
        cols:{
          call: {
            min: 0
          },
          people: {
            min: 0
          },
          waiting: {
            min: 0
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

      return (
        <div className="slick-page"  style={{height:domHeight}}>
          <div className='side-content content_box'>
            <div className="content_title">
                巡检仪安装情况
            </div>
            <div className="blue_underline"></div>
            <div className='total-num'>
              <span className='blue-txt'>23,232</span>
              台
            </div>
            <div className='charts-content'>
              <div className='section-content'>
                <span>巡检仪上线数</span>
                <Basicline {...charts2} />
              </div>
              <div className='section-content'>
                <span>地区分布信息</span>
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
              <div className='section-content'>
                  <span>行业信息</span>
                  <Doubleaxes {...charts3}/>
                </div>
            </div>
            <div className='bottom'>
              <div className="content_title">
                  客户分布情况
              </div>
              <div className="blue_underline"></div>
              <div className='section-content'>
                  <span>行业信息</span>
                  <Doubleaxes {...charts3}/>
                </div>
            </div>
          </div>
          <div className='side-content content_box'>

          </div>
        </div>
      )
    }

    renderPageTwo(){
      const domHeight = $('.page-main').height();
      return (
        <div className="slick-page" style={{height:domHeight}}>
          <div className='side-content'>

          </div>  
          <div className='center-content'>

          </div>
          <div className='side-content'>

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
        touchMove:true
      };

      return (
        <div className='page-xmd page-slick'>
          <h1 className='page-title'>{this.state.pageTitle}</h1>
          <div className='slick-btn'>
            <div className='btn active'></div>
            <div className='btn'></div>
          </div>
          {this.renderSearchBar()}
          <div className='page-main slider_content' style={{height:'496px'}}>
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
      )

    }

}

module.exports = XMD;