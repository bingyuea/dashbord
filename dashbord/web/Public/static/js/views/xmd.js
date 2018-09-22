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
        	pageTitle:'巡检仪安装情况查询',
        }
    }

    componentDidMount(){
      
    }

    renderSearchBar(){

      const barOptions = {

      }

      return(
        <div className='searchbar-content'>
          <SearchBar {...barOptions}/>
        </div>
      )
    }


    renderPageOne(){
      return 'as'
    }

    renderPageTwo(){
      return 'two'
    }
    
    renderMain(){

      var settings = {
        dots: false,
        dotsClass:'slick-dots slick-thumb item_box',
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
          <div className='page-main slider_content'>
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