const getSensorReadings = require('./get-sensor-readings')
const getAD104 = require('./AD104GetReadings')
const fechas = require('./datetime')
const CTRL_AD104 = require('./control_reles')
const fs = require('fs');



intervalo_AD104=10 //INtervalo de lectura AD104 en segundos
tiempolectura_AD104=5 //Segundos para la lectura

var n_ant =Date.now()


//---------------------------------------------------------------------------
// Estructura de datos
//---------------------------------------------------------------------------
const cache = {
  temperature:null,
  humidity:null,
  ad104Value:null,
  ad104Value1:null,
  ad104Value2:null,
  ad104Value3:null
};


//---------------------------------------------------------------------------
// Inicialización
//---------------------------------------------------------------------------
CTRL_AD104.CTRL_AD104(1)

//---------------------------------------------------------------------------
// Actualización del valor del intervalo de DAQ
//---------------------------------------------------------------------------

CTRL_Intervalo =(valor) => {

//console.log('Periodo =' + valor)

if (!isNaN(valor)) {
  valor=parseFloat(valor);
  if (valor>3600) {valor=3600};
  if (valor<10) {valor=tiempolectura_AD104};
  intervalo_AD104 = valor
                    }

return valor

}

//---------------------------------------------------------------------------
// Parsing Lecturas
//---------------------------------------------------------------------------
function parse_lectura(lectura)
{

var posicioncoma=-1;
var valor=0, direccion=0;

if (typeof lectura === 'string' || lectura instanceof String) {posicioncoma=lectura.indexOf(',');}


// Se comprueba que hay una coma
// Se comprueba que hay dos dígitos después de la coma
// Se extrae el valor y la posiciónote
//---------------------------------------------------------------------------
if (posicioncoma>0) // Si es -1 no hay coma en la lectura
{
    if ((posicioncoma+3-1)<lectura.length)
      {
          valor=lectura.substring(0,posicioncoma);
          direccion=lectura.substring(posicioncoma+1,posicioncoma+3);
      }
}
//---------------------------------------------------------------------------
// Se comprueba que los dos valores extraídos son números
//---------------------------------------------------------------------------
 if (!isNaN(valor) && !isNaN(direccion))
 {
   direccion =parseInt(direccion);
   valor=parseFloat(valor);

        switch(direccion)
          {

            case 1:
            cache.ad104Value =cache.ad104Value*0.8+0.2*valor;
            break;

            case 2:
            cache.ad104Value1 =cache.ad104Value1*0.8+0.2*valor;
            break;

            case 3:
            cache.ad104Value2 =cache.ad104Value2*0.8+0.2*valor;
            break;

            case 4:
            cache.ad104Value3 =cache.ad104Value3*0.8+0.2*valor;
            break;


          }


 }



}


//----------------------------------------------------------------------------
// Lectura Sensores Humedad y Temperatura
//----------------------------------------------------------------------------
setInterval(() => {

  getSensorReadings((err, temperature, humidity) => {

    if (err)  {return console.error(err)}

    cache.temperature = temperature
    cache.humidity = humidity

  })
}, 2000)


//----------------------------------------------------------------------------
// Lectura intervalo AD104
//----------------------------------------------------------------------------
setInterval(() => {

var n=Date.now()-n_ant //Chequeo del intervalo DAQ

if (n>((intervalo_AD104-tiempolectura_AD104)*1000))
{

CTRL_AD104.CTRL_AD104(1)

getAD104.getAD104Readings((data)=>{parse_lectura(data);})

//---------------------------------------------------------------------------
// Grabación de datos en fichero
//---------------------------------------------------------------------------
if ((n-intervalo_AD104*1000)>tiempolectura_AD104){

var nombre_fichero='./ad104/data/'+fechas.getFileName();
var datos=fechas.getDateTime();

datos =datos +";"+cache.temperature+";"+cache.humidity+";"+cache.ad104Value+";"+cache.ad104Value1+";"+cache.ad104Value2+";"+cache.ad104Value3+"\n";

fs.appendFile(nombre_fichero,datos, 'utf8',
    // callback function
    function(err) {if (err) throw err;
        //console.log("Data is appended to file successfully.")
});

n_ant=Date.now();}
}
else{

  getAD104.estadoconsulta=-5;
  CTRL_AD104.CTRL_AD104(0)};

}
, 100);



/*
The functions that we expose only return the cached values, and don't make a call to the sensor interface everytime
*/

module.exports.CTRL_Intervalo = CTRL_Intervalo
exports.CTRL_Intervalo_leo =() => {return intervalo_AD104}
exports.SiguienteLectura = () => {return parseFloat((Date.now()-n_ant)/1000)}
module.exports.getTemperature = () => cache.temperature
module.exports.getHumidity = () => cache.humidity
module.exports.getAD104 = () => cache.ad104Value
module.exports.getAD1041 = () => cache.ad104Value1
module.exports.getAD1042 = () => cache.ad104Value2
module.exports.getAD1043 = () => cache.ad104Value3

console.log('get-cached-sensor-readings -- exports')
console.log('-------------------------------------')
console.log(module.exports)
console.log('-------------------------------------')
