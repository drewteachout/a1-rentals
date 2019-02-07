export class Cart_Item {
    productName: String = ""
    quantity: number = 0
    productDescription: String = ""
    perUnitPrice: number = 0
    constructor(product_name: String, quantity: number, product_description: String, per_unit_price: number) {
        this.productName = product_name
        this.quantity = quantity
        this.productDescription = product_description
        this.perUnitPrice = per_unit_price
    }

    getTotalCost(): number {
        return this.quantity * this.perUnitPrice;
    }
}