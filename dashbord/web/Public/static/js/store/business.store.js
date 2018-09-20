import BaseStore from './store.base'


//登陆用户信息
class UserInfoStore extends BaseStore {

	constructor(props) {
		super(props);

		// 缓存数据标志
		this.key = '__wukong_user_info__';

		// 缓存时间,支持单位 天-"D", 时-"H", 分钟-"M"
		// 如 "30D", "0.5H"
		this.lifetime = '7D';
	}

}

// 用户auth信息
class HttpAuthInfoStore extends BaseStore {

	constructor(props) {
		super(props);

		// 缓存数据标志
		this.key = '__wukong_http_auth__';

		// 缓存时间,支持单位 天-"D", 时-"H", 分钟-"M"
		// 如 "30D", "0.5H"
		this.lifetime = '2H';
	}

}
// 用户auth信息
class PluginInfoStore extends BaseStore {

	constructor(props) {
		super(props);

		// 缓存数据标志
		this.key = '__wukong_plugin_info__';

		// 缓存时间,支持单位 天-"D", 时-"H", 分钟-"M"
		// 如 "30D", "0.5H"
		this.lifetime = '7D';
	}

}



module.exports = {
	UserInfoStore: UserInfoStore,
	HttpAuthInfoStore: HttpAuthInfoStore,
	PluginInfoStore:PluginInfoStore
};