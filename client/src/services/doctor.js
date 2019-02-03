import Api from '@/services/Api'

export default {  
  doctorInfo (params) {
    return Api().get("/DoctorInfo/"+params )
  },
  doctorRelation (params) {
    return Api().get("/DoctorRelation/Doctor/"+params )
  },
  patientInfo(params){
    return Api().get("/PatientInfo/"+params )
  }  
}