import Pet from './Pet.js';
import Food from './Products/Food.js';
import Toy from './Products/Toy.js';
import BasicCare from './Care/BasicCare.js';
import SpecialCare from './Care/SpecialCare.js';
import Customer from './Customer.js';
import LocalStoragePersistence from './Persistence/LocalStoragePersistence.js';
import PetStore from './PetStore.js';

const assert = (condition, message) => {
    expect(condition).toBe(true);
};

const assertEqual = (actual, expected, message) => {
    expect(actual).toBe(expected);
};

const assertThrows = (fn, message) => {
    expect(fn).toThrow();
};

const testSuite = {
    assert,
    assertEqual,
    assertThrows
};

describe('PetStore System Tests', () => {

test("Pet SRP - Creación y actualización", () => {
    const pet = new Pet("P001", "Buddy", "Dog", "Golden Retriever", 3, "John Doe");
    
    expect(pet.name).toBe("Buddy");
    expect(pet.age).toBe(3);
    
    pet.updateAge(4);
    expect(pet.age).toBe(4);
    
    expect(() => pet.updateAge(-1)).toThrow();
    
    const info = pet.getInfo();
    expect(info.hasOwnProperty('petId')).toBe(true);
    expect(info.hasOwnProperty('createdAt')).toBe(true);
});

test("Product OCP - Polimorfismo y extensión", () => {
    const food = new Food("F001", "Dog Food Premium", 25.0, 50, "2024-12-31", "Dog");
    const toy = new Toy("T001", "Rope Toy", 15.0, 30, "Cotton", "Medium");
    
    const products = [food, toy];
    
    products.forEach(product => {
        expect(typeof product.getCategory).toBe('function');
        expect(typeof product.calculateDiscount).toBe('function');
    });
    
    expect(food.calculateDiscount(3)).toBe(0.10);
    expect(food.calculateDiscount(5)).toBe(0.15);
    expect(toy.calculateDiscount(5)).toBe(0.12);
    expect(toy.calculateDiscount(10)).toBe(0.20);
});

test("Care LSP - Sustitución de clases", () => {
    const pet = new Pet("P002", "Whiskers", "Cat", "Persian", 5, "Jane Smith");
    
    const basicCare = new BasicCare("C001", pet, "2024-08-05");
    const specialCare = new SpecialCare("C002", pet, "2024-08-06", "dental");
    
    const careServices = [basicCare, specialCare];
    
    careServices.forEach(care => {
        expect(care.getCost() > 0).toBe(true);
        expect(care.getDuration() > 0).toBe(true);
        
        care.completeService();
        expect(care.completed).toBe(true);
        
        const info = care.getInfo();
        expect(info.hasOwnProperty('cost')).toBe(true);
        expect(info.hasOwnProperty('duration')).toBe(true);
    });
});

test("Customer ISP - Interfaces específicas", () => {
    const customer = new Customer("CU001", "Alice Johnson", "alice@email.com", "555-0123");
    const pet = new Pet("P003", "Max", "Dog", "Labrador", 2, "Alice Johnson");
    
    customer.addPet(pet);
    expect(customer.pets.length).toBe(1);
    
    const food = new Food("F002", "Cat Food", 20.0, 100, "2024-12-31", "Cat");
    const toy = new Toy("T002", "Ball", 10.0, 50, "Rubber", "Small");
    
    customer.addPurchase([food, toy], [2, 1]);
    expect(customer.purchaseHistory.length).toBe(1);
    expect(customer.loyaltyPoints > 0).toBe(true);
    
    const care = new BasicCare("C003", pet, "2024-08-07");
    customer.scheduleCare(care);
    expect(customer.careHistory.length).toBe(1);
});

test("PetStore DIP - Inversión de dependencias", () => {
    const persistence = new LocalStoragePersistence("test_");
    const store = new PetStore(persistence);
    
    const customer = new Customer("CU002", "Bob Wilson", "bob@email.com", "555-0456");
    const pet = new Pet("P004", "Luna", "Cat", "Siamese", 1, "Bob Wilson");
    const food = new Food("F003", "Premium Cat Food", 30.0, 25, "2024-11-30", "Cat");
    
    store.addCustomer(customer);
    store.addPet(pet);
    store.addProduct(food);
    
    expect(store.customers.has(customer.customerId)).toBe(true);
    expect(store.pets.has(pet.petId)).toBe(true);
    expect(store.products.has(food.productId)).toBe(true);
    
    customer.addPet(pet);
    store.processSale("CU002", ["F003"], [2]);
    
    expect(store.products.get("F003").stock).toBe(23);
    
    const report = store.getCustomerReport("CU002");
    expect(report !== null).toBe(true);
    expect(report.hasOwnProperty('customerInfo')).toBe(true);
});

});