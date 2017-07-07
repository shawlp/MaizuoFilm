import api from '../api'
import axios from 'axios'

const state = {
    list: [],
    district: []
}

const actions = {
    getCinemaList({commit}) {
        commit('loading', true);
        axios.get(api.cinemalist).then(function(res) {
            if (res.status >= 200 && res.status < 300) {
                console.log(res);
                commit('getCinemaList', res.data);
                commit('loading', false);
            }
        }).catch((error) => {
            return Promise.reject(error)
        })          
    },
    getCinemaListById({commit}, id) {
        commit('loading', true);
        axios.get(api.cinemalistById(id)).then(function(res) {
            if (res.status >= 200 && res.status < 300) {
                console.log(res);
                commit('getCinemaList', res.data);
                commit('loading', false);
            }
        }).catch((error) => {
            return Promise.reject(error)
        })          
    }
}

const getters = {
    getCinemaList: state => state.list,
    getDistrict: state => state.district   
}

const mutations = {
    getCinemaList(state, res) {
        console.log('cinema');
        console.log(res.data.cinemas);

        let district = [], _json = {};

        for (let item of res.data.cinemas) {
            _json = {
                name: item.district.name,
                pinyin: item.district.pinyin
            }
            district.push(_json);
        }

        /**
         * 对象数组去重，根据str属性
         */
        Array.prototype.unique = function(str){
            const seen = new Map()
            return this.filter((a) => {
                return !seen.has(a['name']) && seen.set(a['name'], 1)
            })
        }

        district = district.unique('name').sort(function(a,b){
            return a.pinyin.localeCompare(b.pinyin.charAt(0))
        });

        console.log(district);

        state.district = district;
        state.list = res.data.cinemas;
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}