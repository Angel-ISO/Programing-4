/**
 *  crearás una función currificada para calcular el volumen de un prisma rectangular
 * @param {longitud} primer parametro que retorna el ancho
 * @param {ancho} segundo parametro que retorna la altura
 * @param {altura} tercer parametro que retorna el volumen o la multplicacion de los tres
 * @returns {longitud * ancho * altura} el volumen de la prisma
 */
const curriedVolume = (longitud) => (ancho) => (altura) => longitud * ancho * altura;


// aqui aplique los casos que pedia el lab

const volumen1 = curriedVolume(3)(4)(5); 
const volumen2 = curriedVolume(6)(7)(8); 
const volumen3 = curriedVolume(1)(2)(3); 


console.log(volumen1);
console.log(volumen2);   
console.log(volumen3); 