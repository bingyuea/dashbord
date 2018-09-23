import React, {Component} from "react";
import BaseView from "../core/view.base";
import $ from "jquery";
import {Table} from 'antd';
//图表模型
import {
    Labelline,
    Basicline,
    Doubleaxes,
    Basicbar,
    Groupedcolumn
} from "../ui/ui.charts";

import {
    QueryExceptionCount,
    QueryExceptionByArea,
    QueryExceptionByTime,
    // 行业分布信息查询
    QueryExceptionByTrade,
    // 异常类型分布情况查询
    QueryExceptionDetail,
    // 异常信息表查询
    QueryExceptionList,
} from "../models/secondaryLoop.models";
import Mock from "../mock/mock";

import SearchBar from "../ui/ui.searchbar.js";

import Slider from "react-slick";
// 异常主题事件评估值 数据没有
//定义数据模型
const queryExceptionCount = QueryExceptionCount.getInstance();
const queryExceptionByArea = QueryExceptionByArea.getInstance();
const queryExceptionByTime = QueryExceptionByTime.getInstance();
// 行业分布信息查询
const queryExceptionByTrade = QueryExceptionByTrade.getInstance();
// 异常类型分布情况查询
const queryExceptionDetail = QueryExceptionDetail.getInstance();
// 异常信息表查询
const queryExceptionList = QueryExceptionList.getInstance();

