/**
 *  Una función que toma un objeto de dispositivo y devuelve un objeto de dispositivo con la configuración de volumen y canal establecida.
 * @param {object} objeto de dispositivo
 * @returns {object} objeto de dispositivo con la configuración de volumen y canal establecida
**/

const turnOn = (device) => ({ ...device, isOn: true });

/**
 *  Una función que toma un objeto de dispositivo y devuelve un objeto de dispositivo con la configuración de volumen establecida.
 * @param {object} objeto de dispositivo
 * @returns {object} objeto de dispositivo con la configuración de volumen establecida
**/


const setVolume = (volume) => (device) => ({ ...device, volume });


/**
 *  Una función que toma un objeto de dispositivo y devuelve un objeto de dispositivo con la configuración de canal establecida.
 * @param {object} objeto de dispositivo
 * @returns {object} objeto de dispositivo con la configuración de canal establecida
**/

const setChannel = (channel) => (device) => ({ ...device, channel });

/**  Una función compose que toma múltiples funciones y devuelve una nueva función que aplica las funciones en secuencia.
 * @param {...function} fns
 * @returns {function} una nueva función que aplica las funciones en secuencia
 * 
**/


const chainer = (...fns) => (input) => fns.reduceRight((acc, fn) => fn(acc), input);


const setupDevice = chainer(
    setChannel(1),
    setVolume(100),
    turnOn
);


const device = {
  name: 'TV',
  isOn: false,
  volume: 0,
  channel: 1
};

const configuredDevice = setupDevice(device);
console.log(configuredDevice);