import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import UsersView from '../views/UsersView.vue'
import EditView from '../views/EditView.vue'
import axios from "axios"

function AdminAuth(to,from,next){
  if(localStorage.getItem('token') != undefined){

    const req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    }

    axios.post("http://localhost:8686/validate",{}, req).then(res => {
      console.log(res)
      next()
    }).catch(error => {
      console.log(error.response)
      next("/login") //Mandando pra rota /login
    })
  }else{
    next("/login")
  }

}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
  path: "/login",
  name: "login",
  component: LoginView
  },
  {
    path: "/admin/users",
    name: "Users",
    component: UsersView,
    beforeEnter: AdminAuth //Antes de entrar na rota tem a validaçao
  },
  {
    path: "/admin/users/edit/:id",
    name: "UserEdit",
    component: EditView,
    beforeEnter: AdminAuth

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
