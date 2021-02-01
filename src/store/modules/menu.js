const state = () => ({
    open: false,
})

const getters = {
    menuIsOpen: (state) => {
        return state.open
    }
}

const actions = {
    toggleMenu({commit, state}) {
        commit('SET_OPEN', !state.open)
    },

}

const mutations = {
    SET_OPEN(state, value) {
        state.open = value
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}