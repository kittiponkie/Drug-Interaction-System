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
  pharmacistInfo(params){
    return Api().get("/PharmacistInfo/"+params )
  },
  //drug order
  getOrderId(PatientID){
    return Api().get("/DrugHistory/"+PatientID)
  },
  postOrder(params){
    return Api().post('/post/DrugOrder',params)
  },
  allergicOfPatient(id){
    return Api().get('/AllergicDrug/'+id)
  },
  checkInteraction(rxcui1,rxcui2){
    return Api().get('/checkinteract/'+rxcui1+'/'+rxcui2)
  }   
}