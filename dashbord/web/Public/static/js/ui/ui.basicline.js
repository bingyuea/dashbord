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
    if (!this.props.height) {
      return false
    }
    if (this.props.data && this.props.data.length == 0) {
      return (
        <div>
          <Chart
            placeholder={<div className="no-data">暂无数据</div>}
            height={this.props.height}
          />
        </div>
      )
    }

    const xLine = {
      stroke: 'rgba(255,255,255,.1)',
      fill: 'rgba(255,255,255,.1)',
      lineWidth: 1
    }
    const yLine = xLine
    const grid = {
      //坐标轴网格线
      lineStyle: {
        stroke: 'rgba(255,255,255,.1)'
      }
    }
    let _this = this
    return (
      <div>
        <Chart
          placeholder={
            <div className="loading">
              <span />
            </div>
          }
          {...this.props}
          scale={this.props.cols}
          onPlotClick={ev => {
            // console.log(ev)
            // console.log(ev.data)
            if (ev.data && ev.data._origin) {
              let data = ev.data._origin
              let average = data.average
              console.log(this)
              console.log(_this)

              _this.setState({
                averageClick: average
              })
              console.log(average)
            }
          }}
        >
          <Axis
            name={this.props.xAxis}
            label={this.props.xLabel}
            tickLine={null}
            line={xLine}
          />
          <Axis
            name={this.props.yAxis}
            label={this.props.yLabel}
            tickLine={null}
            line={yLine}
            grid={grid}
          />
          {this.props.hideTooltip ? '' : <Tooltip shared={false} />}
          {/* 这里添加tooltip */}
          {/* <Tooltip crosshairs={{ type: 'x' }} /> */}
          <Geom
            type="line"
            color={
              this.props.doubleLine === true
                ? this.props.doubletype
                : DEFAULT_COLOR
            }
            position={`${this.props.xAxis}*${this.props.yAxis}`}
            size={2}
          />
          {this.props.hidePoint ? (
            ''
          ) : (
            <Geom
              type="point"
              color={DEFAULT_COLOR}
              position={`${this.props.xAxis}*${this.props.yAxis}`}
              size={3}
              shape={'circle'}
              style={{
                stroke: '#fff',
                lineWidth: 1
              }}
            />
          )}
          <Geom
            type="area"
            position={`${this.props.xAxis}*${this.props.yAxis}`}
            color={`l(100) 0:${DEFAULT_COLOR} 1:rgba(0,0,0,0)`}
            opacity={0.85}
          />
        </Chart>
      </div>
    )
  }
}

export default BasicLine
