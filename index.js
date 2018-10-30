const express = require('express')
const path = require('path')
const app = express()
const getCachedSensorReadings = require('./get-cached-sensor-readings')
const CTRL_AD104 = require('./control_reles')
const bodyParser = require("body-parser");

const modemControl = require("./modem_control");

var serveIndex = require('serve-index');
var fs = require('fs')
var ini = require('ini')


/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */

 //-------------- LECTURA POST PERIODO MUESTREO -----------------------------------------------------
app.use(bodyParser.json());

app.post("/daq", function (req, res) { getCachedSensorReadings.CTRL_Intervalo(req.body.ad104.periodo);
                                    res.send('<html><META HTTP-EQUIV="REFRESH" CONTENT="0;URL=/"></html>');
});

//-------------- LECTURA POST PERIODO MUESTREO -----------------------------------------------------
app.post("/modem", function (req, res) {
                                   modemControl.setConfig(req.body.modem.horaa,req.body.modem.horap,req.body.modem.habilitado);
                                   res.send('<html><META HTTP-EQUIV="REFRESH" CONTENT="0;URL=/"></html>');
});



// Se situa el path de la aplicación en /public ------------------------------------------------------

app.use('/', express.static(path.join(__dirname, 'public')))

// Petición medida de temperatura  ----------------------------------------------
app.get('/temperature', function (req, res) {
  var valor=getCachedSensorReadings.getTemperature();

  if (!(valor==null)) {res.send('<strong>' + valor.toFixed(1) + '</strong>')}
})

// Petición medida de humedad  --------------------------------------------------
app.get('/humidity', function (req, res) {
  var valor=getCachedSensorReadings.getHumidity();
  if (!(valor==null)) {res.send('<strong>' + valor.toFixed(1) + '</strong>')}
})

// Petición medida AD104 ----- --------------------------------------------------
app.get('/AD104', function (req, res) {
    var valor=getCachedSensorReadings.getAD104();

    if (!(valor==null)) {  res.send('<strong>' + valor.toFixed(2) + '</strong>')}
})

// Petición medida AD104 ----- --------------------------------------------------
app.get('/AD1041', function (req, res) {
    var valor=getCachedSensorReadings.getAD1041();

    if (!(valor==null)) {  res.send('<strong>' + valor.toFixed(2) + '</strong>')}
})

// Petición medida AD104 ----- --------------------------------------------------
app.get('/AD1042', function (req, res) {
  var valor=getCachedSensorReadings.getAD104();

  if (!(valor==null)) {  res.send('<strong>' + valor.toFixed(2) + '</strong>')}
})

// Petición medida AD104 ----- --------------------------------------------------
app.get('/AD1043', function (req, res) {
  var valor=getCachedSensorReadings.getAD1041();

  if (!(valor==null)) {  res.send('<strong>' + valor.toFixed(2) + '</strong>')}
})

// --------------------------------------------------------------------------------------
// Actualización variables configurables
//---------------------------------------------------------------------------------------

// ESTADO DAQ -----------------------------------------------

// Estado DAQ On - DAQ Off -----------------------------------------------
app.get('/estadoAD104', function (req, res) {
  res.send('<strong>' + CTRL_AD104.CTRL_AD104(3) + '</strong>')
})



// Periodo de adquisición de datos ----------------------------------------
app.get('/estadoAD104/period', function (req, res) {
  res.send('<strong>' + getCachedSensorReadings.CTRL_Intervalo_leo() + '</strong>')
})

// Tiempo hasta siguiente captura -----------------------------------------
app.get('/estadoAD104/restante', function (req, res) {
  res.send('<strong>' + getCachedSensorReadings.SiguienteLectura().toFixed(0) + '</strong>')
})

// ESTADO MODEM -----------------------------------------------
// Estado DAQ On - DAQ Off -----------------------------------------------
app.get('/estadoModem/ini', function (req, res) {
  res.send('<strong>' + modemControl.getconfig(1) + '</strong>')
})

app.get('/estadoModem/fin', function (req, res) {
  res.send('<strong>' + modemControl.getconfig(2) + '</strong>')
})


app.get('/estadoModem/estado', function (req, res) {

  var aux="Apagado"
  if (modemControl.getconfig(4)==true) {aux="Encendido"}
  res.send('<strong>' + aux+ '</strong>')
})

app.get('/estadoModem/habilitado', function (req, res) {

  var aux="Deshabilitado"
  if (modemControl.getconfig(3)==true) {aux="Habilitado"}
  res.send('<strong>' + aux+ '</strong>')
})


// --------------------------------------------------------------------------------------
// Acciones botones
//---------------------------------------------------------------------------------------

// Apagar relé AD104 ------------------------------------------------------
app.get('/apagaAD104', function (req, res) {
  res.send('<strong>' + CTRL_AD104.CTRL_AD104(0) + '</strong>')
})

// Encendera relé AD104 ----------------------------------------------------
app.get('/enciendeAD104', function (req, res) {
  res.send('<strong>'+ CTRL_AD104.CTRL_AD104(1)+'</strong>')
})

// Apagar relé AD104 ------------------------------------------------------
app.get('/apagaModem', function (req, res) {
  res.send('<strong>' + modemControl.setmodem(0) + '</strong>')
})

// Encender relé AD104 ----------------------------------------------------
app.get('/enciendeModem', function (req, res) {
  res.send('<strong>'+ modemControl.setmodem(1)+'</strong>')
})

// --------------------------------------------------------------------------------------
// Acceso a disco.
//---------------------------------------------------------------------------------------
app.use('/ftp', express.static('./ad104/data/'), serveIndex('./ad104/data/', {'icons': true}))



app.listen(3000, function () {
  console.log('Server listening on port 3000')
})
