import axios from 'axios'

export const BASE_URL = ''

const Client = axios.create({baseURL: BASE_URL})

export default Client