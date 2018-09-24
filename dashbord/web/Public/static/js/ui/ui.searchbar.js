import React, { Component } from 'react'

import { Select, DatePicker, Input, Icon } from 'antd'

import moment from 'moment'

import DataServince from '../services/searchbar.services'

const Option = Select.Option

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

    searchValue[key] = value

    this.setState({
      searchValue: searchValue
    })
  }

  rangeOkHandle(date) {
    let searchValue = this.state.searchValue

    searchValue.startTime = date[0]._i + ':00'
    searchValue.endTime = date[1]._i + ':00'
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
    return (
      <Select
        disabled={item.disabled || false}
        value={searchValue[item.key] || 'defaultValue'}
        onChange={this.inputChangeHandle.bind(this, item.key)}
      >
        {optionContent}
      </Select>
    )
  }
  //省市选择器
  renderLocationSelect(locationData) {
    return (
      <div className="search-item" style={locationData.style}>
        <div className="title">{locationData.title}</div>
        <div className="select-box double">
          <div className="left">
            <div className="title">省份</div>
            {this.renderSelect(locationData.province)}
          </div>
          <div className="right">
            <div className="title">城市</div>
            {this.renderSelect(locationData.city)}
          </div>
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
    const dateFormat = 'YYYY-MM-DD HH:mm'
    // 这里的item的defaultTime不存在会抛异常
    if (!item.defaultTime) {
      return
    }
    return (
      <div className="search-item" style={item.style}>
        <div className="title">{item.title}</div>
        <div className="select-box">
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            defaultValue={[
              moment(item.defaultTime[0], dateFormat),
              moment(item.defaultTime[1], dateFormat)
            ]}
            placeholder={['开始时间', '结束时间']}
            onOk={this.rangeOkHandle.bind(this)}
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
        <div className="title">{item.title}</div>
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
          <Icon type="search" />
          搜索
        </div>
        <div className="search-btn" onClick={this.resetHandle.bind(this)}>
          <Icon type="search" />
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
