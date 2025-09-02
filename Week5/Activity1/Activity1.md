# Actividad #1: Sistema de Tienda de Mascotas con Principios SOLID

El objetivo de esta actividad fue implementar un sistema completo para una tienda de mascotas aplicando los **principios SOLID** de diseño orientado a objetos. El sistema permite gestionar mascotas, productos (alimentos y juguetes), servicios de cuidado, clientes y ventas, todo ello siguiendo buenas prácticas de programación y diseño.

---

## Requisitos

- Implementar un sistema para una tienda de mascotas con múltiples clases y funcionalidades.
- Aplicar los cinco principios SOLID:
  - **S**ingle Responsibility Principle (SRP)
  - **O**pen/Closed Principle (OCP)
  - **L**iskov Substitution Principle (LSP)
  - **I**nterface Segregation Principle (ISP)
  - **D**ependency Inversion Principle (DIP)
- Crear pruebas automatizadas con Jest para validar la correcta implementación.
- Asegurar que el sistema sea extensible y mantenible.

---

## Descripción de la Implementación

### Principio de Responsabilidad Única (SRP)

Cada clase tiene una única responsabilidad bien definida:

**Clase Pet**: Responsable únicamente de gestionar la información de las mascotas.

```js
export default class Pet {
   
    constructor(petId, name, species, breed, age, owner) {
        this.petId = petId;
        this.name = name;
        this.species = species;
        this.breed = breed;
        this.age = age;
        this.owner = owner;
        this.createdAt = new Date();
    }

    getInfo() {
        return {
            petId: this.petId,
            name: this.name,
            species: this.species,
            breed: this.breed,
            age: this.age,
            owner: this.owner,
            createdAt: this.createdAt.toISOString()
        };
    }

    updateAge(newAge) {
        if (newAge >= 0) {
            this.age = newAge;
        } else {
            throw new Error("La edad no puede ser negativa");
        }
    }
}
```

### Principio Abierto/Cerrado (OCP)

Las clases están diseñadas para ser extendidas sin modificar su código original:

**Clase Product (abstracta)**: Define la estructura base para todos los productos.

```js
export default class Product {
    constructor(productId, name, price, stock) {
        if (this.constructor === Product) {
            throw new Error("No se puede instanciar una clase abstracta");
        }
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    getCategory() {
        throw new Error("Método abstracto debe ser implementado");
    }

    calculateDiscount(quantity) {
        throw new Error("Método abstracto debe ser implementado");
    }
}
```

**Clases derivadas**: Extienden Product sin modificarlo.

```js
import Product from './Product.js';

export default class Food extends Product {
    constructor(productId, name, price, stock, expirationDate, animalType) {
        super(productId, name, price, stock);
        this.expirationDate = expirationDate;
        this.animalType = animalType;
    }

    getCategory() {
        return "Food";
    }

    calculateDiscount(quantity) {
        if (quantity >= 5) {
            return 0.15; 
        } else if (quantity >= 3) {
            return 0.10; 
        }
        return 0.0;
    }
}

import Product from './Product.js';

export default class Toy extends Product {
    constructor(productId, name, price, stock, material, size) {
        super(productId, name, price, stock);
        this.material = material;
        this.size = size;
    }

    getCategory() {
        return "Toy";
    }

    calculateDiscount(quantity) {
        if (quantity >= 10) {
            return 0.20; 
        } else if (quantity >= 5) {
            return 0.12; 
        }
        return 0.0;
    }
}
```

### Principio de Sustitución de Liskov (LSP)

Las clases derivadas pueden sustituir a sus clases base sin afectar el comportamiento del programa:

**Clase Care (abstracta)**: Define la estructura base para todos los servicios de cuidado.

```js
export default class Care {
    constructor(careId, pet, date) {
        if (this.constructor === Care) {
            throw new Error("No se puede instanciar una clase abstracta");
        }
        this.careId = careId;
        this.pet = pet;
        this.date = date;
        this.completed = false;
    }

    getCost() {
        throw new Error("Método abstracto debe ser implementado");
    }

    getDuration() {
        throw new Error("Método abstracto debe ser implementado");
    }

    completeService() {
        this.completed = true;
    }
}
```

**Clases derivadas**: Implementan los métodos abstractos manteniendo el contrato.

