export class CartItem {
    productName: String = '';
    productDescription: String = '';
    quantity = 0;
    perUnitPrice = 0;
    constructor(product_name: String, productDescription: String, quantity: number, per_unit_price: number) {
        this.productName = product_name;
        this.productDescription = productDescription;
        this.quantity = quantity;
        this.perUnitPrice = per_unit_price;
    }

    getTotalCost(): number {
        return this.quantity * this.perUnitPrice;
    }
}
