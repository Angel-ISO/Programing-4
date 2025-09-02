const { removeDuplicates, recursiveBubbleSort, contains, bubblePass } = require("./RemoveDuplicates");

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

  test("Maneja duplicados múltiples", () => {
    const arreglo = [1, 2, 2, 3, 3, 3, 4];
    expect(removeDuplicates(arreglo)).toEqual([1, 2, 3, 4]);
  });
});

describe("contains - Función auxiliar", () => {
  test("Encuentra elemento existente", () => {
    const arr = [1, 2, 3, 4, 5];
    expect(contains(arr, 3, 4)).toBe(true);
  });

  test("No encuentra elemento inexistente", () => {
    const arr = [1, 2, 3, 4, 5];
    expect(contains(arr, 6, 4)).toBe(false);
  });

  test("Maneja array vacío", () => {
    expect(contains([], 1, -1)).toBe(false);
  });
});

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

  test("Ordena array con elementos negativos", () => {
    const arreglo = [3, -1, 4, -2, 0];
    const resultado = recursiveBubbleSort(arreglo, arreglo.length);
    expect(resultado).toEqual([-2, -1, 0, 3, 4]);
  });
});

describe("bubblePass - Función auxiliar", () => {
  test("Realiza una pasada correcta", () => {
    const arr = [3, 1, 4, 2];
    const resultado = bubblePass(arr.slice(), 4);
    expect(resultado[resultado.length - 1]).toBe(4);
  });

  test("Maneja array de dos elementos", () => {
    const arr = [2, 1];
    const resultado = bubblePass(arr.slice(), 2);
    expect(resultado).toEqual([1, 2]);
  });
});

describe("Integración - removeDuplicates + recursiveBubbleSort", () => {
  test("Flujo completo: eliminar duplicados y ordenar", () => {
    const arregloOriginal = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
    
    const sinDuplicados = removeDuplicates(arregloOriginal);
    expect(sinDuplicados.length).toBeLessThan(arregloOriginal.length);
    
    const ordenado = recursiveBubbleSort(sinDuplicados, sinDuplicados.length);
    expect(ordenado).toEqual([1, 2, 3, 4, 5, 6, 9]);
  });

  test("Caso del ejemplo original", () => {
    const arreglo = [1, 5, 7, 8, 9, 0, 0, 6];
    
    const sinDuplicados = removeDuplicates(arreglo);
    expect(sinDuplicados).toEqual([1, 5, 7, 8, 9, 0, 6]);
    
    const ordenado = recursiveBubbleSort(sinDuplicados, sinDuplicados.length);
    expect(ordenado).toEqual([0, 1, 5, 6, 7, 8, 9]);
  });

  test("Array con muchos duplicados", () => {
    const arreglo = [5, 5, 5, 1, 1, 3, 3, 3, 2];
    
    const sinDuplicados = removeDuplicates(arreglo);
    expect(sinDuplicados).toEqual([5, 1, 3, 2]);
    
    const ordenado = recursiveBubbleSort(sinDuplicados, sinDuplicados.length);
    expect(ordenado).toEqual([1, 2, 3, 5]);
  });
});