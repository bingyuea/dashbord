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

import {
  COLOR_PLATE_16,DEFAULT_COLOR
} from '../data/color'

//雷达图
class Basicradar extends React.Component {
  render() {
    
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
    const { DataView } = DataSet;
    const dv = new DataView().source(this.props.data);
    dv.transform({
      type: "fold",
      fields: this.props.fields,
      // 展开字段集
      key: "yeats",
      // key字段
      value: ''// value字段
    });
    const cols = {
      sales: {
        min: 0,
        max: 80
      }
    };
    return (
      <div>
        <Chart
          data={dv}
          {...this.props}
           placeholder={<div className='loading'><span></span></div>}
        >
          <Coord type="polar" radius={0.8}/>
          <Axis
            name={this.props.xAxis}
            line={null}
            tickLine={null}
            grid={{
              lineStyle: {
                lineDash: null
              },
              hideFirstLine: false
            }}
          />
          <Tooltip />
          <Axis
            name={this.props.yAxis}
            line={null}
            tickLine={null}
            grid={{
              type: "polygon",
              lineStyle: {
                lineDash: null
              },
              alternateColor: "rgba(0, 0, 0,1)"
            }}
          />
          <Geom type="area" position={`${this.props.xAxis}*${this.props.yAxis}`} color={[this.props.yAxis,DEFAULT_COLOR]} />
          <Geom type="line" position={`${this.props.xAxis}*${this.props.yAxis}`} color={[this.props.yAxis,DEFAULT_COLOR]} size={2} />
          <Geom
            type="point"
            position={`${this.props.xAxis}*${this.props.yAxis}`}
            color={this.props.xAxis}
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

export default Basicradar;