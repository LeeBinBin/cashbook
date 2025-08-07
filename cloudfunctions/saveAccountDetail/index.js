const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) 
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const result = db.collection('accountDetail').add({
    data:{
        accountId:event.accountId,
        tradeDate:event.tradeDate,
        balance:event.balance,
        totalBalance:event.totalBalance,
        type:event.type,
        openid:wxContext.OPENID
    }
  })
  return result
}