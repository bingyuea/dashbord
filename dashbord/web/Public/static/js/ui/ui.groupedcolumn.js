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
  COLOR_PLATE_8
} from '../data/color'
//分组柱状图
class Groupedcolumn extends React.Component {
  render() {
    const data = [
      {
        name: "London",
        "Jan.": 18.9,
        "Feb.": 28.8,
        "Mar.": 39.3,
        "Apr.": 81.4,
        May: 47,
        "Jun.": 20.3,
        "Jul.": 24,
        "Aug.": 35.6
      },
      {
        name: "Berlin",
        "Jan.": 12.4,
        "Feb.": 23.2,
        "Mar.": 34.5,
        "Apr.": 99.7,
        May: 52.6,
        "Jun.": 35.5,
        "Jul.": 37.4,
        "Aug.": 42.4
      }
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(this.props.data);
    dv.transform({
      type: "fold",
      fields: this.props.fields,//["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug."],// 展开字段集
      key: this.props.keyName,//"月份",// key字段
      value: this.props.value//"月均降雨量" // value字段
    });

    return (
      <div>
        <Chart {...this.props} data={dv} >
          <Axis name={this.props.keyName} />
          <Axis name={this.props.value} />
          <Legend />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="interval"
            position={`${this.props.keyName}*${this.props.value}`}
            color={[this.props.fieldsName,COLOR_PLATE_8]}//name
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

export default Groupedcolumn;