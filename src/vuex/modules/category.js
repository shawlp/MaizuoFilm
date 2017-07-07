import api from '../api'
import axios from 'axios'

const state = {
    category: {},
    itemList: [],
    hasMoreData: true
}

const actions = {
    getCategory({commit}, id) {
        commit('loading', true);
        axios.get(api.categorydetail(id)).then(function(res) {
            if (res.status >= 200 && res.status < 300) {
                commit('getCategory', res.data);
                commit('loading', false);
            }
        }).catch((error) => {
            return Promise.reject(error)
        })        
    },
    getItemList({commit}, {id, page = 1, num = 20}) {
        // console.log(api.categoryitems(id, page, num));
        commit('loading', true);
        axios.get(api.categoryitems(id, page, num)).then(function(res) {
            if (res.status >= 200 && res.status < 300) {
                // console.log(res.data);
                commit('getItemList', res.data);
                commit('loading', false);
            }
        }).catch((error) => {
            return Promise.reject(error)
        })         
    },
    getMoreItemList({commit}, {id, page, num = 20}) {
        axios.get(api.categoryitems(id, page, num)).then(function(res) {
            console.log('status:' + res.status);
            if (res.status >= 200 && res.status < 300) {
                // console.log(res.data);
                commit('getMoreItemList', res.data);
            }
        }).catch((error) => {
            return Promise.reject(error)
        })         
    }
}

const getters = {
    getCategory: state => state.category,
    getItemList: state => state.itemList,
    isMoreData: state => state.hasMoreData
}

const mutations = {
    getCategory(state, res) {
        // console.log('getCategory');
        // console.log(res.data);
        state.category = res.data;
    },
    getItemList(state, res) {
        // console.log('getItemList');
        // console.log(res.data);
        state.itemList = res.data.list;        
    },
    getMoreItemList(state, res) {
        console.log('getMoreItemList');
        console.log('1111');

        let length = state.itemList.length;
        console.log(length);
        console.log(res.data);
        if (res.data !== null) {
            state.itemList = state.itemList.concat(res.data.list);
            state.hasMoreData = state.itemList.length == res.data.list.length ? false : true; 
        } else {
            console.log('1false1');
            state.hasMoreData = false;
            console.log(state.hasMoreData);
        }

        // console.log('2223'); 
        // console.log(state.itemList.length);                   
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}