import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ModalService } from 'src/app/services/modal.service';
import { Contact } from './contact';
import { QuoteCartServiceService } from '../services/quote-cart-service.service';
import { CartItem } from '../util/CartItem';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  model = new Contact(0, '', '', '', '', '', '');

  constructor(private db: AngularFirestore, private cart: QuoteCartServiceService) {
  }

  @Input() submitLocation: string;
  @Input() contactEmail: string;
  submitted = false;

  ngOnInit() {  }

  onSubmit() {
    if (this.submitLocation === 'quote') {
      const cart = this.cart.getCart();
      const newCart = [];
      cart.forEach((element: CartItem) => {
        newCart.push('<tr>' + '<td>' + element.productName + '</td>'
        + '<td>' + element.quantity + '</td>'
        + '<td>' + element.price + '</td></tr>');
      });
      alert('Your quote information has been sent to our agents');
      this.db.collection('quotes').doc(this.db.createId()).set({
        firstName: this.model.firstName,
        lastName: this.model.lastName,
        email: this.model.email,
        phoneNumber: this.model.phoneNumber,
        subject: this.model.subject,
        message: this.model.message,
        toEmail: this.contactEmail,
        cart: newCart
      });
      this.cart.updateCart([]);
    } else {
      alert('Your contact information has been sent to our agents');
      this.db.collection('messages').doc(this.db.createId()).set({
        firstName: this.model.firstName,
        lastName: this.model.lastName,
        email: this.model.email,
        phoneNumber: this.model.phoneNumber,
        subject: this.model.subject,
        message: this.model.message,
        toEmail: this.contactEmail
      });
    }
    this.model = new Contact(0, '', '', '', '', '', '');
  }
}