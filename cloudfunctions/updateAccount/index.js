const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) 

exports.main = async (event, context) => {
  const db = cloud.database();
  const { accountId, totalBalance } = event;

  // 1. 先判断 accountId 是否存在，避免 null 或 undefined
  if (accountId === null || accountId === undefined) {
    return {
      success: false,
      error: 'accountId 不能为空'
    };
  }

  // 2. 安全地转换为字符串（确保不是 null 后再转换）
  const docId = accountId

  // 3. 执行数据库操作
  try {
    const result = await db.collection('account')
      .doc(docId)
      .update({
        data: {
          balance: totalBalance
        }
      });
    return { success: true, result };
  } catch (err) {
    return { success: false, error: err.message };
  }
}