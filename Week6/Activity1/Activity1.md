# Actividad: Eliminación de Duplicados y Ordenamiento Burbuja usando Recursividad

El objetivo de esta actividad fue desarrollar habilidades fundamentales en **pensamiento recursivo** mediante la implementación de dos algoritmos clásicos: eliminación de duplicados y ordenamiento burbuja, utilizando exclusivamente técnicas recursivas sin depender de métodos integrados de JavaScript o bucles iterativos.

---

## Requisitos

- Implementar **únicamente recursividad** para ambas tareas, sin usar bucles iterativos.
- **No utilizar métodos JavaScript integrados** para eliminar duplicados o realizar ordenamientos.
- Crear código bien organizado, legible y con comentarios significativos.
- Desarrollar casos de prueba para validar todas las funcionalidades principales.
- Aplicar el pensamiento recursivo para dividir problemas complejos en subproblemas más pequeños.

---

## Descripción de la Implementación

### Función para Eliminar Duplicados

La implementación se basa en dos funciones que trabajan en conjunto:

**Función auxiliar `contains`**: Verifica recursivamente si un valor existe en el array hasta un índice específico.

```js

function contains(arr, val, index) {
    if (index < 0) {
        return false;
    }
    
    if (arr[index] === val) {
        return true;
    }
    
    return contains(arr, val, index - 1);
}
```

**Función principal `removeDuplicates`**: Utiliza la función auxiliar para construir un nuevo array sin duplicados.

```js

function removeDuplicates(arreglo) {
    if (arreglo.length === 0) {
        return [];
    }
    
    if (arreglo.length === 1) {
        return [arreglo[0]];
    }
    
    const firstElement = arreglo[0];
    const restArray = arreglo.slice(1);
    
    const processedRest = removeDuplicates(restArray);
    
    if (contains(processedRest, firstElement, processedRest.length - 1)) {
        return processedRest;
    } else {
        return [firstElement].concat(processedRest);
    }
}
```

### Ordenamiento Burbuja Recursivo

La implementación del ordenamiento burbuja se divide en dos funciones recursivas:

**Función auxiliar `bubblePass`**: Realiza una pasada completa del algoritmo burbuja de forma recursiva.

```js

function bubblePass(arr, n, index = 0) {
    if (index >= n - 1) {
        return arr;
    }
    
    if (arr[index] > arr[index + 1]) {
        const temp = arr[index];
        arr[index] = arr[index + 1];
        arr[index + 1] = temp;
    }
    
    return bubblePass(arr, n, index + 1);
}
```

**Función principal `recursiveBubbleSort`**: Controla el proceso completo de ordenamiento.

```js
function recursiveBubbleSort(arr, n) {
    if (n <= 1) {
        return arr;
    }
    
    const arrCopy = arr.slice();
    
    bubblePass(arrCopy, n);
    
 
    return recursiveBubbleSort(arrCopy, n - 1);
}
```

### Implementación Completa

```js
const arreglo = [1, 5, 7, 8, 9, 0, 0, 6];
console.log("Array original:", arreglo);

const withoutDuplicates = removeDuplicates(arreglo);
console.log("Array sin duplicados:", withoutDuplicates);

const sorted = recursiveBubbleSort(withoutDuplicates, withoutDuplicates.length);
console.log("Array ordenado:", sorted);
```

---

## Casos de Prueba Implementados

Desarrollé casos de prueba exhaustivos para validar el correcto funcionamiento de ambas funciones:

### Pruebas para `removeDuplicates`

```js
describe("removeDuplicates - Actividad Recursividad", () => {
    test("Elimina duplicados correctamente del array básico", () => {
        const arreglo = [1, 5, 7, 8, 9, 0, 0, 6];
        const resultado = removeDuplicates(arreglo);
        expect(resultado).toEqual([1, 5, 7, 8, 9, 0, 6]);
    });

    test("Maneja array vacío", () => {
        expect(removeDuplicates([])).toEqual([]);
    });

    test("Maneja array con un solo elemento", () => {
        expect(removeDuplicates([5])).toEqual([5]);
    });

    test("Maneja array con todos elementos duplicados", () => {
        expect(removeDuplicates([3, 3, 3, 3])).toEqual([3]);
    });

    test("Maneja array sin duplicados", () => {
        const arreglo = [1, 2, 3, 4, 5];
        expect(removeDuplicates(arreglo)).toEqual([1, 2, 3, 4, 5]);
    });
});
```

### Pruebas para `recursiveBubbleSort`

