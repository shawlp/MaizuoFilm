import api from '../api'
import axios from 'axios'

const state = {
    banner: [],
    categories: [],
    advices: [],
    specials: [],
    themes: [],
    shopdesc: {},
    shopdetail: {}
}

const actions = {
    getShopList({commit}) {
        commit('loading', true);
        axios.get(api.shopApi).then(function(res) {
            if (res.status >= 200 && res.status < 300) {
                commit('getShopList', res.data);
                commit('loading', false);
            }
        }).catch((error) => {
            return Promise.reject(error)
        })        
    },
    getShopDesc({commit}, id) {
        commit('loading', true);
        axios.get(api.shopdesc(id)).then(function(res) {
            if (res.status >= 200 && res.status < 300) {
                commit('getShopDesc', res.data);
                commit('loading', false);
            }
        }).catch((error) => {
            return Promise.reject(error)
        })          
    },
    getShopDetail({commit}, id) {
        commit('loading', true);
        axios.get(api.shopdetail(id)).then(function(res) {
            if (res.status >= 200 && res.status < 300) {
                commit('getShopDetail', res.data);
                commit('loading', false);
            }
        }).catch((error) => {
            return Promise.reject(error)
        })         
    }
}

const getters = {
    getBanner: state => state.banner,
    getCategories: state => state.categories,
    getAdvices: state => state.advices,
    getSpecials: state => state.specials,
    getThemes: state => state.themes,
    getShopDesc: state => state.shopdesc,
    getShopDetail: state => state.shopdetail
}

const mutations = {
    getShopList(state, res) {
        console.log('getShopList');
        console.log(res.data);

        let list = res.data;
        let categories = [],
            banner = [],
            advices = [],
            specials = [],
            themes = [];
        
        list.map((item, index) => {
            if (index >= 0 && index <= 7) {
                categories.push(item);
            } else if (index >= 8 && index <= 10) {
                banner.push(item);
            } else if (index === 11 || index == 12) {
                advices.push(item);
            } else if (index >= 13 && index <= 15) {
                specials.push(item);
            } else if (index >= 16 && index <= 21) {
                themes.push(item);
            }            
        })

        console.log('categories:'+categories);
        // console.log('banner:'+banner);        
        // console.log('advices:'+advices);        
        // console.log('specials:'+specials);        
        // console.log('themes:'+themes); 

        state.categories = categories;
        state.banner = banner;
        state.advices = advices;
        state.specials = specials;
        state.themes = themes;                       
    },
    getShopDesc(state, res) {
        console.log('getShopDesc');
        console.log(res.data.desc);  
        state.shopdesc = res.data.desc      
    },
    getShopDetail(state, res) {
        console.log('getShopDetail');
        console.log(res.data);  
        state.shopdetail = res.data;         
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}