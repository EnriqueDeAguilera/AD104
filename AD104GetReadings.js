var SerialPort = require('serialport')
var Readline = SerialPort.parsers.Readline
var parser = new Readline()
var lecturaAD104 = 0;
var init=false



AD104_init_leo =() => {return init}
//------------------------------------------------------------------------
// CONTROL PUERTO SERIE
//------------------------------------------------------------------------
console.log('Inicializando puerto Serie')

estadoconsulta=0;


var serialPort = new SerialPort('/dev/ttyAMA0', {
  baudRate: 9600,
     dataBits: 8,
     parity: 'even',
     stopBits: 1,
     flowControl: false

})
//------------------------------------------------------------------------
// RECEPCION DE datos
//------------------------------------------------------------------------
serialPort.pipe(parser);


serialPort.on('open', function () {

    console.log('Communication is on!') // Confirmación de conexión

    //-----------------------------------
    parser.on('data', function (lectura) {
    lecturaAD104=lectura
    //console.log('data received: ' + lecturaAD104 +' '+isNaN(lecturaAD104));
    })
    //-----------------------------------


    serialPort.write('IDN\n', function(err) {
      if (err) {return console.log('Error on write: ', err.message);}

      serialPort.write('COF3\n', function(err)
      {
        if (err) {return console.log('Error on write: ', err.message);}

        console.log('AD104 INicializado')
        estadoconsulta=0;
        init = true;
      })

    })

})


//---------------------------------------------------------------------------
// Comando de petición de datos si está inicializado
//---------------------------------------------------------------------------
const getAD104Readings = (lectura) => {



if (init)
{

switch (estadoconsulta)

{
// empezamos en case 5 para que estado consulta tenga 4 x 100ms para inicializar
// la electrónica de los AED

case 5:
// DIRECCIONAMOS TODOS LOS AED y MEDIMOS------------------------------------
serialPort.write('S98;MSV?;', function(err) {
  if (err) {
    return console.log('Error on write: ', err.message);
  }});
break;


case 6:
// DIRECCIONAMOS PRIMER AED ------------------------------------------------
serialPort.write('S01;', function(err) {
  if (err) {return console.log('Error on write: ', err.message);
  }});
break;

case 7:
// DIRECCIONAMOS SEGUNDO AED -------------------------------------------------
serialPort.write('S02;', function(err) {
  if (err) {return console.log('Error on write: ', err.message);
  }});
break;

case 8:
// DIRECCIONAMOS TERCER AED --------------------------------------------------
serialPort.write('S03;', function(err) {
  if (err) {return console.log('Error on write: ', err.message);
  }});
break;

case 9:
// DIRECCIONAMOS CUARTO AED -------------------------------------------------
serialPort.write('S04;', function(err) {
  if (err) {return console.log('Error on write: ', err.message);
  }});
break;

}

estadoconsulta++

if (estadoconsulta==10) {estadoconsulta=5}

}
//---------------------------------------------------------------------------

//console.log('data actualizado' + lecturaAD104);

lectura(lecturaAD104)

lecturaAD104='NoData' //UNa vez leido

}



//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
exports.getAD104Readings = getAD104Readings
exports.estadoconsulta=estadoconsulta;