class SecondaryAnaly extends BaseView {
    constructor(props) {
        super(props);

        this.state = {
            pageTitle: "二次回路异常主题分析"
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
        this.fetchQueryExceptionByTime();
        this.fetchQueryExceptionByTrade();
        this.fetchQueryExceptionDetail();
        this.fetchQueryExceptionList();

    }

    // 异常事件总数查询
    fetchQueryExceptionCount(token) {
        const self = this;
        const searchValue = this.state.searchValue;
        queryExceptionCount.setParam({
            token: token,
            province: searchValue.province,
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
            province: searchValue.province,
            city: searchValue.city,
            serialNum: searchValue.serialNum,
            trade: searchValue.trade,
            exception: searchValue.exception,
            startTime: searchValue.startTime,
            endTime: searchValue.endTime,
        });
        queryExceptionByArea.excute((res) => {
            const resData = res.data || {};
            const areaList = resData.areaList || [];
            // "areaList":[
            //         {
            //             "area":"浦东新区,
            //             "areaCount": 200
            //         },
            //         {
            //             "area":"黄浦区",
            //             "areaCount"; 300
            // }
            // ]
            self.setState({
                areaList,
            });
        }, (err) => {
            console.log(err)
        })
    }

    // 异常事件数量变化趋势
    fetchQueryExceptionByTime(token) {
        const self = this;
        const searchValue = this.state.searchValue;
        queryExceptionByTime.setParam({
            token: token,
            province: searchValue.province,
            city: searchValue.city,
            serialNum: searchValue.serialNum,
            trade: searchValue.trade,
            exception: searchValue.exception,
            startTime: searchValue.startTime,
            endTime: searchValue.endTime,
        });
        queryExceptionByTime.excute((res) => {
            const resData = res.data || {};
            const periodList = resData.periodList || [];
            //  "periodList":[
            // {
            // 	"period":"2017-03-01",
            // 	"periodCount":200
            // },
            // 	{
            // 	"period":"2017-03-02",
            // 	"periodCount":300
            // }
            // ]
            self.setState({
                periodList,
            });
        }, (err) => {
            console.log(err)
        })
    }

    // 行业分布信息查询
    fetchQueryExceptionByTrade(token) {
        const self = this;
        const searchValue = this.state.searchValue;
        queryExceptionByTrade.setParam({
            token: token,
            province: searchValue.province,
            city: searchValue.city,
            serialNum: searchValue.serialNum,
            trade: searchValue.trade,
            exception: searchValue.exception,
            startTime: searchValue.startTime,
            endTime: searchValue.endTime,
        });
        queryExceptionByTrade.excute((res) => {
            const resData = res.data || {};
            const tradeList = resData.tradeList || [];
            // "tradeList":[
            //     {
            //         "trade":1,
            //         "tradeName":"大工业用电",
            //         "tradeCount":200
            //     },
            //     {
            //         "trade":2,
            //         "tradeName":"轻工业用电",
            //         "tradeCount": 100
            //     }
            // ]
            self.setState({
                tradeList,
            });
        }, (err) => {
            console.log(err)
        })
    }

    // 异常类型分布情况查询
    fetchQueryExceptionDetail(token) {
        const self = this;
        const searchValue = this.state.searchValue;
        queryExceptionDetail.setParam({
            token: token,
            province: searchValue.province,
            city: searchValue.city,
            serialNum: searchValue.serialNum,
            trade: searchValue.trade,
            exception: searchValue.exception,
            startTime: searchValue.startTime,
            endTime: searchValue.endTime,
        });
        queryExceptionDetail.excute((res) => {
            const resData = res.data || {};
            const exceptionList = resData.exceptionList || [];
            //     "exceptionList":[
            //         {
            //             "exception":1,
            //             "name":"二次侧短路",
            //             "exceptionCount":20
            //         },
            //         {
            // “exception":2,
            // “name":"电能表计量示值错误",
            // “exceptionCount":30
            // }
            // ]
            self.setState({
                exceptionList,
            });
        }, (err) => {
            console.log(err)
        })
    }

    // 异常信息表查询
    fetchQueryExceptionList(token) {
        const self = this;
        const searchValue = this.state.searchValue;
        queryExceptionList.setParam({
            token: token,
            province: searchValue.province,
            city: searchValue.city,
            serialNum: searchValue.serialNum,
            trade: searchValue.trade,
            exception: searchValue.exception,
            startTime: searchValue.startTime,
            endTime: searchValue.endTime,
        });
        queryExceptionList.excute((res) => {
            const resData = res.data || {};
            const dataList = resData.dataList || [];
            // {
            //     "result":1,
            //     "totalPage":3,
            //     "currentPage":1,
            //     "dataList":[
            //     {
            //         "username":"张三",
            //         "place":"南京市",
            //         "serialNum":"SN1234325",
            //         "elecSerialNum":"SN1234325",
            //         "trade":"大工业用电",
            //         "exception":1,
            //         "occTime":"2017-10-10",
            //         "recoverTime":"2017-10-11'
            //     },
            //     {
            //         "username":"李四",
            //         "place":"南京市",
            //         "serialNum":"SN1234322",
            //         "elecSerialNum":"SN1234325",
            //         "trade":"轻工业用电",
            //         "exception":2,
            //         "occTime":"2017-10-10",
            //         "recoverTime":"2017-10-11'
            //     }
            // ]
            // }
            self.setState({
                dataList,
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
        let [
            domHeight,
            loop_content,// 二次回路异常事件统计高度
            charts2, // 异常事件数量变化趋势
            theme, // 异常主题评估
            themeHeight, // 异常主题评估 高度
        ] = [
            $('.page-main').height(),
            $(".loop_top").height() - 20,// 算出表格高度
            {},// 异常事件数量变化趋势
            {}, // 异常主题评估
            $(".SecondaryanalyRight_left .content_box").height() - 20,// 异常主题评估 高度
        ];
        charts2 = {
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
        theme = {
            data: [{
                name: "London",
                "Jan.": 18.9,
                "Feb.": 28.8,
                "Mar.": 39.3,
                "Apr.": 81.4,
                May: 47,
                "Jun.": 20.3,
                "Jul.": 24,
                "Aug.": 35.6
            }, {
                name: "Berlin",
                "Jan.": 12.4,
                "Feb.": 23.2,
                "Mar.": 34.5,
                "Apr.": 99.7,
                May: 52.6,
                "Jun.": 35.5,
                "Jul.": 37.4,
                "Aug.": 42.4
            }],
            fields:["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug."],
            keyName:'月份',
            value:'月均降雨量',
            fieldsName:'name',
            style:{
                overflow:'hidden'
            },
            padding:'auto',
            height:themeHeight
        };
        return (
            <div className="SecondaryanalyRight content" style={{height: domHeight}}>
                <div className="SecondaryanalyRight_left">
                    <div className="content_box">
                        <div className="loop_top">
                            <div className="loop_top_box">
                                <div className="content_title">二次回路异常事件统计
                                <span className="blue_underline"></span>
                                </div>
                            </div>
                            <div className="loop_content loop_number"
                                 style={{height: loop_content, lineHeight: `${loop_content}px`}}
                            >
                                1,420
                                <span className="text-white">&nbsp;件</span>
                            </div>
                        </div>
                        <div className="loop_bottom">
                            <div className="content_title">异常事件数量变化趋势</div>
                            <Basicline {...charts2} />
                        </div>
                    </div>
                </div>
                <div className="SecondaryanalyRight_right">
                    <div className="event">
                        <div className="content_box">
                            <div className="content_title">异常主题评估</div>
                            <div className="event-table">
                                <Groupedcolumn {...theme}/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

    renderPageTwo() {
        return (
            <div>page2</div>
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
            <div className="page-slick page-SecondaryAnaly">
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

module.exports = SecondaryAnaly;
