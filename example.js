'use strict';

const BME280 = require('bme280-sensor');
const bme280 = new BME280();

// The BME280 constuctor options are optional. Default i2cBusNo 1, i2cAddress 0x77.
// 
const options = { i2cBusNo : 1, i2cAddress : BME280.BME280_DEFAULT_I2C_ADDRESS() };

bme280.init(options)
  .then((result) => {
     console.log('BME280 initialization succeeded');
     readSensorData();
  })
  .catch((err) => console.error('BME280 initialization failed: ' + err));

const readSensorData = () => {
  bme280.readSensorData()
    .then((data) => {
      // temperature_C, pressure_hPa, and humidity are returned by default.
      // I'll also calculate some unit conversions for display purposes.
      //
      data['temperature_F'] = BME280.convertCelciusToFahrenheit(data.temperature_C);
      data['pressure_inHg'] = BME280.convertHectopascalToInchesOfMercury(data.pressure_hPa);
 
      console.log(JSON.stringify(data, null, 2));
    })
    .catch((err) => console.log('BME280 read error: ' + err))

  setTimeout(readSensorData, 2000);
}

