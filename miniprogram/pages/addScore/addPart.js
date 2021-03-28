var e = getApp();

Page({
    data: {
        // show:false,
        bows: [
            {"id":"100001","content":"反曲弓"},
            {"id":"100004","content":"传统弓"}
        ],
        bowImgs: {
            100001: "../images/bow1.png",
            100002: "../images/bow2.png",
            100003: "../images/bow3.png",
            100004: "../images/bow4.png"
        },
        bowIndex: 1,
        lanes: [
            {"id":"100008","content":"5米"},
            {"id":"100009","content":"10米"},
            {"id":"100017","content":"15米"},
            {"id":"100010","content":"20米"},
            {"id":"100011","content":"30米"},
            {"id":"100012","content":"40米"},
            {"id":"100013","content":"50米"},
        ],
        laneImgs: {
            100008: "../images/lane8.png",
            100009: "../images/lane10.png",
            100010: "../images/lane18.png",
            100011: "../images/lane30.png",
            100012: "../images/lane40.png",
            100013: "../images/lane50.png",
            100017: "../images/lane15.png"
        },
        laneIndex: 0,
        targets: [
            {"id":"102009","content":"完美300"}
        ],
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
        targetIndex: 0,
        multRuleTypes: [
            {"id":"0","content":"4组/每组4支箭/共16支箭","code":"4/4/16"},
            {"id":"0","content":"2组/每组4支箭/共8支箭","code":"2/4/8"},
            // e.data.multRuleTypes[e.data.multRuleIndex].code.split("/")[0])
        ],
        multRuleIndex: 0,
        files: [],
        sets: [ [] ],
        setTotalScore: [ 0 ],
        setsSelected: [ [ "scoreSelected", "", "" ] ],
        selectedIndex: {
            setIndex: 0,
            scoreIndex: 0
        },
        setNum: 4,
        arrowNum: 4
    },
    bindBowPickerChange: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            bowIndex: e.detail.value
        }), wx.setStorageSync("partBowIndex", e.detail.value);
    },
    bindLanePickerChange: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            laneIndex: e.detail.value
        }), wx.setStorageSync("partLaneIndex", e.detail.value);
    },
    bindTargetPickerChange: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            targetIndex: e.detail.value
        }), wx.setStorageSync("partTargetIndex", e.detail.value);
    },
    bindMultRulePickerChange: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            multRuleIndex: e.detail.value
        }), wx.setStorageSync("partMultRuleIndex", e.detail.value), this.initSetInput();
    },
    chooseImage: function(e) {
        var t = this;
        wx.chooseImage({
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                t.setData({
                    files: t.data.files.concat(e.tempFilePaths)
                });
            }
        });
    },
    chooseScore: function(e) {
        var t = this;
        console.log(e.currentTarget.dataset);
        var a = parseInt(e.currentTarget.dataset.setindex), s = parseInt(e.currentTarget.dataset.scoreindex);
        this.setData({
            selectedIndex: {
                setIndex: a,
                scoreIndex: s
            }
        });
        for (var n = t.data.sets, r = [], l = 0; l < n.length; l++) r[l] = new Array(n[0].length);
        r[a][s] = "scoreSelected", this.setData({
            setsSelected: r
        });
    },
    inputScore: function(e) {
        var t = this, a = t.data.setNum, s = t.data.arrowNum, n = e.currentTarget.dataset.score;
        console.log("inputScore score ", n);
        var r = t.data.sets, l = t.data.selectedIndex.setIndex, o = t.data.selectedIndex.scoreIndex;
        r[l][o] = n;
        for (var d = 0, c = r[l], g = 0; g < c.length; g++) "" == c[g] || "M" == c[g] || ("X" == c[g] ? d += 10 : d += parseInt(c[g]));
        var i = t.data.setTotalScore;
        if (i[l] = d, o < s - 1) o++; else if (o == s - 1 && l < a - 1) {
            if (l++, o = 0, r.length <= l) {
                for (var S = new Array(s), g = 0; g < s; g++) S[g] = "";
                r[l] = S;
            }
            i.push(0);
        }
        this.setData({
            sets: r
        }), this.setData({
            setTotalScore: i
        }), this.setData({
            selectedIndex: {
                setIndex: l,
                scoreIndex: o
            }
        });
        for (var x = [], g = 0; g < r.length; g++) x[g] = new Array(r[0].length);
        x[l][o] = "scoreSelected", this.setData({
            setsSelected: x
        }), wx.setStorageSync("partSets", r), wx.setStorageSync("partSetTotalScore", i), 
        wx.setStorageSync("partSelectedIndex", t.data.selectedIndex), wx.setStorageSync("partSetsSelected", t.data.setsSelected);
    },
    delScore: function(e) {
        var t = this, a = t.data.sets, s = (t.data.setNum, t.data.arrowNum, t.data.selectedIndex.setIndex), n = t.data.selectedIndex.scoreIndex;
        if ("" === a[s][n] && n > 0) {
            n--, this.setData({
                selectedIndex: {
                    setIndex: s,
                    scoreIndex: n
                }
            });
            for (var r = [], l = 0; l < a.length; l++) r[l] = new Array(a[0].length);
            r[s][n] = "scoreSelected", this.setData({
                setsSelected: r
            });
        } else a[s][n] = "", this.setData({
            sets: a
        });
        for (var o = 0, d = a[s], l = 0; l < d.length; l++) "" == d[l] || "M" == d[l] || ("X" == d[l] ? o += 10 : o += parseInt(d[l]));
        var c = t.data.setTotalScore;
        c[s] = o, this.setData({
            setTotalScore: c
        }), wx.setStorageSync("partSets", a), wx.setStorageSync("partSetTotalScore", c), 
        wx.setStorageSync("partSelectedIndex", t.data.selectedIndex), wx.setStorageSync("partSetsSelected", t.data.setsSelected);
    },
    saveScore: function() {
        for (var t = this, a = t.data.sets, s = !1, n = 0; n < a.length; n++) for (var r = 0; r < a[n].length; r++) "" == a[n][r] && (s = !0);
        // console.log("999"+a[0].length)
        if (s || a[0].length < 4) wx.showModal({
            content: "每一支箭都需要记!",
            showCancel: !1,
            success: function(e) {
                e.confirm && console.log("用户点击确定");
            }
        }); else {
            var l = {
                ruleTypeId: t.data.multRuleTypes[t.data.multRuleIndex].id,
                bowTypeId: t.data.bows[t.data.bowIndex].id,
                laneTypeId: t.data.lanes[t.data.laneIndex].id,
                targetTypeId: t.data.targets[t.data.targetIndex].id,
                scores: t.data.sets.join(","),
                totalScoresSet: t.data.sets
            };
            wx.showToast({
                title: "保存中",
                icon: "loading",
                duration: 1e4
            }), 
            e.get("score/add", l, function(e) {
                console.log(e.data), wx.setStorageSync("partSets", null), wx.setStorageSync("partSetTotalScore", [ 0 ]), 
                wx.setStorageSync("partSelectedIndex", null), wx.setStorageSync("partSetsSelected", null), 
                wx.hideToast(), wx.navigateBack({
                    delta: 1
                });
            });
        }
    },
    tapCancelScore: function(e) {
        wx.showModal({
            title: "操作",
            content: "你确定要放弃本场记分吗？",
            confirmText: "放弃",
            cancelText: "取消",
            success: function(e) {
                e.confirm && (wx.setStorageSync("partSets", null), wx.setStorageSync("partSetTotalScore", [ 0 ]), 
                wx.setStorageSync("partSelectedIndex", null), wx.setStorageSync("partSetsSelected", null), 
                wx.navigateBack({
                    delta: 1
                }));
            }
        });
    },
    // onReady: function() {
    //     var t = this;
    //     e.get("dict/bowTypes", {}, function(e) {
    //         console.log(e.data), t.setData({
    //             bows: e.data
    //         }), wx.getStorageSync("partBowIndex") && t.setData({
    //             bowIndex: wx.getStorageSync("partBowIndex")
    //         });
    //     }), e.get("dict/laneTypes", {}, function(e) {
    //         console.log(e.data), t.setData({
    //             lanes: e.data
    //         }), wx.getStorageSync("partLaneIndex") && t.setData({
    //             laneIndex: wx.getStorageSync("partLaneIndex")
    //         });
    //     }), e.get("dict/targetTypes", {}, function(e) {
    //         console.log(e.data), t.setData({
    //             targets: e.data
    //         }), wx.getStorageSync("partTargetIndex") && t.setData({
    //             targetIndex: wx.getStorageSync("partTargetIndex")
    //         });
    //     }), e.get("dict/multRuleTypes", {}, function(e) {
    //         console.log(e.data), t.setData({
    //             multRuleTypes: e.data
    //         }), wx.getStorageSync("partMultRuleIndex") && t.setData({
    //             multRuleIndex: wx.getStorageSync("partMultRuleIndex")
    //         }), t.initSetInput(), wx.getStorageSync("partSets") && t.setData({
    //             sets: wx.getStorageSync("partSets")
    //         }), wx.getStorageSync("partSetTotalScore") && t.setData({
    //             setTotalScore: wx.getStorageSync("partSetTotalScore")
    //         }), wx.getStorageSync("partSelectedIndex") && t.setData({
    //             selectedIndex: wx.getStorageSync("partSelectedIndex")
    //         }), wx.getStorageSync("partSetsSelected") && t.setData({
    //             setsSelected: wx.getStorageSync("partSetsSelected")
    //         });
    //     });
    // },
    initSetInput: function() {
        var e = this, t = parseInt(e.data.multRuleTypes[e.data.multRuleIndex].code.split("/")[0]);
        this.setData({
            setNum: t
        });
        console.log(e.data.multRuleTypes[e.data.multRuleIndex].code.split("/"))
        var a = parseInt(e.data.multRuleTypes[e.data.multRuleIndex].code.split("/")[1]);
        this.setData({
            arrowNum: a
        });
        for (var s = [], n = new Array(a), r = 0; r < a; r++) n[r] = "";
        s[0] = n, this.setData({
            sets: s
        });
        for (var l = [], r = 0; r < s.length; r++) l[r] = new Array(s[0].length);
        l[0][0] = "scoreSelected", this.setData({
            setsSelected: l
        }), this.setData({
            selectedIndex: {
                setIndex: 0,
                scoreIndex: 0
            }
        });
    }
});