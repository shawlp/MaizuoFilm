import api from '../api'
import axios from 'axios'

const state = {
    cinema: null
}

const actions = {
    getCinemaDetail({commit}, id) {
        commit('loading', true);
        axios.get(api.cinemadetail(id)).then(function(res) {
            if (res.status >= 200 && res.status < 300) {
                // console.log(res);
                commit('getCinemaDetail', res.data);
                commit('loading', false);
            }
        }).catch((error) => {
            return Promise.reject(error)
        })           
    }
}

const getters = {
    getCinemaDetail: state => state.cinema
}

const mutations = {
    getCinemaDetail(state, res) {
        // console.log("cdeta:");
        // console.log(res);
        state.cinema = res.data.cinema;
    }

}

export default {
    state,
    actions,
    getters,
    mutations
}
