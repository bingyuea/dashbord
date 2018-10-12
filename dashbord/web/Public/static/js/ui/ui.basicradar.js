import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
} from "bizcharts";
import DataSet from "@antv/data-set";

class Basic extends React.Component {
  render() {
    const { DataView } = DataSet;
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
    if(this.props.data.length == 0){
      return (
        <div>
        <Chart
           placeholder={<div className='no-data'>暂无数据</div>}
           height={this.props.height}
        ></Chart>
        </div>
      )
    }
  
    const dv = new DataView().source(this.props.data);

    dv.transform({
      type: "fold",
      fields:this.props.fields,
      // 展开字段集
      key: "user",
      // key字段
      value: "score" // value字段
    });

    const cols = {
      score:{
        tickCount:3
      }
      
    };
    
    return (
      <div>
        <Chart
          height={this.props.height}
          data={dv}
          padding={'auto'}
          forceFit
          scale={cols}
        >
          <Coord type="polar" radius={0.8} />
          <Axis
            name={this.props.xAxis}
            line={null}
            tickLine={null}
            label={{
              offset:5,
              textStyle: {
                fill: '#fff',
                fontSize: 10
              }
            }}
            grid={{
              lineStyle: {
                lineDash: null
              },
              hideFirstLine: false
            }}
          />
          <Tooltip />
          <Axis
            name="score"
            line={null}
            tickLine={null}
            grid={{
              type: "polygon",
              lineStyle: {
                lineDash: null
              },
              alternateColor: "rgba(0, 0, 0,.4)"
            }}
          />
          {/*<Legend name="user" marker="circle" offset={0} textStyle={{
            fontSize:8
          }}/>*/}
      
          <Geom type="area" position={`${this.props.xAxis}*score`} color="user" />
      
          <Geom type="line" position={`${this.props.xAxis}*score`} color="user" size={2} />
          <Geom
            type="point"
            position={`${this.props.xAxis}*score`}
            color="user"
            shape="circle"
            size={2}
            style={{
              stroke: "#fff",
              lineWidth: 1,
              fillOpacity: 1
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default Basic;