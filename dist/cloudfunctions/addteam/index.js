// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  cloud.init()
  const db = cloud.database()

  db.collection('teamlist').add({
    data: {
      teamId: `TF${new Date().getTime()}`,
      teamMember: event.teamMember,
      status: 'N'
    }
  })

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}