```js
import Care from './Care.js';

export default class BasicCare extends Care {
    getCost() {
        let baseCost = 25.0;
        if (this.pet.species.toLowerCase() === 'dog' || this.pet.species.toLowerCase() === 'perro') {
            baseCost *= 1.2;
        }
        return baseCost;
    }

    getDuration() {
        return 60; 
    }
}

import Care from './Care.js';

export default class SpecialCare extends Care {
    constructor(careId, pet, date, treatmentType) {
        super(careId, pet, date);
        this.treatmentType = treatmentType;
    }

    getCost() {
        const treatmentCosts = {
            'dental': 80.0,
            'dermatological': 60.0,
            'grooming_premium': 45.0,
            'vaccination': 35.0
        };
        
        let baseCost = treatmentCosts[this.treatmentType.toLowerCase()] || 50.0;
        
        if (this.pet.age > 8) {
            baseCost *= 1.15; 
        }
        
        return baseCost;
    }

    getDuration() {
        const treatmentDurations = {
            'dental': 120,
            'dermatological': 90,
            'grooming_premium': 90,
            'vaccination': 30
        };
        return treatmentDurations[this.treatmentType.toLowerCase()] || 75;
    }
}
```

### Principio de Segregación de Interfaces (ISP)

Las interfaces específicas son mejores que una interfaz general:

**Clase Customer**: Implementa interfaces específicas para diferentes funcionalidades.

```js
export default class Customer {
    constructor(customerId, name, email, phone) {
        this.customerId = customerId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.pets = [];
        this.purchaseHistory = [];
        this.careHistory = [];
        this.loyaltyPoints = 0;
    }

    addPet(pet) {
        this.pets.push(pet);
    }

    addPurchase(products, quantities) {
    }

    scheduleCare(care) {
        if (this.pets.includes(care.pet)) {
            this.careHistory.push(care);
        } else {
            throw new Error("La mascota no pertenece a este cliente");
        }
    }
}
```

### Principio de Inversión de Dependencias (DIP)

Las clases de alto nivel no dependen de las de bajo nivel, ambas dependen de abstracciones:

**Interfaz Persistence**: Define una abstracción para la persistencia de datos.

```js
export default class Persistence {
    saveData(filename, data) {
        throw new Error("Método abstracto debe ser implementado");
    }

    loadData(filename) {
        throw new Error("Método abstracto debe ser implementado");
    }

    deleteData(filename) {
        throw new Error("Método abstracto debe ser implementado");
    }
}
```

**Implementación concreta**: LocalStoragePersistence implementa la interfaz.

```js
import Persistence from './Persistence.js';

export default class LocalStoragePersistence extends Persistence {
    constructor(keyPrefix = "petstore_") {
        super();
        this.keyPrefix = keyPrefix;
    }

    saveData(filename, data) {
    }

    loadData(filename) {
    }

    deleteData(filename) {
    }
}
```

**Clase PetStore**: Depende de la abstracción, no de la implementación concreta.

```js
export default class PetStore {
    constructor(persistence) {
        this.persistence = persistence; 
        this.customers = new Map();
        this.products = new Map();
        this.pets = new Map();
        this.careServices = new Map();
        this.loadAllData();
    }

    
}
```

---

## Casos de Prueba Implementados

Se implementaron pruebas automatizadas con Jest para validar el correcto funcionamiento de todas las clases y sus interacciones:

### Pruebas de Principio de Responsabilidad Única (SRP)

```js
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
```

### Pruebas de Principio Abierto/Cerrado (OCP)

```js
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
```

### Pruebas de Principio de Sustitución de Liskov (LSP)

```js
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
```

### Pruebas de Principio de Segregación de Interfaces (ISP)

```js
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
```

### Pruebas de Principio de Inversión de Dependencias (DIP)

```js
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
```
![imge](../shared/Test.js.png)


---

## Resultados Obtenidos

Se implementó exitosamente un sistema completo para una tienda de mascotas que cumple con todos los principios SOLID:

1. **SRP**: Cada clase tiene una única responsabilidad bien definida.
2. **OCP**: El sistema es extensible sin modificar el código existente.
3. **LSP**: Las clases derivadas pueden sustituir a sus clases base sin problemas.
4. **ISP**: Se utilizan interfaces específicas en lugar de una interfaz general.
5. **DIP**: Las dependencias se inyectan y se trabaja con abstracciones.

Las pruebas automatizadas con Jest validaron el correcto funcionamiento de todas las clases y sus interacciones, asegurando que el sistema cumple con los requisitos establecidos.

---

<div align="center">
<h2>
🛠️ Lo que aprendí
</h2>
</div>

Esta actividad me permitió aplicar y comprender en profundidad los principios SOLID de diseño orientado a objetos, lo que me permitió desarrollar un sistema de tienda de mascotas que cumple con todos los requisitos establecidos. Por ello, aprendí a diseñar clases con una única responsabilidad, a extender clases sin modificar el código existente, a sustituir clases base por abstracciones, a separar interfaces específicas y a invertir dependencias. Además, reforcé mis conocimientos en pruebas automatizadas con Jest, aprendiendo a validar el comportamiento de un sistema complejo mediante pruebas unitarias y de integración.