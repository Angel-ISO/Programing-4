import Care from './Care.js';
import Pet from '../Pet.js';

class TestCare extends Care {
  getCost() {
    return 50;
  }

  getDuration() {
    return 60; 
  }
}

describe('Care Class Tests', () => {
  test('should create a care service with correct properties through a concrete subclass', () => {
    const pet = new Pet('P001', 'Buddy', 'Dog', 'Golden Retriever', 3, 'John Doe');
    const care = new TestCare('C001', pet, '2024-08-10');
    
    expect(care.careId).toBe('C001');
    expect(care.pet).toBe(pet);
    expect(care.date).toBe('2024-08-10');
    expect(care.completed).toBe(false);
  });

  test('should mark care as completed', () => {
    const pet = new Pet('P001', 'Buddy', 'Dog', 'Golden Retriever', 3, 'John Doe');
    const care = new TestCare('C001', pet, '2024-08-10');
    
    care.completeService();
    expect(care.completed).toBe(true);
  });

  test('should throw error when trying to instantiate abstract class directly', () => {
    const pet = new Pet('P001', 'Buddy', 'Dog', 'Golden Retriever', 3, 'John Doe');
    
    expect(() => new Care('C001', pet, '2024-08-10')).toThrow('No se puede instanciar una clase abstracta');
  });

  test('should throw error when abstract methods are not implemented', () => {
    // Crear una subclase que no implementa todos los métodos abstractos
    class IncompleteTestCare extends Care {
      // No implementa getCost() ni getDuration()
    }
    
    const pet = new Pet('P001', 'Buddy', 'Dog', 'Golden Retriever', 3, 'John Doe');
    const care = new IncompleteTestCare('C001', pet, '2024-08-10');
    
    expect(() => care.getCost()).toThrow('Método abstracto debe ser implementado');
    expect(() => care.getDuration()).toThrow('Método abstracto debe ser implementado');
  });

  test('should return care info from concrete implementation', () => {
    const pet = new Pet('P001', 'Buddy', 'Dog', 'Golden Retriever', 3, 'John Doe');
    const care = new TestCare('C001', pet, '2024-08-10');
    
    const info = care.getInfo();
    
    expect(info.careId).toBe('C001');
    expect(info.petName).toBe('Buddy');
    expect(info.date).toBe('2024-08-10');
    expect(info.cost).toBe(50);
    expect(info.duration).toBe(60);
  });
});