import React from 'react';
import { DEFAULT_COLOR, DARK_DEFAULT_COLOR } from '../data/color'
import $ from 'jquery'
import echarts from '../util/util.echartsmap';
import cityMap from '../data/map-data';

//基础折线图
class ChinaMapEcharts extends React.Component {


  showMap(){
    echarts.registerMap('中国', cityMap['中国']);
    var myChart = echarts.extendsMap('mapContent', {
        bgColor: 'rgba(0,0,0,0)', // 画布背景色
        mapName: '中国', // 地图名
        text:'',
        goDown: true, // 是否下钻
        // 下钻回调
        callback: function(name, option, instance) {
            //console.log(name, option, instance);
        },
        // 数据展示             
        data: [{city:'内蒙古',name: "磴口",value: 2*30,crew:'2*30',company:"磴口金牛煤电",position:'内蒙古自治区巴彦淖尔市磴口县',region:'北方大区'},
                {city:'辽宁',name: "沈海",value: 3*20,crew:'3*20',company:"沈阳沈海热电",position:'辽宁省沈阳市大东区',region:'东北大区'},
                {city:'辽宁',name: "盘锦",value: 2*35,crew:'2*35',company:"华润电力盘锦",position:'辽宁省盘锦市大洼区后胡嘴子',region:'东北大区'},
                {city:'浙江',name: "温州苍南",value: 2*100,crew:'2*100',company:"华润电力(温州)有限公司",position:'浙江省温州市苍南县龙港镇',region:'东南大区'},
                {city:'河北',name: "沧州",value: 2*33,crew:'2*33',company:"沧州华润热电",position:'河北省沧州市运河区北环西路',region:'华北大区'},
                {city:'河北',name: "曹妃甸",value: 2*30,crew:'2*30',company:"唐山曹妃甸",position:'河北省唐山市曹妃甸工业区',region:'华北大区'},
                {city:'河北',name: "唐山丰润",value: 2*35,crew:'2*35',company:"华润电力唐山丰润",position:'河北省唐山市路北区韩城镇',region:'华北大区'},
                {city:'河北',name: "渤海新区",value: 2*35,crew:'2*35',company:"渤海华润电力",position:'河北省沧州市临港经济技术开发区',region:'华北大区'},
                {city:'山东',name: "菏泽",value: 2*60,crew:'2*60',company:"华润热电（菏泽）有限公司",position:'山东省菏泽市东明县武胜桥镇',region:'华东大区'},
                {city:'安徽',name: "阜阳",value: 2*64,crew:'2*64',company:"阜阳华润电力有限公司",position:'安徽省阜阳市颍泉区',region:'华东大区'},
                {city:'广东',name: "海丰",value: 2*100,crew:'2*100',company:"华润电力(海丰)有限公司",position:'广东省汕尾市海丰县小漠镇',region:'华南大区'},
                {city:'广西',name: "贺州",value: 2*100,crew:'2*100',company:"华润电力(贺州)有限公司",position:'广西贺州市贺州大道',region:'华南大区'},
                {city:'湖南',name: "鲤鱼江A",value: 2*30,crew:'2*30',company:"华润电力湖南有限公司",position:'湖南省资兴市鲤鱼江镇',region:'华南大区'},
                {city:'湖南',name: "鲤鱼江B",value: 2*65,crew:'2*65',company:"湖南华润电力鲤鱼江有限公司",position:'湖南省资兴市鲤鱼江镇',region:'华南大区'},
                {city:'广东',name: "广州热电",value: 2*30,crew:'2*30',company:"广州华润热电有限公司",position:'广州市南沙区黄阁镇',region:'华南大区'},
                {city:'湖北',name: "湖北一期",value: 2*30,crew:'2*30',company:"华润电力湖北有限公司",position:'湖北省赤壁市陆水大道99号',region:'华中大区'},
                {city:'湖北',name: "湖北二期",value: 2*100,crew:'2*100',company:"华润电力湖北有限公司二期",position:'湖北省赤壁市陆水大道99号',region:'华中大区'},
                {city:'湖南',name: "涟源",value: 2*30,crew:'2*30',company:"华润电力(涟源)有限公司",position:'湖南省娄底市涟源市',region:'华中大区'},
                {city:'湖北',name: "宜昌",value: 2*35,crew:'2*35',company:"华润电力(宜昌)有限公司",position:'湖北省宜昌市猇亭区',region:'华中大区'},
                {city:'江苏',name: "徐州一、二期",value: 4*32,crew:'4*32',company:"徐州华润电力有限公司",position:'江苏省徐州市华润路1号',region:'江苏大区'},
                {city:'江苏',name: "南京热电",value: 2*60,crew:'2*60',company:"江苏南热发电有限责任公司",position:'江苏省南京市六合区',region:'江苏大区'},
                {city:'江苏',name: "宜兴",value: 2*15,crew:'2*6',company:"宜兴华润热电有限公司",position:'江苏省无锡市宜兴市环保科技工业园',region:'江苏大区'},
                {city:'江苏',name: "镇江",value: 2*63+2*13.5,crew:'2*63+2*13.5',company:"江苏镇江发电有限公司",position:'江苏省镇江市丹徒区高资镇',region:'江苏大区'},
                {city:'湖北',name: "华鑫",value: 2*33,crew:'2*33',company:"徐州华鑫发电有限公司",position:'徐州市铜山区茅村工业园',region:'江苏大区'},
                {city:'江苏',name: "常熟",value: 2*65,crew:'2*65',company:"华润电力(常熟)有限公司",position:'江苏省常熟市珠江东路',region:'江苏大区'},
                {city:'江苏',name: "化工园一、二期",value: 2*5.5+2*30,crew:'2*5.5+2*30',company:"南京化学工业园热电有限公司",position:'南京市雨花经济开发区',region:'江苏大区'},
                {city:'江苏',name: "南京板桥",value: 2*33,crew:'2*33',company:"南京华润热电有限公司",position:'江苏省徐州市铜山区',region:'江苏大区'},
                {city:'江苏',name: "徐州三期",value: 2*100,crew:'2*100',company:"铜山华润电力有限公司",position:'江苏省徐州市铜山区',region:'江苏大区'},
                {city:'贵州',name: "六枝",value: 2*66,crew:'2*66',company:"六枝华润电力",position:'贵州省六盘水市六枝特区岩脚镇',region:'西南大区'},
                {city:'河南',name: "首阳山",value: 2*60,crew:'2*60',company:"河南华润电力首阳山有限公司",position:'河南省偃师市首阳山镇',region:'中西大区'},
                {city:'河南',name: "焦作",value: 2*66,crew:'2*66',company:"华润电力焦作有限公司",position:'河南省焦作市博爱县柏山镇',region:'中西大区'},
                {city:'河南',name: "登封一、二期",value: 2*32+2*60,crew:'2*32+2*60',company:"华润电力登封有限公司",position:'河南省登封市东刘碑村',region:'中西大区'},
                {city:'河南',name: "洛阳",value: 2*15,crew:'2*5',company:"洛阳华润环保能源有限公司",position:'河南省偃师市城关工业区',region:'中西大区'},
                {city:'河南',name: "古城",value: 2*30,crew:'2*30',company:"河南华润电力古城有限公司",position:'河南驻马店市驿城区古城乡',region:'中西大区'}]
    });
  }

  render() {
    
    return (
      <div id='mapContent' style={{height:'100%'}}>{this.showMap()}</div>
    )
  }
}

export default ChinaMapEcharts
