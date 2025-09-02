const inventoryDB = new Map();
const productInfoDB = new Map();
const productQueues = new Map();

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

function getProductQueue(productId) {
  if (!productQueues.has(productId)) {
    productQueues.set(productId, Promise.resolve());
  }
  return productQueues.get(productId);
}

function setProductQueue(productId, queue) {
  productQueues.set(productId, queue);
}

function simulateNetworkFailure() {
  return Math.random() < 0.2; 
}

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

main();