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

/*
 *  page-7
 */
// 异常事件总数查询
class QueryExceptionCount extends BaseModel {
  constructor(props) {
    super(props)
    this.url =
      __mei_wei__.env.restfulapi +
      '/ele/shangcen/xmdplatform/queryExceptionCount'
  }
}
// 异常事件数量变化趋势
class QueryExceptionByTime extends BaseModel {
  constructor(props) {
    super(props)
    this.url =
      __mei_wei__.env.restfulapi +
      '/ele/shangcen/xmdplatform/queryExceptionByTime'
  }
}

// 主题类型查询
class GetSubjectType extends BaseModel {
  constructor(props) {
    super(props)
    this.url =
      __mei_wei__.env.restfulapi + '/ele/shangcen/xmdplatform/getSubjectType'
  }
}

// 二次回路异常事件查询
class QuerySecondLoopExceptionCount extends BaseModel {
  constructor(props) {
    super(props)
    this.url =
      __mei_wei__.env.restfulapi +
      '/ele/shangcen/xmdplatform/querySecondLoopExceptionCount'
  }
}
module.exports = {
  //异常数据统计
  QueryElecCurrentData,
  //二次回路异常事件查询
  QuerySecondLoopExceptionCount,

  /*
     *  二次回路单-异常分析1
     */
  // 异常事件总数查询
  QueryExceptionCount,
  // 异常事件数量变化趋势
  QueryExceptionByTime,
  // 主题类型查询
  GetSubjectType,
  // 二次回路异常事件查询
  QuerySecondLoopExceptionCount
}