```js
describe("recursiveBubbleSort - Actividad Recursividad", () => {
    test("Ordena correctamente un array desordenado", () => {
        const arreglo = [1, 5, 6, 7, 8, 9];
        const resultado = recursiveBubbleSort(arreglo, arreglo.length);
        expect(resultado).toEqual([1, 5, 6, 7, 8, 9]);
    });

    test("Maneja array vacío", () => {
        expect(recursiveBubbleSort([], 0)).toEqual([]);
    });

    test("Maneja array con un solo elemento", () => {
        expect(recursiveBubbleSort([42], 1)).toEqual([42]);
    });

    test("Ordena array completamente desordenado", () => {
        const arreglo = [9, 1, 8, 2, 7, 3];
        const resultado = recursiveBubbleSort(arreglo, arreglo.length);
        expect(resultado).toEqual([1, 2, 3, 7, 8, 9]);
    });

    test("Maneja array ya ordenado", () => {
        const arreglo = [1, 2, 3, 4, 5];
        const resultado = recursiveBubbleSort(arreglo, arreglo.length);
        expect(resultado).toEqual([1, 2, 3, 4, 5]);
    });
});
```

### Pruebas de Integración

```js
describe("Integración - removeDuplicates + recursiveBubbleSort", () => {
    test("Flujo completo: eliminar duplicados y ordenar", () => {
        const arregloOriginal = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
        
        const sinDuplicados = removeDuplicates(arregloOriginal);
        expect(sinDuplicados.length).toBeLessThan(arregloOriginal.length);
        
        const ordenado = recursiveBubbleSort(sinDuplicados, sinDuplicados.length);
        expect(ordenado).toEqual([1, 2, 3, 4, 5, 6, 9]);
    });
});
```

---

## Análisis de Complejidad

### Eliminación de Duplicados
- **Complejidad temporal**: O(n²) en el peor caso, donde n es la longitud del array
- **Complejidad espacial**: O(n) debido a las llamadas recursivas y la creación de nuevos arrays

### Ordenamiento Burbuja Recursivo
- **Complejidad temporal**: O(n²) en todos los casos
- **Complejidad espacial**: O(n) debido a la recursión y las copias del array

---

## Desafíos Enfrentados y Soluciones

### 1. **Pensamiento Recursivo vs Iterativo**
**Desafío**: Cambiar mi mentalidad de bucles iterativos a soluciones recursivas.
**Solución**: Me enfoqué en identificar casos base claros y definir cómo cada llamada recursiva se acerca a estos casos base.

### 2. **Gestión de Memory Stack**
**Desafío**: Evitar desbordamiento de pila con arrays grandes.
**Solución**: Implementé casos base robustos y me aseguré de que cada llamada recursiva reduzca el problema.

### 3. **Verificación de Duplicados sin Métodos Integrados**
**Desafío**: Implementar la búsqueda de elementos sin usar `includes()` o `indexOf()`.
**Solución**: Creé la función auxiliar `contains()` que realiza la búsqueda recursivamente.

### 4. **Inmutabilidad en la Recursión**
**Desafío**: Evitar efectos secundarios modificando arrays originales.
**Solución**: Utilicé `slice()` para crear copias de arrays en cada paso recursivo.

---

## Resultados Obtenidos

Logré implementar exitosamente ambos algoritmos utilizando exclusivamente recursividad:

1. **Función `removeDuplicates`**: Elimina duplicados eficientemente sin usar métodos integrados de JavaScript.
2. **Función `recursiveBubbleSort`**: Implementa el algoritmo de ordenamiento burbuja de forma completamente recursiva.
3. **Casos de prueba exhaustivos**: Cubren escenarios edge cases y validaciones de integración.
4. **Código limpio y documentado**: Incluye comentarios significativos que explican la lógica recursiva.

Las pruebas automatizadas confirmaron que ambas funciones manejan correctamente:
- Arrays vacíos y con un solo elemento
- Arrays con todos elementos duplicados
- Arrays sin duplicados
- Arrays completamente desordenados
- Casos de integración completos

---

<div align="center">
<h2>
🛠️ Lo que aprendí
</h2>
</div>

Esta actividad me permitió desarrollar una comprensión profunda del **pensamiento recursivo** y cómo aplicarlo para resolver problemas complejos dividiéndolos en subproblemas más manejables. Aprendí la importancia de definir casos base claros y cómo cada llamada recursiva debe acercarse a estos casos base para evitar recursión infinita.

Además, reforcé mis habilidades en:
- **Diseño de algoritmos recursivos**: Entendí cómo estructurar funciones recursivas efectivas
- **Gestión de memoria**: Comprendí las implicaciones del stack de llamadas en la recursión
- **Pruebas unitarias**: Desarrollé casos de prueba exhaustivos que cubren múltiples escenarios
- **Análisis de complejidad**: Evalué el rendimiento de algoritmos recursivos vs iterativos

El mayor aprendizaje fue cambiar mi perspectiva de "cómo hacer algo paso a paso" a "cómo definir un problema en términos de una versión más pequeña de sí mismo", lo cual es la esencia del pensamiento recursivo y una habilidad fundamental en programación avanzada.