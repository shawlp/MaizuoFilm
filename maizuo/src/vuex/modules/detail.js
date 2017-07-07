import api from '../api'
import axios from 'axios'

const state = {
    detail: null
}

const mutations = {
    getFilmDetail(state, res) {
        state.detail = res.data.film;
    }
}

const getters = {
    getFilmDetail: state => state.detail
}

const actions = {
    getFilmDetail({commit}, id) {
        // console.log(api.filmdetail(id));
        commit('loading', true);
        axios.get(api.filmdetail(id)).then(function(res) {
            if (res.status >= 200 && res.status < 300) {
                // console.log(res);
                commit('getFilmDetail', res.data);
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
