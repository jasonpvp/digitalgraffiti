import axios from 'axios'
const API_KEY = '274a40c9fc82c1'
const BASE_URL = `https://us1.locationiq.com/v1/reverse.php?key=${API_KEY}&format=json`

const Geo = {
  // get geo location and return as a promise
  get: () => {
    const deferred = {}
    deferred.promise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })

    return deferred.promise
  },

  findLocation: ({latitude, longitude}) => {
    console.log({latitude, longitude})
    return axios
      .get(`${BASE_URL}&lat=${latitude}&lon=${longitude}`)
  }
}

export default Geo
