import Vue from 'vue'
import VueRouter from 'vue-router'
import UsuarioView from '@/views/UsuarioView'
import EditoraView from "@/views/EditoraView"
import LivroView from '@/views/LivroView'
import AluguelView from '@/views/AluguelView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/usuarios',
    name: 'UsuarioView',
    component: UsuarioView
  },
  {
    path: '/editoras',
    name: 'EditoraView',
    component: EditoraView
  },
  {
    path: '/livros',
    name: 'LivroView',
    component: LivroView

  },
  {
    path: '/alugueis',
    name: 'AluguelView',
    component: AluguelView

  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
