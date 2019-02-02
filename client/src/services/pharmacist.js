import Api from '@/services/Api'

export default {  
  doctorInfo (params) {
    return Api().get("/DoctorInfo/"+params )
  }
}