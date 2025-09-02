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

    getInfo() {
        return {
            ...super.getInfo(),
            material: this.material,
            size: this.size
        };
    }
}