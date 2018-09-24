import BaseModel  from '../core/model.base'
/*
	不同省份安装情况
*/
class ProvinceCountModel extends BaseModel {
	constructor(props) {
		super(props);
		this.url = __mei_wei__.env.restfulapi + '/shangcen/xmdplatform/getInstallCountOfProvince';
	}
}

/*
	安装时间安装情况
*/
class YearCountModel extends BaseModel {
	constructor(props) {
		super(props);
		this.url = __mei_wei__.env.restfulapi + '/shangcen/xmdplatform/getInstallCountOfYear';
	}
}
/*
	3)	计量类型统计
*/
class MeasureCountModel extends BaseModel {
	constructor(props) {
		super(props);
		this.url = __mei_wei__.env.restfulapi + '/shangcen/xmdplatform/getInstallCountOfMeasure';
	}
}

/*
	3)	综合倍率统计
*/
class RateCountModel extends BaseModel {
	constructor(props) {
		super(props);
		this.url = __mei_wei__.env.restfulapi + '/shangcen/xmdplatform/getInstallCountOfRate';
	}
}

/*
	5)	行业类型统计
*/
class TradeCountModel extends BaseModel {
	constructor(props) {
		super(props);
		this.url = __mei_wei__.env.restfulapi + '/shangcen/xmdplatform/getInstallCountOfTrade';
	}
}

/*
	事件统计情况
*/
class EventCountModel extends BaseModel {
	constructor(props) {
		super(props);
		this.url = __mei_wei__.env.restfulapi + '/shangcen/xmdplatform/getCountOfEvent';
	}
}

/*
	2)	有效性事件统计
*/
class ValidityEventCountModel extends BaseModel {
	constructor(props) {
		super(props);
		this.url = __mei_wei__.env.restfulapi + '/shangcen/xmdplatform/getCountOfValidityEvent';
	}
}

/*
	3)	不同省份上报情况
*/
class ProvinceEventCountModel extends BaseModel {
	constructor(props) {
		super(props);
		this.url = __mei_wei__.env.restfulapi + '/shangcen/xmdplatform/getEventCountOfProvince';
	}
}
/*
	4)	行业类别事件统计
*/
class TradeEventCountModel extends BaseModel {
	constructor(props) {
		super(props);
		this.url = __mei_wei__.env.restfulapi + '/shangcen/xmdplatform/getEventCountOfTrade';
	}
}





module.exports = {
	ProvinceCountModel: ProvinceCountModel,
	YearCountModel: YearCountModel,
	RateCountModel: RateCountModel,
	MeasureCountModel: MeasureCountModel,
	TradeCountModel: TradeCountModel,
	EventCountModel: EventCountModel,
	ValidityEventCountModel: ValidityEventCountModel,
	ProvinceEventCountModel: ProvinceEventCountModel,
	TradeEventCountModel: TradeEventCountModel,
};