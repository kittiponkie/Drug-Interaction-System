import Api from '@/services/Api'

export default {
  //use model Account
  register (params) {
    return Api().post('Register', params)
  },

  //use model Patient 
  patientInfo (params) {
    return Api().post('/post/PatientInfo', params)
  }, 

  //use model Doctor
  doctorInfo (params) {
    return Api().post('/post/DoctorInfo', params)
  },

  //use model Pharmacist
  pharmacistInfo (params) {
    return Api().post('/post/PharmacistInfo', params)
  },
  
  //use model AllergicDrug
  allergicDrug (params) {
    return Api().post('/post/AllergicDrug', params)
  }
}