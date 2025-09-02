## Actividad #3 - Composición de funciones

El objetivo de esta actividad es aplicar conceptos de programación funcional como funciones puras, composición de funciones (`compose`/`pipe`), inmutabilidad y abstracción funcional, resolviendo problemas del mundo real mediante funciones encadenadas y reutilizables.


### 1️ Composición de funciones con personas

Se compone una función llamada `processPeople`, que recibe un array de objetos `persona` y aplica las siguientes operaciones encadenadas:

1. `filterAdults`: Filtra las personas mayores o iguales a 18 años.
2. `getNames`: Extrae solo los nombres de las personas.
3. `sortByName`: Ordena los nombres alfabéticamente.
4. `toUpperCase`: Convierte los nombres a mayúsculas.

```js
const filterAdults = (people) => people.filter(person => person.age >= 18);
const getNames = (people) => people.map(person => person.name);
const sortByName = (names) => names.sort();
const toUpperCase = (names) => names.map(name => name.toUpperCase());

const chainer = (...fns) => (input) => fns.reduceRight((acc, fn) => fn(acc), input);

const processPeople = chainer(
  toUpperCase,
  sortByName,
  getNames,
  filterAdults
);

const people = [
  { name: 'Jolie', age: 25 },
  { name: 'Janine', age: 17 },
  { name: 'Arthur', age: 30 },
  { name: 'Bela', age: 16 },
  { name: 'Charlot', age: 20 }
];

const resultado = processPeople(people);
console.log(resultado);
```

ejemplo de resultado:

![Ejemplo de resultado](/Week3/shared/Exit1.png)


### 2️ Composición de funciones con dispositivos

Se compone una función llamada `setupDevice`, que recibe un objeto `device` y aplica las siguientes operaciones encadenadas:

1. `turnOn`: Enciende el dispositivo.
2. `setVolume`: Establece el volumen del dispositivo.
3. `setChannel`: Establece el canal del dispositivo.

```js
const turnOn = (device) => ({ ...device, isOn: true });
const setVolume = (volume) => (device) => ({ ...device, volume });
const setChannel = (channel) => (device) => ({ ...device, channel });

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
```
ejemplo de resultado:

![Ejemplo de resultado](/Week3/shared/Exit2.png)

---

<div align="center">
<h2>
🛠️ Lo que aprendi
</h2>
</div>

Esta actividad me permitió aplicar conceptos clave de programación funcional como la composición de funciones y la función pura. Aprendí a trabajar con funciones de orden superior. Valide la lógica de mis implementaciones probándolas con diferentes valores y con diferentes argumentos.