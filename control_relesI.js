// ---------------------------------------------------------------------------
// Libreria control de relés para Modem
//----------------------------------------------------------------------------

var GpioModem = require('onoff').Gpio, // Constructor function for Gpio objects.

control_Modem = new GpioModem(11, 'out')    // Export GPIO #17 as an output.
var estado_encendido_Modem='MODEM off'



//-----------------------------------------------------------------------------
// CTRL_MODEM FUnción para controlar los reles del modem
//-----------------------------------------------------------------------------

CTRL_MODEM=(estado) => {

switch(estado) {

case 0:
case 1:

      if (estado>0) {estado_encendido_Modem='MODEM On'}
      else {estado_encendido_Modem='MODEM Off'}

    control_Modem.read(function(err, value) {  // Asynchronous read.
         if (err) throw err;
         //console.log(' Cambiando estado a ' + estado)
         if (estado<1) {estado=1} else {estado=0}

         if (value!=estado) {control_Modem.write(estado,(err) =>{if (err) throw err});}

          })
  break;

case 3:

  control_Modem.read(function(err, value) {  // Asynchronous read.
                                              if (err) throw err
                                              if (value == 1) {estado_encendido_Modem='MODEM Off'} else {estado_encendido_Modem='MODEM On'
                                               return estado_encendido_Modem
                                            }
                                          })
break;}

return estado_encendido_Modem

}



KILL_MODEM=()=>{control_Modem.unexport();}

CTRL_MODEM(0)


module.exports.CTRL_MODEM = CTRL_MODEM
module.exports.KILL_MODEM = KILL_MODEM

console.log('control_relesI -- exports')
console.log('-------------------------------------')
console.log(module.exports)
console.log('-------------------------------------')

//console.log(module.exports)
