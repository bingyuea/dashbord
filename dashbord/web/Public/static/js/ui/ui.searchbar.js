import React, {Component} from 'react'

import { 
	Select,
	DatePicker,
	Input,
	Icon
} from 'antd';

const Option = Select.Option;

const { RangePicker, MonthPicker } = DatePicker;

class SearchBar extends Component {

	constructor(props) {

        super(props);

        this.state = {
        	searchValue:{}
        }
        
    }

    inputChangeHandle(key,e){
    	const target = e.target;

        const value = target ? target.value : e ;

        let searchValue = this.state.searchValue;

        searchValue[key] = value;

        this.setState({
            searchValue: searchValue
        })

    }

    dataChangeHandle(date, dateString){
  		console.log(date, dateString);
  		const key = this.props.dateData.key;
  		let searchValue = this.state.searchValue;
        searchValue[key] = '';

        this.setState({
        	searchValue:searchValue
        });
    }

    searchHandle(){
    	const searchValue = this.state.searchValue;
    	this.props.searchHandle && this.props.searchHandle(searchValue);
    }

    renderSelect(item){
    	const searchValue = this.state.searchValue;
    	const InputChangeHandle = this.props.InputChangeHandle || function(){};
    	let optionContent = item.options.map((optData,optIdx)=>{
            return <Option key={optIdx} value={optData.value} >{optData.desc}</Option>
        })
        return (
             <Select  disabled={item.disabled || false} value={searchValue[item.key] || 'defaultValue'} onChange={this.inputChangeHandle.bind(this,item.key)}>
                {optionContent}
             </Select>
        )
    }
    //省市选择器
    renderLocationSelect(locationData){
    	return (
    		<div className='search-item' style={locationData.style}>
    			<div className='title'>{locationData.title}</div>
    			<div className='select-box double'>
    				<div className='left'>
    					<div class='title'>省份</div>
    					{this.renderSelect(locationData.provinceData)}
    				</div>
    				<div className='right'>
    					<div class='title'>城市</div>
    					{this.renderSelect(locationData.cityData)}
    				</div>
    			</div>
    		</div>
    	)
    }

    //下拉单选
    renderSingleSelect(item){
    	return (
    		<div className='search-item' style={item.style}>
    			<div className='title'>{item.title}</div>
    			<div className='select-box'>
    				{this.renderSelect(item)}
    			</div>
    		</div>
    	)
    }

    //时间范围选择器
    renderDatePicker(item){
    	return (
    		<div className='search-item' style={item.style}>
    			<div className='title'>{item.title}</div>
    			<div className='select-box'>
    				<RangePicker onChange={this.dataChangeHandle.bind(this)} />
    			</div>
    		</div>
    	)
    }

    //input输入框
    renderInput(item){
    	const searchValue = this.state.searchValue || {};
    	return (
    		<div className='search-item' style={item.style}>
    			<div className='title'>{item.title}</div>
    			<div className='select-box'>
    				<Input 
                        placeholder={item.placeholder} 
                        value ={searchValue[item.key]} 
                        maxLength= {item.maxlength || 100000}
                        onChange={this.inputChangeHandle.bind(this,item.key)}
                        disabled={item.disabled || false} 
                    />
    			</div>
    		</div>

    	)
    }

    renderSearchBtn(){
    	<div className='search-item search-btn' onClick={this.searchHandle.bind(this)}>
			<Icon type='search'/>搜索			
		</div>
    }

    render(){

    	const {
    		locationData,
    		measureData,
    		tradeData,
    		unusualData,
    		dateData,
    		themeData,
    		inputData
    	}  = this.props;

    	return (
    		<div className='search-bar'>
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

module.exports = SearchBar;