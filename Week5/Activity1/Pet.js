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

    toString() {
        return `${this.name} (${this.species}, ${this.breed}) - ${this.age} años`;
    }
}