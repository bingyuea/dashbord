import BaseModel  from '../core/model.base'
/*
	巡检仪按照情况查询
*/
class XmdInstallModel extends BaseModel {
	constructor(props) {
		super(props);
		this.url = __mei_wei__.env.restfulapi + '/ele/shangcen/xmdplatform/queryInstallDetail';
	}
}
/*
	客户分布信息查询
*/
class CustomerInfoModel extends BaseModel {
	constructor(props) {
		super(props);
		this.url = __mei_wei__.env.restfulapi + '/ele/shangcen/xmdplatform/queryInfoByCustomer';
	}
}
/*
	综合倍率查询
*/
class RateModel extends BaseModel {
	constructor(props) {
		super(props);
		this.url = __mei_wei__.env.restfulapi + '/ele/shangcen/xmdplatform/queryInfoByRate';
	}
}
/*
	计量类型
*/
class MeasureModel extends BaseModel {
	constructor(props) {
		super(props);
		this.url = __mei_wei__.env.restfulapi + '/ele/shangcen/xmdplatform/queryInfoByMeasure';
	}
}
/*
	巡检仪档案信息
*/
class XmdTableListModel extends BaseModel {
	constructor(props) {
		super(props);
		this.url = __mei_wei__.env.restfulapi + '/ele/shangcen/xmdplatform/queryDataList';
	}
}


/*
	巡检仪事件统计
*/
class XmdEventModel extends BaseModel {
	constructor(props) {
		super(props);
		this.url = __mei_wei__.env.restfulapi + '/ele/shangcen/xmdplatform/queryXMDEvent';
	}
}
/*
	事件分布信息
*/
class CustomerXmdEventModel extends BaseModel {
	constructor(props) {
		super(props);
		this.url = __mei_wei__.env.restfulapi + '/ele/shangcen/xmdplatform/queryXMDEventByCustomer';
	}
}
/*
	综合速率
*/
class RateEventModel extends BaseModel {
	constructor(props) {
		super(props);
		this.url = __mei_wei__.env.restfulapi + '/ele/shangcen/xmdplatform/queryXMDEventByRate';
	}
}
/*
	计量类型
*/
class MeasureEventModel extends BaseModel {
	constructor(props) {
		super(props);
		this.url = __mei_wei__.env.restfulapi + '/ele/shangcen/xmdplatform/queryXMDEventByMeasure';
	}
}

/*
	上报事件table
*/
class XmdEventTableListModel extends BaseModel {
	constructor(props) {
		super(props);
		this.url = __mei_wei__.env.restfulapi + '/ele/shangcen/xmdplatform/queryXMDEventList';
	}
}



module.exports = {
	XmdInstallModel: XmdInstallModel,
	CustomerInfoModel: CustomerInfoModel,
	RateModel: RateModel,
	MeasureModel: MeasureModel,
	XmdTableListModel: XmdTableListModel,
	
	XmdEventModel: XmdEventModel,
	CustomerXmdEventModel: CustomerXmdEventModel,
	RateEventModel: RateEventModel,
	MeasureEventModel: MeasureEventModel,
	XmdEventTableListModel: XmdEventTableListModel,
};