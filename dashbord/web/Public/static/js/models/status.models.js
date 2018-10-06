import BaseModel from '../core/model.base'

//	二次回路状态值排名前十数据获取 page-8
class GetTopTenOfSecondLoopExceptionTop extends BaseModel {
  constructor(props) {
    super(props)
    this.url =
      __mei_wei__.env.restfulapi +
      '/ele/shangcen/xmdplatform/getTopTenOfSecondLoopExceptionTop'
  }
}

// 区域二次回路状态评估 page-8
class GetTopTenOfSecondLoopException extends BaseModel {
  constructor(props) {
    super(props)
    this.url =
      __mei_wei__.env.restfulapi +
      '/ele/shangcen/xmdplatform/getTopTenOfSecondLoopException'
  }
}

// 二次回路详情查询  page-9
class QuerySecondLoopExceptionDetailData extends BaseModel {
  constructor(props) {
    super(props)
    this.url =
      __mei_wei__.env.restfulapi +
      '/ele/shangcen/xmdplatform/queryDetailOfSecondLoopException'
  }
}

module.exports = {
  GetTopTenOfSecondLoopExceptionTop,
  GetTopTenOfSecondLoopException,
  QuerySecondLoopExceptionDetailData
}
