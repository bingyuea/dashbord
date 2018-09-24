import React, { Component } from 'react'
import BaseView from '../core/view.base'
import $ from 'jquery';
import Mock from '../mock/mock';
//图表模型
import { ChinaMapChart } from '../ui/ui.charts';
import Slider from "react-slick";
class Status extends BaseView {

    constructor(props) {

        super(props);

        this.state = {
            pageStatus: "init"
        }
    }

    componentDidMount() {
        this.setState({
            pageStatus: 'init'
        });
    }

    pageInit() {
       

    }
    renderPageOne() {
        let appview = $("#appview").height();
        return (
            <div className='page-status  page-dashboard page' style = {{height:appview}} >
                <div className='left '>
                    <h4 className='label '>二次回路状态排行榜</h4>
                    <div className='tabel'>
                        <div className='row1 flex-layout'>
                            <h6 className='h6 flex'>用户</h6>
                            <h6 className='h6 flex'>评估值</h6>
                        </div>
                        <div className='row2 flex-layout'>
                            <div className='flex'> </div>
                            <div className='flex'></div>
                        </div>
                        <div className='row1 flex-layout'>
                            <div className='flex'> </div>
                            <div className='flex'></div>
                        </div>
                        <div className='row2 flex-layout'>
                            <div className='flex'> </div>
                            <div className='flex'></div>
                        </div>
                        <div className='row1 flex-layout'>
                            <div className='flex'> </div>
                            <div className='flex'></div>
                        </div>
                        <div className='row2 flex-layout'>
                            <div className='flex'> </div>
                            <div className='flex'></div>
                        </div>
                        <div className='row1 flex-layout'>
                            <div className='flex'> </div>
                            <div className='flex'></div>
                        </div>
                        <div className='row2 flex-layout'>
                            <div className='flex'> </div>
                            <div className='flex'></div>
                        </div>
                        <div className='row1 flex-layout'>
                            <div className='flex'> </div>
                            <div className='flex'></div>
                        </div>
                        <div className='row2 flex-layout'>
                            <div className='flex'> </div>
                            <div className='flex'></div>
                        </div>
                    </div>
                </div>
                {this.renderPageCenter()}
                <div className='right'>

                </div>
            </div>
        )
    }
    renderPageTwo() {
        let appview = $("#appview").height();
        return (
            <div className='page-statusDt  page-dashboard page' style = {{height:appview}}>
                <div className='left '>
                    <h4 className='label '>二次回路信息</h4>
                    <div className='topTable'>
                        <div className=' flex-layout row'>
                            <h6 className='h6 flex'>省份</h6>
                            <h6 className='h6 flex'>城市</h6>
                        </div>
                        <div className=' flex-layout row'>
                            <div className=' font flex'> 湖北</div>
                            <div className='font flex'>湖北</div>
                        </div>
                        <div className=' flex-layout row'>
                            <h6 className='h6 flex'>户名</h6>
                            <h6 className='h6 flex ellipsis'>巡检仪资产编号</h6>
                        </div>
                        <div className=' flex-layout row'>
                            <div className=' font flex'> </div>
                            <div className='font flex'></div>
                        </div>
                        <div className=' flex-layout row'>
                            <h6 className='h6 flex'>用电类别</h6>
                            <h6 className='h6 flex ellipsis'>行业类别</h6>
                        </div>
                        <div className=' flex-layout row'>
                            <div className=' font flex'> </div>
                            <div className='font flex'></div>
                        </div>
                        <div className=' flex-layout row'>
                            <h6 className='h6 flex'>综合倍率</h6>
                            <h6 className='h6 flex ellipsis'>接线方式</h6>
                        </div>
                        <div className=' flex-layout row'>
                            <div className=' font flex'> </div>
                            <div className='font flex'></div>
                        </div>
                    </div>
                    <h4 className='label2 '>影响二次回路事件</h4>
                    <div className='table'>
                        <div className='row1 flex-layout row'>
                            <div className='flex '>电流失流</div>
                            <div className='flex'>2018-01-02</div>
                        </div>
                        <div className='row2 flex-layout row'>
                            <div className='flex'> </div>
                            <div className='flex'></div>
                        </div>
                        <div className='row1 flex-layout row'>
                            <div className='flex'> </div>
                            <div className='flex'></div>
                        </div>
                        <div className='row2 flex-layout row'>
                            <div className='flex'> </div>
                            <div className='flex'></div>
                        </div>
                        <div className='row1 flex-layout row'>
                            <div className='flex'> </div>
                            <div className='flex'></div>
                        </div>
                        <div className='row2 flex-layout row'>
                            <div className='flex'> </div>
                            <div className='flex'></div>
                        </div>
                    </div>
                </div>
                {this.renderPageCenter()}
                <div className='right'>
                    <h4 className='label '>二次回路状态</h4>
                    <div className='top'>
                        <div className='title' >当前状态</div>
                        <div className='dt'>
                            <div className='title2 '>评分</div>
                            <div className='mr_b flex-layout'>
                                <div style={{ fontSize: '20px' }}>98.8</div>
                                <div className='pa_l flex-layout'>
                                    <div className='iconfont icon-icon-dsj'></div>
                                    <span>0.24</span>
                                </div>
                            </div>
                            <div className='title2 '>排名</div>
                            <div className='mr_b flex-layout'>
                                <div>
                                    <span style={{ fontSize: '20px' }}>2</span>
                                    <span style={{ color: '#5fa3ac' }}>%</span>
                                </div>
                                <div className='pa_l flex-layout'>
                                    <div className='iconfont icon-icon-dsj'></div>
                                    <span>0.24</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bottom'>
                        <div className='title'>状态变化</div>

                    </div>
                </div>
            </div>
        )
    }
    renderPageCenter() {
        const {
            provinceCountData
        } = this.state;
        const height = $('.section-content.map').height();
        const mapHeight = height - 50;
        const mapData = {
            height: mapHeight,
            // userData:provinceCountData,
            userData: Mock.charts1,
            padding: 'auto',
            xAxis: 'name',
            yAxis: 'count',
            scale: {
                'count': {
                    alias: '安装数量'
                }
            },
            forceFit: true
        };
        return (
            <div className='page-center'>
                <h1>二次回路状态在线监测</h1>
                <div className='slick-btn center'>
                    <div className='btn active'></div>
                    <div className='btn'></div>
                </div>
                <div className='section-content map '>
                    <ChinaMapChart {...mapData} />
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
            touchMove: true
        };
        return (
            <div className=" slider_content">
                <Slider {...settings}>
                    <div className="slider_sec ">{this.renderPageOne()}</div>
                    <div className="slider_sec">{this.renderPageTwo()}</div>
                </Slider>
            </div>

        )



    }

}

module.exports = Status;