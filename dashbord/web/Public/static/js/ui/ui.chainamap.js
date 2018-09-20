import React,  { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import data from '../data/china-geo.json';
import DataSet from '@antv/data-set';
import {
  DEFAULT_COLOR
} from '../data/color'

export default class ChinaMapChart extends Component {

  render() {
    const cols = {
      x: { sync: true, nice: false },
      y: { sync: true, nice: false }
    }

    const { features } = data;

    // data set
    const ds = new DataSet();

    // geo data
    const dvGeo = ds.createView().source(data, {
      type: 'GeoJSON'
    });

    // user data
    const dvData = ds.createView().source(this.props.userData);
    // assign centroid point (x, y) to user data
    dvData.transform({
      geoDataView: dvGeo,
      field: 'name',
      type: 'geo.region',
      as: [ 'x', 'y' ]
    }) 
    dvGeo.transform({
      type: 'rename',
      map: {
        longitude: 'x',
        latitude: 'y',
      }
    });

    

    return (
      <Chart {...this.props} scale={cols} onPlotClick={(ev)=>{this.props.mapClick && this.props.mapClick(ev)}}>
        <Tooltip showTitle={false} />
        <View data={dvGeo} >
          <Geom type='polygon' color='#ddd' position='x*y' style={{stroke: '#fff',lineWidth: 0.5}} tooltip={false}/>
        </View>
        <View data={dvData} scale={this.props.scale}>
          <Geom type='polygon' position='x*y' size={0}  tooltip={this.props.yAxis} opacity={this.props.yAxis} color={DEFAULT_COLOR}>
            <Label content={this.props.xAxis} offset={0} textStyle={{fill: '#fff',fontSize: 10}}/>
          </Geom>
        </View>
      </Chart>
    );
  }
}
