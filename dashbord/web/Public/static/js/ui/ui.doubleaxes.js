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
// import DataSet from "@antv/data-set";
import {
  DEFAULT_COLOR
} from '../data/color'

//柱状图与折线图
class Doubleaxes extends React.Component {
  render() {
    if(!this.props.height){return false}
    // const dv = new DataView();
    // dv.source(this.props.data).transform({
    //   type: "percent",
    //   field: this.props.,
    //   dimension: "item",
    //   as: "percent"
    // });

    if(this.props.data && this.props.data.length == 0){
      return (
        <div>
        <Chart
           placeholder={<div className='no-data'>暂无数据</div>}
           height={this.props.height}
        ></Chart>
        </div>
      )
    }
    let chartIns = null;
    return (
      <div>
        <Chart
          scale={this.props.cols}
           placeholder={<div className='loading'><span></span></div>}
          {...this.props}
          onGetG2Instance={chart => {
            chartIns = chart;
          }}
        >
          <Legend
            custom={true}
            allowAllCanceled={true}
            items={[
              {
                value: this.props.yAxis_interval_name,
                marker: {
                  symbol: "square",
                  fill: '#7a7a7a',
                  radius: 5
                }
              },
              {
                value: this.props.yAxis_line_name,
                marker: {
                  symbol: "hyphen",
                  stroke: DEFAULT_COLOR,
                  radius: 5,
                  lineWidth: 2
                }
              }
            ]}
          />
          <Axis
            name={this.props.xAxis}
            lable={this.props.xLable}
            tickLine={null}
          />
          <Axis
            name={this.props.yAxis_line}
            grid={null}
            position='left'
            label={{
              textStyle: {
                fill: '#fff'
              }
            }}
          />
          <Axis
            name={this.props.yAxis_interval}
            grid={null}
            position='right'
            label={{
              textStyle: {
                fill: DEFAULT_COLOR
              }
            }}
          />
          <Tooltip />
          <Geom type="interval" position={`${this.props.xAxis}*${this.props.yAxis_interval}`} color={'#7a7a7a'} />
          <Geom
            type="line"
            position={`${this.props.xAxis}*${this.props.yAxis_line}`}
            color={DEFAULT_COLOR}
            size={2}
            shape="smooth"
          />
          <Geom
            type="point"
            position={`${this.props.xAxis}*${this.props.yAxis_line}`}
            color={DEFAULT_COLOR}
            size={3}
            shape="circle"
          />
        </Chart>
      </div>
    );
  }
}

export default Doubleaxes;