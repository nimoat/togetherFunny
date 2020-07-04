import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import './index.less'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.handleBuildTeam = this.handleBuildTeam.bind(this)
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleBuildTeam() {
    console.log(this)
    Taro.login({
      success: function (res) {
        // if (res.code) {
        //   //发起网络请求
        //   Taro.request({
        //     url: 'https://api.weixin.qq.com/sns/jscode2session',
        //     data: {
        //       appid: 'wxebef9cbbae56b5b9',
        //       secret: '704bd1644d473d1a5f474144542aad17',
        //       js_code: res.code,
        //       grant_type: 'authorization_code'
        //     }
        //   })
        // } else {
        //   console.log('登录失败！' + res.errMsg)
        // }
      }
    })

  }

  render() {
    return (
      <View className='index'>
        <Button className='btn-build-team' plain type='primary' onClick={this.handleBuildTeam}>组建队伍</Button>
        <Button className='btn-join-team' type='primary'>加入队伍</Button>
      </View>
    )
  }
}
