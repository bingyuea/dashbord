var echarts = require('echarts');
import{
  cityMap,
  geoCoordMapofProvince
} from '../data/map-data';
import $ from 'jquery'
echarts.extendsMap = function(id, opt) {
  // 实例
  const dom = document.getElementById(id);
  if(!dom){return ''};
  var chart = this.init(dom);
  var curGeoJson = {};
  
  var geoCoordMap = geoCoordMapofProvince;
  
  var levelColorMap = {
      '1': 'rgba(241, 109, 115, .8)',
      '2': 'rgba(255, 235, 59, .7)',
      '3': 'rgba(147, 235, 248, 1)'
  };

  var defaultOpt = {
      mapName: 'china', // 地图展示
      goDown: false, // 是否下钻
      bgColor: '#404a59', // 画布背景色
      activeArea: [], // 区域高亮,同echarts配置项
      data: [],
      // 下钻回调(点击的地图名、实例对象option、实例对象)
      callback: function(name, option, instance) {},
      clickCB:function(params){}
  };
  if (opt) opt = this.util.extend(defaultOpt, opt);

  // 层级索引
  var name = [opt.mapName];
  var idx = 0;
  var pos = {
      leftPlus: 50,
      leftCur: 0,
      left: 0,
      top: 50
  };

  var line = [
      [0, 0],
      [8, 11],
      [0, 22]
  ];
  // style
  var style = {
      font: '12px "Microsoft YaHei", sans-serif',
      textColor: '#eee',
      lineTopColor: 'rgba(0,0,0,0)',
      lineBottomColor:'#21eeff'
  };

  var handleEvents = {
      /**
       * i 实例对象
       * o option
       * n 地图名
       **/
      resetOption: function(i, o, n) {
          var breadcrumb = this.createBreadcrumb(n);
          if(o.graphic){
            var j = name.indexOf(n);
            var l = o.graphic.length;
            if (j < 0) {
                o.graphic.push(breadcrumb);
                o.graphic[0].children[0].shape.x2 = 145;
                o.graphic[0].children[1].shape.x2 = 145;
                if (o.graphic.length > 2) {
                    var cityData = [];
                    var cityJson;
                    for (var x = 0; x < opt.data.length; x++) {
                        if(n === opt.data[x].city){
                            $([opt.data[x]]).each(function(index,data){
                                cityJson = {city:data.city,name:data.name,value:data.value}
                                cityData.push(cityJson)
                            }) 
                        }
                    }
                    
                    if(cityData!=null){
                        o.series[0].data = handleEvents.initSeriesData(cityData);
                    }else{
                        o.series[0].data = [];
                    }
                }
                name.push(n);
                idx++;
            } else {
                o.graphic.splice(j + 2, l);
                if (o.graphic.length <= 2) {
                    o.graphic[0].children[0].shape.x2 = 60;
                    o.graphic[0].children[1].shape.x2 = 60;
                    o.series[0].data = handleEvents.initSeriesData(opt.data);
                };
                name.splice(j + 1, l);
                idx = j;
                
                pos.leftCur -= pos.leftPlus * (l - j - 1);
            };
          }

          o.geo.map = n;
          o.geo.zoom = 0.4;
          i.clear();
          i.setOption(o);
          this.zoomAnimation();
          opt.callback(n, o, i);
      },

      /**
       * name 地图名
       **/
      createBreadcrumb: function(name) {
          var cityToPinyin = {
              '中国': 'zhongguo',
              '上海': 'shanghai',
              '河北': 'hebei',
              '山西': 'shangxi',
              '内蒙古': 'neimenggu',
              '辽宁': 'liaoning',
              '吉林': 'jilin',
              '黑龙江': 'heilongjiang',
              '江苏': 'jiangsu',
              '浙江': 'zhejiang',
              '安徽': 'anhui',
              '福建': 'fujian',
              '江西': 'jiangxi',
              '山东': 'shangdong',
              '河南': 'henan',
              '湖北': 'hubei',
              '湖南': 'hunan',
              '广东': 'guangdong',
              '广西': 'guangxi',
              '海南': 'hainan',
              '四川': 'sichuan',
              '贵州': 'guizhou',
              '云南': 'yunnan',
              '西藏': 'xizang',
              '陕西': 'shanxi',
              '甘肃': 'gansu',
              '青海': 'qinghai',
              '宁夏': 'ningxia',
              '新疆': 'xinjiang',
              '北京': 'beijing',
              '天津': 'tianjin',
              '重庆': 'chongqing',
              '香港': 'xianggang',
              '澳门': 'aomen'
          };
          var breadcrumb = {
              type: 'group',
              id: name,
              left: pos.leftCur + pos.leftPlus,
              top: pos.top + 3,
              children: [
              //箭头
              // {
              //     type: 'polyline',
              //     left: -90,
              //     top: -30,
              //     shape: {
              //         points: line
              //     },
              //     style: {
              //         stroke: '#f00',
              //         key: name
              //         // lineWidth: 2,
              //     },
              //     onclick: function() {
              //         var name = this.style.key;
              //         handleEvents.resetOption(chart, option, name);
              //     }
              // },
               {
                  type: 'text',
                  left: -68,
                  top: 'middle',
                  style: {
                      text: name,
                      textAlign: 'center',
                      fill: style.textColor,
                      font: style.font
                  },
                  onclick: function() {
                      var name = this.style.text;
                      handleEvents.resetOption(chart, option, name);
                  }
              }, {
                  type: 'text',
                  left: -68,
                  top: 10,
                  style: {

                      name: name,
                      // text: cityToPinyin[name] ? cityToPinyin[name].toUpperCase() : '',地图英文名
                      textAlign: 'center',
                      fill: style.textColor,
                      font: '12px "Microsoft YaHei", sans-serif',
                  },
                  onclick: function() {
                      // console.log(this.style);
                      var name = this.style.name;
                      handleEvents.resetOption(chart, option, name);
                  }
              }]
          }

          pos.leftCur += pos.leftPlus;

          return breadcrumb;
      },

     // 设置effectscatter
      initSeriesData: function(data) {
          var temp = [];
          for (var i = 0; i < data.length; i++) {
              var geoCoord = geoCoordMap[data[i].name];
              if (geoCoord) {

                  temp.push({
                      name: data[i].name,
                      value: geoCoord.concat(data[i].value),
                      userValue: data[i].userValue,
                  });
              }
          };
          return temp;
      },
      zoomAnimation: function() {
          var count = null;
          var zoom = function(per) {
              if (!count) count = per;
              count = count + per;
              // console.log(per,count);
              chart.setOption({
                  geo: {
                      zoom: count
                  }
              });
              if (count < 1) window.requestAnimationFrame(function() {
                  zoom(0.2);
              });
          };
          window.requestAnimationFrame(function() {
              zoom(0.2);
          });
      }
  };

  var option = {
      backgroundColor: opt.bgColor,
      tooltip: {
        show: true,
        trigger:'item',
        alwaysShowContent:false,
        backgroundColor:'rgba(50,50,50,0.7)',
        hideDelay:100,
        triggerOn:'mousemove',
        enterable:true,
        position:['60%','70%'],
        formatter:function(params, ticket, callback){
            var txt = params.data.userValue?' : '+params.data.userValue:'';
            return params.data.name+txt
        }
      },
      geo: {
          map: opt.mapName,
          roam: true,
          zoom: 1,
          label: {
              normal: {
                  show: true,
                  textStyle: {
                      color: '#fff'
                  }
              },
              emphasis: {
                  textStyle: {
                      color: '#fff'
                  }
              }
          },
          itemStyle: {
              normal: {
                  borderColor: 'rgba(147, 235, 248, 1)',
                  borderWidth: 1,
                  areaColor: {
                      type: 'radial',
                      x: 0.5,
                      y: 0.5,
                      r: 0.8,
                      colorStops: [{// #110b52#344580
                          offset: 0,
                          // color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                          color: '#110b52' // 0% 处的颜色
                      }, {
                          offset: 1,
                          // color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                          color: '#344580' // 100% 处的颜色
                      }],
                      globalCoord: false // 缺省为 false
                  },
                  shadowColor: 'rgba(128, 217, 248, 1)',
                  // shadowColor: 'rgba(255, 255, 255, 1)',
                  shadowOffsetX: -2,
                  shadowOffsetY: 2,
                  shadowBlur: 10
              },
              emphasis: {
                  areaColor: '#21eeff',
                  borderWidth: 0
              }
          },
          regions: opt.activeArea.map(function(item) {
              if (typeof item !== 'string') {
                  return {
                      name: item.name,
                      itemStyle: {
                          normal: {
                              areaColor: item.areaColor || '#389BB7'
                          }
                      },
                      label: {
                          normal: {
                              show: item.showLabel,
                              textStyle: {
                                  color: '#fff'
                              }
                          }
                      }
                  }
              } else {
                  return {
                      name: item,
                      itemStyle: {
                          normal: {
                              borderColor: '#91e6ff',
                              areaColor: '#389BB7'
                          }
                      }
                  }
              }
          })
      },
      series: [{
          type: 'effectScatter',
          coordinateSystem: 'geo',
          showEffectOn: 'render',
          rippleEffect: {
              period:8,
              scale: 4,
              brushType: 'fill'
          },
          hoverAnimation: true,
          itemStyle: {
              normal: {
                  color: '#FFC848',
                  shadowBlur: 10,
                  shadowColor: '#333'
              }
          },
          data: handleEvents.initSeriesData(opt.data)
      }]
  };

  if(!opt.hideMapName){
    option.graphic = [{
          type: 'group',
          left: pos.left,
          top: pos.top - 4,
          children: [{
              type: 'line',
              left: 0,
              top: -20,
              shape: {
                  x1: 0,
                  y1: 0,
                  x2: 60,
                  y2: 0
              },
              style: {
                  stroke: style.lineTopColor,
              }
          }, {
              type: 'line',
              left: 0,
              top: 10,
              shape: {
                  x1: 0,
                  y1: 0,
                  x2: 60,
                  y2: 0
              },
              style: {
                  stroke: style.lineBottomColor,
              }
          }]
      }, 
      {
          id: name[idx],
          type: 'group',
          left: pos.left + 2,
          top: pos.top,
          children: [{
              type: 'polyline',
              left: 90,
              top: -12,
              shape: {
                  points: line
              },
              style: {
                  stroke: 'transparent',
                  key: name[0]
              },
              onclick: function() {
                  var name = this.style.key;
                  handleEvents.resetOption(chart, option, name);
              }
          }, {
              type: 'text',
              left: 0,
              top: 'middle',
              style: {
                  text: '中国',
                  textAlign: 'center',
                  fill: style.textColor,
                  font: style.font
              },
              onclick: function() {
                  handleEvents.resetOption(chart, option, '中国');
              }
          }, {
              type: 'text',
              left: 0,
              top: 10,
              style: {
                  // text: 'China',
                  textAlign: 'center',
                  fill: style.textColor,
                  font: '12px "Microsoft YaHei", sans-serif',
              },
              onclick: function() {
                  handleEvents.resetOption(chart, option, '中国');
              }
          }]
    }];
  }

  chart.setOption(option);
  // 添加事件
  chart.on('click', function(params) {
      var _self = this;
      if (opt.goDown && params.name !== name[idx]) {
          if (cityMap[params.name]) {
              curGeoJson = cityMap[params.name];
              echarts.registerMap(params.name, cityMap[params.name]);
              handleEvents.resetOption(_self, option, params.name);
          }
      }else{
        opt.clickCB(params);
      }
  });

  chart.setMap = function(mapName) {
      var _self = this;
      if (mapName.indexOf('市') < 0) mapName = mapName + '市';
      var citySource = cityMap[mapName];
      if (citySource) {
          curGeoJson = citySource;
          echarts.registerMap(mapName, citySource);
          handleEvents.resetOption(_self, option, mapName);
      }
      
  };

  return chart;
};

module.exports = echarts;