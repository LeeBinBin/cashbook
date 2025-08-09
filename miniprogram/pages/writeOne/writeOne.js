Page({
  data: {
    dateTime:[],
    accountId: null,
    tradeDate: null,
    totalBalance:null, //总金额
    isChooseTreadDate: false
},
onLoad: function (options) {
  console.log('onLoad 收到参数：', options); 
  const now = new Date();
  // 初始化数组格式的日期时间
  this.setData({
    dateTime: [
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate(),
      now.getHours(),
      now.getMinutes()
    ],
    // 同时初始化tradeDate为字符串格式
    tradeDate: `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
  })

  // 接收路由参数accountId和balance

  // !!!!!!!
  // 由于一直用&&导致后台totalBalance的值为balance
  // 接收路由参数：accountId 必须存在，否则提示错误
  if (options.accountId) { // 只判断 accountId 是否存在（必填）
    
    this.setData({
      accountId: options.accountId, // 确保 accountId 有值
      totalBalance: options.balance ? parseFloat(options.balance) : 0
    });
  } else {
    // 若 accountId 不存在，直接提示并返回
    wx.showToast({
      title: '缺少账户ID参数',
      icon: 'none',
      duration: 3000
    });
    console.log('accountId 未传递');
  }
},
  // 修改时间选择事件处理
  onDateTimeChange(e) {
    const value = e.detail.value;
    // 更新数组格式的显示值
    this.setData({
      dateTime: value,
      // 同时更新字符串格式的tradeDate
      tradeDate: `${value[0]}-${value[1].toString().padStart(2, '0')}-${value[2].toString().padStart(2, '0')} ${value[3].toString().padStart(2, '0')}:${value[4].toString().padStart(2, '0')}`
    })
  },

  // 表单提交处理
  formSubmit: function (e) {
    // 交易类型
    const type = e.detail.value.type
    // 交易金额
    const balance = parseFloat(e.detail.value.balance) || 0
    // 备注
    const remark = e.detail.value.remark
    //总金额
    var totalBalance = this.data.totalBalance
    // 计算操作后的总金额
    if(type==0){
      totalBalance=totalBalance+balance
    }else{
      totalBalance=totalBalance-balance
    }

    // 调用云函数
    wx.cloud.callFunction({
      name:'saveAccountDetail',
      data:{
        accountId:this.data.accountId,
        tradeDate:this.data.tradeDate,
        balance:balance,
        totalBalance:totalBalance,
        type:type
      }
    }).then(res =>{
      console.log(res)
      this.updateAccount(this.data.accountId,totalBalance)
    }).catch(error =>{
      console.log(error)
    })
  },
  updateAccount: function(accountId, totalBalance) {
    
    wx.cloud.callFunction({
      name: 'updateAccount',
      data: {
        accountId: accountId,
        totalBalance: totalBalance
      }
    }).then(res => {
      console.log(res)
      wx.showToast({
        title: '创建成功',
        icon: 'success',
        duration:2000,
        success: function () {
          // 延迟执行返回操作，等提示框关闭后再返回
          setTimeout(() => {
            wx.navigateBack({
              delta: 2
            });
          }, 2000); 
        }
      })
    }).catch(error => {
      console.log(error)
    })
  }
})