/*
We put the code for fetching tmeperature in its own function
*/
const fetchTemperature = () => {
  fetch('/temperature')
    .then(results => {
      return results.text()
    })
    .then(text => {
      const temperatureDisplay = document.getElementById('temperature-display')
      temperatureDisplay.innerHTML = text
    })
}

/*
Make a similar function to fetch humidity
*/
const fetchHumidity = () => {
  fetch('/humidity')
    .then(results => {
      return results.text()
    })
    .then(text => {
      const humidityDisplay = document.getElementById('humidity-display')
      humidityDisplay.innerHTML = text
    })
}


/*
Make a similar function to fetch humidity
*/
const enciendeAD104 = () => {
  fetch('/enciendeModem')
    .then(results => {
      return results.text()
    })
    .then(text => {
      const estadomedidaDisplay = document.getElementById('estadomodem-display')
      estadomedidaDisplay.innerHTML = text
    })
}

/*
Make a similar function to fetch humidity
*/
const apagaAD104 = () => {
  fetch('/apagaModem')
    .then(results => {
      return results.text()
    })
    .then(text => {
      const estadomedidaDisplay = document.getElementById('estadomodem-display')
      estadomedidaDisplay.innerHTML = text
    })
}

/*-----------------------------------------------------------------------------
ACTUALIZACION DISPLAY AD104
------------------------------------------------------------------------------*/
const estadoAD104 = () => {

  fetch('/estadoAD104')
    .then(results => {
      return results.text()
    })
    .then(text => {
      const estadomedidaDisplay = document.getElementById('estadomedida-display')
      estadomedidaDisplay.innerHTML = text
    })

    fetch('/estadoAD104/period')
      .then(results => {
        return results.text()
      })
      .then(text => {
        const estadomedidaDisplay = document.getElementById('periodo-display')
        estadomedidaDisplay.innerHTML = 'Ts='+text+' seg';
      })

      fetch('/estadoAD104/restante')
        .then(results => {
          return results.text()
        })
        .then(text => {
          const estadomedidaDisplay = document.getElementById('siguiente-display')
          estadomedidaDisplay.innerHTML = 'Tr='+text+' seg';
        })


}

/*-----------------------------------------------------------------------------
ACTUALIZACION DISPLAY MODEM
------------------------------------------------------------------------------*/
const estadoModem = () => {

  fetch('/estadoModem/ini')
    .then(results => {
      return results.text()
    })
    .then(text => {
      const aux = document.getElementById('horamodema-display')
      aux.innerHTML = 'Encendido' + text
    })

    fetch('/estadoModem/fin')
      .then(results => {
        return results.text()
      })
      .then(text => {
        const aux = document.getElementById('horamodemp-display')
        aux.innerHTML = 'Apagado' + text
      })

      fetch('/estadoModem/estado')
        .then(results => {
          return results.text()
        })
        .then(text => {
          const aux = document.getElementById('estadomodem-display')
          aux.innerHTML = text
        })

        fetch('/estadoModem/habilitado')
          .then(results => {
            return results.text()
          })
          .then(text => {
            const aux = document.getElementById('habilitadomodem-display')
            aux.innerHTML = text
          })
  }

/*
Make a similar function to fetch humidity
*/
const fetchAD104 = () => {
  fetch('/AD104')
    .then(results => {
      return results.text()
    })
    .then(text => {
      const AD104Display = document.getElementById('load-display1')
      AD104Display.innerHTML = text})

    fetch('/AD1041')
      .then(results => {
        return results.text()
      })
      .then(text => {
        const AD104Display1 = document.getElementById('load-display2')
        AD104Display1.innerHTML = text})

    fetch('/AD1042')
      .then(results => {
        return results.text()
      })
      .then(text => {
        const AD104Display2 = document.getElementById('load-display3')
        AD104Display2.innerHTML = text})

    fetch('/AD1043')
      .then(results => {
        return results.text()
      })
      .then(text => {
        const AD104Display3 = document.getElementById('load-display4')
        AD104Display3.innerHTML = text})

}


function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    const AD104Display3 = document.getElementById('fecha-display')
    AD104Display3.innerHTML = day + "/" + month +"/" +year + "   " + hour + ":" + min + ":" + sec;

}

/*
Call the above defined functions at regular intervals
*/
setInterval(() => {
  fetchTemperature()
  fetchHumidity()
  fetchAD104()
  estadoAD104()
  estadoModem()
  getDateTime()
}, 1000)
