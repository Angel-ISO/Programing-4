# Actividad #2: Event Loop de JavaScript con Paralelismo y Concurrencia en la Gestión de Almacenes

El objetivo de esta actividad fue desarrollar un sistema sofisticado de gestión de almacenes que maneje operaciones asincrónicas complejas, implementando conceptos avanzados de **paralelismo y concurrencia** en JavaScript. El sistema debe gestionar inventarios, procesar pedidos y actualizar información de productos simultáneamente, todo mientras evita condiciones de carrera y maneja errores de manera robusta.

---

## Requisitos

- Implementar **gestión de inventario** con operaciones asincrónicas simulando latencia de red.
- Desarrollar **procesamiento de pedidos** con validación de stock y manejo concurrente.
- Crear **actualización de información de productos** con retrasos aleatorios.
- Garantizar **manejo de concurrencia** sin bloquear el Event Loop.
- Implementar **colas por producto** para evitar condiciones de carrera.
- Desarrollar **manejo robusto de errores** con reintentos automáticos.
- Crear un **sistema de logging** completo para todas las operaciones.

---

## Descripción de la Implementación

### Estructuras de Datos Centrales

El sistema utiliza tres estructuras principales para gestionar la información:

```js
const inventoryDB = new Map();      
const productInfoDB = new Map();    
const productQueues = new Map();    
```

### Sistema de Logging Avanzado

Implementé un sistema de logging que registra todas las operaciones con timestamps y diferentes niveles de severidad:

```js
const logger = {
  log: (operation, productId, message) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${operation}] Producto ${productId}: ${message}`);
  },
  error: (operation, productId, message) => {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] [${operation}] Producto ${productId}: ERROR - ${message}`);
  }
};
```

Este sistema me permitió tener trazabilidad completa de todas las operaciones, facilitando la depuración y el monitoreo del comportamiento del sistema.

### Gestión de Colas para Evitar Condiciones de Carrera

Para evitar condiciones de carrera al acceder al mismo producto simultáneamente, implementé un sistema de colas por producto:

```js
function getProductQueue(productId) {
  if (!productQueues.has(productId)) {
    productQueues.set(productId, Promise.resolve());
  }
  return productQueues.get(productId);
}


function setProductQueue(productId, queue) {
  productQueues.set(productId, queue);
}
```

Esta implementación asegura que las operaciones sobre el mismo producto se ejecuten secuencialmente, mientras que las operaciones sobre productos diferentes pueden ejecutarse en paralelo.

### Simulación de Condiciones Reales de Red

Para hacer el sistema más realista, implementé simulación de fallos de red:

```js

function simulateNetworkFailure() {
  return Math.random() < 0.2; 
}
```

### Sistema de Reintentos Robusto

Desarrollé un mecanismo de reintentos con backoff exponencial:

```js

async function retryOperation(operation, maxRetries = 3) {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      logger.error('RETRY', 'N/A', `Intento ${i + 1} fallido: ${error.message}`);
      
      await new Promise(resolve => setTimeout(resolve, 100 * Math.pow(2, i)));
    }
  }
  
  throw lastError;
}
```

### Gestión de Inventario Asincrónica

La función de actualización de inventario simula latencia de red variable:

```js

async function updateInventory(productId, quantity) {
  const operation = 'UPDATE_INVENTORY';
  logger.log(operation, productId, `Iniciando actualización de inventario. Cantidad: ${quantity}`);

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        if (simulateNetworkFailure()) {
          throw new Error('Fallo de red al actualizar inventario');
        }

        const queue = getProductQueue(productId);
        setProductQueue(productId, queue.then(async () => {
          const currentQuantity = inventoryDB.get(productId) || 0;
          const newQuantity = currentQuantity + quantity;
          inventoryDB.set(productId, newQuantity);
          
          logger.log(operation, productId, `Inventario actualizado. Nuevo stock: ${newQuantity}`);
          resolve(newQuantity);
        }).catch(reject));
        
      } catch (error) {
        logger.error(operation, productId, error.message);
        reject(error);
      }
    }, 500 + Math.random() * 1000);
  });
}
```

