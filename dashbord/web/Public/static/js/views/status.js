import React, { Component } from 'react'
import BaseView from '../core/view.base'
import $ from 'jquery';
import Mock from '../mock/mock';
//图表模型
import Slider from "react-slick";

import Status1  from './status_1'
import Status2  from './status_2'
class Status extends BaseView {

    constructor(props) {

        super(props);

        this.state = {
            pageStatus: "init",
            pageIdx:0
        }
    }

    componentDidMount() {
        this.setState({
            pageStatus: 'init'
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
            <div className="page-status page-slick">
                <h1 className='page-title'>二次回路状态在线监测</h1>
                <div className='slick-btn'>
                    <div className={pageIdx == 0 ?'btn active':'btn'} onClick={this.slickBtn.bind(this,0)}></div>
                    <div className={pageIdx == 1 ?'btn active':'btn'} onClick={this.slickBtn.bind(this,1)}></div>
                </div>
                <div className="page-main slider_content">
                    <Slider {...settings}  ref={slider=>this.slider = slider}>
                        <div className="slider_sec ">
                            <Status1 />
                        </div>
                        <div className="slider_sec">
                            <Status2 />
                        </div>
                    </Slider>
                </div>
            </div>

        )



    }

}

module.exports = Status;