import Api from '@/services/Api'

export default {
  
  checkLogin (params) {
    return Api().post('/Login', params)
  }
}