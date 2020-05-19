import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

let store = new Vuex.Store({
    state: {
        recommendData:{},   //推荐页全部数据
        rankingList: [],  //排行榜
        hotList: [],        //热门搜索
        input2: '',      //当前搜索内容
        searchList: [],  //搜索歌曲列表
        musicInfo:{},      //歌曲信息
        purl: undefined,        //歌曲链接
        otherAlbum: {},        //歌手和专辑信息
        topList:[]              //排行榜歌曲
        

        
    },

    mutations: {
        //推荐页全部数据
        getRecommend(state,payload){
            state.recommendData = payload.data.data
        },

        // 排行榜
        getRankingList(state, payload) {
            state.rankingList = payload.data.data
        },





        // 热门搜索
        getHotList(state, payload) {
            state.hotList = payload
            console.log(payload)
        },



        // 改变当前搜索内容
        changeInput2(state, payload) {
            state.input2 = payload
        },

        // 搜索歌曲列表
        getSearchList(state, payload) {
            state.searchList = payload
        },


        // 获取歌曲信息
        getMusic(state, payload) {
            console.log(payload.data.code)
            if(payload.data.code == 0){
                state.musicInfo = payload
            }
        },

        // 歌曲链接
        getpurl(state, payload) {
            console.log(payload,7777777777)
            state.purl = payload
        },

        // 专辑与歌手信息
        getOtherAlbum(state, payload) {
            state.otherAlbum = payload
        },


        // 排行榜歌曲
        getToplist(state,payload){
            state.topList = payload
        },
        
    },
    actions: {

        // 推荐页全部数据
        getRecommend(context) {
            axios('/api/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', {
                params: {
                    g_tk: 5381,
                    uin: 0,
                    format: 'json',
                    inCharset: 'utf-8',
                    outCharset: 'utf-8',
                    notice: 0,
                    platform: 'h5',
                    needNewCode: 1,
                    _: 1545886811612
                }
            }).then(data => {
                context.commit('getRecommend',data)
            }, error => {
                console.log(error)
            })
        },


        // 排行榜
        getRankingList(context) {
            let date = new Date().getTime()
            axios('/api/v8/fcg-bin/fcg_myqq_toplist.fcg', {
                params: {
                    g_tk: 5381,
                    uin: 0,
                    format: 'json',
                    inCharset: 'utf-8',
                    outCharset: 'utf-8',
                    notice: 0,
                    platform: 'h5',
                    needNewCode: 1,
                    _: date,
                }
            }).then(data => {
                context.commit('getRankingList', data)
            }).catch(error => {
                console.log(error)
            })

        },

        // 热门搜索
        getHotList(context) {
            let date = new Date().getTime()
            axios('/api/splcloud/fcgi-bin/gethotkey.fcg', {
                params: {
                    g_tk: 5381,
                    uin: 0,
                    format: 'json',
                    inCharset: 'utf-8',
                    outCharset: 'utf-8',
                    notice: 0,
                    platform: 'h5',
                    needNewCode: 1,
                    _: date
                }
            }).then(response => {
                context.commit('getHotList', response.data.data)
            }).catch(error => {
                console.log(error)
            })
        },

        // 搜索歌曲列表
        getSearchSongList(context, w, p) {
            let date = new Date().getTime()
            axios('/api/soso/fcgi-bin/search_for_qq_cp', {
                params: {
                    g_tk: 5381,
                    uin: 0,
                    format: 'json',
                    inCharset: 'utf-8',
                    outCharset: 'utf-8',
                    notice: 0,
                    platform: 'h5',
                    needNewCode: 1,
                    w: w,
                    zhidaqu: 1,
                    catZhida: 1,
                    t: 0,
                    flag: 1,
                    ie: 'utf-8',
                    sem: 1,
                    aggr: 0,
                    perpage: 20,
                    n: 20,
                    p: p,
                    remoteplace: 'txt.mqq.all',
                    _: date
                }
            }).then(response => {
                var data = response.data.data.song.list
                context.commit('getSearchList', data)
            }).catch(error => {
                console.log(error)
            })
        },


        // 获取歌曲信息
        getmusicu(context, songid) {
            axios.defaults.transformRequest = [function (data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }]
            let date = new Date().getTime()
            axios({
                url: '/vkey/cgi-bin/musicu.fcg?_=' + date,
                method: 'post',
                data: {

                },
                transformRequest: [function () {
                    return `{"comm":{"g_tk":5381,"uin":1666584574,"format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"h5","needNewCode":1},"detail":{"module":"music.pf_song_detail_svr","method":"get_song_detail","param":{"song_id":${songid}}},"simsongs":{"module":"rcmusic.similarSongRadioServer","method":"get_simsongs","param":{"songid":${songid}}},"gedan":{"module":"music.mb_gedan_recommend_svr","method":"get_related_gedan","param":{"sin":0,"last_id":0,"song_type":1,"song_id":${songid}}},"video":{"module":"MvService.MvInfoProServer","method":"GetSongRelatedMv","param":{"songid":"${songid}","songtype":1,"lastmvid":0,"num":5}}}`
                }],
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(response => {
                context.dispatch("getaudiovkey",  response.data.detail.data.track_info.mid);
                context.commit('getMusic', response)
                console.log('wedwedwe');
                console.log(response.data.detail.data.track_info.album.id)
                context.dispatch("getOtherAlbum", response.data.detail.data.track_info.album.id);
            }).catch(error => {
                console.log(error)
            })
        },


        // 获取歌曲链接
        getaudiovkey(context, songmid, callback) {
            axios('/vkey/cgi-bin/musicu.fcg', {
                //  base/fcgi-bin/fcg_music_express_mobile3.fcg
                // cgi-bin/musicu.fcg
                params: {
                    '-': 'getplaysongvkey18692067669581247',
                    g_tk: 5381,
                    loginUin: 0,
                    hostUin: 0,
                    format: 'json',
                    inCharset: 'utf8',
                    outCharset: 'utf-8',
                    notice: 0,
                    platform: 'yqq.json',
                    needNewCode: 0,
                    data: `{"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"1595362978","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"1595362978","songmid":["${songmid}"],"songtype":[0],"uin":"0","loginflag":1,"platform":"20"}},"comm":{"uin":0,"format":"json","ct":20,"cv":0}}`
                },
                headers: {
                    'content-type': 'text/plain; charset=utf-8'
                }
            }).then(response => {
                context.commit('getpurl', response.data.req_0.data.midurlinfo[0].purl)
                
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
        },

        // 歌手与专辑
        getOtherAlbum(context, albummid, callback) {
            let date = new Date().getTime()
            axios('/api/v8/fcg-bin/fcg_v8_album_info_cp.fcg', {
                params: {
                    albumid: albummid,
                    g_tk: 5381,
                    uin: 0,
                    format: 'json',
                    inCharset: 'utf-8',
                    outCharset: 'utf-8',
                    notice: 0,
                    platform: 'h5',
                    needNewCode: 1,
                    _: date
                }
            }).then(response => {
                console.log('aaaaaaaaaa')
                context.commit('getOtherAlbum', response)
                // callback(response)
            }).catch(error => {
                // callback(error)
            })
        },




        getToplist(context,topid) {
            let date = new Date().getTime()
            axios('/api/v8/fcg-bin/fcg_v8_toplist_cp.fcg', {
                params: {
                    g_tk: 5381,
                    uin: 0,
                    format: 'json',
                    inCharset: 'utf-8',
                    outCharset: 'utf-8',
                    notice: 0,
                    platform: 'h5',
                    needNewCode: 1,
                    tpl: 3,
                    page: 'detail',
                    type: 'top',
                    topid: topid,
                    _: date
                }
            }).then(response => {
                 context.commit('getToplist',response)
            }).catch(error => {
                console.log(error)
            })
        },

         
        
        
    },

})


export default store