import { Component, OnInit,Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { Role, User } from '../models/user';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent {
   
 users?: User[] =[];
 roles?: Role[];
 isListView: boolean = true;
 submitted = false;

@Input() currentUser: User = {
   name: '',
   username: '',
   password: '',
   age: 0,
   bplace: '',
   status: ''
 };

 currentIndex = -1;
 name='';
 username= '';
 password= '';
 age= 0;
 bplace= '';
 status='';
 
 role=[]

  message='' ;

  constructor(private apiService: UserService,
  ) {

  }

  ngOnInit(): void {
    this.loadUser();
    this.newuser();
  }

  loadUser(): void {
    this.apiService.getAll()
      .subscribe({
        next: (data) => {
          this.users = data.map((user: any) => new User(user));;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

 

  onEdit(item: any) { 
    this.currentUser = item;
    this.isListView = false;
  }
  
  onDelete(id:any): void {
    this.apiService.delete(id)
    .subscribe({
    next: (res) => {
    console.log(res);
    this.refreshList();
    },
    error: (e) => console.error(e)
    });
  }

  
    
  newuser(): void {
    this.currentUser = {
      id:'',
      name:'',
      username:'',
      password:'',
      bplace:'',
      age:0,
      status:''
    };
  }

  refreshList(): void {
    this.loadUser();
    this.currentUser = {
      id:'',
      name:'',
      username:'',
      password:'',
      bplace:'',
      age:0,
      status:''
    };
    this.currentIndex = -1;
  }

  removeAllusers(): void {
    this.apiService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }
  updateCurrentUser(id:any,users:User): void {
    this.message = '';

    this.apiService
      .update(id, users)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'A felhasználó frissitve lett';
        },
        error: (e) => console.error(e)
      });
  }

}
