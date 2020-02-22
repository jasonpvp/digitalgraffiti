const Geo = {
  // get geo location and return as a promise
  get: () => {
    const deferred = {}
    deferred.promise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })

    return deferred.promise
  }
}

export default Geo
