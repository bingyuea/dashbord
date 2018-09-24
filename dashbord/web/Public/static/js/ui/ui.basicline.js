import React from 'react'
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
} from 'bizcharts'

import { DEFAULT_COLOR, DARK_DEFAULT_COLOR } from '../data/color'

//基础折线图
class BasicLine extends React.Component {
  render() {
    return (
      <div>
        <Chart placeholder {...this.props} scale={this.props.cols}>
          <Axis name={this.props.xAxis} label={this.props.xLabel} />
          <Axis name={this.props.yAxis} label={this.props.yLabel} />
          <Tooltip
            crosshairs={{
              type: 'y'
            }}
          />
          <Geom
            type="line"
            color={DEFAULT_COLOR}
            position={`${this.props.xAxis}*${this.props.yAxis}`}
            size={2}
          />
          {this.props.doubleLine === true ? (
            <Geom
              type="line"
              color={DARK_DEFAULT_COLOR}
              position={`${this.props.xAxisDouble}*${this.props.yAxisDouble}`}
              size={2}
            />
          ) : (
            ''
          )}
          {this.props.type === 'area' ? (
            <Geom
              type="area"
              color={DEFAULT_COLOR}
              position={`${this.props.xAxis}*${this.props.yAxis}`}
              size={2}
            />
          ) : (
            ''
          )}
          <Geom
            type="point"
            color={'#fff'}
            position={`${this.props.xAxis}*${this.props.yAxis}`}
            size={3}
            shape={'circle'}
            style={{
              stroke: '#fff',
              lineWidth: 1
            }}
          />
        </Chart>
      </div>
    )
  }
}

export default BasicLine
