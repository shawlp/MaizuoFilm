import api from '../api'
import axios from 'axios'

const state = {
    nowPlayingList: [],
    comingSoonList: [],
    nowPage: 0,
    comingPage: 0
}

const actions = {
    // 获取热映列表
    getNowPlayList({commit}) {
        //console.log('出发了');
        commit('loading', true);
        axios.get(api.nowplaylist(state.nowPage)).then(function(res) {
            if (res.status >= 200 && res.status < 300) {
                //console.log(res);
                commit('getNowPlayList', res.data);
                commit('loading', false);
            }
        }).catch((error) => {
            return Promise.reject(error)
        }) 
    },
    getMoreNowPlayList({commit}, page) {
        commit('loading', true);        
        axios.get(api.nowplaylist(page)).then(function(res) {
            if (res.status >= 200 && res.status < 300) {
                //console.log(res);
                commit('getMoreNowPlayList', res.data);
                commit('loading', false);                
            }
        }).catch((error) => {
            return Promise.reject(error)
        })        
    },
    // 获取即将上映列表
    getComingList({commit}) {
        // console.log('出发了');     
        commit('loading', true);   
        axios.get(api.cominglist(state.comingPage)).then(function(res) {
            if (res.status >= 200 && res.status < 300) {
                //console.log(res);
                commit('getComingList', res.data);
                commit('loading', false);
            }
        }).catch((error) => {
            return Promise.reject(error)
        }) 
    },
    getMoreComingList({commit}, page) {
        commit('loading', true);   
        axios.get(api.cominglist(page)).then(function(res) {
            if (res.status >= 200 && res.status < 300) {
                //console.log(res);
                commit('getMoreComingList', res.data);
                commit('loading', false);
            }
        }).catch((error) => {
            return Promise.reject(error)
        })         
    }    
}


const getters = {
    getNowPlayList: state => state.nowPlayingList,
    getComingList: state => state.comingSoonList
}

const mutations = {
    getNowPlayList(state, res) {
        state.nowPlayingList = res.data.films;
    },
    getComingList(state, res) {
        state.comingSoonList = res.data.films;
    },
    getMoreNowPlayList(state, res) {
        console.log('getMoreNowPlayList');
        console.log('1111');
        console.log(state.nowPlayingList.length);
        console.log('total:' +  res.data.films.length);

        state.nowPlayingList = state.nowPlayingList.concat(res.data.films);

        console.log('2222');
        console.log(state.nowPlayingList.length);          
    },
    getMoreComingList(state, res) {
        console.log('getMoreComingList');
        console.log('1111');
        console.log(state.comingSoonList.length);
        console.log('total:' +  res.data.films.length);

        state.comingSoonList = state.comingSoonList.concat(res.data.films);

        console.log('2222');
        console.log(state.comingSoonList.length);        
    }    
}

export default {
    state,
    actions,
    getters,
    mutations
}