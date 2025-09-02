import { readFileSync, writeFileSync } from 'fs';
import { question } from 'readline-sync';
import { handleNestedObject } from './handleNestedObject.js';

let users = JSON.parse(readFileSync('./inusers.json', 'utf-8'));

function findUserById(id) {
  return users.find(user => user.id === id);
}


// me hice una cli con un LLM para que sea mas facil de usar, la estructura creada en el otro archivo, solo importe en find y el json, 
// la function main si lo realizo el LLM

function main() {
  console.log("=== GESTOR DE USUARIOS INMUTABLE ===\n");
  const id = parseInt(question("Ingrese el ID del usuario: "));
  const user = findUserById(id);

  if (!user) {
    console.log("❌ Usuario no encontrado.");
    return;
  }

  console.log("\nOperaciones disponibles:");
  console.log("1. Actualizar propiedad anidada");
  console.log("2. Agregar propiedad anidada");
  console.log("3. Eliminar propiedad anidada");
  console.log("4. Clonar usuario");

  const option = question("\nSeleccione una opcion (1-4): ");
  let path, value, updated;

  switch (option) {
    case '1': 
      path = question("Ingrese la ruta (ej: address.city): ").split('.');
      value = question("Nuevo valor: ");
      updated = handleNestedObject(user, path, 'update', value);
      break;

    case '2':
      path = question("Ingrese la nueva ruta (ej: social.instagram): ").split('.');
      value = question("Valor a agregar: ");
      updated = handleNestedObject(user, path, 'add', value);
      break;

    case '3': 
      path = question("Ruta a eliminar (ej: social.facebook): ").split('.');
      updated = handleNestedObject(user, path, 'delete');
      break;

    case '4': 
      updated = handleNestedObject(user, [], 'clone');
      break;

    default:
      console.log("❌ Opción inválida.");
      return;
  }

  console.log("\n✅ Resultado:");
  console.log(updated);

  const guardar = question("\n¿Desea guardar este cambio en el archivo? (s/n): ");
  if (guardar.toLowerCase() === 's') {
    users = users.map(u => u.id === id ? updated : u);
    writeFileSync('./inusers.json', JSON.stringify(users, null, 2), 'utf-8');
    console.log("✅ Archivo actualizado con éxito.");
  } else {
    console.log("❌ Cambio descartado. No se modificó el archivo.");
  }
}

main();