# Actividad #2 - Aplicación Parcial: Funciones reutilizables en JavaScript

En esta actividad trabajé con el concepto de **aplicación parcial**, una técnica de la programación funcional que permite fijar uno o más argumentos de una función, devolviendo una nueva función más específica. Esto permite escribir código más limpio, reutilizable y fácil de mantener, especialmente cuando una función se utiliza frecuentemente con los mismos argumentos.

---

## Requisitos

- Crear una función `calculateVolume` para calcular el volumen de un prisma rectangular.
- Crear una versión parcialmente aplicada de esa función, fijando dos dimensiones.
- Crear una función para planificar actividades infantiles usando aplicación parcial con duración fija.
- Probar cada función con distintos valores.

---

## Descripción de la Implementación

### calculateVolume 

```js
/**
 *  una función calculateVolume que tome tres argumentos: longitud, ancho y altura, y devuelva el volumen de un depósito de agua en un edificio como un prisma rectangular.
 * @param {longitud} longitud
 * @param {ancho} ancho
 * @param {altura} altura
 * @returns {number} el volumen del prisma rectangular
 */
const calculateVolume = (longitud, ancho, altura) => longitud * ancho * altura;
```

casos de prueba:

```js
const prisma1 = calculateVolume(4, 3, 5);
const prisma2 = calculateVolume(6, 7, 8);
const prisma3 = calculateVolume(1, 2, 3);

console.log(prisma1);
console.log(prisma2);
console.log(prisma3);
```

### calculateVolumeWithFixedLengthAndWidth

```js
/**
 * Calcula el volumen de un prisma rectangular con una longitud fija y un ancho fijo.
 * @param {altura} altura
 * @returns {number} el volumen del prisma rectangular
 */
const calculateVolumeWithFixedLengthAndWidth = (altura) => calculateVolume(4, 3, altura);
```

casos de prueba:

```js
const prisma1 = calculateVolumeWithFixedLengthAndWidth(5);
const prisma2 = calculateVolumeWithFixedLengthAndWidth(10);
const prisma3 = calculateVolumeWithFixedLengthAndWidth(15);

console.log(prisma1);
console.log(prisma2);
console.log(prisma3);
```


---

## Requisitos

- Crear una función `planActivity` que tome tres argumentos: activityName, duration (en minutos) y numberOfKids. Utilizando la aplicación parcial, crearás funciones específicas para diferentes actividades con duraciones predefinidas. Finalmente, usarás estas funciones para planificar actividades para diferentes números de niños.
- Crear una función parcialmente aplicada `planActivityWithDuration` con los minutos predefinidos.
- Probar cada función con distintos valores.
---







### planActivity

```js
/**
 *  una función que planifique una actividad de juego para niños. La función tomará tres argumentos: activityName, duration (en minutos) y numberOfKids. Utilizando la aplicación parcial, crearás funciones específicas para diferentes actividades con duraciones predefinidas. Finalmente, usarás estas funciones para planificar actividades para diferentes números de niños.
 * @param {activityName} el nombre de la actividad
 * @param {duration} la duración de la actividad en minutos
 * @param {numberOfKids} el número de niños que participarán en la actividad
 * @returns {string} una descripción de la actividad
 */

const planActivity = (activityName, duration, numberOfKids) => {
    return `El ${activityName} dura ${duration} minutos y tiene ${numberOfKids} niños`;
};
```

### planActivityWithDuration

```js
/**
 *  una función parcialmente aplicada planActivityWithDuration de 15 minutos con un número de niños de 5.
 * @param {activityName} el nombre de la actividad
 * @param {numberOfKids} el número de niños que participarán en la actividad
 * @returns {string} una descripción de la actividad
 */

const planActivityWithDuration = (activityName, numberOfKids) => planActivity(activityName, 15, numberOfKids);
```

casos de prueba:

```js
const activity1 = planActivityWithDuration("juego de mesa", 5);
const activity2 = planActivityWithDuration("juego de mesa", 10);
const activity3 = planActivityWithDuration("juego de mesa", 15);

console.log(activity1);
console.log(activity2);
console.log(activity3);
```


---

<div align="center">
<h2>
🛠️ Lo que aprendi
</h2>
</div>

Esta actividad me permitió aplicar conceptos clave de programación funcional como la aplicación parcial y la función pura. Aprendí a trabajar con funciones de orden superior. Valide la lógica de mis implementaciones probándolas con diferentes valores y con diferentes argumentos.
