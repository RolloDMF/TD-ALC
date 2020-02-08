import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListComponent } from './list/list.component';

@Injectable({
  providedIn: 'root'
})
export class ApiServService {
  constructor(private http: HttpClient) { };
  url = "http://92.222.69.104/todo/";

  inscription(user, psw){

    return this.http.get(this.url + "create/" + user + "/" + psw)

  }

  connexion(user, psw){

    let headers = new HttpHeaders()
    .set("login", user)
    .set("password", psw);
    
    console.log(headers);
    
    return this.http.get(this.url + "listes", {
      headers: headers
    })
  }

  modification(data){
    return this.http.post(this.url + "listes", {
      headers: {contentType: "application/json; charset=utf-8"}
    }, data);
  }
}
