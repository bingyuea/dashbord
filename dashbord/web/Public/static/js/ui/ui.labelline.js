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

//饼图
class Labelline extends React.Component {
  render() {
    const { DataView } = DataSet;
    const dv = new DataView();
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
    dv.source(this.props.data).transform({
      type: "percent",
      field: this.props.field,
      dimension: this.props.dimension,
      as: "percent"
    });
    return (
      <div>
        <Chart
          {...this.props}
          data={dv}
          scale={this.props.cols}
        >
          <Coord type="theta" radius={this.props.radius || 1} innerRadius={this.props.innerRadius || 0}/>
          <Axis name="percent" />
          <Tooltip
            showTitle={false}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
          />
          <Geom
            type="intervalStack"
            position="percent"
            color={[this.props.dimension, COLOR_PLATE_8]}
            tooltip={[
              `${this.props.dimension}*percent`,
              (item, percent) => {
                percent = (percent * 100).toFixed(0) + "%";
                return {
                  name: item,
                  value: percent
                };
              }
            ]}
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          >
            <Label 
              content='percent' 
              offset={-4} 
              textStyle={{
                rotate: 0,
                textAlign: 'center',
                shadowBlur: 2,
                shadowColor: 'rgba(0, 0, 0, .45)'
              }} 
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default Labelline;