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

//多行折线图
class Doubleline extends React.Component {
  render() {
   
    const ds = new DataSet();
    const dv = ds.createView().source(this.props.data);
    dv.transform({
      type: "fold",
      fields: this.props.fields,
      // 展开字段集
      key: this.props.key,
      // key字段
      value: this.props.yAxis // value字段
    });
    console.log(dv);
    
    return (
      <div>
        <Chart {...this.props} scale={cols} >
          <Legend />
          <Axis name={this.props.xAxis} label={this.props.xLabel}/>
          <Axis
            name={this.props.yAxis}
            label={this.props.yLabel}
          />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="line"
            position={`${this.props.xAxis}*${this.props.yAxis}`}
            size={2}
            color={this.props.key}
          />
          <Geom
            type="point"
            position={`${this.props.xAxis}*${this.props.yAxis}`}
            size={4}
            shape={"circle"}
            color={this.props.key}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default Doubleline;