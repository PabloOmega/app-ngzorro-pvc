import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { AuthService } from './services/auth.service';
import { User } from './types/user';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    RouterOutlet, 
    NzIconModule, 
    NzLayoutModule, 
    NzMenuModule,
    NzBreadCrumbModule,
    NzAvatarModule,
    NzFlexModule,
    NzBadgeModule,
    NzDropDownModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;
  user: User | null = null;

  constructor(public authService: AuthService, private router: Router){}
  
  isLoggedIn(): boolean{
    this.user = JSON.parse(localStorage.getItem("user")!) as User;
    return this.authService.getCurrentUser() !== null;
  }

  onClickLogout(): void{
    this.authService.logout()
      .then(() => this.router.navigate(['/login']));
  }  
}
