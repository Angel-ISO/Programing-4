# Actividad #2 - Manejo de objetos anidados con Inmutabilidad

## Objetivo

El objetivo de este laboratorio es profundizar su comprensión de la inmutabilidad en JavaScript escribiendo una función que maneje objetos anidados sin mutar la estructura de datos original. Al completar este laboratorio, obtendrá experiencia práctica en la implementación de operaciones inmutables en estructuras de datos complejas.

---

##  Qué hace esta función?

Implementé una función pura que:

- No modifica el objeto original (sigue siendo el mismo en memoria).
- Devuelve un **nuevo objeto** con los cambios aplicados.
- Permite trabajar sobre propiedades anidadas usando una ruta como `['social.twitter']`.
- Soporta cuatro operaciones:
  - `update`: actualiza el valor en una ruta.
  - `add`: agrega una nueva propiedad.
  - `delete`: elimina una propiedad.
  - `clone`: devuelve una copia exacta del objeto.

---

## Cómo la hice?

Primero, reviso si la operación es `"clone"`. En ese caso uso `structuredClone`, que hace una copia profunda del objeto original.

Luego, si no es un clon, defino una función auxiliar `deepCopy`, que recorre el objeto **recursivamente** usando los índices de la ruta (`path`) para llegar hasta la propiedad que quiero modificar.

Cuando llego al último nivel de la ruta, hago lo siguiente según la operación:

- En `"delete"`: uso destructuración para eliminar la propiedad.
- En `"add"` o `"update"`: devuelvo un nuevo objeto con la propiedad actualizada.

En cada paso de la recursión devuelvo una **copia nueva**, no modifico el original. Uso el operador spread (`...`) para lograrlo.

---

## Ejemplo de uso

```js
const user = {
  name: "Ana",
  address: {
    city: "Bogotá",
    zip: "110111"
  },
  social: {
    twitter: "@ana"
  }
};

const updated = handleNestedObject(user, ['address', 'city'], 'update', 'Medellín');
console.log(updated.address.city); // "Medellín"
console.log(user.address.city);    // "Bogotá" (el original no cambió)
```

---

<div align="center">
<h2>
🛠️ Lo que aprendi
</h2>
</div>

Esta actividad me ayudó a entender cómo aplicar el principio de inmutabilidad en estructuras complejas usando recursión, destructuración y spread operator. También pude ver cómo estructurar una función pura, lo cual es muy útil en programación funcional y para mantener mi código predecible y sin efectos secundarios.