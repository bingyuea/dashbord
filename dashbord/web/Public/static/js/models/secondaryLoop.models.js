import BaseModel  from '../core/model.base'

/*
 *  二次回路单-异常分析1
 */
// 异常事件总数查询
class QueryExceptionCount extends BaseModel {
    constructor(props) {
        super(props);
        this.url = __mei_wei__.env.restfulapi + '/shangcen/xmdplatform/queryExceptionCount';
    }
}
// 异常区域占比查询
class QueryExceptionByArea extends BaseModel {
    constructor(props) {
        super(props);
        this.url = __mei_wei__.env.restfulapi + '/shangcen/xmdplatform/queryExceptionByArea';
    }
}
// 异常事件数量变化趋势
class QueryExceptionByTime extends BaseModel {
    constructor(props) {
        super(props);
        this.url = __mei_wei__.env.restfulapi + '/shangcen/xmdplatform/queryExceptionByTime';
    }
}
// 行业分布信息查询
class QueryExceptionByTrade extends BaseModel {
    constructor(props) {
        super(props);
        this.url = __mei_wei__.env.restfulapi + '/shangcen/xmdplatform/queryExceptionByTrade';
    }
}
// 异常类型分布情况查询
class QueryExceptionDetail extends BaseModel {
    constructor(props) {
        super(props);
        this.url = __mei_wei__.env.restfulapi + '/shangcen/xmdplatform/queryExceptionDetail';
    }
}
// 异常信息表查询
class QueryExceptionList extends BaseModel {
    constructor(props) {
        super(props);
        this.url = __mei_wei__.env.restfulapi + '/shangcen/xmdplatform/queryExceptionList';
    }
}
// 二次回路单-异常分析2
// 电流分析对比查询
class QueryElecCurrentData extends BaseModel {
    constructor(props) {
        super(props);
        this.url = __mei_wei__.env.restfulapi + '/shangcen/xmdplatform/queryElecCurrentData';
    }
}
// 巡检仪上报事件查询
class QueryXMDEvent extends BaseModel {
    constructor(props) {
        super(props);
        this.url = __mei_wei__.env.restfulapi + '/shangcen/xmdplatform/queryXMDEvent';
    }
}

module.exports = {
    /*
     *  二次回路单-异常分析1
     */
    // 异常事件总数查询
    QueryExceptionCount,
    // 异常区域占比查询
    QueryExceptionByArea,
    // 异常事件数量变化趋势
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
    // 巡检仪上报事件查询
    QueryXMDEvent,
};