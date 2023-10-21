import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Employee} from "./shared/interface/employee.model";
import { Item } from "./shared/interface/item.model";
import {Observable} from "rxjs/index";

@Injectable()
export class UserService {
  baseUrl: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  getUsers() : Observable<any> {
    return this.http.get(this.baseUrl + "users/");
  }

  getItemList() : Observable<any> {
    return this.http.get(this.baseUrl + "item/");
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + "users/"+ id);
  }

  getItemById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + "item/"+ id);
  }

  createUser(user: Employee): Observable<any> {
    return this.http.post(this.baseUrl + "users/", user);
  }

  addItem(item: Item): Observable<any> {
    return this.http.post(this.baseUrl + "item/", item);
  }
  
  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + "users/" + id);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + "item/" + id);
  }

  updateUser(user: Employee): Observable<any> {
    return this.http.put(this.baseUrl + "users/" +user['id'], user);
  }

  updateItem(item: Item): Observable<any> {
    return this.http.put(this.baseUrl + "item/" +item['id'], item);
  }
}