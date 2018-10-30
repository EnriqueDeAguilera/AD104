var sensor = require('node-dht-sensor')


//console.log('Fuera de funcion get-sensor-readings')
/*
We abstract away the functionality to read sensor information inside the getSensorReadings function.
This function is also asynchronous. It accepts a callback function as an argument.
*/



const getSensorReadings = (callback) => {

  sensor.read(22, 27, function (err, temperature, humidity)
  {
    if (err) {return callback(err)}
    callback(null, temperature, humidity)
  })

}

module.exports = getSensorReadings
