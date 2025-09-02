/**
 *  una función currificada que tome un tipo de animal y un sonido, y luego devuelva una frase que describa qué sonido hace el animal. 
 * @param {tipoAnimal}  El tipo de animal.
 * @param {sonido}  El sonido que hace el animal.
 * @returns {string} y pues la onomatopeya del animal
 */


const hacerSonido = (tipoAnimal) => (sonido) => {
    return `El ${tipoAnimal} hace ${sonido}`;
};


const sonidoPerro = hacerSonido("perro")("guau");
const sonidoGato = hacerSonido("gato")("miau");

console.log(sonidoPerro);
console.log(sonidoGato);