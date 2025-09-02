import Customer from './Customer.js';
import Product from './Products/Product.js';
import Pet from './Pet.js';
import Care from './Care/Care.js';

export default class PetStore {
    constructor(persistence) {
        this.persistence = persistence; 
        this.customers = new Map();
        this.products = new Map();
        this.pets = new Map();
        this.careServices = new Map();
        this.loadAllData();
    }

    addCustomer(customer) {
        this.customers.set(customer.customerId, customer);
        this.saveCustomers();
    }

    addProduct(product) {
        this.products.set(product.productId, product);
        this.saveProducts();
    }

    addPet(pet) {
        this.pets.set(pet.petId, pet);
        this.savePets();
    }

    addCareService(care) {
        this.careServices.set(care.careId, care);
        this.saveCareServices();
    }

    processSale(customerId, productIds, quantities) {
        if (!this.customers.has(customerId)) {
            throw new Error("Cliente no encontrado");
        }

        const customer = this.customers.get(customerId);
        const products = [];

        for (let i = 0; i < productIds.length; i++) {
            const productId = productIds[i];
            const quantity = quantities[i];

            if (!this.products.has(productId)) {
                throw new Error(`Producto ${productId} no encontrado`);
            }

            const product = this.products.get(productId);
            if (product.stock < quantity) {
                throw new Error(`Stock insuficiente para ${product.name}`);
            }

            product.updateStock(-quantity);
            products.push(product);
        }

        customer.addPurchase(products, quantities);
        this.saveCustomers();
        this.saveProducts();
    }

    getCustomerReport(customerId) {
        if (!this.customers.has(customerId)) {
            return null;
        }

        const customer = this.customers.get(customerId);
        return {
            customerInfo: customer.getInfo(),
            pets: customer.pets.map(pet => pet.getInfo()),
            recentPurchases: customer.purchaseHistory.slice(-5), 
            careHistory: customer.careHistory.map(care => care.getInfo())
        };
    }

    saveCustomers() {
        const data = {};
        this.customers.forEach((customer, id) => {
            data[id] = customer.getInfo();
        });
        this.persistence.saveData("customers", data);
    }

    saveProducts() {
        const data = {};
        this.products.forEach((product, id) => {
            data[id] = product.getInfo();
        });
        this.persistence.saveData("products", data);
    }

    savePets() {
        const data = {};
        this.pets.forEach((pet, id) => {
            data[id] = pet.getInfo();
        });
        this.persistence.saveData("pets", data);
    }

    saveCareServices() {
        const data = {};
        this.careServices.forEach((care, id) => {
            data[id] = care.getInfo();
        });
        this.persistence.saveData("care_services", data);
    }

    loadAllData() {
        const customersData = this.persistence.loadData("customers");
        const productsData = this.persistence.loadData("products");
        const petsData = this.persistence.loadData("pets");
        const careData = this.persistence.loadData("care_services");

        if (customersData) {
            console.log(`Cargados ${Object.keys(customersData).length} clientes`);
        }
        if (productsData) {
            console.log(`Cargados ${Object.keys(productsData).length} productos`);
        }
        if (petsData) {
            console.log(`Cargadas ${Object.keys(petsData).length} mascotas`);
        }
        if (careData) {
            console.log(`Cargados ${Object.keys(careData).length} servicios de cuidado`);
        }
    }

    getInventoryReport() {
        const report = {
            totalProducts: this.products.size,
            categories: {},
            lowStock: []
        };

        this.products.forEach(product => {
            const category = product.getCategory();
            report.categories[category] = (report.categories[category] || 0) + 1;

            if (product.stock <= 5) {
                report.lowStock.push({
                    name: product.name,
                    stock: product.stock,
                    category: category
                });
            }
        });

        return report;
    }
}