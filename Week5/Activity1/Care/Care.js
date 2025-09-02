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

    getInfo() {
        return {
            careId: this.careId,
            petName: this.pet.name,
            date: this.date,
            cost: this.getCost(),
            duration: this.getDuration(),
            completed: this.completed
        };
    }
}