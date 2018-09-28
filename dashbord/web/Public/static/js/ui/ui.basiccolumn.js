
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
// {
//             enter:{
//               animation: 'fadeIn', // 动画名称
//               easing: 'easeInQuart', // 动画缓动效果
//               delay: 3000, // 动画延迟执行时间
//               duration: 1000 // 动画执行时间
//             }
//           }

//基础柱状图
class Basiccolumn extends Component {

  render() {
    if(!this.props.height){return false}
    return (
      <div>
      	
        <Chart 
          placeholder={<div className='loading'><span></span></div>} {...this.props} scale={this.props.cols}>
          <Axis name={this.props.xAxis} label={this.props.xLabel}/>
          <Axis name={this.props.yAxis} label={this.props.yLabel}/>
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom type="interval" size={this.props.yAxis,[10]} color={'#5fa3ac'} position={`${this.props.xAxis}*${this.props.yAxis}`}/>
        </Chart>
      </div>
    );
  }
}

export default Basiccolumn;