import api from '../api'
import axios from 'axios'

const state = {
    list: [],
    pageNo: 1,
    isMore: true
}

const actions = {
    getTicketList({commit}, pageNo) {
        commit('loading', true);
        axios.get(api.ticketlist(pageNo)).then(function(res) {
            if (res.status >= 200 && res.status < 300) {
                console.log(res);
                commit('getTicketList', res.data);
                commit('loading', false);
            }
        }).catch((error) => {
            return Promise.reject(error)
        })         
    },
    getMoreTicketList({commit}, pageNo) {
        commit('loading', true);
        axios.get(api.ticketlist(pageNo)).then(function(res) {
            if (res.status >= 200 && res.status < 300) {
                console.log(res);
                commit('getMoreTicketList', res.data);
                commit('loading', false);
            }
        }).catch((error) => {
            return Promise.reject(error)
        })        
    }
}

const getters = {
    getTicketList: state => state.list,
    isMore: state => state.isMore
}

const mutations = {
    getTicketList(state, res) {
        console.log(res.data.list);
        state.list = res.data.list;
    },
    getMoreTicketList(state, res) {
        console.log('getMoreTicketList');
        console.log('1111');

        let length = state.list.length;
        console.log(length);
        console.log(res.data);
        if (res.data !== null) {
            state.list = state.list.concat(res.data.list);
            // state.isMoreData = state.list.length == res.data.list.length ? false : true; 
        } else {
            console.log('1false1');
            state.isMore = false;
            console.log(state.isMore);
        }        
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}