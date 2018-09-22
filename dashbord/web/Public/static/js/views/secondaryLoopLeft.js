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

import {
    QueryExceptionCount,
    QueryExceptionByArea
} from "../models/secondaryLoop.models";

import Mock from "../mock/mock";

import SearchBar from "../ui/ui.searchbar.js";

import Slider from "react-slick";

//定义数据模型
const queryExceptionCount = QueryExceptionCount.getInstance();
const queryExceptionByArea = QueryExceptionByArea.getInstance();

//巡检仪安装情况
class SecondaryLoopLeft extends BaseView {
    constructor(props) {
        super(props);

        this.state = {
            pageTitle: "巡检仪安装情况查询"
        };
    }

    componentDidMount() {
        // this.pageInit();
        this.setState({
            pageStatus: "init"
        });
    }

    pageInit() {
        this.fetchQueryExceptionCount();
        this.fetchQueryExceptionByArea();
    }

    // 异常事件总数查询
    fetchQueryExceptionCount(token) {
        const self = this;
        const searchValue = this.state.searchValue;
        queryExceptionCount.setParam({
            token: token,
            province:searchValue.province,
            city: searchValue.city,
            serialNum: searchValue.serialNum,
            trade: searchValue.trade,
            exception: searchValue.exception,
            startTime: searchValue.startTime,
            endTime: searchValue.endTime,
        });
        queryExceptionCount.excute((res) => {
            const resData = res.data || {};
            const totalCount = resData.totalCount || 0;
            self.setState({
                totalCount
            });
        }, (err) => {
            console.log(err)
        })
    }
    // 异常区域占比查询
    fetchQueryExceptionByArea(token) {
        const self = this;
        const searchValue = this.state.searchValue;
        queryExceptionByArea.setParam({
            token: token,
            province:searchValue.province,
            city: searchValue.city,
            serialNum: searchValue.serialNum,
            trade: searchValue.trade,
            exception: searchValue.exception,
            startTime: searchValue.startTime,
            endTime: searchValue.endTime,
        });
        queryExceptionByArea.excute((res) => {
            const resData = res.data || {};
            const area = resData.area || 0;
            const areaCount = resData.areaCount || 0;
            self.setState({
                area,
                areaCount,
            });
        }, (err) => {
            console.log(err)
        })
    }

    search(value) {
        console.log(value);
        this.setState({
            searchValue: value,
        })
    }

    renderSearchBar() {
        const barOptions = {
            locationData: {
                title: '安装地点',
                province: {
                    options: [{
                        value: '上海',
                        desc: '上海'
                    }, {
                        value: '江苏',
                        desc: '江苏'
                    }],
                    key: 'province'
                },
                city: {
                    options: [{
                        value: '南京',
                        desc: '南京'
                    }, {
                        value: '苏州',
                        desc: '苏州'
                    }],
                    key: 'city'
                },
            },
            measureData: {
                title: '计量类型',
                key: 'measure',
                options: [{
                    value: 1,
                    desc: '三相三线'
                }, {
                    value: 2,
                    desc: '三相四线'
                },]
            },
            tradeData: {
                title: '行业类型',
                key: 'trade',
                options: [{
                    value: 1,
                    desc: '三相三线'
                }, {
                    value: 2,
                    desc: '三相四线'
                },]
            },
            unusualData: {
                title: '异常类型',
                key: 'unusual',
                options: [{
                    value: 1,
                    desc: '三相三线'
                }, {
                    value: 2,
                    desc: '三相四线'
                }]
            },
            dateData: {
                title: '上报时间'

            },
            inputData: {
                title: '巡检仪资产编号',
                key: 'xmdId',
                placeholder: '请输入资产编号'
            },
            searchHandle: this.search.bind(this),
        }

        return (
            <SearchBar {...barOptions} />
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
                overflow: "hidden"
            },
            xLabel: {
                offset: 15
            },
            yLabel: {
                offset: 5
            }
        };

        // 二次回路异常事件
        const columns = [
            {
                title: '所属地区',
                dataIndex: '所属地区',
            },
            {
                title: '所属县市',
                dataIndex: '所属县市',
            },
            {
                title: '巡检仪资产编号',
                dataIndex: '巡检仪资产编号',
            },
            {
                title: '电能表资产编号',
                dataIndex: '电能表资产编号',
            },
            {
                title: '户名',
                dataIndex: '户名',
            },
            {
                title: '用电类型',
                dataIndex: '用电类型',
            },
            {
                title: '异常类型',
                dataIndex: '异常类型',
            },
            {
                title: '异常日期',
                dataIndex: '异常日期',
            },
            {
                title: '恢复日期',
                dataIndex: '恢复日期',
            },
        ];

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

        // table 的高度不对
        const tableParent = $(".event_top").height();
        const tableHeight = eventParent - 20;
        console.log(tableParent)
        console.log(tableHeight)
        console.log($(".event").height() +"event")
        console.log($(".SecondaryLoopLeft_right").height() +"SecondaryLoopLeft_right")
        console.log($(".SecondaryLoopLeft ").height() +"SecondaryLoopLeft ")

        // 异常事件行业分布信息
        const charts3 = {
            data: Mock.charts8,
            height: eventTable,
            xAxis: 'time',
            yAxis_line: 'people',
            yAxis_interval: 'waiting',
            forceFit: true,
            padding: 'auto',
            cols: {
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
            style: {
                overflow: 'hidden',
            },
            xLabel: {
                offset: 15,
            },
            yLabel: {
                offset: 5,
            }
        }
        // 异常事件类型信息
        const charts5 = {
            // data:tradeCountData,
            data: Mock.charts5,
            height: eventTable,
            xAxis: 'trade',
            yAxis: 'count',
            forceFit: true,
            padding: 'auto',
            style: {
                overflow: 'hidden',
            },
            xLabel: {
                offset: 15,
            },
            yLabel: {
                offset: 5,
            }
        }
        return (
            <div className="SecondaryLoopLeft content" style={{height: domHeight}}>
                <div className="SecondaryLoopLeft_left">
                    <div className="content_box">
                        <div className="loop_top">
                            <div className="loop_top_left">
                                <div className="content_title">二次回路异常事件统计</div>
                                <div className="blue_underline"/>
                                <div
                                    className="loop_content loop_number"
                                    style={{height: loop_content, lineHeight: loop_content}}
                                >
                                    1,420
                                    <span className="text-white">件</span>
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
                                    <Table columns={columns} dataSource={data} pagination={false}
                                           scroll={{y: 140}}/>
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
