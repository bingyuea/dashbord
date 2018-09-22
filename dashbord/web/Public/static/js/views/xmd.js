import React, {Component} from 'react'
import BaseView from '../core/view.base'
import $ from 'jquery'
//图表模型
import {
  Labelline,
  Basicbar,
} from '../ui/ui.charts'
import {
  ProvinceCountModel,
  YearCountModel
} from '../models/business.models';

import Mock from '../mock/mock';

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

      return 'one'

      return (
        <div className="slider_sec">
          <div className='side-content'>

          </div>
          <div className='center-content'>

          </div>
          <div className='side-content'>

          </div>
        </div>
      )
    }

    renderPageTwo(){
      return 'two'
      return (
        <div className="slider_sec">
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