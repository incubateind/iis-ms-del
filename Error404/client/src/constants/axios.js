import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://teamerror.azurewebsites.net/'
})

export default instance;