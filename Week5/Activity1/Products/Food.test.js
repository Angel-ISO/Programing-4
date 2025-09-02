import Food from './Food.js';

describe('Food Class Tests', () => {
  test('should create a food product with correct properties', () => {
    const food = new Food('F001', 'Premium Dog Food', 45.0, 20, '2024-12-31', 'Dog');
    
    expect(food.productId).toBe('F001');
    expect(food.name).toBe('Premium Dog Food');
    expect(food.price).toBe(45.0);
    expect(food.stock).toBe(20);
    expect(food.expirationDate).toBe('2024-12-31');
    expect(food.animalType).toBe('Dog');
  });

  test('should return correct category', () => {
    const food = new Food('F001', 'Premium Dog Food', 45.0, 20, '2024-12-31', 'Dog');
    expect(food.getCategory()).toBe('Food');
  });

  test('should calculate discount correctly based on quantity', () => {
    const food = new Food('F001', 'Premium Dog Food', 45.0, 20, '2024-12-31', 'Dog');
    
    expect(food.calculateDiscount(1)).toBe(0);
    expect(food.calculateDiscount(2)).toBe(0);
    expect(food.calculateDiscount(3)).toBe(0.10);
    expect(food.calculateDiscount(4)).toBe(0.10);
    expect(food.calculateDiscount(5)).toBe(0.15);
    expect(food.calculateDiscount(10)).toBe(0.15);
  });

  test('should check if food is expired', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 10);
    const pastDateStr = pastDate.toISOString().split('T')[0];
    
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 10);
    const futureDateStr = futureDate.toISOString().split('T')[0];
    
    const expiredFood = new Food('F001', 'Old Food', 45.0, 20, pastDateStr, 'Dog');
    const freshFood = new Food('F002', 'Fresh Food', 45.0, 20, futureDateStr, 'Dog');
    
    expect(expiredFood.isExpired()).toBe(true);
    expect(freshFood.isExpired()).toBe(false);
  });

  test('should return detailed info including expiration status', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 10);
    const futureDateStr = futureDate.toISOString().split('T')[0];
    
    const food = new Food('F001', 'Premium Dog Food', 45.0, 20, futureDateStr, 'Dog');
    const info = food.getInfo();
    
    expect(info.productId).toBe('F001');
    expect(info.name).toBe('Premium Dog Food');
    expect(info.price).toBe(45.0);
    expect(info.stock).toBe(20);
    expect(info.category).toBe('Food');
    expect(info.expirationDate).toBe(futureDateStr);
    expect(info.animalType).toBe('Dog');
    expect(info.isExpired).toBe(false);
  });
});