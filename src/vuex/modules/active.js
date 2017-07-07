import api from '../api'
import axios from 'axios'

const state = {
    active: {},
    activeList: [],
    recommendList: [],
    hasMoreData: true
}

const actions = {
    getActive({commit}, id) {
        commit('loading', true);
        axios.get(api.active(id)).then(function(res) {
            if (res.status >= 200 && res.status < 300) {
                commit('getActive', res.data);
                commit('loading', false);
            }
        }).catch((error) => {
            return Promise.reject(error)
        })        
    },
    getActiveList({commit}, {id, page = 1, pageSize = 30}) {
        commit('loading', true);
        axios.get(api.activing(id, page, pageSize)).then(function(res) {
            if (res.status >= 200 && res.status < 300) {
                // console.log(res.data);
                commit('getActiveList', res.data);
                commit('loading', false);
            }
        }).catch((error) => {
            return Promise.reject(error)
        })
    },
    getRecommendList({commit}, {page = 1, num = 20}) {
        commit('loading', true);
        axios.get(api.recommend(page, num)).then(function(res) {
            if (res.status >= 200 && res.status < 300) {
                // console.log(res.data);
                commit('getRecommendList', res.data);
                commit('loading', false);
            }
        }).catch((error) => {
            return Promise.reject(error)
        })        
    },
    getMoreRecommendList({commit}, {page, num = 20}) {
        axios.get(api.recommend(page, num)).then(function(res) {
            if (res.status >= 200 && res.status < 300) {
                commit('getMoreRecommendList', res.data);
            }
        }).catch((error) => {
            return Promise.reject(error)
        })         
    },
    getMoreActiveList({commit}, {id, page, pageSize = 30}) {
        commit('loading', true);
        axios.get(api.activing(id, page, pageSize)).then(function(res) {
            if (res.status >= 200 && res.status < 300) {
                // console.log(res.data);
                commit('getMoreActiveList', res.data);
                commit('loading', false);
            }
        }).catch((error) => {
            return Promise.reject(error)
        })
    },
}

const getters = {
    getActive: state => state.active,
    getActiveList: state => state.activeList,
    getRecommendList: state => state.recommendList,
    hasMoreData: state => state.hasMoreData
}

const mutations = {
    getActive(state, res) {
        // console.log('getActive');
        // console.log(res.data.data);
        state.active = res.data.data;
    },
    getActiveList(state, res) {
        // console.log('getActiveList');
        // console.log(res.data.products);
        state.activeList = res.data.products;
    },
    getRecommendList(state, res) {
        console.log('getRecommendList');
        console.log(res.data.list);
        state.recommendList = res.data.list;     
    },
    getMoreRecommendList(state, res) {
        console.log('getMoreRecommendList');
        console.log('1111');
        console.log(state.recommendList.length);
        state.recommendList = state.recommendList.concat(res.data.list);
        state.hasMoreData = state.recommendList.length == res.data.total ? false : true; 

        console.log('2222');
        console.log(state.recommendList.length);       
    },
    getMoreActiveList(state, res) {
        console.log('getMoreActiveList');
        console.log('1111');
        console.log(state.activeList.length);
        console.log('total:' +  res.data.products.length);
        let total = res.data.products.length;
        state.activeList = state.activeList.concat(res.data.products);
        state.hasMoreData = total === 0 ? false : true; 

        console.log('2222');
        console.log(state.activeList.length);       
        
    }    
}

export default {
    state,
    actions,
    getters,
    mutations
}