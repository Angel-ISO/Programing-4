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

class SpecialCare extends Care {
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

    getInfo() {
        return {
            ...super.getInfo(),
            treatmentType: this.treatmentType
        };
    }
}