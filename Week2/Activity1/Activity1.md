# Actividad #1 - Implementación personalizada de métodos Array (map, reduce, filter, forEach)

El objetivo de esta actividad fue implementar mis propias versiones de los métodos de arreglo más utilizados en JavaScript: `map`, `reduce`, `filter` y `forEach`. Esto me permitió reforzar conceptos clave de **programación funcional** como las **funciones puras**, la **inmutabilidad**, y el uso de **funciones de orden superior**.

---

## Requisitos

- Implementar las siguientes funciones sin usar los métodos originales del array:
  - `customMap`
  - `customReduce`
  - `customFilter`
  - `customForEach`
- Cada función debe ser pura (sin efectos secundarios ni uso de estado externo).
- La implementación debe evitar mutaciones del arreglo original.
- Probar cada función con distintos callbacks para validar su funcionamiento.

---

## Descripción de la Implementación

A continuación, describo cada función implementada:

###  customMap

Crea un nuevo arreglo aplicando una función a cada elemento del arreglo original.

```js
function customMap(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }
  return result;
}
```

### customReduce

Crea un nuevo valor acumulando cada elemento del arreglo original.

```js
function customReduce(array, callback, initialValue) {
  let accumulator = initialValue;
  for (let i = 0; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array);
  }
  return accumulator;
}
```

### customFilter

Crea un nuevo arreglo filtrando los elementos del arreglo original.

```js
function customFilter(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
}
```

### customForEach

Itera sobre cada elemento del arreglo original aplicando una función.

```js
function customForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
}
```

casos de prueba:

utilice el siguiente arreglo base para probar cada función:

```js
const array = [1, 2, 3, 4, 5];
```

- customMap

```js
console.log("customMap:", customMap(numbers, x => x * 2));
// Resultado esperado: [2, 4, 6, 8, 10]
```

- customReduce

```js
console.log("customReduce:", customReduce(numbers, (acc, x) => acc + x, 0));
// Resultado esperado: 15
```

- customFilter

```js
console.log("customFilter:", customFilter(numbers, x => x % 2 === 0));
// Resultado esperado: [2, 4]
```

- customForEach

```js
customForEach(numbers, x => console.log(x));
// Resultado esperado: 1 2 3 4 5
```



---

<div align="center">
<h2>
🛠️ Lo que aprendi
</h2>
</div>

Esta actividad me permitió aplicar conceptos clave de programación funcional como la inmutabilidad y la función pura. Aprendí a trabajar con funciones de orden superior. Valide la lógica de mis implementaciones probándolas con diferentes callbacks y escenarios.