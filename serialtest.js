var serialport = require('serialport');

var nombrepuerto;

// list serial ports:
serialport.list(function (err, ports) {

  console.log("------------------------------");
  ports.forEach(function(port) {
    console.log(port.comName);

    nombrepuerto=port.comName;
    console.log("Abriendo" +nombrepuerto);
    var port = new serialport(nombrepuerto,{baudRate: 9200});

  });
  console.log("------------------------------");
});
