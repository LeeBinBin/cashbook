// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const result = db.collection('account').add({
    data:{
      balance:event.balance,
      icon:event.icon,
      name:event.name,
      remark:event.remark,
      typeId:event.typeId,
      _openid:wxContext.OPENID,
      createTime:new Date()
    }
  })
  return result
}