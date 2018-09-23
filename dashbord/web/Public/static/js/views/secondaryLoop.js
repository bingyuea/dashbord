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
    QueryExceptionByArea,
    QueryExceptionByTime,
    // 行业分布信息查询
    QueryExceptionByTrade,
    // 异常类型分布情况查询
    QueryExceptionDetail,
    // 异常信息表查询
    QueryExceptionList,
    /*
    *  二次回路单-异常分析2
    */
    // 电流分析对比查询
    QueryElecCurrentData,
} from "../models/secondaryLoop.models";
import Mock from "../mock/mock";

import SearchBar from "../ui/ui.searchbar.js";

import Slider from "react-slick";

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
/*
*  二次回路单-异常分析2
*/
// 电流分析对比查询
const queryElecCurrentData = QueryElecCurrentData.getInstance();

class SecondaryLoop extends BaseView {
    constructor(props) {
        super(props);

        this.state = {
            pageTitle: "二次回路单-异常分析"
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
        /*
        *  二次回路单-异常分析2
        */
        // 电流分析对比查询
        this.fetchQueryElecCurrentData();

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

    /*
    *  二次回路单-异常分析2
    */

    // 电流分析对比查询
    fetchQueryElecCurrentData(token) {
        const self = this;
        // 这里是点击当前行的的数据
        const searchValue = this.state.searchValue;
        queryElecCurrentData.setParam({
            token: token,
            serialNum: searchValue.serialNum,
            elecSerialNum: searchValue.elecSerialNum,
            occTime: searchValue.occTime,
        });
        queryElecCurrentData.excute((res) => {
            const resData = res.data || {};
            const xmdData = resData.xmdData || [];
            const elecData = resData.elecData || [];
            // {
            //     "result":1,
            //     "xmdData":[
            //     {
            //         "phase":"A相",
            //         "pointList":[0.5,0.6,.....,0.9]
            // },
            //     {
            //         "phase ":" B相",
            //         "pointList":[0.5,0.6,.....,0.9]
            //     }
            // ],
            //     "elecData":[
            //     {
            //         "phase":"A相",
            //         "pointList":[0.5,0.6,.....,0.9]
            // },
            //     {
            //         "phase ":" B相",
            //         "pointList":[0.5,0.6,.....,0.9]
            //     }
            // ]
            // }
            self.setState({
                xmdData,
                elecData,
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
            loop_content,// 算出表格高度
            data, // 表格里面的数据
            eventTable, // 图表高度
            charts2, // 异常事件数量变化趋势
            columns, // 二次回路异常事件
            charts3, // 异常事件行业分布信息
            charts5, // 异常事件类型信息
            charts6, // 区域占比
        ] = [
            $('.page-main').height(),
            $(".loop_top").height() - 20,// 算出表格高度
            [],
            $(".event_bottom").height() - 20,
            {},// 异常事件数量变化趋势
            [],// 二次回路异常事件
            {},// 异常事件行业分布信息
            {},// 异常事件类型信息
            {}// 区域占比
        ];
        columns = [
            {
                title: '所属地区',
                dataIndex: 'place',
            },
            {
                title: '所属县市',
                dataIndex: '所属县市',
            },
            {
                title: '巡检仪资产编号',
                dataIndex: 'serialNum',
            },
            {
                title: '电能表资产编号',
                dataIndex: 'elecSerialNum',
            },
            {
                title: '户名',
                dataIndex: 'username',
            },
            {
                title: '用电类型',
                dataIndex: 'trade',
            },
            {
                title: '异常类型',
                dataIndex: 'exception',
            },
            {
                title: '异常日期',
                dataIndex: 'occTime',
            },
            {
                title: '恢复日期',
                dataIndex: 'recoverTime',
            },
        ]
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
        console.log(eventTable+"eventTable")
        charts3 = {
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
        };
        charts5 = {
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
        };
        // 区域占比
        charts6 = {
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
        // const
        //     {
        //         validityEventCountData
        //     }
        //         = this.state;
        for (let i = 0; i < 100; i++) {
            data.push(
                {
                    key: `${i}`,
                    username: `李四${i}`,
                    place: "南京市",
                    serialNum: "SN1234322",
                    elecSerialNum: `SN1234325${i}`,
                    trade: "轻工业用电",
                    exception: 2,
                    occTime: "2017-10-10",
                    recoverTime: "2017-10-11",
                }
            );
        }
        // table 的高度不对
        const tableParent = $(".event_top").height();
        const tableHeight = tableParent - 20;
        console.log(tableParent)
        console.log(tableHeight)
        console.log($(".event").height() + "event")
        console.log($(".SecondaryLoopLeft_right").height() + "SecondaryLoopLeft_right")
        console.log($(".SecondaryLoopLeft ").height() + "SecondaryLoopLeft ")


        return (
            <div className="SecondaryLoopLeft content" style={{height: domHeight}}>
                <div className="SecondaryLoopLeft_left">
                    <div className="content_box">
                        <div className="loop_top">
                            <div className="loop_top_left">
                                <div className="content_title">二次回路异常事件统计</div>
                                <div className="blue_underline"/>
                                <div className="loop_content loop_number"
                                     style={{height: loop_content, lineHeight: `${loop_content}px`}}
                                >
                                    1,420
                                    <span className="text-white">&nbsp;件</span>
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
                                           scroll={{y: 120}}/>
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
        let [
            domHeight,// tab页面的高度
            data, // 表格里面的数据
            columns, // 二次回路异常事件
            chartsEleA, // 电流分析对比查询 图表A
            chartsEleB, // 电流分析对比查询 图表B
            chartsEleC, // 电流分析对比查询 图表C
            chartsEleHeight, // 电流分析对比查询 高度
            chartsEleChange, // 电量变化图表
            chartsEleChangeHeight, // 电量变化图表 高度
        ] = [
            $('.page-main').height(),// tab页面的高度
            [], // 表格里面的数据
            [
                {
                    title: '所属地区',
                    dataIndex: 'place',
                },
                {
                    title: '所属县市',
                    dataIndex: '所属县市',
                },
                {
                    title: '巡检仪资产编号',
                    dataIndex: 'serialNum',
                },
                {
                    title: '电能表资产编号',
                    dataIndex: 'elecSerialNum',
                },
                {
                    title: '户名',
                    dataIndex: 'username',
                },
                {
                    title: '用电类型',
                    dataIndex: 'trade',
                },
                {
                    title: '异常类型',
                    dataIndex: 'exception',
                },
                {
                    title: '异常日期',
                    dataIndex: 'occTime',
                },
                {
                    title: '恢复日期',
                    dataIndex: 'recoverTime',
                },
            ], // 二次回路异常事件
            {},
            {},
            {},
            ($(".SecondaryLoopLeft_left").height() - 20) / 3,// 电流分析对比查询 高度
            [],// 电流分析对比查询 数据
            {},// 电量变化图表
            0,// 电量变化图表 高度
        ];
        chartsEleA = {
            // data:yearCountData,
            data: Mock.charts2,
            type: "area",
            height: chartsEleHeight,
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
        };// 电流分析对比查询 图表A
        chartsEleB = {
            // data:yearCountData,
            data: Mock.charts2,
            type: "area",
            height: chartsEleHeight,
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
        };// 电流分析对比查询 图表B
        chartsEleC = {
            // data:yearCountData,
            data: Mock.charts2,
            type: "area",
            height: chartsEleHeight,
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
        };// 电流分析对比查询 图表C
        chartsEleChange = {
            // data:yearCountData,
            data: Mock.charts2,
            type: "area",
            height: chartsEleChangeHeight,
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
        };// 电量变化图表
        console.log($(".SecondaryLoopLeft_left"))
        for (let i = 0; i < 100; i++) {
            data.push(
                {
                    key: `${i}`,
                    username: `李四${i}`,
                    place: "南京市",
                    serialNum: "SN1234322",
                    elecSerialNum: `SN1234325${i}`,
                    trade: "轻工业用电",
                    exception: 2,
                    occTime: "2017-10-10",
                    recoverTime: "2017-10-11",
                }
            );
        }
        return (
            <div className="SecondaryLoopRight content" style={{height: domHeight}}>
                <div className="SecondaryLoopRight_left">
                    <div className="content_box">
                        <div className="content_title">电流对比分析</div>
                        <div className="ele_charts">
                            <p className="ele_charts_title">A组</p>
                            <Basicline {...chartsEleA} />
                        </div>
                        <div className="ele_charts">
                            <p className="ele_charts_title">A组</p>
                            <Basicline {...chartsEleB} />
                        </div>
                        <div className="ele_charts">
                            <p className="ele_charts_title">A组</p>
                            <Basicline {...chartsEleC} />
                        </div>
                    </div>
                </div>
                <div className="SecondaryLoopRight_right">
                    <div className="event">
                        <div className="event_top">
                            <div className="content_box">
                                <div className="content_title">二次回路异常事件</div>
                                <div className="content-table">
                                    <Table columns={columns} dataSource={data} pagination={false}
                                           scroll={{y: 120}}/>
                                </div>
                            </div>
                        </div>
                        <div className="event_bottom">
                            <div className="event_bottom_left">
                                <div className="content_box">
                                    <div className="content_title">事件信息</div>
                                    <div className="event-table">
                                        <ul>
                                            <li>
                                                <p>
                                                    电能表上报事件
                                                </p>
                                                <div className="blue_underline"></div>
                                                <p className="event_report"></p>
                                            </li>
                                            <li>
                                                <p>
                                                    巡检仪上报事件
                                                </p>
                                                <div className="blue_underline"></div>
                                                <p className="event_report"></p>
                                            </li>

                                            <li>
                                                <p>
                                                    巡检仪上报事件
                                                </p>
                                                <div className="blue_underline"></div>
                                                <p className="event_report"></p>
                                            </li>

                                            <li>
                                                <p>
                                                    巡检仪上报事件
                                                </p>
                                                <div className="blue_underline"></div>
                                                <p className="event_report"></p>
                                            </li>

                                            <li>
                                                <p>
                                                    巡检仪上报事件
                                                </p>
                                                <div className="blue_underline"></div>
                                                <p className="event_report"></p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="event_bottom_center">
                                <div className="content_box">
                                    <div className="content_title">电量变化</div>
                                    <div className="event-table">
                                        <Basicline {...chartsEleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="event_bottom_right">
                                <div className="content_box">
                                    <div className="content_title">判定条件</div>
                                    <div className="event-table">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

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

module.exports = SecondaryLoop;
