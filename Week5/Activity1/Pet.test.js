import Pet from './Pet.js';

describe('Pet Class Tests', () => {
  test('should create a pet with correct properties', () => {
    const pet = new Pet('P001', 'Buddy', 'Dog', 'Golden Retriever', 3, 'John Doe');
    
    expect(pet.petId).toBe('P001');
    expect(pet.name).toBe('Buddy');
    expect(pet.species).toBe('Dog');
    expect(pet.breed).toBe('Golden Retriever');
    expect(pet.age).toBe(3);
    expect(pet.owner).toBe('John Doe');
    expect(pet.createdAt instanceof Date).toBe(true);
  });

  test('should update age correctly', () => {
    const pet = new Pet('P001', 'Buddy', 'Dog', 'Golden Retriever', 3, 'John Doe');
    
    pet.updateAge(4);
    expect(pet.age).toBe(4);
  });

  test('should throw error when updating with negative age', () => {
    const pet = new Pet('P001', 'Buddy', 'Dog', 'Golden Retriever', 3, 'John Doe');
    
    expect(() => pet.updateAge(-1)).toThrow('La edad no puede ser negativa');
  });

  test('should return correct info object', () => {
    const pet = new Pet('P001', 'Buddy', 'Dog', 'Golden Retriever', 3, 'John Doe');
    const info = pet.getInfo();
    
    expect(info).toHaveProperty('petId', 'P001');
    expect(info).toHaveProperty('name', 'Buddy');
    expect(info).toHaveProperty('species', 'Dog');
    expect(info).toHaveProperty('breed', 'Golden Retriever');
    expect(info).toHaveProperty('age', 3);
    expect(info).toHaveProperty('owner', 'John Doe');
    expect(info).toHaveProperty('createdAt');
  });
});