import api from '../api'
import axios from 'axios'

const state = {
    citylist: {}
}

const actions = {
    getCityList({commit}) {
        commit('loading', true);
        axios.get(api.citylist).then(function(res) {
            if (res.status >= 200 && res.status < 300) {
                console.log(res);
                commit('getCityList', res.data);
                commit('loading', false);
            }
        }).catch((error) => {
            return Promise.reject(error)
        })         
    }
}

const getters = {
    getCityList: state => state.citylist
}

const mutations = {
    getCityList(state, res) {
        // console.log('city');        
        // console.log(res.data.cities);

        let letters = [];
        let obj = {};
        let cities = res.data.cities;

        //生成大写字母
        for(var i = 65; i < 91; i++){
            letters.push(String.fromCharCode(i));
        }

        letters.map((item) => {
            obj[item] = [];    
        });


        cities.map((item1,index) => {
            letters.map((item2, index) => {
                if (item1.pinyin.startsWith(item2)) {
                    obj[item2].push(item1.name);
                }
            })
        });

        state.citylist = obj;
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}