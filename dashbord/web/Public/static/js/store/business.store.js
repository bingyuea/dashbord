import BaseStore from './store.base'



class PageNineStore extends BaseStore {

	constructor(props) {
		super(props);

		// 缓存数据标志
		this.key = '__dashboard__pagenine__';

		// 缓存时间,支持单位 天-"D", 时-"H", 分钟-"M"
		// 如 "30D", "0.5H"
		this.lifetime = '7D';

		this.storage = sessionStorage; 
	}

}

module.exports = {
	PageNineStore: PageNineStore
};