const state = {
    title: '',
    city: '深圳',
    leftNavState: false,
    loading: 0
}

const mutations = {
    changeLeftNavState(state, status) {
        state.leftNavState = status;
    },
    changeTitle(state, title) {
        state.title = title;
    },
    changeCity(state, city) {
        state.city = city;
        console.log(state.city);
    },
    loading(state, status) {
        if (state.loading == 0 && !status) {
            return ;
        }
        state.loading = status ? ++state.loading : --state.loading;
    }
}

const getters = {
    leftNavState: state => state.leftNavState,
    getTitle: state => state.title,
    getCity: state => state.city,
    loading: state => state.loading
}

const actions = {
    changeLeftNavState({commit}, status) {
        commit('changeLeftNavState', status);   
    },
    changeTitle({commit}, title) {
        commit('changeTitle', title);
    },
    changeCity({commit}, city) {
        commit('changeCity', city)
    },
    loading({commit}, status) {
        commit('loading', status);
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}