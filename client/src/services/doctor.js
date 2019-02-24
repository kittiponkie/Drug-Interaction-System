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
  },
  //drug order
  getOrderId(PatientID,DoctorID){
    return Api().get("/DrugHistory/Doctor/"+PatientID+"/"+DoctorID)
  },
  postOrder(params){
    return Api().post('/post/DrugOrder',params)
  }  

}