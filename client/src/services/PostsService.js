import Api from '@/services/Api'

export default {
  fetchPatient () {
    return Api().get('PatientInfo')
  },

  addPatient (params) {
    return Api().post('post/PatientInfo', params)
  },

  updatePatient (params) {
    return Api().put('update/PatientInfo/' + params.id, params)
  },

  getPatient (params) {
    return Api().get('PatientInfo/' + params.id)
  },

  deletePatient (id) {
    return Api().delete('remove/PatientInfo/' + id)
  }
}