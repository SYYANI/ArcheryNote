function t(t) {
  var a = new Date(t), o = a.getFullYear(), n = a.getMonth() + 1, s = a.getDate();
  a.getHours(), a.getMinutes(), a.getSeconds();
  return o + "年" + e(n) + "月" + e(s) + "日";
}

function a(t) {
  console.log(t);
  var a = new Date(t), o = a.getHours(), n = a.getMinutes();
  return e(o) + ":" + e(n);
}

function e(t) {
  return (t = t.toString())[1] ? t : "0" + t;
}

var o = getApp();

Page({
  data: {
    
      bowImgs: {
          100001: "../images/bow1.png",
          100002: "../images/bow2.png",
          100003: "../images/bow3.png",
          100004: "../images/bow4.png"
      },
      bowName: {
        100001: "反曲弓",
        100004: "传统弓"
      },
      laneImgs: {
          // 100008: "../images/lane8.png",
          // 100009: "../images/lane10.png",
          // 100010: "../images/lane18.png",
          // 100011: "../images/lane30.png",
          // 100012: "../images/lane30.png",
          // 100013: "../images/lane50.png",
          // 100015: "../images/lane70.png",
          // 100017: "../images/lane90.png"
          100008: "../images/lane8.png",
          100009: "../images/lane10.png",
          100010: "../images/lane18.png",
          100011: "../images/lane30.png",
          100012: "../images/lane40.png",
          100013: "../images/lane50.png",
          100017: "../images/lane15.png"

      },
      laneName: {
          100008: "5米",
          100009: "10米",
          100017: "15米",
          100010: "20米",
          100011: "30米",
          100012: "40米",
          100013: "50米",
          // 100008: "8米",
          // 100009: "10米",
          // 100010: "20米",
          // 100011: "30米",
          // 100012: "30米",
      },
      targetImgs: {
          102001: "../images/targetthree.png",
          102002: "../images/targetfull.png",
          102003: "../images/targethalf.png",
          102004: "../images/targetfull.png",
          102005: "../images/targethalf.png",
          102006: "../images/targetfull.png",
          102008: "../images/targetfull.png",
          102009: "../images/targethalf.png"
      },
      scores: [],
      totalArrowNum: 0,
      totalSetNum: 0,
      page: 1,
      ready: 0,
      nodata: !1,
      hasPart: !1
  },
  makeDateString: function(dateObj) {
    return dateObj.getFullYear() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getDate();
  },
  transList: function(e) {
      var o = this;
      console.log("transList"), console.log(e);
      var n = o.data.scores;
      console.log(n);
      for (var s = 0; s < e.length; s++) {
          var r = t(e[s].createTime);
          e[s].time = a(e[s].createTime), console.log("createDate:" + r);
          for (var g = null, l = 0; l < n.length; l++) console.log(n[l].date + " " + r), n[l].date == r && (g = n[l]);
          if (console.log(g), g) g.list.push(e[s]); else {
              var i = [];
              i.push(e[s]), 
              n.push({
                  date: r,
                  list: i,
                  arrowNum: e[s].totalArrowNum,
                  setNum: e[s].totalSetNum
              });
          }
      }
      return console.log("transList-end"), console.log(n), n;
  },
  onLoad: function(t) {
      console.log("onLoad");
  },
  onReady: function() {
      wx.showToast({
          title: "加载中",
          icon: "loading",
          duration: 1e4
      });
      var t = this;
      const db = wx.cloud.database()
      db.collection('scores').where({
        _openid: this.data.openid
      }).get({
        success: res => {
            t.setData({
                scores: []
            }),
          t.setData({
            scores: t.transList(res.data)
          }), 
          t.setData({
            page: 1
          }), t.setData({
            ready: 1
          }), t.setData({
            nodata: 0 == res.data.length,
          }), t.setData({
              totalArrowNum: res.data.totalArrowNum
          }), t.setData({
                totalSetNum: res.data.totalSetNum
            }), wx.hideToast();
          console.log('[数据库] [查询记录] 成功: ', res)
          console.log('[数据库] [查询记录] 成功: ', res.data.length)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        }
      }),
       wx.getStorageSync("partSets") ? t.setData({
          hasPart: !0
      }) : t.setData({
          hasPart: !1
      });
  },
  onShow: function() {
      var t = this;
      if(1 == t.data.ready && o.globalData.refreshIndexList)
      {
        var t = this;
        const db = wx.cloud.database()
        db.collection('scores').where({
          _openid: this.data.openid
        }).get({
          success: res => {
              t.setData({
                  scores: []
              }),
            t.setData({
              scores: t.transList(res.data)
            }), 
            t.setData({
              page: 1
            }), t.setData({
              ready: 1
            }), t.setData({
              nodata: 0 == res.data.length,
            }), t.setData({
                totalArrowNum: res.data.totalArrowNum
            }), t.setData({
                  totalSetNum: res.data.totalSetNum
              }), wx.hideToast();
            console.log('[数据库] [查询记录] 成功: ', res)
            console.log('[数据库] [查询记录] 成功: ', res.data.length)
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '查询记录失败'
            })
            console.error('[数据库] [查询记录] 失败：', err)
          }
        })
      }
         o.globalData.refreshIndexList = !0, 
         wx.getStorageSync("partSets") ? t.setData({
          hasPart: !0
      }) : t.setData({
          hasPart: !1
      });
  },
  onHide: function() {},
  onUnload: function() {},
  onShareAppMessage: function() {
      return {
          title: "上海大学射艺记录本",
          desc: "记录成长！",
          path: "/pages/index/index"
      };
  },
  onReachBottom: function() {
      var t = this;
      console.log("onReachBottom"), 1 == t.data.ready && o.get("indexScores", {
          page: t.data.page + 1,
          limit: 10
      }, function(a) {
          t.setData({
              scores: t.transList(a.data)
          }), t.setData({
              page: t.data.page + 1
          });
      });
  },
  tapScore: function(t) {
      var a = this, e = t.currentTarget.dataset.partid, n = t.currentTarget.dataset.uuid;
      var b = a.data.scores
      var flag =false
      console.log(t.currentTarget.dataset), console.log("tapScore" + e), wx.showActionSheet({
        //   itemList: [ "详细", "删除" ],
          itemList: [ "删除" ],
          success: function(t) {
              t.cancel || (console.log(t.tapIndex), 
              1 == t.tapIndex ? wx.navigateTo({
                  url: "../part/view?partUuid=" + n
              }) : 0 == t.tapIndex && wx.showModal({
                  title: "操作",
                  content: "你确定要删除选择的记录吗？",
                  confirmText: "删除",
                  cancelText: "取消",
                  success: function(t) {
                      t.confirm ? o.getdelete(e) : console.log("用户点击辅助操作");
                      if(t.confirm)
                      {
                        a.onReady()
                      }
                  }
              }));
          }
      });
      //this.onReady()
      //
  }
});