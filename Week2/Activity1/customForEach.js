/**
 * Función personalizada forEach: Implementa una función customForEach que se comporte de forma similar a Array.prototype.forEach.
 * @param {Array} El arreglo a recorrer de parametro pues.
 * @param {Function} la funcion que aplico a cada elemento del array.
 * @returns {void}  No retorno nada, simplemente itero sobre el array y la funcion se aplica a cada elemento.
 */
function customForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
}