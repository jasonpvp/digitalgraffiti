import axios from 'axios'
const BASE_URL = 'https://6jw75wvg62.execute-api.us-west-1.amazonaws.com/DigitalGraffiti'

const Api = {
  get: (endpoint, params = {}) => {
    return axios.get(`${BASE_URL}/${endpoint}`)
  },

  post: (endpoint, params = {}) => {
    return axios.post(`${BASE_URL}/${endpoint}`, params)
  },

  getMessages: ({latitude, longitude}) => {
    return Api.post('retrievemessages', {latitude, longitude})
  },

  sendMessage: ({latitude, longitude, message}) => {
    return Api.post('createmessage', {latitude, longitude, message})
  }
}

export default Api
