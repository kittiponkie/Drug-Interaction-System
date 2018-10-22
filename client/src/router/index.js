import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld' // not use
import Posts from '@/components/Posts' // test mongo
import NewPost from '@/components/NewPost' // test mongo
import EditPost from '@/components/EditPost' // test mongo
import interaction from '@/components/interaction' // not use
import Drug_Interaction from '@/components/Drug_Interaction'
import Drug_Information from '@/components/Drug_Information'
import Drug_History from '@/components/Drug_History'

// import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

// import 'vue-material/dist/theme/black-green-dark.css'
import 'vue-material/dist/theme/black-green-light.css'

// import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/Drug_Interaction',
      name: 'Drug_Interaction',
      component: Drug_Interaction
    },
    {
      path: '/Drug_Information',
      name: 'Drug_Information',
      component: Drug_Information
    },
    {
      path: '/Drug_History',
      name: 'Drug_History',
      component: Drug_History
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/posts/new',
      name: 'NewPost',
      component: NewPost
    },
    {
      path: '/posts/:id',
      name: 'EditPost',
      component: EditPost
    },
    {
      path: '/drug_info',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/drug_info/:Drug_Name/:id',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/interaction',
      name: 'interaction',
      component: interaction
    }
  ]
})
// import 'vue-material/dist/theme/default-dark.css'
// import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)

Vue.use(VueRouter)
