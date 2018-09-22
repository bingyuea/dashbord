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
module.exports = {
    /*
     *  二次回路单-异常分析1
     */
    // 异常事件总数查询
    QueryExceptionCount,
    // 异常区域占比查询
    QueryExceptionByArea,
};