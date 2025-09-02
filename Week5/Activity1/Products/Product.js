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

    updateStock(quantity) {
        if (this.stock + quantity >= 0) {
            this.stock += quantity;
        } else {
            throw new Error("Stock insuficiente");
        }
    }

    getInfo() {
        return {
            productId: this.productId,
            name: this.name,
            price: this.price,
            stock: this.stock,
            category: this.getCategory()
        };
    }
}
