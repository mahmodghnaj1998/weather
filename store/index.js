const state = () => ({
    loding: false,
    city: "",
    country: "",
    loction: null,
    current: null,
    forecast: null,
    error: null
})
const getters = {
    getLoding(state) {
        return state.loding
    },
    getCity(state) {
        return state.city
    },
    getCountry(state) {
        return state.country
    },
    getLoction(state) {
        return state.loction
    },
    getCurrent(state) {
        return state.current
    },
    getForecast(state) {
        return state.forecast
    },
    getError(state){
        return state.error
    }


}
const mutations = {
    loding(state, payload) {
        state.loding = payload
    },
    city(state, payload) {
        state.city = payload
    },
    country(state, payload) {
        state.country = payload
    },
    loction(state, payload) {
        state.city = payload.name
        state.country = payload.country
        state.loction = payload
    },
    forecast(state, payload) {
        state.forecast = payload
    },
    current(state, payload) {
        state.current = payload
    },
    error(state, paylod) {
        state.error = paylod
    }


}
const actions = {
    async getInfo({ commit }) {
        commit("loding", true)
        await this.$axios.$get(`https://api.ipdata.co?api-key=b073f14d214398027d520a6530da37cb157e9cda6fede6a29e0d9a3c`).then((re) => {
            commit("loding", false)
            if (re.city == null) {
                commit("city", re.country_name)
            } else {
                commit("city", re.city)
            }

            commit("country", re.country_name)

        }).catch(error => commit("loding", true))

    },
    async getWeather({ commit, state }) {
        let key = "6bd0f00f3b174f12905133315211404"
        await this.$axios.$get(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${state.city}&days=10&aqi=no&alerts=no`).then((re) => {
            commit("loction", re.location)
            commit("forecast", re.forecast)
            commit("current", re.current)


        }).catch(error => commit("loding", true))
    },
    async getWeatherSearch({ commit }, paylod) {
            let key = "6bd0f00f3b174f12905133315211404"
        await this.$axios.$get(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${paylod}&days=10&aqi=no&alerts=no`).then((re) => {
            commit("loction", re.location)
            commit("forecast", re.forecast)
            commit("current", re.current)
            commit("error", false)

        }).catch((error) => {
            commit("error", true)
            
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}