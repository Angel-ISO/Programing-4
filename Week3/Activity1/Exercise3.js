/**
 *  Crea una función currificada que tome un deporte, una acción y un jugador, y luego devuelva una frase que describa lo que hace el jugador en el deporte.
 * @param {deporte}  El deporte.
 * @param {acción}  La acción que hace el jugador.
 * @param {jugador}  El jugador.
 * @returns {string} y pues la frase que describa lo que hace el jugador en el deporte.
 */

const hacerJugador = (deporte) => (accion) => (jugador) => {
    return `El jugador ${jugador} hace ${accion} en ${deporte}`;
};

const jugador1 = hacerJugador("futbol")("patea")("pessi");
const jugador2 = hacerJugador("futbol")("siuuuuuuuuuu")("cr7");
const jugador3 = hacerJugador("futbol")("golpea")("pepe");

console.log(jugador1);
console.log(jugador2);   
console.log(jugador3);