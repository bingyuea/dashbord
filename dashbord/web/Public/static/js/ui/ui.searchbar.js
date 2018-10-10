import React, { Component } from 'react'

import { Select, DatePicker, Input, Icon } from 'antd'

import moment from 'moment'

import DataServince from '../services/searchbar.services'

import {
  formatCity
} from '../util/util'

const Option = Select.Option;

const { RangePicker, MonthPicker } = DatePicker

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: {}
    }
  }

  componentDidMount() {
    const self = this
  }

  inputChangeHandle(key, e) {
    const target = e.target

    const value = target ? target.value : e

    let searchValue = this.state.searchValue

    if(key == 'province' && this.state.searchValue.province !== value){
      delete searchValue.city 
    }
    searchValue[key] = value;

    this.setState({
      searchValue: searchValue
    })
  }

  rangeOkHandle(date, dateString) {
    let searchValue = this.state.searchValue

    searchValue.startTime = dateString[0] + ' 00:00:00'
    searchValue.endTime = dateString[1] + ' 00:00:00'
    this.setState({
      searchValue: searchValue
    })
  }

  searchHandle() {
    const searchValue = this.state.searchValue
    this.props.searchHandle && this.props.searchHandle(searchValue)
  }

  resetHandle() {}

  renderSelect(item) {
    const searchValue = this.state.searchValue
    const InputChangeHandle = this.props.InputChangeHandle || function() {}
    let optionContent = item.options.map((optData, optIdx) => {
      return (
        <Option key={optIdx} value={optData.value}>
          {optData.desc}
        </Option>
      )
    })
    let defaultValue = '请选择';
    switch (item.key){
      case 'city' : 
        defaultValue = '城市';
        break;
      case 'province' : 
        defaultValue = item.options[0].value;
        break;
      case 'subject' :
        defaultValue = item.options[0].value;
        break;
      default :
        defaultValue = '请选择';
    }
    // const dropdownClassName = item.key == 'city' ? 'city-select':'';
    const dropdownClassName = item.key !== 'province' ? 'city-select' : ''

    return (
      <Select
        disabled={item.disabled || false}
        value={searchValue[item.key] || defaultValue}
        onChange={this.inputChangeHandle.bind(this, item.key)}
        dropdownClassName={dropdownClassName}
      >
        {optionContent}
      </Select>
    )
  }
  //省市选择器
  renderLocationSelect(locationData) {
    const province = this.state.searchValue.province || locationData.province.options[0].value;
    const list = formatCity(locationData.city.options,province);
    const city = {
      key:'city',
      options:list
    }

    return (
      <div className="search-item" style={locationData.style}>
        <div className="title">{locationData.title}</div>
        <div className="select-box double">
          <div className="left">{this.renderSelect(locationData.province)}</div>
          <div className="right">{this.renderSelect(city)}</div>
        </div>
      </div>
    )
  }

  //下拉单选
  renderSingleSelect(item) {
    return (
      <div className="search-item" style={item.style}>
        <div className="title">{item.title}</div>
        <div className="select-box">{this.renderSelect(item, item.key)}</div>
      </div>
    )
  }

  //时间范围选择器
  renderDatePicker(item) {
    const dateFormat = 'YYYY-MM-DD HH:mm:ss'
    // 这里的item的defaultTime不存在会抛异常
    if (!item.defaultTime) {
      return
    }
    return (
      <div className="search-item" style={item.style}>
        <div className="title">{item.title}</div>
        <div className="select-box">
          <RangePicker
            format="YYYY-MM-DD"
            defaultValue={[
              moment(item.defaultTime[0], dateFormat),
              moment(item.defaultTime[1], dateFormat)
            ]}
            allowClear={false}
            placeholder={['开始时间', '结束时间']}
            onChange={this.rangeOkHandle.bind(this)}
          />
        </div>
      </div>
    )
  }

  //input输入框
  renderInput(item) {
    const searchValue = this.state.searchValue || {}
    return (
      <div className="search-item" style={item.style}>
        <div className="title spec">{item.title}</div>
        <div className="select-box">
          <Input
            placeholder={item.placeholder}
            value={searchValue[item.key]}
            maxLength={item.maxlength || 100000}
            onChange={this.inputChangeHandle.bind(this, item.key)}
            disabled={item.disabled || false}
          />
        </div>
      </div>
    )
  }

  renderSearchBtn() {
    return (
      <div className="btn-box">
        <div className=" search-btn" onClick={this.searchHandle.bind(this)}>
          查询
        </div>
        <div
          className="reset-btn"
          onClick={this.resetHandle.bind(this)}
          style={{ display: 'none' }}
        >
          重置
        </div>
      </div>
    )
  }

  render() {
    const {
      locationData, //省市
      measureData, //计量类型
      tradeData, //行业类型
      unusualData, //异常类型
      dateData, //时间段选择
      themeData, //主题类型
      inputData
    } = this.props

    return (
      <div className="searchbar-content">
        {locationData && this.renderLocationSelect(locationData)}
        {measureData && this.renderSingleSelect(measureData)}
        {tradeData && this.renderSingleSelect(tradeData)}
        {unusualData && this.renderSingleSelect(unusualData)}
        {themeData && this.renderSingleSelect(themeData)}
        {inputData && this.renderInput(inputData)}
        {dateData && this.renderDatePicker(dateData)}
        {this.renderSearchBtn()}
      </div>
    )
  }
}

module.exports = SearchBar
