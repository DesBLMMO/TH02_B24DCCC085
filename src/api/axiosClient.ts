import axios from 'axios'
const api=axios.create({timeout:15000})
api.interceptors.request.use(c=>c)
api.interceptors.response.use(r=>r,e=>Promise.reject(e))
export default api
