/**
 * Función de reducción personalizada: Implementa una función customReduce que se comporte de forma similar a Array.prototype.reduce.
 * @param {Array} el parametro a reducir pues
 * @param {Function} denuevo el callback que se aplica a cada elemento del array.
 * @param {initialValue} el valor con el que iniciar la acumulación.
 * @returns {accumulator} el valor final de la acumulacion ya reducido.
 */
function customReduce(array, callback, initialValue) {
  let accumulator = initialValue;
  for (let i = 0; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array);
  }
  return accumulator;
}