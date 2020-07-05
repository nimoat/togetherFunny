import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import './index.less'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.handleBuildTeam = this.handleBuildTeam.bind(this)
    this.handleJoinTeam = this.handleJoinTeam.bind(this)
    this.handleAddTeam = this.handleAddTeam.bind(this)
  }

  state = {
    newTeam: []
  }


  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  /**
   * 按钮一点击
   */
  handleBuildTeam() {
    Taro.login({
      success: function (res1) {
        console.log(res1)
        if (res1.code) {
          //发起网络请求
          Taro.cloud.callFunction({
            name: 'login',
            data: {
              a: '1111'
            },
            success: res2 => {
              console.log('[云函数] [sendsms] 调用成功')
              console.log(res2)
            },
          })
        } else {
          console.log('登录失败！' + res1.errMsg)
        }
      }
    })
  }

  handleJoinTeam() {
    var self = this
    // 查看是否授权
    Taro.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          console.log(0)
          Taro.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              console.log('授权用户信息成功')
            }
          })
        }
        if (res.authSetting['scope.userInfo']) {
          console.log(111)
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          Taro.getUserInfo({
            success: res2 => {
              console.log(res2.userInfo.avatarUrl)
              self.setState({
                newTeam: [res2.userInfo.nickName]
              })
            }
          })
        }
      }
    })
  }

  handleAddTeam() {
    Taro.cloud.callFunction({
      name: 'addteam',
      data: {
        teamMember: this.state.newTeam
      }
    }).then(res => {
      console.log(res);
    })
  }

  render() {
    return (
      <View className='index'>
        <Button className='btn-build-team' plain type='primary' onClick={this.handleBuildTeam}>获取openid</Button>
        <Button className='btn-join-team' type='primary' onClick={this.handleJoinTeam} openType='getUserInfo'>获取用户信息</Button>
        <Button className='btn-add-team' type='warn' onClick={this.handleAddTeam}>插入数据</Button>
      </View>
    )
  }
}
