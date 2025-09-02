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

    isExpired() {
        const expDate = new Date(this.expirationDate);
        return new Date() > expDate;
    }

    getInfo() {
        return {
            ...super.getInfo(),
            expirationDate: this.expirationDate,
            animalType: this.animalType,
            isExpired: this.isExpired()
        };
    }
}