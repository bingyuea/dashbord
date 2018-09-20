import '../node_modules/antd/dist/antd.min.css';
import '../less/private.less';

import BaseApp from './core/app.base'

class App extends BaseApp {
    constructor(props) {

        super(props);

        this.config = {
            routes: [
                {
                    path: __mei_wei__.env.basepath + '/dashboard',
                    getComponents(nextState, cb) {
                        require.ensure([], (require) => {
                            var page = require('./views/dashboard.js');
                            cb(null, page)
                        }, 'views/dashboard')
                    },
                }
            ],
            
            rooter: 'appview',
            routerType: "browser"
        }

    }
}


/**
 * 增加一个图片资源路径，解决img 中引用图片的资源图片的问题
 * */
__mei_wei__ && __mei_wei__["env"] && (function(){

    var env=__mei_wei__["env"];

    if(env.environment.toLowerCase() == "dev") {
        env["imgPath"] = location.origin + "/public/static/img/";
    }

})();

var app = new App();

app.start();
