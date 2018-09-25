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
    const data = [
      {
        country: "中国",
        population: 131744
      },
      {
        country: "印度",
        population: 104970
      },
      {
        country: "美国",
        population: 29034
      },
      {
        country: "印尼",
        population: 23489
      },
      {
        country: "巴西",
        population: 18203
      }
    ];
    const self = this;
    const ds = new DataSet();
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
    return (
      <div>
        <Chart {...this.props} data={dv}>
          <Coord transpose />
          <Axis
            name={this.props.xAxis}
            label={this.props.xLabel}
          />
          <Axis name={this.props.yAxis} label={this.props.yLabel}/>
          <Tooltip />
          <Geom type="interval" position={`${this.props.xAxis}*${this.props.yAxis}`} color={DEFAULT_COLOR}/>
        </Chart>
      </div>
    );
  }
}

export default Basicbar;