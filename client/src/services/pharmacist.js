import Api from '@/services/Api'

export default {  
  pharmacistInfo (params) {
    return Api().get("/PharmacistInfo/"+params )
  },
  pharmacistRelation (params) {
    return Api().get("/PharmacistRelation/Pharmacist/"+params )
  },
  patientInfo(params){
    return Api().get("/PatientInfo/"+params )
  },
  //drug dispense
  getOrderId(PatientID){
    return Api().get("/DrugHistory/"+PatientID)
  },
  postOrder(params){
    return Api().post('/post/DrugOrder',params)
  },
  dispense(OrderID,DrugNo,params){
    return Api().put("/update/DrugHistory/"+OrderID+"/"+DrugNo,params)
  }    
}