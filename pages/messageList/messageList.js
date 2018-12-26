const AV = require('../../libs/av-weapp-min.js');
const moment=require('../../libs/moment.min.js')

// var now=moment()
// console.log(now.add(1,"days").format('YYYY-MM-DD'))

Page({
  data: {
    todayMessageList:[],
    yesterdayMessageList:[],
    theDayBeforeYesterdayMessgeList:[],
    time:null,
    timeButtonCheck:0
  },
  onReady: function () {
    this.setData({time:moment().format('YYYY-MM-DD')})
    console.log(moment().add(-1, "days").format('YYYY-MM-DD'))
    new AV.Query('Message')
      .descending('createdAt')
      .find()
      .then(message =>{
        let todayMonth = new Date().getMonth()
        let todayDay=new Date().getDate()
        let todayYear = new Date().getFullYear()

        let todayMessageList = this.data.todayMessageList
        let yesterdayMessageList = this.data.yesterdayMessageList
        let theDayBeforeYesterdayMessgeList = this.data.theDayBeforeYesterdayMessgeList

        message.forEach((value,index)=>{
          let month=value.createdAt.getMonth()
          let day = value.createdAt.getDate()
          let year = value.createdAt.getFullYear()
          let time=value.createdAt

          let userName = value.attributes.userName
          let content = value.attributes.content

          if (this.isYestday(time)){
            yesterdayMessageList.push({ userName, content})
          } else if (this.isBeforeYestday(time)) {
            theDayBeforeYesterdayMessgeList.push({ userName, content})
          } else if (todayMonth===month && todayYear === year && todayDay===day){
            todayMessageList.push({ userName, content })
          } 
        })
        this.setData({ todayMessageList, yesterdayMessageList, theDayBeforeYesterdayMessgeList})
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
  },
  reduceDay(){
    if (this.data.timeButtonCheck===2) return 
    let time=this.data.time
    let timeButtonCheck=this.data.timeButtonCheck
    timeButtonCheck++
    time = moment(time).add(-1, 'days').format('YYYY-MM-DD')
    this.setData({
      time,
      timeButtonCheck
    })

  }, 
  addDay() {
    if (this.data.timeButtonCheck ===0) return 
    let time = this.data.time
    let timeButtonCheck = this.data.timeButtonCheck
    timeButtonCheck--
    time = moment(time).add(1, 'days').format('YYYY-MM-DD')
    this.setData({
      time,
      timeButtonCheck
    })
    console.log(this.data.timeButtonCheck)
  }
})