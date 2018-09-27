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

//分组柱状图  横向
class Grouped extends React.Component {
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
    const ds = new DataSet();
    
    const dv = ds.createView().source(this.props.data);
    dv.transform({
      type: "fold",
      fields: this.props.fields,// 展开字段集["series1", "series2"]
      key: "type",// key字段
      value: "value" // value字段
    });
    return (
      <div>
        <Chart height={this.props.height} data={dv} forceFit  placeholder={<div className='loading'><span></span></div>}>
          <Legend position="right"/>
          <Coord transpose scale={[1, -1]} />
          <Axis
            name={this.props.name}
            label={{
              offset: 12
            }}
          />
          <Axis name="value" position={"right"} />
          <Tooltip />
          <Geom
            type="interval"
            position="label*value"
            color={"type"}
            adjust={[
              {
                type: "dodge",
                marginRatio: 1 / 32
              }
            ]}
          />
        </Chart>
      </div>
    );
  }
}

export default Grouped;