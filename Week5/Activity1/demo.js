import Pet from './Pet.js';
import Food from './Products/Food.js';
import Toy from './Products/Toy.js';
import BasicCare from './Care/BasicCare.js';
import SpecialCare from './Care/SpecialCare.js';
import Customer from './Customer.js';
import LocalStoragePersistence from './Persistence/LocalStoragePersistence.js';
import PetStore from './PetStore.js';

function demoSystem() {
    console.log("=== DEMOSTRACIÓN DEL SISTEMA DE TIENDA DE MASCOTAS ===\n");
    
    const persistence = new LocalStoragePersistence("demo_");
    const store = new PetStore(persistence);
    
    console.log("1. Creando mascotas...");
    const pet1 = new Pet("P001", "Buddy", "Dog", "Golden Retriever", 3, "John Doe");
    const pet2 = new Pet("P002", "Whiskers", "Cat", "Persian", 5, "Jane Smith");
    
    store.addPet(pet1);
    store.addPet(pet2);
    console.log(`   - ${pet1.toString()}`);
    console.log(`   - ${pet2.toString()}`);
    
    console.log("\n2. Añadiendo productos...");
    const food1 = new Food("F001", "Premium Dog Food", 45.0, 100, "2024-12-31", "Dog");
    const food2 = new Food("F002", "Cat Food Deluxe", 35.0, 80, "2024-11-30", "Cat");
    const toy1 = new Toy("T001", "Rope Toy", 15.0, 50, "Cotton", "Large");
    const toy2 = new Toy("T002", "Feather Wand", 12.0, 30, "Feathers", "Medium");
    
    [food1, food2, toy1, toy2].forEach(product => {
        store.addProduct(product);
        console.log(`   - ${product.name} (${product.getCategory()}) - $${product.price}`);
    });
    
    console.log("\n3. Programando servicios de cuidado...");
    const basicCare = new BasicCare("C001", pet1, "2024-08-05");
    const specialCare = new SpecialCare("C002", pet2, "2024-08-06", "dental");
    
    store.addCareService(basicCare);
    store.addCareService(specialCare);
    
    console.log(`   - Cuidado básico para ${pet1.name}: $${basicCare.getCost()}`);
    console.log(`   - Cuidado especial para ${pet2.name}: $${specialCare.getCost()}`);
    
    console.log("\n4. Registrando clientes...");
    const customer1 = new Customer("CU001", "John Doe", "john@email.com", "555-0123");
    const customer2 = new Customer("CU002", "Jane Smith", "jane@email.com", "555-0456");
    
    customer1.addPet(pet1);
    customer2.addPet(pet2);
    
    store.addCustomer(customer1);
    store.addCustomer(customer2);
    
    console.log(`   - Cliente: ${customer1.name}`);
    console.log(`   - Cliente: ${customer2.name}`);
    
    console.log("\n5. Procesando ventas...");
    store.processSale("CU001", ["F001", "T001"], [2, 1]);
    store.processSale("CU002", ["F002", "T002"], [1, 2]);
    
    console.log("   - Ventas procesadas exitosamente");
    
    console.log("\n6. Generando reportes...");
    const report1 = store.getCustomerReport("CU001");
    const report2 = store.getCustomerReport("CU002");
    
    [report1, report2].forEach((report, index) => {
        const customerInfo = report.customerInfo;
        console.log(`   Cliente ${index + 1}: ${customerInfo.name}`);
        console.log(`   - Total gastado: ${customerInfo.totalSpent.toFixed(2)}`);
        console.log(`   - Puntos de lealtad: ${customerInfo.loyaltyPoints}`);
        console.log(`   - Mascotas: ${customerInfo.petsCount}`);
    });
    
    console.log("\n7. Reporte de inventario...");
    const inventoryReport = store.getInventoryReport();
    console.log(`   - Total de productos: ${inventoryReport.totalProducts}`);
    console.log(`   - Categorías: ${JSON.stringify(inventoryReport.categories)}`);
    if (inventoryReport.lowStock.length > 0) {
        console.log("   - Productos con stock bajo:");
        inventoryReport.lowStock.forEach(item => {
            console.log(`     * ${item.name}: ${item.stock} unidades`);
        });
    }
    
    console.log("\n=== DEMOSTRACIÓN COMPLETADA ===");
}

demoSystem();