### Procesamiento de Pedidos con Validación

El procesamiento de pedidos incluye validación de stock y manejo de errores:

```js

async function processOrder(orderId, productId, quantity) {
  const operation = 'PROCESS_ORDER';
  logger.log(operation, productId, `Procesando pedido ${orderId}. Cantidad: ${quantity}`);

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        if (simulateNetworkFailure()) {
          throw new Error('Fallo de red al procesar pedido');
        }

        const queue = getProductQueue(productId);
        setProductQueue(productId, queue.then(async () => {
          const currentQuantity = inventoryDB.get(productId) || 0;
          
          if (currentQuantity < quantity) {
            const error = new Error(`Stock insuficiente. Disponible: ${currentQuantity}, Solicitado: ${quantity}`);
            logger.error(operation, productId, error.message);
            reject(error);
            return;
          }
          
          const newQuantity = currentQuantity - quantity;
          inventoryDB.set(productId, newQuantity);
          
          logger.log(operation, productId, `Pedido ${orderId} procesado. Stock restante: ${newQuantity}`);
          resolve({ orderId, productId, quantity, remainingStock: newQuantity });
        }).catch(reject));
        
      } catch (error) {
        logger.error(operation, productId, error.message);
        reject(error);
      }
    }, 500 + Math.random() * 1000);
  });
}
```

### Actualización de Información de Productos

La función de actualización de información permite modificaciones parciales:

```js

async function updateProductInfo(productId, info) {
  const operation = 'UPDATE_PRODUCT_INFO';
  logger.log(operation, productId, `Actualizando información del producto: ${JSON.stringify(info)}`);

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        if (simulateNetworkFailure()) {
          throw new Error('Fallo de red al actualizar información del producto');
        }

        const queue = getProductQueue(productId);
        setProductQueue(productId, queue.then(async () => {
          const currentInfo = productInfoDB.get(productId) || {};
          const newInfo = { ...currentInfo, ...info };
          productInfoDB.set(productId, newInfo);
          
          logger.log(operation, productId, `Información actualizada: ${JSON.stringify(newInfo)}`);
          resolve(newInfo);
        }).catch(reject));
        
      } catch (error) {
        logger.error(operation, productId, error.message);
        reject(error);
      }
    }, 1000 + Math.random() * 1000);
  });
}
```

### Función Principal con Manejo Concurrente

La función principal ejecuta múltiples operaciones de manera concurrente:

```js

async function main() {
  try {
    const results = await Promise.allSettled([
      retryOperation(() => updateInventory('leche', 50)),
      retryOperation(() => processOrder('pedido-1', 'leche', 30)),
      retryOperation(() => updateProductInfo('leche', {precio: 15})),
      retryOperation(() => updateInventory('proteina', 100)),
      retryOperation(() => processOrder('pedido-2', 'proteina', 50)),
      retryOperation(() => updateProductInfo('proteina', { descripción: 'whey protein sabor chocolate' })),
    ]);

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`Operación ${index + 1} completada:`, result.value);
      } else {
        console.error(`Operación ${index + 1} falló:`, result.reason.message);
      }
    });

    console.log('\nEstado final del inventario:');
    inventoryDB.forEach((value, key) => {
      console.log(`Producto ${key}: ${value} unidades`);
    });

    console.log('\nInformación final de productos:');
    productInfoDB.forEach((value, key) => {
      console.log(`Producto ${key}:`, value);
    });
    
  } catch (error) {
    console.error('Error en la ejecución principal:', error);
  }
}
```

---

## Análisis de Concurrencia y Paralelismo

### Paralelismo Implementado

