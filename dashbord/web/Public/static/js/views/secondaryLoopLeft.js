import React, {Component} from "react";
import BaseView from "../core/view.base";
import $ from "jquery";
import {Table} from 'antd';
//图表模型
import {
    Labelline,
    Basicline,
    Doubleaxes,
    Basicbar
} from "../ui/ui.charts";

import {ProvinceCountModel, YearCountModel} from "../models/business.models";

import Mock from "../mock/mock";

import SearchBar from "../ui/ui.searchbar.js";

import Slider from "react-slick";

//定义数据模型
const provinceCountModel = ProvinceCountModel.getInstance(),
    yearCountModel = YearCountModel.getInstance();

//巡检仪安装情况
class SecondaryLoopLeft extends BaseView {
    constructor(props) {
        super(props);

        this.state = {
            pageTitle: "巡检仪安装情况查询"
        };
    }

    componentDidMount() {
        this.setState({
            pageStatus: "init"
        });
    }

    renderSearchBar() {
        const barOptions = {};

        return (
            <div className="searchbar-content">
                <SearchBar {...barOptions} />
            </div>
        );
    }

    renderPageOne() {
        const domHeight = $('.page-main').height();
        const {validityEventCountData} = this.state;

        // 算出表格高度

        const height = $(".loop_top").height();
        const loop_content = height - 20;
        // 区域占比
        const charts6 = {
            // data:validityEventCountData,
            data: Mock.charts6,
            height: loop_content,
            forceFit: true,
            padding: "auto",
            field: "count",
            dimension: "eventName",
            cols: {
                percent: {
                    formatter: val => {
                        val = (val * 100).toFixed(0) + "%";
                        return val;
                    }
                }
            }
        };

        // 异常事件数量变化趋势
        const charts2 = {
            // data:yearCountData,
            data: Mock.charts2,
            type: "area",
            height: loop_content,
            xAxis: "year",
            yAxis: "count",
            forceFit: true,
            padding: "auto",
            cols: {
                year: {
                    tickInterval: 1
                }
            },
            style: {
                overflow: "auto"
            },
            xLabel: {
                offset: 15
            },
            yLabel: {
                offset: 5
            }
        };

        // 二次回路异常事件
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            width: 150,
        }, {
            title: 'Age',
            dataIndex: 'age',
            width: 150,
        }, {
            title: 'Address',
            dataIndex: 'address',
        }];

        const data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                key: i,
                name: `Edward King ${i}`,
                age: 32,
                address: `London, Park Lane no. ${i}`,
            });
        }

        const eventParent = $(".event_bottom").height();
        const eventTable = eventParent - 20;
        // 异常事件行业分布信息
        const charts3 = {
            data:Mock.charts8,
            height:eventTable,
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
        // 异常事件类型信息
        const charts5 = {
            // data:tradeCountData,
            data:Mock.charts5,
            height:eventTable,
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
            <div className="SecondaryLoopLeft content" style={{height:domHeight}}>
                <div className="SecondaryLoopLeft_left">
                    <div className="content_box">
                        <div className="loop_top">
                            <div className="loop_top_left">
                                <div className="content_title">二次回路异常事件统计</div>
                                <div className="blue_underline"/>
                                <div
                                    className="loop_content"
                                    style={{height: loop_content, lineHeight: loop_content}}
                                >
                                    1,420件
                                </div>
                            </div>
                            <div className="loop_top_right">
                                <div className="content_title no_border_left">区域占比</div>
                                <div className="blue_underline"/>
                                <div className="loop_content">
                                    <Labelline {...charts6} />
                                </div>
                            </div>
                        </div>
                        <div className="loop_bottom">
                            <div className="content_title">异常事件数量变化趋势</div>
                            <Basicline {...charts2} />
                        </div>
                    </div>
                </div>
                <div className="SecondaryLoopLeft_right">
                    <div className="event">
                        <div className="event_top">
                            <div className="content_box">
                                <div className="content_title">二次回路异常事件</div>
                                <div className="content-table">
                                    <Table columns={columns} dataSource={data} pagination={false} scroll={{ y: 40 }} />
                                </div>
                            </div>
                        </div>
                        <div className="event_bottom">
                            <div className="event_bottom_left">
                                <div className="content_box">
                                    <div className="content_title">异常事件行业分布信息</div>
                                    <div className="event-table">
                                        <Doubleaxes {...charts3}/>
                                    </div>
                                </div>
                            </div>
                            <div className="event_bottom_right">
                                <div className="content_box">
                                    <div className="content_title">异常事件类型信息</div>
                                    <div className="event-table">
                                        <Basicbar {...charts5}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

    renderPageTwo() {
        return "two";
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
            <div className="page-slick page-SecondaryLoopLeft">
                <h1 className="page-title">{this.state.pageTitle}</h1>
                <div className="slick-btn">
                    <div className="btn active"/>
                    <div className="btn"/>
                </div>
                {this.renderSearchBar()}
                <div className="page-main slider_content">
                    <Slider {...settings}>
                        <div className="slider_sec ">{this.renderPageOne()}</div>
                        <div className="slider_sec">{this.renderPageTwo()}</div>
                    </Slider>
                </div>
            </div>
        );
    }
}

module.exports = SecondaryLoopLeft;
