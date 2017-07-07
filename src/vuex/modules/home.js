import api from '../api'
import axios from 'axios'

const state = {
    banner: [],
    nowplay: [],
    coming: []
}

const mutations = {
    getBannerList(state, res) {
        //console.log('触发了getBannerList mutations');
        state.banner = res.data.billboards
    },
    getNowPlaying(state, res) {
        //console.log('触发了getNowPlaying mutations');
        state.nowplay = res.data.films
        //console.log(state.nowplay);
    },
    getComingSoon(state, res) {
        state.coming = res.data.films;
    }

}

const getters = {
    getBannerList: state => state.banner,
    getNowPlaying: state => state.nowplay,
    getComingSoon: state => state.coming
}

const actions = {
    // 获取banner列表
    getBannerList({commit}) {
        //console.log('触发了getBannerList actions');
        commit('loading', true);
        axios.get(api.bannerApi).then(function(res) {
            if (res.status >= 200 && res.status < 300) {
                commit('getBannerList', res.data);
                commit('loading', false);
            }
        }).catch((error) => {
            return Promise.reject(error)
        })
    },

    // 获取热映
    getNowPlaying({commit}) {
        //console.log('触发了getBannerList actions');
        commit('loading', true);
        axios.get(api.nowplayingApi).then(function(res) {
            if (res.status >= 200 && res.status < 300) {
                //console.log(res);
                commit('getNowPlaying', res.data);
                commit('loading', false);
            }
        }).catch((error) => {
            return Promise.reject(error)
        })
    },

    //获取即将上映
    getComingSoon({commit}) {
        console.log('触发了getComingSoon actions');
        commit('loading', true);
        axios.get(api.comingApi).then(function(res) {
            if (res.status >= 200 && res.status < 300) {
                console.log(res);
                commit('getComingSoon', res.data);
                commit('loading', false);
            }
        }).catch((error) => {
            return Promise.reject(error)
        })
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}