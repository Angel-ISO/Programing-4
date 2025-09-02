import BasicCare from './BasicCare.js';
import Pet from '../Pet.js';

describe('BasicCare Class Tests', () => {
  test('should create a basic care service with correct properties', () => {
    const pet = new Pet('P001', 'Buddy', 'Dog', 'Golden Retriever', 3, 'John Doe');
    const basicCare = new BasicCare('BC001', pet, '2024-08-10');
    
    expect(basicCare.careId).toBe('BC001');
    expect(basicCare.pet).toBe(pet);
    expect(basicCare.date).toBe('2024-08-10');
    expect(basicCare.completed).toBe(false);
  });

  test('should calculate cost correctly for basic care', () => {
    const pet = new Pet('P001', 'Buddy', 'Dog', 'Golden Retriever', 3, 'John Doe');
    const basicCare = new BasicCare('BC001', pet, '2024-08-10');
    
    // Base cost for basic care is 25.0, with 20% extra for dogs
    expect(basicCare.getCost()).toBe(30); // 25 * 1.2 = 30
  });

  test('should apply different pricing for different animal types', () => {
    const dog = new Pet('P001', 'Buddy', 'Dog', 'Golden Retriever', 3, 'John Doe');
    const cat = new Pet('P002', 'Whiskers', 'Cat', 'Persian', 3, 'John Doe');
    
    const dogCare = new BasicCare('BC001', dog, '2024-08-10');
    const catCare = new BasicCare('BC002', cat, '2024-08-10');
    
    expect(dogCare.getCost()).toBe(30); 
    expect(catCare.getCost()).toBe(25); 
  });

  test('should return fixed duration for basic care', () => {
    const pet = new Pet('P001', 'Buddy', 'Dog', 'Golden Retriever', 3, 'John Doe');
    const basicCare = new BasicCare('BC001', pet, '2024-08-10');
    
    expect(basicCare.getDuration()).toBe(60); 
  });

  test('should return care info with correct properties', () => {
    const pet = new Pet('P001', 'Buddy', 'Dog', 'Golden Retriever', 3, 'John Doe');
    const basicCare = new BasicCare('BC001', pet, '2024-08-10');
    
    const info = basicCare.getInfo();
    
    expect(info.careId).toBe('BC001');
    expect(info.petName).toBe('Buddy');
    expect(info.date).toBe('2024-08-10');
    expect(info.cost).toBe(30);
    expect(info.duration).toBe(60);
  });

  test('should mark care as completed', () => {
    const pet = new Pet('P001', 'Buddy', 'Dog', 'Golden Retriever', 3, 'John Doe');
    const basicCare = new BasicCare('BC001', pet, '2024-08-10');
    
    basicCare.completeService();
    expect(basicCare.completed).toBe(true);
  });
});