
// Compone las funciones anteriores para crear una nueva función llamada processPeople que tomará un array de objetos persona y aplicará las siguientes operaciones en secuencia: filtrar adultos, obtener nombres, ordenar por nombre y convertir a mayúsculas.


/**
 *  Una función que toma un array de objetos persona y devuelve un array de objetos persona que cumplen con la condición de ser adultos.
 * @param {array} array de objetos persona
 * @returns {array} array de objetos persona que cumplen con la condición de ser adultos
 */
const filterAdults = (people) => people.filter(person => person.age >= 18);


/**
 *  Una función que toma un array de objetos persona y devuelve un array de nombres.
 * @param {array} array de objetos persona
 * @returns {array} array de nombres
 */

const getNames = (people) => people.map(person => person.name);


/**
 *  Una función que toma un array y devuelve un array ordenado por nombre.
 * @param {array} array
 * @returns {array} array ordenado por nombre
 * 
 */

const sortByName = (names) => names.sort();


/** *  Una función que toma un array de nombres y devuelve un array de nombres en mayúsculas
 * @param {array} array de nombres
 * @returns {array} array de nombres en mayúsculas
 */


const toUpperCase = (names) => names.map(name => name.toUpperCase());

/** *  Una función compose que toma múltiples funciones y devuelve una nueva función que aplica las funciones en secuencia.
 * @param {...function} fns
 * @returns {function} una nueva función que aplica las funciones en secuencia
 * 
 * */

const chainer = (...fns) => (input) => fns.reduceRight((acc, fn) => fn(acc), input);


// finalmente aplique la funcion compose que encadena funciones para crear la funccion process y aplica todas las funciones anteriores.


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
