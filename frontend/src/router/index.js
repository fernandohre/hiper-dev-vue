import Vue from 'vue'
import VueRouter from 'vue-router'
import Cadastrar from '../components/pages/Cadastrar.vue'
import Alterar from '../components/pages/Alterar.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Cadastrar',
    component: Cadastrar
  },
  {
    path: '/alterar',
    name: 'Alterar',
    component: Alterar
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
