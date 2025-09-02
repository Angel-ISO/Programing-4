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

    removePet(petId) {
        this.pets = this.pets.filter(pet => pet.petId !== petId);
    }

    addPurchase(products, quantities) {
        let total = 0;
        const purchaseItems = [];

        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            const quantity = quantities[i];
            const discount = product.calculateDiscount(quantity);
            const itemTotal = product.price * quantity * (1 - discount);
            total += itemTotal;

            purchaseItems.push({
                productName: product.name,
                quantity: quantity,
                unitPrice: product.price,
                discount: discount,
                total: itemTotal
            });
        }

        const purchase = {
            date: new Date().toISOString(),
            items: purchaseItems,
            total: total
        };

        this.purchaseHistory.push(purchase);
        this.loyaltyPoints += Math.floor(total * 0.1); 
    }

    scheduleCare(care) {
        if (this.pets.includes(care.pet)) {
            this.careHistory.push(care);
        } else {
            throw new Error("La mascota no pertenece a este cliente");
        }
    }

    getTotalSpent() {
        return this.purchaseHistory.reduce((total, purchase) => total + purchase.total, 0);
    }

    getInfo() {
        return {
            customerId: this.customerId,
            name: this.name,
            email: this.email,
            phone: this.phone,
            petsCount: this.pets.length,
            totalSpent: this.getTotalSpent(),
            loyaltyPoints: this.loyaltyPoints
        };
    }
}