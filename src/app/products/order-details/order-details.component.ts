import { Component, Input } from '@angular/core';
import { Orderervice } from 'src/app/services/order.service';
import { Order } from 'src/app/models/orders';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {


  Orders: Order[] = [];

  @Input() currentOrders: Order = {
    name: '',
    payment:'',
    city:'',
    state:'',
    zip:0,
    payed:'',
    amount: 0,
    price: 0,
    delivery:'',
    ddelivery:'',
    status:''
  };

  message = '';
  currentIndex = -1;
  submitted = false;

  constructor(private orderService: Orderervice) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  onCreateOrder() {
    this.orderService.create(this.currentOrders).subscribe({
      next: (res: any) => {
        console.log(res);
        this.refreshList();
      },
      error: (e: any) => console.error(e)
    });
  }

  onDeleteOrder(id: any): void {
    this.orderService.delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  refreshList(): void {
    this.loadOrders();
    this.currentOrders = {
      name: '',
      payment:'',
      city:'',
      state:'',
      zip:0,
      payed:'',
      amount: 0,
      price: 0,
      delivery:'',
      ddelivery:'',
      status:''
    };
    this.currentIndex = -1;
  }

  updateOrder(id: any, orders:Order): void {
    this.message = '';
    this.orderService.update(id, orders).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message ? res.message : 'A rendelés frissitve lett';
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  loadOrders(): void {
    this.orderService.getAll().subscribe({
      next: (data) => {
        this.Orders = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  newOrder(): void {
    this.currentOrders = {
      name: '',
      payment:'',
      city:'',
      state:'',
      zip:0,
      payed:'',
      amount: 0,
      price: 0,
      delivery:'',
      ddelivery:'',
      status:''
    };
  }
}
