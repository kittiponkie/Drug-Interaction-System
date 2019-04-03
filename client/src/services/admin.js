import Api from '@/services/Api'

export default {  
  getAccount () {
    return Api().get("/allAccount")
  },
  changeStatusAccount (id,active) {
    return Api().put("/activeStatus/Account/"+id+"/"+active)
  },
  getPatient(id) {
    return Api().get("/PatientInfo/"+id)
  },
  getDoctor(id) {
    return Api().get("/DoctorInfo/"+id)
  },
  getPharmacist(id) {
    return Api().get("/PharmacistInfo/"+id)
  },
  addAdmin(params){
    return Api().post('/Register',params)
  }
}