import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CartItem } from '../util/CartItem';
import { QuoteCartServiceService } from '../services/quote-cart-service.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-quote-cart',
  templateUrl: './quote-cart.component.html',
  styleUrls: ['./quote-cart.component.css']
})
export class QuoteCartComponent implements OnInit {

  cartService: QuoteCartServiceService;
  cart: CartItem[] = [];
  quote: String = 'quote';
  quoteTotal: number;
  contact_email = '';

  constructor(cartService: QuoteCartServiceService, private db: AngularFirestore) {
    this.cartService = cartService;
    this.quoteTotal = 0;
    this.loadQuotes();
    this.db.collection('Contact').valueChanges().subscribe((docList) => {
      this.contact_email = docList[0]['contact_email'];
    });
  }

  ngOnInit() {
  }

  deleteTile(cartItem: CartItem) {
    this.cart = this.cart.filter((a) => a.productName !== cartItem.productName);
    this.cartService.updateCart(this.cart);
    this.updateQuote();
  }

  loadQuotes() {
    this.cart = this.cartService.getCart();
    this.updateQuote();
  }

  updateQuote() {
    this.quoteTotal = 0;
    this.cart.forEach(item => {
      this.quoteTotal += item['quantity'] * item['price'];
    })
  }
}
