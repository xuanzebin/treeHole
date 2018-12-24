const AV = require('../../libs/av-weapp-min.js');

Page({
  data:{
    inputMessage:null,
    userName:null
  },
  onReady(e){
    const user = AV.User.current();
    // 调用小程序 API，得到用户信息
    wx.getUserInfo({
      success: ({ userInfo }) => {
        // 更新当前用户的信息
        user.set(userInfo).save().then(user => {
          // 成功，此时可在控制台中看到更新后的用户信息 
          console.log(user.toJSON())
          this.setData({ userName:user.toJSON().nickName})
        }).catch(console.error);
      }
    });
  },
  formSubmit(e){
    this.setData({ inputMessage: e.detail.value.textarea})
    console.log(this.data.userName,this.data.inputMessage)
    var Message = AV.Object.extend('Message');
    // 新建对象
    var message = new Message();
    // 设置名称
    message.set('userName', this.data.userName);
    // 设置优先级
    message.set('content', this.data.inputMessage);
    message.save().then( (todo)=> {
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000
      })
      console.log('objectId is ' + todo.id);
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