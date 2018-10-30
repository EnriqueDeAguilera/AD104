var SerialPort = require('serialport')
var Readline = SerialPort.parsers.Readline



//------------------------------------------------------------------------
console.log('Inicializando puerto Serie')
var serialPort = new SerialPort('/dev/ttyAMA0', {
  baudRate: 9600,
     dataBits: 8,
     parity: 'even',
     stopBits: 1,
     flowControl: false

})

serialPort.on('open', function () {
  console.log('Communication is on!') // Confirmación de conexión
})
//---------------------------------------------------------------------------

const getAD104Readings = (callback) => {

serialPort.write('MSV?\n', function(err) {
  if (err) {
    return console.log('Error on write: ', err.message);
  }
  console.log('message written');
});


var parser = new Readline()
serialPort.pipe(parser)
parser.on('data', function (data) {
  console.log('data received: ' + data)
})

}




//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

var sensor = require('node-dht-sensor')
const raspi = require('raspi').init;
const Serial = require('raspi-serial').Serial;


console.log('Fuera de funcion get-sensor-readings')
/*
We abstract away the functionality to read sensor information inside the getSensorReadings function.
This function is also asynchronous. It accepts a callback function as an argument.
*/
const getSensorReadings = (callback) => {

  console.log('Dentro de funcion get-sensor-readings')
  sensor.read(22, 27, function (err, temperature, humidity) {
    if (err) {
      /*
      If there is an error, call the callback function with the error as its first argument
      */


      return callback(err)
    }

    /*
    If everything went well, call the callback with "null" as the first argument to indicate thet there was no error.
    The second and third arguments would be the results (temperature and humidty respectively)
    */
    callback(null, temperature, humidity)
  })
}

module.exports = getSensorReadings
