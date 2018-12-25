const AV = require('../../libs/av-weapp-min.js');

Page({
  data: {
    todayMessageList:[],
    yesterdayMessageList:[],
    theDayBeforeYesterdayMessgeList:[]
  },
  onReady: function () {
    new AV.Query('Message')
      .descending('createdAt')
      .find()
      .then(message =>{
        let todayMonth = new Date().getMonth()
        let todayDay=new Date().getDate()
        let todayYear = new Date().getFullYear()
        let messageList=message.map((value,index)=>{
          let month=value.createdAt.getMonth()
          let day = value.createdAt.getDate()
          let year = value.createdAt.getFullYear()
          console.log(value.createdAt.getFullYear()+'-'+month+'-'+value.createdAt.getDate())
          let time=value.createdAt
          if (this.isYestday(time)){
            console.log('yestday')
          } else if (this.isBeforeYestday(time)) {
            console.log('beforeYestday')
          } else if (todayMonth===month && todayYear === year && todayDay===day){
            console.log('today')
          } else {
            console.log('wrong')
          }
          let userName=value.attributes.userName
          let content=value.attributes.content
          return {userName,content}
        })
        this.setData({ messageList })
      } )
      .catch(console.error);
  },
  isYestday(theDate) {
    var date = (new Date());    //当前时间
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(); //今天凌晨
    var yestday = new Date(today - 24 * 3600 * 1000).getTime();
    return theDate.getTime() < today && yestday <= theDate.getTime();
  },
  isBeforeYestday(theDate) {
    var date = (new Date());    //当前时间
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(); //今天凌晨
    var yestday = new Date(today - 24 * 3600 * 1000).getTime();
    var BeforeYestday = new Date(yestday - 24 * 3600 * 1000).getTime();
    return theDate.getTime() < yestday && BeforeYestday <= theDate.getTime();
  }
})