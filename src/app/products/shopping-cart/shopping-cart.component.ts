import { Component, EventEmitter, Input, OnInit} from '@angular/core';
import { Orderervice } from 'src/app/services/order.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { StorageService } from 'src/app/services/storage.service';
import { Order } from 'src/app/models/orders';
import { Cart } from 'src/app/models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit{
   carts: Cart[]=[];
   subTotal!: any;
   isLoggedIn = false;
   currentUser: any;
   isSuccessful = false;
   isSignUpFailed = false;
   errorMessage = '';
   cartsChanged = new EventEmitter<Cart[]>();

   @Input() currentProducts: Order = {
    id:'',
    name: '',
    payment:'',
    amount: null,
    price: null,
    zip:0,
    state:'',
    city:'',
    cardn:0,
    expd:0,
    cvv:0,
    payed:'',
    delivery:''
  };

 
   onCreateOrder() {
    this.currentProducts.name=this.currentUser.username
    this.currentProducts.amount=this.totalQuantity;
    this.currentProducts.price = this.total;
    if(this.currentProducts.payment?.toLowerCase() ==="kártya"){
      this.currentProducts.payed = 'fizetve'
    }else{
      this.currentProducts.payed = 'utánvétel'
    }

     if (this.totalQuantity != 0 && this.total != 0) {
    this.orderService.create(this.currentProducts).subscribe({
      next: (res: any) => {
        console.log(res);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.slService.clearCart();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  } 
  }

  clearAllProducts() {
    this.carts = [];
    this.slService.clearCart(); // Clear products in the service
  }

  constructor(private slService: ShoppingCartService,
    private storageService: StorageService,
    private orderService: Orderervice
  ) { }

  ngOnInit() {
    this.currentUser = this.storageService.getUser();
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.carts = this.slService.getIngredients();
    this.slService.cartsChanged
      .subscribe(
        (carts: Cart[]) => {
          this.carts = carts;
        }
      );
  }

 

  removeProduct(cart: any) {
    this.slService.removeProduct(cart);
    this.carts = this.slService.getIngredients();
  }

  clearProducts() {
    localStorage.clear();
  }

  get total() {
    return this.carts?.reduce(
      (sum, product) => ({
        quantity: 1,
        prices: sum.prices + product.price * product.amount,
      }),
      { quantity: 1, prices: 0 }
    ).prices;
  }

  get totalQuantity() {
    return this.carts?.reduce(
      (total, product) => total + product.amount,
      0
    );
  }

}
