import $ from 'jquery'
import React, {Component} from 'react'
import { render } from 'react-dom'
import { Router, hashHistory, Link, useRouterHistory, browserHistory } from 'react-router'
import { createHashHistory } from 'history'

// 暴露window对象下公公对象
var __exports___ = {
    env: {},
    appHistory: {}
}

function _init() {

    var $meta = $("meta[conf]");
    $meta.each(function(idx, item) {
        var $item = $(item);

        __exports___.env[$item.attr("name")] = $item.attr("content");

    })

    if(typeof window !== 'undefined') {//全局变量
        window.__mei_wei__ = __exports___;
    }
}

_init();

// web app class
class BaseApp {
    constructor(props) {
        this.config ={
            routes: [],
            rooter: "",
            routerType: "browser"
        }
    }

    init() {
        console.log('base app init...')

        // set app history

        __exports___.appHistory.routerType = this.config.routerType;
        __exports___.appHistory.reactHistory = this.config.routerType == "browser" ? browserHistory :
            useRouterHistory(createHashHistory)({ queryKey: false });

    }

    start(callback) {

        this.init();

        this._webappStart(callback);

    }

    _webappStart(callback) {

        // 检查，是否需要强制登录

        this._startLoadPage(callback);

    }

    _startLoadPage(callback) {
        render(<Router routes={this.config.routes} history={__exports___.appHistory.reactHistory} />,
            document.getElementById('appview'));

        if(typeof callback == 'function') { callback(); }

    }

}

module.exports = BaseApp;
