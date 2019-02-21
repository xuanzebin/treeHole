const AV = require('../../libs/av-weapp-min.js');
const app=getApp()
Page({
  data:{
    inputMessage:null,
    userName:null,
    todayMessage: app.data.todayMessageList.length,
    anonymous:false
  },
  onReady(e){
    const user = AV.User.current();
    // 调用小程序 API，得到用户信息
    wx.getUserInfo({
      success: ({ userInfo }) => {
        // 更新当前用户的信息
        user.set(userInfo).save().then(user => {
          // 成功，此时可在控制台中看到更新后的用户信息 
          console.log('123',user.toJSON())
          this.setData({ userName:user.toJSON().nickName})
        }).catch(console.error);
      }
    });
  }, 
  onShow(e){
    console.log('messageLength',this.data.todayMessage)
    this.setData({
      todayMessage: app.data.todayMessageList.length
    })
  },
  bindKeyInput(e){
    this.setData({
      inputMessage: e.detail.value//将input至与data中的inputValue绑定
    })
  },
  switchChange(e){
    console.log(e.detail.value)
    this.setData({
      anonymous: e.detail.value
    })
  },
  formSubmit(e){
    if(!this.data.inputMessage){
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: 1000
      })
      return 
    }
    var Message = AV.Object.extend('Message');
    // 新建对象
    var message = new Message();
    // 设置名称
    console.log('anonymous',this.data.anonymous)
    if (this.data.anonymous) {
      message.set('userName', '匿名')
    } else {
      message.set('userName', this.data.userName)
    }
    // 设置优先级
    message.set('content', this.data.inputMessage)
    message.set('show',false)
    message.save().then( (todo)=> {
      this.setData({
        todayMessage: app.data.todayMessageList.length
      })
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000
      })
    }, function (error) {
      console.error(error);
    });
  },
  intoMessageList(){
    wx.navigateTo({
      url: '../messageList/messageList',
    })
  }
})