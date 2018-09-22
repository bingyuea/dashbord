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
class SecondaryLoopLeft extends BaseView {

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
        const {
            validityEventCountData,
        } = this.state;

        // 算出表格高度
        const height = 300;
        const loop_content = (height - 80 - 75 - 40) / 3;
        // 区域占比
        const charts6 = {
            // data:validityEventCountData,
            data:Mock.charts6,
            type:"area",
            height:loop_content,
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
        return (
            <div className="SecondaryLoopLeft content">
                <div className="SecondaryLoopLeft_left">
                    <div className="content_box">
                        <div className="loop_top">
                            <div className="loop_top_left">
                                <div className="content_title">
                                    二次回路异常事件统计
                                </div>
                                <div className="blue_underline"></div>
                                <div className="loop_content">
                                    1,420件
                                </div>
                            </div>
                            <div className="loop_top_right">
                                <div className="content_title no_border_left">
                                    区域占比
                                </div>
                                <div className="loop_content">
                                    <Labelline {...charts6}/>
                                </div>
                            </div>
                        </div>
                        <div className="loop_bottom">

                        </div>
                    </div>
                </div>
                <div className="SecondaryLoopLeft_right"></div>
            </div>
        )
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
            <div className='page-slick page-SecondaryLoopLeft'>
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

module.exports = SecondaryLoopLeft;