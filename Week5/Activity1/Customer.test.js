import Customer from './Customer.js';
import Pet from './Pet.js';
import Food from './Products/Food.js';
import Toy from './Products/Toy.js';
import BasicCare from './Care/BasicCare.js';

describe('Customer Class Tests', () => {
  test('should create a customer with correct properties', () => {
    const customer = new Customer('C001', 'John Doe', 'john@example.com', '555-1234');
    
    expect(customer.customerId).toBe('C001');
    expect(customer.name).toBe('John Doe');
    expect(customer.email).toBe('john@example.com');
    expect(customer.phone).toBe('555-1234');
    expect(customer.pets).toEqual([]);
    expect(customer.purchaseHistory).toEqual([]);
    expect(customer.careHistory).toEqual([]);
    expect(customer.loyaltyPoints).toBe(0);
  });

  test('should add and remove pets correctly', () => {
    const customer = new Customer('C001', 'John Doe', 'john@example.com', '555-1234');
    const pet1 = new Pet('P001', 'Buddy', 'Dog', 'Golden Retriever', 3, 'John Doe');
    const pet2 = new Pet('P002', 'Whiskers', 'Cat', 'Persian', 5, 'John Doe');
    
    customer.addPet(pet1);
    expect(customer.pets.length).toBe(1);
    expect(customer.pets[0]).toBe(pet1);
    
    customer.addPet(pet2);
    expect(customer.pets.length).toBe(2);
    
    customer.removePet('P001');
    expect(customer.pets.length).toBe(1);
    expect(customer.pets[0]).toBe(pet2);
    
    customer.removePet('P999'); 
    expect(customer.pets.length).toBe(1);
  });

  test('should add purchases and calculate loyalty points correctly', () => {
    const customer = new Customer('C001', 'John Doe', 'john@example.com', '555-1234');
    const food = new Food('F001', 'Premium Dog Food', 45.0, 20, '2024-12-31', 'Dog');
    const toy = new Toy('T001', 'Rope Toy', 15.0, 30, 'Cotton', 'Medium');
    
    customer.addPurchase([food, toy], [2, 1]);
    
    expect(customer.purchaseHistory.length).toBe(1);
    expect(customer.purchaseHistory[0].items.length).toBe(2);
    expect(customer.purchaseHistory[0].items[0].quantity).toBe(2);
    expect(customer.purchaseHistory[0].items[1].quantity).toBe(1);
    expect(customer.purchaseHistory[0].total).toBe(105); // 45*2 + 15*1
    expect(customer.loyaltyPoints).toBe(10); // 105/10 = 10.5 rounded down
    
    // Add another purchase
    customer.addPurchase([food], [1]);
    expect(customer.purchaseHistory.length).toBe(2);
    expect(customer.loyaltyPoints).toBe(14); // 10 + 45/10 = 14.5 rounded down
  });

  test('should schedule care services correctly', () => {
    const customer = new Customer('C001', 'John Doe', 'john@example.com', '555-1234');
    const pet = new Pet('P001', 'Buddy', 'Dog', 'Golden Retriever', 3, 'John Doe');
    customer.addPet(pet);
    
    const care = new BasicCare('C001', pet, '2024-08-10');
    customer.scheduleCare(care);
    
    expect(customer.careHistory.length).toBe(1);
    expect(customer.careHistory[0]).toBe(care);
  });

  test('should throw error when scheduling care for non-owned pet', () => {
    const customer = new Customer('C001', 'John Doe', 'john@example.com', '555-1234');
    const pet = new Pet('P001', 'Buddy', 'Dog', 'Golden Retriever', 3, 'Jane Smith'); // Different owner
    
    const care = new BasicCare('C001', pet, '2024-08-10');
    
    expect(() => customer.scheduleCare(care)).toThrow('La mascota no pertenece a este cliente');
  });

  test('should calculate total spent correctly', () => {
    const customer = new Customer('C001', 'John Doe', 'john@example.com', '555-1234');
    const food = new Food('F001', 'Premium Dog Food', 45.0, 20, '2024-12-31', 'Dog');
    const toy = new Toy('T001', 'Rope Toy', 15.0, 30, 'Cotton', 'Medium');
    
    customer.addPurchase([food, toy], [2, 1]);
    customer.addPurchase([food], [1]);
    
    expect(customer.getTotalSpent()).toBe(150); // 45*2 + 15*1 + 45*1
  });

  test('should return customer info correctly', () => {
    const customer = new Customer('C001', 'John Doe', 'john@example.com', '555-1234');
    const pet = new Pet('P001', 'Buddy', 'Dog', 'Golden Retriever', 3, 'John Doe');
    customer.addPet(pet);
    
    const food = new Food('F001', 'Premium Dog Food', 45.0, 20, '2024-12-31', 'Dog');
    customer.addPurchase([food], [1]);
    
    const info = customer.getInfo();
    
    expect(info.customerId).toBe('C001');
    expect(info.name).toBe('John Doe');
    expect(info.email).toBe('john@example.com');
    expect(info.phone).toBe('555-1234');
    expect(info.petsCount).toBe(1);
    expect(info.totalSpent).toBe(45);
    expect(info.loyaltyPoints).toBe(4);
  });
});