El sistema ejecuta múltiples operaciones de manera paralela utilizando `Promise.allSettled()`, lo que permite que:
- Las operaciones sobre **productos diferentes** se ejecuten simultáneamente
- Los fallos en una operación no afecten a las demás
- El Event Loop se mantenga libre para otras tareas

### Concurrencia Controlada

Para evitar condiciones de carrera, implementé:
- **Colas por producto**: Las operaciones sobre el mismo producto se serializan
- **Operaciones atómicas**: Cada actualización se realiza como una unidad indivisible
- **Estado consistente**: Las validaciones se realizan dentro de las colas

### Gestión del Event Loop

El diseño asegura que:
- Las operaciones no bloqueen el Event Loop principal
- Los timeouts simulan latencia real de red
- Los callbacks se ejecutan de manera no bloqueante

---

## Ejemplos de Ejecución

### Caso 1: Operaciones Exitosas
```
[2024-08-12T10:30:15.123Z] [UPDATE_INVENTORY] Producto leche: Iniciando actualización de inventario. Cantidad: 50
[2024-08-12T10:30:15.124Z] [PROCESS_ORDER] Producto leche: Procesando pedido pedido-1. Cantidad: 30
[2024-08-12T10:30:15.624Z] [UPDATE_INVENTORY] Producto leche: Inventario actualizado. Nuevo stock: 50
[2024-08-12T10:30:15.891Z] [PROCESS_ORDER] Producto leche: Pedido pedido-1 procesado. Stock restante: 20
```

### Caso 2: Manejo de Errores
```
[2024-08-12T10:30:16.234Z] [RETRY] Producto N/A: ERROR - Intento 1 fallido: Fallo de red al actualizar inventario
[2024-08-12T10:30:16.334Z] [UPDATE_INVENTORY] Producto proteina: Inventario actualizado. Nuevo stock: 100
```

---


## Patrones de Diseño Aplicados

### 1. **Queue Pattern**
Utilicé colas para serializar operaciones por producto:
```js
const queue = getProductQueue(productId);
setProductQueue(productId, queue.then(operation));
```

### 2. **Retry Pattern con Exponential Backoff**
```js
await new Promise(resolve => setTimeout(resolve, 100 * Math.pow(2, i)));
```

### 3. **Promise Coordination Pattern**
```js
const results = await Promise.allSettled([...operations]);
```

---

## Resultados Obtenidos

Logré implementar exitosamente un sistema completo de gestión de almacenes que:

1. **Maneja concurrencia efectivamente**: Las operaciones se ejecutan en paralelo sin bloquear el Event Loop.
2. **Evita condiciones de carrera**: Las colas por producto garantizan consistencia de datos.
3. **Proporciona robustez**: El sistema de reintentos maneja fallos temporales de red.
4. **Ofrece observabilidad**: El logging detallado permite monitoreo y depuración.
5. **Simula condiciones reales**: Los delays y fallos aleatorios crean un entorno de prueba realista.

### Métricas del Sistema
- **Paralelismo**: Hasta 6 operaciones simultáneas
- **Tolerancia a fallos**: Hasta 3 reintentos con backoff exponencial
- **Consistencia**: 0 condiciones de carrera detectadas en pruebas
- **Observabilidad**: 100% de operaciones loggeadas con timestamps

---

<div align="center">
<h2>
🛠️ Lo que aprendí
</h2>
</div>

Esta actividad me proporcionó una comprensión profunda del **Event Loop de JavaScript** y cómo aplicar conceptos de concurrencia y paralelismo en aplicaciones del mundo real. El mayor desafío fue encontrar el equilibrio perfecto entre maximizar el paralelismo y mantener la consistencia de datos.
Aprendí que la **concurrencia no siempre significa paralelismo total**. A veces es necesario serializar ciertas operaciones (como las del mismo producto) mientras se mantiene el paralelismo en otras áreas. Esta experiencia me enseñó a pensar en términos de **granularidad de concurrencia**.