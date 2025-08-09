const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) 
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const {pageIndex, pageSize} = event
  try {
   const result =  await db.collection('accountBook').where({
    _openid:wxContext.OPENID
  }).skip(pageIndex).limit(pageSize).get()
  console.error('获取账本信息成功');
  return result
  } catch (err) {
    console.error('获取账本信息失败' + err);
  }
}