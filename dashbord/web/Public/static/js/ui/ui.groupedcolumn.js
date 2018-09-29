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
      fields: this.props.fields,//["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug."],// 展开字段集
      key: this.props.keyName,//"月份",// key字段
      value: this.props.value//"月均降雨量" // value字段
    });

    return (
      <div>
        <Chart {...this.props} data={dv}  placeholder={<div className='loading'><span></span></div>}>
          <Axis name={this.props.keyName} />
          <Axis name={this.props.value} />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="interval"
            position={`${this.props.keyName}*${this.props.value}`}
            color={'name'}//name
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