const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const{typeName,typeId,name,icon} = event
  try {
    const res = await db.collection('accountBook').add({
    data:{
      _openid: wxContext.OPENID,
      createTime:new Date(),
      typeName:typeName,
      typeId:typeId,
      name:name,
      icon:icon
    }
  })
  return res
} catch (err){
  console.log(err)
}
}