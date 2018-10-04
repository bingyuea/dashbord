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
  DEFAULT_COLOR
} from '../data/color'
//基础条形图
class Basicbar extends React.Component {
  render() {
    
    const self = this;
    const ds = new DataSet();
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
    
    const dv = ds.createView().source(this.props.data);
    dv.source(this.props.data).transform({
      type: "sort",

      callback(a, b) {
        // 排序依据，和原生js的排序callback一致
        return a[self.props.yAxis] - b[self.props.yAxis] > 0;
        // return a.population - b.population > 0;
      }
    });

    if(!this.props.height){return false}
    const xLine = {
      stroke: 'rgba(255,255,255,.1)',
      fill: 'rgba(255,255,255,.1)',
      lineWidth: 1
    }
    const yLine = xLine;
    const grid = {//坐标轴网格线
      lineStyle:{
        stroke:'rgba(255,255,255,.1)'
      }
    }
    return (
      <div>
        <Chart {...this.props} data={dv} placeholder={<div className='loading'><span></span></div>}>
          <Coord transpose />
          <Axis
            name={this.props.xAxis}
            label={this.props.xLabel}
            line={xLine} tickLine={null}
          />
          <Axis name={this.props.yAxis} label={this.props.yLabel} line={yLine} tickLine={null} grid={grid}/>
          <Tooltip />
          <Geom type="interval" position={`${this.props.xAxis}*${this.props.yAxis}`} color={'#7a7a7a'}/>
        </Chart>
      </div>
    );
  }
}

export default Basicbar;