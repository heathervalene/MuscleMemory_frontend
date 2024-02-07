import axios from 'axios'

export const BASE_URL = 'https://muscle-memory-backend-b42b1638c76f.herokuapp.com/'

const Client = axios.create({baseURL: BASE_URL})

export default Client