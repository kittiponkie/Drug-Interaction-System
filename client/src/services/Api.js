import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `mongodb://localhost:8081/`
  })
}