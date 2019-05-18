import Api from '@/services/Api'

export default {  
  checkLogin (params) {
    return Api().post('/Login', params)
  },
  changeRegisterStatusForDoctor (id,status) {
    return Api().put("/registerStatus/Account/"+id+"/"+status)
  }
}