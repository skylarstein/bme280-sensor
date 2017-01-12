process.env.NODE_ENV = 'test';

const chai   = require('chai');
const BME280 = require('../BME280.js');
const expect = chai.expect;

describe('bme280-sensor', () => {
  it('it should communicate with the device', (done) => {
    const bme280 = new BME280();
    expect(bme280).to.be.an.instanceof(BME280);
    bme280.init()
      .then((chipId) => {
        expect(chipId).to.be.equal(BME280.CHIP_ID_BME280());
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('it should receive valid sensor data', (done) => {
    const bme280 = new BME280();
    expect(bme280).to.be.an.instanceof(BME280);
    bme280.init()
      .then((chipId) => {
        expect(chipId).to.be.equal(BME280.CHIP_ID_BME280());
        return bme280.readSensorData();
      })
      .then((data) => {
        console.log(`BME280 sensor data: ${JSON.stringify(data)}`);
        expect(data).to.have.all.keys('temperature_C', 'humidity', 'pressure_hPa');
        expect(data.temperature_C).to.be.within(-40, 85); // per Bosch BME280 datasheet operating range
        expect(data.humidity).to.be.within(0, 100); // per Bosch BME280 datasheet operating range
        expect(data.pressure_hPa).to.be.within(300, 1100); // per Bosch BME280 datasheet operating range
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
