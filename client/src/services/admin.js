import Api from '@/services/Api'

export default {  
  getAllPatient () {
    return Api().get("/PatientInfo" )
  },
  deletePatient (id) {
    return Api().delete('/remove/PatientInfo/'+id)
  }
}