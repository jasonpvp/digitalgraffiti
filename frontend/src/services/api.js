// import superagent from 'superagent'
import axios from 'axios'
//const BASE_URL = 'https://httpbin.org'
const BASE_URL = 'https://6jw75wvg62.execute-api.us-west-1.amazonaws.com/DigitalGraffiti'
export default class Api {
  get (endpoint, params = {}) {
    return axios.get(`${BASE_URL}/${endpoint}`)
  }

  post (endpoint, params = {}) {
    return axios.post(`${BASE_URL}/${endpoint}`, params)
//      .set('Accept', 'application/json')
//      .set('Content-Type', 'application/json; charset=utf-8')
//      .accept('json')
  }

  getMessages = ({latitude, longitude}) => {
    console.log('get messages', latitude, longitude)
    return this.post('retrievemessages', {latitude, longitude})
  }

  sendMessage = ({latitude, longitude, message}) => {
    console.log('send', {latitude, longitude, message})
  }
}
