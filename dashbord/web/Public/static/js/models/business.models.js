import BaseModel  from '../core/model.base'
/*
	省份城市信息
*/
class CityListModel extends BaseModel {
	constructor(props) {
		super(props);
		this.url = __mei_wei__.env.restfulapi + '/ele/shangcen/xmdplatform/getListOfCity';
	}
}

/*
	计量类型
*/
class MeasureListModel extends BaseModel {
	constructor(props) {
		super(props);
		this.url = __mei_wei__.env.restfulapi + '/ele/shangcen/xmdplatform/getListOfMeasure';
	}
}

/*
	行业类型
*/
class TradeListModel extends BaseModel {
	constructor(props) {
		super(props);
		this.url = __mei_wei__.env.restfulapi + '/ele/shangcen/xmdplatform/getListOfTrade';
	}
}
/*
	异常类型
*/
class UnusalListModel extends BaseModel {
	constructor(props) {
		super(props);
		this.url = __mei_wei__.env.restfulapi + '/ele/shangcen/xmdplatform/getExceptionType';
	}
}
/*
	异常类型
*/
class ThemeListModel extends BaseModel {
	constructor(props) {
		super(props);
		this.url = __mei_wei__.env.restfulapi + '/ele/shangcen/xmdplatform/getSubjectType';
	}
}


module.exports = {
	CityListModel: CityListModel,
	MeasureListModel: MeasureListModel,
	TradeListModel: TradeListModel,
	UnusalListModel: UnusalListModel,
	ThemeListModel: ThemeListModel,

};