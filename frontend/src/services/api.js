import superagent from 'superagent'
const BASE_URL = 'https://httpbin.org'
// https://6jw75wvg62.execute-api.us-west-1.amazonaws.com/DigitalGraffiti/retrievemessage
export default class Api {
  get (endpoint, params = {}) {
    return superagent
      .get(`${BASE_URL}/${endpoint}`)
      .query(params)
//      .withCredentials()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json; charset=utf-8')
  }

  post (endpoint, params = {}) {
    return superagent
      .post(`${BASE_URL}/${endpoint}`)
      .send(params)
//      .withCredentials()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json; charset=utf-8')
      .accept('json')
  }

  getMessages = ({latitude, longitude}) => {
    console.log('get', latitude, longitude)
    return this.post('post', {latitude, longitude})
  }
}
