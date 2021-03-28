//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
    this.globalData = {}
  },
makeDateString: function(dateObj) {
  return dateObj.getFullYear() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getDate() + ' ' + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
  },
  get: function(o, n, e, s) {
    const db = wx.cloud.database()
    var myDate=new Date()
    // console.log(n.totalScoresSet)
    // console.log(n.totalScoresSet.length)
    var suml=0
    var suml1=[]
    var temp=0
    for (var i = 0;i<n.totalScoresSet.length ; i++)
    {
        //console.log(n.totalScoresSet[i])
        temp = 0
        for(var k=0;k<n.totalScoresSet[i].length;k++)
        {
          //console.log(n.totalScoresSet[i][k])
          temp = temp +  parseInt(n.totalScoresSet[i][k])
        }
        suml1.push(temp)
        suml = suml + temp
    }
    console.log(suml)
    console.log(suml1)
    // n.totalScoresSet.add("totalScore" , suml1)
    console.log(n.totalScoresSet)

    db.collection('scores').add({
      data: {
        createTime: this.makeDateString(myDate),
        //n,
        ruleTypeId: n.ruleTypeId,
        bowTypeId: n.bowTypeId,
        laneTypeId: n.laneTypeId,
        targetTypeId: n.targetTypeId,
        scores: n.totalScoresSet,
        totalArrowNum: (n.scores.length+1)/2,
        totalSetNum: (n.scores.length+1)/4,
        totalScore: suml,
        everySet: suml1
      },
      success: function(s) {
        console.log("---"), console.log(o), console.log(n), console.log(s.data), console.log("---"), 
        e(s);
      },
      fail: function(e) {
          console.log("---"), console.log(o), console.log(n), console.log(e.data), console.log("---"), 
          s && s(e);
    }
    })
    },
    getdelete: function(o) {
        const db = wx.cloud.database()
        db.collection('scores').doc(o).remove({
        success: res => {
          wx.showToast({
            title: '删除成功',
          })
          this.setData({
            counterId: '',
            count: null,
          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '删除失败',
          })
          console.error('[数据库] [删除记录] 失败：', err)
        }
      })
    }

    
})
