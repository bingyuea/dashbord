import $ from 'jquery'


var sendReq = function(opt) {
    return $.ajax(opt);
}

class BaseModel {
    constructor(props) {
    
        this.url = '';

        this.params ={};

        this.contentType="";

        this.timeout = 15000;

        this.method = 'POST';

        this.async = true;

        this.headers = {
            "Content-Type": 'application/json'
        };

        this.notParallelism = true;

        this.validates = [];
    }

    getPrefix() {
        return (__mei_wei__ && __mei_wei__.env && __mei_wei__["env"]["restfulapi"]);
    }

    buildUrl(url) {

        if(url.indexOf('http') === 0 || url.indexOf('//') === 0) {
            return url;
        }
        return this.getPrefix() + url;
    }

    setHeader(h) {
        $.extend(this.headers, h);
    }

    getHeaders() {
        return this.headers;
    }

    /*
      设置model请求参数
      @param：参数
      @reset：是否清空原有参数
    */
    setParam(params, reset) {
        if(reset === true) {
            this.params = {};
        }

        $.extend(this.params, params);

        
    }

    getParam() {
        return this.params;
    }

    buildParam() {
        //公共参数默认传值
        const commonParam = {
            token:'234sdf234'
        }
        return $.extend(this.params,commonParam);
    }

    excute(onComplete, onError, timeout) {


        this.notParallelism && this.abort();

        onComplete = onComplete || function() {};
        onError = onError || function() {};
        var opt = {
            url: this.buildUrl(this.url),
            type: this.method,
            dataType: 'json',
            headers: this.headers,
            async:this.async,
            data: JSON.stringify(this.buildParam()),
            timeout: this.timeout,
            crossDomain: false,
            success: function (res, status, xhr) {

                if(!!res) {
                    onComplete(res, status, xhr);
                } else {
                    onError(res);
                }
            },
            error: function (err, status) {

                onError(err, status)
            }
        };

        if (opt.url.indexOf(window.location.host) === -1 || opt.url.indexOf(window.location.protocol) === -1) {
            opt.crossDomain = true;
        }

        this.ajaxRequest = sendReq(opt);
    }

    abort() {

        if (this.ajaxRequest && this.ajaxRequest.abort) {
            this.ajaxRequest.abort();
        }

    }
}


BaseModel.getInstance = function() {

    if(!this.instance || !(this.instance instanceof this)) {
        this.instance = new this();
    }

    return this.instance;
}

module.exports = BaseModel;