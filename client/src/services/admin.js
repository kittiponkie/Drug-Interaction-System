import Api from '@/services/Api'

export default {  
  getAccount () {
    return Api().get("/allAccount")
  },
  getAllActiveAccount () {
    return Api().get("/allActiveAccount")
  },
  changeStatusAccount (id,active) {
    return Api().put("/activeStatus/Account/"+id+"/"+active)
  },
  changeRegisterStatusForDoctor (id,status) {
    return Api().put("/registerStatus/Account/"+id+"/"+status)
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
  },    
  getPatientRelation(id) {
    return Api().get("/AccountRelation/Patient/"+id)
  },
  getDoctorRelation(id) {
    return Api().get("/DoctorRelation/Doctor/"+id)
  },
  getPharmacistRelation(id) {
    return Api().get("/PharmacistRelation/Pharmacist/"+id)
  },
  addRelationDoctorPatient(params){
    return Api().post('/post/AccountRelation/DoctorPatient',params)
  },
  addRelationPharmacistPatient(params){
    return Api().post('/post/AccountRelation/PharmacistPatient',params)
  }

  
}