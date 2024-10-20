import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  User
} from '@angular/fire/auth';
import { UsersService } from './users.service';
import { User as UserFirestore } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: UserFirestore | null = null;

  constructor(private auth: Auth, private usersService: UsersService) { }

  register({ email, password }: { email: string, password: string }): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        return this.usersService.createUser({
          uid: userCredential.user.uid,
          email,
          role: "empleado"
        })
          .then((response) => {
            this.currentUser = response;
            localStorage.setItem("user", JSON.stringify(response));
            return response;
          })
          .catch(err => {
            console.log(err);
            return err;
          })
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  login({ email, password }: { email: string, password: string }): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(async (userCredential) => {
        this.usersService.getUser(userCredential.user.uid)
          .then((queryResponse) => {
            this.currentUser = queryResponse.docs[0].data() as UserFirestore;
            localStorage.setItem("user", JSON.stringify(this.currentUser));
          })
      })
  }

  loginWithGoogle(): Promise<any> {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
      .then(async (userCredential) => {
        const queryResponse = await this.usersService.getUser(userCredential.user.uid)

        if (queryResponse.docs.length > 0) {
          this.currentUser = queryResponse.docs[0].data() as UserFirestore;
          localStorage.setItem("user", JSON.stringify(this.currentUser));
          return userCredential;
        }

        const newUser = {
          uid: userCredential.user.uid,
          email: userCredential.user.email!,
          username: userCredential.user.displayName!,
          image: userCredential.user.photoURL!,
          role: "empleado"
        }
        localStorage.setItem("user", JSON.stringify(newUser));

        return this.usersService.createUser(newUser)
          .then((response) => {
            this.currentUser = response;
            return response;
          })
          .catch(err => {
            console.log(err);
            return err;
          })
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  logout(): Promise<any> {
    this.currentUser = null;
    localStorage.setItem("user", JSON.stringify({ "email": "" }));
    return signOut(this.auth);
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}
