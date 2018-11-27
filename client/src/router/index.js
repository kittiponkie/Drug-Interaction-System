import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/black-green-light.css'
Vue.use(VueMaterial)
//import 'vue-material/dist/theme/black-green-dark.css'
//import 'vue-material/dist/theme/default-dark.css'
//import 'vue-material/dist/theme/default.css'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);
//import 'bootstrap/dist/css/bootstrap.css'  //conflict with other tool

import VueLocalStorage from 'vue-localstorage' 
Vue.use(VueLocalStorage)

import login from '@/components/login'
import RegisterPatient from '@/components/Register/Patient'
import RegisterDoctor from '@/components/Register/Doctor'
import registerPharmacist from '@/components/Register/Pharmacist'
import Patient_Information from '@/components/userPatient/Patient_Information'

import Drug_Interaction from '@/components/Drug_Interaction'
import Drug_Information from '@/components/Drug_Information'
import HelloWorld from '@/components/HelloWorld' // not use
import Posts from '@/components/Posts' // test mongo
import NewPost from '@/components/NewPost' // test mongo
import EditPost from '@/components/EditPost' // test mongo
import interaction from '@/components/interaction' // not use

import Drug_History from '@/components/Drug_History'
import Patient_information from '@/components/Patient_information'

import Doctor_Information from '@/components/Doctor_Information'
import Admin_Accept from '@/components/Admin_Accept'



export default new VueRouter({
  mode: 'history',
  routes: [    
    {
      path: '/',
      name: 'home',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPatient
    },
    {
      path: '/register/patient',
      name: 'registerPatient',
      component: RegisterPatient
    },
    {
      path: '/register/doctor',
      name: 'registerDoctor',
      component: RegisterDoctor
    },
    {
      path: '/register/pharmacist',
      name: 'registerPharmacist',
      component: registerPharmacist
    },
    {
      path: '/patient_information',
      name: 'Patient_Information',
      component: Patient_Information
    },



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
      path: '/Drug_Information/:drugname',
      name: 'Drug_Information',
      component: Drug_Information
    }/*,
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
    },
    {
      path: '/Patient_information',
      name: 'Patient_information',
      component: Patient_information
    }*/,/*
    {
      path: '/Doctor_Information',
      name: 'Doctor_Information',
      component: Doctor_Information
    },
    {
      path: '/Admin_Accept',
      name: 'Admin_Accept',
      component: Admin_Accept
    },*/
    
  ]
})

