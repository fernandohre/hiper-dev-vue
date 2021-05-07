import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    produtos: []
  },
  mutations: {
    adicionarProdutoMutation(state, novoProduto) {
      state.produtos.push(novoProduto);
    },
    atualizarProdutoMutation(state, produto) {
      let itemAntigo = state.produtos.find(item => item.id === produto.id);
      let indiceDoItemAntigo = state.produtos.indexOf(itemAntigo);
      state.produtos[indiceDoItemAntigo] = produto;
    },
    removerProdutoMutation(state, idProduto) {
      let itemAntigo = state.produtos.find(item => item.id === idProduto);
      let indiceDoItemAntigo = state.produtos.indexOf(itemAntigo);
      state.produtos.splice(indiceDoItemAntigo, 1);
    }
  },
  actions: {
    adicionarProdutoAction({ commit }, novoProduto) {
      commit('adicionarProdutoMutation', novoProduto)
    },
    atualizarProdutoAction({ commit }, produto) {
      commit('atualizarProdutoMutation', produto);
    },
    removerProdutoAction({ commit }, idProduto) {
      commit('removerProdutoMutation', idProduto);
    }
  }
})
