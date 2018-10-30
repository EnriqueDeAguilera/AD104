// ---------------------------------------------------------------------------
// Libreria control de relés para AD104
//----------------------------------------------------------------------------

var Gpio = require('onoff').Gpio, // Constructor function for Gpio objects.

control_AD104 = new Gpio(7, 'out')    // Export GPIO #17 as an output.

 var estado_encendido_AD104='apagado'

 //-----------------------------------------------------------------------------
 // CTRL_MODEM FUnción para controlar los reles del AD104
 //-----------------------------------------------------------------------------

CTRL_AD104=(estado) => {

//console.log('CTRL_AD104 ' + estado)

switch(estado) {

case 3:

  control_AD104.read(function(err, value) {  // Asynchronous read.
       if (err) throw err


       if (value == 1) {estado_encendido_AD104='DAQ OFF'} else {estado_encendido_AD104='DAQ ON'}



     })

break;


default:

    if (estado == 0) {estado_encendido_AD104='DAQ OFF'}
    else {estado_encendido_AD104='DAQ ON'}

  control_AD104.read(function(err, value) {  // Asynchronous read.
       if (err) throw err;
       //console.log(' Cambiando estado a ' + estado)
       if (estado==0) {estado=1} else {estado=0}


       if (value!=estado)
       {control_AD104.write(estado,(err) =>{if (err) throw err});}



     })
break;

   }

   return estado_encendido_AD104

     }




KILL_AD104=()=>{control_AD104.unexport();}



module.exports.CTRL_AD104 = CTRL_AD104

console.log('control_reles -- exports')
console.log('-------------------------------------')
console.log(module.exports)
console.log('-------------------------------------')
