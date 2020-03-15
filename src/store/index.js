import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputVal: '你是人间四月天',
    nextId: 5,
    viewKey: 'all'
  },
  getters: {
    unDoneLenght (state) {
      return state.list.filter(x => x.done === false).length
    },
    infoList (state) {
      if (state.viewKey === 'all') {
        return state.list
      }
      if (state.viewKey === 'undone') {
        return state.list.filter(x => !x.done)
      }
      if (state.viewKey === 'done') {
        return state.list.filter(x => x.done)
      }
    }
  },
  mutations: {
    initList (state, list) {
      state.list = list
    },
    setInput (state, inputVal) {
      state.inputVal = inputVal
    },
    addItem (state) {
      var obj = {
        id: state.nextId,
        info: state.inputVal.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputVal = ''
    },
    deleteItem (state, id) {
      const i = state.list.findIndex(x => x.id === id)
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    cbStatus (state, param) {
      const i = state.list.findIndex(x => x.id === param.id)
      if (i !== -1) {
        state.list[i].done = param.status
      }
    },
    clearDone (state) {
      state.list = state.list.filter(x => x.done === false)
    },
    changeList (state, key) {
      state.viewKey = key
    }
  },
  actions: {
    getList (context) {
      axios.get('/list.json').then(({ data }) => {
        console.log(data)
        context.commit('initList', data)
      })
    }
  },
  modules: {
  }
})
