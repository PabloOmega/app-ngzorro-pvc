import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { LoginComponent } from './pages/login/login.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RegisterComponent } from './pages/register/register.component';
import { UsersComponent } from './pages/users/users.component';
import { inject } from '@angular/core';
import { UsersService } from './services/users.service';
import { User } from './types/user';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { ProductosSBComponent } from './pages/productos-sb/productos-sb.component';

function isRole(role: string){
  const usersService = inject(UsersService);
  const user = JSON.parse(localStorage.getItem("user")!) as User;
  if(!user) return false;
  return usersService.getUser(user.uid)
    .then(queryResponse => {
      const userRole = (queryResponse.docs[0].data() as User).role!;
      return userRole === role;
    })
}

export const routes: Routes = [
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
  { 
    path: 'products', 
    component: ProductsComponent, 
    ...canActivate(() => redirectUnauthorizedTo(['/login'])) 
  },
  { path: "login", component: LoginComponent},
  { path: "register", component: RegisterComponent},
  { 
    path: "users", 
    component: UsersComponent,
    canMatch: [() => isRole("admin")]
  },
  { 
    path: "users", 
    component: UnauthorizedComponent,
    canMatch: [() => isRole("empleado")]
  },  
  { path: "productssb", component: ProductosSBComponent },
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
];
