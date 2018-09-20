import React, {Component} from 'react'
import { render } from 'react-dom'

class BaseView extends Component {

    constructor(props) {

        super(props);

    }

     /*
     * 参数
     * @content             loading文字
     * @forceWebloading     使用web ui loading 
     * 
     */
    showLoading(opts) {
        opts = opts || {};
        if (Util.isInApp && !opts.forceWebloading) {
            Bridge.jsCallNative('ui', 'show_loading');
        } else {
            this.__ui_loading = this.loading;
            this.loading.show(opts.content);
        }
    }

    hideLoading() {
        var isWebloading = !!this.__ui_loading;
        this.__ui_loading = null;
        if (Util.isInApp && !isWebloading) {
            Bridge.jsCallNative('ui', 'hide_loading');            
        } else {
            this.loading.hide();
        }
    }

    showToast(content, hidetime) {

        this.toast.show(content, hidetime);

    }

    renderMain() {

        return ('');

    }

    render() {

        return (
            <div id="g_body" ref={(viewContainer) => {this.viewContainer = viewContainer}}>
                {this.renderMain()}
            </div>
        );
    }
}

BaseView.contextTypes = {
    router: React.PropTypes.object.isRequired
};

module.exports = BaseView;