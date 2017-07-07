import api from '../api'
import axios from 'axios'

const state = {
    ticket: null,
    ticketdescription: null
}

const actions = {
    getTicketDetail({commit}, id) {
        commit('loading', true);
        axios.get(api.ticketdetail(id)).then(function(res) {
            if (res.status >= 200 && res.status < 300) {
                console.log(res);
                commit('getTicketDetail', res.data);
                commit('loading', false);
            }
        }).catch((error) => {
            return Promise.reject(error)
        })           
    },
    getTicketDescription({commit}, id) {
        commit('loading', true);
        axios.get(api.ticketdescription(id)).then(function(res) {
            if (res.status >= 200 && res.status < 300) {
                console.log(res);
                commit('getTicketDescription', res.data);
                commit('loading', false);
            }
        }).catch((error) => {
            return Promise.reject(error)
        })           
    }    
}

const getters = {
    getTicketDetail: state => state.ticket,
    getTicketDescription: state => state.ticketdescription
}

const mutations = {
    getTicketDetail(state, res) {
        // console.log("ticket");
        // console.log(res.data);
        state.ticket = res.data;
    },
    getTicketDescription(state, res) {
        // console.log('ticket-desc');
        // console.log(res.data.desc);
         state.ticketdescription = res.data.desc;       
    }

}

export default {
    state,
    actions,
    getters,
    mutations
}
