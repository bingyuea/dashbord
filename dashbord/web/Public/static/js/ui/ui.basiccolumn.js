
import React,{Component} from "react";
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

//基础柱状图
class Basiccolumn extends Component {

  render() {
    return (
      <div>
      	
        <Chart placeholder {...this.props} forceFit scale={this.props.cols}>
          <Axis name={this.props.xAxis} label={this.props.xLabel}/>
          <Axis name={this.props.yAxis} label={this.props.yLabel}/>
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom type="interval" color={'#5fa3ac'} position={`${this.props.xAxis}*${this.props.yAxis}`} />
        </Chart>
      </div>
    );
  }
}

export default Basiccolumn;