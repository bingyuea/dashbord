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

class Doubleline extends React.Component {
  render() {
    const data = [
      {
        time: "Jan",
        xmd: 7.0,
        ddd: 3.9
      },
      {
        time: "Feb",
        xmd: 6.9,
        ddd: 4.2
      },
      {
        time: "Mar",
        xmd: 9.5,
        ddd: 5.7
      },
      {
        time: "Apr",
        xmd: 14.5,
        ddd: 8.5
      },
      {
        time: "May",
        xmd: 18.4,
        ddd: 11.9
      },
      {
        time: "Jun",
        xmd: 21.5,
        ddd: 15.2
      },
      {
        time: "Jul",
        xmd: 25.2,
        ddd: 17.0
      },
      {
        time: "Aug",
        xmd: 26.5,
        ddd: 16.6
      },
      {
        time: "Sep",
        xmd: 23.3,
        ddd: 14.2
      },
      {
        time: "Oct",
        xmd: 18.3,
        ddd: 10.3
      },
      {
        time: "Nov",
        xmd: 13.9,
        ddd: 6.6
      },
      {
        time: "Dec",
        xmd: 9.6,
        ddd: 4.8
      }
    ];

    if (!this.props.height) {
      return false
    }
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
    const ds = new DataSet();
    const dv = ds.createView().source(this.props.data);
    dv.transform({
      type: "fold",
      fields:this.props.fields,
      // 展开字段集
      key:this.props.keyName,
      // key字段
      value:this.props.yAxis // value字段
    });

    const xLine = {
      stroke: 'rgba(255,255,255,.1)',
      fill: 'rgba(255,255,255,.1)',
      lineWidth: 1
    }
    const yLine = xLine;
    const grid = {
      //坐标轴网格线
      lineStyle: {
        stroke: 'rgba(255,255,255,.1)'
      }
    }
    return (
      <div>
        <Chart {...this.props} data={dv} scale={this.props.cols}>
          <Axis name={this.props.xAxis} 
            label={this.props.xLabel}
            tickLine={null}
            line={xLine}
          />
          <Axis
            name={this.props.yAxis}
            label={this.props.yLabel}
            tickLine={null}
            line={xLine}
            grid={grid}
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
            color={this.props.keyName}
          />
        </Chart>
      </div>
    );
  }
}

export default Doubleline;