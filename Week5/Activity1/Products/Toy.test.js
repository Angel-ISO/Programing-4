import Toy from './Toy.js';

describe('Toy Class Tests', () => {
  test('should create a toy product with correct properties', () => {
    const toy = new Toy('T001', 'Rope Toy', 15.0, 30, 'Cotton', 'Medium');
    
    expect(toy.productId).toBe('T001');
    expect(toy.name).toBe('Rope Toy');
    expect(toy.price).toBe(15.0);
    expect(toy.stock).toBe(30);
    expect(toy.material).toBe('Cotton');
    expect(toy.size).toBe('Medium');
  });

  test('should return correct category', () => {
    const toy = new Toy('T001', 'Rope Toy', 15.0, 30, 'Cotton', 'Medium');
    expect(toy.getCategory()).toBe('Toy');
  });

  test('should calculate discount correctly based on quantity', () => {
    const toy = new Toy('T001', 'Rope Toy', 15.0, 30, 'Cotton', 'Medium');
    
    expect(toy.calculateDiscount(1)).toBe(0);
    expect(toy.calculateDiscount(2)).toBe(0);
    expect(toy.calculateDiscount(3)).toBe(0);
    expect(toy.calculateDiscount(4)).toBe(0);
    expect(toy.calculateDiscount(5)).toBe(0.12);
    expect(toy.calculateDiscount(9)).toBe(0.12);
    expect(toy.calculateDiscount(10)).toBe(0.20);
    expect(toy.calculateDiscount(15)).toBe(0.20);
  });

  test('should update stock correctly', () => {
    const toy = new Toy('T001', 'Rope Toy', 15.0, 30, 'Cotton', 'Medium');
    
    toy.updateStock(-5);
    expect(toy.stock).toBe(25);
    
    toy.updateStock(10);
    expect(toy.stock).toBe(35);
  });

  test('should throw error when updating stock below zero', () => {
    const toy = new Toy('T001', 'Rope Toy', 15.0, 5, 'Cotton', 'Medium');
    
    expect(() => toy.updateStock(-10)).toThrow();
  });

  test('should return detailed info', () => {
    const toy = new Toy('T001', 'Rope Toy', 15.0, 30, 'Cotton', 'Medium');
    const info = toy.getInfo();
    
    expect(info.productId).toBe('T001');
    expect(info.name).toBe('Rope Toy');
    expect(info.price).toBe(15.0);
    expect(info.stock).toBe(30);
    expect(info.category).toBe('Toy');
    expect(info.material).toBe('Cotton');
    expect(info.size).toBe('Medium');
  });
});