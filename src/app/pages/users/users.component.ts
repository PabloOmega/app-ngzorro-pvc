import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { User } from '../../types/user';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    NzTableModule, 
    NzButtonModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  users: User[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}
