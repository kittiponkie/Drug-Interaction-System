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

//import 'v-slim-dialog/dist/v-slim-dialog.css'
import SlimDialog from 'v-slim-dialog'
Vue.use(SlimDialog)

import VueLocalStorage from 'vue-localstorage' 
Vue.use(VueLocalStorage)

import login from '@/components/Login/login'
import RegisterPatient from '@/components/Register/Patient'
import RegisterDoctor from '@/components/Register/Doctor'
import registerPharmacist from '@/components/Register/Pharmacist'
//patient
import Patient_Information from '@/components/userPatient/Patient_Information'
import Patient_Drug_History from '@/components/userPatient/Drug_History'
import Patient_Relation from '@/components/userPatient/Relation'
import Patient_Drug_Information from '@/components/userPatient/Drug_Information'
import Patient_Drug_Interaction from '@/components/userPatient/Drug_Interaction'
//doctor
import Doctor_Information from '@/components/userDoctor/Doctor_Information'
import Doctor_Relation from '@/components/userDoctor/Relation'
import Doctor_Drug_Information from '@/components/userDoctor/Drug_Information'
import Doctor_Drug_Interaction from '@/components/userDoctor/Drug_Interaction'

import Doctor_Patient_Information from '@/components/userDoctor/Patient_Information'
import Doctor_Order_Drug from '@/components/userDoctor/Order_Drug'
import Doctor_Drug_History from '@/components/userDoctor/Drug_History'
import Doctor_Doctor_Drug_Information from '@/components/userDoctor/Drug_Information_inside'
import Doctor_Doctor_Drug_Interaction from '@/components/userDoctor/Drug_Interaction_inside'


import Drug_Interaction from '@/components/Drug_Interaction'
import Drug_Information from '@/components/Drug_Information'



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

    //patient
    {
      path: '/patient_information',
      name: 'Patient_Information',
      component: Patient_Information
    },
    {
      path: '/patient_drug_history',
      name: 'Patient_drug_history',
      component: Patient_Drug_History
    },
    {
      path: '/patient_relation',
      name: 'Patient_Relation',
      component: Patient_Relation
    },
    {
      path: '/patient_drug_information',
      name: 'Patient_drug_information',
      component: Patient_Drug_Information
    },
    {
      path: '/patient_drug_information/:drugname',
      name: 'Patient_drug_information',
      component: Patient_Drug_Information
    },
    {
      path: '/patient_drug_interaction',
      name: 'Patient_drug_interaction',
      component: Patient_Drug_Interaction
    },

    //doctor    
    {
      path: '/doctor_information',
      name: 'Doctor_Information',
      component: Doctor_Information
    },
    {
      path: '/doctor_relation',
      name: 'Doctor_Relation',
      component: Doctor_Relation
    },
    {
      path: '/doctor_drug_information',
      name: 'Doctor_drug_information',
      component: Doctor_Drug_Information
    },
    {
      path: '/doctor_drug_information/:drugname',
      name: 'Doctor_drug_information',
      component: Doctor_Drug_Information
    },
    {
      path: '/doctor_drug_interaction',
      name: 'Doctor_drug_interaction',
      component: Doctor_Drug_Interaction
    },
    {
      path: '/doctor',
      name: 'Docto_Patient_Information',
      component: Doctor_Patient_Information
    },
    {
      path: '/doctor/patient_infomation',
      name: 'Docto_Patient_Information',
      component: Doctor_Patient_Information
    },
    {
      path: '/doctor/doctor_order_drug',
      name: 'Doctor_Order_Drug',
      component: Doctor_Order_Drug
    },
    {
      path: '/doctor/doctor_drug_history',
      name: 'Doctor_drug_history',
      component: Doctor_Drug_History
    },
    {
      path: '/doctor/doctor_drug_information',
      name: 'Doctor_drug_information',
      component: Doctor_Doctor_Drug_Information
    },
    {
      path: '/doctor/doctor_drug_information/:drugname',
      name: 'Doctor_drug_information',
      component: Doctor_Doctor_Drug_Information
    },
    {
      path: '/doctor/doctor_drug_interaction',
      name: 'Doctor_drug_interaction',
      component: Doctor_Doctor_Drug_Interaction
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
    }    
    /*{
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
    }*/    
  ]
})

