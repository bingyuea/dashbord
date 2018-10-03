import BaseModel from '../core/model.base'

/*
 *  二次回路异常主题分析
 */
//异常数据统计
class QueryElecCurrentData extends BaseModel {
  constructor(props) {
    super(props)
    this.url =
      __mei_wei__.env.restfulapi +
      '/ele/shangcen/xmdplatform/queryElecCurrentDataRange'
  }
}
//二次回路异常事件查询
class QuerySecondLoopExceptionCount extends BaseModel {
  constructor(props) {
    super(props)
    this.url =
      __mei_wei__.env.restfulapi +
      '/ele/shangcen/xmdplatform/querySecondLoopExceptionCount'
  }
}
module.exports = {
  /*
     *  二次回路异常主题分析
     */
  //异常数据统计
  QueryElecCurrentData,
  //二次回路异常事件查询
  QuerySecondLoopExceptionCount
}
