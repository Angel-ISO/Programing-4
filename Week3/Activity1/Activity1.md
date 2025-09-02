# Actividad #1 - Currying: Funciones currificadas en JavaScript

El objetivo de esta actividad fue implementar funciones **currificadas** usando JavaScript para reforzar conceptos fundamentales de la **programación funcional**. El **currying** permite transformar funciones con múltiples argumentos en una secuencia de funciones que toman un solo argumento cada una. Esto es especialmente útil para crear funciones reutilizables y más declarativas.

---

## Requisitos

- Crear una función currificada para calcular el volumen de un prisma rectangular.
- Crear una función currificada que genere frases con animales y sonidos.
- Crear una función currificada que genere frases con deportes, acciones y jugadores.
- Probar cada función con distintos valores.

---

## Descripción de la Implementación

###  curriedVolume

Función currificada que calcula el volumen de un prisma rectangular, recibiendo sus dimensiones una a una.

```js
/**
 * @param {longitud} primer parámetro que retorna el ancho
 * @param {ancho} segundo parámetro que retorna la altura
 * @param {altura} tercer parámetro que retorna el volumen
 * @returns {number} volumen del prisma rectangular
 */
const curriedVolume = (longitud) => (ancho) => (altura) => longitud * ancho * altura;
```

casos de prueba:

```js
const volumen1 = curriedVolume(3)(4)(5);
const volumen2 = curriedVolume(6)(7)(8);
const volumen3 = curriedVolume(1)(2)(3);

console.log(volumen1);
console.log(volumen2);
console.log(volumen3);
```

###  curriedHacerSonido

Función currificada que toma un tipo de animal y un sonido, y luego devuelve una frase que describa qué sonido hace el animal.

```js
/**
 * @param {tipoAnimal}  El tipo de animal.
 * @param {sonido}  El sonido que hace el animal.
 * @returns {string} y pues la onomatopeya del animal
 */
const hacerSonido = (tipoAnimal) => (sonido) => {
    return `El ${tipoAnimal} hace ${sonido}`;
};
```

casos de prueba:

```js
const sonidoPerro = hacerSonido("perro")("guau");
const sonidoGato = hacerSonido("gato")("miau");

console.log(sonidoPerro);
console.log(sonidoGato);
```

###  curriedHacerJugador

Función currificada que toma un deporte, una acción y un jugador, y luego devuelve una frase que describa lo que hace el jugador en el deporte.

```js
/**
 * @param {deporte}  El deporte.
 * @param {acción}  La acción que hace el jugador.
 * @param {jugador}  El jugador.
 * @returns {string} y pues la frase que describa lo que hace el jugador en el deporte.
 */
const hacerJugador = (deporte) => (accion) => (jugador) => {
    return `El jugador ${jugador} hace ${accion} en ${deporte}`;
};
```

casos de prueba:

```js
const jugador1 = hacerJugador("futbol")("patea")("pessi");
const jugador2 = hacerJugador("futbol")("siuuuuuuuuuu")("cr7");
const jugador3 = hacerJugador("futbol")("golpea")("pepe");

console.log(jugador1);
console.log(jugador2);
console.log(jugador3);
```

---

<div align="center">
<h2>
🛠️ Lo que aprendi
</h2>
</div>

Esta actividad me permitió aplicar conceptos clave de programación funcional como la currificación y la función pura. Aprendí a trabajar con funciones de orden superior. Valide la lógica de mis implementaciones probándolas con diferentes valores.