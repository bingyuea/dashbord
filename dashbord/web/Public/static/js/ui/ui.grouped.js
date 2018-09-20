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
    const data = [
      {
        label: "Monday",
        series1: 2800,
        series2: 2260
      },
      {
        label: "Tuesday",
        series1: 1800,
        series2: 1300
      },
      {
        label: "Wednesday",
        series1: 950,
        series2: 900
      },
      {
        label: "Thursday",
        series1: 500,
        series2: 390
      },
      {
        label: "Friday",
        series1: 170,
        series2: 100
      }
    ];
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
        <Chart height={this.props.height} data={dv} forceFit>
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