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
  //异常数据统计a
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
      pageIdx: 0
    }
  }

  componentDidMount() {
    this.setState({
      pageStatus: 'init'
    })
  }

  //切换轮播的回调,idx:当前轮播的页面idx
  afterSlickChange(idx) {
    this.setState({
      pageIdx: idx
    })
  }

  //切换轮播
  slickBtn(idx) {
    this.slider.slickGoTo(idx)
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
      afterChange: this.afterSlickChange.bind(this)
    }
    return (
      <div className="page-slick page">
        <h1 className="page-title">二次回路异常主题分析</h1>
        <div className="slick-btn">
          <div
            className={this.state.pageIdx == 0 ? 'btn active' : 'btn'}
            onClick={this.slickBtn.bind(this, 0)}
          />
          <div
            className={this.state.pageIdx == 1 ? 'btn active' : 'btn'}
            onClick={this.slickBtn.bind(this, 1)}
          />
        </div>
        <div className="page-main slider_content">
          <Slider {...settings} ref={slider => (this.slider = slider)}>
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
