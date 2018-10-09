import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import DataSet from "@antv/data-set";

class Basic extends React.Component {
  render() {
    const { DataView } = DataSet;
    if(!this.props.height){return false}
    if(!this.props.data){
      return (
        <div>
        <Chart
           placeholder={<div className='loading'><span></span></div>}
           height={this.props.height}
        ></Chart>
        </div>
      )
    }
    if(this.props.data.length == 0){
      return (
        <div>
        <Chart
           placeholder={<div className='no-data'>暂无数据</div>}
           height={this.props.height}
        ></Chart>
        </div>
      )
    }
    const data = [
      {
        item: "居民生活用电",
        trade1: 0,
        trade2: 0,
        trade3:2,
        trade4:0
      },
      {
        item: "大工业用电",
        trade1: 142,
        trade2: 22,
        trade3:139,
        trade4:1
      },
      {
        item: "非工业用电",
        trade1: 2,
        trade2: 85,
        trade3:108,
        trade4:0
      },
      {
        item: "农业生产用电",
        trade1: 0,
        trade2: 0,
        trade3:5,
        trade4:0
      },
      {
        item: "商业用电",
        trade1: 0,
        trade2: 0,
        trade3:22,
        trade4:0
      },
      {
        item: "普通工业用电",
        trade1: 0,
        trade2: 0,
        trade3:228,
        trade4:1
      }
    ];
    console.log(this.props.data)
    const dv = new DataView().source(data);

    dv.transform({
      type: "fold",
      fields: ['trade1','trade2','trade3','trade4'],
      // 展开字段集
      key: "user",
      // key字段
      value: "score" // value字段
    });
    const cols = {
      score: {
        min: 0,
        max:230
      },
      trade1:{
        alias:'yiasd'
      }
    };
    return (
      <div>
        <Chart
          height={this.props.height}
          data={dv}
          padding={'auto'}
          scale={cols}
          forceFit
        >
          <Coord type="polar" radius={0.8} />
          <Axis
            name="item"
            line={null}
            tickLine={null}
            label={{
              textStyle: {
                fill: '#fff',
                fontSize: 10
              }
            }}
            grid={{
              lineStyle: {
                lineDash: null
              },
              hideFirstLine: false
            }}
          />
          <Tooltip />
          <Axis
            name="score"
            line={null}
            tickLine={null}
            grid={{
              type: "polygon",
              lineStyle: {
                lineDash: null
              },
              alternateColor: "rgba(0, 0, 0, 0.04)"
            }}
          />
          <Legend name="user" marker="circle" offset={30} />
          <Geom type="area" position="item*score" color="user" />
          <Geom type="line" position="item*score" color="user" size={2} />
          <Geom
            type="point"
            position="item*score"
            color="user"
            shape="circle"
            size={4}
            style={{
              stroke: "#fff",
              lineWidth: 1,
              fillOpacity: 1
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default Basic;