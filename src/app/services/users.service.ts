import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, getCountFromServer, getDocs, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: Firestore) { }

  getUsers() : Observable<User[]> {
    const usersRef = collection(this.firestore, "users");
    return collectionData(usersRef, {idField: "uid"}) as Observable<User[]>;
  }

  getUser(uid: string) {
    const usersRef = collection(this.firestore, "users");
    const q = query(usersRef, where("uid", "==", uid));
    return getDocs(q);
  }

  async isUserRegistered(uid: string): Promise<boolean> {
    const snap = getCountFromServer(query(
      collection(this.firestore, 'users'), where("uid", '==', uid)
    ))
    return (await snap).data().count > 0
  }  

  createUser(user: User): Promise<any> {
    const usersRef = collection(this.firestore, "users");
    return addDoc(usersRef, user);
  }

}
