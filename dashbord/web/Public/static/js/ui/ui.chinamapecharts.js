import React from 'react';
import { DEFAULT_COLOR, DARK_DEFAULT_COLOR } from '../data/color'
import $ from 'jquery'
import echarts from '../util/util.echartsmap';
import{
    cityMap
} from '../data/map-data';

//Echart地图下钻
class ChinaMapEcharts extends React.Component {


  showMap(){
    const self = this;
    const mapData = this.props.mapData;
    const provinceName = this.props.provinceName || '中国';
    echarts.registerMap(provinceName, cityMap[provinceName]);
    
    if(!mapData){return false}
    var myChart = echarts.extendsMap(this.props.domId || 'mapContent', {
        bgColor: 'rgba(0,0,0,0)', // 画布背景色
        mapName: provinceName, // 地图名
        text:'',
        hideMapName:self.props.hideMapName,
        goDown: self.props.goDown || false, // 是否下钻
        // 下钻回调
        callback: function(name, option, instance) {
            //console.log(name, option, instance);
            self.props.goDownCallBack && self.props.goDownCallBack(name, option, instance);
        },
        clickCB:function(params){
            self.props.provinceClick && self.props.provinceClick(params);
        },
        //

        // 数据展示      
        /*
            {
                city:'',  b
                name:''
            }
        */

        // data: [
        //         {city:'内蒙古',name: "内蒙古",value: 2*30,crew:'2*30',company:"磴口金牛煤电",position:'内蒙古自治区巴彦淖尔市磴口县',region:'北方大区'},
        //         {city:'河南',name: "河南",value: 2*30,crew:'2*30',company:"河南华润电力古城有限公司",position:'河南驻马店市驿城区古城乡',region:'中西大区'},
        //         {city:'西藏',name: "西藏",value: 2*30,crew:'2*30',company:"河南华润电力古城有限公司",position:'河南驻马店市驿城区古城乡',region:'中西大区'}
        //     ]
        data:mapData
    });
  }

  mapNameClick(name){
    this.props.mapNameClick && this.props.mapNameClick(name);
  }

  render() {
    const cls = this.props.hideMapName?'map-btn':'hide';
    return (
        <div className='map-box'>
            <div className={cls}>
                <span className='map-name' onClick={this.mapNameClick.bind(this,'中国')}>中国</span>
                {this.props.provinceName !== '中国'?<span className='map-name' onClick={this.mapNameClick.bind(this,this.props.provinceName)}>{this.props.provinceName}</span>:''}
            </div>
            <div id={this.props.domId || 'mapContent'} style={{height:'100%'}}>{this.showMap()}</div>
        </div>
    )
  }
}

export default ChinaMapEcharts
