
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
    if(!this.props.height){return false}
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
          <Geom type="interval" color={'#5fa3ac'} position={`${this.props.xAxis}*${this.props.yAxis}`} animate={{appear:{
              animation: 'zoomIn', // 动画名称
              easing: 'easeInQuart', // 动画缓动效果
              delay: 3000, // 动画延迟执行时间
              duration: 3000 // 动画执行时间
            }}}/>
        </Chart>
      </div>
    );
  }
}

export default Basiccolumn;