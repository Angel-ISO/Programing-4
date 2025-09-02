/**
 *  una función calculateVolume que tome tres argumentos: longitud, ancho y altura, y devuelva el volumen de un depósito de agua en un edificio como un prisma rectangular.
 * @param {longitud} longitud
 * @param {ancho} ancho
 * @param {altura} altura
 * @returns {number} el volumen del prisma rectangular
 */

const calculateVolume = (longitud, ancho, altura) => longitud * ancho * altura;


/**
 *  una función parcialmente aplicada calculateVolumeWithFixedLengthAndWidth con una longitud fija de 4 y un ancho de 3.
 * @param {altura} altura
 * @returns {number} el volumen del prisma rectangular
 */

const calculateVolumeWithFixedLengthAndWidth = (altura) => calculateVolume(4, 3, altura);

// finalmente aplique  esta función parcialmente aplicada para calcular el volumen de prismas rectangulares con alturas de 5, 10 y 15.

const prisma1 = calculateVolumeWithFixedLengthAndWidth(5);
const prisma2 = calculateVolumeWithFixedLengthAndWidth(10);
const prisma3 = calculateVolumeWithFixedLengthAndWidth(15);

console.log(prisma1);
console.log(prisma2);
console.log(prisma3);