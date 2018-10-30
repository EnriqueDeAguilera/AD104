const CTRL_MODEM = require('./control_relesI')

var horaa='12:00'
var horap='12:00'
var modem_habilitado=false
var modem_encendido=false



function setmodem(encendido)
{

if (encendido == true)
{
  CTRL_MODEM.CTRL_MODEM(1);
  modem_encendido=true;
}
  else {CTRL_MODEM.CTRL_MODEM(0)}
  modem_encendido=false;
}



function setConfig(hora_in,hora_out,habilitado_in)
{

horaa=hora_in;
horap=hora_out;
modem_habilitado=habilitado_in;

if (!(modem_habilitado==true)) {modem_habilitado=false};

console.log("horai :"+horaa);
console.log("horap :"+horap);
console.log("habilitado :"+modem_habilitado);

}


function getconfig(n)
{

  switch(n) {

  // Recuperamos hora de inicio
  case 1:
  return(horaa)
  break;

  // Recuperamos hora de fin
  case 2:
  return(horap)
  break;

  // Recuperamos estado
  case 3:
  return(modem_habilitado)
  break;

  // Recuperamos estado
  case 4:
  return(modem_encendido)
  break;

}


}

module.exports.setmodem = setmodem
module.exports.setConfig =setConfig
module.exports.getconfig =getconfig

console.log('modem_control -- exports')
console.log('-------------------------------------')
console.log(module.exports)
console.log('-------------------------------------')


// Buscamos coincidencia de hora
// -----------------------------
//setInterval(() => {




//},1000)
