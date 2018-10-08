import React, { Component } from 'react'
import moment from 'moment'

import { Menu, Dropdown, Icon } from 'antd'

class MeunTitle extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let meauLink = [
      {
        name: '巡检仪大数据分析平台',
        href: '/dashboard',
        target: ''
      },
      {
        name: '巡检仪安装情况查询',
        href: '/xmd',
        target: ''
      },
      {
        name: '二次回路单一异常分析',
        href: '/secondary_loop',
        target: ''
      },
      {
        name: '二次回路异常主题分析',
        href: '/analy_loop',
        target: ''
      },
      {
        name: '二次回路状态在线监测',
        href: '/status_loop',
        target: ''
      }
    ]
    return (
      <div>
        <Menu>
          {Array.isArray(meauLink) &&
            meauLink.map((item, index) => {
              return (
                <Menu.Item key={index}>
                  <a target={item.target} href={item.href}>
                    {item.name}
                  </a>
                </Menu.Item>
              )
            })}
        </Menu>
      </div>
    )
  }
}

module.exports = MeunTitle
