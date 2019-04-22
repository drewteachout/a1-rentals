export class CartItem {
    productName: String = '';
    productDescription: String = '';
    quantity = 0;
    price = 0;
    constructor(product_name: String, productDescription: String, quantity: number, price: number) {
        this.productName = product_name;
        this.productDescription = productDescription;
        this.quantity = quantity;
        this.price = price;
    }

    getTotalCost(): number {
        return this.quantity * this.price;
    }

    setQuantity(quantity: number) {
        this.quantity = quantity;
    }
}
