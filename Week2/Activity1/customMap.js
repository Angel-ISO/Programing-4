/**
 * Función map personalizada: Implementa una función customMap que imite el comportamiento de Array.prototype.map. 
 * La función debe aceptar una matriz y una función de devolución de llamada, aplicar la devolución de llamada a cada elemento de la matriz 
 * y devolver una nueva matriz con los resultados.
 * @param {Array} cualquier array que quiero recorrer.
 * @param {Function} hago el callback despues del push que hace que se aplique la función a cada elemento.
 * @returns {Array} - retorno un nuevo array con los resultados.
 */
function customMap(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }
  return result;
}