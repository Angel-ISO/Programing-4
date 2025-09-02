/**
 * Función de filtro personalizada: Implementa una función customFilter que refleje Array.prototype.filter. 
 * @param {Array} el parametro a filtrar.
 * @param {Function} callback que aplico siempre como condiciendo si pasan o no el filtro.
 * @returns {result} si lo pasaron pues retorno ese nuevo array filtrado.
 */
function customFilter(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
}