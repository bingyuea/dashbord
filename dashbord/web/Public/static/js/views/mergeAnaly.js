import React, { Component } from 'react'
import BaseView from '../core/view.base'
import $ from 'jquery';
import Mock from '../mock/mock';
import Analy from './../views/analy';
import SecondaryAnaly from './../views/SecondaryAnaly';
//图表模型
import { ChinaMapChart } from '../ui/ui.charts';
import Slider from "react-slick";
class MergeAnaly extends BaseView {

    constructor(props) {

        super(props);

        this.state = {
        }
    }

    componentDidMount() {
        this.setState({
            pageStatus: 'init',
        });
    }

    pageInit() {
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
            touchMove: true
        };
        return (
            <div className="page-slick page-SecondaryLoopLeft ">
                <Slider {...settings} style={{height:'100%'}}>
                    <div className="slider_sec "><Analy/></div>
                    <div className="slider_sec"><SecondaryAnaly /></div>
                </Slider>
            </div>
        )

    }

}

module.exports = MergeAnaly;