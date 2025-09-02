/**
 * Garantizar que las modificaciones del objeto anidado no muten el objeto original. En su lugar, crea y devuelve un nuevo objeto con la estructura actualizada
 * @param {Object} obj - El objeto original.
 * @param {Array<string>} path - Ruta en forma de array a la propiedad anidada en el objeto
 * @param {string} que es lo que se va a hacer update, add, delete, clone.
 * @param {value} si es que se actualiza o modifica pues aqui se guarda
 * @returns {Object} el objeto nuevo sin sobreescribir el nada, lo copio en memoria y no lo muto
 */
export function handleNestedObject(obj, path, operation, value) {
  if (operation === 'clone') {
    return structuredClone(obj); 
  }

  const deepCopy = (current, i = 0) => {
    if (i === path.length - 1) {
      const key = path[i];

      if (operation === 'delete') {
        const { [key]: _, ...rest } = current;
        return rest;
      }

      return {
        ...current,
        [key]: value,
      };
    }

    const key = path[i];
    return {
      ...current,
      [key]: deepCopy(current[key] || {}, i + 1),
    };
  };

  return deepCopy(obj);
}


