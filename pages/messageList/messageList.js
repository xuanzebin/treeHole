const AV = require('../../libs/av-weapp-min.js');

Page({
  data: {
    messageList:[]
  },
  onReady: function () {
    new AV.Query('Message')
      .descending('createdAt')
      .find()
      .then(message =>{
        let messageList=message.map((value,index)=>{
          let userName=value.attributes.userName
          let content=value.attributes.content
          return {userName,content}
        })
        this.setData({ messageList })
      } )
      .catch(console.error);
  }
})