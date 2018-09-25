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

import {
  DEFAULT_COLOR
} from '../data/color'

//柱状图与折线图
class Doubleaxes extends React.Component {
  render() {
    if(!this.props.height){return false}
    
    let chartIns = null;
    return (
      <div>
        <Chart
          scale={this.props.cols}
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
                  fill: DEFAULT_COLOR,
                  radius: 5
                }
              },
              {
                value: this.props.yAxis_line_name,
                marker: {
                  symbol: "hyphen",
                  stroke: "#fff",
                  radius: 5,
                  lineWidth: 3
                }
              }
            ]}
            onClick={ev => {
              const item = ev.item;
              const value = item.value;
              const checked = ev.checked;
              const geoms = chartIns.getAllGeoms();

              for (let i = 0; i < geoms.length; i++) {
                const geom = geoms[i];

                if (geom.getYScale().field === value) {
                  if (checked) {
                    geom.show();
                  } else {
                    geom.hide();
                  }
                }
              }
            }}
          />
          <Axis
            name={this.props.xAxis}
            grid={null}
            label={{
              textStyle: {
                fill: DEFAULT_COLOR
              }
            }}
          />
          <Tooltip />
          <Geom type="interval" position={`${this.props.xAxis}*${this.props.yAxis_interval}`} color={DEFAULT_COLOR} />
          <Geom
            type="line"
            position={`${this.props.xAxis}*${this.props.yAxis_line}`}
            color="#fff"
            size={3}
            shape="smooth"
          />
          <Geom
            type="point"
            position={`${this.props.xAxis}*${this.props.yAxis_line}`}
            color="#fff"
            size={3}
            shape="circle"
          />
        </Chart>
      </div>
    );
  }
}

export default Doubleaxes;