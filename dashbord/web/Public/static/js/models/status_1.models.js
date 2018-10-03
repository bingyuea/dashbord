import BaseModel from '../core/model.base'
/*
	二次回路状态值排名前十数据获取
*/
class GetTopTenOfSecondLoopException extends BaseModel {
  constructor(props) {
    super(props)
    this.url =
      __mei_wei__.env.restfulapi +
      '/ele/shangcen/xmdplatform/getTopTenOfSecondLoopExceptionTop'
  }
}

// 区域二次回路状态评估
class GetTopTenOfSecondLoopException extends BaseModel {
  constructor(props) {
    super(props)
    this.url =
      __mei_wei__.env.restfulapi +
      '/ele/shangcen/xmdplatform/getTopTenOfSecondLoopException'
  }
}
module.exports = {
  GetTopTenOfSecondLoopException
}
