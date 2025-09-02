import SpecialCare from './SpecialCare.js';
import Pet from '../Pet.js';

describe('SpecialCare Class Tests', () => {
  test('should create a special care service with correct properties', () => {
    const pet = new Pet('P001', 'Buddy', 'Dog', 'Golden Retriever', 3, 'John Doe');
    const specialCare = new SpecialCare('SC001', pet, '2024-08-10', 'dental');
    
    expect(specialCare.careId).toBe('SC001');
    expect(specialCare.pet).toBe(pet);
    expect(specialCare.date).toBe('2024-08-10');
    expect(specialCare.completed).toBe(false);
    expect(specialCare.treatmentType).toBe('dental');
  });

  test('should calculate cost correctly for different treatment types', () => {
    const pet = new Pet('P001', 'Buddy', 'Dog', 'Golden Retriever', 3, 'John Doe');
    
    const dentalCare = new SpecialCare('SC001', pet, '2024-08-10', 'dental');
    const dermCare = new SpecialCare('SC002', pet, '2024-08-10', 'dermatological');
    const groomCare = new SpecialCare('SC003', pet, '2024-08-10', 'grooming_premium');
    const vacCare = new SpecialCare('SC004', pet, '2024-08-10', 'vaccination');
    const otherCare = new SpecialCare('SC005', pet, '2024-08-10', 'other');
    
    expect(dentalCare.getCost()).toBe(80);
    expect(dermCare.getCost()).toBe(60);
    expect(groomCare.getCost()).toBe(45);
    expect(vacCare.getCost()).toBe(35);
    expect(otherCare.getCost()).toBe(50); 
  });

  test('should apply age surcharge for older pets', () => {
    const youngPet = new Pet('P001', 'Buddy', 'Dog', 'Golden Retriever', 3, 'John Doe');
    const oldPet = new Pet('P002', 'Senior', 'Dog', 'Golden Retriever', 10, 'John Doe');
    
    const youngCare = new SpecialCare('SC001', youngPet, '2024-08-10', 'dental');
    const oldCare = new SpecialCare('SC002', oldPet, '2024-08-10', 'dental');
    
    expect(youngCare.getCost()).toBe(80);
    expect(oldCare.getCost()).toBe(92); 
  });

  test('should return correct duration for different treatment types', () => {
    const pet = new Pet('P001', 'Buddy', 'Dog', 'Golden Retriever', 3, 'John Doe');
    
    const dentalCare = new SpecialCare('SC001', pet, '2024-08-10', 'dental');
    const dermCare = new SpecialCare('SC002', pet, '2024-08-10', 'dermatological');
    const groomCare = new SpecialCare('SC003', pet, '2024-08-10', 'grooming_premium');
    
    expect(dentalCare.getDuration()).toBe(120);
    expect(dermCare.getDuration()).toBe(90);
    expect(groomCare.getDuration()).toBe(90);
  });

  test('should return care info with correct properties', () => {
    const pet = new Pet('P001', 'Buddy', 'Dog', 'Golden Retriever', 3, 'John Doe');
    const specialCare = new SpecialCare('SC001', pet, '2024-08-10', 'dental');
    
    const info = specialCare.getInfo();
    
    expect(info.careId).toBe('SC001');
    expect(info.petName).toBe('Buddy');
    expect(info.date).toBe('2024-08-10');
    expect(info.cost).toBe(80);
    expect(info.duration).toBe(120);
    expect(info.treatmentType).toBe('dental');
  });

  test('should mark care as completed', () => {
    const pet = new Pet('P001', 'Buddy', 'Dog', 'Golden Retriever', 3, 'John Doe');
    const specialCare = new SpecialCare('SC001', pet, '2024-08-10', 'dental');
    
    specialCare.completeService();
    expect(specialCare.completed).toBe(true);
  });
});